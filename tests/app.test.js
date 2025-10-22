import request from "supertest";
import app from "../app.js";

describe("Express App", () => {
  // 1️⃣ Test for root route
  it("should return a welcome message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    // expect(res.body).toHaveProperty(
    //   "message",
    //   "Welcome to Express testing tutorial"
    // );
  });

  // // 2️⃣ Test GET /users route
  // it("should return all users", async () => {
  //   const res = await request(app).get("/users");
  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.length).toBeGreaterThan(0);
  //   expect(res.body[0]).toHaveProperty("name");
  // });

  // // 3️⃣ Test POST /users with valid data
  // it("should add a new user", async () => {
  //   const res = await request(app).post("/users").send({ name: "John Doe" });
  //   expect(res.statusCode).toBe(201);
  //   expect(res.body).toHaveProperty("name", "John Doe");
  // });

  // // 4️⃣ Test POST /users with missing name
  // it("should return 400 if name is missing", async () => {
  //   const res = await request(app).post("/users").send({});
  //   expect(res.statusCode).toBe(400);
  //   expect(res.body).toHaveProperty("error", "Name is required");
  // });
});
