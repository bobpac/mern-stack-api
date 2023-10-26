const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
    postal_code: { type: String, required: true },
    country_code: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    state_code: { type: String, required: true },
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true}
}, {
    timestamps: true,
}
);

module.exports = mongoose.model('City', citySchema)