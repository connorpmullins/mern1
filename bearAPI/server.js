

// BASE SETUP
// =================================

// call the packages we need
let express     = require('express');     // call express
let app         = express();              // define our app using express
let bodyParser  = require('body-parser');
let mongoose    = require('mongoose');

// pull bear model into our server for use in app
let Bear        = require('./app/models/bear');

// connect to our database
mongoose.connect('mongodb://connorpmullins:qwertyBear@ds217310.mlab.com:17310/mern1');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8080;      // set our port


// ROUTES FOR OUR API
// =================================
let router = express.Router();            // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'horray! welcome to Bear Army api!' });
});

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('FALLEN BEAR, TO BE WEAK IS MISERABLE.');
  next(); // make sure we go to the next routes and don't stop here
})

// ---------------------------------

// on routes that end in /bears
// ---------------------------------

// create a bear ( accesed at POST http://localhost:8080/api/bears)
router.route('/bears')
  .post(function(req, res) {
    let bear = new Bear();      // create a new instance of the Bear model
    bear.name = req.body.name;  // set the bears name (comes from the request)
    bear.weapon = req.body.weapon;

    // save the bear and check for errors
    bear.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Bear created! prepare for war!' });
    });
  });

// get all the bears ( accessed at GET ≥)
router.route('/bears')
  .get(function(req, res) {
    Bear.find(function(err, bears) {
      if (err)
        res.send(err);
      res.json(bears);
    });
  });

// on routes that end in /bears/:bear_id
// ---------------------------------
router.route('/bears/:bear_id')

  // get the bear with that id ( accessed at GET http://localhost:8080/api/bears/:bear_id)
  .get(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err)
        res.send(err);
      res.json(bear);
    });
  });

router.route('/bears/:bear_id')
  // update the bear with this id ( accessed at PUT http://localhost:8080/api/bears/:bear_id)
  .put(function(req, res) {
    // use our bear model to find the bear we want
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err)
        res.send(err);
      if (req.body.name) {
        bear.name = req.body.name; //update bear name
      } else {
        bear.name = bear.name;
      }
      if (req.body.weapon) {
        bear.weapon = req.body.weapon; //update bear weapon
      } else {
        bear.weapon = bear.weapon;
      }

      // save the bear
      bear.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Bear Upgraded!' });
      });
    });
  });

router.route('/bears/:bear_id')
  // delete the bear with this id ( accessed at DELETE http://localhost:8080/api/bears/:bear_id)
  .delete(function(req, res) {
    Bear.remove({
      _id: req.params.bear_id
    }, function(err, bear) {
      if (err)
        res.send(err);
      res.json({ message: 'Bear has been destroyed'});
    });
  });

// REGISTER OUR ROUTES -------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =================================
app.listen(port);
console.log('Magic happens on port' + port);