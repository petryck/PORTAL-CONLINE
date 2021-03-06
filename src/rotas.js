const express = require('express');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  
const router = express.Router();
const mysql = require('mysql');
var nodemailer = require('nodemailer');
const request = require("request-promise");

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
const { Console } = require('console');
router.use(express.static(appRoot + '/public'));
http = require('https')






// HOME
router.get('/', function (req, res) {
  res.sendFile(appRoot + '/public/home.html');
  
});

router.get('/gerencia', function (req, res) {
  
  if(req.query.login == 'admin' && req.query.senha == 'conline2510@'){
    res.sendFile(appRoot + '/public/gerencia.html');
  }else{
    res.json('acesso negado')
  }
  
  
  
});

router.get('/login', function (req, res) {

  res.sendFile(appRoot + '/public/login.html');
});

router.get('/globo', function (req, res) {

  res.sendFile(appRoot + '/public/globo.html');
});


router.get('/liberacoes', function (req, res) {

  res.sendFile(appRoot + '/public/pages/liberacoes.html');
});

router.get('/lista_usuarios_portal', function (req, res) {

  res.sendFile(appRoot + '/public/pages/usuarios.html');
});



router.get('/pages_processos', function (req, res) {
  let referencia = req.query.ref;


  res.render(appRoot + '/src/paginas/doc_processo.html', {name:referencia});

  

  // res.sendFile(appRoot + '/src/paginas/doc_processo.html?ref='+referencia);
});

router.get('/doc_financeiro', function (req, res) {

  res.sendFile(appRoot + '/src/paginas/doc_financeiro.html');
});


function teste(){
  trans = [];
  sql = `SELECT * FROM cad_Pais`;

CONEXA_HEAD.execSql(new Request(sql, function(err, rowCount, rows){
  if(err) {
      throw err;
  }
}).on('doneInProc',function(rowCount_transbodo, more2, rows_transbodo){
  var contun2 = 0;
  
  rows_transbodo.forEach(function (column_trans) {
    trans[contun2] = {};
    saida[contun2] = {};
    
    column_trans.forEach(function (column_trans_entro) {
    
      if(column_trans_entro.value == null){
        column_trans_entro.value = '';
      }
      
 
      // if(column_trans_entro.metadata.colName == 'Mes_Proposta'){
      //   saida.push(column_trans_entro.value)
      // }

      trans[contun2][column_trans_entro.metadata.colName] = column_trans_entro.value;

      // if(column_trans_entro.metadata.colName == 'Nome_Internacional'){

       

      // }


    

    });


   
   
    // saida[contun2]['latLng'] = [-10.3333333, -53.2];
  

    contun2 = contun2 + 1;
  })

}).on('requestCompleted',function(rowCount, more, rows){
// console.log(trans)
contagem = 800;

trans.forEach(element => {
  saida_123 = contagem+''+0000
// console.log(saida_123)

  setTimeout(() => {
  
    const uri = 'http://nominatim.openstreetmap.org/search.php?q='+element.Nome+'&format=jsonv2';
const encoded = encodeURI(uri);
  request({
      url: encoded,
      json: true
    }, function(error, response, body) {

      if(body.length != 0){
        var lat = body[0]['lat'];
        var long = body[0]['lon'];
    
    sql2 = `UPDATE 
      cad_Pais
      SET
        Latitude = '${lat}',
        Logitude = '${long}'
      WHERE
        IdPais = '${element.IdPais}'`;
        // console.log(sql2)
      
      // CONEXA_HEAD.execSql(new Request(sql2))
    
      console.log(element.IdPais)
    
      CONEXA_HEAD.execSql(new Request(sql2, function(err, rowCount, rows){
        if(err) {
            throw err;
        }
    }).on('doneInProc',function(rowCount_transbodo, more2, rows_transbodo){
    
    }).on('requestCompleted',function(rowCount, more, rows){
    
    }));
    
    
  
    
        console.log('foi altera????o')
    
      }
     
    });

  
  
    // var lat = result_final[0]['lat'];
    // var long = result_final[0]['lon'];


  }, saida_123);
  contagem = contagem+800;
});
  // f1(name, IdPais)
}));

}


router.get('/estatisticas_paises', function (req, res) { 
  
  // teste()

  var empresa = req.query.empresa;

  trans = [];
  saida = [];

    // sql = `SELECT * FROM vis_Tracking_Portal_Mes_Pais WHERE IdCliente = '`+empresa+`' ORDER BY QtdProcessoTotal DESC`;


    sql = `Select
    Pod.IdPais,
    Pod.Nome_Internacional as Pais,
    Concat('[', Pod.Latitude, ',', Pod.Logitude, ']') as Coordenadas,
    Pod.Latitude,
    Pod.Logitude,
    Count(Lhs.IdLogistica_House) as QtdProcessoTotal
  FROM
    mov_Logistica_House Lhs
    JOIN vis_Cliente Clt on Clt.IdPessoa = Lhs.IdCliente
    Left Outer JOIN (
      Select
        Lms.IdLogistica_Master,
        CASE
          When Lms.Tipo_Operacao = 1 Then Lms.IdDestino_Final
          Else Lms.IdOrigem
        End as IdOrigem_Destino
      From
        mov_Logistica_Master Lms
    ) Ord on Ord.IdLogistica_Master = Lhs.IdLogistica_Master
    Left Outer JOIN cad_Origem_Destino Ods on Ods.IdOrigem_Destino = Ord.IdOrigem_Destino
    Left Outer JOIN cad_Pais Pod on Pod.IdPais = Ods.IdPais
  WHERE
    Lhs.Numero_Processo not like '%test%'
    AND Lhs.Situacao_Agenciamento not in (7)
    AND (IdCliente = '`+empresa+`' OR IdImportador = ${empresa} OR IdExportador = ${empresa})
  GROUP BY
    Pod.Nome_Internacional,
    Pod.IdPais,
    Pod.Latitude,
    Pod.Logitude
    ORDER BY QtdProcessoTotal DESC`;


  CONEXA_HEAD.execSql(new Request(sql, function(err, rowCount, rows){
    if(err) {
        throw err;
    }
}).on('doneInProc',function(rowCount_transbodo, more2, rows_transbodo){
  var contun2 = 0;
  
  rows_transbodo.forEach(function (column_trans) {
    trans[contun2] = {};
    saida[contun2] = {};
    
    column_trans.forEach(function (column_trans_entro) {
    
      if(column_trans_entro.value == null){
        column_trans_entro.value = '';
      }
      
 
      // if(column_trans_entro.metadata.colName == 'Mes_Proposta'){
      //   saida.push(column_trans_entro.value)
      // }

      trans[contun2][column_trans_entro.metadata.colName] = column_trans_entro.value;

      if(column_trans_entro.metadata.colName == 'Pais'){

        saida[contun2]['name'] = column_trans_entro.value;

      }

      if(column_trans_entro.metadata.colName == 'Coordenadas'){

        saida[contun2]['latLng'] = JSON.parse(column_trans_entro.value);
        
     

      }


      if(column_trans_entro.metadata.colName == 'QtdProcessoTotal'){
        saida[contun2]['processos'] = column_trans_entro.value;
      }


    });


   
   
    // saida[contun2]['latLng'] = [-10.3333333, -53.2];
  

    contun2 = contun2 + 1;
  })


}).on('requestCompleted',function(rowCount, more, rows){






res.json(saida);

 


 
}));


})



