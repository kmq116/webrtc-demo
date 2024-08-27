console.log("Hello via Bun!");
import os from "os";
import selfsigned from "selfsigned";
const attrs = [{ name: "commonName", value: "contoso.com" }];
var pems = selfsigned.generate(attrs, { days: 365 });
console.log(pems);

import express from "express";
import https from "https";

const app = express();
app.use(express.static("public"));

const options = {
  key: pems.private,
  cert: pems.cert,
};

// 创建 HTTPS 服务器
const server = https.createServer(options, app);

// 在指定端口上启动服务器
server.listen(4433, () => {
  function getIPv4Address() {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
      const _interface = interfaces[interfaceName];
      for (const network of _interface) {
        if (network.family === "IPv4" && !network.internal) {
          return network.address;
        }
      }
    }
    return null;
  }

  const ipv4Address = getIPv4Address();
  console.log("IPv4 地址:", ipv4Address);
  console.log("HTTPS 服务器已启动", `https://${ipv4Address}:4433`);
  console.log(
    "HTTPS 服务器已启动",
    `https://${ipv4Address}:4433/recorder.html`
  );
  console.log("HTTPS 服务器已启动", `https://${ipv4Address}:4433/playRaw.html`);
});
