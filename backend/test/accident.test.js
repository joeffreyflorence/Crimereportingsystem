import supertest from "supertest";
import { web } from "../src/app/web.js";
import {
  createTestUser,
  removeAllTestAccident,
  removeTestUser,
} from "./test-util.js";

describe("POST /api/accidents", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestAccident();
    await removeTestUser();
  });

  it("should can create new accident", async () => {
    const result = await supertest(web)
      .post("/api/accidents")
      .set("Authorization", "test")
      .send({
        date: new Date("2023-06-16"),
        location: "Way Kanan",
        description: "Kecelakkan terjadi di kabupaten Way Kn",
        fatalities: 3,
        injured: 2,
        vehicle_type: "mobil",
      });
    expect(result.status).toBe(200);
    expect(result.body.data.date).toString("2023-06-16");
    expect(result.body.data.location).toBe("Way Kanan");
    expect(result.body.data.description).toBe(
      "Kecelakkan terjadi di kabupaten Way Kn"
    );
    expect(result.body.data.fatalities).toBe(3);
    expect(result.body.data.injured).toBe(2);
    expect(result.body.data.vehicle_type).toBe("mobil");
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(web)
      .post("/api/accidents")
      .set("Authorization", "test")
      .send({
        date: new Date("2023-06-16"),
        location: "Way Kanan",
        description: "Kecelakkan terjadi di kabupaten Way Kn",
        fatalities: 3,
        injured: 2,
        vehicle_type: "",
      });
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
