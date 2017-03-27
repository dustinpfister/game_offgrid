
// responsible for time, and game state
var Main = (function () {

    var state = {},

    api = function () {

        return state;

    };

    api.update = function () {

        var now = new Date(),
        daysPast;

        // current number of total game days
        state.days = (now - state.time_start) / state.gameDayLength;
        daysPast = state.days - (now - state.time_last) / state.gameDayLength;

        // current t,d,and m values
        state.t = (now - state.time_start) % state.gameDayLength / state.gameDayLength;
        state.d = Math.floor(state.days) % 30 + 1;
        state.m = Math.floor(state.days / 30);

        // update the person object with current total days
        Person.updateState(state.days);

        // update budget
        Budget.updateState();

        state.time_last = new Date();

    };

    // build and return a JSON save state for current game progress
    api.buildState = function () {

        var modules = [{
                what : 'Main',
                props : ['time_last',
                    'time_start',
                    'gameDayLength']

            }, {
                what : 'Budget',
                props : ['start', 'incomes']

            }, {
                what : 'Person',
                props : ['nutrient', 'consumed', 'weight', 'HP', 'maxHP']

            }

        ],
        saveObj = {};

        modules.forEach(function (module) {

            var currentObj = window[module.what]();

            saveObj[module.what] = {};

            module.props.forEach(function (prop) {

                saveObj[module.what][prop] = currentObj[prop];

            });

        });

        return JSON.stringify(saveObj);

    };

    // start a new game with the given default state in json
    api.newGame = function (json) {

        console.log('starting a new game...');

        this.loadState(json, true);

    };

    // load a state from json
    api.loadState = function (json, newGame) {

        var defaultState = JSON.parse(json),
        now = new Date();

        console.log('I am main.loadState.');

        newGame = !newGame ? false : true;

        // copy in the defaults for main
        state = JSON.parse(JSON.stringify(defaultState.Main));

        if (newGame) {

            console.log('new game: starting a new game with current client time');

            // overwrite start time and last time as now
            state.time_start = now;
            state.time_last = now;

        } else {

            console.log('game save: using dates in json');

            // use start time, and last time from json
            state.time_start = new Date(state.time_start);
            state.time_last = new Date(state.time_last);

        }

        // update time here at main
        this.update();

        // update modules with the loaded time

        // copy in the defaults for Budget
        Budget.set(JSON.stringify(defaultState.Budget));

        // copy in the defaults for person
        Person.set(JSON.stringify(defaultState.Person));

    };

    return api;

}
    ());

// the main Phaser game instance
var game = (function () {

    return new Phaser.Game(

        320, 240,
        Phaser.AUTO,
        'gamearea', {

        // preload
        preload : function () {

            game.load.image('loadingbar', 'img/loadingbar.png');

        },

        // create
        create : function () {

            game.state.add('load', Load);
            game.state.start('load');

        },

        // update (ticks)
        update : function () {}

    });

}
    ());
