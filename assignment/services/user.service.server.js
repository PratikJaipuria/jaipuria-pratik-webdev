/**
 * Created by Pratik on 2/22/2017.
 */
module.exports = function (app) {
    app.get("/api/user", findUser);
    app.get("/api/user/:uid", findUserById);
    // app.get("/api/user",findUserByUsername);
    app.put("/api/user/:userId", updateUser);
    app.post("/api/user", createUser);
    app.delete("/api/user/:userId",deleteUser);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];


    function deleteUser(req,res){
        var userId = req.params.userId;
        for(var u in users) {
            var user = users[u];
            if( user._id == userId ) {
                users.splice(u, 1);
            }
        }

    }

    function createUser(req,res){
        var user = req.body;
        var newUser = {
            _id: user._id,
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email:user.email

        };

        users.push(newUser);
        res.json(newUser);


    }

    function updateUser(req,res) {
        var userId = req.params.userId;
        var newUser = req.body;
        for(var u in users) {
            if( users[u]._id === userId ) {
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                users[u].username = newUser.username;
                users[u].email = newUser.email;
                res.json(users[u]);
                return;
            }
        }
    }

    function findUserById(req,res) {
        var userId = req.params.uid;
        var user = users.find(function (u) {
            return u._id == userId;
        });

        res.json(user);
    }


    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }
    }


    function findUserByUsername(req, res) {
        var username = req.query['username'];
        // console("hello"+username);
        var user = users.find(function(u){
            return u.username == username;
        });
        if(user) {
            res.send(user);
        } else {
            res.sendStatus(404);//.send('User not found for username: ' + username);
        }
    }



    function findUserByCredentials(req,res) {
        var username = req.query.username;
        var password = req.query.password;
        var user = users.find(function (user) {
            return user.password==password && user.username==username
            // user.password==password && user.username==username
        });
        if (user) {
            res.send(user);
        } else{
            res.sendStatus(222);//.send('User not found for username'+ username);
        }

    }
}
