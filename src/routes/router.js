let express=require("express");
let ctrl=require("../controler/loginctrl");
let upload=require("../middleware/uploadmiddleware.js");

let router=express.Router();

router.get("/",ctrl.logincontroler);
router.get("/reg",ctrl.regcontroler);
router.post("/regsave", upload.single("photo"), ctrl.saveReg);
router.post("/validateuser",ctrl.validateloginuser);
router.get("/getLoginUserProfile",ctrl.LoginUserProfile);

 router.get("/Updlog",ctrl.UpdLogUser);
 router.post("/Finalupdate", ctrl.FinalUpdLoginUser);



module.exports=router;