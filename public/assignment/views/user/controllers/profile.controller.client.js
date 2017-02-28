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

            function init(){
                var promise = UserService.findUserById(userId);
                promise.success(function (user) {
                    vm.user = user;

                });
            }

            init();
            vm.update = function (newUser) {

                UserService
                    .updateUser(userId, newUser)
                    .success(function (user){

                        if(user == null) {
                            vm.error = "unable to update user";
                        } else {
                            vm.message = "user successfully updated"
                        }
                    });

            };
            

            vm.delete = function (userId) {
                var answer = confirm("Are you sure ?");
                // var user = UserService.deleteUser(userId);
                if (answer) {
                    UserService
                        .deleteUser(userId)
                        .success(function (user) {
                            if (user == null) {
                                vm.error = "unable to delete user";
                            } else {
                                vm.message = "user deleted"
                            }
                        });

                    $location.url('/login');

                }

            }

            

        }
    })();
