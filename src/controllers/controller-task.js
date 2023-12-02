const config = require('../configs/database');
const apikeq = require('../configs/apikey');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = { 
    task(req,res){
        res.render('task', {
            url: '/',
        })

    },

    data(req,res) {
      const sql = 'SELECT * FROM tb_products';

      pool.query(sql, (err, results) =>{
        if(err) {
          res.status(500).json({message: err});
        }else{
          res.json(results);
        }
      })
    },
    add(req, res) {
          let inputDate = req.body.due_date;
          let parts = inputDate.split("-");
          let day = parts[0];
          let month = parts[1];
          let year = parts[2];
          let format = `${year}-${month}-${day}`;
          let status = req.body.status === 'on' ? true : false; 
          let data = { 
            name: req.body.name, 
            description: req.body.description,
            status: status,
            due_date: format 
            
          };
          let sql = "INSERT INTO tb_products SET ?";
          pool.query(sql, data, (err, results) => {
            console.log(data);
            if (err) {
              res.status(500).json({ success: false, message: "Failed to add task" });
            } else {
              res.status(200).json({ success: true, message: "Task added successfully" });
            }
          });
        //});
      },
    delete(req,res){
        const querySearch = 'SELECT * FROM tb_products WHERE id = ?';
        const querydelete = 'DELETE  FROM tb_products WHERE id = ?';
        pool.query(querySearch, req.params.id, (err, rows) => {
            if(err) {
                return res.status(500).json({ message: 'There is a mistake', error: err });  
            }
            if (rows.length) { 

                pool.query(querydelete, req.params.id,(err) => {
                    console.log(err);
                    if(err){
                        return res.status(500).json({message: 'there is a mistake', error: err});
                    }
                    res.status(200).json({ success: true, message: 'deleted' });
                });
            }else {
                return res.status(404).json({ message: 'Data not found!', success: false });
            }
        });
    },
    edit(req, res) {
        let status = req.body.status === 'on' ? true : false;
      
        let formattedDueDate = "2023-08-31"; 
      
        let data = {
          name: req.body.name,
          description: req.body.description,
          status: req.body.status,
          due_date: formattedDueDate
        };
      
        let taskId = req.params.id; 

        const checkid = "SELECT * FROM tb_products WHERE id = ?";
        pool.query(checkid,[taskId],(checkErr, checkResults) => {
          if (checkErr){
            return res.status(500).json({message: 'there is a mistake in cheking', error: checkErr});
          }
          if (checkResults.length===0){
            return res.status(404).json({message:'id task not found'});
          }

        const sql = "UPDATE tb_products SET ? WHERE id = ?";
        pool.query(sql, [data, taskId], (err, results) => {
          if (err) {
            return res.status(500).json({ message: 'There is a mistake', error: err });
          } else {
            res.status(200).json({ success: true, message: "Task Edited successfully" });
          }
        });
      });  
    },
      
}