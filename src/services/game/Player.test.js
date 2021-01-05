'use strict';

import { Player } from './Player';
import { Card } from './Card';

const card_KH = new Card('K', 'H');
const card_AS = new Card('A', 'S');

it('should reset correctly', () => {
    const player = new Player();
    player.hand = [card_KH, card_AS];
    player.reset();
    expect(player.hand).toEqual([]);
});