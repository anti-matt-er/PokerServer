'use strict';

import { Game } from './Game';

const modes = {
    cash_game: {
        seats: 6,
        min_seats: 2,
        chips: false,
        currency: 'GBP',
        buy_in: {
            units: 'BB',
            fixed_amount: false,
            range: [5, 10]
        },
        rebuy: true,
        structure: {
            time: false,
            levels: [
                { ante: 0, bb: 100 }
            ]
        }
    },
    tournament: {
        seats: 9,
        min_seats: 9,
        chips: 5000,
        currency: false,
        buy_in: {
            units: 'USD',
            fixed_amount: 250,
            range: false
        },
        rebuy: false,
        structure: {
            time: 10,
            levels: [
                { ante: 7, bb: 60 },
                { ante: 10, bb: 80 },
                { ante: 12, bb: 100 },
                { ante: 15, bb: 120 },
                { ante: 20, bb: 150 },
                { ante: 25, bb: 200 }
            ]
        }
    },
    empty: {
        seats: null,
        min_seats: null,
        chips: null,
        currency: null,
        buy_in: null,
        rebuy: null,
        structure: null
    }
}

describe('modes', () => {
    it('should reject invalid game modes', () => {
        expect(() => {
            new Game('invalid');
        }).toThrow('valid game mode');

        expect(() => {
            new Game({});
        }).toThrow('valid game mode');

        expect(() => {
            new Game(modes.empty);
        }).not.toThrow('valid game mode');

        expect(() => {
            new Game(modes.empty);
        }).toThrow();

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.seats = 'invalid';
            new Game(invalid_cash_game);
        }).toThrow('seats');

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.min_seats = 'invalid';
            new Game(invalid_cash_game);
        }).toThrow('min_seats');

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.chips = 'invalid';
            new Game(invalid_cash_game);
        }).toThrow('chips');

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.currency = ['invalid'];
            new Game(invalid_cash_game);
        }).toThrow('currency');

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.buy_in = 'invalid';
            new Game(invalid_cash_game);
        }).toThrow('buy_in');

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.rebuy = 'invalid';
            new Game(invalid_cash_game);
        }).toThrow('rebuy');

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.structure = 'invalid';
            new Game(invalid_cash_game);
        }).toThrow('structure');

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.buy_in = {};
            new Game(invalid_cash_game);
        }).toThrow('valid buy_in');

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.buy_in = {
                units: null,
                fixed_amount: null,
                range: null
            };
            new Game(invalid_cash_game);
        }).not.toThrow('valid buy_in');

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.buy_in.units = null;
            new Game(invalid_cash_game);
        }).toThrow('units');

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.buy_in.fixed_amount = null;
            new Game(invalid_cash_game);
        }).toThrow('fixed_amount');

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.buy_in.range = null;
            new Game(invalid_cash_game);
        }).toThrow('range');

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.structure = {};
            new Game(invalid_cash_game);
        }).toThrow('valid structure');

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.structure = {
                time: null,
                levels: null
            };
            new Game(invalid_cash_game);
        }).not.toThrow('valid buy_in');

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.structure.time = null;
            new Game(invalid_cash_game);
        }).toThrow('time');

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.structure.levels = null;
            new Game(invalid_cash_game);
        }).toThrow('levels');

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.structure.levels = [];
            new Game(invalid_cash_game);
        }).not.toThrow('levels');

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.structure.levels = [];
            new Game(invalid_cash_game);
        }).toThrow('level');

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.structure.levels = [{}];
            new Game(invalid_cash_game);
        }).toThrow('valid level');

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.structure.levels = [{ ante: null, bb: null }];
            new Game(invalid_cash_game);
        }).not.toThrow('valid level');

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.structure.levels = [{ ante: null, bb: null }];
            new Game(invalid_cash_game);
        }).toThrow('ante');

        expect(() => {
            let invalid_cash_game = modes.cash_game;
            cash_game.structure.levels = [{ ante: 0, bb: null }];
            new Game(invalid_cash_game);
        }).toThrow('bb');
    });
});

describe('state', () => {
    it('should initialise with `Seating` state', () => {
        const game = new Game();
        expect(game.state).toEqual('Seating');
    });
});