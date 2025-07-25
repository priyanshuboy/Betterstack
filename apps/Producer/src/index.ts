
import {prismaClient} from "store/client"
import { xAddBulk } from 'redisstream/client'
async function main( ) {
  
   let website = await prismaClient.website.findMany({
     select : {
      Url : true ,
       id : true
     }
   }) 

   await xAddBulk(website.map(w =>({
    url :w.Url,
    id : w.id
   })))

}


setInterval(()=>{
   main()
},3*1000)