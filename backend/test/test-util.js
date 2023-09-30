import { prismaClient } from "../src/app/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test",
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

export const removeAllTestCrime = async () => {
  return prismaClient.crime.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestCrime = async () => {
  return prismaClient.crime.create({
    data: {
      username: "test",
      type_crime: "Pencurian",
      name_crime: "Pencurian Mobil",
      location: "Jakarta",
      incident_date: new Date("2023-06-15"),
    },
  });
};

export const createManyTestCrime = async () => {
  for (let i = 10; i < 25; i++) {
    await prismaClient.crime.create({
      data: {
        username: `test`,
        type_crime: `Pencurian ${i}`,
        name_crime: `Pencurian Motor ${i}`,
        location: `Jakarta ${i}`,
        incident_date: `2020-06-${i}T00:00:00.000Z`,
      },
    });
  }
};

export const getTestCrime = async () => {
  return prismaClient.crime.findFirst({
    where: {
      username: "test",
    },
  });
};


export const removeAllTestAccident = async () => {
  return prismaClient.accident.deleteMany({
    where: {
      username: "test",
    },
  });
};

