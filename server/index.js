const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();

const PORT = 3002;
app.use(cors());
app.use(express.json())

 
const levels = [
    { name: 'Jedi', description: 'Mestre do mestre do mestre do tio do mestre do mestre do irmão do mestre que um dia foi mestre dos mestres dos Jedis' },
    { name: 'Jedi Master', description: 'Mestre dos Jedis' },
    { name: 'Sith Lord', description: 'Mestre dos mestres' },
    { name: 'Master', description: 'Mestre' },
    { name: 'Apprentice', description: 'Aprendiz do mestre' },
    { name: 'Jedi Knight', description: 'Carinha dahora' },
    { name: 'Sith Apprentice', description: 'Minino esperto' },
    { name: 'Jedi Padawan', description: 'Jovem aprendiz' },
]

const devs = [
    { name: 'Obi-Wan Kenobi', level: 8, description: 'Kenobi' },
    { name: 'Anakin Skywalker', level: 7, description: 'Skywalker' },
    { name: 'Darth Sidious', level: 6, description: 'Sidious' },
    { name: 'Mace Windu', level: 6, description: 'Windu' },
    { name: 'Yoda', level: 5, description: 'Apprentice' },
    { name: 'Qui-Gon Jinn', level: 5, description: 'Jinn' },
    { name: 'Darth Maul', level: 4, description: 'Maul' },
    { name: 'Count Dooku', level: 4, description: 'Dooku' },
    { name: 'Darth Vader', level: 3, description: 'Vader' },
    { name: 'Luke Skywalker', level: 2, description: 'Luke' },
    { name: 'Flávio Pavim', level: 1, description: 'Programador' },
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
    });
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
            if (result.length === 0) {
                devs.forEach(dev => {
                    db.query(`INSERT INTO dev (name, level, description) VALUES ('${dev.name}', '${dev.level}', '${dev.description}')`, (err, result) => {
                        if (err) throw err;
                    })
                })
                levels.forEach(level => {   
                    db.query(`INSERT INTO level (name, description) VALUES ('${level.name}', '${level.description}')`, (err, result) => {
                        if (err) throw err;
                    })
                })
                db.query(`SELECT d.name,l.name AS level,d.description FROM dev d LEFT JOIN level l ON l.id=d.level ORDER BY d.id DESC`, (err, result) => {
                    if (err) throw err;
                    res.send(result)
                })
            } else {
                res.send(result)
            }
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