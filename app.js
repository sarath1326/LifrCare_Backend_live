

const express=require("express");
const app=express();
const cors=require('cors')
const userrouter=require("./Router/userrouter/Router");
const managmentrouter= require("./Router/managementrouter/Router");
const dataBase=require("./model/DBconnect");
const cookieparser=require("cookie-parser");
const bodyparser= require("body-parser")
const {Server}=require("socket.io")
const socketConnection=require("./Socketio/Socket")




app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))
app.use(cors(


      {
        origin:"http://localhost:3000",
        methods:["GET","POST","DELETE"],
        credentials:true
      }



));

// "http://localhost:3000"
// "https://lifecarehospital.onrender.com"

app.use(cookieparser());

const io= new Server({
  cors:true
})

io.on("connection",(socket)=>{

 socketConnection.socketconnection(socket)

  })






app.use("/",userrouter);
app.use("/manage",managmentrouter);

dataBase.DB();











app.listen(3001,()=>{

    console.log("server started");

});

io.listen(8000)



