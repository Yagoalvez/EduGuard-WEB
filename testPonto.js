const http = require('http');

const loginData = JSON.stringify({ login: 'Romulo@diretor.com', senha: '12345678' });

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': loginData.length
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Login response:', data);
    const auth = JSON.parse(data);
    const token = auth.token;
    
    if (!token) return;

    const getReq = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/ponto?data=' + new Date().toISOString().split('T')[0],
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    }, (res2) => {
      let data2 = '';
      res2.on('data', (chunk) => { data2 += chunk; });
      res2.on('end', () => {
        console.log('Ponto Status:', res2.statusCode);
        console.log('Ponto Response:', data2.slice(0, 1000));
      });
    });
    getReq.end();
  });
});

req.write(loginData);
req.end();
