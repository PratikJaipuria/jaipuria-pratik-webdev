/**
 * Created by Pratik on 2/22/2017.
 */
module.exports = function (app,model) {
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.post("/api/website/:websiteId/page",createPage);
    app.put("/api/page/:pageId",updatePage);
    app.delete("/api/page/:pageId",deletePage);

    var pageModel = model.pageModel;
    var websiteModel = model.websiteModel;
    var widgetModel = model.widgetModel;

    // var pages = [
    //     {_id: "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    //     {_id: "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    //     {_id: "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
    // ];


    function deletePage(req,res) {
        var pageId = req.params.pageId;
        // pageModel
        //     .findPageById(pageId)
        //     .then(function (page) {
        //         websiteModel
        //             .deletePageId(page._website,page._id)
        //             .then(function() {
        //                 widgetModel
        //                     .findAllWidgetsForPage(page._id)
        //                     .then(function (widgets) {
        //                         var pageid = page._id;
        //                         // console.log(pageid);
        //                         if(widgets.length > 0){
        //                             console.log(widgets);
        //                             widgetModel
        //                                 .deleteWidgetforPage(widgets)
        //                                 .then(function (pageinfo) {
        //                                     console.log("Yepiiiiiieeeeeeeeee",pageid);
        //
        //                                     pageModel
        //                                         .deletePage(pageid)
        //                                         .then(function () {
        //                                             res.sendStatus(200);
        //                                         })
        //                                 })
        //
        //                                 }else{pageModel
        //                                         .deletePage(pageid)
        //                                         .then(function () {
        //                                             res.sendStatus(200);
        //                                     });}
        //                                     });
        //
        //            })
        //     });
        //res.sendStatus(200);

        // // var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    // console.log("widgets===>",page.widgets);
                    widgetModel
                        .deleteWidgetforPage(page.widgets)
                        .then(
                            function () {
                                console.log(page._website);
                                websiteModel
                                    .deletePageId(page._website, pageId)
                                    .then(
                                        function (website) {
                                        pageModel
                                                .deletePage(pageId)
                                                .then(
                                                    function (page) {
                                                        res.json(page)
                                                    },
                                                    function (err) {
                                                        res.sendStatus(400).send(err);
                                                    }
                                                );
                                        },
                                        function (err) {
                                            res.sendStatus(400).send(err);
                                        }
                                    );
                            },
                            function (err) {
                                res.sendStatus(400).send(err);
                            }
                        );

                }, function (err) {
                    res.sendStatus(400).send(err);
                }
            );

    }
















    function updatePage(req,res) {
        var pageId = req.params.pageId;
        var page = req.body;

        pageModel
            .updatePage(pageId,page)
            .then(function (page) {
                res.json(page)
            },function (error) {
                res.sendStatus(500).send(error);

            });
    }

    function createPage(req,res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        pageModel
            .createPage(websiteId,page)
            .then(function (page) {
                //res.json(page);
                websiteModel
                    .addPageId(websiteId,page._id)
                    .then(function (page) {
                        res.json(page);
                    }), function () {
                    res.sendStatus(404);
                }
                },
                function (error) {
                    res.sendStatus(500).send(error);
                    // console.log("error",error);
                }
            );
    }


    function findPageById(req,res) {
        var pageId = req.params.pageId;

        pageModel
            .findPageById(pageId)
            .then(function(page){
                // console.log("Pageeeeeeeeeeeeee",page);
                res.json(page)
            },function (error) {
                res.sendStatus(500).send(error);

        });
    }


    function findAllPagesForWebsite(req,res) {
        var websiteId = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (webpages) {
                res.json(webpages);
            },function (error) {
                res.sendStatus(500).send(error);
            });

    }


};
