/**
 * Created by Pratik on 3/16/2017.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var q = require("q");
    var widgetModel = mongoose.model("widgetModel", WidgetSchema);

    var api = {
        createWidget:createWidget,
        findAllWidgetsForPage:findAllWidgetsForPage,
        findWidgetById:findWidgetById,
        updateWidget:updateWidget,
        deleteWidget:deleteWidget,
        reorderWidget:reorderWidget
    };

    return api;


    function deleteWidget(widgetId) {
        // console.log("model",widgetId);
        var deferred = q.defer();
        widgetModel.findOne({_id:widgetId},function (err,widget) {
            // console.log("WIDGET",widget);
            if (err) {
                deferred.abort()
            } else {
                widgetModel
                    .find({_page: widget._page}, function (err,widgets) {
                        if(err){
                            deferred.abort()
                        }else{
                        // console.log("ORDER",i);
                        // console.log("Array of widgets",widgets)
                        widgetlength = widgets.length;
                        // console.log("widgetlen",widgets.length);
                        widgetModel.remove({_id: widgetId}, function (err,data) {
                                if (err) {
                                    deferred.abort(err);
                                } else {
                                    var i ;

                                    console.log("length",widgetlength);
                                    for (i = widget.order+1; i < widgetlength; i++) {
                                        console.log(i);
                                        widgetModel.update({"order": i}, {
                                                $set: {
                                                    "order": i-1
                                                }
                                            },function (err,data) {
                                            if(err){
                                                deferred.abort()
                                            }else{
                                                deferred.resolve()
                                            }
                                        })
                                    }
                                    deferred.resolve();
                                }
                            });
                        }});
                    }

        });

        return deferred.promise;
    }


    function updateWidget(widgetId, widget) {
        var deferred = q.defer();


        widgetModel
            .update({_id:widgetId},{
                $set: {
                    widgetType:widget.widgetType,
                    name: widget.name,
                    text: widget.text,
                    placeholder: widget.placeholder,
                    description: widget.description,
                    url: widget.url,
                    width: widget.width,
                    height: widget.height,
                    rows: widget.rows,
                    size: widget.size,
                    class: widget.class,
                    icon: widget.icon,
                    deletable: widget.deletable,
                    formatted: widget.formatted,
                    order:widget.order

                }
    },function (err,widget) {
        if (err){
            deferred.abort(err);
        }else{
            deferred.resolve(widget);
        }
    });
        return deferred.promise;
    }
    
    function findWidgetById(widgetId) {
        var deferred = q.defer();

        widgetModel
            .findOne({_id: widgetId},function (err,widget) {
                if(err){
                    // console.log("widget model server findbyID",err);
                    deferred.abort(err);
                }else {
                    deferred.resolve(widget);
                }

            });
        return deferred.promise;
    }


    function findAllWidgetsForPage(pageId) {
        var deferred = q.defer();

        widgetModel.find({"_page": pageId},function (err,widgets) {
            if (err){
                console.log("widget model server findAllwidget for page",err);
                deferred.abort(err);
            }else {

                deferred.resolve(widgets);
            }}).sort({'order': 1});


        return deferred.promise;
    }


    function createWidget(pageId, widget) {
        var deferred = q.defer();
        widget._page = pageId;
        // var order;

        widgetModel
            .find({"_page": pageId},function (err,widgets) {
            if(widgets.length >= 0) {
            widget.order = widgets.length;
            widgetModel
                .create(widget, function (err, widget) {
                    if (err) {
                        deferred.abort(err);
                    } else {
                        deferred.resolve(widget);
                    }

                });
            }else{
                deferred.abort(err);
            }});

            return deferred.promise;


    }
    
    function reorderWidget(pageId, initial, final) {
        var deferred = q.defer();

        widgetModel
            .find({_page:pageId},function (err,widgets) {
                if(err){
                    deferred.abort()
                }else{

                    widgetModel.findOne({order:initial},function (err,widget) {
                        if(err){
                            deferred.abort();
                        }else {

                            if (initial > final)
                            {
                                var i;
                                for (i= initial - 1; i >= final ; i--)
                                {
                                    widgetModel
                                        .update({order:i},{
                                            $set: {
                                                order:i+1}},function (err,msg) {
                                            if(err){
                                                deferred.reject();
                                            }else{
                                                deferred.resolve(widgets);
                                            }
                                        })
                                }
                                widgetModel
                                    .update({_id:widget._id},{
                                        $set:{order:final}},function (err,msg) {
                                            if(err){
                                                deferred.reject();
                                            }else{
                                                deferred.resolve(widget);
                                            }
                                        });

                            }else{

                                var i;
                                for (i= initial+1; i <= final ; i++)
                                {
                                    widgetModel
                                        .update({order:i},{
                                            $set: {
                                                order:i-1}},function (err,msg) {
                                            if(err){
                                                deferred.abort();
                                            }else{
                                                deferred.resolve(widgets);
                                            }
                                        })
                                }
                                widgetModel
                                    .update({_id:widget._id},{
                                        $set:{order:final}},function (err,msg) {
                                        if(err){
                                            deferred.abort();
                                        }else{
                                            deferred.resolve(widget);
                                        }
                                    });

                            }
                        }

                    });

                    }});

        return deferred.promise;
    }

};