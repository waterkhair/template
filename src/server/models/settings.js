// Modules
import Mongoose from 'mongoose';

export default Mongoose.model('Settings', new Mongoose.Schema({
    theme: {
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
