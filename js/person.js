/*
 *    person.js for offgrid
 *    Copyright 2017 by Dustin Pfister (GPL-3.0)
 *
 */

var Person = (function () {

    var status = {

        //lastUpdate : new Date(2017, 1, 25),
        //lastUpdate : new Date(),
        lastUpdate : {

            t : 0,
            d : 1,
            m : 1

        },
        weight : 140,
        food : {

            protein : {

                grams : 60,
                maxGrams : 100,
                lossRate : 60 // loss of grams per game day

            },

            carbs : {

                grams : 40,
                maxGrams : 450,
                lossRate : 300

            }

        }

    },

    text = {},

    /*
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

     */

    updateState = function (current) {

        var foodName,
        food,
        preSec;

        for (foodName in status.food) {

            food = status.food[foodName];

            food.grams -= food.lossRate * (current.t - status.lastUpdate.t);

        }

        status.lastUpdate = {

            t : current.t,
            d : current.d,
            m : current.m

        };

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

            text['time'] = game.add.bitmapText(10, 10, 'zelda', 'D : 1 M : 1', 10);
            text['protein'] = game.add.bitmapText(10, 30, 'zelda', 'Protein : ' + status.food.protein.grams, 10);

        },

        // update for person state
        update : function () {

            // what to update on each tick for the person state
            var now = new Date(),
            time = now - status.lastUpdate;

            // update main
            main.update();
            updateState(main());

            /*
            if (time >= 100) {

            updateState(time);

            }
             */

            text['protein'].text = 'Protein : ' + status.food.protein.grams.toFixed(4);
            text['time'].text = 'T : ' + main().t.toFixed(2) + ' Day : ' + main().d + ' Month: ' + main().m;

        }

    };

    return api;

}
    ());
