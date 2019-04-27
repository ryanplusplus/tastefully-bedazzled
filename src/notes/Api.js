const axios = require('axios');

const ROOT = 'https://api.myjson.com';

module.exports = () => ({
  read: async (id) =>
    await axios.get(`${ROOT}/bins/${id}`).data,

  write: async (id, content) =>
    await axios.put(`${ROOT}/bins/${id}`, content),

  create: async (content) =>
    (await axios.post(`${ROOT}/bins`, content))
      .data.uri.substring(`${ROOT}/bins/`.length)
});
