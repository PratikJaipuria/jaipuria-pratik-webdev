/**
 * Created by Pratik on 2/8/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(user1) {

                var newUser = {
                    _id: ((new Date()).getTime()).toString(),
                    username: user1.username,
                    password: user1.password,
                    email:user1.email,
                    firstName: user1.firstName,
                    lastName:user1.lastName

                };
                registerUser = UserService.createUser(newUser);
                var user = UserService.findUserByUsername(user1.username);
                vm.user = user;
                $location.url('/profile/' + user._id);




        }
    }
})();