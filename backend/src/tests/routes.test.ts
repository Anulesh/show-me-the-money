import Fastify from "fastify";
import axios from "axios";
import { getBalanceSheet } from "../routes";

jest.mock("axios");

process.env.MOCK_API_URL = "http://mock-api:3000/api.xro/2.0/Reports/BalanceSheet";

describe("GET /api/balance-sheet", () => {
  const fastify = Fastify({ logger: true });

  beforeAll(async () => {
    fastify.get("/api/balance-sheet", getBalanceSheet);
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return balance sheet data", async () => {
    const mockData = {
      Reports: [
        {
          ReportID: "BalanceSheet",
          ReportName: "Balance Sheet",
        },
      ],
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    const response = await fastify.inject({
      method: "GET",
      url: "/api/balance-sheet",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(process.env.MOCK_API_URL);
  });

  it("should return 500", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    const response = await fastify.inject({
      method: "GET",
      url: "/api/balance-sheet",
    });

    expect(response.statusCode).toBe(500);
    expect(response.payload).toBe("Failed to fetch balance sheet report");
  });
  it("should return 500 if MOCK_API_URL is undefined", async () => {
    delete process.env.MOCK_API_URL;
  
    const response = await fastify.inject({
      method: "GET",
      url: "/api/balance-sheet",
    });
  
    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({ message: "API URL is not defined" });
  });
});
