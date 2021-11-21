import Mongoose from "mongoose";

/** Following schema represents the structure of Domain JSON document.
 * It expresses the expected keys (properties) and values as well as associcated constraints and indexes.
 */
const DomainSchema = new Mongoose.Schema({
    "name": {
        type: String,
        required: "Name is a required field." // each domain should have a domain
    },
    "skills": {
        type: Array, // represents skill sets under each domain
    },
    "imagePath": {
        type: String, // specifies path to the image associated with the domain
    }
},
{
    versionKey: false
});

// following line of code converts the auto-generated _id (created by mongoose) attribute to HexString and assigns it to a new id attribute
DomainSchema.virtual('id', () => this._id.toHexString());

DomainSchema.set('toJSON', {virtuals: true});

const Domain = Mongoose.model('Domain', DomainSchema);

export default Domain;