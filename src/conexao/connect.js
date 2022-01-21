const mysql = require('mysql');

module.exports = {

    incia_conexao(){
        // connection = mysql.createConnection({
        //   host: "sac-chronus.ddns.net",
        //   user: "root",
        //   password: "99659819aA",
        //   database: "sirius",
        //   charset: "utf8mb4"
        // });
        
        connection = mysql.createConnection({
          host: "ads-con.csvfil6euj3s.sa-east-1.rds.amazonaws.com",
          user: "ads",
          port: "3286",
          password: "99659819aA",
          database: "sirius",
          charset: "utf8mb4"
        });

        
        connection.connect(function(err) {
      
          if(err){
            console.log('ERRO AO ACESSAR DB --> MYSQL')
            setTimeout(incia_conexao, 2000);
          }else{
              console.log('CONECTADO DB --> MYSQL')
          }
      
        }); 
        
        connection.on('error', function(err) {
          // console.log('db error', err);
          if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            incia_conexao();       
            console.log(`PROTOCOL_CONNECTION_LOST`)                  // lost due to either server restart, or a
          } else {     
            console.log(err)                                     // connnection idle timeout (the wait_timeout
            throw err;  
                                        // server variable configures this)
          }
        });
      
      }
}