/**
 * CarsController
 *
 * @description :: Server-side logic for managing cars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function (req, res) {
    /*
     console.log('=======================');
     console.log('req.body:');
     console.dir(req.body);
     console.log('req.headers:');
     console.dir(req.headers);
     console.log('req.ip:');
     console.dir(req.ip);
     console.log('req.ips:');
     console.dir(req.ips);
     console.log('req.method:');
     console.dir(req.method);
     console.log('req.params:');
     console.dir(req.params);
     console.log('req.allParams():');
     console.dir(req.allParams());
     */

    // console.log('<== CarController.js:find ==>');

    // todo: make parameters validation
    var requestParams = req.allParams();
    // var whereObj = {};
    var whereObj = requestParams;

    // console.log('whereObj:');
    // console.dir(whereObj);

    Cars.find({
      where: whereObj,
    })
      .exec(function (err, data) {
        if (err) {
          return res.serverError(err);
        }

        // console.log('data.length: ' + data.length);


        if (data.length == 0) {
          return res.notFound({
            code: 404,
            message: 'Not found'});
        }

        return res.ok({
          code: 200,
          message: 'OK',
          result: data});
      });


  }, // find

  findPager: function (req, res) {
    /*
     console.log('=======================');
     console.log('req.body:');
     console.dir(req.body);
     console.log('req.headers:');
     console.dir(req.headers);
     console.log('req.ip:');
     console.dir(req.ip);
     console.log('req.ips:');
     console.dir(req.ips);
     console.log('req.method:');
     console.dir(req.method);
     console.log('req.params:');
     console.dir(req.params);
     console.log('req.allParams():');
     console.dir(req.allParams());
     */

    // console.log('<== CarController.js:findPager ==>');

    // todo: make parameters validation
    var requestParams = req.allParams();
    // var whereObj = {};
    var whereObj = requestParams.conditions;

    var pager = requestParams.pager;

    // console.log('requestParams:');
    // console.dir(requestParams);
    // console.log('whereObj:');
    // console.dir(whereObj);
    // console.log('pager:');
    // console.dir(pager);

    Cars.find({
      where: whereObj,
      sort: 'car_id ASC',
    }).paginate({page: pager.page, limit: pager.limit})
      .exec(function (err, data) {
        if (err) {
          return res.serverError(err);
        }

        // console.log('data.length: ' + data.length);


        if (data.length == 0) {
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


  }, // findPager

  put: function (req, res) {
    /*
     console.log('=======================');
     console.log('req.body:');
     console.dir(req.body);
     console.log('req.headers:');
     console.dir(req.headers);
     console.log('req.ip:');
     console.dir(req.ip);
     console.log('req.ips:');
     console.dir(req.ips);
     console.log('req.method:');
     console.dir(req.method);
     console.log('req.params:');
     console.dir(req.params);
     console.log('req.allParams():');
     console.dir(req.allParams());
     */

    // console.log('<== CarController.js:put ==>');

    // todo: make parameters validation
    var newRecordParams = req.allParams();
    // var newObj = {};
    var newObj = newRecordParams;

    // console.log('Ready to create new record:');
    // console.dir(newObj);

    Cars.create(newObj)
      .exec(function (err, data) {
        if (err) {
          return res.serverError(err);
        }

        // console.log('data: ');
        // console.dir(data);

        return res.created({
          code: 201,
          message: 'OK',
          result: data});
      });
  }, // put
  update: function (req, res) {
    /*
     console.log('=======================');
     console.log('req.body:');
     console.dir(req.body);
     console.log('req.headers:');
     console.dir(req.headers);
     console.log('req.ip:');
     console.dir(req.ip);
     console.log('req.ips:');
     console.dir(req.ips);
     console.log('req.method:');
     console.dir(req.method);
     console.log('req.params:');
     console.dir(req.params);
     console.log('req.allParams():');
     console.dir(req.allParams());
     */

    // console.log('<== CarController.js:update ==>');

    // todo: make parameters validation
    var newRecordParams = req.allParams();
    // var newObj = {};
    var newObj = newRecordParams;

    // console.log('Ready to update record:');
    // console.dir(newObj);

    var findCriteria = {
      car_id: newObj.car_id,
      lang: newObj.lang
    };

    Cars.update(findCriteria, newObj)
      .exec(function (err, data) {
        if (err) {
          return res.serverError(err);
        }

        // console.log('data: ');
        // console.dir(data);

        return res.json({
          code: 200,
          message: 'OK',
          result: data});
      });

  }, // update
};

