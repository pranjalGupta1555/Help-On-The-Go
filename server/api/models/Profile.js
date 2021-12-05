import Mongoose from "mongoose";

/** Following schema is for user profile image */
const profileSchema = new Mongoose.Schema({
    profId: {
        type: String,
        required: true
    },
    image: {
        type: Buffer
    }
}, {
    versionKey: false
});

// following line of code converts the auto-generated _id (created by mongoose) attribute to HexString and assigns it to a new id attribute
profileSchema.virtual('id', () => this._id.toHexString());

profileSchema.set('toJSON', { virtuals: true });

const Profile = Mongoose.model('Profile', profileSchema);

export default Profile;