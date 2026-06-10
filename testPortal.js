const puppeteer = require('puppeteer');
const http = require('http');

(async () => {
  const loginData = JSON.stringify({ login: 'marianorocha@gmail.com', senha: '12345678' });
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': loginData.length }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      console.log('Login Status:', res.statusCode);
      const auth = JSON.parse(data);
      const token = auth.token;
      if (!token) {
        console.log('No token! Auth resp:', data);
        return;
      }
      console.log('Login successful, token starts with:', token.substring(0, 10));

      http.get({
        hostname: 'localhost',
        port: 3000,
        path: '/api/responsaveis/me/alunos-com-turma',
        headers: { 'Authorization': 'Bearer ' + token }
      }, (r) => {
        console.log('Alunos status:', r.statusCode);
        let d = ''; r.on('data', c => d+=c); r.on('end', () => console.log('Alunos:', d.slice(0,300)));
      });

      http.get({
        hostname: 'localhost',
        port: 3000,
        path: '/api/comunicacao',
        headers: { 'Authorization': 'Bearer ' + token }
      }, (r) => {
        console.log('Comunicados status:', r.statusCode);
        let d = ''; r.on('data', c => d+=c); r.on('end', () => console.log('Comunicados:', d.slice(0,300)));
      });
    });
  });

  req.write(loginData);
  req.end();

})();
