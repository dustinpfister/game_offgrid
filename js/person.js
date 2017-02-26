/*
 *    person.js for offgrid
 *    Copyright 2017 by Dustin Pfister (GPL-3.0)
 *
 */

var Person = (function () {

    // the public API
    var api = function () {};

    // the Phaser state objact that is to be added in main
    api.phaserState = {

        create : function () {

            // what to create for person state

            console.log('I am ready to party!');

        },

        // update for person state
        update : function () {

            // what to update on each tick for the person state


        }

    };

    return api;

}());
