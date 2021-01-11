'use strict';

import { Player } from './Player';
import { Card } from './Card';
import { Game } from './Game';

describe('hand', () => {
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
});

describe('state', () => {
    it('should initialise with `Seating` state', () => {
        const player = new Player(game);
        expect(player.is('Seating')).toBe(true);
    });

    it('should transition to `Idle` state when seated', () => {
        const player = new Player(game);
        player.seat();
        expect(player.is('Idle')).toBe(true);
    });

    it('should remain at `Idle` state if player has enough chips for Ante/Blind', () => {
        let player = new Player(game);
        player.chips = 100;
        player.seat();
        player.charge_ante();
        expect(player.is('Idle')).toBe(true);
        player = new Player(game);
        player.chips = 100;
        player.seat();
        player.charge_small_blind();
        expect(player.is('Idle')).toBe(true);
        player = new Player(game);
        player.chips = 100;
        player.seat();
        player.charge_big_blind();
        expect(player.is('Idle')).toBe(true);
    });

    it('should transition to `All-in` state if player has chips <= Ante/Blind', () => {
        let player = new Player(game);
        player.chips = 5;
        player.seat();
        player.charge_ante();
        expect(player.is('All-in')).toBe(true);
        player.quit();
        player = new Player(game);
        player.chips = 5;
        player.seat();
        player.charge_small_blind();
        expect(player.is('All-in')).toBe(true);
        player.quit();
        player = new Player(game);
        player.chips = 5;
        player.seat();
        player.charge_big_blind();
        expect(player.is('All-in')).toBe(true);
    });

    it('should transition to `Action` state when action is on player', () => {
        const player = new Player(game);
        player.seat();
        player.action();
        expect(player.is('Action')).toBe(true);
    });

    it('should remain at `Action` state if action is invalid', () => {
        const player = new Player(game);
        player.seat();
        player.action();
        player.check();
    });
});