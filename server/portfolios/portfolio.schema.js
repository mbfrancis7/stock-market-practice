const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  portfolio: { type: Object, required: true},
  },
  {timestamps: true}
)

module.exports = mongoose.model('portfolio', portfolioSchema);