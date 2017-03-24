

// The Budget
var Budget = (function () {

    // what is current with the money
    var current = {

        bal : 0, // the current balance for the player

        income : 0, // grand total income
        payments : 0, // grand total payments
        start : 5000,

        incomes : [],
        drain : [// what is draining money


            {
                desc : 'phone bill',
                amount : 60
            }

        ]

    },

    // tabulate income
    tabIncome = function () {

        current.income = Payments.tabulateCollection(current.incomes,Main());

        /*
        // loop over all income objects
        current.incomes.forEach(function (income) {

        // add to income based on income type
        switch (income.incomeType) {

        case 'over_time_always':

        // a simple type that just adds an amount based on past total game time.

        // months
        current.income += income.amount * Main().m * income.count;

        // day
        current.income += income.amount * income.count / 30 * Main().d;

        break;

        case 'job':

        // add in base
        current.income += income.base;

        // loop over payDays array
        income.payDays.forEach(function (payDay) {

        var gt = Main(),
        amount,
        gameDay = gt.m * 30 + gt.d;

        // I may not need the payDay bool, but for now thats how I have it
        if (gameDay >= payDay.forGameDay) {

        payDay.payed = true;

        }

        if (payDay.payed) {

        amount = 0;

        payDay.hours.forEach(function (hours) {

        amount += hours.count * hours.rate;

        });

        // add in hours data for the job
        current.income += amount;

        }

        });

        break;

        }

        });

         */

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

        console.log(current.incomes);

        // convert incomes Object array into [Payment Type Class] array
        current.incomes = Payments.createTypedArray(current.incomes);

        console.log(Payments.createTypedArray(current.incomes));

        //console.log(current.incomes);

        // these all default to zero
        current.bal = 0;
        current.income = 0;
        current.payments = 0;

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

                text['income'] = game.add.bitmapText(10, 50, 'zelda', '', 10);
                text['payments'] = game.add.bitmapText(10, 65, 'zelda', '', 10);

            },

            // update for person state
            update : function () {

                // what to update on each tick for the person state
                var now = new Date(),
                time = now - status.lastUpdate;

                // update Main
                Main.update();

                text['money'].text = 'money: ' + Budget().bal.toFixed(2);
                text['time'].text = 'T : ' + Main().t.toFixed(2) + ' Day : ' + Main().d + ' Month: ' + Main().m;

                text['income'].text = 'all time credits: ' + Budget().income.toFixed(2);
                text['payments'].text = 'all time debits: ' + Budget().payments.toFixed(2);
            }

        };

    }
        ());

    return api;

}
    ());
