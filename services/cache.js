const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const redisUri = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUri);
client.get = util.promisify(client.get);
client.set = util.promisify(client.set);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function() {
  const key = JSON.stringify({
    ...this.getQuery(),
    collection: this.mongooseCollection.name
  });
  const cachedResult = await client.get(key);

  if (cachedResult) {
    console.log('redis');
    return Prmomise.resolve(cachedResult);
  }
  console.log('Query');
  return exec.apply(this, arguments);
};
