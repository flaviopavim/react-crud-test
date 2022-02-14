const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();

const PORT = 3002;
app.use(cors());
app.use(express.json())

 
const levels = [
    { name: 'Jedi', description: 'Jedi' },
    { name: 'Sith', description: 'Sith' },
    { name: 'Padawan', description: 'Padawan' },
    { name: 'Jedi Master', description: 'Jedi Master' },
    { name: 'Sith Lord', description: 'Sith Lord' },
    { name: 'Master', description: 'Master' },
    { name: 'Apprentice', description: 'Apprentice' },
    { name: 'Jedi Knight', description: 'Jedi Knight' },
    { name: 'Sith Apprentice', description: 'Sith Apprentice' },
    { name: 'Jedi Padawan', description: 'Jedi Padawan' },
]
    

//levels
app.get("/api/list/level", (req, res) => {
    db.query(`CREATE TABLE IF NOT EXISTS level (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    )`, (err, result) => {
        if (err) throw err;
        db.query(`SELECT * FROM level ORDER BY id DESC`, (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
                //foreach levels
                levels.forEach(level => {   
                    db.query(`INSERT INTO level (name, description) VALUES ('${level.name}', '${level.description}')`, (err, result) => {
                        if (err) throw err;
                    })
                })
                db.query(`SELECT * FROM level ORDER BY id DESC`, (err, result) => {
                    if (err) throw err;
                    res.send(result)
                })
            } else {
                res.send(result)
            }
        })
    })
});

app.get("/api/level/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM level WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    }
    );
});

app.post('/api/create/level', (req, res) => {
    const name = req.body.name;
    const level = req.body.level;
    const description = req.body.description;
    console.log("Level criado: ",name, level, description)
    db.query("INSERT INTO level (name, level, description) VALUES (?,?,?)", [name, level, description], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    }
    );
})

app.post('/api/edit/level/:id', (req, res) => {
    const name = req.body.name;
    const level = req.body.level;
    const description = req.body.description;
    console.log("DEV atualizado: ",name, level, description)
    //update dev
    db.query("UPDATE level SET name = ?, level = ?, description = ? WHERE id = ?", [name, level, description, req.params.id], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
})

app.delete('/api/delete/level/:id', (req, res) => {
    db.query("DELETE FROM level WHERE id= ?", req.params.id, (err, result) => {
        if (err) {
            console.log(err)
        }
    })
})


//levels

app.get("/api/list/dev", (req, res) => {
    db.query(`CREATE TABLE IF NOT EXISTS dev (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        level INT(11) NOT NULL,
        description VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    )`, (err, result) => {
        if (err) throw err;
        db.query(`SELECT d.name,l.name AS level,d.description FROM dev d LEFT JOIN level l ON l.id=d.level ORDER BY d.id DESC`, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    })
    
});

app.get("/api/dev/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT d.name,l.name AS level,d.description FROM dev d LEFT JOIN level l ON l.id=d.level WHERE d.id = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    }
    );
});

app.post('/api/create/dev', (req, res) => {
    const name = req.body.name;
    const level = req.body.level;
    const description = req.body.description;
    console.log("DEV criado: ",name, level, description)
    db.query("INSERT INTO dev (name, level, description) VALUES (?,?,?)", [name, level, description], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    }
    );
})

app.post('/api/edit/dev/:id', (req, res) => {
    const name = req.body.name;
    const level = req.body.level;
    const description = req.body.description;
    console.log("DEV atualizado: ",name, level, description)
    //update dev
    db.query("UPDATE dev SET name = ?, level = ?, description = ? WHERE id = ?", [name, level, description, req.params.id], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
})

app.delete('/api/delete/dev/:id', (req, res) => {
    db.query("DELETE FROM dev WHERE id= ?", req.params.id, (err, result) => {
        if (err) {
            console.log(err)
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})