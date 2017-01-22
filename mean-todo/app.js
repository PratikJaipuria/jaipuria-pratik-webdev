module.exports = function (app) {
    app.get('/hello/:name', sayHello);
    app.get('/lecture/todo', readAllTodos)

    var todos = [
        {title:'milk', description:'organic'},
        {title:'kids', description:'school'}
    ];

    function readAllTodos(req,res) {
        res.json(todos);
    }
    
    
    function sayHello(req, res) {
        var name = req.params.name;
        var age = req.query.age;
        res.send('Hello Pratik' + name + age);
    }
    
    
};