/**
 * Created by Pratik on 3/16/2017.
 */
module.exports = function() {
    var mongoose = require("mongoose");

    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.ObjectId, ref: "WebsiteSchema"},
        name: String,
        title: String,
        description: String,
        widgets: [String],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.page"});

    return PageSchema;
};