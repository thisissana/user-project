const express = require("express");
const userCtrl = require("../controller/userCntrl");
const router = express.Router();

router.post("/signup", userCtrl.register);
router.post("/signin", userCtrl.signin);
router.get("/", userCtrl.getUsers);
router.delete("/:email", userCtrl.deleteUsers);
router.put("/:email", userCtrl.update);

module.exports = router;
