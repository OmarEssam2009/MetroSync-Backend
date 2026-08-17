const request = require("supertest");

const { app } = require("../server");

describe("Announcements API", () => {
  test("POST announcement without token should return 401", async () => {
    const stationId = "507f1f77bcf86cd799439011";

    const response = await request(app)
      .post(
        `/api/v1/stations/${stationId}/announcements`
      )
      .send({
        text: "Test announcement",
      });

    expect(response.statusCode).toBe(401);
  });
});