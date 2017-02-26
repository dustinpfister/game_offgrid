/*
 *    person.js for offgrid
 *    Copyright 2017 by Dustin Pfister (GPL-3.0)
 *
 */

var Person = (function () {

    var status = {

        lastUpdate : new Date(2017, 1, 25),
        //lastUpdate : new Date(),
        weight : 140,
        food : {

            protein : {

                grams : 10,
                maxGrams : 100,
                lossRate : 60

            },

            carbs : {

                grams : 40,
                maxGrams : 450,
                lossRate : 300

            }

        }

    },

    updateState = function (timeMS) {

        var foodName,
        food,
        preSec;

        for (foodName in status.food) {

            food = status.food[foodName];
            perSec = food.lossRate / 24 / 60 / 60;

            food.grams -= perSec * (timeMS / 1000);
        }

        status.lastUpdate = new Date();
    },

    // the public API
    api = function () {

        return status;

    };

    api.eat = function (foodObj) {

        foodObj.uptakes.forEach(function (uptake) {

            status.food[uptake.name].grams += uptake.grams;

        });

    };

    // the Phaser state object that is to be added in main
    api.phaserState = {

        create : function () {

            // what to create for person state
            console.log('I am ready to rock!');

            game.add.bitmapText(10, 10, 'zelda', 'abcdefghijkl',10);
            game.add.bitmapText(10, 20, 'zelda', 'mnopqrstuvwxyz',10);

            game.add.bitmapText(10, 60, 'zelda', 'ABCDEFGHIJKL',10);
            game.add.bitmapText(10, 80, 'zelda', 'MNOPQRSTUVWXYZ',10);


        },

        // update for person state
        update : function () {

            // what to update on each tick for the person state
            var now = new Date(),
            time = now - status.lastUpdate;

            if (time >= 1000) {

                updateState(time);

            }

        }

    };

    return api;

}
    ());
