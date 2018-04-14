class CardManager {
  constructor() {
    this.cards = {};
    this.version = 0;
  }

  addCard(id, cardValue) {
    console.log(id, cardValue);
    id = id || new Date().getTime();
    this.cards[id] = this.createCard(id, cardValue);
    this.version++;
    this.render();
  }

  removeCard(id) {
    console.log('removing card', id);
    document.getElementById(id).remove();
    delete this.cards[id];
    this.version--;
  }

  render() {
    document.getElementById('cards').innerHTML = '';
    Object.keys(this.cards).map(key => {
      document.getElementById('cards').appendChild(this.cards[key]);
    });
  }

  createCard(id, value) {
    let card = document.createElement('div'),
      text = document.createElement('span'),
      date = document.createElement('span'),
      deleteBtn = document.createElement('button');

    text.classList.add('card__text');
    date.classList.add('card__date');

    text.innerText = value;
    date.innerText = new Date(id).toLocaleString();
    deleteBtn.innerText = 'x';

    deleteBtn.addEventListener('click', () => {
      this.removeCard(id);
    });

    card.id = id;
    card.classList.add('card');
    card.appendChild(text);
    card.appendChild(date);
    card.appendChild(deleteBtn);
    return card;
  }

  getCards() {
    const promise = new Promise((resolve, reject) => {
      resolve({
        cards: [{ id: new Date().getTime(), value: 'some text ...' }],
        version: 1
      });
    });
    return promise;
  }

  setCards(cardsData) {
    cardsData.cards.map(card => {
      this.addCard(card.id, card.value);
    });
    this.version = cardsData.version;
  }
}

export default new CardManager();
