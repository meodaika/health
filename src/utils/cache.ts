import Redis from "ioredis"

export const cache = new Redis()

export const setCache = async (key: string, value: any, ttl?: number) => {
  try {
    if (ttl) {
      return await cache.set(key, JSON.stringify({ cached: value }), "EX", ttl)
    } else {
      return await cache.set(key, JSON.stringify({ cached: value }))
    }
  } catch (e) {
    console.error(e, "error_set_redis")
    return
  }
}

export const getCache = async (key: string) => {
  try {
    const cacheData = await cache.get(key)
    if (!cacheData) {
      return
    }

    return JSON.parse(cacheData).cached || null
  } catch (e) {
    console.error(e, "error_get_redis")
    return
  }
}

export const delCacheByPattern = async (pattern: string) => {
  try {
    const keys = await cache.keys(pattern)
    await cache.del(keys)
    return true
  } catch (e) {
    return
  }
}