async function f1(name, idPais) {


  // return true;

  
  let result_final = await request({
    url: 'http://nominatim.openstreetmap.org/search.php?q='+name+'&format=jsonv2',
    json: true
  }, function(error, response, body) {


    trans = [];
  
  

  

    
  });

  var lat = result_final[0]['lat'];
  var long = result_final[0]['lon'];



}







router.get('/estatisticas', function (req, res) {

  var empresa = req.query.empresa;

  trans = [];

    // sql = `SELECT * FROM vis_Tracking_Portal_Mes WHERE IdCliente = '`+empresa+`' ORDER BY Ano_Proposta, Mes_Proposta ASC`;

    sql = `Select
    Count(Lhs.IdLogistica_House) as QtdProcessoTotal,
    Sum(
      Case
        When Lms.Situacao_Embarque = 0 Then 1
        else 0
      End
    ) as QtdPreProcesso,
    Sum(
      Case
        When Lms.Situacao_Embarque in (1,0,5,6,7,8,9,10,11,12,4) Then 1
        else 0
      End
    ) as QtdAgEmbarque,
    Sum(
      Case
        When Lms.Situacao_Embarque = 2 Then 1
        else 0
      End
    ) as QtdEmbarcado,
    Sum(
      Case
        When Lms.Situacao_Embarque = 3 Then 1
        else 0
      End
    ) as QtdDesembarcado,
    Sum(
      Case
        When Lms.Situacao_Embarque = 4 Then 1
        else 0
      End
    ) as QtdCancelado,
    Sum(
      Case
        When Lms.Situacao_Embarque = 5 Then 1
        else 0
      End
    ) as QtdPendente,
    Sum(
      Case
        When Lms.Situacao_Embarque = 6 Then 1
        else 0
      End
    ) as QtdAutorizado,
    Sum(
      Case
        When Lms.Situacao_Embarque = 7 Then 1
        else 0
      End
    ) as QtdColetado,
    Sum(
      Case
        When Lms.Situacao_Embarque = 8 Then 1
        else 0
      End
    ) as QtdEntregue,
    Sum(
      Case
        When Lms.Situacao_Embarque = 9 Then 1
        else 0
      End
    ) as QtdAgProntMercadoria,
    Sum(
      Case
        When Lms.Situacao_Embarque = 10 Then 1
        else 0
      End
    ) as QtdAgBookingFin,
    Sum(
      Case
        When Lms.Situacao_Embarque = 11 Then 1
        else 0
      End
    ) as QtdAgColeta,
    Sum(
      Case
        When Lms.Situacao_Embarque = 12 Then 1
        else 0
      End
    ) as QtdAgEntrega,
    Right(
      Convert(char(7), Lhs.Data_Abertura_Processo, 111),
      2
    ) as Mes_Proposta,
    Left(
      Convert(char(7), Lhs.Data_Abertura_Processo, 111),
      4
    ) as Ano_Proposta
  FROM
    mov_Logistica_House Lhs
    JOIN vis_Cliente Clt on Clt.IdPessoa = Lhs.IdCliente
    Left Outer JOIN mov_Logistica_Master Lms on Lms.IdLogistica_Master = Lhs.IdLogistica_Master
  WHERE
    Lhs.Numero_Processo not like '%test%'
    AND Lhs.Situacao_Agenciamento not in (7)
    AND (IdCliente = '`+empresa+`' OR IdImportador = ${empresa} OR IdExportador = ${empresa})
  GROUP BY
    Right(
      Convert(char(7), Lhs.Data_Abertura_Processo, 111),
      2
    ),
    Left(
      Convert(char(7), Lhs.Data_Abertura_Processo, 111),
      4
    ) ORDER BY Ano_Proposta, Mes_Proposta ASC`;

  CONEXA_HEAD.execSql(new Request(sql, function(err, rowCount, rows){
    if(err) {
        throw err;
    }
}).on('doneInProc',function(rowCount_transbodo, more2, rows_transbodo){
  var contun2 = 0;
  
  rows_transbodo.forEach(function (column_trans) {
    trans[contun2] = {};
    
    column_trans.forEach(function (column_trans_entro) {
    
      if(column_trans_entro.value == null){
        column_trans_entro.value = '';
      }
      
 
      // if(column_trans_entro.metadata.colName == 'Mes_Proposta'){
      //   saida.push(column_trans_entro.value)
      // }

      trans[contun2][column_trans_entro.metadata.colName] = column_trans_entro.value;

    });

    contun2 = contun2 + 1;
  })

}).on('requestCompleted',function(rowCount, more, rows){
  
  saida = {};
  saida['mes'] = [];
  saida['quantidade'] = [];
  saida['QtdEmbarcado_Total'] = 0;
  saida['QtdAgEmbarque_Total'] = 0;
  saida['QtdDesembarcado_Total'] = 0;
  saida['QtdProcesso_Total'] = 0;

  
  
  
  


  meses = {
    '01': 'Jan',
    '02': 'Fev',
    '03': 'Mar',
    '04': 'Abr',
    '05': 'Mai',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Ago',
    '09': 'Set',
    '10': 'Out',
    '11': 'Nov',
    '12': 'Dez',
    '13': 'Error'
  }




  
  trans.forEach(element => {
    saida['QtdDesembarcado_Total'] = element.QtdDesembarcado+saida['QtdDesembarcado_Total'];
    saida['QtdAgEmbarque_Total'] = element.QtdAgEmbarque+saida['QtdAgEmbarque_Total'];
    saida['QtdEmbarcado_Total'] = element.QtdEmbarcado+saida['QtdEmbarcado_Total'];
    saida['QtdProcesso_Total'] = element.QtdProcessoTotal+saida['QtdProcesso_Total'];
    saida['mes'].push(meses[element.Mes_Proposta]+'-'+ element.Ano_Proposta)
    saida['quantidade'].push(element.QtdProcessoTotal)

  });




  res.json(saida);
 
  
}));


})

