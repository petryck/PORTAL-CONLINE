const express = require('express');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  
const router = express.Router();
const mysql = require('mysql');
var nodemailer = require('nodemailer');
// var nodemailer = require('nodemailer');

// var remetente = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   service: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth:{
//   user: 'petryck.leite@conlinebr.com.br',
//   pass: 'hardking99659819' }
//   });


//   function enviar_email(texto){

//     mailOptions = {
//       from: 'no-reply@conlinebr.com.br',
//       to: 'ti@conlinebr.com.br',
//       subject: '[no-reply] - Novo chamado aberto',
//       text: texto
//     };

//     remetente.sendMail(mailOptions, function(error){
//       if (error) {
//       console.log(error);
//       } else {
//       console.log('Email enviado com sucesso.');
//       }
//       });
//   }

 



const appRoot = require('app-root-path');
router.use(express.static(appRoot + '/public'));
http = require('https')






// HOME
router.get('/', function (req, res) {
  res.sendFile(appRoot + '/public/home.html');
  
});

router.get('/login', function (req, res) {

  res.sendFile(appRoot + '/public/ltr/login/login.html');
});


router.get('/pages_processos', function (req, res) {
  let referencia = req.query.ref;


  res.render(appRoot + '/src/paginas/doc_processo.html', {name:referencia});

  

  // res.sendFile(appRoot + '/src/paginas/doc_processo.html?ref='+referencia);
});

router.get('/doc_financeiro', function (req, res) {

  res.sendFile(appRoot + '/src/paginas/doc_financeiro.html');
});



router.get('/headcargo_api_all', function (req, res) {
  let referencia = req.query.ref;

  if(referencia == null || referencia == '' || referencia == undefined || referencia == 'all'){
    sql = `SELECT * FROM vis_Tracking_Portal WHERE Numero_Processo = 'EM0150-21'`
    // sql = `SELECT TOP 100 * FROM vis_Tracking_Portal ORDER BY IdLogistica_House DESC`
  }else{

  }
  var trans = [];

  CONEXA_HEAD.execSql(new Request(sql, function(err, rowCount, rows){
    if(err) {
        throw err;
    }
}).on('doneInProc',function(rowCount_transbodo, more2, rows_transbodo){
 
  
  var contun2 = 0;
  rows_transbodo.forEach(function (column_trans) {
    trans[contun2] = {};
    column_trans.forEach(function (column_trans_entro) {
      // console.log(column_trans_entro.metadata.colName)

      if(column_trans_entro.value == null){
        column_trans_entro.value = '';
      }

      trans[contun2][column_trans_entro.metadata.colName] = column_trans_entro.value;

      // console.log(column_trans_entro.metadata.colName, column_trans_entro.value)
    });

    contun2 = contun2 + 1;
  })

  //  console.log(trans)
  // console.log(driver)
  

  }).on('requestCompleted',function(rowCount, more, rows){
   
    res.json(trans);
    
  }));

  

  
})
router.get('/headcargo_api', function (req, res) {
  let referencia = req.query.ref;

  if(referencia == null || referencia == '' || referencia == undefined || referencia == 'all'){
    sql = `SELECT TOP 100 * FROM vis_Tracking_Portal`
  
  }else{
    sql = `SELECT * FROM vis_Tracking_Portal WHERE Numero_Processo = '${referencia}'`
  }
  

  CONEXA_HEAD.execSql(new Request(sql, 
                                    function(err, rowCount, rows){
    if(err) {
        throw err;
    }
})
.on('doneInProc',function(rowCount, more, rows){

 
  driver = {};
  var contun = 0;
  rows.forEach(function (column) {

   
    column.forEach(function (result) {
 
      driver[result.metadata.colName] = result.value
      // driver.push(result.metadata.colName,result.value)
    })

    contun = contun + 1;
  })  
  
  // console.log(driver) 

}).on('requestCompleted',function(rowCount, more, rows){



  if(Object.keys(driver).length == 0){
    res.json('processo_nao_existe');
  
    return false;
  }

  // if(driver.Modalidade == 'IA' || driver.Modalidade == 'EA' ){
  //   tabela = 'vis_Tracking_Cliente_Escala';
  //   }else{
  //   tabela = 'vis_Tracking_Cliente_Transbordo';
  //   }

    tabela = 'vis_Equipamento_Processo';
    
    
          CONEXA_HEAD.execSql(new Request(`SELECT * FROM `+tabela+` WHERE IdLogistica_House = '${driver.IdLogistica_House}'`, function(err, rowCount, rows){
              if(err) {
                  throw err;
              }
          }).on('doneInProc',function(rowCount_transbodo, more2, rows_transbodo){
           
            var trans = [];
            var contun2 = 0;
            rows_transbodo.forEach(function (column_trans) {
              trans[contun2] = {};
              column_trans.forEach(function (column_trans_entro) {
                // console.log(column_trans_entro.metadata.colName)
        
                if(column_trans_entro.value == null){
                  column_trans_entro.value = '';
                }

                trans[contun2][column_trans_entro.metadata.colName] = column_trans_entro.value;

                // console.log(column_trans_entro.metadata.colName, column_trans_entro.value)
              });

              contun2 = contun2 + 1;
            })


            driver['equipamentos'] = trans;
         
          
            //  console.log(trans)

            // console.log(driver)
           
           
            res.json(driver);   
            }));
            
                    
})
);

});

