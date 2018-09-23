/**
 * Luggage.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'luggage',
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
    luggage_a: {
      type: 'integer',
    },
    luggage_b: {
      type: 'integer',
    },
    luggage_text: {
      type: 'string',
      size: 255
    },
  },
};

