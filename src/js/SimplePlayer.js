import { playlist } from './utils';
export class SimplePlayer {
  constructor() {
    this.defaultPlayerContainer = document.querySelector('.player');
    this.playlistContainer = document.querySelector('.play-list');
    this.playerIcon = document.querySelector('.play');
    this.isPlay = false;
    this.playNum = 0;
    this.audio = new Audio();
    this.createPlaylist();
    this.audioArray = document.querySelectorAll('.play-item');
  }
  createPlaylist() {
    for (let i = 0; i < playlist.length; i++) {
      const li = document.createElement('li');
      li.classList.add('play-item');
      li.dataset.index = i;
      li.textContent = playlist[i].title;
      this.playlistContainer.append(li);
    }
  }
  playNext() {
    if (this.playNum >= playlist.length - 1) {
      this.playNum = 0;
      this.isPlay = false;
      this.playAudio();
      return;
    }
    this.isPlay = false;
    this.playNum++;
    this.playAudio();
  }
  playPrev() {
    if (this.playNum === 0) {
      this.playNum = playlist.length - 1;
      this.isPlay = false;
      this.playAudio();
      return;
    }
    this.isPlay = false;
    this.playNum--;
    this.playAudio();
  }
  playAudio() {
    this.audio.src = `https://nazimajumaniyazova.github.io/momentum/${
      playlist[this.playNum].src
    }`;
    this.audio.currentTime = 0;
    if (this.isPlay) {
      this.audio.pause();
      this.isPlay = false;
    } else {
      this.audio.play();
      this.isPlay = true;
    }
    if (this.isPlay) {
      this.playerIcon.classList.add('pause');
    }
    this.audioArray.forEach((elem) => {
      elem.classList.remove('item-active');
    });
    this.audioArray[this.playNum].classList.add('item-active');

    this.audio.onended = () => {
      this.playNext();
    };
  }
}
