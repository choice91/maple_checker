const $id = document.querySelector('.join-container__id');
const $idDuplicationBlock = document.querySelector('.join-container__id-msg');
const $pw = document.querySelector('.join-container__pw');
const $pw2 = document.querySelector('.join-container__pw2');
const $name = document.querySelector('.join-container__name');

const checkId = async () => {
  if (!$id.value) {
    $idDuplicationBlock.innerText = '아이디를 입력해주세요.';
  } else if ($id.value.length < 5) {
    $idDuplicationBlock.innerText = '아이디를 5글자 이상 입력해주세요.';
  } else {
    const response = await fetch('/id-check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: $id.value,
      }),
    });

    if (response.status === 409) {
      $idDuplicationBlock.innerText = '아이디가 중복입니다.';
    } else {
      $idDuplicationBlock.innerText = '사용할 수 있는 아이디입니다.';
    }
  }
};

const submitJoin = () => {
  if (!$id.value) {
    alert('아이디를 입력해주세요.');
    return false;
  }

  if (!$pw.value) {
    alert('비밀번호를 입력해주세요.');
    return false;
  }

  if (!$pw2.value) {
    alert('비밀번호 확인을 입력해주세요.');
    return false;
  }

  if (!$name.value) {
    alert('이름을 입력해주세요.');
    return false;
  }

  return true;
};

$id.addEventListener('focusout', checkId);
