/**
 * Created by Pratik on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($location,$routeParams, WidgetService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams['wgid'];
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        // vm.ValidityState = ValidityState;
        // vm.ValidityState = validate;
        // console.log(x);

        function init() {
            // vm.widget = WidgetService.findWidgetById(vm.widgetId);
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;

                })

        }
        init();


            // function ValidityState()
            // {  var inpObj = document.getElementById("uploadfile");
            //     console.log(inpObj);
            //     if(name== null )
            //     {
            //         alert("Upload an image");
            //         return false;
            //     }
            //     return true;
            // }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });

        }

        function getEditorTemplateUrl(type) {
            if(type){
                return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
            }
        }

        function updateWidget(widget){
            WidgetService
                .updateWidget(vm.widgetId, widget)
                .success(function (widgets) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });

        }
    }
})();