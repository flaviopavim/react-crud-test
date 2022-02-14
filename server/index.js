const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();

const PORT = 3002;
app.use(cors());
app.use(express.json())



//levels
app.get("/api/list/level", (req, res) => {
    db.query(`CREATE TABLE IF NOT EXISTS level (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        level INT(11) NOT NULL,
        description VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    )`, (err, result) => {
        if (err) throw err;
        db.query(`SELECT * FROM level ORDER BY id DESC`, (err, result) => {
            if (err) throw err;
            res.send(result)
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
        db.query(`SELECT * FROM dev ORDER BY id DESC`, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    })
    
});

app.get("/api/dev/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM dev WHERE id = ?", id, (err, result) => {
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