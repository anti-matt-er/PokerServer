'use strict';

import { Definitions } from './Card_Definitions';
import { Card } from './Card';

class Deck {
    constructor() {
        this.cards = {};
    }

    reset() {
        Definitions.valid_ranks.forEach(rank => {
            Definitions.valid_suits.forEach(suit => {
                var card = new Card(rank, suit);
                this.cards[card.id] = card;
            });
        });
    }
}
exports.Deck = Deck;