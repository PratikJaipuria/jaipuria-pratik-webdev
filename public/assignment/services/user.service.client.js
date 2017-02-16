/**
 * Created by Pratik on 2/7/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            "users": users,
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "createUser":createUser,
            "findUserByUsername":findUserByUsername,
            "deleteUser":deleteUser
        };

        return api;
        
        // function createUser(username,password) {
        //     var user = {
        //         username: username,
        //         password: password,
        //         _id: (new Date()).getTime()
        //     };
        //     users.push(user);
        //     return user;
        // }

        function deleteUser(userId){
            for(var u in users) {
                var user = users[u];
                if( user._id === userId ) {
                    users.splice(u, 1);
                    return user;
                }
            }
            return null;
        }


        function findUserByUsername(username) {
            for(var u in users){
                var user = users[u];
                if(user.username === username) {
                    return user;
                }

            }
            return null;
        }


        function createUser(user) {
            var newUser = {
                _id: user._id,
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                email:user.email

            };
            users.push(newUser);
            // return angular.copy(newUser);
            return newUser;

        }

        function updateUser(userId, newUser) {
            for(var u in users) {
                var user = users[u];
                if( user._id === userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    return user;
                }
            }
            return null;
        }

        function findUserById(uid) {
            for(var u in users) {
                var user = users[u];
                if( user._id === uid ) {
                    // return angular.copy(user);
                    return user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                var user = users[u];
                if( user.username === username &&
                    user.password === password) {
                    return angular.copy(user);
                }
            }
            return null;
        }
    }
})();