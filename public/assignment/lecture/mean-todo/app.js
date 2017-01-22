/**
 * Created by Pratik on 1/13/2017.
 */
//console.log(angular);
angular
    .module('TodoApp', [])
    .controller('BlogController',BlogController);
alert("Welcome");
function BlogController($scope, $http) {
    $scope.blogPosts = [
    /*     {title: 'Post1', description: 'Content1'},
        {title: 'Post2', description: 'Content2'}
      /*  {title: 'Post3', description: 'Content3'},
        {title: 'Post4', description: 'Content4'},
        {title: 'Post5', description: 'Content5'},*/
    ];
    $http.get('/lecture/todo')
        .success(function (response) {
            console.log(response);
            $scope.blogPosts = response;
        })

    $scope.createTodo = createTodo;
    $scope.deleteTodo = deleteTodo;
    $scope.selectTodo = selectTodo;
    $scope.updateTodo = updateTodo;
    $scope.selectedIndex = -1 ;

    function updateTodo(post) {

        $scope.blogPosts[$scope.selectedIndex].title = post.title;
        $scope.blogPosts[$scope.selectedIndex].description = post.description;
        $scope.post = {};
    }

    function selectTodo(post){
        $scope.selectedIndex = $scope.blogPosts.indexOf(post);
        $scope.post = {};
        $scope.post.title = post.title;
        $scope.post.description = post.description;
    }


    function deleteTodo(post){
     var index = $scope.blogPosts.indexOf(post);
     $scope.blogPosts.splice(index,1);
    }


    function createTodo(post) {
        //console.log(post);
        var newPost = {
          title: post.title,
          description: post.description
        };
        $scope.blogPosts.push(newPost);

    }
}