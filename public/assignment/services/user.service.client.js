/**
 * Created by Pratik on 2/7/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService($http) {

        var api = {
            // "users": users,
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "createUser":createUser,
            "findUserByUsername":findUserByUsername,
            "deleteUser":deleteUser
        };

        return api;

        function deleteUser(userId){
            return $http.delete("/api/user/"+userId);

        }


        function findUserByUsername(username) {

            return $http.get("/api/user?username="+username);

        }


        function createUser(user) {

            return $http.post("/api/user/", user);

        }

        function updateUser(userId, newUser) {

            return $http.put("/api/user/"+userId , newUser);

        }

        function findUserById(uid) {

           return $http.get("/api/user/"+ uid);

        }

        function findUserByCredentials(username, password) {
             return $http.get("/api/user?username="+username+"&password="+password);


        }
    }
})();