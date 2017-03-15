# game_offgrid

## The Person Object

## Items

As of this writing I have a stuff.js file that is responsible for the item database. This will might be replaced.


I think I have food items drafted together okay for now, they will look something like this.
```js
var foodItem = {
    itemNumber: 0,
    desc : 'back beans 15.5oz can',
    cost : '0.65',
    uptakes : [
        {nutrient: 'protein', amount : 33},
        {nutrient: 'carbs', amount: 90}
    ]
};
```

## Save states

I would like offgird to have the option to load a game state from an external json file. This will be used as an additional method of game state storage, as well as easy game state recovery. For the time being it will be possible for a player to cheat by simply hacking over the JSON data, but in future releases I may change things so that doing so is a little more compacted than just that.

Here is what the save_default.json files looks like for now
```json
{
    "Main" : {
        "time_start" : "2017-03-01T05:00:00.000Z",
        "time_last" : "2017-03-01T05:00:00.000Z",
        "gameDayLength" : 600000
    },
    "Person" : {
        "weight" : 140,
        "HP" : 1000,
        "maxHP" : 1000,
        "nutrient" : {
            "protein" : {
                "grams" : 20,
                "eatTotal" : 0,
                "startGrams" : 20,
                "maxGrams" : 120,
                "lossRate" : 65
            },
            "carbs" : {
                "grams" : 150,
                "eatTotal" : 0,
                "startGrams" : 150,
                "maxGrams" : 600,
                "lossRate" : 300
            }
        },
        "consumed" : []
    }
}
```

The player will start off with some starting food in there belly, but will need to eat soon.

Budget.js

So I have gone in the direction of having it so the players money is set by way of an expression, for better or worse. What I mean by this is the money is not something that is just incremented by a delta value to a certain balance. There is a paper trail of sorts, and everything is accounted for in terms of both credits and debits.

As such this will call for a kind of income type system

Say you make $10 when you preform a certain task in the game

```js
{
    id: 'fiver_task_5',
    incomeType: 'event',
    amount : 5,
    count : 7
}
```

That is what would need to be stored, and then that info could be used when tabulating total income
    in budget.js

Another example is say that you have an income type that is always in effect, and just simply gives you a fixed amount of money over time.

```json
{
    "id": "basic_income",
    "incomeType": "over_time_always",
    "amount" : 500,
    "timeUnit" : "m",
    "count": 1
}
```

this type would act in a way where the sum that is added to income would be found with an expression like this.

```js
var sum = income.amount * gameMonths * income.count
```

### Job Type

I might also want another type. How about the idea of having the option to work a job that pays holiday pay, and you might only work there for a few hours before quiting, or getting fired. In addition say it might be possible to set things up so that the Person can work while you are away from playing the game (alway production).

```json
{

    "id" : "worked_at_store",
    "incomeType" : "job",
    "base" : 240,
    "payDays" : [
        {
            "forGameDay" : 14,
            "payed" : true,
            "hours" : [
                {
                    "count" : 16,
                    "rate" : 10
                }, 
                {
                    "count" : 8,
                    "rate" : 15
                }
            ]
        }, 
        {
            "forGameDay" : 21,
            "payed" : false,
            "hours" : [
                {
                    "count" : 24,
                    "rate" : 10
                }
            ]
        }
    ]
}
```

This way a history of sorts could be established to show what has been payed, and what is yet to be payed. When a certain game day comes around a simple 'payed' flag could be set to true to indicate that the amounts are to be tabulated and added to a sum, that will influence the players balance. When the history gets a bit long, the payed history could be added up into a sum that is then added to base. At which point the payed history could be cleared out. If the player for whatever reason stops working at the store, it could simply just remain as a base value, and look like this:

```json
{

    "id" : "worked_at_store",
    "incomeType" : "job",
    "base" : 760,
    "payDays" : []
}
```

At which point it could remain as just a simple condense amount in the save state, or could be easily reestablished if the player starts working there again. This might be the best way to handle income, in fact another type like it might even be better for basic income as well:

```json
{
    "id" : "basic_income",
    "incomeType" : "gov_income",
    "base" : 750,
    "payOuts" : [
        {
            "forGameDay" : 3,
            "payed" : true,
            "amount" : 750
        },
        {
            "forGameDay" : 33,
            "payed" : false,
            "amount" : 800
        }
    ]
}
```

This allows for factors to influence basic income amounts, and have it so it pays out on certain game days.