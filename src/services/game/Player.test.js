'use strict';

import { Player } from './Player';
import { Card } from './Card';
import { Game } from './Game';

describe('hand', () => {
    jest.spyOn(Game.prototype, 'validate').mockImplementation(() => {}); //don't validate gamemodes, for cleaner testing
    afterAll(() => {
        jest.restoreAllMocks();
    });
    const card_KH = new Card('KH');
    const card_AS = new Card('AS');
    const card_TD = new Card('TD');
    const game = new Game();

    it('should reset correctly', () => {
        const player = new Player(game);
        player.hand = [card_KH, card_AS];
        player.reset();
        expect(player.hand).toEqual([]);
    });

    it('should accept exactly 2 dealt cards', () => {
        const player = new Player(game);

        expect(() => {
            player.deal('not an array');
        }).toThrow('must be an array');
        expect(() => {
            player.deal(123);
        }).toThrow('must be an array');
        expect(() => {
            player.deal({});
        }).toThrow('must be an array');

        expect(() => {
            player.deal([]);
        }).toThrow('must contain exactly 2 cards');
        expect(() => {
            player.deal([card_KH]);
        }).toThrow('must contain exactly 2 cards');
        expect(() => {
            player.deal([card_KH, card_AS, card_TD]);
        }).toThrow('must contain exactly 2 cards');
        expect(() => {
            player.deal(['not a card', 'another non-card']);
        }).toThrow('must contain exactly 2 cards');

        expect(() => {
            player.deal([card_KH, card_AS]);
        }).not.toThrow();

        expect(player.hand).toHaveLength(2);
    });

    it('should not accept more cards if there\'s already a hand', () => {
        const player = new Player(game);

        expect(() => {
            player.deal([card_KH, card_AS]);
            player.deal([card_KH, card_AS]);
        }).toThrow('already has a hand');

        expect(() => {
            player.reset();
            player.deal([card_KH, card_AS]);
            player.reset();
            player.deal([card_KH, card_AS]);
        }).not.toThrow();
    });
});

describe('game', () => {
    jest.spyOn(Game.prototype, 'validate').mockImplementation(() => {}); //don't validate gamemodes, for cleaner testing
    afterAll(() => {
        jest.restoreAllMocks();
    });
    const game = new Game();

    it('should fail if no Game object is provided', () => {
        expect(() => {
            const player = new Player();
        }).toThrow('Game object must be provided');
    
        expect(() => {
            const player = new Player('not a Game object');
        }).toThrow('Game object must be provided');

        expect(() => {
            const player = new Player(123);
        }).toThrow('Game object must be provided');

        expect(() => {
            const player = new Player({});
        }).toThrow('Game object must be provided');
    });

    it('should keep track of previous action', () => {
        const player = new Player(game);
        game.bet = 0;
        player.chips = 100;
        player.seat();
        player.action();
        game.bet = 10;
        player.call();
        expect(player.last_action).toEqual('Call');
        player.reinit();
        game.bet = 0;
        player.chips = 100;
        player.seat();
        player.action();
        player.raise(20);
        expect(player.last_action).toEqual('Raise');
        player.reinit();
        game.bet = 0;
        player.chips = 100;
        player.seat();
        game.bet = 10;
        player.bet = 10;
        player.action();
        player.check();
        expect(player.last_action).toEqual('Check');
        player.reinit();
        player.seat();
        player.action();
        player.fold();
        expect(player.last_action).toEqual('Fold');
    });

    it('should forget last action when action is on player', () => {
        const player = new Player(game);
        game.bet = 0;
        player.chips = 100;
        player.seat();
        player.action();
        game.bet = 10;
        player.call();
        player.action();
        expect(player.last_action).toBeNull();
        player.reinit();
        game.bet = 0;
        player.chips = 100;
        player.seat();
        player.action();
        player.raise(20);
        player.action();
        expect(player.last_action).toBeNull();
        player.reinit();
        game.bet = 0;
        player.chips = 100;
        player.seat();
        game.bet = 10;
        player.bet = 10;
        player.action();
        player.check();
        player.action();
        expect(player.last_action).toBeNull();
        player.reinit();
        player.seat();
        player.action();
        player.fold();
        player.next();
        player.action();
        expect(player.last_action).toBeNull();
    });

    it('should reset current hand data when new hand is played', () => {
        const player = new Player(game);
        game.bet = 0;
        player.chips = 100;
        player.seat();
        player.action();
        game.bet = 10;
        player.call();
        player.action();
        player.fold();
        player.next();
        expect(player.bet).toEqual(0);
        expect(player.bb).toBe(false);
        expect(player.last_action).toBeNull();
    });
});

