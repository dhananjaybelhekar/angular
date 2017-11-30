var nested = [3, [1, 'hey', [2, 'you', [2, 5]]], 1, [9, [{}, [2, true]]]];
function flatten(arr) {
    return arr.reduce(function(explored, toExplore) {
        return explored.concat(Array.isArray(toExplore) ? flatten(toExplore) : toExplore);
    }, []);
}
x = flatten(nested);
console.log(x);
