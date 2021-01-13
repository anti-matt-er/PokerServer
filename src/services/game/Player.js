'use strict';

import { Card } from './Card';
import { Game } from './Game';
const StateMachine = require('javascript-state-machine');

class Player extends StateMachine {
    constructor(game) {
        if (!(game instanceof Game)) {
            throw 'Error: A Game object must be provided';
        }
        super({
            init: 'Seating',
            transitions: [
                { name: 'seat', from: 'Seating', to: 'Idle' },
                { name: 'action', from: 'Idle', to: 'Action' },
                { name: 'act', from: 'Action', to: 'Idle' },
                { name: 'out', from: 'Action', to: 'Out' },
                { name: 'allin', from: ['Idle', 'Action'], to: 'All-in' },
                { name: 'win', from: ['Idle', 'All-in'], to: 'Idle' },
                { name: 'lose', from: 'All-in', to: 'Re-buy' },
                { name: 'next', from: 'Out', to: 'Idle' },
                { name: 'rebuy', from: 'Re-buy', to: 'Idle' },
                { name: 'quit', from: ['Idle', 'Out', 'Re-buy'], to: 'Quit' },
                { name: 'reinit', from: '*', to: 'Seating' }
            ],
            methods: {
                onAction: () => {
                    this.last_action = null;
                },
                onReinit: () => {
                    this.reset();
                }
            }
        });
        this.game = game;
        this.chips = 0;
        this.reset();
    }

    reset() {
        this.hand = [];
        this.bet = 0;
        this.bb = false;
        this.last_action = null;
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

    charge(amount) {
        this.bet += Math.min(amount, this.chips);
        this.chips -= amount;
        
        if (this.chips <= 0) {
            this.chips = 0;
            this.allin();
        }
    }

    charge_ante() {
        this.charge(this.game.ante);
    }

    charge_small_blind() {
        this.charge(this.game.small_blind);
    }

    charge_big_blind() {
        this.charge(this.game.big_blind);
        this.bb = true;
    }

    act_if_possible() {
        if (this.can('act')) {
            this.act();
        }
    }

    call() {
        if (this.can('act')) {
            this.charge(this.game.bet);
            this.last_action = 'Call';
            this.act_if_possible();
        }
    }

    raise(amount) {
        if (this.can('act')) {
            this.charge(amount);
            this.last_action = 'Raise';
            this.act_if_possible();
        }
    }

    check() {
        if (this.can('act')) {
            if (this.game.bet === this.bet) {
                this.last_action = 'Check';
                this.act();
            }
        }
    }

    fold() {
        if (this.can('out')) {
            if (!this.bb) {
                this.last_action = 'Fold';
                this.out();
            }
        }
    }
}
exports.Player = Player;
