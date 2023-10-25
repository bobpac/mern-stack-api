const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
    zipCode: { type: String, required: true },
    countryCode: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    stateCode: { type: String, required: true },
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true}
}, {
    timestamps: true,
}
);

module.exports = mongoose.model('City', citySchema)