/**
 * Created by Pratik on 2/22/2017.
 */
module.exports = function (app,model) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:uid", findUserById);
    // app.get("/api/user",findUserByUsername);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId",deleteUser);

    var userModel = model.userModel;



    function deleteUser(req,res){
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function() {
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(404).send(error);
                }
            );

    }

    function createUser(req,res){
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function(newUser) {
                    // console.log("success "+newUser);
                    res.send(newUser);
                },
                function (error) {
                    // console.log(error);
                    res.sendStatus(400);//.send(error);
                }
            );


    }


    function updateUser(req,res) {
        var userId = req.params.userId;
        var newUser = req.body;

        userModel
            .updateUser(userId,newUser)
            .then(
                function (user) {
                    if (user) {
                        // console.log("Success",user);
                        res.json(user);
                    } else {
                        // console.log(user)
                        res.send('0');
                    }
                }
            );

    }


    function findUserById(req,res) {
        var userId = req.params.uid;

        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    // if(user) {
                    //     console.log("user.service.server",user);
                        res.json(user);
                    // } else {
                    //     res.sendStatus(222);
                    // }
                },
                function (error) {
                    // console.log("user.service.server",error);
                    res.sendStatus(222);//.send(error);
                }
            );
        // var user = users.find(function (u) {
        //     return u._id == userId;
        // });
        //
        // res.json(user);
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

        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user) {
                    // console.log("success:" ,user);
                       res.json(user);
                    } else {
                    // console.log("Failure:",user);
                    res.sendStatus(400);
                    }
                    },
                function (error) {
                    res.sendStatus(222);//.send(error);
                    }
                    );

    }



    function findUserByCredentials(req,res) {
        var username = req.query.username;
        var password = req.query.password;

        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if(user) {
                        // console.log("success:" ,user);
                        res.json(user);
                    } else {
                        // console.log("Failure:",user);
                        res.send('0');
                    }
                },
                function (error) {
                    // console.log(error);
                    res.sendStatus(222);//.send(error);
                }
            );


    }
};
