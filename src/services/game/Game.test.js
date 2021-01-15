'use strict';

import { Game } from './Game';
import { Player } from './Player';

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
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.seats = 'invalid';
            new Game(invalid_cash_game);
        }).toThrow('seats');

        expect(() => {
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.min_seats = 'invalid';
            new Game(invalid_cash_game);
        }).toThrow('min_seats');

        expect(() => {
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.chips = 'invalid';
            new Game(invalid_cash_game);
        }).toThrow('chips');

        expect(() => {
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.currency = ['invalid'];
            new Game(invalid_cash_game);
        }).toThrow('currency');

        expect(() => {
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.buy_in = 'invalid';
            new Game(invalid_cash_game);
        }).toThrow('buy_in');

        expect(() => {
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.rebuy = 'invalid';
            new Game(invalid_cash_game);
        }).toThrow('rebuy');

        expect(() => {
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.structure = 'invalid';
            new Game(invalid_cash_game);
        }).toThrow('structure');

        expect(() => {
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.buy_in = {};
            new Game(invalid_cash_game);
        }).toThrow('valid buy_in');

        expect(() => {
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.buy_in = {
                units: null,
                fixed_amount: null,
                range: null
            };
            new Game(invalid_cash_game);
        }).not.toThrow('valid buy_in');

        expect(() => {
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.buy_in.units = null;
            new Game(invalid_cash_game);
        }).toThrow('units');

        expect(() => {
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.buy_in.fixed_amount = null;
            new Game(invalid_cash_game);
        }).toThrow('fixed_amount');

        expect(() => {
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.buy_in.range = null;
            new Game(invalid_cash_game);
        }).toThrow('range');

        expect(() => {
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.structure = {};
            new Game(invalid_cash_game);
        }).toThrow('valid structure');

        expect(() => {
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.structure = {
                time: null,
                levels: null
            };
            new Game(invalid_cash_game);
        }).not.toThrow('valid structure');

        expect(() => {
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.structure.time = null;
            new Game(invalid_cash_game);
        }).toThrow('time');

        expect(() => {
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.structure.levels = null;
            new Game(invalid_cash_game);
        }).toThrow('levels');

        expect(() => {
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.structure.levels = [];
            new Game(invalid_cash_game);
        }).toThrow('valid level');

        expect(() => {
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.structure.levels = [false, 123, 'invalid'];
            new Game(invalid_cash_game);
        }).toThrow('valid level');

        expect(() => {
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.structure.levels = [{}];
            new Game(invalid_cash_game);
        }).toThrow('valid level');

        expect(() => {
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.structure.levels = [{ ante: null, bb: null }];
            new Game(invalid_cash_game);
        }).not.toThrow('valid level');

        expect(() => {
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.structure.levels = [{ ante: null, bb: null }];
            new Game(invalid_cash_game);
        }).toThrow('ante');

        expect(() => {
            let invalid_cash_game = JSON.parse(JSON.stringify(modes.cash_game));
            invalid_cash_game.structure.levels = [{ ante: 0, bb: null }];
            new Game(invalid_cash_game);
        }).toThrow('bb');
    });
});

describe('state', () => {
    const valid_modes = [
        ['Cash Game', modes.cash_game],
        ['Tournament', modes.tournament]
    ];

    it('should initialise with `Seating` state', () => {
        const game = new Game(modes.cash_game);
        expect(game.state).toEqual('Seating');
    });

    describe('should transition to `Start Hand` state when required seats are fulfilled', () => {
        test.each(valid_modes)('Game Mode: %s', (name, mode) => {
            const game = new Game(mode);
            for (let i = 0; i < mode.min_seats; i++) {
                game.seat(new Player(game));
            }
            expect(game.state).toEqual('Start Hand');
        });
    });

    describe('should transition to `Seating` state when number of players fall below the minimum seats', () => {
        test.each(valid_modes)('Game Mode: %s', (name, mode) => {
            const game = new Game(mode);
            for (let i = 0; i < mode.min_seats; i++) {
                game.seat(new Player(game));
            }
            let last_player = game.get_seat(mode.min_seats);
            last_player.quit();
            expect(game.state).toEqual('Seating');
        });
    });

    describe('should transition to `Preflop` state from `Start Hand` when hand starts', () => {
        test.each(valid_modes)('Game Mode: %s', (name, mode) => {
            const game = new Game(mode);
            for (let i = 0; i < mode.min_seats; i++) {
                game.seat(new Player(game));
            }
            game.start();
            expect(game.state).toEqual('Preflop');
        });
    });

    describe('should transition to each street state when an orbit is complete', () => {
        test.each(valid_modes)('Game Mode: %s', (name, mode) => {
            const game = new Game(mode);
            for (let i = 0; i < mode.min_seats; i++) {
                game.seat(new Player(game));
            }
            game.start();
            game.orbit();
            expect(game.state).toEqual('Flop');
            game.orbit();
            expect(game.state).toEqual('Turn');
            game.orbit();
            expect(game.state).toEqual('River');
            game.orbit();
            expect(game.state).toEqual('Showdown');
        });
    });

    describe('should transition to `Start Hand` when all but 1 players fold from any street', () => {
        test.each(valid_modes)('Game Mode: %s', (name, mode) => {
            const preflop_game = new Game(mode);
            for (let i = 0; i < mode.min_seats; i++) {
                preflop_game.seat(new Player(preflop_game));
            }
            preflop_game.start();
            for (let i = 0; i < mode.min_seats - 1; i++) {
                preflop_game.get_seat(i + 1).fold();
            }
            expect(preflop_game.state).toEqual('Start Hand');

            const flop_game = new Game(mode);
            for (let i = 0; i < mode.min_seats; i++) {
                flop_game.seat(new Player(flop_game));
            }
            flop_game.start();
            flop_game.orbit();
            for (let i = 0; i < mode.min_seats - 1; i++) {
                flop_game.get_seat(i + 1).fold();
            }
            expect(flop_game.state).toEqual('Start Hand');

            const turn_game = new Game(mode);
            for (let i = 0; i < mode.min_seats; i++) {
                turn_game.seat(new Player(turn_game));
            }
            turn_game.start();
            turn_game.orbit();
            turn_game.orbit();
            for (let i = 0; i < mode.min_seats - 1; i++) {
                turn_game.get_seat(i + 1).fold();
            }
            expect(turn_game.state).toEqual('Start Hand');

            const river_game = new Game(mode);
            for (let i = 0; i < mode.min_seats; i++) {
                river_game.seat(new Player(river_game));
            }
            river_game.start();
            river_game.orbit();
            river_game.orbit();
            river_game.orbit();
            for (let i = 0; i < mode.min_seats - 1; i++) {
                river_game.get_seat(i + 1).fold();
            }
            expect(river_game.state).toEqual('Start Hand');
        });
    });

    describe('should transition to `Start Hand` when pot is awarded at showdown', () => {
        test.each(valid_modes)('Game Mode: %s', (name, mode) => {
            const game = new Game(mode);
            for (let i = 0; i < mode.min_seats; i++) {
                game.seat(new Player(game));
            }
            game.start();
            game.orbit();
            game.orbit();
            game.orbit();
            game.award_pot();
            expect(game.state).toEqual('Start Hand');
        });
    });
});