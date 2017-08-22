const express = require('express')
const router = express.Router()
const client = require('redis').createClient()
const sha256 = require('js-sha256')
require('dotenv').load({ silent: true })

client.on('error', function (err) {
  console.log('Error ' + err)
})

/* GET home page. */
router.post('/', function (req, res, next) {
  let host = process.env.HOST
  let name = req.body.name
  let start = req.body.start
  let street = req.body.street
  let city = req.body.city
  // var qr = crypto.createHash('sha256').update(name + start + street + city + qr + Date.now()).digest()
  var qr = sha256.sha256(name + start + street + city + qr + Date.now())
  client.hmset(qr, 'name', name, 'start', start, 'street', street, 'city', city, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      console.log(res)
    }
  })
  res.render('code', {hostname: host, qrcode: qr})
})

router.get('')

module.exports = router
