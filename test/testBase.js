import axios from 'axios';

const startServer = (done) => {
  process.env.NODE_ENV = 'test';
  require('../src/app');
  done();
};

const axiosIns = axios.create({
  baseURL: `http://localhost:${process.env.PORT}`,
  timeout: 5000,
});

module.exports = {
  startServer,
  axiosIns,
};
