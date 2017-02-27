
// The Stuff
var Stuff = (function () {

    var itemBase = [

        // Food Items
        {
            id : 'f_0', // (food item _ Number 0)
            desc : 'Back beans 15.5oz can',
            cost : 0.65,

            uptakes : {

                protein : {
                    amount : 33
                },
                carbs : {
                    amount : 90
                }

            }

        },
        {
            id : 'f_1',
            desc : 'Apple',
            cost : 0.30,

            uptakes : {

                carbs : {
                    amount : 150
                }

            }

        }

    ],

    // build the index for itemBase
    itemIndex = (function () {

        var index = {};

        itemBase.forEach(function (item, itemIndex) {

            index[item.id] = itemIndex;

        });

        return index;

    }
        ());

    var api = function () {};

    api.getItemById = function (id) {

        return itemBase[itemIndex[id]];

    };

    return api;

}
    ());
