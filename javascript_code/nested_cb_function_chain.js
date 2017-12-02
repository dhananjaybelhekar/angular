function printList(callback) {
	console.log('printList is done');
callback();
}

function updateDB(callback) {
	console.log('updateDB is done');
	callback()
}

function getDistanceWithLatLong(callback) {
	console.log('getDistanceWithLatLong is done');
	callback();
}

function runSearchInOrder(callback) {
	getDistanceWithLatLong(function() {
		updateDB(function() {
		printList(callback);
		});
	});
}
runSearchInOrder(function(){console.log('finished')});