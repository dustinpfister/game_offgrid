
// responsible for time, and game state
var main = (function () {

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
        state.m = Math.floor(state.days / 30) + 1;

        // update the person object with current total days
        Person.updateState(state.days);

        // update budget
        Budget.updateState(state.days, daysPast);

        state.lastTime = new Date();

    };

    // start a new game with the given default state in json
    api.newGame = function (defaultJSON) {

        var defaultState = JSON.parse(defaultJSON),
        now = new Date();

        console.log('starting a new game...');
        //console.log(defaultJSON);

        // copy in the defaults for main
        state = JSON.parse(JSON.stringify(defaultState.Main));

        // overwrrite starttime and last time as now
        state.time_start = now;
        state.time_last = now;
        state.days = 0;

        this.update();

        // copy in the defaults for Budget
        Budget.set(JSON.stringify(defaultState.Budget));

        // copy in the defaults for person
        Person.set(JSON.stringify(defaultState.Person));

    };

    // load a state from json
    api.loadState = function (json) {

        console.log('I am main.loadState.');
        //console.log(json);

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

            // img and spritesheets
            game.load.image('tiles_map', 'img/tiles_16.png');
            game.load.spritesheet('items_2_1', 'img/items_2_1.png', 32, 16);
            game.load.spritesheet('items_1_2', 'img/items_1_2.png', 16, 32);

            // fonts
            game.load.bitmapFont('zelda', 'fonts/font_zelda.png', 'fonts/font_zelda.xml');

            // json
            game.load.json('save_default', 'json/save_default.json');

        },

        // create
        create : function () {

            game.state.add('parcel', Parcel.phaserState);
            game.state.add('person', Person.phaserState);
            game.state.add('budget', Budget.phaserState);

            // start by loading a new game by default
            main.newGame(JSON.stringify(game.cache.getJSON('save_default')));

            game.state.start('budget');

        },

        // update (ticks)
        update : function () {}

    });

}
    ());
