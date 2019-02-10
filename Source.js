const mqtt = require('mqtt')
const Readable = require('readable-stream').Readable

class Source extends Readable {
  constructor (host, topic, { raw = false } = {}) {
    super({ objectMode: true })

    this.client = mqtt.connect(host)

    this.client.on('connect', () => {
      this.client.subscribe(topic, err => {
        if (err) {
          this.emit('error', err)
        }
      })
    })

    this.client.on('message', (topic, message) => {
      if (raw) {
        this.push({ topic, message })
      } else {
        this.push(message)
      }
    })
  }

  _read () {}

  _destroy (err, callback) {
    this.client.end()

    callback(err)
  }
}

module.exports = Source
