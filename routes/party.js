var express = require('express');
var router = express.Router();
const redis = require('redis')

const client = redis.createClient();

/* GET home page. */
router.get('/:hash', function(req, res, next) {
    let hash = req.params['hash']
    console.log(hash)
    client.get(hash, (err, data) => {
        if(data == null ){
            res.render('party', { complaints: "none" });
        }else {
            res.render('party', {complaints: 'Yes'})
        }
    })
});

module.exports = router;