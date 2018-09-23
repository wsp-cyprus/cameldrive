"use strict";

var _ = require('lodash');
var objNum = '';
var imgFileNameElement = '$$$_-_$$$';

module.exports = {
  upload: function (req, res) {

    // console.log('<== FileController.js:upload ==>');

    // console.log('req.allParams():');
    // console.dir(req.allParams());

    objNum = req.allParams().obj;

    req.file('someimg').upload({
      dirname: '../../assets/img',
      saveAs: setFileName,
    }, function (err, uploadedFiles) {
      if (err) return res.send(500, err);
      var result = {
        message: uploadedFiles.length + ' file(s) uploaded successfully!',
        files: uploadedFiles
      };

      // console.log('FileController, upload result:');
      // console.dir(result);

      return res.json(result);
    });

  }, // upload

  uploadmain: function (req, res) {

    // console.log('<== FileController.js:uploadmain ==>');

    // console.log('req.allParams():');
    // console.dir(req.allParams());

    objNum = req.allParams().obj;

    req.file('someimgmain').upload({
      dirname: '../../assets/img',
      saveAs: setFileNameMain,
    }, function (err, uploadedFiles) {
      if (err) return res.send(500, err);
      var result = {
        message: uploadedFiles.length + ' file(s) uploaded successfully!',
        files: uploadedFiles
      };

      // console.log('FileController, uploadmain result:');
      // console.dir(result);

      return res.json(result);
    });

  }, // uploadmain

  upload2: function (req, res) {

    // console.log('<== FileController.js:upload2 ==>');

    // console.log('req.allParams():');
    // console.dir(req.allParams());

    objNum = req.allParams().obj;

    req.file('someimg2').upload({
      dirname: '../../.tmp/public/img',
      saveAs: setFileName,
    }, function (err, uploadedFiles) {
      if (err) return res.send(500, err);
      var result = {
        message: uploadedFiles.length + ' file(s) uploaded successfully!',
        files: uploadedFiles
      };

      // console.log('FileController, upload2 result:');
      // console.dir(result);

      return res.json(result);
    });

  }, // upload2

  uploadmain2: function (req, res) {

    // console.log('<== FileController.js:uploadmain2 ==>');

    // console.log('req.allParams():');
    // console.dir(req.allParams());

    objNum = req.allParams().obj;

    req.file('someimgmain2').upload({
      dirname: '../../.tmp/public/img',
      saveAs: setFileNameMain,
    }, function (err, uploadedFiles) {
      if (err) return res.send(500, err);
      var result = {
        message: uploadedFiles.length + ' file(s) uploaded successfully!',
        files: uploadedFiles
      };

      // console.log('FileController, uploadmain2 result:');
      // console.dir(result);

      return res.json(result);
    });

  }, // uploadmain2

};

function setFileName(__newFileStream, next) {
/*
  console.log('setFileName, __newFileStream');
  console.log('headers');
  console.dir(__newFileStream.headers);
  console.log('name: ', __newFileStream.name);
  console.log('filename: ', __newFileStream.filename);
  console.log('byteCount: ', __newFileStream.byteCount);
  console.log('field: ', __newFileStream.field);
*/

  return next(undefined, objNum + '_' +
    imgFileNameElement + '_' + __newFileStream.filename);
} // setFileName

function setFileNameMain(__newFileStream, next) {
  return next(undefined, objNum + '_main_' +
    imgFileNameElement + '_' + __newFileStream.filename);
} // setFileNameMain