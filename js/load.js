
var Load = (function () {

    return {

        preload : function () {

            var loadSprite = game.add.sprite(0, 0, 'loadingbar');
            loadSprite.width = 0;
            loadSprite.x = game.world.centerX - loadSprite.width / 2;
            loadSprite.y = game.world.centerY - 16;

            game.load.onLoadStart.add(function () {}, this);
            game.load.onFileComplete.add(function (progress) {

                loadSprite.width = game.width * (progress / 100);
                loadSprite.x = game.world.centerX - loadSprite.width / 2;

            }, this);
            game.load.onLoadComplete.add(function () {}, this);

            game.load.spritesheet('button', 'img/button.png', 160, 45);

            game.load.image('basic_menu', 'img/basic_menu.png');
            game.load.image('tiles_map', 'img/tiles_16.png');
            game.load.spritesheet('items_2_1', 'img/items_2_1.png', 32, 16);
            game.load.spritesheet('items_1_2', 'img/items_1_2.png', 16, 32);

            // fonts
            game.load.bitmapFont('zelda', 'fonts/font_zelda.png', 'fonts/font_zelda.xml');

            // json
            game.load.json('save_default', 'json/save_default.json');

        },

        create : function () {

            game.state.add('parcel', Parcel.phaserState);
            game.state.add('person', Person.phaserState);
            game.state.add('budget', Budget.phaserState);
            game.state.add('title', Title);

            // start by loading a new game by default
            Main.newGame(JSON.stringify(game.cache.getJSON('save_default')));

            game.state.start('title');

        }

    }

}
    ());
