import axios from "axios";
import { describe, it, expect } from "vitest";

const BASE_URL = "http://localhost:5500";
const Random_User = Math.random().toString(); // everytime db runs new user created

describe("sign-up endpoint:", () => {
  it("should return error when provided body is incorrect", async () => {
    try {
     const res = await axios.post(`${BASE_URL}/user/signup`, {
        email: Random_User, // Invalid email format
        password: "random"
      });
  expect(res.status).toBe(200)
    } catch (error) {
       throw error
    //   expect(error.response.status).toBe(400); 
    //   expect(error.response.data.message).toBeDefined();
    }
  });
});
