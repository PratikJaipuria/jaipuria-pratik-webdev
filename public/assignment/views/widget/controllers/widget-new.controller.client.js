/**
 * Created by Pratik on 2/15/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

     function WidgetNewController($location, $routeParams, WidgetService) {

         var vm = this;
         vm.userId = $routeParams.uid;
         vm.websiteId = $routeParams.wid;
         vm.pageId = $routeParams.pid
         // vm.widgetId = $routeParams.wgid;
         // console.log(widgetId);

         vm.wg = $routeParams.wg;
         vm.getWidgetUrl = getWidgetUrl;
         vm.getCreatorTemplateUrl = getCreatorTemplateUrl;
         function init() {
             // vm.widget = WidgetService.findWidgetById(vm.widgetId);
             WidgetService
                 .findWidgetById(vm.widgetId)
                 .success(function (widget) {
                      vm.widget = widget;
                     // vm.widgetId = widget._id;

                 })
         }

         init();

             function getWidgetUrl() {
             var url = 'views/widget/templates/widget-new.view.client.html';
             return url;
         }

         function getCreatorTemplateUrl() {
             if(vm.wg==1) {
                 return 'views/widget/templates/create/widget-HEADER-create.view.client.html';
             }
             if(vm.wg==2) {
                 return 'views/widget/templates/create/widget-IMAGE-create.view.client.html';
             }
             if(vm.wg==3) {
                 return 'views/widget/templates/create/widget-YOUTUBE-create.view.client.html';
             }
             if(vm.wg==4) {
                 return 'views/widget/templates/create/widget-HTML-create.view.client.html';
             }
         }


     }})();
