import axios from 'axios';
let payload = {
  token: 'dAtpN0V22rup1CLwzmEL3Q',
  data: {
    user: 'personNickname',
    datetime: 'dateTime|UNIX',
    amount: 'numberInt',
    _repeat: 10,
  },
};

export default axios({
  method: 'post',
  url: 'https://app.fakejson.com/q',
  data: payload,
});
