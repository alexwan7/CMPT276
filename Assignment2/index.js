const express = require('express')
const app = express();
const path = require('path')

const { Pool } = require('pg');

//var pool = new Pool({
//  host: 'localhost',
//  database: 'postgres'
//});


var pool = new Pool({
    connectionString: "postgres://elbxyenlglegkt:9fc39c1ded227fccfb6bba9d004178c6eb373bf75fc7553aacc3c1c4d3a99729@ec2-54-83-201-84.compute-1.amazonaws.com:5432/db408stm924h3g",
    ssl: true,
});



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', function(req, res){
//    let query = "CREATE TABLE IF NOT EXISTS students ( studentid int NOT NULL, name varchar(30) NOT NULL, height int NOT NULL, weight int NOT NULL, hair_color varchar(30),gpa float not null, PRIMARY KEY (studentid))";
//    pool.query(query,function(error,result){
            pool.query("select * from students", function(error, result){
                var results = { 'results': (result.rows) ? result.rows : [] };
                res.render('pages/index',results);
            });
//    });

});

app.post('/add_new_student',function(req,res){
    let eye_color = (req.body.eye_color == "")?null:req.body.eye_color;
    pool.query(`insert into students values(${req.body.student_id},'${req.body.name}',${req.body.height},${req.body.weight},'${eye_color}',${req.body.gpa})`,function(error,result){
        if(!error){
            res.redirect('/');
            res.end()
        }else{
            console.log(error);
        }
    });  
});

app.get('/student/:student_id',function(req,res){
    pool.query(`select * from students where studentid= ${req.params.student_id}`, function(error, result){
        var results = { 'results': (result.rows[0].studentid) ? result.rows[0] : [] };
        res.render('pages/student',results);
    });
});

app.post('/edit_student_info',function(req,res){
    let eye_color = (req.body.eye_color == "")?null:`'${req.body.eye_color}'`;
    let query = `update students set student_name='${req.body.name}',height=${req.body.height},weight=${req.body.weight},hair_color=${eye_color},gpa=${req.body.gpa} where studentid = ${req.body.student_id}`;
    pool.query(query,function(error,result){
       if(!error){
           res.redirect('/');
           res.end();
       }else{
           console.log(error);
       }
    });
});

app.post('/delete_student_info',function(req,res){
    let query = `DELETE FROM students where studentid = ${req.body.student_id}`;
        pool.query(query,function(error,result){
           if(!error){
               res.redirect('/');
               res.end();
           }else{
               console.log(error);
           }
    });
});

app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});