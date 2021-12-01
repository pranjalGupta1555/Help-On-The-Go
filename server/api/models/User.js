import Mongoose from 'mongoose';

const UserSchema = new Mongoose.Schema({
    email: {
        type: String,
        required: "Please enter email address",
        max: 255
    }, 
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    userType: {
        type: String,
        default: 'user'
    },
    location:{
        type: String,
        required: true
    },
    skillset: [],
    interaction: [],
    profileImage: {
        type: String
    },
    tagLine: {
        type: String
    },
    introductoryStatement: {
        type: String
    }

}, {
    versionKey: false
});

UserSchema.virtual('id', () => this._id.toHexString());
UserSchema.set('toJSON', { virtuals: true });

const User = Mongoose.model('User', UserSchema);

export default User;