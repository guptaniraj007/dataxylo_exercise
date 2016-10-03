var mongoose = require('mongoose');

var modelSchema = new mongoose.Schema({
	text: {type: String, required: true},
	file: {type: mongoose.Schema.Types.Mixed, required: true},
	createdAt: {type: Date, default: Date.now}
});

mongoose.model('Model', modelSchema);