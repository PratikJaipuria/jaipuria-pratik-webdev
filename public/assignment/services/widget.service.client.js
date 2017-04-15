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
            "updateWidget" : updateWidget,
            "searchPhotos" : searchPhotos,
            "rearrangeList" : rearrangeList
            };
        return api;


        function rearrangeList(pageId, updatedIndex){
            return $http.put("/api/page/"+pageId+"/widget?initial="+updatedIndex[0]+"&final="+updatedIndex[1]);
        }

        function searchPhotos(searchTerm) {
            var key = "fa48cb517112b1e6e16b5920e5189861";
            var secret = "08af3ea7defc90db";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);

        }

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
