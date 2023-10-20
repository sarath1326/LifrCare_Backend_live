


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














module.exports = router ;