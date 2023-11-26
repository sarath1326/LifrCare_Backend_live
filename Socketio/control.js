



  
const DB =require("../model/Schema")




 module.exports={


    save_new_call:(data)=>{

        return new Promise(async(resolve,reject)=>{


                try {

                    const saveData={
                          
                          name:data.name,
                          roomid:data.roomid,
                          signalData:data.signalData,
                          flag:true
                          
                    }

                    const final=new DB.videocall_schema(saveData)

                    final.save().then(async(res)=>{

                        const fulldata= await DB.videocall_schema.find()
                        
                        resolve(fulldata)

                       
                         }).catch(err=>{

                            reject()
                           
                            console.log(err)
                            
                        
                        })
                    
                } catch (error) {

                    reject()
                   
                }
        })

         
    },

    call_answer_updation:(id)=>{

          return new Promise(async(resolve,reject)=>{

              DB.videocall_schema.updateOne({_id:id},{

                   $set:{

                       flag:false
                   }
              }).then(()=>{

                resolve()

                 
              }).catch(err=>{

                  reject()
              })
            
            })
    }

   
 }