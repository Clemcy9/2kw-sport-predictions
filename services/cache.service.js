import { redisClient } from "../config/redis";

const TTL = parseInt(process.env.CACHE_TTL_SECONDS);

function keyfor(endpoint, params = {}) {
  // this helps to generate keys used for redis caching
  const paramString = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return `rapid:{endpoint}${paramString ? ":" + paramString : ""}`;
}

async function getCached(endpoint, params) {
  const key = keyfor(endpoint, params);
  const data = await redisClient.get(key);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

async function setCached(endpoint, value, params = {}) {
  const key = keyfor(endpoint, params);
  await redisClient.setEx(key, TTL, JSON.stringify(value));
}

async function invalidateCached(endpoint, params = {}) {
  const key = keyfor(endpoint, params);
  await redisClient.del(key);
}

export { keyfor, getCached, setCached, invalidateCached, TTL };
