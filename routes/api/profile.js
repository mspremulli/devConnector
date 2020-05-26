const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

//@route  GET api/profile/me
//@desc   get current users profile
//@access Private
router.get('/me', auth, async (req,res) => {
  try{
    const profile = await Profile.findOne({user: req.user.id}).populate('user',['name','avatar']);
    if(!profile){
      return res.status(400).json({message:'There is no profile for this user'})
    }
    res.json(profile);
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route  POST api/profile/
//@desc  create or update a users profile
//@access Private
router.post(
  '/',
  [
    auth,
    [
      check(
        'status', 'Status is required'
        ).not().isEmpty(),
      check(
        'skills','skills is required'
      ).not().isEmpty()
    ],
  ],
 async(req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
   
  const {
    company,website,location,bio,status,
    githubusername,skills,youtube,facebook,twitter,instagram,linkedin
  } = req.body;
  
  //build profile object
  const profileFields = {}
  profileFields.user = req.user.id;
  if(company) profileFields.company = company;
  if(website) profileFields.website = website;
  if(location) profileFields.location = location;
  if(bio) profileFields.bio = bio;
  if(status) profileFields.status = status;
  if(githubusername) profileFields.githubusername = githubusername;
  if(skills){
    profileFields.skills = skills.split(',').map(skill => skill.trim());
  }

  //build social object
  profileFields.social = {};
  if(youtube) profileFields.social.youtube = youtube;
  if(facebook) profileFields.social.facebook = facebook;
  if(twitter) profileFields.social.twitter = twitter;
  if(instagram) profileFields.social.instagram = instagram;
  if(linkedin) profileFields.social.linkedin = linkedin;

 try{
  let profile = await Profile.findOne({user: req.user.id});
  if(profile){
    //update profile
    profile = await Profile.findOneAndUpdate(
      {user:req.user.id},
      {$set: profileFields},
      {new: true}
    );
    return res.json(profile);
  }
  //create if no profile
  profile = new Profile(profileFields);
  await profile.save();
  res.json(profile);

 }

 catch(err){
   console.error(err.message);
   res.status(500).send('Server Error');
 }

  }
)

//@route  GET api/profile/
//@desc  get all profiles
//@access Public
router.get('/', async (req, res) => {
  try{
    const profiles = await Profile.find().populate('user',['name', 'avatar']);
    res.json(profiles);
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('Server error')
  }
});

//@route  GET api/profile/user/:user_id
//@desc  get one profile by user id
//@access Public
router.get('/user/:user_id', async (req, res) => {
  try{
    const profile = await Profile.findOne({user:req.params.user_id})
    .populate('user',['name', 'avatar']);
    if(!profile){
      return res.starus(400).json({message: 'There is no profile for this user.'})
    }

    res.json(profile);
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('Server error')
  }
});


//@route  DELETE api/profile/
//@desc  delete profile, user, and posts
//@access Private
router.delete('/',auth, async (req, res) => {
  try{
    //todo:remove users posts once we have added posts in
    //remove profile
    await Profile.findOneAndRemove({user:req.user.id})
    
    //remove user
    await User.findOneAndRemove({_id:req.user.id})

    res.json({msg: 'user deleted'});
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('Server error')
  }
});

//@route  PUT api/profile/experience
//@desc  add profile expirence 
//@access Private
router.put('/experience',[auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty(),
]], async (req, res) => {
  try{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }
    //deconstruct the experience from the user's profile
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;
    //set the property values for the new expperience
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    }
    
    try {
      //get the current user's profile
      const profile = await Profile.findOne({user: req.user.id});
      //add the new experience to the beginning of the experience array
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send('Server error1')
    }


  }
  catch(err){
    console.error(err.message);
    res.status(500).send('Server error2')
  }
});


//@route  DELETE api/profile/experience/:exp_id
//@desc  delete expirence from profiele
//@access Private
router.delete('/experience/:exp_id', auth, async(req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id});
    //get remove index
    const removeIndex = await Profile.experience
    .map(item => item.id)
    .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);
    await profile.save();
    
    res.json(profile);
  } 
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server error deleting experience')
  }
});


//@route  PUT api/profile/education
//@desc  add profile expirence 
//@access Private
router.put('/education',[auth, [
  check('school', 'School is required').not().isEmpty(),
  check('degree', 'degree is required').not().isEmpty(),
  check('fieldofstudy', 'field of study is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty(),
]], async (req, res) => {
  try{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }
    //deconstruct the experience from the user's profile
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;
    //set the property values for the new expperience
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    }
    
    try {
      //get the current user's profile
      const profile = await Profile.findOne({user: req.user.id});
      //add the new experience to the beginning of the experience array
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send('Server error1')
    }


  }
  catch(err){
    console.error(err.message);
    res.status(500).send('Server error2')
  }
});


//@route  DELETE api/profile/education/:exp_id
//@desc  delete education from profile
//@access Private
router.delete('/education/:edu_id', auth, async(req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id});
    //get remove index
    const removeIndex = await Profile.education
    .map(item => item.id)
    .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);
    await profile.save();
    
    res.json(profile);
  } 
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server error deleting education')
  }
});

module.exports = router;