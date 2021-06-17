const express=require('express')
const router=express.Router();
const {userRegister,userLogin}=require('../utils/Auth')

//user registartion 
router.post('/register-user',async(req,res)=>{
    await userRegister(req.body,"user",res);
})
//admin registartion 
router.post('/register-admin',async(req,res)=>{
    await userRegister(req.body,"admin",res);
})
//super admin registartion
router.post('/register-super-admin',async(req,res)=>{
    await userRegister(req.body,"super-admin",res);
})
//user login route
router.post('/login-user',async(req,res)=>{
   await userLogin(req.body,"user",res)
})
//admin login

router.post('/login-admin',async(req,res)=>{
    res.json({data:req.body})
})
//super admin login 
router.post('/login-super-admin',async(req,res)=>{
    res.json({data:req.body})
})

//profile route
router.get('profile',async (req,res)=>{

})

//user protected route
router.post('/user-protected',async(req,res)=>{
    res.json({data:req.body})
})
//admin protected route
router.post('/admin-protected',async(req,res)=>{
    res.json({data:req.body})
})
//super amdin protected route
router.post('/super-admin-protected',async(req,res)=>{
    res.json({data:req.body})
})
module.exports=router;