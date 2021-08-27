const express = require("express");
const router = express.Router();

router.use(express.static('public'));


router.get('/',(req,res)=>{
    res.render('pages/home');
});

router.get('/about',(req,res)=>{

res.render('pages/about');
});

router.get('/cadastro',(req,res)=>{
    res.render('pages/cadastro',{users:users}); 
});

router.post('/cadastro/remove',(req,res)=>{ 
    let name = req.body.name;

    if(users.length==0){
        console.log("Erro: Não há elemento a ser removido!");
        return res.status(500).json({
            status:'error',
            error:`Removed element: ${name}`
        });

    } else {
        for(let cont=0;cont<users.length;cont++){
            if(users[cont].name==name){
                users.splice(cont,1);
                console.log("Elemento Removido: ",name);
                return res.status(200).json({
                    status:'sucess',
                    data:users
                });
            } else if(cont==users.length-1){
                console.log("Erro ao remover elemento: ",name);
                return res.status(400).json({
                    status:'error',
                    error:`Didn't element: ${name}`
                });
            }
        }
    }

    console.log("Elementos cadastrados: ",users);
    res.sendStatus(200);
});

router.post('/cadastro/update',(req,res)=>{

    users[req.body.id].name=req.body.name;
    users[req.body.id].email=req.body.email;
    users[req.body.id].address=req.body.address;
    users[req.body.id].age=req.body.age;
    users[req.body.id].height=req.body.height;
    users[req.body.id].vote=req.body.vote;

    res.sendStatus(200);
    console.log("Dados recebidos: ",req.body);
});

router.post('/cadastro/list', (req,res)=>{
    res.send(JSON.stringify(users));
});

router.post('/cadastro/add',(req,res)=>{
    let user = {name:"",email:"",address:"",height:"",age:"",vote:""};

    user.name = req.body.name;
    user.email = req.body.email;
    user.address = req.body.address;
    user.height = req.body.height;
    user.age = req.body.age;
    user.vote = req.body.vote;

    users.push(user);
    console.log("Usuário cadastrado: ",user);

    res.sendStatus(200);
});

module.exports = router;