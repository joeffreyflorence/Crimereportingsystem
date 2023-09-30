import supertest from "supertest";
import { web } from "../src/app/web.js";
import {
  createManyTestCrime,
  createTestCrime,
  createTestUser,
  getTestCrime,
  removeAllTestCrime,
  removeTestUser,
} from "./test-util.js";
import { logger } from "../src/app/logging.js";

describe("POST /api/crimes", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestCrime();
    await removeTestUser();
  });

  it("should can create new crime", async () => {
    const result = await supertest(web)
      .post("/api/crimes")
      .set("Authorization", "test")
      .send({
        type_crime: "Pencurian",
        name_crime: "Pencurian Motor",
        location: "Jakarta",
        incident_date: new Date("2023-06-16"),
      });
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.type_crime).toBe("Pencurian");
    expect(result.body.data.name_crime).toBe("Pencurian Motor");
    expect(result.body.data.location).toBe("Jakarta");
    expect(result.body.data.incident_date).toBe("2023-06-16T00:00:00.000Z");
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(web)
      .post("/api/crimes")
      .set("Authorization", "test")
      .send({
        type_crime: "Pencurian",
        name_crime: "Pencurian Motor",
        location: "Jakarta",
        incident_date: "",
      });
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/crime/:crimeId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestCrime();
  });

  afterEach(async () => {
    await removeAllTestCrime();
    await removeTestUser();
  });

  it("should can get crime", async () => {
    const testCrime = await getTestCrime();

    const result = await supertest(web)
      .get("/api/crimes/" + testCrime.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testCrime.id);
    expect(result.body.data.type_crime).toBe(testCrime.type_crime);
    expect(result.body.data.name_crime).toBe(testCrime.name_crime);
    expect(result.body.data.location).toBe(testCrime.location);
    expect(result.body.data.incident_date).toString(testCrime.incident_date);
  });

  it("should return 404 if crime id is not found", async () => {
    const testCrime = await getTestCrime();

    const result = await supertest(web)
      .get("/api/crimes/" + (testCrime.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/crimes/:crimeId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestCrime();
  });

  afterEach(async () => {
    await removeAllTestCrime();
    await removeTestUser();
  });

  it("should can update existing crime", async () => {
    const testCrime = await getTestCrime();

    const result = await supertest(web)
      .put("/api/crimes/" + testCrime.id)
      .set("Authorization", "test")
      .send({
        type_crime: "Curanmor",
        name_crime: "Pencurian Motor Beat",
        location: "Bandung",
        incident_date: new Date("2022-06-16"),
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testCrime.id);
    expect(result.body.data.type_crime).toBe("Curanmor");
    expect(result.body.data.name_crime).toBe("Pencurian Motor Beat");
    expect(result.body.data.location).toBe("Bandung");
    expect(result.body.data.incident_date).toBe("2022-06-16T00:00:00.000Z");
  });

  it("should reject if request is invalid", async () => {
    const testCrime = await getTestCrime();

    const result = await supertest(web)
      .put("/api/crimes/" + testCrime.id)
      .set("Authorization", "test")
      .send({
        type_crime: "",
        name_crime: "Pencurian Motor",
        location: "Bandung",
        incident_date: "",
      });
    expect(result.status).toBe(400);
  });

  it("should reject if crime is not found", async () => {
    const testCrime = await getTestCrime();

    const result = await supertest(web)
      .put("/api/crimes/" + testCrime.id + 1)
      .set("Authorization", "test")
      .send({
        type_crime: "Curanmor",
        name_crime: "Pencurian Motor",
        location: "Bandung",
        incident_date: "2022-06-16",
      });
    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/crimes/:crimeId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestCrime();
  });

  afterEach(async () => {
    await removeAllTestCrime();
    await removeTestUser();
  });

  it("should can delete crime ", async () => {
    let testCrime = await getTestCrime();

    const result = await supertest(web)
      .delete("/api/crimes/" + testCrime.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testCrime = await getTestCrime();
    expect(testCrime).toBeNull();
  });

  it("should reject if crime is not not found", async () => {
    let testCrime = await getTestCrime();

    const result = await supertest(web)
      .delete("/api/crimes/" + (testCrime.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/crimes", function () {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestCrime();
  });

  afterEach(async () => {
    await removeAllTestCrime();
    await removeTestUser();
  });

  it("should can search without parameter", async () => {
    const result = await supertest(web)
      .get("/api/crimes")
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search to page 2", async () => {
    const result = await supertest(web)
      .get("/api/crimes")
      .query({
        page: 2,
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search using type_crime", async () => {
    const result = await supertest(web)
      .get("/api/crimes")
      .query({
        type_crime: "Pencurian 11",
      })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(1);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(1);
  });

  it("should can search using location", async () => {
    const result = await supertest(web)
      .get("/api/crimes")
      .query({
        location: "Jakarta 11",
      })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(1);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(1);
  });

  it("should can search using name_crime", async () => {
    const result = await supertest(web)
      .get("/api/crimes")
      .query({
        name_crime: `Pencurian Motor 11`,
      })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });
});
