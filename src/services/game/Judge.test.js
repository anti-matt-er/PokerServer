'use strict';

import { Judge } from './Judge';
import { Card } from './Card';

describe('functions', () => {
    it('should sort cards by ascending value', () => {
        const cards = [
            new Card('TC'),
            new Card('4D'),
            new Card('9H'),
            new Card('AS'),
            new Card('9C'),
            new Card('3D'),
            new Card('JH')
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
            player_hand: [new Card('AS'), new Card('JS')],
            board: [
                new Card('TS'),
                new Card('QS'),
                new Card('KS'),
                new Card('2C'),
                new Card('2D')
            ]
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('RF');
    });

    it('should identify Straight Flush', () => {
        const cards = {
            player_hand: [new Card('5S'), new Card('9S')],
            board: [
                new Card('6S'),
                new Card('7S'),
                new Card('8S'),
                new Card('2C'),
                new Card('2D')
            ]
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('SF');
    });

    it('should identify Four of a Kind', () => {
        const cards = {
            player_hand: [new Card('TC'), new Card('TD')],
            board: [
                new Card('TH'),
                new Card('TS'),
                new Card('2C'),
                new Card('2D'),
                new Card('2H')
            ]
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('4K');
    });

    it('should identify Full House', () => {
        const cards = {
            player_hand: [new Card('KC'), new Card('KD')],
            board: [
                new Card('AC'),
                new Card('AD'),
                new Card('AH'),
                new Card('2C'),
                new Card('3C')
            ]
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('FH');
    });

    it('should identify Flush', () => {
        const cards = {
            player_hand: [new Card('AS'), new Card('2S')],
            board: [
                new Card('4S'),
                new Card('6S'),
                new Card('8S'),
                new Card('TC'),
                new Card('2D')
            ]
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('FL');
    });

    it('should identify Straight', () => {
        const cards = {
            player_hand: [new Card('5C'), new Card('6D')],
            board: [
                new Card('7H'),
                new Card('8S'),
                new Card('9C'),
                new Card('2C'),
                new Card('2D')
            ]
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('ST');
    });

    it('should identify ace-low Straight', () => {
        const cards = {
            player_hand: [new Card('5C'), new Card('AD')],
            board: [
                new Card('2H'),
                new Card('3S'),
                new Card('4C'),
                new Card('TC'),
                new Card('TD')
            ]
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('ST');
    });

    it('should identify Three of a Kind', () => {
        const cards = {
            player_hand: [new Card('AC'), new Card('AD')],
            board: [
                new Card('AH'),
                new Card('2C'),
                new Card('4D'),
                new Card('6H'),
                new Card('8S')
            ]
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('3K');
    });

    it('should identify Two Pair', () => {
        const cards = {
            player_hand: [new Card('AC'), new Card('AD')],
            board: [
                new Card('KC'),
                new Card('KD'),
                new Card('2C'),
                new Card('4D'),
                new Card('6H')
            ]
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('2P');
    });

    it('should identify Pair', () => {
        const cards = {
            player_hand: [new Card('AC'), new Card('AD')],
            board: [
                new Card('2H'),
                new Card('4S'),
                new Card('6C'),
                new Card('8D'),
                new Card('TH')
            ]
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('PA');
    });

    it('should identify High Card', () => {
        const cards = {
            player_hand: [new Card('AC'), new Card('JD')],
            board: [
                new Card('2H'),
                new Card('4S'),
                new Card('6C'),
                new Card('8D'),
                new Card('TH')
            ]
        };
        let hand = Judge.assess(cards);
        expect(hand.ranking).toEqual('HC');
    });
});
