'use strict';

import { Rankings, Weights } from './Hand_Rankings';
import { Definitions } from './Card_Definitions';
import { Card } from './Card';
import { array } from 'joi';

class Judge {
    static assess(hand) {
        let ranking = '';
        let cards = hand.player_hand.concat(hand.board);
        cards = this.sort(cards);
        let flush = this.get_flush(cards);
        let straight = this.get_straight(cards);
        let ace_low_straight = false;
        if (!straight) {
            ace_low_straight = this.get_straight(cards, true);
            straight = ace_low_straight;
        }
        if (flush) {
            ranking = 'FL';
            if (straight) {
                ranking = 'SF';
            }
        } else if (straight) {
            ranking = 'ST';
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
        for (let card of cards) {
            if (card.suit in suit_count) {
                suit_count[card.suit] += 1;
            } else {
                suit_count[card.suit] = 1;
            }
            if (suit_count[card.suit] >= 5) {
                flush_suit = card.suit;
                break;
            }
        }
        return flush_suit;
    }

    static get_straight(cards, ace_low = false) {
        let straight_run = 1;
        let last_value = null;
        if (ace_low) {
            let aces = cards.filter((card) => card.rank === 'A');
            let rest = cards.filter((card) => card.rank !== 'A');
            cards = aces.concat(rest);
        }
        for (let card of cards) {
            let value = card.value;
            if (ace_low && card.rank === 'A') {
                value = 0;
            }
            if (last_value !== null) {
                if (value === last_value + 1) {
                    straight_run += 1;
                    if (straight_run >= 5) {
                        break;
                    }
                } else if (value !== last_value) {
                    straight_run = 1;
                }
            }
            last_value = value;
        }
        return straight_run >= 5;
    }
}
exports.Judge = Judge;
