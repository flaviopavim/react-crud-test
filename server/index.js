const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();

const PORT = 3002;
app.use(cors());
app.use(express.json())

//devs de demonstração
const devs = [
    //Eu
    { name: 'Flávio Pavim', level: 1, description: 'Programador' },
    //Star Wars
    { name: 'Luke Skywalker', level: 2, description: 'Luke' },
    { name: 'Darth Vader', level: 3, description: 'Vader' },
    { name: 'Count Dooku', level: 4, description: 'Dooku' },
    { name: 'Darth Maul', level: 4, description: 'Maul' },
    { name: 'Yoda', level: 5, description: 'Apprentice' },
    { name: 'Qui-Gon Jinn', level: 5, description: 'Jinn' },
    { name: 'Mace Windu', level: 6, description: 'Windu' },
    { name: 'Darth Sidious', level: 6, description: 'Sidious' },
    { name: 'Anakin Skywalker', level: 7, description: 'Skywalker' },
    { name: 'Obi-Wan Kenobi', level: 8, description: 'Kenobi' },
    //Dragon Ball
    { name: 'Goku', level: 1, description: 'Goku' },
    { name: 'Vegeta', level: 2, description: 'Vegeta' },
    { name: 'Gohan', level: 3, description: 'Gohan' },
    { name: 'Piccolo', level: 4, description: 'Piccolo' },
    { name: 'Trunks', level: 4, description: 'Trunks' },
    { name: 'Majin Buu', level: 5, description: 'Majin Buu' },
    { name: 'Cell', level: 5, description: 'Cell' },
    { name: 'Frieza', level: 6, description: 'Frieza' },
    { name: 'Android 18', level: 6, description: 'Android 18' },
    { name: 'Android 17', level: 7, description: 'Android 17' },
    { name: 'Android 16', level: 8, description: 'Android 16' },

]


//níveis de demonstração
const levels = [
    { name: 'Jedi Padawan', description: 'Jovem aprendiz' },
    { name: 'Sith Apprentice', description: 'Minino esperto' },
    { name: 'Jedi Knight', description: 'Carinha dedicado' },
    { name: 'Apprentice', description: 'Aprendiz do mestre' },
    { name: 'Master', description: 'Mestre' },
    { name: 'Sith Lord', description: 'Mestre dos mestres' },
    { name: 'Jedi', description: 'Mestre do mestre do mestre do tio do mestre do mestre do irmão do mestre que um dia foi mestre dos mestres' },
    { name: 'Jedi Master', description: 'O f*dão' },
    { name: 'Super Sayajin', description: 'Super Sayajin' },
    { name: 'Super Sayajin 2', description: 'Super Sayajin 2' },
    { name: 'Super Sayajin 3', description: 'Super Sayajin 3' },
    { name: 'Super Sayajin 4', description: 'Super Sayajin 4' },
    { name: 'Super Sayajin 5', description: 'Super Sayajin 5' },
    { name: 'Super Sayajin 6', description: 'Super Sayajin 6' },
    { name: 'Super Sayajin 7', description: 'Super Sayajin 7' },
    { name: 'Super Sayajin 8', description: 'Super Sayajin 8' },
    { name: 'Super Sayajin 9', description: 'Super Sayajin 9' },
    { name: 'Super Sayajin 10', description: 'Super Sayajin 10' },
    { name: 'Super Sayajin 11', description: 'Super Sayajin 11' },
    { name: 'Super Sayajin 12', description: 'Super Sayajin 12' },
    { name: 'Super Sayajin 13', description: 'Super Sayajin 13' },
    { name: 'Super Sayajin 14', description: 'Super Sayajin 14' },
    { name: 'Super Sayajin 15', description: 'Super Sayajin 15' },
]

/////////////////////////////////
//devs
/////////////////////////////////

//lista todos os devs
app.get("/api/list/dev/:pgn", (req, res) => {
    //lista todos os devs com seus níveis
    let pgn=(req.params.pgn-1)*6
    db.query(`
    SELECT 
        d.id,d.name,
        l.name AS level,
        d.description,
        (SELECT COUNT(id) FROM dev) AS total
    FROM 
        dev d 
            LEFT JOIN level l ON l.id=d.level 
    ORDER BY d.id DESC
    LIMIT ${pgn},6
    `, (err, result) => {
        if (err) {
            console.log(err)
        }
        //send status 200 and result
        res.status(200).send(result)
    })
});

//busca por devs
app.get("/api/search/dev/:search/:pgn", (req, res) => {
    let pgn=(req.params.pgn-1)*6
    db.query(`
    SELECT 
        d.id,
        d.name,
        l.name AS level,
        d.description,
        (SELECT 
            COUNT(d.id)
        FROM 
            dev d
                LEFT JOIN level l ON l.id=d.level
        WHERE 
            d.name LIKE '%${req.params.search}%' OR
            d.description LIKE '%${req.params.search}%' OR
            l.name LIKE '%${req.params.search}%') AS total
    FROM 
        dev d
            LEFT JOIN level l ON l.id=d.level
    WHERE 
        d.name LIKE '%${req.params.search}%' OR
        d.description LIKE '%${req.params.search}%' OR
        l.name LIKE '%${req.params.search}%'
    ORDER BY d.id DESC
    LIMIT ${pgn},6
    `, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.status(200).send(result)
    })
});

