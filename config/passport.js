const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const express = require('express');

// LOAD USER MODEL AND SEQUELIZE
const db = require('../models')

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ 
            usernameField: "email",
            password: "password"
        }, (email, password, done) => {
            db.Member.findOne({
                where: {
                    email: email
                }
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: "Email is not registered" });
                }

                // MATCH PASSWORD
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        console.log("Correct Password");
                        return done(null, user);
                    } else {
                        console.log("Incorrect Password");
                        return done(null, false, { message: "Incorrect Password" });
                    }
                });
            }).catch(err => console.log(err));
        })
    );

    passport.serializeUser(function (member, done) {
        console.log("Serialize user member: ", member);
        done(null, member.id);
    });

    passport.deserializeUser(function (id, done) {
        console.log("Deserialize id: ", id);
        db.Member.findByPk(id, function (err, user) {
            if(err) throw err;
            done(err, user);
        });

    });
}