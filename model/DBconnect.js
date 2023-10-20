

const mongoose=require("mongoose");




module.exports.DB=()=>{

    mongoose.connect("mongodb://127.0.0.1:27017/lifeCare").then(()=>{

                  console.log("DB connected");

    }).catch(err=>{

        console.log("DB connecting failed");
    });

}