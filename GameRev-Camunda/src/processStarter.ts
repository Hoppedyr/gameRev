import fetch from 'node-fetch';
import { CAMUNDA_PROCESS_NAME, CAMUNDA_URL } from './constants';

if (process.argv.length <= 2) {
  console.log('please pass a review after the file name');
  console.log('hint - The bad word is "shit"');
}

const url = `${CAMUNDA_URL}/process-definition/key/${CAMUNDA_PROCESS_NAME}/start`;
const methodParam = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    variables: {
      review: {
        value: process.argv[2],
        type: 'string',
      },
    },
  }),
};

fetch(url, methodParam)
  .then((response) => console.log(response))
  .catch(function (error) {
    console.log(error);
  });
