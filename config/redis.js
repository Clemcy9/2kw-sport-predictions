import { createClient } from "redis";
// const REDIS_URL = process.env.REDIS_URL; //iporting without using seem to return undefines

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
  // socket: { //use this only for rdss secure connection
  //   tls: true,
  //   rejectUnauthorized: false,
  // },
});

redisClient.on("error", (err) => console.log("redis client error:", err));

async function connectRedis() {
  console.log("hello Redis, redis_url:", process.env.REDIS_URL);
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("redis started successfully");
  }
}

export { connectRedis, redisClient };
