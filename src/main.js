'use strict';

import PopUp from './popup.js';
import * as sound from './sound.js';
import {
  GameBuilder,
  Reason
} from './game.js'; //

// Class
const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .gameDuration(10)
  .carrotCount(10)
  .bugCount(10)
  .build();

game.setGameStopListener(reason => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = 'REPLAY? 🤔';
      sound.playAlert();
      break;
    case Reason.win:
      message = 'YOU WON! 🥰';
      sound.playWin();
      break;
    case Reason.lose:
      message = 'YOU LOST..😭';
      sound.playBug();
      break;
    default:
      throw new Error('not vaild reason');
  }
  gameFinishBanner.showWithText(message);
})

gameFinishBanner.setClickListener(() => {
  document.location.reload(); // Restart
});

// popUpRefresh.addEventListener('click', () => {
//   document.location.reload(); // Restart
// });