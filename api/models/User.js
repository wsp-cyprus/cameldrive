/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'user',
  attributes: {

    username: {
      type: 'string',
      unique: 'true'
    },

    pw: {
      type: 'string'
    },

    admin: {
      type: 'boolean'
    },

    deleted: {
      type: 'boolean'
    },

  },
};
