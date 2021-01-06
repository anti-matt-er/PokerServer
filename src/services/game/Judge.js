'use strict';

import { Rankings, Weights } from './Hand_Rankings';
import { Definitions } from './Card_Definitions';
import { Card } from './Card';
import { array } from 'joi';

class Judge {
    static assess(hand) {
        let ranking = '';
        let cards = hand.player_hand.concat(hand.board);
        let flush = this.get_flush(cards);
        if (flush) {
            ranking = 'FL';
        }
        return { ranking: ranking };
    }

    static sort(cards) {
        return cards.sort((a, b) => {
            return (
                Definitions.ranks[a.rank].value -
                Definitions.ranks[b.rank].value
            );
        });
    }

    static get_flush(cards) {
        let suit_count = {};
        let flush_suit = false;
        cards.some((card) => {
            if (card.suit in suit_count) {
                suit_count[card.suit] += 1;
            }
            else {
                suit_count[card.suit] = 1;
            }
            if (suit_count[card.suit] >= 5) {
                flush_suit = card.suit;
                return;
            }
        });
        return flush_suit;
    }
}
exports.Judge = Judge;
