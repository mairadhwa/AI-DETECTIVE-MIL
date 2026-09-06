
window.MIL = window.MIL || {};

(function () {
  const SLICE_SIZE = 360 / window.MIL.CATEGORIES.length; 
  const SLICE_MARGIN = 12; 

  class SpinWheel {

    constructor(wheelEl) {
      this.wheelEl = wheelEl;
      this.rotation = 0;
      this.spinning = false;
    }


    spin() {
      if (this.spinning) return Promise.reject(new Error('Already spinning'));
      this.spinning = true;

      const categories = window.MIL.CATEGORIES;
      const winner = categories[Math.floor(Math.random() * categories.length)];
      const withinSlice = SLICE_MARGIN + Math.random() * (SLICE_SIZE - SLICE_MARGIN * 2);
      const targetAbsolute = (winner.sliceStart + withinSlice) % 360;

      const targetMod = (360 - targetAbsolute) % 360;

      const currentMod = ((this.rotation % 360) + 360) % 360;
      let delta = targetMod - currentMod;
      if (delta <= 0) delta += 360;

      const EXTRA_SPINS = 6 + Math.floor(Math.random() * 3); 
      this.rotation += delta + EXTRA_SPINS * 360;

      this.wheelEl.classList.add('spinning');

      this.wheelEl.offsetHeight;
      this.wheelEl.style.transform = `rotate(${this.rotation}deg)`;

      return new Promise((resolve) => {
        const onEnd = (evt) => {
          if (evt.propertyName !== 'transform') return;
          this.wheelEl.removeEventListener('transitionend', onEnd);
          this.wheelEl.classList.remove('spinning');
          this.spinning = false;
          resolve(winner);
        };
        this.wheelEl.addEventListener('transitionend', onEnd);
      });
    }
  }

  window.MIL.SpinWheel = SpinWheel;
})();
