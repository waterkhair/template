// Modules
import Mongoose from 'mongoose';

export default Mongoose.model('User', new Mongoose.Schema({
    admin: {
        required: true,
        type: Boolean
    },
    email: {
        index: {
            unique: true
        },
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    username: {
        index: {
            unique: true
        },
        required: true,
        type: String
    }
}));
