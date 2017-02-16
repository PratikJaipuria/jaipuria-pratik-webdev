/**
 * Created by Pratik on 2/9/2017.
 */
(function (){
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.createPage = createPage;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

        function createPage (page) {
            PageService.createPage(vm.websiteId, page);
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            console.log(vm.pages);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        };
    }

})();