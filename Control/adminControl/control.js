


const { model } = require("mongoose");
const DB = require("../../model/Schema");



module.exports = {


    // op new department data add post 

    op_newdep_add: (data) => {

        return new Promise((resolve, reject) => {

            try {

                let doctors_arry = []

                doctors_arry = data.doctorname

                let addvalue = {

                    department: data.department,
                    availabel: data.avilabelday,
                    time: data.time,
                    fees:data.fees,
                    doctors: doctors_arry

                }



                const final = new DB.opSchma(addvalue);

                final.save().then((respo) => {

                    console.log("data adedd");
                    resolve()

                }).catch(err => {

                    console.log("op new dep data add err");
                    reject()

                });

            } catch (error) {

                console.log("op new data adedd server err");
                reject()

            }




        });

    },

    get_all_opdep: () => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await DB.opSchma.find()

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

    

    // add Doctor op sesssion 


      add_doctor:(data)=>{

          const {doctoeName , depo }=data

           return new Promise((resolve,reject)=>{

                try {

                     DB.opSchma.updateOne({department:depo},{

                         $push:{
                            doctors:doctoeName

                         }
                     }).then((respo)=>{

                        console.log(respo);

                            resolve();

                     }).catch(err=>{

                         reject();
                     
                        });

                      
                    
                } catch (error) {

                    reject();
                    
                }

           })

      }





}