const $characterPlusBtn = document.querySelector(
  '.home-container__add-character'
);
const $characterDeleteBtn = document.querySelector(
  '.home-container__delete-character'
);
const $characterName = document.querySelector('thead > tr');
const $questName = document.querySelectorAll('tbody > tr');
const $modal = document.querySelector('.modal');
const $modalInput = document.querySelector('.modal__input');
const $modalSubmitBtn = document.querySelector('.modal__submit');
const $modalCancelBtn = document.querySelector('.modal__cancel');

const modalOpen = () => $modal.classList.remove('modal--hidden');
const modalClose = () => $modal.classList.add('modal--hidden');

const openModal = () => {
  $modalInput.value = '';
  modalOpen();
};

const addCharacter = () => {
  const nickname = $modalInput.value;

  const newTh = document.createElement('th');
  newTh.innerText = nickname;
  $characterName.appendChild(newTh);

  $questName.forEach((element) => {
    const td = document.createElement('td');
    td.innerHTML = '<input type="checkbox" />';
    element.appendChild(td);
  });

  modalClose();
};

const addCharacterEnter = (e) => {
  if (e.keyCode === 13 && $modalInput.value !== '') {
    e.preventDefault();
    $modalSubmitBtn.click();
  }
};

const deleteCharacter = () => {
  console.log('삭제');
  modalClose();
};

const modalCancel = () => {
  modalClose();
};

$characterPlusBtn.addEventListener('click', openModal);
$characterDeleteBtn.addEventListener('click', deleteCharacter);
$modalInput.addEventListener('keydown', addCharacterEnter);
$modalSubmitBtn.addEventListener('click', addCharacter);
$modalCancelBtn.addEventListener('click', modalCancel);
