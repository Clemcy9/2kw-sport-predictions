import { createClient } from "redis";
const { REDIS_URL } = process.env;

const redisClient = createClient({
  url: REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => console.log("redis client error:", err));

async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("redis started successfully");
  }
}

export { connectRedis, redisClient };
