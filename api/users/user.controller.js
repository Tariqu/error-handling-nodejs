const {
  create,
  getUserByUserEmail,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
} = require("./user.service");
const {
  hashSync,
  genSaltSync,
  compareSync
} = require("bcrypt");
const {
  sign
} = require("jsonwebtoken");
const AppError = require("../../utils/appError");

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      const result = await create(body);
      if (!result.affectedRows) {
        throw new Error('Failed! Insert record');
      }
      return res.status(200).json({
        success: 1,
        message: "User created successfully",
        profile_url: `http://localhost:3000/public/${req.file.filename}`,
      });
    } catch (e) {
      next(e);
    }
  },

  login: async (req, res, next) => {
    try {
      const body = req.body;
      const user = await getUserByUserEmail(body.email);
      if (!user.length) {
        const err = new Error('Invalid username or password');
      }
      const result = compareSync(body.password, user[0].password);
      if (result) {
        delete user[0].password;
        const jsontoken = sign({
            result: user[0],
          },
          "qwe1234", {
            expiresIn: "1h",
          }
        );
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
        });
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (e) {
      next(e);
    }
  },

  getUserByUserId: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await getUserByUserId(id);
      if (!result.length) {
        throw new AppError('Record not found!', 404);
      }
      return res.json({
        success: 1,
        data: result,
      });
    } catch (e) {
      next(e);
    }
  },

  getUsers: async (req, res, next) => {
    try {
      const result = await getUsers();
      return res.json({
        success: 1,
        data: result,
      });
    } catch (e) {
      next(e);
    }
  },

  updateUsers: async (req, res, next) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      const result = await updateUser(id, body);
      if (!result.affectedRows) {
        throw new Error(`Failed to update record!`);
      }
      return res.json({
        success: 1,
        message: "updated successfully",
      });
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await deleteUser(id);
      if (!result.affectedRows) {
        throw new Error(`Failed to delete record!`);
      }
      return res.json({
        success: 1,
        message: "user deleted successfully",
      });
    } catch (e) {
      next(e);
    }
  },
};