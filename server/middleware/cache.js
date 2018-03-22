 // ---------- redis cache with 'redis' for node
    const redis = require("redis");
    const redisURL = 'redis://localhost:6379';
    const client = redis.createClient(redisURL);
    const util = require('util');

    client.get = util.promisify(client.get);
    let key = '';
    const cachedData = await client.get(key);
    if(cachedData){
        console.log("data from cache");
    }

    // -----------redis cache
