'use strict';

import { Definitions } from './Card_Definitions';
import { Card } from './Card';

class Deck {
    constructor() {
        this.cards = [];
    }

    reset() {
        Definitions.valid_ranks.forEach(rank => {
            Definitions.valid_suits.forEach(suit => {
                var card = new Card(rank, suit);
                this.cards.push({id: card.id, card: card});
            });
        });
    }

    bad_shuffle() {
        this.cards.sort(() => .5 - Math.random()); // BIASED, FOR TESTING
    }
}
exports.Deck = Deck;