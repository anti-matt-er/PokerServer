'use strict';

import { Definitions } from './Card_Definitions';

class Card {
    constructor(rank, suit) {
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
        if (!Definitions.valid_ranks.includes(this.rank)) {
            throw 'Error constructing card: "' + this.rank + '" is not a valid rank!'
        }
    }

    checkSuit() {
        if (!Definitions.valid_suits.includes(this.suit)) {
            throw 'Error constructing card: "' + this.suit + '" is not a valid suit!'
        }
    }

    get value() {
        return Definitions.ranks[this.rank].value;
    }

    get v() {
        return this.value;
    }

    get id() {
        return this.rank + this.suit;
    }

    get name() {
        return Definitions.ranks[this.rank].name + ' of ' + Definitions.suits[this.suit].name;
    }

    get name_verbose() {
        return Definitions.ranks[this.rank].name_long + ' of ' + Definitions.suits[this.suit].name;
    }
}
exports.Card = Card;