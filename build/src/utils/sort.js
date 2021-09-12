"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareContinent = void 0;
const compareContinent = (a, b) => {
    if (a.continent < b.continent) {
        return -1;
    }
    if (a.continent > b.continent) {
        return 1;
    }
    return 0;
};
exports.compareContinent = compareContinent;
