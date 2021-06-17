const User=require('./../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {SECRET}=require('../config/index')
/*
@register user/admin/superadmin
*/ 

const userRegister=async (userDets,role,res)=>{
   try {
        // validating username
    let usernameNotTaken=await validateUsername(userDets.username);
    if(!usernameNotTaken){
        return res.status(400).json({
            message:"Username already taken",
            success:false
        })
    }
    // validating email
    let emailRegistered=await validateEmail(userDets.email);
    if(!emailRegistered){
        return res.status(400).json({
            message:"Email already registered",
            success:false
        })
    }
    // @hash password
    const password = await bcrypt.hash(userDets.password, 12);
    const newUser=new User({
        ...userDets,
        password,
        role
    })
    await newUser.save();
    return res.status(201).json({
        message:"Successfully registered",
        success:true
    })
   } catch (err) {
       console.log(err);
    return res.status(500).json({
        message:"Unable to create user",
        success:false
    })
   }
}

const userLogin=async (userCreds,role,res)=>{
    let {username,password}=userCreds;
    //@check username exist or not
    const user=await User.findOne({username});
    if(!user){
        return res.status(404).json({
            message: "Username is not found. Invalid login credentials.",
            success: false
          });
    }
    //@check the role.
    if(user.role!==role){
        return res.status(404).json({
            message: "Please make sure you are logging in from the right portal.",
            success: false
          });
    }
    //@id User exist then compare password
    let isMatch =await bcrypt.compare(password,user.password);
    if(isMatch){
        // sign in token and issue user
        let token=jwt.sign({
            user_id:user._id,
            role:user.role,
            username:user.username,
            email:user.email
        },SECRET,{expiresIn:"7 days"});
        let result={
            username:user.username,
            role:user.role,
            email:user.email,
            token:`Bearer ${token}`,
            expiresIn:168
        }
        return res.status(200).json({
            ...result,
            message:"Your are logged in",
            success:true
        })
    }else{
        return res.status(403).json({
            message: "Incorrect password.",
            success: false
          });
    }
}
const validateUsername=async username=>{
    let user=await User.findOne({username});
    return user?false:true;
}
const validateEmail=async email=>{
    let user = await User.findOne({ email });
    return user ? false : true;
}
module.exports={userRegister,userLogin};