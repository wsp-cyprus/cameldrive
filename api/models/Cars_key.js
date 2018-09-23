/**
 * Cars_key.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'cars_key',
  attributes: {
    lang: {
      type: 'string',
      size: 2
    },
    order: {
      type: 'integer',
    },
    group: {
      type: 'integer',
    },
    key: {
      type: 'string',
      size: 50
    },
    label: {
      type: 'string',
      size: 255
    },
    show: {
      type: 'integer',
    },
  },
};

