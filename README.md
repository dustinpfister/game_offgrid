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