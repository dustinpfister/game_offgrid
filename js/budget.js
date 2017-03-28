

// The Budget
var Budget = (function () {

    // what is current with the money
    var current = {

        bal : 0, // the current balance for the player

        income : 0, // grand total income
        payments : 0, // grand total payments
        start : 5000,

        debits : [],
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

        current.income = Payments.tabulateCollection(current.incomes, Main());

    };

    var api = function () {

        return current;

    };

    api.updateState = function () {

        tabIncome();

        current.payments = Payments.tabulateCollection(current.debits, Main());

        // just subtract grand payments form grand total income
        //console.log(current.income);
        current.bal = current.start + current.income - current.payments; //current.income - current.payments;

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
        current.debits = Payments.createTypedArray(current.debits);

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

                // basic menu
                var menu = game.add.sprite(0, 0, 'basic_menu');
                menu.inputEnabled = true;
                menu.events.onInputDown.add(Main.menuClick);

                // what to create for person state
                text['disp'] = game.add.bitmapText(0, 18, 'zelda', '', 10);

                text['income'] = game.add.bitmapText(10, 50, 'zelda', '', 10);
                text['payments'] = game.add.bitmapText(10, 65, 'zelda', '', 10);

            },

            // update for person state
            update : function () {

                // what to update on each tick for the person state
                var now = new Date(),
                time = now - status.lastUpdate,
                tstr;

                // update Main
                Main.update();

                tstr = 't: ' + Main().t.toFixed(2) + ' Day : ' + Main().d + ' Month: ' + Main().m;
                text['disp'].text = 'money: ' + Budget().bal.toFixed(2) + '; time:  ' + tstr;


                text['income'].text = 'all time credits: ' + Budget().income.toFixed(2);
                text['payments'].text = 'all time debits: ' + Budget().payments.toFixed(2);
            }

        };

    }
        ());

    return api;

}
    ());
