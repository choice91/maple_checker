const $id = document.querySelector('.join-container__id');
const $idMsg = document.querySelector('.join-container__id-msg');
const $pw = document.querySelector('.join-container__pw');
const $pw2 = document.querySelector('.join-container__pw2');
const $name = document.querySelector('.join-container__name');

const checkId = async () => {
  const regExp = /^[a-z]+[a-z0-9]{4,19}$/g;

  if (!$id.value) {
    $idMsg.innerText = '아이디를 입력해주세요.';
  } else if ($id.value.length < 5) {
    $idMsg.innerText = '아이디를 5글자 이상 입력해주세요.';
  } else if (!regExp.test($id.value)) {
    $idMsg.innerText =
      '영문자로 시작하는 영문자 또는 숫자 5~20자로 입력해주세요';
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
      $idMsg.innerText = '아이디가 중복입니다.';
    } else {
      $idMsg.innerText = '사용할 수 있는 아이디입니다.';
    }
  }
};

const submitJoin = async (e) => {
  if (!$id.value) {
    e.preventDefault();
    alert('아이디를 입력해주세요.');
    $id.focus();
    return false;
  }

  if ($idMsg.textContent === '아이디가 중복입니다.') {
    e.preventDefault();
    alert('아이디가 중복입니다. 다른 아이디를 사용해주세요.');
    $id.focus();
    return false;
  }

  if (!$pw.value) {
    e.preventDefault();
    alert('비밀번호를 입력해주세요.');
    $pw.focus();
    return false;
  }

  if (!$pw2.value) {
    e.preventDefault();
    alert('비밀번호 확인을 입력해주세요.');
    $pw2.focus();
    return false;
  }

  if (!$name.value) {
    e.preventDefault();
    alert('이름을 입력해주세요.');
    $name.focus();
    return false;
  }

  return true;
};

$id.addEventListener('focusout', checkId);
