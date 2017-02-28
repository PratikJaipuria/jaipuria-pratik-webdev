/**
 * Created by Pratik on 2/22/2017.
 */
module.exports = function (app) {
        app.get("/api/user/:userId/website",findAllWebsitesForUser);
        app.get("/api/website/:wid",findWebsiteById)
        app.post("/api/user/:userId/website",createWebsite);
        app.put("/api/website/:websiteId",updateWebsite);
        app.delete("/api/website/:websiteId",deleteWebsite);


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
        for(var w in websites) {
            if(websites[w]._id === websiteId) {
                websites.splice(w, 1);
            }
        }

    }

    function findWebsiteById(req,res) {
        var wid = req.params.wid;

        for(var w in websites) {
            if(websites[w]._id == wid) {
                // return angular.copy(websites[w]);
                // return websites[w] ;
                res.json(websites[w]);
                return;

            }
        }

    }

    function updateWebsite(req,res){
        var websiteId = req.params.websiteId;
        var website = req.body;

        for(var w in websites) {
            if(websites[w]._id == websiteId) {
                websites[w] = website;
                // websites[w] = website.description;
                // return angular.copy(websites[w]);
                res.json(websites[w]);
                return;
            }
        }


        // return null;

    }

    function createWebsite(req,res) {
        var userId = req.params.userId;
        var website = req.body;

        website.developerId = userId;
        website._id = ((new Date()).getTime()).toString();
        websites.push(website);
        res.json(website);

    }

    function findAllWebsitesForUser(req,res) {
        var userId = req.params.userId;
        var sites = [];
        for(var w in websites) {
            if(websites[w].developerId == userId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);
        // return sites;
    }


        
}