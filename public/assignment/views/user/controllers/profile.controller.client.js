    /**
 * Created by Pratik on 2/7/2017.
 */
    (function(){
        angular
            .module("WebAppMaker")
            .controller("profileController", profileController);

        function profileController($routeParams, UserService, $location) {
            var vm = this;
            var userId = $routeParams['uid'];
            vm.update = function (newUser) {

                var user = UserService.updateUser(userId, newUser);
                if(user == null) {
                    vm.error = "unable to update user";
                } else {
                    vm.message = "user successfully updated"
                }
            };
            
            var user = UserService.findUserById(userId);

            vm.user = user;
            
            vm.delete = function (userId) {
                var user = UserService.deleteUser(userId);
                if(user == null) {
                    vm.error = "unable to delete user";
                } else {
                    vm.message = "user deleted"
                }
                $location.url('/login');

            };


            

        }
    })();
