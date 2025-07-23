import { AuthMiddleware, Fixeddata } from "middlewere";
import { Router  } from "express";
import { prismaClient } from "store/client";
import {any, z} from 'zod'



const websiteRouter = Router();

websiteRouter.post('/website' ,AuthMiddleware, async (req:Fixeddata,res)=>{
      
     const websiteDetails = z.object({
        url : z.string()
     })
    
       const Parsedata = websiteDetails.safeParse(req.body);

       if(!Parsedata.success){
        res.status(400).json({
            mgs : 'invalid url' ,
            userid : req.Userid
        })
    return 
    }

const url = Parsedata.data;

const Website = await prismaClient.website.create({data:{ user_id: req.Userid as string ,Url : url as any, Time: new Date()}})

res.status(201).json({
    mgs : "website added",
    web_id : Website.id
})
    return  
})

websiteRouter.get('/status/:websiteid' , async (req:Fixeddata,res)=>{
    const website =prismaClient.website.findFirst({
              where : {
                     user_id : req.Userid!,
                     id : req.params.websiteid
              },
              include : {
                 Ticks : {
                    orderBy : [{
                     CreatedAt : 'desc'
                    }] ,
                    take : 1
                 }

              }
    })
})

export default websiteRouter;

