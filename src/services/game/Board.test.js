'use strict';

import { Board } from './Board';

const board = new Board();

it('should only accept the right amount of cards on each street', () => {
    // PREFLOP
    expect(() => {
        board.reset();
        board.deal([1, 2]);
    }).toThrow('invalid number of cards');
    expect(() => {
        board.reset();
        board.deal([1, 2, 3, 4]);
    }).toThrow('invalid number of cards');
    // FLOP
    expect(() => {
        board.reset();
        board.deal([1, 2, 3]); // valid, progresses to flop
        board.deal([]);
    }).toThrow('invalid number of cards');
    expect(() => {
        board.reset();
        board.deal([1, 2, 3]); // valid, progresses to flop
        board.deal([1, 2]);
    }).toThrow('invalid number of cards');
    // TURN
    expect(() => {
        board.reset();
        board.deal([1, 2, 3]); // valid, progresses to flop
        board.deal([1]); // valid, progresses to turn
        board.deal([]);
    }).toThrow('invalid number of cards');
    expect(() => {
        board.reset();
        board.deal([1, 2, 3]); // valid, progresses to flop
        board.deal([1]); // valid, progresses to turn
        board.deal([1, 2]);
    }).toThrow('invalid number of cards');
    // RIVER
    expect(() => {
        board.reset();
        board.deal([1, 2, 3]); // valid, progresses to flop
        board.deal([1]); // valid, progresses to turn
        board.deal([1]); // valid, progresses to river
        board.deal(['anything']);
    }).toThrow('no more cards');
});