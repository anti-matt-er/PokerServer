'use strict';

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
        switch (this.street) {
            case this.streets.preflop:
                this.cards.flop = cards;
                this.street = this.streets.flop;
                break;
            case this.streets.flop:
                this.cards.turn = cards;
                this.street = this.streets.turn;
                break;
            case this.streets.turn:
                this.cards.river = cards;
                this.street = this.streets.river;
                break;
        }
    }
}
exports.Board = Board;