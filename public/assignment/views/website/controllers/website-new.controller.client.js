/**
 * Created by Pratik on 2/8/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init() {
            // vm.websites = WebsiteService.findAllWebsitesByUser(vm.userId);
            WebsiteService
                .findAllWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites
                });
        }
        init();

        function createWebsite (website) {

            WebsiteService
                .createWebsite(vm.userId, website)
                .success(function (websites) {
                    vm.websites = websites;
                    // console.log(websites)

                })
            // vm.websites = WebsiteService.findAllWebsitesByUser(vm.userId);

            $location.url("/user/"+vm.userId+"/website");
        }
    }
})();