describe('state', () => {
    jest.spyOn(Game.prototype, 'validate').mockImplementation(() => {}); //don't validate gamemodes, for cleaner testing
    afterAll(() => {
        jest.restoreAllMocks();
    });
    const game = new Game();
    game.ante = 5;
    game.small_blind = 10;
    game.big_blind = 20;

    it('should initialise with `Seating` state', () => {
        const player = new Player(game);
        expect(player.state).toEqual('Seating');
    });

    it('should transition to `Idle` state when seated', () => {
        const player = new Player(game);
        player.seat();
        expect(player.state).toEqual('Idle');
    });

    it('should remain at `Idle` state if player has enough chips for Ante/Blind', () => {
        const player = new Player(game);
        game.bet = 0;
        player.chips = 100;
        player.seat();
        player.charge_ante();
        expect(player.state).toEqual('Idle');
        player.reinit();
        game.bet = 0;
        player.chips = 100;
        player.seat();
        player.charge_small_blind();
        expect(player.state).toEqual('Idle');
        player.reinit();
        game.bet = 0;
        player.chips = 100;
        player.seat();
        player.charge_big_blind();
        expect(player.state).toEqual('Idle');
    });

    it('should transition to `All-in` state if player has chips <= Ante/Blind', () => {
        const player = new Player(game);
        game.bet = 0;
        player.chips = 5;
        player.seat();
        player.charge_ante();
        expect(player.state).toEqual('All-in');
        player.reinit();
        game.bet = 0;
        player.chips = 5;
        player.seat();
        player.charge_small_blind();
        expect(player.state).toEqual('All-in');
        player.reinit();
        game.bet = 0;
        player.chips = 5;
        player.seat();
        player.charge_big_blind();
        expect(player.state).toEqual('All-in');
    });

    it('should transition to `Action` state when action is on player', () => {
        const player = new Player(game);
        player.seat();
        player.action();
        expect(player.state).toEqual('Action');
    });

    it('should remain at `Action` state if action is invalid', () => {
        const player = new Player(game);
        game.bet = 0;
        player.chips = 100;
        player.seat();
        game.bet = 10;
        player.action();
        player.check();
        expect(player.state).toEqual('Action');
        player.reinit();
        player.seat();
        player.charge_big_blind();
        player.action();
        player.fold();
        expect(player.state).toEqual('Action');
    });

    it('should transition to `Idle` state if action is valid', () => {
        const player = new Player(game);
        game.bet = 0;
        player.chips = 100;
        player.seat();
        player.action();
        game.bet = 10;
        player.call();
        expect(player.state).toEqual('Idle');
        player.reinit();
        game.bet = 0;
        player.chips = 100;
        player.seat();
        player.action();
        player.raise(20);
        expect(player.state).toEqual('Idle');
        player.reinit();
        game.bet = 0;
        player.chips = 100;
        player.seat();
        game.bet = 10;
        player.bet = 10;
        player.action();
        player.check();
        expect(player.state).toEqual('Idle');
    });

    it('should transition to `Out` state if player folds', () => {
        const player = new Player(game);
        player.seat();
        player.action();
        player.fold();
        expect(player.state).toEqual('Out');
    });

    it('should transition to `All-in` state if call/raise spends all chips', () => {
        const player = new Player(game);
        game.bet = 0;
        player.chips = 100;
        player.seat();
        player.action();
        game.bet = 100;
        player.call();
        expect(player.state).toEqual('All-in');
        player.reinit();
        game.bet = 0;
        player.chips = 100;
        player.seat();
        player.action();
        game.bet = 200;
        player.call();
        expect(player.state).toEqual('All-in');
        player.reinit();
        game.bet = 0;
        player.chips = 100;
        player.seat();
        player.action();
        game.bet = 20;
        player.raise(100);
        expect(player.state).toEqual('All-in');
    });

    it('should transition to `Win` state if player wins showdown', () => {
        const player = new Player(game);
        game.bet = 0;
        player.chips = 100;
        player.seat();
        player.action();
        game.bet = 20;
        player.raise(100);
        player.win();
        expect(player.state).toEqual('Win');
    });

    it('should transition to `Lose` state if player loses showdown with sufficient chips for BB', () => {
        const player = new Player(game);
        game.bet = 0;
        player.chips = 100;
        player.seat();
        player.action();
        game.bet = 20;
        player.call();
        player.allin(); //Forced, to mock game logic
        player.lose();
        expect(player.state).toEqual('Lose');
    });

    it('should transition to `Re-buy` state if player loses showdown with insufficient chips for BB', () => {
        const player = new Player(game);
        game.bet = 0;
        player.chips = 100;
        player.seat();
        player.action();
        game.bet = 20;
        player.raise(100);
        player.lose();
        expect(player.state).toEqual('Re-buy');
    });

    it('should transition to `Lose` state if player chooses to rebuy', () => {
        const player = new Player(game);
        game.bet = 0;
        player.chips = 100;
        player.seat();
        player.action();
        game.bet = 20;
        player.raise(100);
        player.lose();
        player.rebuy();
        expect(player.state).toEqual('Lose');
    });

    it('should transition to `Win` state from `Idle` if player wins showdown', () => {
        const player = new Player(game);
        player.seat();
        player.win();
        expect(player.state).toEqual('Win');
    });

    it('should transition to `Lose` state from `Idle` if player loses showdown', () => {
        const player = new Player(game);
        player.seat();
        player.lose();
        expect(player.state).toEqual('Lose');
    });

    it('should transition to `Idle` state when new hand starts if player has folded', () => {
        const player = new Player(game);
        player.seat();
        player.action();
        player.fold();
        player.next();
        expect(player.state).toEqual('Idle');
    });

    it('should transition to `Idle` state when new hand starts if player wins showdown', () => {
        const player = new Player(game);
        player.seat();
        player.win();
        player.next();
        expect(player.state).toEqual('Idle');
    });

    it('should transition to `Idle` state when new hand starts if player loses showdown', () => {
        const player = new Player(game);
        player.seat();
        player.lose();
        player.next();
        expect(player.state).toEqual('Idle');
    });

    it('should transition to `Quit` state if chosen from `Idle`, `Re-buy` or `Out`', () => {
        const player = new Player(game);
        game.bet = 0;
        player.chips = 100;
        player.seat();
        player.action();
        game.bet = 20;
        player.raise(100);
        player.lose();
        player.quit();
        expect(player.state).toEqual('Quit');
        player.reinit();
        player.seat();
        player.quit();
        expect(player.state).toEqual('Quit');
        player.reinit()
        player.seat();
        player.action();
        player.fold();
        player.quit();
        expect(player.state).toEqual('Quit');
    });
});