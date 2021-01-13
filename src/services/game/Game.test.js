'use strict';

import { Game } from './Game';

describe('state', () => {
    it('should initialise with `Seating` state', () => {
        const game = new Game();
        expect(game.state).toEqual('Seating');
    });
});