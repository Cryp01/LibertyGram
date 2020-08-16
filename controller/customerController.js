const { route } = require("../routes/router");
const router = require("../routes/router");
const { json } = require("body-parser");

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
controller.signin = (req,res) =>{
    let data = req.body;
  
    req.getConnection((err,conn) =>{
        conn.query('select * from login where Username =? ', data.Username, (err,router) =>{
            if(router[0].Username == data.Username && router[0].Password == data.Password){
             req.session.User = router[0];
                res.redirect('/profile');
            }else{
               res.render('signin',{
                data: 'Data does not match Please check your credentials and try again'

               });
                
           
            } 
        }); 
 
    });
}


module.exports = controller;