
// responsible for time, and game state
var main = (function () {

    var state = {

        startTime : new Date(2017, 1, 1, 0, 0),
        lastTime : {
            days : 25,//12.952,
            t : 0,
            d : 0,
            m : 0

        },
        //startTime : new Date(),
        gameDayLength : 1000 * 60 * 60 * 24, // how long a game day is in ms
        days : 0,
        t : 0,
        d : 1,
        m : 1

    },

    api = function () {

        return state;

    };

    api.update = function () {

        var now = new Date(),
        daysPast;

        state.days = (now - state.startTime) / state.gameDayLength;
        state.t = (now - state.startTime) % state.gameDayLength / state.gameDayLength;
        state.d = Math.floor(state.days) % 30 + 1;
        state.m = Math.floor(state.days / 30) + 1;

        daysPast = state.days - state.lastTime.days;

        Person.updateState(daysPast);
        Budget.updateState(daysPast);

        state.lastTime = {

            days : state.days,
            t : state.t,
            d : state.d,
            m : state.m

        };

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

            game.load.image('tiles_map', 'img/tiles_16.png');
            game.load.spritesheet('items_2_1', 'img/items_2_1.png', 32, 16);
            game.load.spritesheet('items_1_2', 'img/items_1_2.png', 16, 32);

            game.load.bitmapFont('zelda', 'fonts/font_zelda.png', 'fonts/font_zelda.xml');

        },

        // create
        create : function () {

            game.state.add('parcel', Parcel.phaserState);
            game.state.add('person', Person.phaserState);

            game.state.start('person');

        },

        // update (ticks)
        update : function () {}

    });

}
    ());
