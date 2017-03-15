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