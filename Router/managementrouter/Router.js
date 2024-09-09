


const express = require("express");
const router = express();
const control = require("../../Control/adminControl/control")
const { otpGen } = require("otp-gen-agent")



// post router op new department add router 

router.post("/op_add_new_depart", (req, res) => {

    control.op_newdep_add(req.body).then(() => {

       res.status(200).json({ flag: true })
        return


    }).catch(err => {

     res.status(500).json({ flag: false })
        return

    })



})


// get router for get all department 

router.get("/get_all_depart", (req, res) => {

    control.get_all_opdep().then((respo) => {

        if (respo.flag) {

            res.json({ flag: true, data: respo.data })

        } else {

            res.json({ flag: false })

        }
    }).catch(err => {

        res.json({ err: true })

    })

})



// post router for edit op department data

router.post("/edit_op_department", (req, res) => {

    console.log(req.body.data)

    control.op_department_data_edit(req.body.data).then(() => {

        res.json({ flag: true })

    }).catch(err => {

        res.json({ flag: false })
    })


})





// post router for add op doctor

router.post("/add_op_doctor", (req, res) => {


    control.add_doctor(req.body).then(() => {


        control.get_all_opdep().then((respo) => {

            if (respo.flag) {

                res.json({ flag: true, data: respo.data });




            } else {

                res.json({ flag: false });

            }

        });

    }).catch(err => {

        res.json({ err: false });

    });


})


// get router all op bookings

router.get("/getbooking", (req, res) => {

    control.getall_bookingdata().then((respo) => {

        res.json({ flag: true, data: respo });
    }).catch(err => {

        res.json({ flag: false });
    });


});


// marking op booking 



router.post("/opmarking", (req, res) => {

    console.log(req.body.data)

    control.op_booking_marking(req.body.data).then(() => {

        res.json({ flag: true })

        console.log("ok")

    }).catch(err => {

        res.json({ flag: false })

    })
})


// post router for add working doctor

router.post("/doctor_add", async (req, res) => {



    const doctor_pin = await otpGen()

    const data = {

        details: req.body.data,
        pin: doctor_pin
    }

    control.add_docor_details(data).then(() => {


        res.json({ flag: true, pin: doctor_pin })


    }).catch(err => {


        res.json({ flag: false })


    })


})


  // get router for get all working doctors

router.get("/getdoctordata", (req, res) => {

    control.get_all_doctor_data().then((respo) => {

        res.json({ flag: true, data: respo })

    }).catch(err => {


        res.json({ flag: false })


    })
})

// post router for verify doctor for enter video consltation.

router.post("/doctor_verifi", (req, res) => {


    control.doctor_verifi_video_call(req.body.data).then((respo) => {

        if (respo.flag) {

            res.json({ flag: true })
            return
        } else {

            res.json({ flag: false })


        }
    }).catch(err => {

        res.json({ err: true })
    })


})


// post router for op booking cancel

router.post("/bookingcancel", (req, res) => {


    control.booking_cancel(req.body).then(() => {

        res.json({ flag: true })
        return

    }).catch(err => {

        res.json({ flag: false })


    })

})


// post router for reschedule op booking

router.post("/resudule_update", (req, res) => {

    control.resudule(req.body).then(() => {

        res.json({ flag: true })
        return

    }).catch(err => {

        res.json({ flag: false })
        return

    })
})

// post router for video call 

router.post("/video_call_control", (req, res) => {

    control.video_call_control({ flag: false }).then(() => {

        res.json({ flag: true })

    }).catch(err => {

        res.json({ flag: false })
    })
})



module.exports = router;