const express = require('express'),
      router  = express.Router({mergeParams: true}),
      middlewareObj = require('../middleware/index');
    
// routes go here

router.get('/', function(req, res) {
    res.render('landing');
});





module.exports = router;