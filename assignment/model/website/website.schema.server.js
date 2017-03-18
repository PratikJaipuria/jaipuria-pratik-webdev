/**
 * Created by Pratik on 3/8/2017.
 */
module.exports = function() {
    var mongoose = require("mongoose");

    // var PageSchema = require("../page/page.schema.server.js")();
    // var UserSchema = require("../user/user.schema.server.js")();

    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref: "UserSchema"},
        name: String,
        description: String,
        dateCreated: {type: Date, default: Date.now},
        pages: [String]
    }, {collection: "assignment.website"});

    return WebsiteSchema;
};