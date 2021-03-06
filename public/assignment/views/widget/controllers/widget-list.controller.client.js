/**
 * Created by Pratik on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($location,$sce, $routeParams, WidgetService) {
        var vm = this;

        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.rearrangeList = rearrangeList;


        function init() {
            WidgetService
                .findAllWidgets(vm.pageId)

                .success(function (widgets) {
                    vm.widgets = widgets;
                    // console.log(widgets);
                });
            // WidgetService
            //     .findWidgetById(vm.widgetId)
            //     .success(function (widget) {
            //         vm.widget = widget;
            //
            //     })
        }
        init();

        function rearrangeList(updatedIndex){
            // console.log(updatedIndex);
            var promise=WidgetService.rearrangeList(vm.pageId, updatedIndex);
            promise.error(function (){

                    vm.error="Unable to update WidgetList";
                }
            );
        }

        function getWidgetTemplateUrl() {
            var url = 'views/widget/templates/widget-edit.view.client.html';

            return url;
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();