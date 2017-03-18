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

    var websites = [
        { _id: "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date() },
        { _id: "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date() },
        { _id: "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date() },
        { _id: "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date() },
        { _id: "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date() },
        { _id: "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date() }
    ];


    function deleteWebsite(req,res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {

                userModel
                    .deleteWebsiteId(website._user, website._id)

                    .then(function (websiteid){
                        // console.log(website);
                        websiteModel
                            .deleteWebsite(websiteid)
                            .then(function () {
                                // res.sendStatus(200);
                            })
                    });
            });
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