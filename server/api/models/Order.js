import Mongoose from "mongoose";

/** Following schema represents the structure of Domain JSON document.
 * It expresses the expected keys (properties) and values as well as associcated constraints and indexes.
 */
const OrderSchema = new Mongoose.Schema({
    "seekerId": {
        type: String // each Order should have a seekerId
    },
    "helperId": {
        type: String // represents the helper Id
    },
    "interactionId": {
        type: String // specifies the interactionId
    },
    "rating": {
        type: Number // specifies rating given by the seeker
    },
    "review": {
        type: String // specifies review given by the seeker
    },
    "skillName": {
        type: String, // specifies skill of the helper which seeker asked for
        default: ''
    },
    "domainName": {
        type: String, // specifies domain of the helper which seeker asked for
        default: ''
    },
    "createdDate": {
        type: Date,
        default: Date.now // default value of createdDate property is current date and time
    }
}, {
    versionKey: false
});

// following line of code converts the auto-generated _id (created by mongoose) attribute to HexString and assigns it to a new id attribute
OrderSchema.virtual('id', () => this._id.toHexString());

OrderSchema.set('toJSON', { virtuals: true });

const Order = Mongoose.model('Order', OrderSchema);

export default Order;