

const DB = require("../../model/Schema");
const bcrypt = require("bcrypt");




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
          
        return new Promise((resolve,reject)=>{

            try {


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
                    marking:true
                   }


                 const final=new DB.booking_schema(formDAta)

                 final.save().then(()=>{

                       resolve();
                 
                    }).catch(err=>{

                         reject(err);


                 });
                
                } catch (error) {

                    reject(error);
                
            
                }

             
             
        });

             
           
    }









}


