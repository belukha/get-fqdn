const os = require('os');
const dns = require('dns');
const universalify = require('universalify');

function getFQDN(ip, fn) {
  if (typeof ip === 'function') {
    fn = ip;
    return dns.lookup(os.hostname(), { hints: dns.ADDRCONFIG }, (err, ip) => {
      if (err) return fn(err);
      getFQDN(ip, fn);
    });
  }

  dns.lookupService(ip, 0, fn);
}

module.exports = universalify.fromCallback(getFQDN);
