const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const personSchema = new Schema({
      name: {
            type: String,
            unique: true,
            required: true,
            default: 'Ananymous',

      },

      age: {
            type: Number,
            default: 0,

      },

      favoriteFoods: {
            type: [String],
            default: undefined
      },

});

const personModel = mongoose.model('person', personSchema);
module.exports = personModel;