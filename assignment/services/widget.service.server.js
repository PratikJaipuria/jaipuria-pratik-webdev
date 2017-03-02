/**
 * Created by Pratik on 2/22/2017.
 */



module.exports = function (app) {
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


    var multer = require('multer'); // npm install multer --save




    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.get("/api/page/:pageId/widget",findWidgetsByPageId);
    app.post("/api/page/:pageId/widget",createWidget);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);


    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage: storage});

    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {
        var pageId = req.body.pageId;
        var widgetId_update = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var myFile = req.file;
        var destination = myFile.destination; // folder where file is saved to
        if (widgetId_update) {
            var widgetId = widgetId_update;
        }else{

            var widgetId = ((new Date()).getTime()).toString();

            var newWidget = {
                _id: widgetId,
                widgetType: "IMAGE",
                pageId: pageId,
                width: width,
                url: ""
                // url:widget.url
            };
            widgets.push(newWidget);
        }

        for (var i in widgets) {

            if (widgets[i]._id == widgetId) {
                widgets[i].width = width;
                widgets[i].url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;

            }
        }

        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
    }


    function deleteWidget(req,res) {
        var widgetId = req.params.widgetId;

        for(var w in widgets) {
            if(widgets[w]._id == widgetId) {
                widgets.splice(w, 1);
            }
        }

    }

    function updateWidget(req,res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;

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

                // return angular.copy(widgets[w]);
                res.json(widgets[w]);
            }
        }
        // return null;


    }



    function findWidgetsByPageId(req,res) {
        var pageId = req.params.pageId;

        var resultwidgets = [];
        for(var w in widgets) {
            if(widgets[w].page_Id == pageId) {
                resultwidgets.push(widgets[w])
            }
        }
        res.json(resultwidgets);

    }

    function createWidget(req,res) {
        var pageId = req.params.pageId;
        var widget = req.body;

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
        res.json(newWidget);

    }


    function findAllWidgetsForPage(req,res) {
        var pageId = req.params.pageId;

        var resultwidgets = [];
        for(var w in widgets){
            if(widgets[w].pageId == pageId){
                resultwidgets.push(widgets[w]);
            }
        }
        res.json(resultwidgets);

    }

    function findWidgetById(req,res) {
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            if (widgets[w]._id == widgetId) {
                // return angular.copy(widgets[w]);
                res.json(widgets[w]);
            }
        }

    }

}