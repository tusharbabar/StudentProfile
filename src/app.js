
let express=require("express");
let bodybodyParser=require("body-parser");
let session=require("express-session");
let path=require("path");
const bodyParser = require("body-parser");
let app=express();
let conn=require("../db.js");
let router=require("../src/routes/router.js");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    secret: 'abc123',
    resave: false,
    saveUninitialized: true 
}));

app.set("view engine","ejs");

app.use("/",router);


module.exports=app;

