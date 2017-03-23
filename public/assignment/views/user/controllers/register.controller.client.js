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
            // console.log(user1);
                UserService
                    .findUserByUsername(user1.username)
                     //console.log(user1.username)
                    .success(function (user) {
                        vm.error = "sorry "+ user.username + " exist";
                         // console.log(user1.username)
                    })
                    .error(function () {
                        var newUser = {
                            // _id: ((new Date()).getTime()).toString(),
                            username: user1.username,
                            password: user1.password,
                            firstName: user1.firstName,
                            lastName:user1.lastName,
                            email:user1.email,
                            phone:user1.phone,
                            // websites:[String],
                            datecreated:""
                        };
                        // console.log(newUser);
                        UserService
                            .createUser(newUser)
                            .success(function (user){
                                // console.log("abcd");
                                // var user = UserService.findUserByUsername(user.username);
                                vm.user = user;
                                // console.log("User ID",user.firstName);
                                $location.url('/profile/' + user._id);


                            });
                    });
        }
    }
})();