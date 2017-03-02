/**
 * Created by Pratik on 2/8/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {

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
        }

        function findWebsiteById(wid) {
            return $http.get("/api/website/"+wid);
        }

        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId);
        }

        function createWebsite(userId, website) {
            return $http.post("/api/user/"+userId+"/website",website);

        }

        function findAllWebsitesByUser(userId) {
            return $http.get("/api/user/"+userId+"/website");
         }
    }
})();