const conexao = require('./src/conexao/connect');
const conexao_sql = require('./src/conexao/connect_sql');
const rotas = require('./src/rotas.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
app.use(require("cors")());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(rotas)
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);


conexao_sql.conecta_sql();
conexao.incia_conexao();



// CONEXA_HEAD.on('connect', function(err) {  

//     request = new Request("SELECT * FROM teste", function (err, rowCount, rows) {
      
//         if (err) {
//             console.log(err)
//           // Error handling.
//         } else {
//           // Next SQL statement.
//           console.table(rows)
//         }
//       });
      
//       CONEXA_HEAD.execSql(request); 
   
// });  




    server.listen(7070, function () {
        console.log(`Servidors Carregado ${server.address().port}`);
    });
  

