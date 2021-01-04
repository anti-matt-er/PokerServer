'use strict';

import { Deck } from './Deck';

var deck = new Deck();

it('should contain all 52 cards', () => {
    deck.reset();
    expect(deck.cards).toHaveLength(52);
});