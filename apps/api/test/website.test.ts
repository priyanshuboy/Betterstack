import {describe , it ,expect, beforeAll } from "vitest"
import axios from "axios"

let BASE_URL = "http://localhost:5500"

let jwt , token;

token = "priyanshu"

describe('website gets created' , ()=>{
    it("website not created if url is not there", ()=>{
     try {
    axios.post(`${BASE_URL}/api/v1/website/website` , {
        
     });
      expect(false , "website created when it should not ");
 } catch(e){throw e} })
         
it('website will not be created if header is not provided' , async ()=>{
        const response = await axios.post(`${BASE_URL}/website/website`,{
            url : 'https://google.com'
        },{
            headers : {
                Authorization : token
            }
        })   
     expect(response.data.id).not.toBeNull()
})


})