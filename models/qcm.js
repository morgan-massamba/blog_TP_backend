const mongoose = require('mongoose');

const qcmSchema = new mongoose.Schema(
    {
        itemId: { type: String, required: true },
        question: { type: String, required: true },
        answer: { type: Number, required: true },
        options: { type: [mongoose.SchemaTypes.Mixed], required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Qcm', qcmSchema);
