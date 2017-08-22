const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const client = require('redis').createClient()

client.on('error', function (err) {
  console.log('Error ' + err)
})

/* GET home page. */
router.post('/', function(req, res, next) {

  let name = req.body.name
  let start = req.body.start
  let street = req.body.steet
  let city = req.body.city
  var qr = crypto.createHash('sha256').update(name+start+street+city+qr+Date.now()).digest('base64');

  client.hmset(qr, "name", name, "start", start, "street", street, "city", city, (err, res) => {
      if(err) {
          console.log(err)
      } else {
          console.log(res)
      }
  });

  res.render('code', { qrcode: qr });
});

router.get('')

module.exports = router;