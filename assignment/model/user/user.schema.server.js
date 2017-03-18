/**
 * Created by Pratik on 3/7/2017.
 */

module.exports = function() {
    var mongoose = require("mongoose");

    //var WebsiteSchema = require("../website/website.schema.server")();
    var UserSchema = mongoose.Schema({
        // _id: String,
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteSchema"}],
        dateCreated: {type: Date, default: Date.now}

    }, {collection: "assignment.user"});
    return UserSchema;
};
