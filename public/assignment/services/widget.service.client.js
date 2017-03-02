/**
 * Created by Pratik on 2/14/2017.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {

            "findAllWidgets": findAllWidgets,
            // findAllWidgets = findAllWidgets;
            "findWidgetById": findWidgetById,
            "createWidget" : createWidget,
            "findWidgetsByPageId" : findWidgetsByPageId,
            "deleteWidget" : deleteWidget,
            "updateWidget" : updateWidget
            };
        return api;

        function findAllWidgets(pageId) {
            return $http.get("/api/page/"+pageId+"/widget");
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId);
        }

        function createWidget(pageId,widget){
            return $http.post("/api/page/"+pageId+"/widget",widget);

        }


        function findWidgetsByPageId(pageId) {
            return $http.get("/api/page/"+pageId+"/widget");
        }
        
        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/"+widgetId,widget);

        }

        function deleteWidget(widgetId){
            return $http.delete("/api/widget/"+widgetId);
        }
    }
})();
