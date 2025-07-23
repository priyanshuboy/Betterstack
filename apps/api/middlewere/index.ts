import { Request , Response ,NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'

export interface Fixeddata extends Request{
        Userid? : string
}
const secret = "priyanshu"
export function AuthMiddleware(req :Fixeddata, res : Response, next:NextFunction){
     
     const token = req.headers.authorization?.split("")[1] as string;
     try {
     const decode = jwt.verify(token , secret );
     req.Userid = (decode as JwtPayload)._id 
     res.status(200).json({
          mgs : 'granted access' , 
          id : req.Userid 
     })
     next();
      
}catch(e){
        res.status(403).send('unathorized')
     } 
}