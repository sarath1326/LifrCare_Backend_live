

const mongoose=require("mongoose");

// "mongodb+srv://sarathsarath93366:sarath1937@cluster0.qzzx2xq.mongodb.net/?retryWrites=true&w=majority"


// 'mongodb://127.0.0.1/lifeCare'

module.exports.DB=()=>{

    mongoose.connect("mongodb+srv://sarathsarath93366:sarath1937@cluster0.qzzx2xq.mongodb.net/?retryWrites=true&w=majority").then(()=>{

                  console.log("DB connected");

    }).catch(err=>{

        console.log("DB connecting failed");
    });

}