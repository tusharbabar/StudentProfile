let conn=require("../../db.js");
async function saveReg(...regData) {
    let result=conn.query("insert into register values('0',?,?,?,?,?,?)",[...regData]
    );
   
    return result;    
}


async function validateuser(uname,upass) {
    let result=await conn.query("select *from register where username=? and password=?",[uname,upass]);
    return result;
    
}

async function getLoginUserProfile(loginUserId){

    let userData=await conn.query("select *from register where rid=?",[loginUserId]);
    return userData;
    
}


async function Update(name,email,contact,password,loginUserId) {
     let result=await conn.query("UPDATE register SET name = ?, email = ?, contact = ?, password = ? WHERE rid = ?",[name,email,contact,password,loginUserId]);
        return result;

}

module.exports={saveReg,validateuser,getLoginUserProfile,Update};