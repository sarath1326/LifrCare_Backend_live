

const express=require("express");
const app=express();
const cors=require("cors")
const userrouter=require("./Router/userrouter/Router");
const managmentrouter= require("./Router/managementrouter/Router");
const dataBase=require("./model/DBconnect");
const cookieparser=require("cookie-parser");
const bodyparser= require("body-parser")
const socketConnection=require("./Socketio/Socket")
const http=require("http")
const Server=http.createServer(app)



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))



const io = require("socket.io")(Server, {
	cors: {
    
    origin:["https://lifecarehospital.onrender.com","https://lifecare-managment.onrender.com" ],
    methods:["GET","POST","DELETE"],
          
          } })


app.use(cors( {
        
        origin:["https://lifecarehospital.onrender.com","https://lifecare-managment.onrender.com" ],
        methods:["GET","POST","DELETE"],
        credentials:true
      }
      
      ));



app.use(cookieparser());

io.on("connection",(socket)=>{

 socketConnection.socketconnection(socket)

  })



app.use("/",userrouter);
app.use("/manage",managmentrouter);

dataBase.DB();




Server.listen(3005, () => console.log("server started"))





// "http://localhost:3000","http://localhost:3001"
// "https://lifecarehospital.onrender.com","https://lifecare-managment.onrender.com"