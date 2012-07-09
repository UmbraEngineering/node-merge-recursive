
// Flat merge
module.exports = exports = function(host) {
	var donors = slice(arguments, 1);
	donors.forEach(function(donor) {
		Object.keys(donor).forEach(function(key) {
			host[key] = donor[key];
		});
	});
	return host;
};

// Recursive merge
exports.recursive = function(host) {
	var donors = slice(arguments, 1);
	donors.forEach(function(donor) {
		Object.keys(donor).forEach(function(key) {
			if (isObj(donor[key])) {
				if (isObj(host[key])) {
					exports.recursive(host[key], donor[key]);
				} else {
					var base = Array.isArray(donor[key]) ? [ ] : { };
					host[key] = exports.recursive(base, donor[key]);
				}
			} else {
				host[key] = donor[key];
			}
		});
	});
	return host;
};

// Helpers

function slice(arr, i) {
	return Array.prototype.slice.call(arr, i);
}

function isObj(value) {
	return !! (typeof value === 'object' && value);
}

function getType(value) {
	return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}



















