const { route } = require("../routes/router");

const controller = {};


controller.signup = (req, res) =>{
    req.getConnection((err,conn) =>  {
        const data = req.body;
        req.session.User = req.body;
        conn.query('insert into login set ?',data, (err, router) =>{
            res.redirect('/profile')
          
        });
    });
}

controller.profile = (req,res) =>{
    const data = req.session.User; 
  
    req.getConnection((err,conn) =>{
        conn.query('select * from login where ID= ?',data.ID, (err,router) =>{
        res.render('profile',{
                data: router[0]
            });
        });
    });
}

module.exports = controller;