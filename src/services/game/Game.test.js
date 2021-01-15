'use strict';

import { Game } from './Game';
import { Player } from './Player';
import { Deck } from './Deck';

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

const valid_modes = [
    ['Cash Game', modes.cash_game],
    ['Tournament', modes.tournament]
];

describe('validation', () => {
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

    describe('seats', () => {
        it('should only seat instances of Player', () => {
            const game = new Game(modes.cash_game);
            expect(() => {
                game.seat('invalid');
            }).toThrow('Player');
            expect(() => {
                game.seat({});
            }).toThrow('Player');
            expect(() => {
                game.seat(new Player(game));
            }).not.toThrow();
        });

        describe('should not start a hand until minimum players are seated', () => {
            test.each(valid_modes)('Game Mode: %s', (name, mode) => {
                const game = new Game(mode);
                for (let i = 0; i < mode.min_seats - 1; i++) {
                    game.seat(new Player(game));
                }
                expect(game.state).toEqual('Seating');
                game.seat(new Player(game));
                expect(game.state).toEqual('Ready');
            });
        });

        describe('should not allow more players than available seats', () => {
            test.each(valid_modes)('Game Mode: %s', (name, mode) => {
                const game = new Game(mode);
                for (let i = 0; i < mode.seats; i++) {
                    game.seat(new Player(game));
                }
                expect(() => {
                    game.seat(new Player(game));
                }).toThrow('seats');
            });
        });

        it('should only retrieve valid seats', () => {
            const game = new Game(modes.tournament);
            for (let i = 0; i < modes.tournament.min_seats - 1; i++) {
                game.seat(new Player(game));
            }
            expect(() => {
                game.get_seat(0);
            }).toThrow('invalid seat');
            expect(() => {
                game.get_seat(-1);
            }).toThrow('invalid seat');
            expect(() => {
                game.get_seat(modes.tournament.seats + 1);
            }).toThrow('invalid seat');
            expect(game.get_seat(1)).toBeInstanceOf(Player);
            expect(game.get_seat(modes.tournament.seats)).toBe(false);
        });
    });
});

describe('state', () => {
    it('should initialise with `Seating` state', () => {
        const game = new Game(modes.cash_game);
        expect(game.state).toEqual('Seating');
    });

    describe('should transition to `Ready` state when required seats are fulfilled', () => {
        test.each(valid_modes)('Game Mode: %s', (name, mode) => {
            const game = new Game(mode);
            for (let i = 0; i < mode.min_seats; i++) {
                game.seat(new Player(game));
            }
            expect(game.state).toEqual('Ready');
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

    describe('should transition to `Preflop` state from `Ready` when hand starts', () => {
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

    describe('should transition to `Ready` when all but 1 players fold from any street', () => {
        test.each(valid_modes)('Game Mode: %s', (name, mode) => {
            const preflop_game = new Game(mode);
            for (let i = 0; i < mode.min_seats; i++) {
                preflop_game.seat(new Player(preflop_game));
            }
            preflop_game.start();
            for (let i = 0; i < mode.min_seats - 1; i++) {
                let player = preflop_game.get_seat(i + 1);
                player.action();
                player.fold();
            }
            expect(preflop_game.state).toEqual('Ready');

            const flop_game = new Game(mode);
            for (let i = 0; i < mode.min_seats; i++) {
                flop_game.seat(new Player(flop_game));
            }
            flop_game.start();
            flop_game.orbit();
            for (let i = 0; i < mode.min_seats - 1; i++) {
                let player = flop_game.get_seat(i + 1);
                player.action();
                player.fold();
            }
            expect(flop_game.state).toEqual('Ready');

            const turn_game = new Game(mode);
            for (let i = 0; i < mode.min_seats; i++) {
                turn_game.seat(new Player(turn_game));
            }
            turn_game.start();
            turn_game.orbit();
            turn_game.orbit();
            for (let i = 0; i < mode.min_seats - 1; i++) {
                let player = turn_game.get_seat(i + 1);
                player.action();
                player.fold();
            }
            expect(turn_game.state).toEqual('Ready');

            const river_game = new Game(mode);
            for (let i = 0; i < mode.min_seats; i++) {
                river_game.seat(new Player(river_game));
            }
            river_game.start();
            river_game.orbit();
            river_game.orbit();
            river_game.orbit();
            for (let i = 0; i < mode.min_seats - 1; i++) {
                let player = river_game.get_seat(i + 1);
                player.action();
                player.fold();
            }
            expect(river_game.state).toEqual('Ready');
        });
    });

    describe('should transition to `Ready` when pot is awarded at showdown', () => {
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
            expect(game.state).toEqual('Ready');
        });
    });
});

describe('general', () => {
    it('should assign each player a hand at preflop', () => {
        const game = new Game(modes.cash_game);
        for (let i = 0; i < modes.cash_game.seats; i++) {
            game.seat(new Player(game));
        }
        game.start();
        for (let player of game.players) {
            expect(player.hand).toHaveLength(2);
        }
    });

    it('should reset each player every hand', () => {
        const game = new Game(modes.cash_game);
        for (let i = 0; i < modes.cash_game.seats; i++) {
            game.seat(new Player(game));
        }
        game.start();
        for (let i = 0; i < modes.cash_game.seats - 1; i++) {
            let player = game.get_seat(i + 1);
            player.action();
            player.fold();
        }
        for (let player of game.players) {
            expect(player.hand).toEqual([]);
        }
    });

    it('should shuffle the deck on every new hand', () => {
        const game = new Game(modes.cash_game);
        const fake_deck = new Deck();
        const deck_shuffle = jest.spyOn(fake_deck, 'shuffle');
        game.deck = fake_deck;
        for (let i = 0; i < modes.cash_game.seats; i++) {
            game.seat(new Player(game));
        }
        game.start();
        game.orbit();
        game.orbit();
        game.orbit();
        game.award_pot();
        expect(deck_shuffle).toBeCalledTimes(2);
        deck_shuffle.mockRestore();
    });
});