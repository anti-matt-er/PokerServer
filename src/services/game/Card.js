'use strict';

class Card {
    constructor(rank, suit) {
        this.valid_ranks = [
            'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'
        ];
        this.valid_suits = [
            'C', 'S', 'H', 'D'
        ];
        this.rank = rank;
        this.suit = suit;
        this.validate();
    }

    validate() {
        this.checkRank();
        this.checkSuit();
    }

    checkRank() {
        if (!this.valid_ranks.includes(this.rank)) {
            throw 'Error constructing card: "' + this.rank + '" is an invalid rank!'
        }
    }

    checkSuit() {
        if (!this.valid_suits.includes(this.suit)) {
            throw 'Error constructing card: "' + this.suit + '" is an invalid suit!'
        }
    }

    get value() {

    }
}
exports.Card = Card;