router.get('/headrcargo_filtros', function (req, res) {

  var empresa = req.query.empresa;
  var retornos = req.query.opcoes;
  var saida_sql = 'WHERE ';
  var saida_where = false;
  var saida_and = false;



  if(retornos.tipo_filtro){

    

    if(retornos.tipo_filtro == 'Abertura'){
      if(retornos.data_de != '' && retornos.data_ate != ''){
      
        if(saida_and != true){
          var data_de = data_americana(retornos.data_de);
          var data_ate = data_americana(retornos.data_ate);
          
          saida_sql += `Data_Abertura_Convertido between '`+data_de+`' and '`+data_ate+`'`;
          saida_where = true;
          saida_and = true;
        }else{
          saida_sql += `AND Data_Abertura_Convertido between '`+data_de+`' and '`+data_ate+`'`;
          saida_where = true;
          saida_and = true;
        }
  
      }
    }

    if(retornos.tipo_filtro == 'ETD'){
      if(retornos.data_de != '' && retornos.data_ate != ''){
      
        if(saida_and != true){
          var data_de = data_americana(retornos.data_de);
          var data_ate = data_americana(retornos.data_ate);
          
          saida_sql += `ETD_Convertido between '`+data_de+`' and '`+data_ate+`'`;
          saida_where = true;
          saida_and = true;
        }else{
          saida_sql += `AND ETD_Convertido between '`+data_de+`' and '`+data_ate+`'`;
          saida_where = true;
          saida_and = true;
        }
  
      }
    }


    if(retornos.tipo_filtro == 'ETA'){
      if(retornos.data_de != '' && retornos.data_ate != ''){
      
        if(saida_and != true){
          var data_de = data_americana(retornos.data_de);
          var data_ate = data_americana(retornos.data_ate);
          
          saida_sql += `ETA_Convertido between '`+data_de+`' and '`+data_ate+`'`;
          saida_where = true;
          saida_and = true;
        }else{
          saida_sql += `AND ETA_Convertido between '`+data_de+`' and '`+data_ate+`'`;
          saida_where = true;
          saida_and = true;
        }
  
      }
    }


    

    if(retornos.tipo_filtro == 'Pagamento'){
      if(retornos.data_de != '' && retornos.data_ate != ''){
      
        if(saida_and != true){
          var data_de = data_americana(retornos.data_de);
          var data_ate = data_americana(retornos.data_ate);
          
          saida_sql += `Data_Pagamento_Local_Convertido between '`+data_de+`' and '`+data_ate+`'`;
          saida_where = true;
          saida_and = true;
        }else{
          saida_sql += `AND Data_Pagamento_Local_Convertido between '`+data_de+`' and '`+data_ate+`'`;
          saida_where = true;
          saida_and = true;
        }
  
      }
    }
  }



    if(retornos.referencia != '0'){
      if(saida_and != true){
        saida_sql += `Numero_Processo = '`+retornos.referencia+`' OR Referencia_Cliente = '`+retornos.referencia+`'`;
        saida_where = true;
        saida_and = true;
      }else{
        saida_sql += `AND Numero_Processo = '`+retornos.referencia+`' OR Referencia_Cliente = '`+retornos.referencia+`'`;
        saida_where = true;
        saida_and = true;
      }
      
    }


    if(retornos.equipamento != '0'){
      if(saida_and != true){
        saida_sql += `Tipo_Carga = '`+retornos.equipamento+`'`;
        saida_where = true;
        saida_and = true;
      }else{
        saida_sql += `AND Tipo_Carga = '`+retornos.equipamento+`'`;
        saida_where = true;
        saida_and = true;
      }
      
    }


    

    if(retornos.origem != '0'){
      if(saida_and != true){
      saida_sql += `Origem = '`+retornos.origem+`'`;
      saida_where = true;
      saida_and = true;
      }else{
        saida_sql += `AND Origem = '`+retornos.origem+`'`;
        saida_where = true;
        saida_and = true;
      }
    }

    if(retornos.destino != '0'){
      if(saida_and != true){
      saida_sql += `Destino = '`+retornos.destino+`'`;
      saida_where = true;
      saida_and = true;
      }else{
        saida_sql += `AND Destino = '`+retornos.destino+`'`;
        saida_where = true;
        saida_and = true;
      }
    }

    if(retornos.armador != '0'){
      if(saida_and != true){
      saida_sql += `Cia_Transporte = '`+retornos.armador+`'`;
      saida_where = true;
      saida_and = true;
      }else{
        saida_sql += `AND Cia_Transporte = '`+retornos.armador+`'`;
        saida_where = true;
        saida_and = true;
      }
    }


    if(retornos.importador != '0'){
      if(saida_and != true){
      saida_sql += `Importador = '`+retornos.importador+`'`;
      saida_where = true;
      saida_and = true;
      }else{
        saida_sql += `AND Importador = '`+retornos.importador+`'`;
        saida_where = true;
        saida_and = true;
      }
    }

    if(retornos.exportador != '0'){
      if(saida_and != true){
      saida_sql += `Exportador = '`+retornos.exportador+`'`;
      saida_where = true;
      saida_and = true;
      }else{
        saida_sql += `AND Exportador = '`+retornos.exportador+`'`;
        saida_where = true;
        saida_and = true;
      }
    }

    if(retornos.mercadoria != '0'){
      if(saida_and != true){
      saida_sql += `Mercadoria = '`+retornos.mercadoria+`'`;
      saida_where = true;
      saida_and = true;
      }else{
        saida_sql += `AND Mercadoria = '`+retornos.mercadoria+`'`;
        saida_where = true;
        saida_and = true;
      }
    }

    if(retornos.hbl != '0'){
      if(saida_and != true){
      saida_sql += `House = '`+retornos.hbl+`'`;
      saida_where = true;
      saida_and = true;
      }else{
        saida_sql += `AND House = '`+retornos.hbl+`'`;
        saida_where = true;
        saida_and = true;
      }
    }

    if(retornos.booking != '0'){
      if(saida_and != true){
      saida_sql += `Numero_Reserva = '`+retornos.booking+`'`;
      saida_where = true;
      saida_and = true;
      }else{
        saida_sql += `AND Numero_Reserva = '`+retornos.booking+`'`;
        saida_where = true;
        saida_and = true;
      }
    }


    if(retornos.navio_viagem != '0'){
      if(saida_and != true){
        saida_sql += `Viagem_Navio = '`+retornos.navio_viagem+`' OR Navio = '`+retornos.navio_viagem+`'`;
        saida_where = true;
        saida_and = true;
      }else{
        saida_sql += `AND Viagem_Navio = '`+retornos.navio_viagem+`' OR Navio = '`+retornos.navio_viagem+`'`;
        saida_where = true;
        saida_and = true;
      }
      
    }

    if(retornos.status != 'vazio'){
      if(saida_and != true){
      saida_sql += `Situacao_Embarque_Codigo = `+retornos.status+``;
      saida_where = true;
      saida_and = true;
      }else{
        saida_sql += `AND Situacao_Embarque_Codigo = `+retornos.status+``;
        saida_where = true;
        saida_and = true;
      }
    }


  var trans = [];

    if(saida_and != true){
    sql = `SELECT * FROM vis_Tracking_Portal `+saida_sql+` IdCliente = `+empresa+` OR IdImportador = ${empresa} OR IdExportador = ${empresa} ORDER BY Data_Abertura_Convertido DESC`;
    }else{
    sql = `SELECT * FROM vis_Tracking_Portal `+saida_sql+` AND (IdCliente = `+empresa+` OR IdImportador = ${empresa} OR IdExportador = ${empresa}) ORDER BY Data_Abertura_Convertido DESC`;
    }

  


  CONEXA_HEAD.execSql(new Request(sql, function(err, rowCount, rows){
    if(err) {
        throw err;
    }
}).on('doneInProc',function(rowCount_transbodo, more2, rows_transbodo){

  var contun2 = 0;
  rows_transbodo.forEach(function (column_trans) {
    trans[contun2] = {};
    column_trans.forEach(function (column_trans_entro) {

      if(column_trans_entro.value == null){
        column_trans_entro.value = '';
      }

      trans[contun2][column_trans_entro.metadata.colName] = column_trans_entro.value;

    });

    contun2 = contun2 + 1;
  })

}).on('requestCompleted',function(rowCount, more, rows){

  res.json(trans);
  
}));
  
})


