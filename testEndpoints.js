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
    const auth = JSON.parse(data);
    const token = auth.token;
    
    if (!token) return;

    http.get({
      hostname: 'localhost',
      port: 3000,
      path: '/api/alunos',
      headers: { 'Authorization': 'Bearer ' + token }
    }, (r) => {
      console.log('/alunos status:', r.statusCode);
      let d = ''; r.on('data', c => d+=c); r.on('end', () => console.log(d.slice(0,100)));
    });

    http.get({
      hostname: 'localhost',
      port: 3000,
      path: '/api/turmas',
      headers: { 'Authorization': 'Bearer ' + token }
    }, (r) => {
      console.log('/turmas status:', r.statusCode);
      let d = ''; r.on('data', c => d+=c); r.on('end', () => console.log(d.slice(0,100)));
    });
  });
});

req.write(loginData);
req.end();
