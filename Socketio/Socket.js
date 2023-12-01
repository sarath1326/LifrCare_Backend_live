



const {Server}=require("socket.io")
const control= require("./control")

// const io= new Server({
//     cors:true
// })

const nameToSocketMapping=new Map()
const sockettonamemapping=new Map()
const roomidtosocketmapping=new Map()
const sockettoroomidmapping=new Map()


const socketconnection=(socket)=>{

        
       socket.on("doc_login",(data)=>{  // doctor login 

            const {name,id}=data

              nameToSocketMapping.set(name,socket.id)
              sockettonamemapping.set(socket.id,name)
              socket.emit("succc_login_doctor")
              console.log("doctor login ok")

              control.video_call_control({flag:true})
              
       })

       socket.on("user_join_req",(data)=>{

        const {name,roomid}=data
        
        console.log("new connection")

        roomidtosocketmapping.set(roomid,socket.id)
        sockettoroomidmapping.set(socket.id,roomid)

       control.save_new_call(data).then((res)=>{


        const socketid= nameToSocketMapping.get("doctor")

        socket.to(socketid).emit("new_call_sent_doctor",{data:res})

               
       }).catch(err=>{

           console.log("DB err")
       })
      
      
      
      })


      socket.on("answercall",(data)=>{

        const {roomid,_id}=data

        control.call_answer_updation(_id) // DB call status update

        const socketid=roomidtosocketmapping.get(roomid)

        socket.to(socketid).emit("call_replya",)
    
    })

    socket.on("call_user",(data)=>{

           const {signalData,roomid}=data

           console.log("user roomid")

        const socketid=roomidtosocketmapping.get(roomid)

           socket.to(socketid).emit("session_req_to_user",{signal:signalData})
    
    
        })

        socket.on("answersession",(data)=>{

            const {signal,to}=data
            const socketid=nameToSocketMapping.get(to)
            socket.to(socketid).emit("user_signal_reseve",{signal:signal})

               
        })

        socket.on("user_send_msg_to_doctor",(data)=>{

            const {to,msg}=data

            const socketid=nameToSocketMapping.get(to)

            socket.to(socketid).emit("doctor_msg_receve",{msg:msg})

               
        })

        socket.on("send_msg_to_user",(data)=>{

            const {msg,to}=data

            const socketid=roomidtosocketmapping.get(to)

            socket.to(socketid).emit("user_receve_msg",{msg:msg})

          

              
        })


        socket.on("leve_session_from_user",(data)=>{

                const {to,from}=data

                console.log(to)
                
               const socketid=nameToSocketMapping.get(to)

                socket.to(socketid).emit("leve_req_user",{from:from})
       
       
            })


            socket.on("doctor_sent_leve_req",(data)=>{

                    
                const {to}=data
                 
                   const socketid=roomidtosocketmapping.get(to)

                    socket.to(socketid).emit("doctor_leve_req")
            
            
                })

        
      
      
      
      }







module.exports={
    socketconnection
}