const $idBlock = document.querySelector('.join-container__id');
const $idDuplicationBlock = document.querySelector('.join-container__id-msg');

const checkId = async () => {
  if (!$idBlock.value) {
    $idDuplicationBlock.innerText = '아이디를 입력해주세요.';
  } else if ($idBlock.value.length < 5) {
    $idDuplicationBlock.innerText = '아이디를 5글자 이상 입력해주세요.';
  } else {
    const response = await fetch('/id-check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: $idBlock.value,
      }),
    });

    if (response.status === 409) {
      $idDuplicationBlock.innerText = '아이디가 중복입니다.';
    } else {
      $idDuplicationBlock.innerText = '사용할 수 있는 아이디입니다.';
    }
  }
};

$idBlock.addEventListener('focusout', checkId);
