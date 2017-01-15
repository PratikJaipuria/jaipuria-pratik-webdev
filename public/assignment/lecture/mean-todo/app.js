/**
 * Created by Pratik on 1/13/2017.
 */
//console.log(angular);
angular
    .module('TodoApp', [])
    .controller('BlogController',BlogController);
alert("Welcome");
function BlogController($scope) {
    $scope.blogPosts = [
        {title: 'Post1', description: 'Content1'},
        {title: 'Post2', description: 'Content2'},
        {title: 'Post3', description: 'Content3'},
        {title: 'Post4', description: 'Content4'},
        {title: 'Post5', description: 'Content5'},
    ];
}