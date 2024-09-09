


const { model } = require("mongoose");
const DB = require("../../model/Schema");



module.exports = {


    // op new department data add post 

    op_newdep_add: (data) => {

        return new Promise((resolve, reject) => {

            try {

                let doctors_arry = []

                let obj = {

                    doctorName: data.doctorname,
                    available: true

                }

                doctors_arry.push(obj)

                let addvalue = {

                    department: data.department,
                    availabel: data.avilabelday,
                    time: data.time,
                    fees: data.fees,
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


    //  edit op department data 


    op_department_data_edit: (data) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await DB.opSchma.findByIdAndUpdate(  // db data edit
                    { _id: data._id },

                    {

                        department: data.department,
                        availabel: data.availabel,
                        time: data.time,
                        doctors: data.doctors,
                        fees: data.fees


                    }

                )

                resolve()

            } catch (error) {


                reject()

            }
        })


    },


 // get all op department

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


    add_doctor: (data) => {

        const { doctoeName, depo } = data.data

        console.log(doctoeName)

        let obj = {

            doctorName: doctoeName,
            available: true

        }



        return new Promise((resolve, reject) => {

            try {

                DB.opSchma.updateOne({ _id: depo }, {

                    $push: {
                        doctors: obj

                    }
                }).then((respo) => {

                    console.log(respo);

                    resolve();

                }).catch(err => {

                    reject();

                });



            } catch (error) {

                reject();

            }

        })

    },


    // get all booking data

    getall_bookingdata: () => {

        return new Promise(async (resolve, reject) => {

            try {

                const data = await DB.booking_schema.find();

                if (data) {

                    resolve(data);
                } else {

                    reject();
                }

            } catch (error) {

                reject();


            }


        });



    },



    // op booking marking


    op_booking_marking: (id) => {


        return new Promise((resolve, reject) => {


            try {

                DB.booking_schema.updateOne({ bookingid: id }, {


                    $set: {

                        marking: false,
                        new: false
                    }
                }).then(() => {

                    resolve()

                }).catch(err => {

                    reject()




                })

            } catch (error) {

                reject()

                console.log(error)

            }
        })





    },


    // add  working doctors

    add_docor_details: (data) => {

        const { details, pin } = data


        return new Promise(async (resolve, reject) => {


            try {



                const save_data = {

                    name: details.name,
                    reno: details.registerno,
                    depart: details.department,
                    con: details.contact,
                    pin: pin


                }

                const final = new DB.docter_Schema(save_data)

                final.save().then(() => {

                    resolve()

                }).catch(err => {

                    reject()


                })

            } catch (error) {


                reject()

            }


        })




    },

    // get all doctor data


    get_all_doctor_data: () => {

        return new Promise(async (resolve, reject) => {

            try {

                const data = await DB.docter_Schema.find()

                resolve(data)

            } catch (error) {

                reject()

            }


        })
    },

    doctor_verifi_video_call: (data) => {

        return new Promise(async (resolve, reject) => {

            try {

                const result = await DB.docter_Schema.findOne({ pin: data.pin })

                if (result) {

                    resolve({ flag: true })

                } else {

                    resolve({ flag: false })


                }
            } catch (error) {

                reject()


            }


        })
    },


    // user booking cancel


    booking_cancel: ((data) => {



        return new Promise(async (resolve, reject) => {

            try {

                DB.booking_schema.deleteOne({ bookingid: data.id }).then(() => {

                    resolve()

                }).catch(err => {

                    reject()
                })

            } catch (error) {

                reject()

            }
        })
    }),



    // user reschedule  


    resudule: (data) => {


        return new Promise((resolve, reject) => {

            try {

                DB.booking_schema.updateOne({ bookingid: data.id }, {

                    $set: {

                        marking: false,
                        reschedule: false
                    }
                }).then(() => {

                    resolve()

                }).catch(err => {

                    reject()
                })

            } catch (error) {

                reject()

            }
        })

    },


    video_call_control: (data) => {

        return new Promise(async (resolve, reject) => {


            try {

                DB.video_control_schema.updateOne({ id: "75928" }, {

                    $set: {

                        flag: data.flag
                    }
                }).then(() => {

                    console.log("video control ok")

                    resolve()

                }).catch(err => {

                    console.log("video call err")
                    reject()
                })

            } catch (error) {

                reject()

            }






        })
    }












}