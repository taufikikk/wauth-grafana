const express = require('express'),
      bodyParser = require('body-parser');
const app = express();
const port = 3010;
const jwt = require('jsonwebtoken')

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/wauth', function(req, res) {
  res.sendFile(__dirname + '/form.html');
});

app.post('/wauth', function(req, res) {
  let msg = req.body
  let groups = msg.group.split(',')
  req.body.group = groups
  console.log(msg);
  let generateToken = jwt.sign(msg, 'nyan');
  res.send(`<center><blockquote style="background-color:Lavender;">Token: ${generateToken}</blockquote></center>`)
});

app.post('/wauth-decode', function(req, res) {
  let msg = req.body.auth
  console.log(msg);
  let decoded = jwt.verify(msg, 'nyan');
  res.send(`<center><blockquote style="background-color:Lavender;">${JSON.stringify(decoded)}</blockquote></center>`)
});

app.listen(port, () => {
  console.log(`App Wauth listening on port ${port}`)
})