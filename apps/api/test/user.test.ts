import axios from "axios";
import e, { response } from "express";
import { describe, it, expect } from "vitest";

const BASE_URL = "http://localhost:3000";
const Random_User = Math.random().toString(); // everytime db runs new user created

describe("sign-up endpoint:", () => {
  it("should return error when provided body is incorrect", async () => {
    try {
     const res = await axios.post(`${BASE_URL}/user/signup`, {
        email: Random_User, // Invalid email format
        password: "random"
      });

      // If it doesn't throw, fail the test
      throw new Error("Request should have failed but it succeeded");
    } catch (error) {
         expect(res.status)
    //   expect(error.response.status).toBe(400); 
    //   expect(error.response.data.message).toBeDefined();
    }
  });
});
