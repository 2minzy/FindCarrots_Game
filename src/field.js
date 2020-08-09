'use strict';

import * as sound from './sound.js';

const CARROT_SIZE = 80;
export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
})

export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);

  }

  init() {
    this.field.innerHTML = ''; // reset the number of items
    this._addItem('carrot', this.carrotCount, 'img/carrot.png');
    this._addItem('bug', this.bugCount, 'img/bug.png');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }


  _addItem(className, count, imgPath) { // _을 붙이면 private이라는 의미
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2); // class 밖에 있는 stactic 함수는 this를 붙일 필요가 없다.
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  onClick = (event) => {
    console.log(this);
    const target = event.target;
    if (target.matches('.carrot')) {
      // 당근을 선택하면,
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches('.bug')) {
      // 벌레를 선택하면,
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  }
}

// stactic 함수
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}