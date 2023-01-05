const mongoose = require('mongoose');
const rolesEnum = require('../configs/roles.enum');

const UserScheme = new mongoose.Schema({
  firstName: { type: String, trim: true, default: '' },
  lastName: { type: String, trim: true, default: '' }, 
  email: { type: String, trim: true, lowercase: true, required: true, unique: true },
  phone: { type: String },
  age: { type: Number },
  role: { type: String, enum: Object.values(rolesEnum), default: rolesEnum.USER },
  password: { type: String, require: true}
},
{
  timestamps: true,
  // id: true,
  // _id: false,
  versionKey: false,
}
);

module.exports = mongoose.model('User', UserScheme);
