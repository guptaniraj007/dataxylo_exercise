// Dependencies
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Defines the superhero schema
var dataSchema = new Schema({
    text: {type: String, required: true},
    file: {type: Schema.Types.Mixed, required: true},
    createdAt: {type: Date, default: Date.now},    
});

// Sets the createdAt parameter equal to the current time
dataSchema.pre('save', function(next){
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

// Exports the SuperheroSchema for use elsewhere.
module.exports = mongoose.model('data', dataSchema);