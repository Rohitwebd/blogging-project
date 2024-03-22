const profileModel = require("../Models/Profile");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
// const ErrorHandler = require("../utils/errorHandler");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const PasswordReset = require("../Models/PasswordReset");
const rs = require("randomstring");
const mailer = require("../Helpers/mailer");



//================= get profile details =====================


exports.getProfileInfo = async (req, res) => {
  const profile = await profileModel.find({ userId: req.params.id }).populate("userId")
  res.status(200).json({
    success: true,
    profile
  })
};


// =================== update products ======================


exports.updateProfile = async (req, res, next) => {
  // let profile = await profileModel.findById(req.params.id);
  // let profile = await profileModel.find({ userId: req.params.id }).populate("userId")
  randomstring

  const profile = await profileModel.updateOne({ userId: req.body.userId }, req.body, {
    new: true,
    upsert: true
  });
  res.status(200).json({
    success: true,
    profile,
    message: "Profile updated successfully"
  })
};


// ==================== change password ===================


exports.changePassword = async (req, res, next) => {
  const { userId, oldpassword, newPassword } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    bcrypt.compare(oldpassword, user.password).then(function (result) {
      if (result) {
        bcrypt.hash(newPassword, 10).then(async (hash) => {
          await User.updateOne({ _id: userId }, {
            password: hash
          })
            .then((user) => {
              res.status(200).json({
                message: "Password Changed Successfully",
                user: userId
              });
            })
            .catch((error) => {
              res.status(400).json({
                message: "error in password changed",
                error: error.message,
              })
            });
        });
      } else {
        res.status(400).json({ message: "Old Password does not match" });
      }
    });

  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

// ==================== email varify ==================

exports.emailVerify = async (req, res) => {
  try {
    const getUser = await User.findOne({ _id: req.query.id });
    if (!getUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    } else {
      if (getUser.status == 0) {
        return res.status(400).json({
          success: false,
          message: "Email already verified"
        })
      } else {
        await User.updateOne({ _id: req?.query?.id }, {
          status: 0
        })
          .then((user) => {
            return res.status(200).json({
              message: "Congratulations ! Email varified Successfully"
            });
          })
          .catch((error) => {
            return res.status(400).json({
              message: "verification error",
              error: error.message,
            })
          });
      }
    }
  } catch (error) {
    return res.status(400).json({
      message: "Verification error",
      error: error.message,
    })
  }
}

// ============= logout ==============

exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" })
  res.status(200).json({
    success: true,
    message: "Logout successfully"
  })
}

// ================ forgot password ================


exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const getUser = await User.findOne({ email });
    if (!getUser) {
      return res.status(404).json({
        success: false,
        message: "Email not found"
      })
    } else {
      await PasswordReset.deleteMany({ userId: getUser._id })
      const randomString = rs.generate();
      await PasswordReset.create({
        userId: getUser._id,
        token: randomString
      })
        .then((getUser) => {
          const msg = `Hi, ${getUser.firstname} Please click to reset your password <a href="http://localhost:7000/api/user/reset-password?token=${randomString}">Reset Password</a>`
          mailer.sendMail(email, "Reset password", msg)
          return res.status(200).json({
            message: "Password reset link sent to your email successfully. Please check"
          });
        })
        .catch((error) => {
          return res.status(400).json({
            message: "error",
            error: error.message,
          })
        });
    }


  } catch (error) {
    return res.status(400).json({
      message: "verification error",
      error: error.message,
    })
  }
}

// ================== Reset password ==================

exports.resetPassword = async (req, res) => {
  try {
    const token = req.query.token;
    const getToken = await PasswordReset.findOne({ token });
    if (!getToken) {
      return res.status(404).json({
        success: false,
        message: "Token not found"
      })
    } else {
      return res.status(200).json({
        status: true,
        userId: getToken.userId
      })
    }
  } catch (error) {
    return res.status(400).json({
      message: "Reset password error",
      error: error.message,
    })
  }
}

// =================== Update password =====================

exports.updatePassword = async (req, res) => {
  try {
    const { userId, newPassword, confirmPassword } = req.body;
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "userId not found"
      })
    }
    const getUser = await User.findOne({ _id: userId });
    if (!getUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }
    if (newPassword !== confirmPassword) {
      return res.status(404).json({
        success: false,
        message: "password && confirmPassword donot match"
      })
    }
    bcrypt.hash(confirmPassword, 10).then(async (hash) => {
      await User.updateOne({ _id: userId }, {
        password: hash
      })
        .then((user) => {
          res.status(200).json({
            message: "Password reset Successfully",
            user: userId
          });
        })
        .catch((error) => {
          res.status(400).json({
            message: "error in password changed",
            error: error.message,
          })
        });
    });
  } catch (error) {
    return res.status(400).json({
      message: "Update password error",
      error: error.message,
    })
  }
}