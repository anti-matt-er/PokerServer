'use strict';

import { Deck } from './Deck';
import { Card } from './Card';
import { Board } from './Board';
import { Player } from './Player';
const wunderbar = require('@gribnoysup/wunderbar');

describe('deck', () => {
    describe('general', () => {
        const deck = new Deck();

        it('should contain all 52 cards', () => {
            expect(deck.cards).toContainEqual(
                expect.objectContaining({ id: '2C' })
            );
            expect(deck.cards).toContainEqual(
                expect.objectContaining({ id: '4D' })
            );
            expect(deck.cards).toContainEqual(
                expect.objectContaining({ id: 'TD' })
            );
            expect(deck.cards).toContainEqual(
                expect.objectContaining({ id: 'KH' })
            );
            expect(deck.cards).toContainEqual(
                expect.objectContaining({ id: 'AS' })
            );
            expect(deck.cards).toHaveLength(52);
        });

        it('should correctly reset deck', () => {
            deck.cards = ['a dirty deck'];
            deck.reset();
            expect(deck.cards).toHaveLength(52);
        });
    });

    describe('shuffle', () => {
        const deck = new Deck();

        let raw_results = [];
        let largest_distribution = 0;
        let smallest_distribution = 600000;
        const expected_average = 100000; //600000 runs / 6 possible results
        const acceptable_deviation = 10000; //10% tolerance

        it('should be unbiased', () => {
            let shuffle_results = {
                '1,2,3': {
                    label: '1,2,3:  ',
                    value: 0,
                    color: '#aae6f6'
                },
                '1,3,2': {
                    label: '1,3,2:  ',
                    value: 0,
                    color: '#6dd5f2'
                },
                '2,1,3': {
                    label: '2,1,3:  ',
                    value: 0,
                    color: '#02c4ee'
                },
                '2,3,1': {
                    label: '2,3,1:  ',
                    value: 0,
                    color: '#00b7ee'
                },
                '3,1,2': {
                    label: '3,1,2:  ',
                    value: 0,
                    color: '#00aaee'
                },
                '3,2,1': {
                    label: '3,2,1:  ',
                    value: 0,
                    color: '#009de0'
                }
            };

            for (let i = 0; i < 600000; i++) {
                deck.cards = [1, 2, 3]; //mock a 3-card deck for simulation purposes, this is sufficient to test for bias
                deck.shuffle();
                const key = `${deck.cards[0]},${deck.cards[1]},${deck.cards[2]}`;
                shuffle_results[key].value += 1;
            }

            Object.values(shuffle_results).forEach((result) => {
                raw_results.push(result);
                if (result.value > largest_distribution) {
                    largest_distribution = result.value;
                }
                if (result.value < smallest_distribution) {
                    smallest_distribution = result.value;
                }
            });

            raw_results.forEach((result) => {
                let deviation = Math.abs(expected_average - result.value);
                expect(deviation).toBeLessThan(acceptable_deviation);
            });
        });

        afterAll(() => {
            process.stdout.write(
                '\nProbability distribution of 3-card deck shuffle:\n'
            );

            const { chart, legend } = wunderbar(raw_results, {
                min: Math.min(
                    smallest_distribution,
                    expected_average - acceptable_deviation
                ),
                max: largest_distribution,
                format: '0,0'
            });

            process.stdout.write(chart + '\n\n');
            process.stdout.write(legend + '\n\n');
            let deviation_percentage =
                ((largest_distribution - smallest_distribution) /
                    expected_average) *
                100;
            process.stdout.write(
                'Difference between min and max distribution deviates ' +
                    deviation_percentage.toFixed(2) +
                    '% from expected average.\n\n'
            );
        });
    });

    describe('deal', () => {
        const deck = new Deck();
        let players = [
            new Player(),
            new Player(),
            new Player(),
            new Player(),
            new Player()
        ];
        let board = new Board();

        beforeAll(() => {
            deck.reset();
            deck.shuffle();
            players.forEach((player) => {
                deck.deal(player);
            }); //PREFLOP
            deck.deal(board); //FLOP
            deck.deal(board); //TURN
            deck.deal(board); //RIVER
        });

        it('should deal 2 cards to all players', () => {
            players.forEach((player) => {
                expect(player.hand).toHaveLength(2);
                expect(player.hand[0]).toBeInstanceOf(Card);
                expect(player.hand[1]).toBeInstanceOf(Card);
            });
        });

        it('should deal community cards correctly', () => {
            expect(board.cards.flop).toHaveLength(3);
            expect(board.cards.flop[0]).toBeInstanceOf(Card);
            expect(board.cards.flop[1]).toBeInstanceOf(Card);
            expect(board.cards.flop[2]).toBeInstanceOf(Card);
            expect(board.cards.turn).toHaveLength(1);
            expect(board.cards.turn[0]).toBeInstanceOf(Card);
            expect(board.cards.river).toHaveLength(1);
            expect(board.cards.river[0]).toBeInstanceOf(Card);
            expect(board.street).toEqual(board.streets.river);
        });

        it('should remove dealt cards from the deck', () => {
            const expected_remaining_cards = 52 - players.length * 2 - 5;
            //Deck starts at 52, each player has a hand of 2 cards, the board has 5 cards at river
            expect(deck.cards).toHaveLength(expected_remaining_cards);
        });

        it('should reject dealing to anything other than Player or Board', () => {
            let remaining_cards = deck.cards.length;
            expect(() => {
                deck.deal({});
                deck.deal(deck);
            }).toThrow('instance of Player or Board');
            expect(deck.cards).toHaveLength(remaining_cards);
        });
    });
});
