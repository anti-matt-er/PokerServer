'use strict';

const StateMachine = require('javascript-state-machine');
import { Player } from './Player';

class Game extends StateMachine {
    constructor(mode) {
        super({
            init: 'Seating',
            transitions: [
                { name: 'ready', from: 'Seating', to: 'Ready' },
                { name: 'wait', from: 'Ready', to: 'Seating' },
                { name: 'start', from: 'Ready', to: 'Preflop' },
                { name: 'orbit', from: 'Preflop', to: 'Flop' },
                { name: 'orbit', from: 'Flop', to: 'Turn' },
                { name: 'orbit', from: 'Turn', to: 'River' },
                { name: 'orbit', from: 'River', to: 'Showdown' },
                { name: 'finish', from: ['Preflop', 'Flop', 'Turn', 'River', 'Showdown'], to: 'Ready' },
            ],
            methods: {
                onPreflop: () => {
                    for(let player of this.players) {
                        this.deck.deal(player);
                    }
                },
                onFinish: () => {
                    for(let player of this.players) {
                        player.reset();
                    }
                },
            }
        });
        this.validate(mode);
        this.mode = mode;
        this.players = [];
        this.deck = new Deck();
    }

    seat(player) {
        if (!(player instanceof Player)) {
            throw 'Error: `player` must be instance of Player!';
        }
        if (this.players.length >= this.mode.seats) {
            throw 'Error: all seats are taken!';
        }
        this.players.push(player);
        player.seat();
        if (this.can('ready') && this.players.length >= this.mode.min_seats) {
            this.ready();
        }
    }

    get_seat(seat) {
        if (
            seat < 1 ||
            seat > this.mode.seats
        ) {
            throw 'Error: invalid seat!';
        }
        if (seat > this.players.length) {
            return false;
        }
        return this.players[seat - 1];
    }

    quit_player(player) {
        this.players = this.players.filter((seat) => { return seat !== player; });
        if (this.is('Ready') && this.players.length < this.mode.min_seats) {
            this.wait();
        }
    }

    notify() {
        this.check_early_finish();
    }

    check_early_finish() {
        let players_out = 0;
        for (let player of this.players) {
            if (player.is('Out')) {
                players_out += 1;
                if (players_out >= this.players.length - 1) {
                    this.finish();
                    return;
                }
            }
        }
    }

    award_pot() {
        this.finish();
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
