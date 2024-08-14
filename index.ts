console.log("Hello via Bun!");

var selfsigned = require('selfsigned');
var attrs = [{name: 'commonName', value: 'contoso.com'}];
var pems = selfsigned.generate(attrs, {days: 365});
console.log(pems)

const express = require('express');

const https = require('https');

const app = express();
app.use(express.static('public'));



const options = {
    key: pems.private,
    cert: pems.cert
};

// 创建 HTTPS 服务器
const server = https.createServer(options, app);

// 在指定端口上启动服务器
server.listen(4433, () => {
    console.log('HTTPS 服务器已启动', 'https://127.0.0.1:4433');
});