router.get('/headrcargo_criar_filtros', function (req, res) {
  
  let empresa = req.query.empresa;

  sql = `SELECT * FROM vis_Tracking_Portal WHERE IdCliente = ${empresa} OR IdImportador = ${empresa} OR IdExportador = ${empresa} ORDER BY Data_Abertura_Convertido DESC`
  var trans = {};
  trans['Numero_Processo'] = [];
  trans['Mercadoria'] = [];
  trans['Viagem_Navio'] = [];
  trans['Cia_Transporte'] = [];
  trans['Referencia'] = [];
  trans['Destino_Final'] = [];
  trans['Origem'] = [];
  trans['House'] = [];
  trans['Numero_Reserva'] = [];
  trans['Importador'] = [];
  trans['Exportador'] = [];
  trans['Equipamento'] = [];
  
  
  

  CONEXA_HEAD.execSql(new Request(sql, function(err, rowCount, rows){
    if(err) {
        throw err;
    }
}).on('doneInProc',function(rowCount_transbodo, more2, rows_transbodo){
  var contun2 = 0;
  rows_transbodo.forEach(function (column_trans) {
    
    column_trans.forEach(function (column_trans_entro) {
      // console.log(column_trans_entro.metadata.colName)

      if(column_trans_entro.value == null){
        column_trans_entro.value = '';
      }
      
      if(column_trans_entro.metadata.colName == 'Numero_Processo'){
        trans['Numero_Processo'].push(column_trans_entro.value)
        // trans[contun2]['Numero_Processo'] = column_trans_entro.value;
      
      }

      if(column_trans_entro.metadata.colName == 'Mercadoria'){

        if(!trans['Mercadoria'].includes(column_trans_entro.value)){
          trans['Mercadoria'].push(column_trans_entro.value)
        }
        
        // trans[contun2]['Mercadoria'] = column_trans_entro.value;
  
      }

      

      if(column_trans_entro.metadata.colName == 'Viagem_Navio' || column_trans_entro.metadata.colName == 'Navio'){
        if(!trans['Viagem_Navio'].includes(column_trans_entro.value)){
          trans['Viagem_Navio'].push(column_trans_entro.value)
        }
      
      }

      if(column_trans_entro.metadata.colName == 'Cia_Transporte'){
        if(!trans['Cia_Transporte'].includes(column_trans_entro.value)){
          trans['Cia_Transporte'].push(column_trans_entro.value)
        }
      
      }

      if(column_trans_entro.metadata.colName == 'Referencia_Cliente'){
        

        if(!trans['Referencia'].includes(column_trans_entro.value)){
          trans['Referencia'].push(column_trans_entro.value)
        }
    
      }

      if(column_trans_entro.metadata.colName == 'Numero_Processo'){
        

        if(!trans['Referencia'].includes(column_trans_entro.value)){
          trans['Referencia'].push(column_trans_entro.value)
        }
    
      }

      if(column_trans_entro.metadata.colName == 'Destino_Final'){

        if(!trans['Destino_Final'].includes(column_trans_entro.value)){
          trans['Destino_Final'].push(column_trans_entro.value)
        }
   
      }
   

      if(column_trans_entro.metadata.colName == 'Origem'){
       

        if(!trans['Origem'].includes(column_trans_entro.value)){
          trans['Origem'].push(column_trans_entro.value)
        }
     
      }

      if(column_trans_entro.metadata.colName == 'Numero_Reserva'){
   
        
        if(!trans['Numero_Reserva'].includes(column_trans_entro.value)){
          trans['Numero_Reserva'].push(column_trans_entro.value)
        }
      }

      if(column_trans_entro.metadata.colName == 'House'){

        if(!trans['House'].includes(column_trans_entro.value)){
          trans['House'].push(column_trans_entro.value)
        }
       
   
      }

      if(column_trans_entro.metadata.colName == 'Importador'){

        if(!trans['Importador'].includes(column_trans_entro.value)){
          trans['Importador'].push(column_trans_entro.value)
        }
       
   
      }

      if(column_trans_entro.metadata.colName == 'Exportador'){

        if(!trans['Exportador'].includes(column_trans_entro.value)){
          trans['Exportador'].push(column_trans_entro.value)
        }
       
   
      }

      if(column_trans_entro.metadata.colName == 'Tipo_Carga'){

        if(!trans['Equipamento'].includes(column_trans_entro.value)){
          trans['Equipamento'].push(column_trans_entro.value)
        }
       
   
      }

      
   
      // trans[contun2][column_trans_entro.metadata.colName] = column_trans_entro.value;

      // console.log(column_trans_entro.metadata.colName, column_trans_entro.value)
    });

    contun2 = contun2 + 1;
  })

  

}).on('requestCompleted',function(rowCount, more, rows){
   
  res.json(trans);
  
}));


})



