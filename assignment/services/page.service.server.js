/**
 * Created by Pratik on 2/22/2017.
 */
module.exports = function (app) {
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.post("/api/website/:websiteId/page",createPage);
    app.put("/api/page/:pageId",updatePage);
    app.delete("/api/page/:pageId",deletePage);

    var pages = [
        {_id: "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
        {_id: "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
        {_id: "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
    ];


    function deletePage(req,res) {
        var pageId = req.params.pageId;

        for(var p in pages){
            if(pages[p]._id == pageId ){
                pages.splice(p,1);
            }
        }
    }

    function updatePage(req,res) {
        var pageId = req.params.pageId;
        var page = req.body;

        for(var p in pages){
            if(pages[p]._id == pageId){
                pages[p] = page;
                res.json(pages[p]);
                return;
                // return angular.copy(pages[p]);
            }
        }
    }

    function createPage(req,res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        page.websiteId = websiteId;
        page._id = ((new Date()).getTime()).toString();
        pages.push(page);
        res.json(page);
    }

    function findPageById(req,res) {
        var pageId = req.params.pageId;
        for(var p in pages){
            if(pages[p]._id == pageId){
                // return angular.copy(pages[p]);
                res.json(pages[p]);
            }
        }
    }


    function findAllPagesForWebsite(req,res) {
        var websiteId = req.params.websiteId;

        var webpages = [];
        for(var p in pages){
            if(pages[p].websiteId == websiteId){
                //return angular.copy(pages[p]);
                webpages.push(pages[p]);
            }
        }
        // return webpages;
        res.json(webpages);
    }


}
