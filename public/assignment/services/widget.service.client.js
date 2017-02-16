/**
 * Created by Pratik on 2/14/2017.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": "2", "text": "EXPLORE"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "New Measurements of the Universe Expanding Tell a Confusing Story"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://www.hdbloggers.net/wp-content/uploads/2016/11/Art-Beautiful-Wallpapers.jpg"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/6pxRHBw-k8M" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

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
            var resultwidgets = [];
            for(var w in widgets){
                if(widgets[w].pageId == pageId){
                    resultwidgets.push(widgets[w]);
                }
            }
            return resultwidgets;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function createWidget(pageId,widget){
            widget.pageId = pageId;
            widget._id = ((new Date()).getTime()).toString();

            if(widget.widgetType == "HEADER"){

                var newWidget = {
                    _id: widget._id,
                    widgetType: "HEADER",
                    pageId: widget.pageId,
                    size:widget.size,
                    text:widget.text
                };

            }

            if(widget.widgetType == "IMAGE"){

                var newWidget = {
                    _id: widget._id,
                    widgetType: "IMAGE",
                    pageId: widget.pageId,
                    width:widget.width,
                    url:widget.url
                };

            }
            if(widget.widgetType == "YOUTUBE"){

                var newWidget = {
                    _id: widget._id,
                    widgetType: "YOUTUBE",
                    pageId: widget.pageId,
                    width:widget.width,
                    url:widget.url
                };

            }

            if(widget.widgetType == "HTML"){

                var newWidget = {
                    _id: widget._id,
                    widgetType: "HTML",
                    pageId: widget.pageId,
                    text:widget.text
                };

            }
            widgets.push(newWidget);

        }

        function findWidgetsByPageId(pageId) {
            var resultwidgets = [];
            for(var w in widgets) {
                if(widgets[w].page_Id == pageId) {
                    resultwidgets.push(widgets[w])
                }
            }
            return resultwidgets;
        }
        
        function updateWidget(widgetId, widget) {
            for(var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    // widgets[w] = widget;
                    if(widget.widgetType == "HEADER"){
                        widgets[w].size = widget.size;
                        widgets[w].text = widget.text;
                    }

                    if(widget.widgetType == "IMAGE"){
                        widgets[w].width = widget.width;
                        widgets[w].url = widget.url;

                    }

                    if(widget.widgetType == "YOUTUBE"){
                        widgets[w].width = widget.width;
                        widgets[w].url = widget.url;

                    }

                    if(widget.widgetType == "HTML"){
                        widgets[w].text = widget.text;

                    }

                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function deleteWidget(widgetId){
            for(var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    widgets.splice(w, 1);
                }
            }
        }
    }
})();
