import axios from "axios";
import { FastifyRequest, FastifyReply } from "fastify";

/**
 * Fetches the balance sheet report from a mock API and sends the response to the client.
 *
 * This function attempts to retrieve the balance sheet report from the mock API at
 * "http://mock-api:3000/api.xro/2.0/Reports/BalanceSheet". It is available from docker env
 *
 * @param {FastifyRequest} _ - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 *
 * @returns {Promise<void>} - it uses `reply` to send
 *                            HTTP status codes and messages.
 *
 * @throws {Error} - it logs
 *                   the error and sends a 500 status code with a failure message.
 */

export const getBalanceSheet = async (
  _: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const apiUrl = process.env.MOCK_API_URL;
  if (!apiUrl) {
    return reply.status(500).send({ message: "API URL is not defined" });
  }
  try {
    const response = await axios.get(apiUrl);
    reply.status(200).send(response.data);
  } catch (error) {
    console.error("Error fetching balance sheet:", error);
    reply.status(500).send("Failed to fetch balance sheet report");
  }
};
