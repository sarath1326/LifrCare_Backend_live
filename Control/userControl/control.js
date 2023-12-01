

const DB = require("../../model/Schema");
const bcrypt = require("bcrypt");
const {otpGen}=require("otp-gen-agent");
const email=require("../../email/bookingemail");
const { trusted } = require("mongoose");




module.exports = {


    // check email exit

    email_Exit: (data) => {

        const { email } = data;


        return new Promise(async (resolve, reject) => {

            try {

                const result = await DB.userModel.findOne({ email: email })

                if (result) {

                    resolve({ exit: true });
                } else {

                    resolve({ exit: false });
                }

            } catch (error) {

                reject();

            }

        });

    },


    // signup add data

    add_user_signup: (data) => {


        return new Promise(async (resolve, reject) => {

            try {

                data.password = await bcrypt.hash(data.password, 10);


                const final = new DB.userModel(data);
                final.save().then(() => {

                    resolve();

                }).catch(err => {

                    reject();

                });

            } catch (error) {

                reject();

            }
        });


    },


    // user login check 


    user_Login:(data)=>{

 
   return new Promise( async(resolve,reject)=>{
    
      try {

        const result = await DB.userModel.findOne({email:data.email});

           if(result){

             const final= await bcrypt.compare(data.password,result.password);

               if(final){

                   resolve({flag:true,data:result});

               }else{

                    resolve({flag:false});
               }

            }else{

                 resolve({emailerr:true});
                  
            }

              
            
          } catch (error) {

            reject(error);
            
          }
     
   });
          

           
    },











    // get all department


    get_all_depo: () => {


        return new Promise(async (resolve, reject) => {

            try {

                const result = await DB.opSchma.find();

                if (result) {

                    resolve(result)
                } else {

                    reject()
                }



            } catch (error) {

                reject()

            }

        })


    },



    // get op availabelete 

    opAvailabel_get: (data) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await DB.opSchma.findOne({ department: data })

                if (result) {

                    resolve({ flag: true, data: result })

                } else {

                    resolve({ flag: false })

                }
            } catch (error) {

                reject()

            }



        })




    },


    
    // op booking placed


    opbooking_placed:(values)=>{

           const { pyment,gender,data,department,fees}=values.form ;
          
        return new Promise(async(resolve,reject)=>{

            try {

            const id=await otpGen();

            const sentdata={
                email: data.email,
                name:values.username,
               doctername:data.doctername,
               patientname:data.patientname,
               date:data.date
                }

                const pymentstatus= pyment === "COP" ? "conform" : "pending" ;


                const formDAta={

                    user:values.userid,
                    department:department,
                    patientname:data.patientname,
                    address:data.address,
                    age:data.age,
                    bystandername:data.bystandername,
                    date:data.date,
                    doctername:data.doctername,
                    email:data.email,
                    mobile:data.mobile,
                    pyment:pyment,
                    gender: gender,
                    fees:fees,
                    marking:true,
                    bookingid:id,
                    paystatus:pymentstatus,
                    cancel:false,
                    reschedule:false,
                    new:true
                
                }

                const final=new DB.booking_schema(formDAta);

                 final.save().then((respo)=>{

                    email.bookingemail(sentdata).then( ()=>{

                   resolve(respo);
                
               
                }).catch(err=>{

                     reject()
                  
                  
                    })
                
              }).catch(err=>{

                  reject(err);


                 });
                
                }catch (error) {

                    
                    reject(error);
                
            
                }

             
             
        });

             
           
    },


    
    online_pyment_status_change:(data)=>{

       


        console.log("status change call")

        const {order}=data ;

      const oderid=order.receipt

    console.log("hiiii")

       
        return new Promise((resolve,reject)=>{

            try {

            DB.booking_schema.updateOne({_id:oderid},{

                  $set:{

                    paystatus:"conform"
                    


                  }
            }).then(()=>{

                 resolve()

                 console.log("status changed ")
           
                }).catch(err=>{

                    reject()
                })
            
            } catch (error) {

                reject()
                console.log('status changed err')
                
            }


                
        })


    },

    // user get bookings


    user_get_all_booking:(id)=>{

        return new Promise(async(resolve,reject)=>{

               try {

                const res= await DB.booking_schema.find({user:id})

                if(res){

                     resolve({flag:true,data:res})
              
                    }else{

                    resolve({flag:false})

                }
            } catch (error) {


                reject()

                  
                
               }
              
        })

            },

         
      // user cancel 


      user_cancel_booking:(id)=>{

        return new Promise((resolve,reject)=>{

               try {

                DB.booking_schema.updateOne({_id:id},{

                      $set:{

                           cancel:true,
                           marking:true
                      }
                }).then(()=>{

                      resolve()
                
                    }).catch(err=>{

                      reject()
                })
              } catch (error) {

                   reject()
                
               }
        })

           
      },

      // reschadule update 


      reschadule_date:(data)=>{

           return new Promise((resolve,reject)=>{

              try {

                DB.booking_schema.updateOne({_id:data.id},{

                      
                    $set:{

                          date:data.date,
                          marking:true,
                          reschedule:true

                          
                    }
                }).then(()=>{

                     resolve()
                
                    }).catch(err=>{

                        console.log(err)


                })
                
              } catch (error) {

                reject()
                
              }

                
           })
      },


      video_call_control_check:()=>{


              
            return new Promise(async (resolve,reject)=>{


                   try {

                    const result=await DB.video_control_schema.findOne({id:"75928"})

                    if(result.flag){
       
                          resolve({flag:true})
                    }else{
       
                        resolve({flag:false})
                    }
                
                } catch (error) {

                    reject()

                    
                    
                   }
            })
      }



        


}


