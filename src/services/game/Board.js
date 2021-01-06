'use strict';

import { Card } from './Card';

class Board {
    constructor() {
        this.streets = Object.freeze({
            preflop: 0,
            flop: 1,
            turn: 2,
            river: 3
        });
        this.reset();
    }

    reset() {
        this.street = this.streets.preflop;
        this.cards = {
            flop: [],
            turn: [],
            river: []
        };
    }

    deal(cards) {
        if (!Array.isArray(cards)) {
            throw 'Error: `cards` must be an array!';
        }
        cards.forEach((card) => {
            if (!(card instanceof Card)) {
                throw 'Error: `cards` should only contain Card instances!';
            }
        });
        switch (this.street) {
            case this.streets.preflop:
                if (cards.length !== 3) {
                    throw (
                        'Error: Received invalid number of cards for Preflop, expected 3 got ' +
                        cards.length
                    );
                }
                this.cards.flop = cards;
                this.street = this.streets.flop;
                break;
            case this.streets.flop:
                if (cards.length !== 1) {
                    throw (
                        'Error: Received invalid number of cards for Flop, expected 1 got ' +
                        cards.length
                    );
                }
                this.cards.turn = cards;
                this.street = this.streets.turn;
                break;
            case this.streets.turn:
                if (cards.length !== 1) {
                    throw (
                        'Error: Received invalid number of cards for Turn, expected 1 got ' +
                        cards.length
                    );
                }
                this.cards.river = cards;
                this.street = this.streets.river;
                break;
            case this.streets.river:
                throw 'Error: Board is at River and can accept no more cards!';
        }
    }
}
exports.Board = Board;
