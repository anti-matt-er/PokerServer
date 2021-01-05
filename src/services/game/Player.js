'use strict';

import { Card } from './Card';

class Player {
    constructor() {
        this.reset();
    }

    reset() {
        this.hand = [];
    }

    deal(cards) {
        if (!Array.isArray(cards)) {
            throw 'Error: `cards` must be an array!';
        }
        const invalid_hand_error = 'Error: `cards` must contain exactly 2 cards!';
        if (cards.length !== 2) {
            throw invalid_hand_error;
        }
        cards.forEach(card => {
            if (!(card instanceof Card)) {
                throw invalid_hand_error;
            }
        });
        this.hand = cards;
    }
}
exports.Player = Player;