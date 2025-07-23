let regmodel=require("../models/regmodel.js");
exports.logincontroler=(req,res)=>{

    res.render("login.ejs",{msg:""});
}

exports.regcontroler = (req, res) => {
    res.render("register.ejs", {msg:""});
};

exports.saveReg=(req,res)=>{
    let{name,email,contact,username,password}=req.body;
   // console.log(name+"\t" +email+"\t" +contact+"\t" +username+"\t" +password);
 
  console.log("regmode"+regmodel);
   let result=regmodel.saveReg(name,email,contact,username,password,req.file.filename);

   result.then((r)=>{
    if(r[0].affectedRows>=1){
        res.render("register.ejs",{msg:"Registration success....."});
    }else{
        res.render("register.ejs",{msg:"Registration failed...."});
    }
   }).catch((err)=>{
    console.log(err);   
   });
     
}

exports.validateloginuser=(req,res)=>{
let{username,password}=req.body;
let result=regmodel.validateuser(username,password);
result.then((r)=>{

    // console.log(r);
    // console.log(r.length);
    if(r[0].length>0){
         let userData = r[0];
        // console.log(userData[0].rid);
        req.session.loginUserId = userData[0].rid;
        req.session.loginUsername = userData[0].name;
        res.render("viewprofile.ejs", { loginUserName: userData[0].name });

    }else{
         res.render("login.ejs", { msg: "Login Failed..." });
    }
}).catch((err)=>{
  res.render("login.ejs", { msg: "Login Failed..." });
});


}
exports.LoginUserProfile=(req,res)=>{
    let loginUserId=req.session.loginUserId;
    //res.send("Login user id is"+loginUserId);
    let result=regmodel.getLoginUserProfile(loginUserId);
    result.then((r)=>{
        if(r[0].length>0){
            let userData=r[0][0];
            res.render("showprofile.ejs",{u:userData});
           
        }


    });


}
// exports.updateProfile = (req, res) => {
//     let { name, email, contact, username, password } = req.body;
//     let loginUserId = req.session.loginUserId;

//     let result = regmodel.updateUserProfile(name, email, contact, username, password, loginUserId);

//     result.then((r) => {
//         if (r[0].affectedRows >= 1) {
//             res.redirect("updateprofile.ejs"); 
//         } else {
//             res.send("Update failed");
//         }
//     }).catch((err) => {
//         console.log(err);
//         res.send("Something went wrong");
//     });
// };

exports.UpdLogUser=(req,res) => {
    
    let {name,email,contact,password} =req.query;
    let loginUserId = req.session.loginUserId;
    console.log(loginUserId);
    res.render("updateprofile.ejs",{SesId:loginUserId,name:name,email:email,contact:contact,password:password});
}   

exports.FinalUpdLoginUser = (req,res) => {
    console.log(req.body);
    let {name,email,contact,password} = req.body;
        let loginUserId = req.session.loginUserId;
console.log(loginUserId);   
     let result = regmodel.Update(name,email,contact,password,loginUserId)
     result.then((r) => {
        if (r[0].affectedRows > 0) {
            res.redirect("/getLoginUserProfile"); 
        } else {
            res.send("Update failed!");
        }
    }).catch((err) => {
        console.log("Update error:", err);
        res.send("Error update");
    });
}


