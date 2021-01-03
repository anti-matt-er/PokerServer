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

it('should return correct values for cards', () => {
    var card_2C = new Card('2', 'C');
    var card_4D = new Card('4', 'D');
    var card_TD = new Card('T', 'D');
    var card_KH = new Card('K', 'H');
    var card_AS = new Card('A', 'S');

    expect(card_2C.value).toEqual(1);
    expect(card_4D.value).toEqual(3);
    expect(card_TD.value).toEqual(9);
    expect(card_KH.value).toEqual(12);
    expect(card_AS.value).toEqual(13);
});

it('should allow .v as an allias of .value', () => {
    var card = new Card('A', 'S');
    expect(card.v).toBeDefined();
    expect(card.v).toEqual(card.value);
});