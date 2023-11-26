


const mongoose= require('mongoose');


// opavilable schem //


const opAvailabilSchma= new mongoose.Schema({

    department:String,
    availabel:String,
    time:String,
    doctors:Array,
    fees:String

 });

 const opSchma=mongoose.model("op_Availabel",opAvailabilSchma);


 // opavilable schema end //

// user shema //

 const user_Schema=new mongoose.Schema({

       name:String,
       email:{
        type: String,
        unique:true

       },
       password:String
 });


   const userModel=mongoose.model("user",user_Schema);

   // user schema end //

    // booking data schema //
 
   const booking_data_Schema= new mongoose.Schema({

    user:String,
    department:String,
    patientname:String,
    address:String,
    age:String,
    bystandername:String,
    date:String,
    doctername:String,
    email:String,
    mobile:String,
    pyment:String,
    gender: String,
    fees:String,
    marking:Boolean,
    bookingid:Number,
    paystatus:String,
    cancel:Boolean


  })


  const booking_schema= mongoose.model("booking_data",booking_data_Schema)


  const videocalldata=new mongoose.Schema({

         name:String,
         roomid:String,
         signalData:Object,
         flag:Boolean
  })


  const videocall_schema=mongoose.model("videocall_data",videocalldata)


  const doctor=new mongoose.Schema({

        name:String,
        reno:String,
        depart:String,
        con:String,
        pin:Number

  })

  const docter_Schema=mongoose.model("doctor",doctor)
  


 
 
 module.exports={
    
    opSchma,
    userModel,
    booking_schema,
    videocall_schema,
    docter_Schema

}








