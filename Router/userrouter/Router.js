

const express=require("express");
const router=express();
const control=require("../../Control/userControl/control")


router.get("/",(req,res)=>{

    res.send("heloooo");
});


router.post("/op_availabel",(req,res)=>{

     console.log(req.body)

     control.opAvailabel_post(req.body).then((respo)=>{

        if(respo.flag){

           res.send("data posted")
        
        }else{

           res.send("data posted err")
        
        }

     }).catch(err=>{

          res.send("server err")

     })
    
    

})


router.get("/op_availabel_check",(req,res)=>{

     control.opAvailabel_get(req.query.dep).then((respo)=>{

          if(respo.flag){

            res.json({flag:true,data:respo.data})

           
          }else{
            res.json({flag:false})

          }
     }).catch(err=>{

        res.json({err:true})
     
    })


    })

















module.exports=router ;