router.get('/headcargo', function (req, res) {

  let coluna = req.query.col;

  if(coluna == undefined){
    let coluna = '';
    saida = {
      status: false,
      return: 'parametro coluna não deve ser vazio',
      }
    res.json(saida);
    return false;
  }

  

  CONEXA_HEAD.execSql(new Request("SELECT * FROM "+coluna, function(err, rowCount, rows){
    if(err) {
        throw err;
    }
})
.on('doneInProc',function(rowCount, more, rows){
  driver = [];
  rows.forEach(function (column) {

    column.forEach(function (result) {
      driver.push(result.metadata.colName,result.value)
    })
 
        
    });

  res.json(driver);

})
);

});

// INFO EMPRESA
router.get('/query_empresa', function (req, res) {

  empresa = req.query.empresa;
 

  var sql = "SELECT * FROM empresas_logo WHERE id_empresa = "+empresa+" LIMIT 1";


  connection.query(sql, function(err2, results){
    // console.log(sql)
    // console.log(results)
   


    CONEXA_HEAD.execSql(new Request("SELECT * FROM cad_Pessoa WHERE IdPessoa = "+empresa, function(err, rowCount, rows){
      if(err) {
          throw err;
      }
  })
  .on('doneInProc',function(rowCount, more, rows){
    driver = {};

    rows.forEach(function (column) {
  
      column.forEach(function (result) {
        driver[result.metadata.colName] = result.value;
      })
   
          
      });


      driver['img'] = results[0]['img'];
      res.json(driver);
  
  })
  );
       
  })

  

});


// LOGIN PAGE
router.get('/acessos_empresa', function (req, res) {

  empresa = req.query.empresa;

 

  var sql = `SELECT * FROM usuarios WHERE empresa = '${empresa}'`;


  connection.query(sql, function(err2, results){

    res.json(results);
       
  })

});


// INFO_USUARIO
router.get('/info_usuario', function (req, res) {

  id = req.query.id;

 

  var sql = `SELECT * FROM usuarios WHERE idusuarios = '${id}'`;


  connection.query(sql, function(err2, results){

    res.json(results);
       
  })

});


// LOGIN PAGE
router.get('/query_login', function (req, res) {

  email = req.query.username;
  password = req.query.password;

 

  var sql = `SELECT * FROM usuarios WHERE email = '${email}' AND senha = '${password}' LIMIT 1`;


  connection.query(sql, function(err2, results){
  
    if(results){
      if(results.length > 0){
        res.json(results);
      
      }else{
        res.json('error');
      }
    }else{
      res.json('error');
    }
      
       
  })

});

// CONSULTA TESTE
router.get('/consulta', function (req, res) {

  var sql = 'SELECT * FROM usuarios';

  connection.query(sql, function(err2, results){

       res.json(results);
  })

});

// CONVERTER HORA DO BANCO DE DADOS TIMESTAMP
// function dataAtualFormatada(Data_atual){
//   var data = new Date(Data_atual * 1000);
//       dia  = data.getDate().toString().padStart(2, '0'),
//       mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
//       ano  = data.getFullYear();
//   console.log(dia+"/"+mes+"/"+ano);
// }

function time_system(tempo){

  var data = new Date(tempo*1000);
  // dia  = data.getDate().toString().padStart(2, '0'),
  // mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
  // ano  = data.getFullYear();

  day = ["Domingo", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][data.getDay()];
  date = data.getDate();
  month = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][data.getMonth()];
  year = data.getFullYear();
  hours = data.getHours();
  min = data.getMinutes();

  return `${day}, ${date} de ${month} de ${year} ${hours}:${min}`;
  

}

function time_fomatado(tempo){

  var data = new Date(tempo*1000);
  // dia  = data.getDate().toString().padStart(2, '0'),
  // mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
  // ano  = data.getFullYear();

  day = ["Domingo", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][data.getDay()];
  date = data.getDate();
  month = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][data.getMonth()];
  year = data.getFullYear();
  hours = data.getHours();
  min = data.getMinutes();
  data.getMonth()
  
  return `0${data.getMonth()+1}-${date}-${year}`;
  // return `${date}-${data.getMonth()+1}-${year}`;
  

}



module.exports = router;