/**
 * Created by Pratik on 2/8/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            vm.websites = WebsiteService.findAllWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function updateWebsite(website) {
            var updateWeb = {
                _id:vm.websiteId,
                developerId :vm.userId,
                name:vm.website.name,
                description:vm.website.description

            };

            WebsiteService.updateWebsite(vm.websiteId,updateWeb);
            $location.url("/user/"+vm.userId+"/website");
        }

        function deleteWebsite () {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/website");
        }
    }
    })();