//busca por um dev
app.get("/api/dev/:id", (req, res) => {
    const id = req.params.id;
    db.query(`
    SELECT 
        d.id,
        d.name,
        l.name AS level,
        d.description 
    FROM 
        dev d 
            LEFT JOIN level l ON l.id=d.level 
    WHERE d.id = ?
    `, id, (err, result) => {
        if (err) {
            console.log(err)
            res.status(404).send(result)
        }
        res.status(200).send(result)
    }
    );
});

//criar dev
app.post('/api/create/dev', (req, res) => {
    const name = req.body.name;
    const level = req.body.level;
    const description = req.body.description;
    console.log("DEV criado: ",name, level, description)
    db.query("INSERT INTO dev (name, level, description) VALUES (?,?,?)", [name, level, description], (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send(result)
        }
        console.log(result)
        res.status(201).send(result)
    }
    );
})

//editar dev
app.post('/api/edit/dev/:id', (req, res) => {
    const name = req.body.name;
    const level = req.body.level;
    const description = req.body.description;
    console.log("DEV atualizado: ",name, level, description)
    //update dev
    db.query("UPDATE dev SET name = ?, level = ?, description = ? WHERE id = ?", [name, level, description, req.params.id], (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send(result)
        }
        console.log(result)
        res.status(200).send(result)
    });
})

//excluir dev
app.delete('/api/delete/dev/:id', (req, res) => {
    db.query("DELETE FROM dev WHERE id= ?", req.params.id, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send(result)
        }
        res.status(204).send(result)
    })
})
    
/////////////////////////////////
//levels
/////////////////////////////////

//lista todos os níveis
app.get("/api/list/level/:pgn", (req, res) => {
    //se não houver erro, lista todos os níveis
    let limit=''
    if (req.params.pgn!='all') {
        let pgn=(req.params.pgn-1)*6
        limit=`LIMIT ${pgn},6`
    }
    db.query(`
    SELECT 
        *,
        (SELECT COUNT(id) FROM level) AS total
    FROM 
        level 
    ORDER BY id DESC
    ${limit}
    `, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.status(200).send(result)
    })
});

//busca
app.get("/api/search/level/:search/:pgn", (req, res) => {
    db.query(`
    SELECT 
        * 
    FROM 
        level 
    WHERE 
        name LIKE '%`+req.params.search+`%' OR 
        description LIKE '%`+req.params.search+`%' 
    ORDER BY id DESC
    LIMIT ${req.params.pgn},6
    `, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send(result)
        }
        res.status(200).send(result)
    })
});

//listar um nível
app.get("/api/level/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM level WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send(result)
        }
        res.status(200).send(result)
    });
});

//criar nível
app.post('/api/create/level', (req, res) => {
    const name = req.body.name;
    const level = req.body.level;
    const description = req.body.description;
    console.log("Level criado: ",name, level, description)
    db.query("INSERT INTO level (name, level, description) VALUES (?,?,?)", [name, level, description], (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send(result)
        }
        console.log(result)
        res.status(201).send(result)
    });
})

//editar nível
app.post('/api/edit/level/:id', (req, res) => {
    const name = req.body.name;
    const level = req.body.level;
    const description = req.body.description;
    console.log("DEV atualizado: ",name, level, description)
    db.query("UPDATE level SET name = ?, level = ?, description = ? WHERE id = ?", [name, level, description, req.params.id], (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send(result)
        }
        console.log(result)
        res.status(200).send(result)
    });
})

//excluir nível
app.delete('/api/delete/level/:id', (req, res) => {
    db.query("SELECT * FROM level WHERE id = ?", req.params.id, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send(result)
        }
        if (result.length > 0) {
            db.query("DELETE FROM level WHERE id = ?", req.params.id, (err, result) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(result)
                }
                console.log(result)
                res.status(204).send(result)
            });
        } else {
            res.status(501).send(result)
        }
        
    });
})

/////////////////////////////////////////////
// inicia o servidor pra escutar a porta 3000
/////////////////////////////////////////////
app.listen(PORT, () => {
    //cria tabela de devs se não existir
    db.query(`
    CREATE TABLE IF NOT EXISTS dev (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        level INT(11) NOT NULL,
        description VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    )
    `, (err, result) => {
        if (err) {
            console.log(err)
        }
        //cria tabela de níveis se não existir
        db.query(`
        CREATE TABLE IF NOT EXISTS level (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
        )
        `, (err, result) => {
            if (err) {
                console.log(err)
            }
            //lista todos os devs com seus níveis
            db.query(`
            SELECT 
                d.id,
                d.name,
                l.name AS level,
                d.description 
            FROM 
                dev d 
                    LEFT JOIN level l ON l.id=d.level 
            ORDER BY d.id DESC
            `, (err, result) => {
                if (err) {
                    console.log(err)
                }
                //se não houver dados
                if (result.length === 0) {
                    //insere os devs de demonstração
                    devs.reverse()
                    devs.forEach(dev => {
                        db.query(`INSERT INTO dev (name, level, description) VALUES ('${dev.name}', '${dev.level}', '${dev.description}')`, (err, result) => {
                            if (err) {
                                console.log(err)
                            }
                        })
                    })
                    //insere os níveis de demonstração
                    levels.reverse()
                    levels.forEach(level => {   
                        db.query(`INSERT INTO level (name, description) VALUES ('${level.name}', '${level.description}')`, (err, result) => {
                            if (err) {
                                console.log(err)
                            }
                        })
                    })
                }
            })
        })
    })
    console.log(`Server is running on ${PORT}`)
})