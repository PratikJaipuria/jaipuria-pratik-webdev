/**
 * Created by Pratik on 3/8/2017.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();

    // var userModel = mongoose.model("UserModel", UserSchema);
    var websiteModel = mongoose.model("websiteModel", WebsiteSchema);
    var q = require("q");
    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite:updateWebsite,
        deleteWebsite:deleteWebsite,
        addPageId:addPageId,
        deletePageId:deletePageId
        // findWebsiteById: findWebsiteById
    };
    return api;

    function deletePageId(websiteId,pageId) {
        var deferred = q.defer();
        websiteModel
            .update({_id: websiteId},{
                $pull: {pages:pageId }
            },function (err) {
                if (err){
                    deferred.abort(err);
                }else{
                    deferred.resolve(pageId);
                }
            });

        return deferred.promise;
    }



    function addPageId(websiteId,pageId) {
        var deferred = q.defer();
        // delete newUser._id;

        websiteModel
            .update({_id: websiteId},{
                $push: {pages:pageId }
            },function (err,user) {
                if (err){
                    deferred.abort(err);
                }else{
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }


    function deleteWebsite(websiteId) {
        var deferred = q.defer();
        websiteModel.remove({_id: websiteId},function (err) {
            if (err){
                deferred.abort(err);
            }else{
                deferred.resolve();
            }
        });

        return deferred.promise;
    }

    function updateWebsite(websiteId, website){
        var deferred = q.defer();
        delete website._id;
        websiteModel
            .update({_id: websiteId},{
                $set: {
                    name: website.name,
                    description: website.description
                }
            },function (err,user) {
                if (err){
                    deferred.abort(err);
                }else{
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }


    function findWebsiteById(websiteId){
        var deferred = q.defer();

        websiteModel.findOne({
            _id: websiteId
            // password: password
        },function (err,user) {
            if (err){
                deferred.abort(err);
            }else{
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }


    function findAllWebsitesForUser(userId) {
        var deferred = q.defer();
        websiteModel.find({"_user": userId},function (err,user) {
            if (err){
                deferred.abort(err);
            }else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }



    function createWebsiteForUser(userId, website) {

        var deferred = q.defer();

        website._user = userId;
        websiteModel.create(website,function (err,website) {
            if (err){
                deferred.abort(err);
            }else{
                deferred.resolve(website);
            }
        });
        return deferred.promise;

    }

};