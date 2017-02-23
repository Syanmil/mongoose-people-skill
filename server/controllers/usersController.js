var usersModel = require('../models/usersModel.js');

module.exports = {
    list: function (req, res) {
        usersModel.find(function (err, userss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting users.',
                    error: err
                });
            }
            return res.json(userss);
        });
    },
    show: function (req, res) {
        var id = req.params.id;
        usersModel.findOne({_id: id}, function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting users.',
                    error: err
                });
            }
            if (!users) {
                return res.status(404).json({
                    message: 'No such users'
                });
            }
            return res.json(users);
        });
    },
    create: function (req, res) {
        var users = new usersModel({			username : req.body.username,			skills : []
        });

        users.save(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating users',
                    error: err
                });
            }
            return res.status(201).json(users);
        });
    },
    addSkill: function (req, res) {
        let id = req.params.id;
        let skill = req.body.skill;
        let score = req.body.score;
        let isNew = true;
        usersModel.findOne({_id: id}, function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting users',
                    error: err
                });
            }
            if (!users) {
                return res.status(404).json({
                    message: 'No such users'
                });
            }
            users.skills.forEach(function(skillo){
                if(skillo.skill == skill){
                    isNew = false
                }
            })
            if(isNew){
                let data = {
                skill: skill,
                score: score
                }

                users.skills.push(data)

                users.save(function (err, users) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when updating users.',
                            error: err
                        });
                    }
                    return res.json(users);
                });
            } else {
                return res.json({
                    message: 'users already have that skills',
                });
            }
        });
    },
    updateScore: function (req, res) {
        var id = req.params.id;
        var skillid = req.params.skillid
        var score = req.body.score;
        usersModel.findOne({_id: id}, function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting users',
                    error: err
                });
            }
            if (!users) {
                return res.status(404).json({
                    message: 'No such users'
                });
            }

            users.skills.id(skillid).score = score

            users.save(function (err, users) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating users.',
                        error: err
                    });
                }
                return res.json(users);
            });
        });
    },
    remove: function (req, res) {
        var id = req.params.id;
        usersModel.findByIdAndRemove(id, function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the users.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
