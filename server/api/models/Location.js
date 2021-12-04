import Mongoose from "mongoose";

/** Following schema represents the structure of Domain JSON document.
 * It expresses the expected keys (properties) and values as well as associcated constraints and indexes.
 */
const LocationSchema = new Mongoose.Schema({
    places: []
}, {
    versionKey: false
});

// following line of code converts the auto-generated _id (created by mongoose) attribute to HexString and assigns it to a new id attribute
LocationSchema.virtual('id', () => this._id.toHexString());

LocationSchema.set('toJSON', { virtuals: true });

const Location = Mongoose.model('Location', LocationSchema);

export default Location;