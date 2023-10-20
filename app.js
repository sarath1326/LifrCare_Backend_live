

const express=require("express");
const app=express();
const cors=require('cors')
const userrouter=require("./Router/userrouter/Router");
const managmentrouter= require("./Router/managementrouter/Router");
const dataBase=require("./model/DBconnect");



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


app.use("/",userrouter);
app.use("/manage",managmentrouter);

dataBase.DB();











app.listen(3001,()=>{

    console.log("server started");

});



