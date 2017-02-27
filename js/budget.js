
// The Budget
var Budget = (function () {

    // what is current with the money
    var current = {

        bal : 5000, // the current balance for the player
        lastUpdate : new Date(),
        incomes : [{
                desc : 'basic', // description of the income
                amount : 750, // the amount you get on a payday
                payDays : [3]// paydays
            }

        ],
        drain : [// what is draining money


            {
                desc : 'phone bill',
                amount : 60
            }

        ]

    };

    var api = function () {

        return current;

    };

    api.updateState = function (days) {

        current.bal -= current.drain[0].amount / 30 * days;

    };

    return api;

}
    ());
