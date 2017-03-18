/**
 * Created by Pratik on 2/22/2017.
 */



module.exports = function (app,model) {
    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": "2", "text": "EXPLORE"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "New Measurements of the Universe Expanding Tell a Confusing Story"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://www.hdbloggers.net/wp-content/uploads/2016/11/Art-Beautiful-Wallpapers.jpg"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/6pxRHBw-k8M" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

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

            ///call update function


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
                .then(function () {
                    res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
                })


        }else{

            // var widgetId = ((new Date()).getTime()).toString();

            var newWidget = {
                // _id: widgetId,
                widgetType: "IMAGE",
                // pageId: pageId,
                width: width,
                url: req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename
                // url:widget.url
            };
            // widgets.push(newWidget);
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


        // for (var i in widgets) {
        //
        //     if (widgets[i]._id == widgetId) {
        //         widgets[i].width = width;
        //         widgets[i].url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
        //
        //     }
        // }


        // res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
    }


    function deleteWidget(req,res) {
        var widgetId = req.params.widgetId;

        // console.log(widgetId);
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                // console.log(widget)
                pageModel
                    .deleteWidgetId(widget._page,widget._id)
                    .then(function (widgetid) {
                        // console.log(widgetid);
                        widgetModel
                            .deleteWidget(widgetid)
                            .then(function () {
                                 res.sendStatus(200);
                                // console.log("service",widgetid)
                            })
                    })
            });
        // for(var w in widgets) {
        //     if(widgets[w]._id == widgetId) {
        //         widgets.splice(w, 1);
        //     }
        // }

    }

    function updateWidget(req,res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;

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