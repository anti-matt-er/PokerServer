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
    let card_TD;

    expect(() => {
        card_TD = new Card('10', 'D'); //a ten of diamonds, with undesired notation
    }).not.toThrow();

    expect(card_TD.rank).toEqual('T');
});

it('should return correct values for cards', () => {
    const card_2C = new Card('2', 'C');
    const card_4D = new Card('4', 'D');
    const card_TD = new Card('T', 'D');
    const card_KH = new Card('K', 'H');
    const card_AS = new Card('A', 'S');

    expect(card_2C.value).toEqual(1);
    expect(card_4D.value).toEqual(3);
    expect(card_TD.value).toEqual(9);
    expect(card_KH.value).toEqual(12);
    expect(card_AS.value).toEqual(13);
});

it('should allow .v as an allias of .value', () => {
    const card = new Card('A', 'S');
    expect(card.v).toBeDefined();
    expect(card.v).toEqual(card.value);
});

it('should allow lowercase and convert', () => {
    let card_2C;
    let card_2S;
    let card_2H;
    let card_2D;
    let card_AS;
    let card_TS;

    expect(() => {
        card_2C = new Card('2', 'c');
        card_2S = new Card('2', 's');
        card_2H = new Card('2', 'h');
        card_2D = new Card('2', 'd');
        card_AS = new Card('a', 'S');
        card_TS = new Card('t', 'S');
    }).not.toThrow();

    expect(card_2C.suit).toEqual('C');
    expect(card_2S.suit).toEqual('S');
    expect(card_2H.suit).toEqual('H');
    expect(card_2D.suit).toEqual('D');

    expect(card_AS.rank).toEqual('A');
    expect(card_TS.rank).toEqual('T');
});

it('should print out the id of cards on demand', () => {
    const card_2C = new Card('2', 'C');
    const card_4D = new Card('4', 'D');
    const card_TD = new Card('T', 'D');
    const card_KH = new Card('K', 'H');
    const card_AS = new Card('A', 'S');

    expect(card_2C.id).toEqual('2C');
    expect(card_4D.id).toEqual('4D');
    expect(card_TD.id).toEqual('TD');
    expect(card_KH.id).toEqual('KH');
    expect(card_AS.id).toEqual('AS');
});

it('should print out the full name of cards on demand', () => {
    const card_2C = new Card('2', 'C');
    const card_4D = new Card('4', 'D');
    const card_TD = new Card('T', 'D');
    const card_KH = new Card('K', 'H');
    const card_AS = new Card('A', 'S');

    expect(card_2C.name).toEqual('2 of Clubs');
    expect(card_4D.name).toEqual('4 of Diamonds');
    expect(card_TD.name).toEqual('10 of Diamonds');
    expect(card_KH.name).toEqual('King of Hearts');
    expect(card_AS.name).toEqual('Ace of Spades');
});

it('should print out the verbose name of cards on demand', () => {
    const card_2C = new Card('2', 'C');
    const card_4D = new Card('4', 'D');
    const card_TD = new Card('T', 'D');
    const card_KH = new Card('K', 'H');
    const card_AS = new Card('A', 'S');

    expect(card_2C.name_verbose).toEqual('Two of Clubs');
    expect(card_4D.name_verbose).toEqual('Four of Diamonds');
    expect(card_TD.name_verbose).toEqual('Ten of Diamonds');
    expect(card_KH.name_verbose).toEqual('King of Hearts');
    expect(card_AS.name_verbose).toEqual('Ace of Spades');
});
