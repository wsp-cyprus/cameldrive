/**
 * TestimonialsController
 *
 * @description :: Server-side logic for managing testimonials
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');

var moduleName = 'TestimonialsController::';


module.exports = {
	find: function (req, res) {

    // console.log('<== TestimonialsController.js:find ==>');

    // todo: make parameters validation

    var whereObj = req.allParams();

    // console.log('whereObj:');
    // console.dir(whereObj);

    Testimonials.find({
      where: whereObj
    })
      .exec(function (err, data) {

        if (err) {
          return res.serverError(err);
        }

        if (_.isNil(data) || data.length == 0) {
          return res.notFound('Not found');
        }

        return res.ok(data);

      });
  }, // find

  findPager: function (req, res) {

    console.log('<== TestimonialsController.js:findPager ==>');

    // todo: make parameters validation

    var requestParams = req.allParams();
    var whereObj = requestParams.conditions;
    var pager = requestParams.pager;
    var reqObj = {
      sort: 'id ASC'
    };

    if (!_.isEmpty(whereObj)) {
      reqObj['where'] = whereObj;
    }


    console.log('requestParams:');
    console.dir(requestParams);
    console.log('whereObj:');
    console.dir(whereObj);
    console.log('pager:');
    console.dir(pager);
    console.log('reqObj:');
    console.dir(reqObj);


    Testimonials.find(reqObj)
      .paginate({page: pager.page, limit: pager.limit})
      .exec(function (err, data) {

        if (err) {
          return res.serverError(err);
        }

        if (_.isNil(data) || data.length == 0) {
          return res.notFound('Not found');
        }

        return res.ok(data);
      });
  }, // findPager

	findOne: function (req, res) {

    // console.log('<== TestimonialsController.js:findOne ==>');

    // todo: make parameters validation

    var whereObj = req.allParams();

    // console.log('whereObj:');
    // console.dir(whereObj);

    Testimonials.findOne(whereObj)
      .exec(function (err, data) {

        if (err) {
          return res.serverError(err);
        }

        if (_.isNil(data)) {
          return res.notFound('Not found');
        }

        return res.ok(data);

      });
  }, // findOne

  put: function (req, res) {

	  var methodName = 'put';

    // console.log(moduleName + methodName);

    // todo: make parameters validation
    var newObj = req.allParams();

    console.log(moduleName + methodName + ', ready to create new record:');
    console.dir(newObj);

    Testimonials.create(newObj)
      .exec(function (err, data) {

        if (err) {
          return res.serverError(err);
        }

        console.log(moduleName + methodName + ', data: ');
        console.dir(data);

        return res.ok(data);
      });
  }, // put

  update: function (req, res) {

    // console.log('<== TestimonialsController.js:update ==>');

    // todo: make parameters validation
    var newObj = req.allParams();

    // console.log('Ready to update record:');
    // console.dir(newObj);

    var findCriteria = {
      id: newObj.id,
    };

    Testimonials.update(findCriteria, newObj)
      .exec(function (err, data) {
        if (err) {
          return res.serverError(err);
        }

        // console.log('data: ');
        // console.dir(data);

        return res.ok(data);
      });

  }, // update
};

