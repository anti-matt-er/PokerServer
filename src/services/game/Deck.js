'use strict';

import { Definitions } from './Card_Definitions';
import { Card } from './Card';

class Deck {
    constructor() {
        this.reset();
    }

    reset() {
        this.cards = [];
        Definitions.valid_ranks.forEach(rank => {
            Definitions.valid_suits.forEach(suit => {
                const card = new Card(rank, suit);
                this.cards.push({id: card.id, card: card});
            });
        });
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    bad_shuffle() {
        this.cards.sort(() => .5 - Math.random()); // BIASED, FOR TESTING
    }
}
exports.Deck = Deck;