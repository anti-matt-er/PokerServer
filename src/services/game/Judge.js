'use strict';

import { Rankings, Weights } from './Hand_Rankings';
import { Definitions } from './Card_Definitions';

class Judge {
    static assess(hand) {
        let cards = hand.player_hand.concat(hand.board);
        cards = this.sort(cards);
        let flush = this.get_flush(cards);
        let straight = this.get_straight(cards);
        let ace_low_straight = false;
        if (!straight) {
            ace_low_straight = this.get_straight(cards, true);
            straight = ace_low_straight;
        }
        let kinds = this.get_kinds(cards);
        let best_hand = this.get_best_hand(cards, flush, straight, kinds);
        return this.identify_hand(best_hand, flush, straight, kinds);
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
        let straight = [];
        let last_value = null;
        let largest_straight = [];
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
                    straight.push(card);
                } else if (value !== last_value) {
                    straight = [card];
                    if (straight.length >= largest_straight.length) {
                        largest_straight = straight;
                    }
                }
            } else {
                straight = [card];
                largest_straight = straight;
            }
            last_value = value;
        }
        if (straight.length >= largest_straight.length) {
            largest_straight = straight;
        }
        straight = largest_straight;
        if (straight.length >= 5) {
            return straight;
        }
        return false;
    }

    static get_kinds(cards) {
        let rank_sets = {};
        for (let card of cards) {
            if (!(card.rank in rank_sets)) {
                rank_sets[card.rank] = [];
            }
            rank_sets[card.rank].push(card);
        }
        rank_sets = Object.values(rank_sets);
        rank_sets = rank_sets.filter((set) => set.length !== 1);
        if (rank_sets.length === 0) {
            return false;
        }
        rank_sets.sort((a, b) => {
            if (a.length === b.length) {
                return b[0].value - a[0].value;
            }
            return b.length - a.length;
        });
        if (rank_sets.length === 1) {
            rank_sets[1] = [];
        }
        if (rank_sets.length === 2) {
            return rank_sets;
        }
        return rank_sets.slice(-2);
    }

    static get_best_hand(cards, flush, straight, kinds) {
        let best_hand = [];
        if (flush) {
            for (let card of cards) {
                if (card.rank === flush) {
                    best_hand.push(card);
                }
            }
            if (straight) {
                let straight_flush = this.get_straight(best_hand);
                if (straight_flush) {
                    straight = straight_flush;
                }
            }
        }
        if (straight) {
            best_hand = straight;
        }
        if (!(straight && flush) && kinds) {
            let best_kinds = [];
            for (let set of kinds) {
                best_kinds = best_kinds.concat(set);
            }
            best_kinds = this.sort(best_kinds);
            if (best_kinds.length >= 4 || !(straight || flush)) {
                best_hand = best_kinds;
            }
        }
        if (best_hand.length === 5) {
            return best_hand;
        }
        if (best_hand.length < 5) {
            let remaining_cards = cards.filter((card) => !(card in best_hand));
            best_hand = remaining_cards.concat(best_hand);
        }
        return best_hand.slice(-5);
    }

    static identify_hand(hand, flush, straight, kinds) {
        let rankings = Object.keys(Rankings);
        let result = {
            ranking: '',
            ranking_name: '',
            score: 0
        };
        for (let ranking of rankings) {
            let criteria = Rankings[ranking];
            if (criteria.flush && !flush) {
                continue;
            }
            if (criteria.straight && !straight) {
                continue;
            }
            if (criteria.flush && criteria.straight && !(straight && flush)) {
                continue;
            }
            if (
                criteria.min_rank &&
                Definitions.ranks[criteria.min_rank].value > hand[0].value
            ) {
                continue;
            }
            if (
                criteria.matches &&
                (!kinds ||
                    kinds[0].length < criteria.matches[0] ||
                    kinds[1].length < criteria.matches[1])
            ) {
                continue;
            }
            result.ranking = ranking;
            result.ranking_name = criteria.name;
            result.score = criteria.score;
            break;
        }
        return result;
    }
}
exports.Judge = Judge;
