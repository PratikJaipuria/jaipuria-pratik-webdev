/**
 * Created by Pratik on 3/7/2017.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var model = {
        userModel: require("./user/user.model.server")(),
        websiteModel: require("./website/website.model.server")(),
        pageModel: require("./page/page.model.server")(),
        widgetModel: require("./widget/widget.model.server")()
    };

    return model;
};
