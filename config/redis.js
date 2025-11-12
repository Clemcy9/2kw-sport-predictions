import { createClient } from "redis";
const REDIS_URL = process.env.REDIS_URL;

const redisClient = createClient({
  url: REDIS_URL, //|| "redis://localhost:6379",
  // socket: { //use this only for rdss secure connection
  //   tls: true,
  //   rejectUnauthorized: false,
  // },
});

redisClient.on("error", (err) => console.log("redis client error:", err));

async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("redis started successfully");
  }
}

export { connectRedis, redisClient };
