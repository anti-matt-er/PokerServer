'use strict';

import { Card } from './Card';

it('should allow only valid suits', () => {
    expect(() => {
        new Card('A', 'X'); //an ace of invalid suit "X"
    }).toThrow('valid suit');

    expect(() => {
        new Card('A', 'S'); //a valid ace of spades
    }).not.toThrow();
});

it('should allow only valid ranks', () => {
    expect(() => {
        new Card('X', 'S'); //an invalid rank "X" of spades
    }).toThrow('valid rank');

    expect(() => {
        new Card('A', 'S'); //a valid ace of spades
    }).not.toThrow();
});

it('should allow "10" as a valid rank, converting to "T"', () => {
    var card_TD;

    expect(() => {
        card_TD = new Card('10', 'D'); //a ten of diamonds, with undesired notation
    }).not.toThrow();
    
    expect(card_TD.rank).toEqual('T');
});