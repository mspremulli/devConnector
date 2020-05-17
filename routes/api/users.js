const express = require('express');
const router = express.Router();
const gravitar = require('gravatar');
const bcrpyt = require('bcryptjs');
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');

//@route  GET api/users
//@desc   Register User
//@access Public
router.post(
  '/', 
  //validate data
  [
    check(
      'name', 'Name is required'
    ).not().isEmpty(),
    check(
      'email',
      'please incluse valid email'
    ).isEmail(),
    check(
      'password',
      'please enter a password with 6 or more characters').isLength({min:6}
    )
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }
    
    
    
    const{name, email, password} = req.body;
    
    try{
      //see if user exists. send error if they do not exist
      let user = await User.findOne({email:email});
      if(user){
        res.status(400).json({errors:[{msg:'User already exists'}] });
      }
  
      //get users gravitar
      const avatar = gravitar.url(email, {
        s:'200',
        r:'pg',
        d:'mm',
      })

      //create instance of new user
      user = new User({
        name,
        email,
        avatar,
        password
      });

      //encrypt password
      const salt = await bcrpyt.genSalt(10);
      user.password = await bcrpyt.hash(password, salt);
      await user.save();


      //return jsonwebtoken

      res.send('user registared');
    } 
    catch(err){
      console.error(err.message);
      res.status(500).send('Server Error');
    }


  }
);





module.exports = router;