import {describe , it ,expect } from "vitest"
import axios from "axios"

let BASE_URL = "http://localhost:3001"

describe('website gets created' , ()=>{
    it("website not created if url is not there", ()=>{
     try {
    axios.post(`${BASE_URL}/api/v1/website/website` , {
        
     });
      expect(false , "website created when it should not ");
 } catch(e){throw e} })
         
})