const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = { 
    task(req,res){
        res.render('task', {
            url: 'http//localhost:5000/',
        })
    },

    add(req,res){
        let data = {task_name: req.body.task_name, description: req.body.description};
        let sql  = "INSERT INTO task SET ?";
        let query = pool.query(sql, data,(err, results) => {
            if(err) throw err;
            res.redirect('/task')
        });

    },
}