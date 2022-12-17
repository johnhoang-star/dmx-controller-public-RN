export default function selectDisplayName(nickname, id) {
  if (nickname == '') {
    return id;
  } else {
    return nickname;
  }
}
