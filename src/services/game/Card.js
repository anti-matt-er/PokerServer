'use strict';

class Card {
    constructor(rank, suit) {
        this.valid_ranks = [
            '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'
        ];
        this.valid_suits = [
            'C', 'S', 'H', 'D'
        ];
        this.rank = rank.toUpperCase();
        this.suit = suit.toUpperCase();
        this.ten_to_t();
        this.validate();
    }

    ten_to_t() {
        if (this.rank === '10') {
            this.rank = 'T';
        }
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
        return this.valid_ranks.indexOf(this.rank) + 1;
    }

    get v() {
        return this.value;
    }
}
exports.Card = Card;