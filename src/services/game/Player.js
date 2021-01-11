'use strict';

import { Card } from './Card';
import { Game } from './Game';
const StateMachine = require('javascript-state-machine');

class Player extends StateMachine {
    constructor(game) {
        super({
            init: 'Seating'
        });
        if (!(game instanceof Game)) {
            throw 'Error: A Game object must be provided';
        }
        this.reset();
    }

    reset() {
        this.hand = [];
    }

    deal(cards) {
        if (this.hand.length !== 0) {
            throw 'Error: Player already has a hand!';
        }
        if (!Array.isArray(cards)) {
            throw 'Error: `cards` must be an array!';
        }
        const invalid_hand_error =
            'Error: `cards` must contain exactly 2 cards!';
        if (cards.length !== 2) {
            throw invalid_hand_error;
        }
        cards.forEach((card) => {
            if (!(card instanceof Card)) {
                throw invalid_hand_error;
            }
        });
        this.hand = cards;
    }
}
exports.Player = Player;
