
// The Budget
var Budget = (function () {

    // what is current with the money
    var current = {

        bal : 0, // the current balance for the player

        income : 0,
        start : 5000,

        incomes : [{
                desc : 'click-n-save', // description of the income
                dayAmount : 10, // the amount you get on a payday
                base : 0,
                payDays : 3
            }

        ],
        drain : [// what is draining money


            {
                desc : 'phone bill',
                amount : 60
            }

        ]

    },

    // tabulate income
    tabIncome = function (days) {

        var totals = 0;

        current.incomes.forEach(function (income) {

            totals += income.base + income.dayAmount * ((days / 30) * income.payDays);

        });

        current.income = current.start + totals;

    };

    var api = function () {

        return current;

    };

    api.updateState = function (days) {

        tabIncome(days);

        current.bal = current.income;

        /*
        current.bal -= current.drain[0].amount / 30 * days;

        if (current.bal < 0) {

        current.bal = 0;

        }
         */

    };

    return api;

}
    ());
