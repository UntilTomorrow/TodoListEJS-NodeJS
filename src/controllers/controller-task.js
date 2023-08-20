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
    add(req, res) {
        let inputDate = req.body.due_date;
        let parts = inputDate.split("-");
        let day = parts[0];
        let month = parts[1];
        let year = parts[2];
        let formattedDate = `${year}-${month}-${day}`; // -> YYYY-MM-DD
        let status = req.body.status === 'on' ? true : false; 
        let data = { 
            task_name: req.body.task_name, 
            description: req.body.description,
            status: status,
            due_date: formattedDate 
        };
        let sql = "INSERT INTO tasks SET ?";
        pool.query(sql, data, (err, results) => {
            console.log(data);
          if (err) {
            res.status(500).json({ success: false, message: "Failed to add task" });
          } else {
            res.status(200).json({ success: true, message: "Task added successfully" });
          }
        });
      },
    delete(req,res){
        const querySearch = 'SELECT * FROM tasks WHERE id = ?';
        const querydelete = 'DELETE  FROM tasks WHERE id = ?';
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
    }       
}