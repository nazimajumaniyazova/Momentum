import { playlist } from './utils';
export class AdvancedPlayer {
  constructor() {
    this.nextBtn = document.querySelector('.audio-next');
    this.prevBtn = document.querySelector('.audio-prev');
    this.randomBtn = document.querySelector('.audio-random');
    this.loopBtn = document.querySelector('.audio-loop');
    this.playBtn = document.querySelector('.audio-play');

    this.currentTime = document.querySelector('.audio-current-time');
    this.duration = document.querySelector('.audio-duration');
    this.progressBar = document.querySelector('.audio-progress');
    this.audioImg = document.querySelector('.audio-img');
    this.audioName = document.querySelector('.audio-name');
    this.playlistContainer = document.querySelector('.auido-player-playlist');
    this.playerContainer = document.querySelector('.audio-player');
    this.timeline = document.querySelector('.audio-timeline');
    this.playNum = 0;
    this.isPlay = false;
    this.isDown = false;
    this.audio = new Audio();
    this.createPlaylist();
    this.audioArray = document.querySelectorAll('.audio-play-item');
    this.audio.src =
      'https://nazimajumaniyazova.github.io/momentum/' +
      playlist[this.playNum].src;
    this.audioImg.src =
      'https://nazimajumaniyazova.github.io/momentum/' +
      playlist[this.playNum].img;
    this.audioName.textContent = playlist[this.playNum].name;

    this.nextBtn.addEventListener('click', () => this.nextBtnHanler());
    this.prevBtn.addEventListener('click', () => this.prevBtnHanler());
    this.playBtn.addEventListener('click', () => this.playBtnHanler());
    // this.playBtnHanler = this.playBtnHanler.bind(this);
    // this.playBtn.addEventListener('click', this.playBtnHanler);
    this.loopBtn.addEventListener('click', () => this.loopBtnHanler());
    this.randomBtn.addEventListener('click', () => this.randomBtnHanler());
    this.timeline.addEventListener('click', (event) =>
      this.timelineClickHandler(event)
    );
    this.timeline.addEventListener('mousedown', (event) =>
      this.timelineMousedownHandler(event)
    );
    this.timeline.addEventListener('mouseup', (event) =>
      this.timelineMouseUpHandler(event)
    );
    this.timeline.addEventListener('mousemove', (event) =>
      this.timelineMouseMoveHandler(event)
    );
    this.playlistContainer.addEventListener('click', (event) =>
      this.playlistClickHandler(event)
    );
    this.audio.addEventListener('ended', () => this.handleAudioEnding());
    this.audioCurrentTime();
  }
  createPlaylist() {
    for (let i = 0; i < playlist.length; i++) {
      const li = document.createElement('li');
      li.classList.add('audio-play-item');
      li.dataset.index = i;
      li.textContent = playlist[i].title;
      this.playlistContainer.append(li);
    }
  }
  getRandomNum() {
    return Math.floor(Math.random() * playlist.length);
  }
  getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
  }
  playAudio() {
    if (!this.isPlay) {
      this.playBtn.classList.remove('a-play');
      this.playBtn.classList.add('a-pause');
      this.audio.play();
    }
    this.audio.src =
      'https://nazimajumaniyazova.github.io/momentum/' +
      playlist[this.playNum].src;
    this.audioName.textContent = playlist[this.playNum].name;
    this.duration.textContent = playlist[this.playNum].duration;
    this.audio.play();
  }
  activePlayingItem() {
    this.audioArray.forEach((elem) => {
      elem.classList.remove('item-active');
    });
    this.audioArray[this.playNum].classList.add('item-active');
  }

  nextBtnHanler() {
    if (!this.randomBtn.classList.contains('audio-random_active')) {
      this.playNum = this.getRandomNum();
      this.playAudio();
      this.activePlayingItem();
      return;
    }
    if (this.playNum >= playlist.length - 1) {
      this.playNum = 0;
      this.isPlay = true;
      this.playAudio();
      this.activePlayBtn();
      this.activePlayingItem();
      return;
    }
    this.isPlay = true;
    this.playNum++;
    this.playAudio();
    this.activePlayBtn();
    this.activePlayingItem();
  }
  prevBtnHanler() {
    if (!this.randomBtn.classList.contains('audio-random_active')) {
      this.playNum = this.getRandomNum();
      this.playAudio();
      this.activePlayingItem();
      return;
    }
    if (this.playNum === 0) {
      this.playNum = playlist.length - 1;
      this.isPlay = true;
      this.playAudio();
      this.activePlayBtn();
      this.activePlayingItem();
      return;
    }
    this.playNum--;
    this.isPlay = true;
    this.playAudio();
    this.activePlayBtn();
    this.activePlayingItem();
  }
  playBtnHanler() {
    if (this.audio.paused) {
      this.playBtn.classList.remove('a-play');
      this.playBtn.classList.add('a-pause');
      this.audio.play();
      this.duration.textContent = playlist[this.playNum].duration;
      this.activePlayingItem();
    } else {
      this.playBtn.classList.remove('a-pause');
      this.playBtn.classList.add('a-play');
      this.audio.pause();
      this.activePlayingItem();
    }
  }
  activePlayBtn() {
    if (this.isPlay) {
      this.playBtn.classList.remove('a-play');
      this.playBtn.classList.add('a-pause');
      this.isPlay = false;
      this.audio.play();
      return;
    } else {
      this.playBtn.classList.remove('a-pause');
      this.playBtn.classList.add('a-play');
      this.isPlay = true;
      this.audio.pause();
    }
  }
  loopBtnHanler() {
    this.loopBtn.classList.toggle('audio-loop_active');
  }
  randomBtnHanler() {
    this.randomBtn.classList.toggle('audio-random_active');
  }
  playlistClickHandler(event) {
    let eventTarget = event.target.closest('.audio-play-item');
    if (!eventTarget) {
      return;
    }
    this.audioArray.forEach((elem) => {
      elem.classList.remove('item-active');
    });
    eventTarget.classList.add('item-active');
    this.playNum = eventTarget.dataset.index;
    this.isPlay = false;
    this.playAudio();
  }
  activePlayingItem() {
    this.audioArray.forEach((elem) => {
      elem.classList.remove('item-active');
    });
    this.audioArray[this.playNum].classList.add('item-active');
  }
  handleAudioEnding() {
    if (!this.loopBtn.classList.contains('audio-loop_active')) {
      this.audio.currentTime = 0;
      this.audio.play();
      this.activePlayingItem();
    } else {
      if (!this.randomBtn.classList.contains('audio-random_active')) {
        this.playNum = this.getRandomNum();
        this.playAudio();
        this.activePlayingItem();
        return;
      }
      if (this.playNum >= playlist.length - 1) {
        this.playNum = 0;
        this.playAudio();
        this.activePlayingItem();
        return;
      }
      this.playNum++;
      this.playAudio();
      this.activePlayingItem();
    }
  }
  audioCurrentTime() {
    setInterval(() => {
      this.progressBar.style.width =
        (this.audio.currentTime / this.audio.duration) * 100 + '%';
      this.currentTime.textContent = this.getTimeCodeFromNum(
        this.audio.currentTime
      );
    }, 500);
  }
  timelineClickHandler(event) {
    const timelineWidth = window.getComputedStyle(this.timeline).width;
    const timeToSeek =
      (event.offsetX / parseInt(timelineWidth)) * this.audio.duration;
    this.audio.currentTime = timeToSeek;
  }
  timelineMousedownHandler(event) {
    this.isDown = true;
    this.timeline.style.cursor = 'grabbing';
    const timelineWidth = window.getComputedStyle(this.timeline).width;
    const timeToSeek =
      (event.offsetX / parseInt(timelineWidth)) * this.audio.duration;
    this.audio.currentTime = timeToSeek;
  }
  timelineMouseUpHandler(event) {
    this.timeline.style.cursor = 'pointer';
    this.isDown = false;
  }
  timelineMouseMoveHandler(event) {
    if (this.isDown) {
      this.timeline.style.cursor = 'grabbing';
      const timelineWidth = window.getComputedStyle(this.timeline).width;
      const timeToSeek =
        (event.offsetX / parseInt(timelineWidth)) * this.audio.duration;
      this.audio.currentTime = timeToSeek;
    }
  }
}
