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
        // console.log(vm.user1);

        function register(user1) {
                UserService
                    .findUserByUsername(user1.username)
                    // console.log(user1.username)
                    .success(function (user) {
                        vm.error = "sorry "+ user.username + " exist"

                    })
                    .error(function () {
                        var newUser = {
                            _id: ((new Date()).getTime()).toString(),
                            username: user1.username,
                            password: user1.password,
                            email:user1.email,
                            firstName: user1.firstName,
                            lastName:user1.lastName

                        };

                        UserService
                            .createUser(newUser)
                            .success(function (user){

                                // var user = UserService.findUserByUsername(user1.username);
                                vm.user = user;
                                $location.url('/profile/' + user._id);


                            });
                    });
        }
    }
})();