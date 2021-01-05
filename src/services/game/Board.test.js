'use strict';

import { Board } from './Board';
import { Card } from './Card';

const board = new Board();

it('should only accept the right amount of cards on each street', () => {
    const card_4D = new Card('4', 'D');
    const card_TD = new Card('T', 'D');
    const card_KH = new Card('K', 'H');
    const card_AS = new Card('A', 'S');
    const zero_cards = [];
    const one_card = [card_4D];
    const two_cards = [card_4D, card_TD];
    const three_cards = [card_4D, card_TD, card_KH];
    const four_cards = [card_4D, card_TD, card_KH, card_AS]

    // PREFLOP
    expect(() => {
        board.reset();
        board.deal(two_cards);
    }).toThrow('invalid number of cards');
    expect(() => {
        board.reset();
        board.deal(four_cards);
    }).toThrow('invalid number of cards');
    // FLOP
    expect(() => {
        board.reset();
        board.deal(three_cards); // valid, progresses to flop
        board.deal(zero_cards);
    }).toThrow('invalid number of cards');
    expect(() => {
        board.reset();
        board.deal(three_cards); // valid, progresses to flop
        board.deal(two_cards);
    }).toThrow('invalid number of cards');
    // TURN
    expect(() => {
        board.reset();
        board.deal(three_cards); // valid, progresses to flop
        board.deal(one_card); // valid, progresses to turn
        board.deal(zero_cards);
    }).toThrow('invalid number of cards');
    expect(() => {
        board.reset();
        board.deal(three_cards); // valid, progresses to flop
        board.deal(one_card); // valid, progresses to turn
        board.deal(two_cards);
    }).toThrow('invalid number of cards');
    // RIVER
    expect(() => {
        board.reset();
        board.deal(three_cards); // valid, progresses to flop
        board.deal(one_card); // valid, progresses to turn
        board.deal(one_card); // valid, progresses to river
        board.deal(['anything']);
    }).toThrow('no more cards');
});