router.get('/lista_todas_empresas', function (req, res) {
  let processo = req.query.processo;

  sql = `SELECT Nome, IdPessoa, Cpf_Cnpj FROM vis_Cliente  WHERE Ativo = 1 Order By Nome asc`

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

}).on('requestCompleted',function(rowCount, more, rows){


   
    res.json(trans);
    
  }));

})


router.get('/follow_list', function (req, res) {
  let processo = req.query.processo;

  sql = `SELECT * FROM vis_Tracking_Portal_Follow WHERE IdLogistica_House = ${processo} ORDER BY Data DESC`

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





router.get('/headcargo_api_all', function (req, res) {
  let referencia = req.query.ref;
  let tipo = req.query.tipo;

  if(tipo == null || tipo == '' || tipo == undefined || tipo == 'all'){
    sql = `SELECT * FROM vis_Tracking_Portal WHERE Numero_Processo = 'EM0150-21'`
    // sql = `SELECT TOP 100 * FROM vis_Tracking_Portal ORDER BY IdLogistica_House DESC`
  }else if(tipo = 'cliente'){
    sql = `SELECT TOP 20 * FROM vis_Tracking_Portal WHERE Situacao_Embarque_Codigo NOT IN (4) AND (IdCliente = ${referencia} OR IdImportador = ${referencia} OR IdExportador = ${referencia}) ORDER BY Data_Abertura_Convertido DESC`
  }else{
    sql = `SELECT * FROM vis_Tracking_Portal WHERE Numero_Processo = 'EM0150-21'`
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
      return: 'parametro coluna n??o deve ser vazio',
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




// INFO COLABORADORES
router.get('/transferir_usuario', function (req, res) {

  


  corpo_email = `<div id=":137" class="a3s aiL ">
<div dir="ltr">
   <div style="text-align:center">
      <img src="https://sirius.conlinebr.com.br/img/header.png" alt="21161850-Recuperado584.png" width="524" height="340" style="margin-right:0px" data-image-whitelisted="" class="CToWUd a6T" tabindex="0">
      <div class="a6S" dir="ltr" style="opacity: 0.01;">
         <div id=":16m" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" title="Fazer o download" role="button" tabindex="0" aria-label="Fazer o download do anexo 21161850-Recuperado584.png" data-tooltip-class="a1V">
            <div class="akn">
               <div class="aSK J-J5-Ji aYr"></div>
            </div>
         </div>
         <div id=":16n" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" title="Adicionar ao Google Drive" role="button" tabindex="0" aria-label="Adicionar anexo ao Drive: 21161850-Recuperado584.png" jslog="119524; u014N:cOuCgd,xr6bB; 43:WyJpbWFnZS9wbmciLDEyNTg1OTld" data-tooltip-class="a1V">
            <div class="akn">
               <div class="wtScjd XG J-J5-Ji aYr">
                  <div class="T-aT4">
                     <div></div>
                     <div class="T-aT4-JX"></div>
                  </div>
               </div>
            </div>
         </div>
         <div id=":16p" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0" aria-label="Salvar uma c??pia no Fotos" jslog="54186; u014N:cOuCgd,xr6bB; 43:WyJpbWFnZS9wbmciLDEyNTg1OTld" data-tooltip-class="a1V" data-tooltip="Salvar uma c??pia no Fotos">
            <div class="akn">
               <div class="J-J5-Ji aYr akS">
                  <div class="T-aT4" style="display: none;">
                     <div></div>
                     <div class="T-aT4-JX"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <br>
   </div>
   <div style="text-align:center"><br></div>
   <div style="text-align:center"><b><font size="4">Ol?? `+req.query.cad_nome+`, tudo bem?</font></b></div>
   <div style="text-align:center"><b><br></b></div>
   <div style="text-align:center">Sua conta est?? ativa em nossa plataforma <b>SIRIUS</b> </div>
   <div style="text-align:center">Email: <b>`+req.query.cad_email+`</b>, &nbsp;</div>
   <div style="text-align:center">Senha: <b>`+req.query.cad_senha+`</b></div>
   <div style="text-align:center"><br></div>
   <div style="text-align:center">Voc?? pode alterar sua senha direto em nossa plataforma <b>SIRIUS</b> .</div>
   <div style="text-align:center"><a href="https://sirius.conlinebr.com.br">ACESSE AGORA PORTAL SIRIUS</a></div>
   <div style="text-align:center"><br></div>

   <div style="text-align:center">Tudo ficou mais pr??tico e ??gil! <b>Espia aqui o que estamos preparando para voc?? -</b>&nbsp;<a href="https://youtu.be/zk4Vu1LCBPo" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://youtu.be/zk4Vu1LCBPo&amp;source=gmail&amp;ust=1648239590584000&amp;usg=AOvVaw1qa66RPMgeIWUk6yCsVsGv">https://youtu.be/zk4Vu1LCBPo</a></div>
   
   <div style="text-align:center"><br></div>
   <div style="text-align:center">
      <img src="https://sirius.conlinebr.com.br/img/rodape.png" alt="Sirius lan??amento.png" width="597" height="198" style="margin-right:0px" data-image-whitelisted="" class="CToWUd a6T" tabindex="0">
      <div class="a6S" dir="ltr" style="opacity: 0.01;">
         <div id=":16c" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" title="Fazer o download" role="button" tabindex="0" aria-label="Fazer o download do anexo Sirius lan??amento.png" data-tooltip-class="a1V">
            <div class="akn">
               <div class="aSK J-J5-Ji aYr"></div>
            </div>
         </div>
         <div id=":16d" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" title="Adicionar ao Google Drive" role="button" tabindex="0" aria-label="Adicionar anexo ao Drive: Sirius lan??amento.png" jslog="119524; u014N:cOuCgd,xr6bB; 43:WyJpbWFnZS9wbmciLDg1MDQ1MV0." data-tooltip-class="a1V">
            <div class="akn">
               <div class="wtScjd XG J-J5-Ji aYr">
                  <div class="T-aT4">
                     <div></div>
                     <div class="T-aT4-JX"></div>
                  </div>
               </div>
            </div>
         </div>
         <div id=":16f" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0" aria-label="Salvar uma c??pia no Fotos" jslog="54186; u014N:cOuCgd,xr6bB; 43:WyJpbWFnZS9wbmciLDg1MDQ1MV0." data-tooltip-class="a1V" data-tooltip="Salvar uma c??pia no Fotos">
            <div class="akn">
               <div class="J-J5-Ji aYr akS">
                  <div class="T-aT4" style="display: none;">
                     <div></div>
                     <div class="T-aT4-JX"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <br>
   </div>
   <div style="text-align:center"><br></div>
   <div style="text-align:center"><br></div>
   <div style="text-align:center"><br></div>
   <div style="text-align:center"><br></div>
</div>
<div class="adL"></div>
</div>`


data = new Date().getTime();

  enviar_email(req.query.cad_email, corpo_email)

  var sql = `INSERT INTO usuarios (nome, 
                                  empresa,
                                  email,
                                  senha,
                                  telefone,
                                  status,
                                  data_criacao,
                                  acesso_comercial,
                                  acesso_operacional,
                                  acesso_documental,
                                  acesso_financeiro,
                                  acesso_adminstrativo)
                                  VALUES
                                  ('${req.query.cad_nome}',
                                  '${req.query.empresa_vinculada}',
                                  '${req.query.cad_email}',
                                  '${req.query.cad_senha}',
                                  '${req.query.cad_telefone}',
                                  '1',
                                  '${data}',
                                  '${req.query.comercial}',
                                  '${req.query.operacional}',
                                  '${req.query.documental}',
                                  '${req.query.financeiro}',
                                  '${req.query.administrador}')`;

  connection.query(sql, function(err2, results){
  
    

  if(!err2){
 
    var sql = `UPDATE usuarios_temp SET status_temp = 0 WHERE id_usuarios_temp = ${req.query.id_usuario}`;

    connection.query(sql, function(err2, results2){


      res.send('okay');
    })
    
  //   console.log(req.query.id_usuario)
 




  }else{
  
    res.send('error');
  }
    

  })



});


function alterar_usuario(id){
     

}



// INFO COLABORADORES
router.get('/infos_temp', function (req, res) {

  var sql = `SELECT * FROM usuarios_temp WHERE id_usuarios_temp = ${req.query.id}`;


  connection.query(sql, function(err2, results){
    res.json(results);
  })

});


function enviar_email(email, corpo){
  
  var remetente = nodemailer.createTransport({
    name: 'marketing@conline-news.com',
    host: 'mail.conline-news.com',
    service:'mail.conline-news.com',
    port: 465,
    maxMessages: 10,
    secure: true,
    pool:true,
    rateDelta:1000,
    rateLimit: 1000,
    auth:{
    user: 'marketing@conline-news.com',
    pass: 'conline191919aA@' },
    tls: {
      rejectUnauthorized: false
    },
    debug : true
    });
    
    mailOptions = {
      from: 'Sirius <marketing@conline-news.com>',
      to: email,
      subject: 'Portal Sirius - ConLine',
      html: corpo
    };



    
    remetente.sendMail(mailOptions, function(error, info){

      console.log(info)
      // console.log(error)
      
    })
}



// INFO COLABORADORES
router.get('/usuarios_todos', function (req, res) {



  var sql = "SELECT * FROM usuarios";


 connection.query(sql, function(err2, results){

var saida = [];
var data = [];
saida['data'] = [];

var infos = {
        "draw": 1,
        "recordsTotal": results.length,
        "recordsFiltered": results.length
      }
  
results.forEach(element => {

// numero_data = parseInt(element.criacao_temp)
// var date = new Date(numero_data); // create Date object


numero_data = parseInt(element.data_criacao)
var date = new Date(numero_data);
numero_data_ultimo = parseInt(element.ultimo_login)
var date_login = new Date(numero_data_ultimo); // create Date object


  var linhas = {
    "nome": element.nome,
    "email": element.email,
    "telefone": element.telefone,
    "empresa": element.empresa,
    "ultimo_login": date_login.toLocaleString('pt-BR'),
    "data_criacao": date.toLocaleString('pt-BR'),
    "acao": `<div class="btn-icon-list"> 
    <button id="`+element.idusuarios+`" class="btn ripple btn-secondary btn-icon abri_infos_usuarios"><i class="fa fa-pencil-square-o"></i></button>
    
  </div>`
  }

 

  data.push(linhas) 

});

  




saida = infos;
saida['data'] = data;

  //  console.log(saida)
   res.json(saida);
 })

 

});

// INFO COLABORADORES
router.get('/permissoes', function (req, res) {



  var sql = "SELECT * FROM usuarios_temp WHERE status_temp = 1";


 connection.query(sql, function(err2, results){

var saida = [];
var data = [];
saida['data'] = [];

var infos = {
        "draw": 1,
        "recordsTotal": results.length,
        "recordsFiltered": results.length
      }
  
results.forEach(element => {

numero_data = parseInt(element.criacao_temp)
var date = new Date(numero_data); // create Date object



  var linhas = {
    "nome_temp": element.nome_temp,
    "email_temp": element.email_temp,
    "telefone": element.telefone_temp,
    "empresa_temp": element.empresa_temp,
    "cnpj_temp": element.cnpj_temp,
    "criacao_temp": date.toLocaleString('pt-BR'),
    "acao": `<div class="btn-icon-list"> 
    <button id="`+element.id_usuarios_temp+`" class="btn ripple btn-secondary btn-icon abri_infos"><i class="fa fa-pencil-square-o"></i></button>
    
  </div>`
  }

 

  data.push(linhas) 

});

  




saida = infos;
saida['data'] = data;

  //  console.log(saida)
   res.json(saida);
 })

 

});

// INFO COLABORADORES
router.get('/info_acessos', function (req, res) {

   id = req.query.id;

   var sql = "SELECT * FROM usuarios WHERE idusuarios = "+id+" LIMIT 1";


  connection.query(sql, function(err2, results){
    res.json(results);
  })

  

});



// REMOVER USUARIO
router.get('/remover_usuario', function (req, res) {
  usuario = req.query.usuario;

  var sql = `DELETE FROM usuarios 
  WHERE 
  idusuarios = ${usuario}`;

connection.query(sql, function(err2, results){


res.send('okay');

})

})



// CADASTRAR USUARIO
router.get('/cadastrar_usuario', function (req, res) {
  opcoes = req.query.opcoes;
  usuario = req.query.usuario;
  empresa = req.query.empresa;
  // acessos = '';


  var sql = `INSERT INTO usuarios (nome, 
                                  ultimo_nome,
                                  empresa,
                                  email,
                                  senha,
                                  funcao,
                                  telefone,
                                  acesso_comercial,
                                  acesso_operacional,
                                  acesso_documental,
                                  acesso_financeiro,
                                  acesso_adminstrativo)
                                  VALUES
                                  ('${opcoes.primeiro_nome}',
                                  '${opcoes.ultimo_nome}',
                                  '${empresa}',
                                  '${opcoes.email}',
                                  '${opcoes.senha}',
                                  '${opcoes.funcao}',
                                  '${opcoes.telefone}',
                                  '${opcoes.comercial}',
                                  '${opcoes.operacional}',
                                  '${opcoes.documental}',
                                  '${opcoes.financeiro}',
                                  '${opcoes.administrador}')`;

  connection.query(sql, function(err2, results){
  

  
    res.send('okay');

  })


 

});

// ALTERAR SENHA USUARIO
router.get('/alterar_info_usuario', function (req, res) {
  opcoes = req.query.opcoes;
  usuario = req.query.usuario;
  acessos = '';




  var sql = `UPDATE usuarios SET  email = '${opcoes.email}', 
                                nome = '${opcoes.primeiro_nome}', 
                                ultimo_nome = '${opcoes.ultimo_nome}',
                                telefone = '${opcoes.telefone}', 
                                acesso_comercial = '${opcoes.comercial}',
                                acesso_financeiro = '${opcoes.financeiro}',
                                acesso_operacional = '${opcoes.operacional}',
                                funcao = '${opcoes.funcao}', 
                                status = '${opcoes.status}', 
                                acesso_documental = '${opcoes.documental}', 
                                acesso_adminstrativo = '${opcoes.administrador}'
                                WHERE 
                                idusuarios = ${usuario} 
                                LIMIT 1`;

  connection.query(sql, function(err2, results){
  

    res.send('okay');

  })

});


// ALTERAR SENHA USUARIO
router.get('/alterar_info_pessoal', function (req, res) {
  opcoes = req.query.opcoes;
  usuario = req.query.usuario;

var sql = `UPDATE usuarios SET email = '${opcoes.email}', nome = '${opcoes.primeiro_nome}', ultimo_nome = '${opcoes.ultimo_nome}',telefone = '${opcoes.telefone}', noticias_email_sirius = ${opcoes.noticias_email} WHERE idusuarios = ${usuario} LIMIT 1`;
 



  connection.query(sql, function(err2, results){

    res.send('okay');

  })

});


// ALTERAR SENHA USUARIO
router.get('/alter_password', function (req, res) {
  usuario = req.query.usuario;
  senha = req.query.senha;

var sql = `UPDATE usuarios SET senha = ${senha} WHERE idusuarios = ${usuario} LIMIT 1`;


  connection.query(sql, function(err2, results){
  
    res.send('okay');

  })

});
// DESATIVAR CONTA
router.get('/disable_accont', function (req, res) {
  usuario = req.query.usuario;

var sql = `UPDATE usuarios SET status = 0 WHERE idusuarios = ${usuario} LIMIT 1`;


  connection.query(sql, function(err2, results){
  
    res.send('okay');

  })

});




// RESPOSAVEIS PELA EMPRESA
router.get('/query_responsaveis_empresa', function (req, res) {

  empresa = req.query.empresa;


  CONEXA_HEAD.execSql(new Request("SELECT * FROM vis_Tracking_Portal_Responsavel WHERE IdCliente = "+empresa, function(err, rowCount, rows){
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


      res.json(driver);
      
  
  })
  );
       

  

});

// INFO EMPRESA
router.get('/query_empresa', function (req, res) {

  empresa = req.query.empresa;
 

  var sql = `SELECT * FROM empresas_logo WHERE id_empresa = ${empresa} LIMIT 1`;


  connection.query(sql, function(err2, results){

   


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


      if(results != undefined && results.length > 0){
        driver['img'] = results[0]['img'];
        res.json(driver);
      }else{
        driver['img'] = '';
        res.json(driver);
      }
      
  
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
router.get('/new_acesso', function (req, res) {


  
  nome = req.query.nome;
  email = req.query.email;
  telefone = req.query.telefone;
  password = req.query.password;
  empresa = req.query.empresa;
  cnpj = req.query.cnpj;
  data = new Date().getTime();


  var sql = `SELECT * FROM usuarios_temp WHERE email_temp = '${email}'`;


  connection.query(sql, function(err2, results_temp){
    
console.log('verificando emails 1 temp -> '+ results_temp.length)
    if(results_temp.length != 0){
      
      res.json('email_existe');
      return true;  

    }else{

      var sql = `SELECT * FROM usuarios WHERE email = '${email}'`;


      connection.query(sql, function(err2, results_user){

        console.log('verificando emails 2 temp -> '+ results_user.length)

        if(results_user.length == 0){




          var sql = `INSERT INTO 
          usuarios_temp 
          (nome_temp,email_temp, senha_temp, empresa_temp, cnpj_temp, criacao_temp, telefone_temp) 
          VALUES ('${nome}','${email}','${password}','${empresa}','${cnpj}','${data}','${telefone}')`;




connection.query(sql, function(err2, results){

if(results){

console.log('entrou')

enviar_email('sirius_notifica@conlinebr.com.br', 'Novo usu??rio cadastrado <br> <b>Nome:</b> '+nome+' <br> <b>Email:</b> '+email+' <br> Acesse <a href="https://sirius.conlinebr.com.br/gerencia?login=admin&senha=conline2510@">GERENCIAR</a>')



corpo_email = `<div id=":137" class="a3s aiL ">
<div dir="ltr">
 <div style="text-align:center">
    <img src="https://sirius.conlinebr.com.br/img/header.png" alt="21161850-Recuperado584.png" width="524" height="340" style="margin-right:0px" data-image-whitelisted="" class="CToWUd a6T" tabindex="0">
    <div class="a6S" dir="ltr" style="opacity: 0.01;">
       <div id=":16m" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" title="Fazer o download" role="button" tabindex="0" aria-label="Fazer o download do anexo 21161850-Recuperado584.png" data-tooltip-class="a1V">
          <div class="akn">
             <div class="aSK J-J5-Ji aYr"></div>
          </div>
       </div>
       <div id=":16n" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" title="Adicionar ao Google Drive" role="button" tabindex="0" aria-label="Adicionar anexo ao Drive: 21161850-Recuperado584.png" jslog="119524; u014N:cOuCgd,xr6bB; 43:WyJpbWFnZS9wbmciLDEyNTg1OTld" data-tooltip-class="a1V">
          <div class="akn">
             <div class="wtScjd XG J-J5-Ji aYr">
                <div class="T-aT4">
                   <div></div>
                   <div class="T-aT4-JX"></div>
                </div>
             </div>
          </div>
       </div>
       <div id=":16p" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0" aria-label="Salvar uma c??pia no Fotos" jslog="54186; u014N:cOuCgd,xr6bB; 43:WyJpbWFnZS9wbmciLDEyNTg1OTld" data-tooltip-class="a1V" data-tooltip="Salvar uma c??pia no Fotos">
          <div class="akn">
             <div class="J-J5-Ji aYr akS">
                <div class="T-aT4" style="display: none;">
                   <div></div>
                   <div class="T-aT4-JX"></div>
                </div>
             </div>
          </div>
       </div>
    </div>
    <br>
 </div>
 <div style="text-align:center"><br></div>
 <div style="text-align:center"><b><font size="4">Ol?? `+nome+`, tudo bem?</font></b></div>
 <div style="text-align:center"><b><br></b></div>
 <div style="text-align:center">Agradecemos seu cadastro em nossa plataforma. </div>
 <div style="text-align:center">Sua conta est?? sendo <b>verificada</b>, em breve retornaremos com a aprova????o do seu acesso. </div>
 <div style="text-align:center">Email: <b>`+email+`</b>, &nbsp;</div>
 <div style="text-align:center"><br></div>
 <div style="text-align:center"><a href="https://sirius.conlinebr.com.br">PORTAL SIRIUS</a></div>
 <div style="text-align:center"><br></div>

 <div style="text-align:center">Tudo ficou mais pr??tico e ??gil! <b>Espia aqui o que estamos preparando para voc?? -</b>&nbsp;<a href="https://youtu.be/zk4Vu1LCBPo" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://youtu.be/zk4Vu1LCBPo&amp;source=gmail&amp;ust=1648239590584000&amp;usg=AOvVaw1qa66RPMgeIWUk6yCsVsGv">https://youtu.be/zk4Vu1LCBPo</a></div>
 
 <div style="text-align:center"><br></div>
 <div style="text-align:center">
    <img src="https://sirius.conlinebr.com.br/img/rodape.png" alt="Sirius lan??amento.png" width="597" height="198" style="margin-right:0px" data-image-whitelisted="" class="CToWUd a6T" tabindex="0">
    <div class="a6S" dir="ltr" style="opacity: 0.01;">
       <div id=":16c" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" title="Fazer o download" role="button" tabindex="0" aria-label="Fazer o download do anexo Sirius lan??amento.png" data-tooltip-class="a1V">
          <div class="akn">
             <div class="aSK J-J5-Ji aYr"></div>
          </div>
       </div>
       <div id=":16d" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" title="Adicionar ao Google Drive" role="button" tabindex="0" aria-label="Adicionar anexo ao Drive: Sirius lan??amento.png" jslog="119524; u014N:cOuCgd,xr6bB; 43:WyJpbWFnZS9wbmciLDg1MDQ1MV0." data-tooltip-class="a1V">
          <div class="akn">
             <div class="wtScjd XG J-J5-Ji aYr">
                <div class="T-aT4">
                   <div></div>
                   <div class="T-aT4-JX"></div>
                </div>
             </div>
          </div>
       </div>
       <div id=":16f" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0" aria-label="Salvar uma c??pia no Fotos" jslog="54186; u014N:cOuCgd,xr6bB; 43:WyJpbWFnZS9wbmciLDg1MDQ1MV0." data-tooltip-class="a1V" data-tooltip="Salvar uma c??pia no Fotos">
          <div class="akn">
             <div class="J-J5-Ji aYr akS">
                <div class="T-aT4" style="display: none;">
                   <div></div>
                   <div class="T-aT4-JX"></div>
                </div>
             </div>
          </div>
       </div>
    </div>
    <br>
 </div>
 <div style="text-align:center"><br></div>
 <div style="text-align:center"><br></div>
 <div style="text-align:center"><br></div>
 <div style="text-align:center"><br></div>
</div>
<div class="adL"></div>
</div>`


setTimeout(() => {
enviar_email(email, corpo_email)
}, 5000);
res.json(results);


}else{
console.log('entrou aqui 2')
res.json('error');
}


})




        }else{
          
          res.json('email_existe');
          return true;
        }
       
        
      })


    }

    
  })





});




// LOGIN PAGE
router.get('/query_login', function (req, res) {

  email = req.query.username;
  password = req.query.password;
  data_login = new Date().getTime();

  var sql = `SELECT * FROM usuarios WHERE email = '${email}' AND senha = '${password}' LIMIT 1`;


  connection.query(sql, function(err2, results){
  
    if(results){
      if(results.length > 0){
        
    console.log
        var sql2 = `UPDATE usuarios SET ultimo_login = ${data_login} WHERE idusuarios = ${results[0].idusuarios}`;
        connection.query(sql2, function(err2, results){
          console.log(err2)
          console.log(results)

        })
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
//       mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro come??a com zero.
//       ano  = data.getFullYear();
//   console.log(dia+"/"+mes+"/"+ano);
// }

function time_system(tempo){

  var data = new Date(tempo*1000);
  // dia  = data.getDate().toString().padStart(2, '0'),
  // mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro come??a com zero.
  // ano  = data.getFullYear();

  day = ["Domingo", "Seg", "Ter", "Qua", "Qui", "Sex", "S??b"][data.getDay()];
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
  // mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro come??a com zero.
  // ano  = data.getFullYear();

  day = ["Domingo", "Seg", "Ter", "Qua", "Qui", "Sex", "S??b"][data.getDay()];
  date = data.getDate();
  month = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][data.getMonth()];
  year = data.getFullYear();
  hours = data.getHours();
  min = data.getMinutes();
  data.getMonth()
  
  return `0${data.getMonth()+1}-${date}-${year}`;
  // return `${date}-${data.getMonth()+1}-${year}`;
  

}


function data_americana(data){

let data_brasileira = data;
let data_americana = data_brasileira.split('/').reverse().join('-');

return data_americana;
}



module.exports = router;