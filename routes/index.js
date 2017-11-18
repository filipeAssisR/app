var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  global.db.findAll((e, docs) => {
      if(e) { return console.log(e); }
      res.render('index', { title: 'Lista de Cards', docs: docs });
  })
})

router.get('/cadastrar', function(req, res, next) {
  res.render('cadastrar', { title: 'Novo Cadastro', doc: {"nome":"","idade":""}, action: '/cadastrar' });
});

router.post('/cadastrar', function(req, res, next) {
	var nome = req.body.nome;
	var	idade = req.body.idade;
	global.db.insert({nome, idade}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/');
      })
  
});


router.get('/editar/:id', function(req, res, next) {
   var id = req.params.id;
  	global.db.findOne(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('cadastrar', { title: 'Edição de Cliente', doc: docs[0], action: '/editar/' + docs[0]._id });
    });
});



router.post('/editar/:id', function(req, res) {
  var id = req.params.id;
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);
  global.db.update(id, {nome, idade}, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/');
    });
});


router.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOne(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/');
      });
});


module.exports = router;
