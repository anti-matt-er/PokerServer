'use strict';

var Definitions = {
    ranks: {
        '2': {
            'name': '2',
            'name_long': 'Two',
            'value': 1
        },
        '3': {
            'name': '3',
            'name_long': 'Three',
            'value': 2
        },
        '4': {
            'name': '4',
            'name_long': 'Four',
            'value': 3
        },
        '5': {
            'name': '5',
            'name_long': 'Five',
            'value': 4
        },
        '6': {
            'name': '6',
            'name_long': 'Six',
            'value': 5
        },
        '7': {
            'name': '7',
            'name_long': 'Seven',
            'value': 6
        },
        '8': {
            'name': '8',
            'name_long': 'Eight',
            'value': 7
        },
        '9': {
            'name': '9',
            'name_long': 'Nine',
            'value': 8
        },
        'T': {
            'name': '10',
            'name_long': 'Ten',
            'value': 9
        },
        'J': {
            'name': 'Jack',
            'name_long': 'Jack',
            'value': 10
        },
        'Q': {
            'name': 'Queen',
            'name_long': 'Queen',
            'value': 11
        },
        'K': {
            'name': 'King',
            'name_long': 'King',
            'value': 12
        },
        'A': {
            'name': 'Ace',
            'name_long': 'Ace',
            'value': 13
        }
    },

    suits: {
        'C': {
            'name': 'Clubs',
            'color': {
                'suit': 'black',
                'unique': 'green'
            }
        },
        'D': {
            'name': 'Diamonds',
            'color': {
                'suit': 'red',
                'unique': 'blue'
            }
        },
        'H': {
            'name': 'Hearts',
            'color': {
                'suit': 'red',
                'unique': 'red'
            }
        },
        'S': {
            'name': 'Spades',
            'color': {
                'suit': 'black',
                'unique': 'black'
            }
        }
    }
};

Definitions.valid_ranks = Object.keys(Definitions.ranks);
Definitions.valid_suits = Object.keys(Definitions.suits);

exports.Definitions = Definitions;