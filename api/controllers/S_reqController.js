/**
 * S_reqController
 *
 * @description :: Server-side logic for managing s_reqs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');

module.exports = {
	create: function (req, res) {

    // console.log('<== S_reqController.js:create ==>');

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
    console.log('=======================');
*/

    // todo: make parameters validation
    var requestParams = req.allParams();
    var createObj = {};

    _.forEach(requestParams, function (val, key) {
      if (val) {
        createObj[key] = val;
      }
    });

    createObj['user_agent'] = req.headers['user-agent'] || '';
    createObj['ip'] = req.ip || '';
    createObj['cookie'] = req.headers.cookie || '';

    // console.log('createObj:');
    // console.dir(createObj);

    S_req.create(createObj)
      .exec(function (err, data) {

/*
        // To test server error case
        var e = new Error('Some error message');
        return res.serverError(e);
*/

        if (err) {
          return res.serverError(err);
        }

        // console.log('Sending email with request...');
        // console.dir(data);

        var keys = [
          'car_group',
          'name',
          'email',
          'phone',
          'additionalInfo',
          'period_start',
          'pariod_end',
          'pLocation',
          'dLocation',
        ];

        var lables = {
          'car_group': 'Тип авто: ',
          'name': 'Имя/фамилия: ',
          'email': 'Email: ',
          'phone': 'Телефон: ',
          'additionalInfo': 'Доп. информация: ',
          'period_start': 'Начало: ',
          'pariod_end': 'Окончание: ',
          'pLocation': 'Место подачи: ',
          'dLocation': 'Место приемки: ',
        };

        var subject = 'Новый заказ, тип авто: ' + data.car_group;
        var html = `
          <h2>Поступил новый заказ</h2>
          <hr>
          <table style="border: 1px; color: #8AB512;">
        `;



        var i = 0;
        var styleOne = 'style = "background:#FFF; color:#000"';
        var styleTwo = 'style = "background:#DFE7C0; color:#000"';
        keys.forEach(function (key) {
          if (data[key]) {
            if (i%2) {
              html += `
              <tr ${styleOne}>
                <td>${lables[key]}</td>
                <td>${data[key]}</td>
              </tr>
            `;
            } else {
              html += `
              <tr ${styleTwo}>
                <td>${lables[key]}</td>
                <td>${data[key]}</td>
              </tr>
            `;
            }
            i++;
          }
        });

        html += '</table>';

        EmailService.sendEmail(subject, html);

        return res.ok({result: 'ok', data: data});
      });
  },

  createInfo: function (req, res) {

    // console.log('<== S_reqController.js:createInfo ==>');

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
     console.log('=======================');
     */

    // todo: make parameters validation
    var requestParams = req.allParams();
    var createObj = {};

    _.forEach(requestParams, function (val, key) {
      if (val) {
        createObj[key] = val;
      }
    });

    createObj['user_agent'] = req.headers['user-agent'] || '';
    createObj['ip'] = req.ip || '';
    createObj['cookie'] = req.headers.cookie || '';

    // console.log('createObj:');
    // console.dir(createObj);

    S_req.create(createObj)
      .exec(function (err, data) {

        /*
         // To test server error case
         var e = new Error('Some error message');
         return res.serverError(e);
         */

        if (err) {
          return res.serverError(err);
        }

        // console.log('Sending email with request...');
        // console.dir(data);

        var keys = [
          'name',
          'email',
          'phone',
          'additionalInfo',
        ];

        var lables = {
          'name': 'Имя/фамилия: ',
          'email': 'Email: ',
          'phone': 'Телефон: ',
          'additionalInfo': 'Сообщение: ',
        };

        var req_type_lables = {
          'info': 'Сообщение',
          'feedback': 'Отзыв',
        };

        switch (data.req_type) {
          case 'info':
            var subject = 'Поступило новое сообщение';
            var html = `
              <h2>Поступило сообщение</h2>
              <hr>
              <h3>Тип: ${req_type_lables[data.req_type]}</h3>
              <table style="border: 1px; color: #8AB512;">
            `;
            break;
          case 'feedback':
            var subject = 'Поступил новый отзыв';
            var html = `
              <h2>Поступил отзыв</h2>
              <hr>
              <h3>Тип: ${req_type_lables[data.req_type]}</h3>
              <table style="border: 1px; color: #8AB512;">
            `;
            break;

        }


        var i = 0;
        var styleOne = 'style = "background:#FFF; color:#000"';
        var styleTwo = 'style = "background:#DFE7C0; color:#000"';
        keys.forEach(function (key) {
          if (data[key]) {
            if (i%2) {
              html += `
              <tr ${styleOne}>
                <td>${lables[key]}</td>
                <td>${data[key]}</td>
              </tr>
            `;
            } else {
              html += `
              <tr ${styleTwo}>
                <td>${lables[key]}</td>
                <td>${data[key]}</td>
              </tr>
            `;
            }
            i++;
          }
        });

        html += '</table>';

        EmailService.sendEmail(subject, html);

        return res.ok({result: 'ok', data: data});
      });
  },
};

