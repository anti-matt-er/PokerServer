'use strict';

import { Player } from './Player';
import { Card } from './Card';

const card_KH = new Card('KH');
const card_AS = new Card('AS');
const card_TD = new Card('TD');

it('should reset correctly', () => {
    const player = new Player();
    player.hand = [card_KH, card_AS];
    player.reset();
    expect(player.hand).toEqual([]);
});

it('should accept exactly 2 dealt cards', () => {
    const player = new Player();

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
    const player = new Player();

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