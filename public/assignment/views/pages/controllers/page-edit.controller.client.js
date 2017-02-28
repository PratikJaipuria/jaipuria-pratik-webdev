/**
 * Created by Pratik on 2/9/2017.
 */
(function (){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            // vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (webpages) {
                    vm.pages = webpages;
                })
            PageService
                .findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
            })

        }

        init();

        function updatePage(page) {

            var updatePage = {
                _id:vm.pageId,
                websiteId :vm.websiteId,
                name:vm.page.name,
                description:vm.page.description

            };

            PageService
                .updatePage(vm.pageId, updatePage)
                .success(function (pages) {
                    vm.pages = pages;
            });
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");

        }

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .success(function () {
                    
                });

            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        };


    }
})();
