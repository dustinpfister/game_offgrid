
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

        },

        // create
        create : function () {

            game.state.add('parcel', Parcel.phaserState);

            game.state.start('parcel');

        },

        // update (ticks)
        update : function () {}

    });

}
    ());
