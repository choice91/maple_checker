const $characterPlusBtn = document.querySelector(
  '.home-container__add-character'
);
const $characterDeleteBtn = document.querySelector(
  '.home-container__delete-character'
);
const $tableTheadTr = document.querySelector('table > thead > tr');
const $tableTbodyTr = document.querySelectorAll('table > tbody > tr');
const $modal = document.querySelector('.modal');
const $modalInput = document.querySelector('.modal__input');
const $modalSubmitBtn = document.querySelector('.modal__submit');
const $modalCancelBtn = document.querySelector('.modal__cancel');
const $modalErrorMsg = document.querySelector('.modal__error-msg');
const $checkboxBtn = document.querySelectorAll('tbody > tr > td > button');

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

    const th = document.createElement('th');
    th.innerHTML = `<span>${nickname}</span><i class="material-icons">delete</i>`;
    $tableTheadTr.appendChild(th);

    const questTypes = [
      'yeoro',
      'chuchu',
      'lachelein',
      'arcana',
      'morass',
      'esfera',
      'cernium',
      'burningCernium',
      'arcs',
      'odium',
    ];

    $tableTbodyTr.forEach((element, index) => {
      const td = document.createElement('td');
      td.innerHTML = `<button name=${nickname} value=${questTypes[index]}>
                        <i class="material-icons checkbox--white">check_box_outline_blank</i>
                      </button>`;
      element.appendChild(td);
    });

    hiddenModal();
  } catch (err) {
    console.error(err);
    window.alert('알 수 없는 에러 발생. 다시 시도해주세요.');
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
  console.log(
    e.currentTarget.value,
    e.currentTarget.getAttribute('name'),
    e.currentTarget.firstChild.textContent
  );

  const checkStatus = e.currentTarget.firstChild.textContent;

  if (checkStatus === 'check_box') {
    e.currentTarget.firstChild.textContent = 'check_box_outline_blank';
    e.currentTarget.firstChild.classList.remove('checkbox--blue');
    e.currentTarget.firstChild.classList.add('checkbox--white');
  } else if (checkStatus === 'check_box_outline_blank') {
    e.currentTarget.firstChild.textContent = 'check_box';
    e.currentTarget.firstChild.classList.remove('checkbox--white');
    e.currentTarget.firstChild.classList.add('checkbox--blue');
  }

  const nickname = e.currentTarget.name;
  const questType = e.currentTarget.value;

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

    const responseJSON = await response.json();
    console.log(responseJSON);

    if (!responseJSON.ok) {
      window.alert('서버 에러. 다시 시도해주세요.');
    }
  } catch (err) {
    console.error(err);
  }
};

$characterPlusBtn.addEventListener('click', openModal);
$characterDeleteBtn.addEventListener('click', deleteCharacter);
$modalInput.addEventListener('keydown', addCharacterEnter);
$modalSubmitBtn.addEventListener('click', addCharacter);
$modalCancelBtn.addEventListener('click', modalCancel);
console.log($checkboxBtn);
$checkboxBtn.forEach((element) => element.addEventListener('click', checkbox));
