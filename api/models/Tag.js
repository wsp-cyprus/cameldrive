/**
 * Tag.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'tag',
  attributes: {
    lang: {
      type: 'string',
      size: 2
    },
    key: {
      type: 'string',
      size: 50
    },
    tag: {
      type: 'string',
      size: 255
    },
  },
};

