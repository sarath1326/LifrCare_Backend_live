

const DB= require("../../model/Schema");




module.exports={

     opAvailabel_post:(data)=>{

        return new Promise((resolve,reject)=>{


            try {

                const final= new DB.opSchma(data)

             final.save().then(()=>{

                
                resolve({flag:true});
            
            }).catch(err=>{
               
                
                resolve({flag:false});
             
            })
            
            } catch (error) {

               reject();
                
            }
        
        });
    
    },

   opAvailabel_get:(data)=>{

        return new Promise(async(resolve,reject)=>{

         try {

            const result= await DB.opSchma.findOne({department:data})

            if(result){

                resolve({flag:true,data:result})

            }else{

                resolve({flag:false})

            }
        } catch (error) {

            reject()
            
         }



        })


        

    }



}


