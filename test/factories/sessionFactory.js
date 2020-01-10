const Keygrip = require('keygrip');
const keys = require('../../config/keys');
const keygrip = new Keygrip([keys.cookieKey]);

module.exports = user => {
  const sessionObj = JSON.stringify({
    passport: { user: user._id.toString() }
  });
  const session = Buffer.from(sessionObj).toString('base64');
  const sig = keygrip.sign('session=' + session);
  return {
    session,
    sig
  };
};
