import Fastify from "fastify";
import cors from "@fastify/cors";

import { getBalanceSheet } from "./routes";

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"]
});
fastify.get("/api/balance-sheet", getBalanceSheet);

const start = async () => {
  try {
    await fastify.listen({ port: 4000, host: "0.0.0.0" });
    console.log("Server running on http://localhost:4000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
