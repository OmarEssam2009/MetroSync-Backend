const request = require("supertest");

const { app } = require("../server");

describe("Authentication API", () => {
  test("POST /api/v1/auth/login should return JWT", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "admin@metrosync.com",
        password: "Admin@12345",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");
  });
});