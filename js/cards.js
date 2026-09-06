
window.MIL = window.MIL || {};

(function () {

  const CATEGORIES = [
    {
      id: 'icbr',
      name: 'Ice Breaking',
      color: 'red',
      hex: '#DB4A69',
      hexDark: '#B23752',
      sliceStart: 0,
      folder: 'icbr',
      count: 3,
    },
    {
      id: 'ai-lang',
      name: 'AI Language',
      color: 'green',
      hex: '#07A465',
      hexDark: '#068050',
      sliceStart: 90,
      folder: 'ai-lang',
      count: 5,
    },
    {
      id: 'deepfake',
      name: 'AI Deepfake',
      color: 'orange',
      hex: '#F5A776',
      hexDark: '#DD8552',
      sliceStart: 180,
      folder: 'deepfake',
      count: 9,
    },
    {
      id: 'mi',
      name: 'Misinformation',
      color: 'blue',
      hex: '#5CD1DE',
      hexDark: '#2FA6B4',
      sliceStart: 270,
      folder: 'mi',
      count: 5,
    },
  ];

  function getCategoryById(id) {
    return CATEGORIES.find((c) => c.id === id);
  }


  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }


  class CardDeck {
    constructor(category) {
      this.category = category;
      this.bag = [];
      this.lastDealt = null;
    }

    _refill() {
      let next = shuffle(Array.from({ length: this.category.count }, (_, i) => i + 1));
      if (next.length > 1 && next[0] === this.lastDealt) {
        // Avoid an immediate repeat right after a reshuffle.
        [next[0], next[1]] = [next[1], next[0]];
      }
      this.bag = next;
    }

    draw() {
      if (this.bag.length === 0) this._refill();
      const value = this.bag.pop();
      this.lastDealt = value;
      return value;
    }
  }

  const decks = new Map(CATEGORIES.map((c) => [c.id, new CardDeck(c)]));

  function drawCard(categoryId) {
    const category = getCategoryById(categoryId);
    const deck = decks.get(categoryId);
    const questionNumber = deck.draw(); // 1-based
    const bank = (window.MIL.QUESTIONS && window.MIL.QUESTIONS[category.folder]) || [];
    const q = bank[questionNumber - 1];
    return {
      category,
      questionNumber,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
    };
  }

  window.MIL.CATEGORIES = CATEGORIES;
  window.MIL.getCategoryById = getCategoryById;
  window.MIL.drawCard = drawCard;
})();
