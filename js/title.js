

var Title = (function () {

    var map,
    layer1,
    text_button_newgame;

    return {

        create : function () {

            var button,
            scale,
            logo;
            // new game button
            button = game.add.button(0, 0, 'button', function () {

                    game.state.start('person');

                }, this, 0, 0, 1);

            // scale button to game size
            button.width = 1.60 * (game.width / 4);
            button.height = .45 * (game.width / 4);
            button.x = game.world.centerX - (button.width / 2);
            button.y = game.world.centerY + (game.height * 0.125);

        }
    };

}
    ());
