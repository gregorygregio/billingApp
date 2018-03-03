const mongoose = require('../../config/database')

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true, min:6, max:12},
});

module.exports = mongoose.model('User', userSchema)
