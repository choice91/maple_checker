const $characterPlusBtn = document.querySelector(
  '.home-container__add-character'
);
const $characterDeleteBtn = document.querySelector(
  '.home-container__delete-character'
);
const $table = document.querySelector('.home-container__table');
const $modal = document.querySelector('.modal');
const $modalInput = document.querySelector('.modal__input');
const $modalSubmitBtn = document.querySelector('.modal__submit');
const $modalCancelBtn = document.querySelector('.modal__cancel');
const $modalErrorMsg = document.querySelector('.modal__error-msg');
const $yeoro = document.querySelectorAll('.yeoro');
const $chuchu = document.querySelectorAll('.chuchu');
const $lachelein = document.querySelectorAll('.lachelein');
const $arcana = document.querySelectorAll('.arcana');
const $morass = document.querySelectorAll('.morass');
const $esfera = document.querySelectorAll('.esfera');
const $cernium = document.querySelectorAll('.cernium');
const $burningCernium = document.querySelectorAll('.burning-cernium');
const $arcs = document.querySelectorAll('.arcs');
const $odium = document.querySelectorAll('.odium');

const hiddenModal = () => $modal.classList.add('hidden');
const showErrorMsg = () => $modalErrorMsg.classList.remove('hidden');
const hiddenErrorMsg = () => $modalErrorMsg.classList.add('hidden');

const openModal = () => {
  $modalInput.value = '';
  $modal.classList.remove('hidden');
};

const addCharacter = async () => {
  const nickname = $modalInput.value;

  try {
    const response = await (
      await fetch('/quest/nickname', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname,
        }),
      })
    ).json();

    if (!response.ok) {
      showErrorMsg();
      $modalErrorMsg.textContent = response.message;
      return;
    }

    const ul = document.createElement('ul');
    const nicknameBlock = document.createElement('li');
    nicknameBlock.innerText = nickname;
    ul.appendChild(nicknameBlock);

    for (let i = 0; i < 10; i += 1) {
      const li = document.createElement('li');
      li.innerHTML = '<input type="checkbox" />';
      ul.appendChild(li);
    }

    $table.appendChild(ul);

    hiddenModal();
  } catch (err) {
    console.error(err);
    alert('알 수 없는 에러 발생. 다시 시도해주세요.');
  }
};

const addCharacterEnter = (e) => {
  if (e.keyCode === 13 && $modalInput.value !== '') {
    e.preventDefault();
    $modalSubmitBtn.click();
  }
};

const deleteCharacter = () => {
  console.log('삭제');
  hiddenModal();
};

const modalCancel = () => {
  hiddenModal();
  hiddenErrorMsg();
};

const checkbox = async (e) => {
  const nickname = e.target.value;
  const questType = e.target.getAttribute('name');

  try {
    const response = await fetch('/quest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname,
        questType,
      }),
    });
    const responseJson = await response.json();
    console.log(responseJson);
  } catch (err) {
    console.error(err);
  }
};

$characterPlusBtn.addEventListener('click', openModal);
$characterDeleteBtn.addEventListener('click', deleteCharacter);
$modalInput.addEventListener('keydown', addCharacterEnter);
$modalSubmitBtn.addEventListener('click', addCharacter);
$modalCancelBtn.addEventListener('click', modalCancel);
$yeoro.forEach((element) => element.addEventListener('click', checkbox));
$chuchu.forEach((element) => element.addEventListener('click', checkbox));
$lachelein.forEach((element) => element.addEventListener('click', checkbox));
$arcana.forEach((element) => element.addEventListener('click', checkbox));
$morass.forEach((element) => element.addEventListener('click', checkbox));
$esfera.forEach((element) => element.addEventListener('click', checkbox));
$cernium.forEach((element) => element.addEventListener('click', checkbox));
$burningCernium.forEach((element) =>
  element.addEventListener('click', checkbox)
);
$arcs.forEach((element) => element.addEventListener('click', checkbox));
$odium.forEach((element) => element.addEventListener('click', checkbox));
