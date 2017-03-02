/**
 * Created by Pratik on 2/15/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetCreateController", WidgetCreateController);

    function WidgetCreateController($location,$routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        // vm.widgetId = $routeParams.wgid;
        vm.wg = $routeParams.wg;
        vm.getCreatorTemplateUrl = getCreatorTemplateUrl;
        vm.createWidget = createWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                    vm.widgetId = widget._id;

                })
        }
        init();

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

        function createWidget(widget){

            if(vm.wg==1){
            widget.widgetType="HEADER";
            WidgetService
                .createWidget(vm.pageId,widget)
                .success(function (widget) {
                    vm.widgetId = widget._id;
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });

            }

            if(vm.wg==2){
                widget.widgetType="IMAGE";
                WidgetService
                    .createWidget(vm.pageId,widget)
                    .success(function (widget) {
                        vm.widgetId = widget._id;
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    });
                // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }

            if(vm.wg==3){
                widget.widgetType="YOUTUBE";
                WidgetService
                    .createWidget(vm.pageId,widget)
                    .success(function (widget) {
                        vm.widgetId = widget._id;
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    });
                // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }

            if(vm.wg==4){
                widget.widgetType="HTML";
                WidgetService
                    .createWidget(vm.pageId,widget)
                    .success(function (widget) {
                            vm.widgetId = widget._id;
                            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    });
                // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }

        }
    }})();
