
const mongoose = require('mongoose');

const Shop = mongoose.model('Shop', {
    text : {
        type: String,
        trim: true,
        required: true
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
});

module.exports = {Shop};
