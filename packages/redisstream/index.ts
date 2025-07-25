import { createClient } from "redis";




const client =  createClient()
  client.on('error' , (err)=>
  console.log('redis error' ,err , client.quit()))
  client.connect();
 

 type websiteEvent = {
    url :string ,
    id :string
 }

   async function xAdd({url ,id} : websiteEvent){

    const res = await client.xAdd('betterstack:website' ,'*' , {     
          url :  url ,
           id :   id      
          
    })   

          }
  
  export async function xAddBulk(websites : websiteEvent[]) {
      for(let i =0; i<websites.length; i++){
        await xAdd({
            url : websites[i].url ,
            id : websites[i].id
        })
      }
      
  }



