/**
 * Capacity.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'capacity',
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
    capacity_a: {
      type: 'integer',
    },
    capacity_b: {
      type: 'integer',
    },
    capacity_text: {
      type: 'string',
      size: 255
    },
  },
};

