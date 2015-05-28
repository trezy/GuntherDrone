var express = require('express');
var app = express();
var RollingSpider = require("rolling-spider");
var temporal = require("temporal");

var gunther = new RollingSpider({
      uuid: '76d1e66e483d40fcac9020d11da33d2a'
});

var safetyTimeout;

//Route Definitions
app.get('/', function (req, res) {
  res.send('Gunther Power!');
});

//Init
app.get('/init', function (req, res) {
  gunther.connect(function() {
     gunther.setup(function() {
         gunther.flatTrim();
         gunther.startPing();
         res.send("Gunther is ready to fly and destroy!");
     })
  })
});

//Hover
app.get('/hover', function (req, res) {
  gunther.takeOff();
  res.send("Gunther is Taking Off!");
});

//Forward
app.get('/forward', function (req, res) {
  gunther.forward();
  res.send("Gunther is Moving Ahead!");
});

//Backward
app.get('/backward', function (req, res) {
  gunther.backward();
  res.send("Gunther is Hovering!");
});

//Land
app.get('/land', function (req, res) {
  gunther.land();
  res.send("Gunther is Landing!");
});

//Flips
app.get('/flip/:direction', function (req, res) {
  var p = req.params.direction;

  switch (p){
    case 'left':
    res.send('Gunther is flipping left!');
        gunther.leftFlip();
        break;
    case 'right':
    res.send('Gunther is flipping right!');
        gunther.rightFlip();
        break;
    case 'back':
    res.send('Gunther is flipping back!');
        gunther.backFlip();
        break;
    case 'front':
    res.send('Gunther is flipping front!');
        gunther.frontFlip();
        break;
    default:
        res.send('Someting went wrong. Landing');
        gunther.land();

  }
});

//Not used, can use for exception handigling later

// function land(){
//     clearTimeout(safetyTimeout);
//     gunther.connect(function() {
//        gunther.setup(function() {
//            gunther.land();
//            console.log("Gunther is about to do an EMERGENCY LANDING!!");
//        })
//     })
// }


//Start server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('The Gunther server is ready @ http://%s:%s', host, port);
});


// gunther.connect(function() {
//   gunther.setup(function() {
//     // NEW CODE
//     temporal.queue([
//       {
//         delay: 0,
//         task: function () {
//             gunther.flatTrim();
//             gunther.startPing();
//             gunther.takeOff();
//             console.log('Taking Off');
//         }
//       },
//       // {
//       //   delay: 4000,
//       //   task: function () {
//       //     gunther.forward();
//       //     console.log('Now going forward');
//       //   }
//       // },
//       {
//         delay: 4000,
//         task: function () {
//           gunther.backFlip();
//           console.log('Now flipping');
//         }
//       },
//       // {
//       //   delay: 4000,
//       //   task: function () {
//       //     gunther.backward();
//       //     console.log('Now coming back');
//       //   }
//       // },
//       {
//         delay: 4000,
//         task: function () {
//           gunther.frontFlip();
//           console.log('Now flipping again');
//         }
//       },
//       {
//         delay: 1200,
//         task: function () {
//           console.log('Landing');
//           gunther.land();
//         }
//       }]);
//   });
// });

