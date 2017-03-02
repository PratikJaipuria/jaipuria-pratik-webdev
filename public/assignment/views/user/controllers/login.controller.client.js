/**
 * Created by Pratik on 2/7/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            // showSpinningHourGlass();
            var promise = UserService.findUserByCredentials(user.username, user.password);

            promise
                .success(function (loginUser) {
                // hideSpinningWa
                    if(loginUser != 222) {
                        $location.url('/profile/' + loginUser._id);
                    } else {
                        vm.error = 'user not found';
                    }
                    })
                .error(function () {
                     vm.error = 'user not found';
                     // return true;
                })

        }
    }
})();