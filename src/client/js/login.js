const $id = document.querySelector('.login-container__id');
const $pw = document.querySelector('.login-container__pw');

const login = (e) => {
  if (!$id.value) {
    e.preventDefault();
    alert('아이디를 입력해주세요');
    $id.focus();
    return false;
  }

  if (!$pw.value) {
    e.preventDefault();
    alert('비밀번호를 입력해주세요');
    $pw.focus();
    return false;
  }

  return true;
};
