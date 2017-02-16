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
        // vm.user1;

        // console.log(password1);
        // console.log(password2);
        function register(user1) {

            // console.log(password1);
            // console.log(password2);
            // if(password1 == password2) {
                var newUser = {
                    _id: toString((new Date()).getTime()),
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

            // else{
            //     vm.message = "Verify Password  failed";
            // }



        }
    }
})();