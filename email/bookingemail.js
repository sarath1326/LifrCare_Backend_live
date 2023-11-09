

const nodemailer=require('nodemailer');
const mailgen=require ('mailgen');




module.exports.bookingemail=(data)=>{

   

      return new Promise((resolve,reject)=>{

        let config={

            service:"gmail",
            auth:{
                user:"sarathsarath93366@gmail.com",
                pass:"bqszytogqedtrxtz"
            }
        };

        let transporter=nodemailer.createTransport(config);

        let mailGenarator=new mailgen({
    
            theme:"default",
            product:{
                name:"LifeCare Hospital",
                link:"https://mailgen.js/"
            }

        });

        let responces={
            body:{
                name:`${data.name}`,
                intro:  ` <h3> your OP booking is sucssfull. <h3/><br/>

                 patientname: ${data.patientname}<br/>
               Doctor : ${data.doctername}<br/>
                Booking Date:${data.date}<br/>
                
                You Will Reach On Time In The Hospital And Visite Reseption And Collect Your File.
                
                ` 
          }
        }

        let mail=mailGenarator.generate(responces);
        let message={
    
            from:"  'LifeCare Hospital' <sarathsarath93366@gmail.com> ",
            to:`${data.email}`,
            subject:"OP Booking Conformation ",
            html:mail
        };

        transporter.sendMail(message).then(()=>{

            resolve()
    
            console.log("mailsent sucssfully");
        
        }).catch(err=>{

             reject()
           
             console.log(" mail sent filled")

        });





        
      })

      
}