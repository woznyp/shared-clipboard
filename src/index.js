import './style.scss';
import cardManager from './card-manager';

const COMPLETE = 'complete';

function registerEvents(cardManager) {
  let input = document.querySelectorAll('#form__container form input')[0],
    fieldset = document.querySelectorAll('#form__container form div')[0];

  input.focus();
  document.getElementById('submit__btn').addEventListener('click', ev => {
    ev.preventDefault();
    if (input.value) {
      cardManager.addCard(null, input.value);
      input.value = '';
      fieldset.classList.add('inactive');
    }
  });
  document.getElementById('submit__value').addEventListener('keyup', ev => {
    if (ev.target.value !== '') {
      if (fieldset.classList.contains('inactive')) {
        fieldset.classList.toggle('inactive');
      }
    } else {
      fieldset.classList.add('inactive');
    }
  });
}

document.onreadystatechange = () => {
  if (document.readyState === COMPLETE) {
    registerEvents(cardManager);
    window.cardManager = cardManager;
    cardManager.getCards().then((data) => {
      cardManager.setCards(data);
    });
  }
};
