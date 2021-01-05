'use strict';

import { Definitions } from './Card_Definitions';
import { Card } from './Card';
import { Board } from './Board';
import { Player } from './Player';

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

    deal_cards(count) {
        let cards = [];
        for (let i = 0; i < count; i++) {
            cards.push(this.cards.pop().card);
        }
        return cards;
    }

    deal(to) {
        if (to instanceof Player) {
            to.hand = this.deal_cards(2);
        }
        else if (to instanceof Board) {
            switch (to.street) {
                case to.streets.preflop:
                    to.deal(this.deal_cards(3));
                    break;
                case to.streets.flop:
                    to.deal(this.deal_cards(1));
                    break;
                case to.streets.turn:
                    to.deal(this.deal_cards(1));
                    break;
            }
        }
        else {
            throw 'Error: Provided object is not instance of Player or Board!';
        }
    }
}
exports.Deck = Deck;