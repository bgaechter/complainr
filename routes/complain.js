var express = require('express')
var router = express.Router()
const redis = require('redis')

const client = redis.createClient()

/* GET home page. */
router.get('/:hash', function (req, res, next) {
  let hash = req.params['hash']
  console.log(hash)
  client.hgetall(hash, function (err, obj) {
    if (err || obj == null) {
      let msg = 'No such party found...'
      res.render('complain', {message: msg})
    } else {
      console.log('obj' + obj)
      let now = new Date()
      let partyStart = new Date(obj.start)
      if (now.getTime() < partyStart.getTime()) {
        let msg = 'The party hasn\'t even started yet'
        res.render('complain', {message: msg})
      } else {
        res.render('complain', {hashid: hash, obj})
      }
    }
  })
})

router.post('/', function (req, res, next) {
  client.set('complain-' + req.body.hash, 'complain ' + Date.now())
  res.send('Thanks! The host of the party has been notified')
})

module.exports = router
