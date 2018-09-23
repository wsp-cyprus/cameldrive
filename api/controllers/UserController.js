/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');
var Passwords = require('machinepack-passwords');

module.exports = {
  find: function (req, res) {

    if (!_.isNil(req.session.user) && !_.isNil(req.session.user.pw) && req.session.user.pw) {

      console.log('req.session.user:');
      console.dir(req.session.user);

      return res.ok({
        code: 200,
        message: 'OK',
        activeSession: true,
        result: req.session.user
      });
    } else {
      console.log('req.session.user is not defined');
    }


    // todo: make parameters validation
    var whereObj = req.allParams();

    User.findOne({
      where: whereObj
    })
      .exec((err, data) => {

        if (err) {
          return res.serverError(err);
        }

        if (_.isNil(data) || data.length == 0) {
          return res.notFound({
            code: 404,
            message: 'Not found'});
        }

        return res.ok({
          code: 200,
          message: 'OK',
          result: data
        });

      });
  }, // find

  login: function (req, res) {

    // todo: make parameters validation
    var whereObj = req.allParams();

    if (_.isNil(whereObj.username)) {
      return res.badRequest('username is missing');
    }

    if (_.isNil(whereObj.pw)
    ) {
      return res.badRequest('pw is missing');
    }

    if (!_.isNil(req.session.user) && !_.isNil(req.session.user.pw) && req.session.user.pw) {

      console.log('req.session.user:');
      console.dir(req.session.user);

      Passwords.checkPassword({

        passwordAttempt: whereObj.pw,
        encryptedPassword: req.session.user.pw,
      }).exec({

        error: function (err) {

          return res.serverError(err);
        },

        incorrect: function () {

          return res.notFound({
            code: 404,
            message: 'Not found: incorrect pw'
          });
        },

        success: function () {

          return res.ok({
            code: 200,
            message: 'OK',
            activeSession: true,
            result: req.session.user
          });
        },

      });


    } else {
      console.log('req.session.user is not defined');
    }

    console.log('whereObj:');
    console.dir(whereObj);


    User.findOne({
      username: whereObj.username
    })
      .exec((err, data) => {

        if (err) {
          return res.serverError(err);
        }

        if (_.isNil(data) || data.length == 0) {
          return res.notFound({
            code: 404,
            message: 'Not found: no such user'
          });
        }

        Passwords.checkPassword({

          passwordAttempt: whereObj.pw,
          encryptedPassword: data.pw,
        }).exec({

          error: function (err) {

            return res.serverError(err);
          },

          incorrect: function () {

            return res.notFound({
              code: 404,
              message: 'Not found: incorrect pw'
            });
          },

          success: function () {

            req.session.user = data;
            delete data.pw;

            console.log('findOne, req.session.user:');
            console.dir(req.session.user);

            return res.ok({
              activeSession: true,
              result: data
            });
          },

        });
      });
  }, // login

  update: function (req, res) {

    // todo: make parameters validation
    var params = req.allParams();

    if (_.isNil(params.criteria)) {
      return res.badRequest('Criteria parameter not defined');
    }

    if (_.isNil(params.val)) {
      return res.badRequest('Val parameter not defined');
    }

    if (!_.isNil(params.val.pw)) {

      Passwords.encryptPassword({

        password: params.val.pw,
      }).exec({

          error: function (err) {

            console.log('Passwords.encryptPassword, serverError:');
            console.dir(err);

            return res.serverError(err);
        },

        success: function (result) {

          console.log('Passwords.encryptPassword, success:');
          console.dir(result);

          params.val.pw = result;

          console.log('after Passwords.encryptPassword...');

          User.update(params.criteria, params.val)
            .exec((err, data) => {

              if (err) {
                return res.serverError(err);
              }

              if (_.isNil(data) || data.length == 0) {
                return res.notFound({
                  code: 404,
                  message: 'Not found'});
              }

              if (_.isArray(data)) {
                if (data[0].username && data[0].pw) {
                  req.session.user = data[0];
                }
              } else {
                if (data.username && data.pw) {
                  req.session.user = data;
                }
              }


              console.log('update, req.session.user:');
              console.dir(req.session.user);


              return res.ok({
                code: 200,
                message: 'OK',
                activeSession: true,
                result: data
              });

            });
        },

      });
    }


  }, // update


  logout: function (req, res) {

    if (!_.isNil(req.session.user)) {

      console.log('logout, req.session.user:');
      console.dir(req.session.user);

      delete req.session.user;

      if (!_.isNil(req.session.user)) {
        console.log('req.session.user is not deleted');

        return res.serverError('not deleted');
      } else {
        console.log('req.session.user is deleted');

        return res.ok({
          code: 200,
          message: 'OK',
        });
      }
    } else {

      console.log('logout, req.session.user does not exist');

      return res.notFound('user not found');
    }
  }, // logout


  check: function (req, res) {

    if (!_.isNil(req.session.user)) {

      console.log('check, req.session.user:');
      console.dir(req.session.user);

      var data = req.session.user;
      delete data.pw;

      return res.ok({
        code: 200,
        message: 'OK',
        activeSession: req.session.user.pw != '',
        result: data
      });

    } else {

      console.log('check, req.session.user does not exist');

      return res.notFound('user session not found');
    }
  }, // check


};

