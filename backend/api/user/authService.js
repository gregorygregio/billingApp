const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const env = require('../../.env')
const User= require('./user')

const generateToken = function(params= {}){
    return jwt.sign(params, env.authSecret, { expiresIn: '1 day'});
}

const register = (req, res) => {
  try{
    const newUser = req.body;
    const { email } = newUser;

    User.findOne({email}, (err, user) =>{
      if(err) return res.status(400).send({errors: err})
      if(user) return res.status(400).send({errors: "Usuário já cadastrado"})

      bcrypt.hash(newUser.password, 10, (err, hash) => {
          if (err) return res.status(400).send({errors: "Registro falhou: " + err})

          newUser.password = hash;

          User.create(newUser, function(err, user){
            if (err) return res.status(400).send({errors: "Registro falhou: " + err})
            user.password = null;
            return res.send( {user, token: generateToken({id: user._id})})
          })
      })

    })

  } catch (err){
    return res.status(400).send({errors: "Registro falhou: " + err})
  }

}

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne( {email}, (err, user) => {
    if(err) return res.status(400).send({errors: err})
    if(user) {
      bcrypt.compare(password, user.password, (err, resulst) => {
        if(err) return res.status(400).send({errors: err});
        if(!resulst) return res.status(400).send({errors: "Usuário/Senha inválido"});

        const token = generateToken(user);

        const { name } = user;
        res.json( { name, email, token} );
      })
    } else {
      return res.status(400).send({errors: "Usuário/Senha inválido"});
    }
  })
}


const listUsers = (req, res) => {
    User.find({}, (err, users) => {
      if(err) return res.status(400).send({errors: err});
      return res.send( users )
    });
}


module.exports = {register, listUsers, login};
