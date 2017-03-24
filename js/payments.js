/*

The payments module

 */
var Payments = (function () {

    var Types = {

        'job' : Job,
        'on_event' : On_event

    };

    function On_event(obj) {

        this.id = obj.id;
        this.incomeType = 'on_event';
        this.count = obj.count;
        this.amount = obj.amount;

    };

    On_event.prototype.tabulate = function () {

        return this.count * this.amount;

    };

    function Job(obj) {

        obj = !obj ? {
            id : 'none'
        }
         : obj;

        this.id = obj.id;
        this.incomeType = 'job';
        this.base = obj.base || 0;
        this.payDays = obj.payDays || [];

    };

    // tabulate current job instance value
    Job.prototype.tabulate = function (gameDay) {
        // add in base

        var total = 0;

        gameDay = gameDay || 0;

        total += this.base;

        // loop over payDays array
        this.payDays.forEach(function (payDay) {

            var amount = 0;

            // I may not need the payDay bool, but for now thats how I have it
            if (gameDay >= payDay.forGameDay) {

                payDay.payed = true;

                //}

                //if (payDay.payed) {

                amount = 0;

                payDay.hours.forEach(function (hours) {

                    total += hours.count * hours.rate;

                });

                // add in hours data for the job
                total += amount;

            }

        });

        return total;

    };

    // merge down all payed payDays into base, and then purge them form payDays array
    Job.prototype.mergeToBase = function () {

        //var toMerge = 0;
        var self = this,
        i = this.payDays.length;
        while (i--) {

            var total = 0,
            payDay = this.payDays[i];

            if (payDay.payed) {

                payDay.hours.forEach(function (hours) {

                    total += hours.count * hours.rate;

                });

                self.base += total;

                this.payDays.splice(i, 1);

            }

        }

    };

    Job.prototype.pushPayDay = function (day, hours) {

        day = day || 0;
        hours = hours || [];

        this.payDays.push({
            forGameDay : day,
            payed : false,
            hours : JSON.parse(JSON.stringify(hours))
        });

    };

    return {

        // directly create a payment type instance
        createType : function (typeName, obj) {

            return new Types[typeName](obj);

        },

        // create an array of type instances from a regular array of objects
        createTypedArray : function (typeArray) {

            var outArray = [];

            console.log('length: ' + typeArray.length)
            console.log(typeArray);

            typeArray.forEach(function (typeObj, index) {

                outArray.push(new Types[typeObj.incomeType](typeObj));

            });

            return (outArray);

        },

        // tabulate a collection of PaymentTypes
        tabulateCollection : function (collection, timeObj) {

            var total = 0,
            gameDay = timeObj.m * 30 + timeObj.d;

            collection.forEach(function (payment) {

                // call each payment types tabulate method
                total += payment.tabulate(gameDay);

            });

            return total;

        }

    };

}
    ());
