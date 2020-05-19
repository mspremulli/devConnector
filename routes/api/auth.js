const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const User = require('../../models/User');4
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

//@route  GET api/auth
//@desc   Test route
//@access Public
router.get('/', auth, async (req,res) => {
  try{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
  }
})



// //@route  GET api/auth
// //@desc   Authenticate User
// //@access Public
// router.post(
//   '/', 
//   //validate data
//   [
//     check(
//       'email',
//       'please incluse valid email'
//     ).isEmail(),
//     check(
//       'password',
//       'please enter a password with 6 or more characters'
//     ).exists(),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//       return res.status(400).json({errors:errors.array()});
//     }
    
    
    
//     const{email, password} = req.body;
    
//     try{
//       //see if user exists. send error if they do not exist
//       let user = await User.findOne({email:email});
//       if(!user){
//         res
//         .status(400)
//         .json({errors:[{msg:'UInvalid Credentials'}] });
//       }

//       //check if the entered password matches the encrypted password
//       const isMatch = await bcrypt.compare(password, user.password);
//       if(!isMatch){
//         res
//         .status(400)
//         .json({errors:[{msg:'UInvalid Credentials'}] });
//       }

//       //return jsonwebtoken
//       const payload = {
//         user:{
//           id:user.id
//         }
//       }

//       jwt.sign(
//         payload,
//         config.get('jwtSecret'),
//         {expiresIn: 360000 },//change to 3600 for 1 hour later
//         (err, token) => {
//           if(err) throw err;
//           res.json({ token });
//         }
//       );

//     } 
//     catch(err){
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }

//   }
// );


module.exports = router;