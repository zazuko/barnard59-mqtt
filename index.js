const Source = require('./Source')

function subscribe (host, topic) {
  return new Source(host, topic)
}

function subscribeRaw (host, topic) {
  return new Source(host, topic, { raw: true })
}

module.exports = {
  subscribe,
  subscribeRaw
}
