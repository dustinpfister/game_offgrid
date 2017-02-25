
// the main Phaser game instance
var game = (function () {

    var land_width = 11,
    land_height = 8,
    map,
    layer_land,

    // a clink or touch on the land
    pointOnLand = function (sprite, pointer) {

        var cellSize = Math.floor(sprite.width / land_width),
        x = pointer.x - sprite.x,
        y = pointer.y - sprite.y,
        cellX = Math.floor(x / cellSize),
        cellY = Math.floor(y / cellSize);
        console.log(cellX + ',' + cellY);

        // place a trailer.
        game.add.sprite(
            layer_land.x + cellX * cellSize,
            layer_land.y + cellY * cellSize,
            'items_2_1', 0);
    },

    // create the land map
    createLand = function () {

        //  Creates a blank tile map.
        map = game.add.tilemap();
        map.addTilesetImage('tiles_map', null, 16, 16);

        // maps land layer
        layer_land = map.create('layer', land_width, land_height, 16, 16);
        layer_land.fixedToCamera = false;
        layer_land.x = game.height * .05;
        layer_land.y = game.height * .05;
        //layer_land.width = game.height * .85;
        //layer_land.height = game.height * .85;

        // input and events for land tile
        layer_land.inputEnabled = true;
        layer_land.events.onInputDown.add(pointOnLand);

    },

    // generate the land map
    genLand = function () {

        i = 0,
        len = 16 * 10;
        while (i < len) {

            x = i % land_width;
            y = Math.floor(i / land_width);

            map.putTile(0, x, y, 'layer');

            i += 1;

        }

    };

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

            var i,
            len,
            x,
            y;

            //app.add.sprite(0,0,'tiles_map');
            createLand();
            genLand();

        },

        // update (ticks)
        update : function () {}

    });

}
    ());
