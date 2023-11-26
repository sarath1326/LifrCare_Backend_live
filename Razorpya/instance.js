

const Razorpay = require("razorpay");

var instance = new Razorpay({
    key_id: 'rzp_test_3sydrTt10wbHB2',
    key_secret: 'zjamqz8FreDSlNG2VK6sjw5r',
 });



 module.exports.generateRazorpay=(oderid,total)=>{

    return new Promise((resolve,reject)=>{

        var options = {
            amount: total*100,
            currency: "INR",
            receipt: "" + oderid,
         };
         instance.orders.create(options, function (err, order) {
   
            if (err) {
               
                console.log(err)

            } else {
   
   
               resolve(order)
   
            }
   
   
   
         })





    })

   



 }



 module.exports.pyment_verify=(data)=>{

    const crypto= require("crypto")
  
      const {pyment,order}=data 
  
      
  
      return new Promise((resolve,reject)=>{
  
          
        let generatedSignature = crypto
           .createHmac("SHA256",'zjamqz8FreDSlNG2VK6sjw5r').update(pyment.razorpay_order_id + '|' +pyment.razorpay_payment_id)
          .digest('hex');
  
  
          
  
          if(generatedSignature===pyment.razorpay_signature){
  
              console.log("online pyment okkk")
             
              resolve()
  
          }else{
  
            console.log("online pyment failed")
  
            reject()
  
            
         
          }
  
          
  
           })
  
  
  
   }


   module.exports.online_consult_generateRazorpay=(fee)=>{

      return new Promise((resolve,reject)=>{
  
          var options = {
              amount: fee*100,
              currency: "INR",
              receipt: "" + "7592831937",
           };
           instance.orders.create(options, function (err, order) {
     
              if (err) {
                 
                  reject()
  
              } else {
     
     
                 resolve(order)
     
              }
     
     
     
           })
  
  
  
  
  
      })
  
     
  
  
  
   }
  







