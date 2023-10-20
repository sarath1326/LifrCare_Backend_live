


const mongoose= require('mongoose');


const opAvailabilSchma= new mongoose.Schema({

    department:String,
    availabel:String,
    time:String,
    doctors:Array

 });



 module.exports.opSchma=mongoose.model("op_Availabel",opAvailabilSchma);