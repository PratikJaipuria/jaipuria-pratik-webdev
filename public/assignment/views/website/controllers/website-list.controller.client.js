/**
 * Created by Pratik on 2/8/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        function init() {
            // vm.websites = WebsiteService.findAllWebsitesByUser(vm.userId);
            WebsiteService
                .findAllWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                
            })
        }
        init();

    }
})();