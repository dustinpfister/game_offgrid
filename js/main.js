
// responsible for time, and game state
var main = (function () {

    var current = {

        //startTime : new Date(2017,1,1),
        startTime : new Date(),
        gameDayLength : 10000, // how long a game day is in ms
        days : 0,
        t : 0,
        d : 1,
        m : 1

    },

    api = function () {

        return current;

    };

    api.update = function () {

        var now = new Date();

        current.days = Math.floor((now - current.startTime) / current.gameDayLength);

        current.t = (now - current.startTime) % current.gameDayLength / current.gameDayLength;
        current.d = current.days % 30 + 1;
        current.m = Math.floor(current.days / 30) + 1;

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
