'use strict';

const StateMachine = require('javascript-state-machine');

class Game extends StateMachine {
    constructor(mode) {
        super({
            init: 'Seating'
        });
        this.validate(mode);
    }

    validate(mode) {
        if (
            !(mode instanceof Object) ||
            !mode.hasOwnProperty('seats') ||
            !mode.hasOwnProperty('min_seats') ||
            !mode.hasOwnProperty('chips') ||
            !mode.hasOwnProperty('currency') ||
            !mode.hasOwnProperty('buy_in') ||
            !mode.hasOwnProperty('rebuy') ||
            !mode.hasOwnProperty('structure')
        ) {
            throw 'Error: `mode` must be a valid game mode!';
        }

        if (typeof mode.seats !== 'number') {
            throw 'Error: `mode.seats` must be numeric!';
        }
        if (typeof mode.min_seats !== 'number') {
            throw 'Error: `mode.min_seats` must be numeric!';
        }
        if (
            typeof mode.chips !== 'number' &&
            mode.chips !== false
        ) {
            throw 'Error: `mode.chips` must be numeric or false!';
        }
        if (
            typeof mode.currency !== 'string' &&
            mode.currency !== false
        ) {
            throw 'Error: `mode.currency` must be a string or false!';
        }
        if (!(mode.buy_in instanceof Object)) {
            throw 'Error: `mode.buy_in` must be an Object!';
        }
        if (typeof mode.rebuy !== 'boolean') {
            throw 'Error: `mode.rebuy` must be a boolean!';
        }
        if (!(mode.structure instanceof Object)) {
            throw 'Error: `mode.structure` must be an Object!';
        }

        if (
            !mode.buy_in.hasOwnProperty('units') ||
            !mode.buy_in.hasOwnProperty('fixed_amount') ||
            !mode.buy_in.hasOwnProperty('range')
        ) {
            throw 'Error: `mode.buy_in` must be a valid buy_in!';
        }
        if (typeof mode.buy_in.units !== 'string') {
            throw 'Error: `mode.buy_in.units` must be a string!';
        }
        if (
            typeof mode.buy_in.fixed_amount !== 'number' &&
            mode.buy_in.fixed_amount !== false
        ) {
            throw 'Error: `mode.buy_in.fixed_amount` must be numeric or false!';
        }
        if (
            !Array.isArray(mode.buy_in.range) &&
            mode.buy_in.range !== false
        ) {
            throw 'Error: `mode.buy_in.range` must be an array or false!';
        }

        if (
            !mode.structure.hasOwnProperty('time') ||
            !mode.structure.hasOwnProperty('levels')
        ) {
            throw 'Error: `mode.structure` must be a valid structure!';
        }
        if (
            typeof mode.structure.time !== 'number' &&
            mode.structure.time !== false
        ) {
            throw 'Error: `mode.structure.time` must be numeric or false!';
        }
        if (!Array.isArray(mode.structure.levels)) {
            throw 'Error: `mode.structure.levels` must be an array!';
        }
        if (mode.structure.levels.length === 0) {
            throw 'Error: `mode.structure.levels` must contain at least one valid level!';
        }
        for (let level of mode.structure.levels) {
            if (
                !(level instanceof Object) ||
                !level.hasOwnProperty('ante') ||
                !level.hasOwnProperty('bb')
            ) {
                throw 'Error: each element of `mode.structure.levels` must be a valid level!';
            }
            if (typeof level.ante !== 'number') {
                throw 'Error: `level.ante` must be numeric!';
            }
            if (typeof level.bb !== 'number') {
                throw 'Error: `level.bb` must be numeric!';
            }
        }
    }
}
exports.Game = Game;
