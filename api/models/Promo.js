/**
 * Promo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'promo',
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
    header: {
      type: 'string',
      size: 255
    },
    subheader: {
      type: 'string',
      size: 255
    },
    content: {
      type: 'text',
    },
  },
};

