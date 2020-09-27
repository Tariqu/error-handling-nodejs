const router = require("express").Router();
const {
  checkToken
} = require("../../auth/token_validation");
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser
} = require("./user.controller");
const {
  addUserValidation,
  loginValidation
} = require('../../validation/users/user.validation');
const multer = require('multer');
const path = require('path');


// set storage engine
const storage = multer.diskStorage({
  destination: './public',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
})

// multer 
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000
  }
});


router.get("/", checkToken, getUsers);
router.post("/", checkToken, upload.single('profile'), addUserValidation, createUser);
router.get("/:id", checkToken, getUserByUserId);
router.post("/login", loginValidation, login);
router.patch("/:id", checkToken, updateUsers);
router.delete("/:id", checkToken, deleteUser);

module.exports = router;