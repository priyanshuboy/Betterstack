import { createClient } from "redis";
import { prismaClient } from "store";
import { WebsiteStatus } from "store/generated/prisma";
import axios from 'axios'

( async ()=>{
while(1){
     const client = await createClient();
client.on('error' , (err:Error)=> console.log('redis error' , err)) 
await client.connect();

  const res = await client.xReadGroup('india' , 
       "india-1" , {
            key : 'betterstack:website' ,
            id   : '>'
       } ,{
        COUNT : 2
       }
  )

console.log("Redis Response:", res);
 
   
let websitetick = res[0].messages;
websitetick.array.forEach((element : any) => {
     let time = Date.now()     
     axios.get(element.url).then(() => {
     prismaClient.websiteTick.create({

          data : {
           response_time_ms :  Date.now() - time ,
           status    : WebsiteStatus.up ,
           CreatedAt   : new Date,
           region_id : 'india',
           website_id : element.id
     } 
})
}).catch((err :Error) => {
     console.log(err)
})
         
});

}
})