var _ = require('lodash'),
    findRecursive;

findRecursive = function (arr, equivFn, found) {

    if (_.isUndefined(found)) {
        found = false;
    }

    if (!equivFn) { equivFn = _.identity; }

    _.forEach(arr, function (elem) {

        if (equivFn(elem)) {
            found = elem;
        }

        if (_.isObject(elem) && elem.hasOwnProperty('children')) {
            found = findRecursive(elem.children, equivFn, found);
        }
    });

    return found || null;
};

module.exports = {
    findRecursive: findRecursive
};