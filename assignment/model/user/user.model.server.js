/**
 * Created by Pratik on 3/7/2017.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var q = require("q");


    var userModel = mongoose.model("UserModel", UserSchema);

    var api = {
        findUserById: findUserById,
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        addWebsiteId: addWebsiteId,
        deleteWebsiteId:deleteWebsiteId
        // updateWebsiteForUser:updateWebsiteForUser
        // setModel: setModel
    };
    return api;


    function deleteWebsiteId(userId,websiteId) {
        var deferred = q.defer();
        userModel
            .update({_id: userId},{
                $pull: {websites:websiteId }
            },function (err) {
                if (err){
                    deferred.abort(err);
                }else{
                    deferred.resolve(websiteId);
                }
            });

        return deferred.promise;
    }



    
    function addWebsiteId(userId,websiteId) {
        var deferred = q.defer();
        // delete newUser._id;

        userModel
            .update({_id: userId},{
                    $push: {websites:websiteId }
            },function (err,user) {
                if (err){
                    deferred.abort(err);
                }else{
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        userModel.findOne({
            username: username
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

    function deleteUser(userId) {
        var deferred = q.defer();
        userModel.remove({_id: userId},function (err) {
            if (err){
                deferred.abort(err);
            }else{
                deferred.resolve();
            }
        });

        return deferred.promise;    }



    function updateUser(userId,newUser) {
        var deferred = q.defer();

        delete newUser._id;

        userModel
            .update({_id: userId},{
                $set: {
                    username: newUser.username,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    phone:newUser.phone
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

    function findUserById(userId) {
        var deferred = q.defer();

        userModel.findOne({
            _id: userId
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

    function createUser(user) {
        var deferred = q.defer();

        userModel.create(user,function (err,user) {
            if (err){
                deferred.abort(err);
            }else{
                deferred.resolve(user);
            }
                    });

        return deferred.promise;
}


    function findUserByCredentials(username, password) {
        var deferred = q.defer();

        userModel.findOne({
            username: username,
            password: password
        },function (err,user) {
            if (err){
                deferred.abort(err);
            }else{
                deferred.resolve(user);
            }
        });


        return deferred.promise;
    }

};
