/**
 * Created by Pratik on 2/9/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;



        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (webpages) {
                    vm.pages = webpages;
                })
        }

        init();

    }
})();