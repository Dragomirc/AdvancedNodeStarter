const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const redisUri = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUri);
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '');
  return this;
};
mongoose.Query.prototype.exec = async function() {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }
  const key = JSON.stringify({
    ...this.getQuery(),
    collection: this.mongooseCollection.name
  });
  const cachedResult = await client.hget(this.hashKey, key);
  if (cachedResult) {
    const doc = JSON.parse(cachedResult);
    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }
  const queryResult = await exec.apply(this, arguments);
  client.hset(this.hashKey, key, JSON.stringify(queryResult));
  return queryResult;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  }
};
