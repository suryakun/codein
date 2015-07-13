'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'ilovejavascript';


var encrypt = function(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
var decrypt = function(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Send mail register for verification
 */
var sendMail = function(req) {
  var user = req.body;
  var encrypted = encrypt(user.email);
  var link = req.protocol + '://' + req.get('host') + '/api/users/verify/' + encrypted;

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'surya.ramshere@gmail.com',
      pass: 'sakuragi291106'
    }
  });

  var mailOptions = {
    from: 'Surya Surakhman <surya.ramshere@gmail.com>',
    to: user.email,
    subject: 'Terima kasih telah mendaftar di situs kami',
    html: '<a href="'+ link +'">Klik Di sini untuk konfirmasi</a>'
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.log(error);
      }
  });
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var id = new Date().getTime() * 1000;
  var newUser = new User(req.body);
  newUser._id = Math.floor(id);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.language_code = '';
  newUser.level = '';
  newUser.type = '';
  newUser.product_interest = '';
  newUser.verified = false;
  console.log(req.body);
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    sendMail(req);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

/**
 * Verify email address before register
 */
exports.verify = function(req, res) {
  var key = req.params.key;
  var decrypted = decrypt(key);
  User.findOne({email: decrypted}, function(err, user) {
    if (!user) res.send(403);
    user.verified = true;
    user.save(function(err) {
      if (err) return false;
      res.redirect('/');
    });
  });
};
