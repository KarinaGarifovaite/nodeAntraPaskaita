const router = require("express").Router();
const TodoController = require("../todo/todoController");
const InfoController = require("../personalInfo/info-controller");
const UserController = require("../user/user-controller");
const userMiddleware = require("../user/authenticate");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploader");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1000000
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

// check file type
function checkFileType(file, cb) {
  // Allowed extentions
  const fileTypes = /jpeg|jpg|png|gif/;
  //check the ext
  const extname = fileTypes.test(file.originalname.toLowerCase())
  //check mime
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only')
  }
}

router.get("/", (request, response) => {
  response.json("Hello World!");
});

// all todo routes
router.get("/todo", userMiddleware.authenticate, TodoController.getAllItems);
router.post("/todo", userMiddleware.authenticate, TodoController.saveTodoItem);
router.delete(
  "/todo/:id",
  userMiddleware.authenticate,
  TodoController.deleteObj
);
router.patch(
  "/todo/:id",
  userMiddleware.authenticate,
  TodoController.updateStatus
);

// all personal info routes
router.get("/personal", InfoController.getAllItems);
// sukuriam nauja persona info objekta
router.post("/personal", InfoController.savePersonalInfo);
// delete requestas
router.delete("/personal", InfoController.deleteObj);
// update info
router.patch("/personal", InfoController.updatePersonalInfo);

// All user routes
router.post("/user/signup", UserController.singUp);
router.post("/user/login", UserController.login);
router.get("/user/logout", userMiddleware.authenticate, UserController.logout);

// uploader
router.post("/uploadImage", userMiddleware.authenticate, upload.single("test"), UserController.saveAvatar);

//get avatar
router.get('/user/getAvatarURL', userMiddleware.authenticate, UserController.getAvatar);

module.exports = router;