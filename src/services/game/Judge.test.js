'use strict';

import { Judge } from './Judge';
import { Card } from './Card';

describe('functions', () => {
    it('should sort cards by ascending value', () => {
        const cards = [
            new Card('T', 'C'),
            new Card('4', 'D'),
            new Card('9', 'H'),
            new Card('A', 'S'),
            new Card('9', 'C'),
            new Card('3', 'D'),
            new Card('J', 'H')
        ];
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
            player_hand: [new Card('A', 'S'), new Card('J', 'S')],
            board: [
                new Card('T', 'S'),
                new Card('Q', 'S'),
                new Card('K', 'S'),
                new Card('2', 'C'),
                new Card('2', 'D')
            ]
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('RF');
    });

    it('should identify Straight Flush', () => {
        const cards = {
            player_hand: [new Card('5', 'S'), new Card('9', 'S')],
            board: [
                new Card('6', 'S'),
                new Card('7', 'S'),
                new Card('8', 'S'),
                new Card('2', 'C'),
                new Card('2', 'D')
            ]
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('SF');
    });

    it('should identify Four of a Kind', () => {
        const cards = {
            player_hand: [new Card('T', 'C'), new Card('T', 'D')],
            board: [
                new Card('T', 'H'),
                new Card('T', 'S'),
                new Card('2', 'C'),
                new Card('2', 'D'),
                new Card('2', 'H')
            ]
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('4K');
    });

    it('should identify Full House', () => {
        const cards = {
            player_hand: [new Card('K', 'C'), new Card('K', 'D')],
            board: [
                new Card('A', 'C'),
                new Card('A', 'D'),
                new Card('A', 'H'),
                new Card('2', 'C'),
                new Card('3', 'C')
            ]
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('FH');
    });

    it('should identify Flush', () => {
        const cards = {
            player_hand: [new Card('A', 'S'), new Card('2', 'S')],
            board: [
                new Card('4', 'S'),
                new Card('6', 'S'),
                new Card('8', 'S'),
                new Card('T', 'C'),
                new Card('2', 'D')
            ]
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('FL');
    });

    it('should identify Straight', () => {
        const cards = {
            player_hand: [new Card('5', 'C'), new Card('6', 'D')],
            board: [
                new Card('7', 'H'),
                new Card('8', 'S'),
                new Card('9', 'C'),
                new Card('2', 'C'),
                new Card('2', 'D')
            ]
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('ST');
    });

    it('should identify Three of a Kind', () => {
        const cards = {
            player_hand: [new Card('A', 'C'), new Card('A', 'D')],
            board: [
                new Card('A', 'H'),
                new Card('2', 'C'),
                new Card('4', 'D'),
                new Card('6', 'H'),
                new Card('8', 'S')
            ]
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('3K');
    });

    it('should identify Two Pair', () => {
        const cards = {
            player_hand: [new Card('A', 'C'), new Card('A', 'D')],
            board: [
                new Card('K', 'C'),
                new Card('K', 'D'),
                new Card('2', 'C'),
                new Card('4', 'D'),
                new Card('6', 'H')
            ]
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('2P');
    });

    it('should identify Pair', () => {
        const cards = {
            player_hand: [new Card('A', 'C'), new Card('A', 'D')],
            board: [
                new Card('2', 'H'),
                new Card('4', 'S'),
                new Card('6', 'C'),
                new Card('8', 'D'),
                new Card('T', 'H')
            ]
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('PA');
    });

    it('should identify High Card', () => {
        const cards = {
            player_hand: [new Card('A', 'C'), new Card('J', 'D')],
            board: [
                new Card('2', 'H'),
                new Card('4', 'S'),
                new Card('6', 'C'),
                new Card('8', 'D'),
                new Card('T', 'H')
            ]
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('HC');
    });
});
