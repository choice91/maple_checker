const $characterPlusBtn = document.querySelector(
  '.home-container__add-character'
);
const $table = document.querySelector('.home-container__quest-table');
const $tableTheadTr = document.querySelector('table > thead > tr');
const $tableTbodyTr = document.querySelectorAll('table > tbody > tr');
const $deleteBtns = document.querySelectorAll('.delete-btn');

const $modalInput = document.querySelector('#nickname');

const $addModalSubmitBtn = document.querySelector('#add-modal-cancel');
const $addModalCancelBtn = document.querySelector('#add-modal-cancel');
const $addCharacterModal = document.querySelector('#add-character');

const $deleteCharacterModal = document.querySelector('#delete-character');
const $deleteNickname = document.querySelector('.modal__delete-nickname');
const $deleteNicknameCellIndex = document.querySelector('.modal__cell-index');
const $deleteModalSubmit = document.querySelector('#delete-modal-submit');
const $deleteModalCancel = document.querySelector('#delete-modal-cancel');

const $modalErrorMsg = document.querySelector('.modal__error-msg');

const $checkboxBtn = document.querySelectorAll('tbody > tr > td > button');

const showErrorMsg = () => $modalErrorMsg.classList.remove('hidden');
const hiddenErrorMsg = () => $modalErrorMsg.classList.add('hidden');

const openAddCharacterModal = () => {
  $modalInput.value = '';
  $addCharacterModal.classList.remove('hidden');
};

const closeAddCharacterModal = () => $addCharacterModal.classList.add('hidden');

const openDeleteCharacterModal = (e) => {
  const nickname = e.currentTarget.parentNode.previousSibling.textContent;
  $deleteNickname.textContent = nickname;
  $deleteNicknameCellIndex.textContent =
    e.currentTarget.parentNode.parentNode.cellIndex;
  $deleteCharacterModal.classList.remove('hidden');
};

const closeDeleteCharacterModal = () =>
  $deleteCharacterModal.classList.add('hidden');

const deleteCharacter = async () => {
  const nickname = $deleteNickname.textContent;
  const cellIndex = Number($deleteNicknameCellIndex.textContent);
  console.log(nickname, cellIndex);

  try {
    const response = await fetch('/quest/nickname', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname,
      }),
    });

    const responseJSON = await response.json();
    console.log(responseJSON);

    if (!responseJSON.ok) {
      window.alert('서버 에러. 다시 시도해주세요.');
    } else {
      closeDeleteCharacterModal();

      for (let i = 0; i < $table.rows.length; i += 1) {
        $table.rows[i].deleteCell(cellIndex);
      }
    }
  } catch (err) {
    console.error(err);
  }
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
    th.innerHTML = `<div>${nickname}</div>
                    <div class="home-container__thead-btn">
                      <i class="update-btn material-icons">create</i>
                      <i class="delete-btn material-icons">delete</i>
                    </div>`;
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

    closeAddCharacterModal();
  } catch (err) {
    console.error(err);
    window.alert('알 수 없는 에러 발생. 다시 시도해주세요.');
  }
};

const addCharacterEnter = (e) => {
  if (e.keyCode === 13 && $modalInput.value !== '') {
    e.preventDefault();
    $addModalSubmitBtn.click();
  }
};

const addCharacterModalClose = () => {
  closeAddCharacterModal();
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

    if (!responseJSON.ok) {
      window.alert('서버 에러. 다시 시도해주세요.');
    }
  } catch (err) {
    console.error(err);
  }
};

$characterPlusBtn.addEventListener('click', openAddCharacterModal);
$modalInput.addEventListener('keydown', addCharacterEnter);
$addModalSubmitBtn.addEventListener('click', addCharacter);
$addModalCancelBtn.addEventListener('click', addCharacterModalClose);
$deleteModalSubmit.addEventListener('click', deleteCharacter);
$deleteModalCancel.addEventListener('click', closeDeleteCharacterModal);
$checkboxBtn.forEach((element) => element.addEventListener('click', checkbox));
$deleteBtns.forEach((element) =>
  element.addEventListener('click', openDeleteCharacterModal)
);

$table.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    console.log('click', e.target);
    e.target.addEventListener('click', openDeleteCharacterModal);
  }
});

// $(document).on('click', '#delete-btn', (e) => {
//   console.log(e.target);
//   console.log('동적 바인딩');
// });

window.onclick = (e) => {
  if (e.target === $addCharacterModal) {
    closeAddCharacterModal();
  } else if (e.target === $deleteCharacterModal) {
    closeDeleteCharacterModal();
  }
};
