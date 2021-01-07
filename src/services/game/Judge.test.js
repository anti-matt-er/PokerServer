'use strict';

import { Judge } from './Judge';
import { Card } from './Card';

describe('functions', () => {
    it('should sort cards by ascending value', () => {
        const cards = Card.set([
            'TC', '4D', '9H', 'AS', '9C', '3D', 'JH'
        ]);
        let sorted_cards = Judge.sort(cards);
        expect(sorted_cards[0].rank).toEqual('3');
        expect(sorted_cards[1].rank).toEqual('4');
        expect(sorted_cards[2].rank).toEqual('9');
        expect(sorted_cards[3].rank).toEqual('9');
        expect(sorted_cards[4].rank).toEqual('T');
        expect(sorted_cards[5].rank).toEqual('J');
        expect(sorted_cards[6].rank).toEqual('A');
    });
});

describe('identify hands', () => {
    it('should identify Royal Flush', () => {
        const cards = {
            player_hand: Card.set(['AS', 'JS']),
            board: Card.set([
                'TS','QS','KS','2C','2D'
            ])
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('RF');
    });

    it('should identify Straight Flush', () => {
        const cards = {
            player_hand: Card.set(['5S', '9S']),
            board: Card.set([
                '6S', '7S', '8S', '2C', '2D'
            ])
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('SF');
    });

    it('should identify Four of a Kind', () => {
        const cards = {
            player_hand: Card.set(['TC', 'TD']),
            board: Card.set([
                'TH', 'TS', '2C', '2D', '2H'
            ])
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('4K');
    });

    it('should identify Full House', () => {
        const cards = {
            player_hand: Card.set(['KC', 'KD']),
            board: Card.set([
                'AC', 'AD', 'AH', '2C', '3C'
            ])
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('FH');
    });

    it('should identify Flush', () => {
        const cards = {
            player_hand: Card.set(['AS', '2S']),
            board: Card.set([
                '4S', '6S', '8S', 'TC', '2D'
            ])
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('FL');
    });

    it('should identify Straight', () => {
        const cards = {
            player_hand: Card.set(['5C', '6D']),
            board: Card.set([
                '7H', '8S', '9C', '2C', '2D'
            ])
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('ST');
    });

    it('should identify ace-low Straight', () => {
        const cards = {
            player_hand: Card.set(['5C', 'AD']),
            board: Card.set([
                '2H', '3S', '4C', 'TC', 'TD'
            ])
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('ST');
    });

    it('should identify Three of a Kind', () => {
        const cards = {
            player_hand: Card.set(['AC', 'AD']),
            board: Card.set([
                'AH', '2C', '4D', '6H', '8S'
            ])
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('3K');
    });

    it('should identify Two Pair', () => {
        const cards = {
            player_hand: Card.set(['AC', 'AD']),
            board: Card.set([
                'KC', 'KD', '2C', '4D', '6H'
            ])
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('2P');
    });

    it('should identify Pair', () => {
        const cards = {
            player_hand: Card.set(['AC', 'AD']),
            board: Card.set([
                '2H', '4S', '6C', '8D', 'TH'
            ])
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('PA');
    });

    it('should identify High Card', () => {
        const cards = {
            player_hand: Card.set(['AC', 'JD']),
            board: Card.set([
                '2H', '4S', '6C', '8D', 'TH'
            ])
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('HC');
    });
});
