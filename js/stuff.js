
// The Stuff
var Stuff = (function () {

    var itemBase = [

        // Food Items
        {
            id : 'f_0', // (food item _ Number 0)
            desc : 'Back beans 15.5oz can',
            cost : 0.65,
            uptakes : [{
                    nutrient : 'protein',
                    amount : 33
                }, {
                    nutrient : 'carbs',
                    amount : 90
                }
            ]
        }

    ];

    var api = function () {};

    api.getItemById = function (id) {

        var theItem = '',
        item,
        i = 0,
        len = itemBase.length;
        while (i < len) {

            item = itemBase[i];

            if (item.id === id) {

                theItem = itemBase[i];
                break;

            }

            i += 1;

        }

		// return the item or an empty object
        return theItem || {};

    };

    return api;

}
    ());
