# Node e NPM

* `node -v`         Verificar a versão do node
* `npm -v`          Verificar a versão do npm

# Criando uma aplicação com Express

* `npm init -y`             Inicializa o npm
* `npm install express`     Instala o Express para a sua aplicação
* `server.js`               Criar o arquivo que será o server Backend

*   //utilizar o framework Express
    const express = require("express");
    const server = express();

    //ligar o servidor local na porta 3300 - localhost:3300
    server.listen(3300);

* `node server.js`          Testa se o serviço esta OK

* editar o arquivo package.json na seção scripts, criar atalho para o arquivo do servidor
    "scripts": {
        "start": "node src/server.js"
    },


* `npm start`               Inicia o servidor ao invés de `node server.js`

* Pode-se install um inicializador automático para o servidor para não ter que fazer isso toda vez que mudar o código

* `npm install nodemon -D`         Automatiza o restart do servidor node mon(inotaramento), somente para desenvolvimento

* Alterar o script no arquivo package.json para inicializar com o nodemon

    "scripts": {
        "start": "nodemon src/server.js"
    },

* `npm start`               Restart o servidor com as alterações

* `template engine`     Interagir com o HTML com programação, condicionais e outras interações no caso será usado o `NunJucks.js`

* `npm install nunjucks`    Instalar o NunJucks.js - HTML com superpoderes

* `npm install sqlite3`     Instalar o SQLite3 na nossa aplicação