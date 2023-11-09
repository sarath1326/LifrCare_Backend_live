


const express= require("express");
const router=express();
const control=require("../../Control/adminControl/control")


 
// op department new  data add


 router.post("/opnewdata",(req,res)=>{

      control.op_newdep_add(req.body).then(()=>{

      
      }).catch(err=>{



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


    router.post("/add_doctor",(req,res)=>{

          control.add_doctor(req.body).then(()=>{


                control.get_all_opdep().then((respo)=>{

                    if(respo.flag){

                        res.json({flag:true,data:respo.data}); 

                       console.log(respo.data)


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















module.exports = router ;