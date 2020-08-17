import axios from 'axios';
let payload = {
  token: 'U43qhZIDsnJBbrPCzn9ing',
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
