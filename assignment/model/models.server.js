/**
 * Created by Pratik on 3/7/2017.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    // var userModel = require("./user/user.model.server")();
    // var websiteModel = require("./website/website.model.server")();
    // var pageModel =  require("./page/page.model.server")();
    // var widgetModel =  require("./widget/widget.model.server")();

    var model = {
        userModel: require("./user/user.model.server")(),
        websiteModel: require("./website/website.model.server")(),
        pageModel: require("./page/page.model.server")(),
        widgetModel: require("./widget/widget.model.server")()
    };

    // pageModel.setModel(model);
    // userModel.setModel(model);
    // websiteModel.setModel(model);
    // widgetModel.setModel(model);
    return model;


};
