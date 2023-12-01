


const express= require("express");
const router=express();
const control=require("../../Control/adminControl/control")
const {otpGen}=require("otp-gen-agent")


 
// op department new  data add


 router.post("/opnewdata",(req,res)=>{

      control.op_newdep_add(req.body).then(()=>{

        res.json({flag:true})

      
      }).catch(err=>{

          res.json({flag:false})

      })

 
 
      })



      router.get("/alldepa",(req,res)=>{

              control.get_all_opdep().then((respo)=>{

                   if(respo.flag){

                        res.json({flag:true,data:respo.data})

                   }else{

                         res.json({flag:false})

                   }
              }).catch(err=>{

                  res.json({err:true})
             
            })

      })


    router.post("/add_op_doctor",(req,res)=>{

       
          control.add_doctor(req.body).then(()=>{


                control.get_all_opdep().then((respo)=>{

                    if(respo.flag){

                        res.json({flag:true,data:respo.data}); 

                      


                    }else{

                        res.json({flag:false});

                    }

                });
            
            }).catch(err=>{

                res.json({err:false});
         
            });
         

    })


   router.get("/getbooking",(req,res)=>{

       control.getall_bookingdata().then((respo)=>{

             res.json({flag:true,data:respo});
       }).catch(err=>{

            res.json({flag:false});
       });

       
   });


   // marking op booking 



      router.post("/opmarking",(req,res)=>{

         console.log(req.body.data)
         
        control.op_booking_marking(req.body.data).then(()=>{
                
                res.json({flag:true})

                console.log("ok")

                }).catch(err=>{

                    res.json({flag:false})
                
                })
      })


      router.post("/doctor_add",async(req,res)=>{

       

        const doctor_pin=await otpGen()

           const data={
               
                 details:req.body.data,
                 pin:doctor_pin
           }

          control.add_docor_details(data).then(()=>{

                  
             res.json({flag:true,pin:doctor_pin})
                  

               }).catch(err=>{


                 res.json({flag:false})

                 
          })

             
      })


      router.get("/getdoctordata",(req,res)=>{

                control.get_all_doctor_data().then((respo)=>{

                        res.json({flag:true,data:respo})
                
                    }).catch(err=>{


                        res.json({flag:false})


                })
      })



       router.post("/doctor_verifi",(req,res)=>{


            control.doctor_verifi_video_call(req.body.data).then((respo)=>{

                    if(respo.flag){

                          res.json({flag:true})
                          return
                    }else{

                        res.json({flag:false})


                    }
            }).catch(err=>{

                   res.json({err:true})
            })

               
       })


       router.post("/bookingcancel",(req,res)=>{


             control.booking_cancel(req.body).then(()=>{

                res.json({flag:true})
                return
            
            }).catch(err=>{

                res.json({flag:false})

                  
             })
      
        })


        router.post("/resudule_update",(req,res)=>{

                 control.resudule(req.body).then(()=>{

                        res.json({flag:true})
                        return
                
                    }).catch(err=>{

                        res.json({flag:false})
                        return
                    
                    })
        })


        router.post("/video_call_control",(req,res)=>{

               control.video_call_control({flag:false}).then(()=>{

                       res.json({flag:true})
               
                    }).catch(err=>{

                  res.json({flag:false})
               })
        })


        












module.exports = router ;