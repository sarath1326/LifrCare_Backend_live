

const express = require("express");
const router = express();
const control = require("../../Control/userControl/control");
const jwt = require("jsonwebtoken");




// verifi auth


const verifiAuth = async (req, res, next) => {

   const token = req.cookies.lifeCarejwt;

   if (!token) {

      res.json({ authfaild: true })

      return;

   } else {

      const userdata = await jwt.verify(token, "sarath1937");
      if (!userdata) {

         res.json({ authfaild: true });
         return;
      } else {

         next();
      }


   }


}






// user signup 


router.post("/signup", (req, res) => {

   const data = req.body;


   control.email_Exit(data).then((respo) => {

      if (respo.exit) {

         res.json({ exit: true });
         return;


      } else {


         control.add_user_signup(data).then(() => {

            res.json({ flag: true });
            return;

         }).catch(err => {

            res.json({ flag: false });
            return;


         });

      }
   }).catch(err => {

      res.json({ err: true });
      return;
   });

});



// user login



router.post("/login", (req, res) => {

   control.user_Login(req.body).then((respo) => {

      if (respo.emailerr) {

         res.json({ emailerr: true });
         return;

      } else if (respo.flag) {

         const { name, _id } = respo.data;


         const token = jwt.sign({ name: name, id: _id }, "sarath1937");

         res.cookie("lifeCarejwt", token, {

            maxAge: 360000,
            httpOnly: true
         })


         res.json({ flag: true });

         return;

      } else {

         res.json({ flag: false });

         return;

      }


   }).catch(err => {

      console.log(err);

      res.json({ err: true });
      return;

   })

});


// user data get navbar


router.get("/userdata", async (req, res) => {



   const token = req.cookies.lifeCarejwt

   if (token) {

      const userData = await jwt.verify(token, "sarath1937",)

      if (userData) {

         res.json({ flag: true, data: userData });
         return;

      } else {

         res.json({ flag: false });
         return;

      }

   } else {

      res.json({ flag: false });
      return;
   }

});



// user logout 


router.get("/userlogout", (req, res) => {

   console.log("logout")

   res.clearCookie('lifeCarejwt');

   res.end()



})






// get all department

router.get("/getalldepo", verifiAuth, (req, res) => {


   control.get_all_depo().then((respo) => {


      res.json({ flag: true, data: respo });

   }).catch(err => {

      res.json({ flag: false })

   });



});



// check op availabilite

router.get("/op_availabel_check", (req, res) => {

   control.opAvailabel_get(req.query.dep).then((respo) => {

      if (respo.flag) {

         res.json({ flag: true, data: respo.data })


      } else {
         res.json({ flag: false })

      }
   }).catch(err => {

      res.json({ err: true })

   })


})


//  user booking detailes post 


router.post("/conform_booking", verifiAuth, async (req, res) => {

   const { pyment } = req.body
   const token = req.cookies.lifeCarejwt;
   const userData = await jwt.verify(token, "sarath1937")

   const { id } = userData;


   if (pyment === "COP") {


      const data = {
         userid: id,
         form: req.body
      }

      control.opbooking_placed(data).then(() => {

         res.json({ flag: true });
         return;


      }).catch(err => {

         res.json({ flag: false });
         return;

      });


   } else {

       console.log("online pyment ")


   }


});













module.exports = router;