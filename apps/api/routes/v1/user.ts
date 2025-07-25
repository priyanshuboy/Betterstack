
import { Router } from "express";
import  { prismaClient } from  "store/client"
import {z} from "zod"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const secret = "priyanshu"
const usersRouter = Router();

usersRouter.post('/signup' , async (req,res)=>{
      
 const UserDetails  = z.object({
    Username : z.string().max(10).min(7) ,
    Email    : z.string().email(),
    Password : z.string()
 })

 const Parsedata = UserDetails.safeParse(req.body)

 if(!Parsedata.success){
    res.status(400).json({
        mgs : "invalid input"
    })
    return
 }

 const {Username , Email ,Password} = Parsedata.data;
 
 const Finduser = await prismaClient.user.findFirst({
    where : {email : Email}
 })

 if(Finduser){
    res.status(409).json({
        mgs : 'already present'
    })
 }

 const hashpassword = await bcrypt.hash(Password,10);
     
 await prismaClient.user.create({
    data : {
         username : Username ,
         email    :  Email ,
         password : hashpassword
    }
 })

 res.status(201).json({
    mgs : "user created"
 })
     return 
})



usersRouter.post('/signin' , async (req,res)=>{
     const UserDetails  = z.object({
     Email    : z.string().email(),
     password : z.string()
 })

 const Parsedata = UserDetails.safeParse(req.body)

 if(!Parsedata.success){
    res.status(400).json({
        mgs : "invalid input"
    })
    return
 }

 const {Email ,password} = Parsedata.data;
 
 const Finduser = await prismaClient.user.findFirst({
    where : {email : Email}
 })
  
 if(!Finduser){
    res.status(404).json({
        mgs : 'please sign-up first or entered email is wrong'
    })
    return
 }

const Validation = await bcrypt.compare(password , Finduser.password);

if(!Validation){
   res.status(401).json({
      mgs : "password is wrong"
   })
   return
}
 
 const token = jwt.sign({_id :Finduser.id} , secret ,{expiresIn : '1h'})
 

 res.status(200).json({
    mgs : "loged-in" ,
    token : token
 })
      return
})  
      


export default usersRouter;


