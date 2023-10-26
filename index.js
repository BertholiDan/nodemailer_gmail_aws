var express = require("express");
var http = require("http");
var path = require("path");
var nodemailer = require("nodemailer");

var app = express();
var server = http.Server(app);
var port = 5500;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "index.html")));

// Routing
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/send_email", function (req, res) {
  var from = req.body.from;
  var to = req.body.to;
  var subject = req.body.subject;
  var message = req.body.message;

  var transporter = nodemailer.createTransport({
    // host: "sandbox.smtp.mailtrap.io",
    // port: 2525,
    service: "gmail",
    auth: {
      user: "danilobertholi@gmail.com",
      pass: "ytjd iwjt drsu ieuz",
    },
  });

  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: message,
    // html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
    response.redirect("/");
  });
});
// Initialize Web Server
server.listen(port, function () {
  console.log("Server starting at http://localhost:" + port);
});
