'use strict';

import { Deck } from './Deck';
var wunderbar = require('@gribnoysup/wunderbar');

var deck = new Deck();

describe('deck', () => {

    describe('general', () => {
        it('should contain all 52 cards', () => {
            deck.reset();
            expect(deck.cards).toHaveLength(52);
        });
    });
    
    describe('shuffle', () => {
        var raw_results = [];
        
        it('should be unbiased', () => {
            var shuffle_results = {
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
        
            for (let i = 0; i < 1000; i++) {
                deck.cards = [1, 2, 3]; //mock a 3-card deck for simulation purposes, this is sufficient to test for bias
                deck.shuffle();
                var key = `${deck.cards[0]},${deck.cards[1]},${deck.cards[2]}`;
                shuffle_results[key].value += 1;
            }
        
            Object.values(shuffle_results).forEach(element => {
                raw_results.push(element);
            });
        
            const expected_average = 167; //1000 runs / 6 possible results
            const acceptable_deviation = 20; //just over 10% of above number
        
            fail('test not yet implemented');
        });

        afterAll(() => {
            process.stdout.write('\nProbability distribution of 3-card deck shuffle:\n');
        
            const { chart, legend } = wunderbar(raw_results, { format: '0,0' });
        
            process.stdout.write(chart + '\n\n');
            process.stdout.write(legend + '\n\n');
        });
    });
    
});

