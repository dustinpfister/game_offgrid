
// responsible for time, and game state
var main = (function () {

    var current = {

        startTime : new Date(),
        gameDayLength : 250, // how long a game day is in ms
        day : 1,
        month : 1

    },

    api = function () {

        return current;

    };

    api.update = function () {

        var now = new Date(),

        days = Math.floor((now - current.startTime) / current.gameDayLength);

        current.month = Math.floor(days / 30) + 1;

        current.day = days % 30 + 1;

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
