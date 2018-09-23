/**
 * Cars.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'cars',
  attributes: {
    car_id: {
      type: 'string',
      size: 25
    },
    lang: {
      type: 'string',
      size: 2
    },
    show: {
      type: 'integer',
    },
    tag: {
      type: 'string',
      size: 50
    },
    group: {
      type: 'string',
      size: 50
    },
    transmission: {
      type: 'string',
      size: 50
    },
    capacity: {
      type: 'string',
      size: 50
    },
    climat: {
      type: 'string',
      size: 50
    },
    luggage: {
      type: 'string',
      size: 50
    },
    fuel: {
      type: 'string',
      size: 50
    },
    title: {
      type: 'text',
    },
    description: {
      type: 'text',
    },
    info: {
      type: 'text',
    },
    time_group_1_h: {
      type: 'integer',
    },
    time_group_2_h: {
      type: 'integer',
    },
    time_group_3_h: {
      type: 'integer',
    },
    time_group_4_h: {
      type: 'integer',
    },
    time_group_5_h: {
      type: 'integer',
    },
    time_group_1_l: {
      type: 'integer',
    },
    time_group_2_l: {
      type: 'integer',
    },
    time_group_3_l: {
      type: 'integer',
    },
    time_group_4_l: {
      type: 'integer',
    },
    time_group_5_l: {
      type: 'integer',
    },
    img: {
      type: 'string',
      size: 255
    },
  },
};

