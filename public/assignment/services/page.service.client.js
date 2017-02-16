/**
 * Created by Pratik on 2/9/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            {_id: "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {_id: "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {_id: "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id = ((new Date()).getTime()).toString();
            pages.push(page);
        }
            
        function findPageByWebsiteId(websiteId) {
            var webpages = [];
            for(var p in pages){
                if(pages[p].websiteId == websiteId){
                    //return angular.copy(pages[p]);
                    webpages.push(pages[p]);
                }
            }
            return webpages;
        }
        
        function findPageById(pageId) {
            for(var p in pages){
                if(pages[p]._id == pageId){
                    return angular.copy(pages[p]);
                }
            }
        }

        function updatePage(pageId, page) {
            for(var p in pages){
                if(pages[p]._id == pageId){
                    pages[p] = page;
                    return angular.copy(pages[p]);
                }
            }
        }

        function deletePage(pageId) {
            for(var p in pages){
                if(pages[p]._id == pageId ){
                    pages.splice(p,1);
                }
            }
            
        }



        }
    })();