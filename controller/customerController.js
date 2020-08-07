const { route } = require("../routes/router");

const controller = {};


controller.signup = (req, res) =>{
    req.getConnection((err,conn) =>  {
        const data = req.body;
        conn.query('insert into login set ?',data, (err, router) =>{
            res.redirect('/profile')
          
        });
    });
}

controller.profile = (req,res) =>{
    req.getConnection((err,conn) =>{
        conn.query('select * from login;', (err,router) =>{
         console.log(router[0]);
            res.render('profile',{
               data: router[0]
            });
        });
    });
}

module.exports = controller;