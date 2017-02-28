/**
 * Created by Pratik on 2/8/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        // var websites = [
        //     { _id: "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date() },
        //     { _id: "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date() },
        //     { _id: "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date() },
        //     { _id: "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date() },
        //     { _id: "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date() },
        //     { _id: "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date() }
        // ];
        var api = {
            // "websites": websites,
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "findAllWebsitesByUser": findAllWebsitesByUser,
            "updateWebsite": updateWebsite
        };
        return api;
        
        function updateWebsite(websiteId, website) {
            return $http.put("/api/website/"+websiteId,website);

            // for(var w in websites) {
            //     if(websites[w]._id == websiteId) {
            //             websites[w] = website;
            //             // websites[w] = website.description;
            //             return angular.copy(websites[w]);
            //     }
            // }
            // return null;
        }

        function findWebsiteById(wid) {
            return $http.get("/api/website/"+wid);

            // for(var w in websites) {
            //     if(websites[w]._id == wid) {
            //         return angular.copy(websites[w]);
            //         // return websites[w] ;
            //     }
            // }
            // return null;
        }

        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId);

            // for(var w in websites) {
            //     if(websites[w]._id === websiteId) {
            //         websites.splice(w, 1);
            //     }
            // }
        }

        function createWebsite(userId, website) {
            return $http.post("/api/user/"+userId+"/website",website);

            // website.developerId = userId;
            // website._id = ((new Date()).getTime()).toString();
            // websites.push(website);
            // return websites;

        }

        function findAllWebsitesByUser(userId) {
            return $http.get("/api/user/"+userId+"/website");
        //     var sites = [];
        //     for(var w in websites) {
        //         if(websites[w].developerId == userId) {
        //             sites.push(websites[w]);
        //         }
        //     }
        //     return sites;
         }
    }
})();