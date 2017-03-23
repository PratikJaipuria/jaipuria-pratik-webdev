/**
 * Created by Pratik on 2/22/2017.
 */

module.exports = function (app,model) {

    var pageModel = model.pageModel;
    var widgetModel = model.widgetModel;

    var multer = require('multer'); // npm install multer --save

    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.get("/api/page/:pageId/widget",findWidgetsByPageId);
    app.post("/api/page/:pageId/widget",createWidget);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.put("/api/page/:pageId/widget",updateIndex);


    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage: storage});

    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {
        var pageId = req.body.pageId;
        var widgetId_update = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var myFile = req.file;
        var destination = myFile.destination; // folder where file is saved to
        if (widgetId_update) {

            var widgetId = widgetId_update;
            var newWidget = {
                // _id: widgetId,
                widgetType: "IMAGE",
                // pageId: pageId,
                width: width,
                url: req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename
                // url:widget.url
            };


            widgetModel
                .updateWidget(widgetId,newWidget)
                .then(
                    function (widget) {
                    res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
                });

                //     function (widget) {
                //         console.log("update image widget",widget);
                //         res.json(widget);
                //     },
                //     function (err) {
                //         res.sendStatus(400).send(err);
                //     }
                // );

        }else{



            var newWidget = {
                // _id: widgetId,
                widgetType: "IMAGE",
                // pageId: pageId,
                width: width,
                url: req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename
                // url:widget.url
            };

            widgetModel
                .createWidget(pageId,newWidget)
                .then(function (widget) {
                        pageModel
                            .addWidgetId(widget._id,pageId)
                            .then(function (widget) {
                                // res.json(widget)
                                res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
                                },function () {
                                res.sendStatus(400);
                            })
                    },
                    function (error) {
                        res.sendStatus(500).send(error);
                    })

        }
    }


    function deleteWidget(req,res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                pageModel
                    .deleteWidgetId(widget._page,widget._id)
                    .then(function (widgetid) {
                        widgetModel
                            .deleteWidget(widgetid)
                            .then(function () {
                                 res.sendStatus(200);

                            })
                    })
            });
    }

    function updateWidget(req,res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        // console.log("update server",widget,widgetId);
        widgetModel
            .updateWidget(widgetId,widget)
            .then(function (widget) {
                res.json(widget)
            },function (err) {
            res.sendStatus(400).send(err)
        });

        }


    function findWidgetsByPageId(req,res) {
        var pageId = req.params.pageId;

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets)
            },function (error) {
                res.sendStatus(500).send(error);
            });

    }

    function createWidget(req,res) {
        var pageId = req.params.pageId;
        var widget = req.body;

        // widget.pageId = pageId;
        // widget._id = ((new Date()).getTime()).toString();

        if(widget.widgetType == "TEXT"){

            var newWidget = {
                widgetType: "TEXT",
                text:widget.text,
                rows:widget.rows,
                placeholder:widget.placeholder,
                formatted:widget.formatted
            };

            widgetModel
                .createWidget(pageId,newWidget)
                .then(function (widget) {
                        pageModel
                            .addWidgetId(widget._id,pageId)
                            .then(function (widget) {
                                res.json(widget)
                            },function () {
                                res.sendStatus(400);
                            })
                    },
                    function (error) {
                        res.sendStatus(500).send(error);
                    })


        }

        if(widget.widgetType == "HEADER"){

            var newWidget = {
                widgetType: "HEADER",
                size:widget.size,
                text:widget.text
            };

            widgetModel
                .createWidget(pageId,newWidget)
                .then(function (widget) {
                    pageModel
                        .addWidgetId(widget._id,pageId)
                        .then(function (widget) {
                            res.json(widget)
                        },function () {
                        res.sendStatus(400);
                    })
                    },
                    function (error) {
                        res.sendStatus(500).send(error);
                })


        }

        if(widget.widgetType == "IMAGE"){

            var newWidget = {

                widgetType: "IMAGE",
                width:widget.width,
                url:widget.url
            };

            widgetModel
                .createWidget(pageId,newWidget)
                .then(function (widget) {
                        pageModel
                            .addWidgetId(widget._id,pageId)
                            .then(function (widget) {
                                res.json(widget)
                            },function () {
                                res.sendStatus(400);
                            })
                    },
                    function (error) {
                        res.sendStatus(500).send(error);
                    })


        }

        if(widget.widgetType == "YOUTUBE"){

            var newWidget = {
                widgetType: "YOUTUBE",
                width:widget.width,
                url:widget.url
            };

            widgetModel
                .createWidget(pageId,newWidget)
                .then(function (widget) {
                        pageModel
                            .addWidgetId(widget._id,pageId)
                            .then(function (widget) {
                                res.json(widget)
                            },function () {
                                res.sendStatus(400);
                            })
                    },
                    function (error) {
                        res.sendStatus(500).send(error);
                    })



        }

        if(widget.widgetType == "HTML"){

            var newWidget = {

                widgetType: "HTML",
                text:widget.text
            };

            widgetModel
                .createWidget(pageId,newWidget)
                .then(function (widget) {
                        pageModel
                            .addWidgetId(widget._id,pageId)
                            .then(function (widget) {
                                res.json(widget)
                            },function () {
                                res.sendStatus(400);
                            })
                    },
                    function (error) {
                        res.sendStatus(500).send(error);
                    })



        }

    }


    function findAllWidgetsForPage(req,res) {
        var pageId = req.params.pageId;

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
               res.json(widgets)
            },function (error) {
                res.sendStatus(500).send(error);
            });

    }

    function findWidgetById(req,res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .findWidgetById(widgetId)
            .then(function(widget){
                res.json(widget)
            },function (error) {
                res.sendStatus(500).send(error);

            });

    }


    function updateIndex(req, res){
        var pageId=req.params.pageId;
        var initial=req.query.initial;
        var final=req.query.final;

        // pageModel
        //     .getSequenceofWidget(pageId)
        //     .then(function (arr) {
        //          console.log(arr);
        //         // for (i; arr.widgets.length();i++)
        //         //     console.log(i);
        //
        //     });

        widgetModel.reorderWidget(pageId, initial, final)
            .then(function () {
                res.sendStatus(200);
            }, function () {
                res.sendStatus(404);
            })
    }

};