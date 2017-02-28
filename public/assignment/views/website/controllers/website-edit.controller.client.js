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
           WebsiteService
               .findAllWebsitesByUser(vm.userId)
               .success(function (websites) {
                   vm.websites = websites
               });
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website = website;
                });
        }
        init();

        function updateWebsite(website) {
            var updateWeb = {
                _id:vm.websiteId,
                developerId :vm.userId,
                name:vm.website.name,
                description:vm.website.description

            };

            WebsiteService
                .updateWebsite(vm.websiteId,updateWeb)
                .success(function (website) {
                    if(website == null) {
                        vm.error = "unable to update the website";
                    } else {
                        vm.message = "website successfully updated"
                    }
                });
            $location.url("/user/"+vm.userId+"/website");
        }

        function deleteWebsite () {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .success(function () {
                    if(website == null) {
                        vm.error = "unable to delete the website";
                    } else {
                        vm.message = "website successfully deleted"
                    }

            })
            $location.url("/user/"+vm.userId+"/website");

        }
    }
    })();