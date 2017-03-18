/**
 * Created by Pratik on 3/16/2017.
 */
module.exports = function() {
    var mongoose = require("mongoose");

    // var PageSchema = require("../page/page.schema.server.js")();
    // var UserSchema = require("../user/user.schema.server.js")();

    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.ObjectId, ref: "PageSchema"},
        widgetType: {
                type: String,
                enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']

            },
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: String,
        size: String,
        class: String,
        icon: String,
        deletable: String,
        formatted: String,
        order:Number,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.widget"});

    return WidgetSchema;
};