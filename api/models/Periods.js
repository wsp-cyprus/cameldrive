/**
 * Periods.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'periods',
  attributes: {
    lang: {
      type: 'string',
      size: 2
    },
    show: {
      type: 'integer',
    },
    order: {
      type: 'integer',
    },
    key: {
      type: 'string',
      size: 50
    },
    period: {
      type: 'string',
      size: 255
    },
  },
};

