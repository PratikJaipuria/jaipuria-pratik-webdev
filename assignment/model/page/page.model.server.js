/**
 * Created by Pratik on 3/16/2017.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server.js")();
    var q = require("q");
    var pageModel = mongoose.model("pageModel", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage:updatePage,
        deletePage:deletePage,
        addWidgetId:addWidgetId,
        deleteWidgetId:deleteWidgetId,
        getSequenceofWidget:getSequenceofWidget,
        // deleteAllPagesForThisWebsite: deleteAllPagesForThisWebsite
        // deletePage:deletePage
        // // findWebsiteById: findWebsiteById
    };
    return api;


    // function deleteAllPagesForThisWebsite(pages) {
    //     var deferred = q.defer();
    //     var pageList = [];
    //     for(var i = 0; i < pages.length ; i++) {
    //         pageList.push(pages[i]);
    //     }
    //
    //     for(var p in pageList) {
    //         var pageId = pageList[p];
    //         pageModel
    //             .findOne({_id: pageId}, function (err, page) {
    //                 if (err) {
    //                     deferred.abort(err);
    //                 } else {
    //                     widgetModel
    //                         .deleteAllWidgetsForThisPage(page.widgets)
    //                         .then(
    //                             function () {
    //                                 PageModel
    //                                     .remove({_id: page._id}, function (err, page) {
    //                                         if (err) {
    //                                             deferred.abort(err);
    //                                         } else {
    //                                             deferred.resolve(page);
    //                                         }
    //                                     });
    //                                 deferred.resolve(page);
    //                             },
    //                             function (err) {
    //                                 deferred.abort(err);
    //                             }
    //                         );
    //                 }
    //             });
    //     }
    //     deferred.resolve(pages);
    //     return deferred.promise;
    // }

    function getSequenceofWidget(pageId) {
        var deferred = q.defer();
        pageModel.find({"_id": pageId},function (err,page) {
            if (err){
                deferred.abort(err);
            }else{
                deferred.resolve(page);
            }
        });
        return deferred.promise;
    }

    function deleteWidgetId(pageId,widgetId) {
        var deferred = q.defer();
        pageModel
            .update({_id: pageId},{
                $pull: {widgets:widgetId }
            },function (err) {
                if (err){
                    deferred.abort(err);
                }else{
                    deferred.resolve(widgetId);
                }
            });

        return deferred.promise;
    }

    function addWidgetId(widgetId,pageId) {
        var deferred = q.defer();
        // delete newUser._id;

        pageModel
            .update({_id: pageId},{
                $push: {widgets:widgetId }
            },function (err,page) {
                if (err){
                    deferred.abort(err);
                }else{
                    deferred.resolve(page);
                }
            });

        return deferred.promise;
    }


    function deletePage(pageId) {
        var deferred = q.defer();
        pageModel
            .remove({_id:pageId},function (err,page) {
            if (err){
                deferred.abort(err)
            }else {
                deferred.resolve(page)
            }

            });
        return deferred.promise;

    }

    function updatePage(pageId,page) {
        var deferred = q.defer();
        pageModel
            .update({_id:pageId},{
                 $set: {
                       name: page.name,
                       title: page.title
        }
    },function (err,page) {
        if (err){
            deferred.abort(err);
        }else{
            deferred.resolve(page);
        }
    });

return deferred.promise;
}

    function findPageById(pageId) {
        var deferred = q.defer();

        pageModel
            .findOne({_id: pageId},function (err,page) {
                if(err){
                    deferred.abort();
                }else {
                    deferred.resolve(page);
                }

            });
        return deferred.promise;
    }
    
    
    function findAllPagesForWebsite(websiteId) {
        var deferred = q.defer();

        pageModel.find({"_website": websiteId},function (err,page) {
            if (err){
                deferred.abort(err);
            }else{
                deferred.resolve(page);
            }
        });
        return deferred.promise;
    }

    function createPage(websiteId,page){
        var deferred = q.defer();

        page._website = websiteId;
        pageModel
            .create(page,function (err,page) {
                if (err){
                    deferred.abort(err);
                }else{
                    deferred.resolve(page);
                }

            });
        return deferred.promise;

    }


};
