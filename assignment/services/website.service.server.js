/**
 * Created by Pratik on 2/22/2017.
 */
module.exports = function (app,model) {
        app.get("/api/user/:userId/website",findAllWebsitesForUser);
        app.get("/api/website/:wid",findWebsiteById);
        app.post("/api/user/:userId/website",createWebsite);
        app.put("/api/website/:websiteId",updateWebsite);
        app.delete("/api/website/:websiteId",deleteWebsite);

    var websiteModel = model.websiteModel;
    var userModel = model.userModel;
    var pageModel = model.pageModel;
    var widgetModel = model.widgetModel;



    function deleteWebsite(req,res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                console.log("website", website);
                userModel
                    .deleteWebsiteId(website._user, website._id)

                    .then(function (websiteid) {
                        console.log("website id after deleting ", websiteid);
                        pageModel
                            .findAllPagesForWebsite(websiteId)
                            .then(function (pages) {
                                for (var p = 0; p < pages.length; p++) {
                                    pageModel
                                        .findPageById(pages[p]._id)
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
                                                        });

                                            }, function (err) {
                                                res.sendStatus(400).send(err);
                                            }
                                        );
                                }
                            });

            });
                websiteModel
                    .deleteWebsite(websiteId)
                    .then(function () {
                        res.json(200);
                    })
            });
        // websiteModel
        //     .findWebsiteById(websiteId)
        //     .then(
        //         function (website) {
        //             pageModel
        //                 .deleteAllPagesForThisWebsite(website.pages)
        //                 .then(
        //                     function () {
        //                         userModel
        //                             .removeWebsiteFromUser(websiteId, website._user[0])
        //                             .then(
        //                                 function (website) {
        //                                     websiteModel
        //                                         .deleteWebsite(websiteId)
        //                                         .then(
        //                                             function (website) {
        //                                                 res.json(website);
        //                                             },
        //                                             function (err) {
        //                                                 res.sendStatus(400).send(err);
        //                                             }
        //                                         );
        //                                 },
        //                                 function (err) {
        //                                     res.sendStatus(400).send(err);
        //                                 }
        //                             );
        //                     },
        //                     function (err) {
        //                         res.sendStatus(400).send(err);
        //                     }
        //                 );
        //         },
        //         function (err) {
        //             res.sendStatus(400).send(err);
        //         });


    }



    function findWebsiteById(req,res) {
        var wid = req.params.wid;
        websiteModel
            .findWebsiteById(wid)
            .then( function (website) {
                    res.json(website);
                },
                function (error) {
                    res.sendStatus(222);//.send(error);
                }
            );
    }

    function updateWebsite(req,res){
        var websiteId = req.params.websiteId;
        var website = req.body;
        websiteModel
            .updateWebsite(websiteId, website)
            .then( function (website) {
                    res.json(website);
                },
                function (error) {
                    res.sendStatus(222);//.send(error);
                }
            );
    }

    function createWebsite(req,res) {

        var userId = req.params.userId;
        var website = req.body;

        websiteModel
            .createWebsiteForUser(userId, website)
            .then(
                function(website) {
                    userModel
                        .addWebsiteId(userId, website._id)
                        .then(function (user) {
                           res.json(website);
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



    function findAllWebsitesForUser(req,res) {
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (sites) {
                // console.log(sites);
                res.json(sites);
            },
            function (error) {
                res.sendStatus(500).send(error);
            }

    );
        // return sites;
    }


        
}