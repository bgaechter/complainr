var express = require('express');
var router = express.Router();
const redis = require('redis')

const client = redis.createClient();

/* GET home page. */
router.get('/:hash', function(req, res, next) {
    let hash = req.params['hash']
    console.log(hash)
    client.hgetall(hash, function (err, obj) {
        if(err){
            res.render('complain', {} )
        } else {
            console.log('obj' + obj)
            res.render('complain', {hashid: hash,  obj})
        }
    })
});

router.post('/', function(req,res,next) {
    client.set(req.body.hash, 'complain '+Date.now())
})

module.exports = router;