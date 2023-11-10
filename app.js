

const express=require("express");
const app=express();
const cors=require('cors')
const userrouter=require("./Router/userrouter/Router");
const managmentrouter= require("./Router/managementrouter/Router");
const dataBase=require("./model/DBconnect");
const cookieparser=require("cookie-parser");
const bodyparser= require("body-parser")



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))
app.use(cors(


      {
        origin:"https://lifecarehospital.onrender.com",
        methods:["GET","POST","DELETE"],
        credentials:true
      }



));

// "http://localhost:3000"

app.use(cookieparser());


app.use("/",userrouter);
app.use("/manage",managmentrouter);

dataBase.DB();











app.listen(3001,()=>{

    console.log("server started");

});



