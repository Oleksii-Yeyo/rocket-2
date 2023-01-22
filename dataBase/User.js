const rolesEnum = require('../configs/roles.enum');
const mongoose = require('mongoose');


const secureFields = [
    'password'
]


const UserSchema = new mongoose.Schema({
        firstName: {type: String, trim: true, default: ' '},
        lastName: {type: String, trim: true, default: ' '},
        email: {type: String, trim: true, lowercase: true, required: true, unique: true},
        age: {type: Number,min: 8, max: 101, require: true},
        password: {type: String, min: 5, required: true, default: "", select: false},
        role: {type: String, enum: Object.values(rolesEnum), default: rolesEnum.USER},
        // id: {type: String, select: false}   // disable ID
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            virtuals: true,     // enable virtual fields
            transform: function ( doc, ret ){      // delete item in object
                for (const field of secureFields) {
                    delete ret[field];
                }
                
                return ret;
            }
        },
        toObject: {
            virtuals: true,
            transform: function ( doc, ret ){
                for (const field of secureFields) {
                    delete ret[field];
                }

                return ret;
            }
        }
    }
);

module.exports = mongoose.model('User', UserSchema);