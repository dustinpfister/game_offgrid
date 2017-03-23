
// The Budget
var Budget = (function () {

    // what is current with the money
    var current = {

        bal : 0, // the current balance for the player

        income : 0, // grand total income
        payments : 0, // grand total payments
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
    tabIncome = function () {

        /*
        var totals = 0;

        current.incomes.forEach(function (income) {

        totals += income.base + income.dayAmount * ((days / 30) * income.payDays);

        });

        current.income = current.start + totals;

         */

        current.income = 0;
        //console.log('looking at incomes');
        current.incomes.forEach(function (income) {

            //console.log(income);

            //console.log(income.id + ' is an ' + income.incomeType + ' type income');
            // which income type is it?
            switch (income.incomeType) {

            case 'over_time_always':

                // a simple type that just adds an amount * count * gameMonths
                // plus amount * count / 30 *

                current.income += income.amount * main().m * income.count;

                console.log(current.income);

                break;

            }

        });

    };

    var api = function () {

        return current;

    };

    api.updateState = function () {

        tabIncome();

        // just subtract grand payments form grand total income
        //console.log(current.income);
        current.bal = current.start + current.income; //current.income - current.payments;

    };

    // set Budget with the given budget object
    api.set = function (budgetObj) {

        // if an object
        if (typeof personObj === 'object') {

            // copy in the object
            current = JSON.parse(JSON.stringify(budgetObj));

        } else {

            // else assume a string is given, and it is JSON

            current = JSON.parse(budgetObj);

        }

        //console.log(current.incomes);

        tabIncome();

    };

    api.phaserState = (function () {

        // store text objects
        var text = [];

        return {

            create : function () {

                // what to create for person state
                text['money'] = game.add.bitmapText(10, 10, 'zelda', '', 10);
                text['time'] = game.add.bitmapText(180, 10, 'zelda', '', 9);

            },

            // update for person state
            update : function () {

                // what to update on each tick for the person state
                var now = new Date(),
                time = now - status.lastUpdate;

                // update main
                main.update();

                text['money'].text = 'money: ' + Budget().bal.toFixed(2);
                text['time'].text = 'T : ' + main().t.toFixed(2) + ' Day : ' + main().d + ' Month: ' + main().m;
            }

        };

    }
        ());

    return api;

}
    ());
