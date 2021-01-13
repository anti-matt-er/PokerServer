'use strict';

const StateMachine = require('javascript-state-machine');

class Game extends StateMachine {
    constructor() {
        super({
            init: 'Seating'
        });
    }
}
exports.Game = Game;