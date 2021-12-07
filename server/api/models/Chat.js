import Mongoose from "mongoose";

const ChatSchema = new Mongoose.Schema({
    "chatId" : {
        type: String,
        required: "Chat id is required"
    },
    "users":{
        type: Array,
        required: "Users are required"
    }
},
{
    versionKey: false
});

ChatSchema.virtual('id', () => this._id.toHexString());
ChatSchema.set('toJSON', {virtuals: true});

const Chat = Mongoose.model('Chat', ChatSchema);

export default Chat;