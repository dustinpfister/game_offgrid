/*
 *    person.js for offgrid
 *    Copyright 2017 by Dustin Pfister (GPL-3.0)
 *
 */

var Person = (function () {

    var status = {

        //lastUpdate : new Date(2017, 1, 25),
        lastUpdate : new Date(),
        weight : 140,
        food : {

            protein : {

                grams : 10,
                maxGrams : 100,
                lossRate : 60 // 0.36 grames per pound

            },

            carbs : {

                grams : 40,
                maxGrams : 450,
                lossRate : 300

            }

        }

    },

    text = {},

    updateState = function (timeMS) {

        var foodName,
        food,
        preSec;

        // dubble time
        //timeMS = timeMS * 2;

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

            text['time'] = game.add.bitmapText(10, 10, 'zelda', 'D : 1 M : 1',10);
            text['protein'] = game.add.bitmapText(10, 30, 'zelda', 'Protein : ' + status.food.protein.grams, 10);

        },

        // update for person state
        update : function () {

            // what to update on each tick for the person state
            var now = new Date(),
            time = now - status.lastUpdate;

            // update main
            main.update();

            if (time >= 100) {

                updateState(time);

            }

            text['protein'].text = 'Protein : ' + status.food.protein.grams.toFixed(4);
            text['time'].text = 'Day : ' + main().day + ' Month: ' + main().month;

        }

    };

    return api;

}
    ());
