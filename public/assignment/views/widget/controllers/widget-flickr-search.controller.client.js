/**
 * Created by Pratik on 3/7/2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);


    function FlickrImageSearchController($routeParams,WidgetService,$location) {
        var vm = this;
        vm.selectPhoto = selectPhoto;
        // vm.searchText = "";
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;


        // function init() {
        // //     WidgetService
        // //         .findAllWidgets(vm.pageId)
        // //         .success(function (widgets) {
        // //             vm.widgets = widgets;
        // //         });
        //     WidgetService
        //         .findWidgetById(vm.widgetId)
        //         .success(function (widget) {
        //             vm.widget = widget;
        //
        //         })
        // }
        // init();




        vm.searchPhotos = function(searchTerm) {
            WidgetService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;

                });
        };

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var widget = {
                widgetType:"IMAGE"
            };

            widget.url = url;
            if (vm.widgetId){
                // console.log("Update imgae",vm.widgetId);
                WidgetService
                    .updateWidget(vm.widgetId,widget)
                    .success(function (widgets) {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    });
            }else {
                WidgetService
                    .createWidget(vm.pageId, widget)
                    .success(function (widget) {
                        vm.widgetId = widget._id;
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    });
            }
            // WidgetService
            //     .updateWidget(websiteId, pageId, widgetId, {url: url})
            //     .then( function () {
            //
            //     });
        }
        // implement an event handlers called searchPhotos() invoked when the user clicks on the search button in the view
    }

})();
