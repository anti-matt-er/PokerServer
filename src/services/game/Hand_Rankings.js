'use strict';

const rankings = {
    'RF': {
        name: 'Royal Flush',
        flush: true,
        straight: true,
        min_rank: 10,
        matches: null,
        min_cards: 5,
        score: 10
    },
    'SF': {
        name: 'Straight Flush',
        flush: true,
        straight: true,
        min_rank: null,
        matches: null,
        min_cards: 5,
        score: 9
    },
    '4K': {
        name: 'Four of a Kind',
        flush: false,
        straight: false,
        min_rank: null,
        matches: [4, 0],
        min_cards: 4,
        score: 8
    },
    'FH': {
        name: 'Full House',
        flush: false,
        straight: false,
        min_rank: null,
        matches: [3, 2],
        min_cards: 5,
        score: 7
    },
    'FL': {
        name: 'Flush',
        flush: true,
        straight: false,
        min_rank: null,
        matches: null,
        min_cards: 5,
        score: 6
    },
    'ST': {
        name: 'Straight',
        flush: false,
        straight: true,
        min_rank: null,
        matches: null,
        min_cards: 5,
        score: 5
    },
    '3K': {
        name: 'Three of a Kind',
        flush: false,
        straight: false,
        min_rank: null,
        matches: [3, 0],
        min_cards: 3,
        score: 4
    },
    '2P': {
        name: 'Two Pair',
        flush: false,
        straight: false,
        min_rank: null,
        matches: [2, 2],
        min_cards: 4,
        score: 3
    },
    'PA': {
        name: 'Pair',
        flush: false,
        straight: false,
        min_rank: null,
        matches: [2, 0],
        min_cards: 2,
        score: 2
    },
    'HC': {
        name: 'High Card',
        flush: false,
        straight: false,
        min_rank: null,
        matches: null,
        min_cards: 0,
        score: 1
    }
};
exports.rankings = rankings;

const weights = {
    ranking: 3,
    hand_large: 2,
    hand_small: 1,
    remainder: 0
};
exports.weights = weights;