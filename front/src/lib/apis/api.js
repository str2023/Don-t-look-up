import axios from 'axios';

const backendPortNumber = '5001';
const serverUrl = `http://${window.location.hostname}:${backendPortNumber}`;

async function get(endpoint, params) {
  console.log('params', params);
  console.log(`%cGET 요청 ${`${serverUrl + endpoint}${params}`}`, 'color: #a25cd1;');

  return axios
    .get(`${serverUrl + endpoint}`, {
      // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
      },
      params,
    })
    .then((res) => res.data);
}

async function post(endpoint, data) {
  const bodyData = JSON.stringify(data);
  console.log(`%cPOST 요청: ${serverUrl + endpoint}`, 'color: #296aba;');
  console.log(`%cPOST 요청 데이터: ${bodyData}`, 'color: #296aba;');

  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
    },
  });
}

async function put(endpoint, data) {
  const bodyData = JSON.stringify(data);
  console.log(`%cPUT 요청: ${serverUrl + endpoint}`, 'color: #059c4b;');
  console.log(`%cPUT 요청 데이터: ${bodyData}`, 'color: #059c4b;');

  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
    },
  });
}

async function patch(endpoint, data) {
  const bodyData = JSON.stringify(data);
  console.log(`%Patch 요청: ${serverUrl + endpoint}`, 'color: #059c4b;');
  console.log(`%Patch 요청 데이터: ${bodyData}`, 'color: #059c4b;');

  return axios.patch(serverUrl + endpoint, bodyData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
    },
  });
}

async function del(endpoint, params = '') {
  console.log(`DELETE 요청 ${`${serverUrl + endpoint}/${params}`}`);
  return axios.delete(`${serverUrl + endpoint}/${params}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
    },
  });
}

export { get, post, put, patch, del as delete };
