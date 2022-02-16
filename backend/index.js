const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();

const PORT = 3002;
app.use(cors());
app.use(express.json())

const desenvolvedores = [
    //Eu
    { nivel: 1, nome: 'Flávio Pavim', datanascimento:'28/03/1988', sexo:'m', hobby: 'Desenvolver softwares' },
    //Dragon Ball
    { nivel: 2, nome: 'Goku', datanascimento:'26/12/1954', sexo:'m', hobby: 'Comer' },
    { nivel: 3, nome: 'Vegeta', datanascimento:'26/12/1954', sexo:'m', hobby: 'Lutar' },
    { nivel: 4, nome: 'Gohan', datanascimento:'26/12/1954', sexo:'m', hobby: 'Lutar' },
    { nivel: 5, nome: 'Piccolo', datanascimento:'26/12/1954', sexo:'m', hobby: 'Lutar' },
    { nivel: 6, nome: 'Trunks', datanascimento:'26/12/1954', sexo:'m', hobby: 'Viajar' },
    { nivel: 7, nome: 'Majin Buu', datanascimento:'26/12/1954', sexo:'m', hobby: '---' },
    { nivel: 8, nome: 'Cell', datanascimento:'26/12/1954', sexo:'m', hobby: 'Destruir' },
    { nivel: 9, nome: 'Frieza', datanascimento:'26/12/1954', sexo:'m', hobby: 'Destruir' },
    { nivel: 10, nome: 'Android 18', datanascimento:'26/12/1954', sexo:'m', hobby: '---' },
    { nivel: 11, nome: 'Android 17', datanascimento:'26/12/1954', sexo:'m', hobby: '---' },
    { nivel: 12, nome: 'Android 16', datanascimento:'26/12/1954', sexo:'m', hobby: 'Destruir' },
    //Star Wars
    { nivel: 16, nome: 'Luke Skywalker', datanascimento:'26/12/1954', sexo:'m', hobby: 'Combater os Sith' },
    { nivel: 16, nome: 'Darth Vader', datanascimento:'26/12/1954', sexo:'m', hobby: 'Destruir' },
    { nivel: 17, nome: 'Count Dooku', datanascimento:'26/12/1954', sexo:'m', hobby: '---' },
    { nivel: 17, nome: 'Darth Maul', datanascimento:'26/12/1954', sexo:'m', hobby: '---' },
    { nivel: 18, nome: 'Yoda', datanascimento:'26/12/1954', sexo:'m', hobby: 'Viajar gostar eu' },
    { nivel: 18, nome: 'Qui-Gon Jinn', datanascimento:'26/12/1954', sexo:'m', hobby: '---' },
    { nivel: 19, nome: 'Mace Windu', datanascimento:'26/12/1954', sexo:'m', hobby: '---' },
    { nivel: 20, nome: 'Darth Sidious', datanascimento:'26/12/1954', sexo:'m', hobby: '---' },
    { nivel: 21, nome: 'Anakin Skywalker', datanascimento:'26/12/1954', sexo:'m', hobby: '---' },
    { nivel: 22, nome: 'Obi-Wan Kenobi', datanascimento:'26/12/1954', sexo:'m', hobby: '---' }
]

//níveis de demonstração
const niveis = [
    'Jedi Padawan',//23
    'Sith Apprentice',
    'Jedi Knight',
    'Apprentice', //20
    'Master',
    'Sith Lord',
    'Jedi',
    'Jedi Master', //16
    'Super Sayajin', //15
    'Super Sayajin 2',
    'Super Sayajin 3',
    'Super Sayajin 4',
    'Super Sayajin 5',
    'Super Sayajin 6', //10
    'Super Sayajin 7',
    'Super Sayajin 8',
    'Super Sayajin 9',
    'Super Sayajin 10',
    'Super Sayajin 11',
    'Super Sayajin 12',
    'Super Sayajin 13',
    'Super Sayajin 14',
    'Super Sayajin 15', //1
]

app.get("/", (req, res) => {
    res.status(200).send({
        "message": "Hello World! Essa é API de desenvolvedores, acesse o Frontend no endereço: http://localhost:3000"
    })
})

/////////////////////////////////
//desenvolvedores
/////////////////////////////////

//lista desenvolvedores
app.get("/api/listar/desenvolvedores/:paginacao", (req, res) => {
    //lista todos os desenvolvedores com seus níveis
    let paginacao=(req.params.paginacao-1)*6
    db.query(`
    SELECT 
        d.id,
        n.nivel,
        d.nome,
        d.sexo,
        d.datanascimento,
        d.hobby,
        (SELECT COUNT(id) FROM desenvolvedores) AS total
    FROM 
        desenvolvedores d 
            LEFT JOIN nivel n ON n.id=d.nivel 
    ORDER BY d.id DESC
    LIMIT ${paginacao},6
    `, (err, result) => {
        if (err) {
            console.log(err)
        }
        //send status 200 and result
        res.status(200).send(result)
    })
});

//busca desenvolvedores
app.get("/api/buscar/desenvolvedores/:busca/:paginacao", (req, res) => {
    let paginacao=(req.params.paginacao-1)*6
    db.query(`
    SELECT 
        d.id,
        d.name,
        n.nivel,
        d.hobby,
        (SELECT 
            COUNT(d.id)
        FROM 
            desenvolvedores d
                LEFT JOIN nivel n ON n.id=d.nivel
        WHERE 
            d.name LIKE '%${req.params.busca}%' OR
            d.hobby LIKE '%${req.params.busca}%' OR
            n.name LIKE '%${req.params.busca}%') AS total
    FROM 
        desenvolvedores d
            LEFT JOIN nivel n ON n.id=d.nivel
    WHERE 
        d.name LIKE '%${req.params.busca}%' OR
        d.hobby LIKE '%${req.params.busca}%' OR
        n.name LIKE '%${req.params.busca}%'
    ORDER BY d.id DESC
    LIMIT ${paginacao},6
    `, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.status(200).send(result)
    })
});

//busca desenvolvedor
app.get("/api/desenvolvedor/:id", (req, res) => {
    const id = req.params.id;
    db.query(`
    SELECT 
        d.id,
        n.nivel,
        d.nome,
        d.sexo,
        d.datanascimento,
        d.hobby 
    FROM 
        desenvolvedores d 
            LEFT JOIN nivel n ON n.id=d.nivel 
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

//criar desenvolvedor
app.post('/api/cadastrar/desenvolvedor', (req, res) => {
    const nivel = req.body.nivel;
    const nome = req.body.nome;
    const sexo = req.body.sexo;
    const datanascimento = req.body.datanascimento;
    const hobby = req.body.hobby;
    db.query("INSERT INTO desenvolvedores (nivel, nome, sexo, datanascimento, hobby) "+
        "VALUES (?,?,?,?,?)", [nivel, nome, sexo, datanascimento, hobby], (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send(result)
        }
        console.log(result)
        res.status(201).send(result)
    }
    );
})

//editar desenvolvedor
app.patch('/api/editar/desenvolvedor/:id', (req, res) => {
    const id = req.params.id;
    const nivel = req.body.nivel;
    const nome = req.body.nome;
    const sexo = req.body.sexo;
    const datanascimento = req.body.datanascimento;
    const hobby = req.body.hobby;
    //update desenvolvedor
    db.query("UPDATE desenvolvedores SET "+
        "nivel = ?, nome = ?, sexo = ?, datanascimento = ?, hobby = ? "+
        "WHERE id = ?", [nivel, nome, sexo, datanascimento, hobby, id], (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send(result)
        }
        console.log(result)
        res.status(200).send(result)
    });
})

//excluir desenvolvedor
app.delete('/api/excluir/desenvolvedor/:id', (req, res) => {
    db.query("DELETE FROM desenvolvedores WHERE id= ?", req.params.id, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send(result)
        }
        res.status(204).send(result)
    })
})
    
/////////////////////////////////
//niveis
/////////////////////////////////

//lista níveis
app.get("/api/listar/niveis/:paginacao", (req, res) => {
    //se for o pedido pro select de níveis
    let limit=''
    if (req.params.paginacao!='todos') {
        let paginacao=(req.params.paginacao-1)*6
        limit=`LIMIT ${paginacao},6`
    }
    db.query(`
    SELECT 
        n.*,
        (SELECT COUNT(id) FROM nivel) AS total,
        (SELECT COUNT(id) FROM desenvolvedores WHERE nivel = n.id) AS total_desenvolvedores
    FROM 
        nivel n
    ORDER BY n.id DESC
    ${limit}
    `, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.status(200).send(result)
    })
});

//busca níveis
app.get("/api/buscar/niveis/:busca/:paginacao", (req, res) => {
    db.query(`
    SELECT 
        n.*,
        (SELECT COUNT(id) FROM nivel) AS total,
        (SELECT COUNT(id) FROM desenvolvedores WHERE nivel = n.id) AS total_desenvolvedores
    FROM 
        nivel n
    WHERE 
        n.name LIKE '%`+req.params.busca+`%' OR 
        n.hobby LIKE '%`+req.params.busca+`%' 
    ORDER BY n.id DESC
    LIMIT ${req.params.paginacao},6
    `, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send(result)
        }
        res.status(200).send(result)
    })
});

//listar nível
app.get("/api/nivel/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM nivel WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send(result)
        }
        res.status(200).send(result)
    });
});

//criar nível
app.post('/api/cadastrar/nivel', (req, res) => {
    const nivel = req.body.nivel;
    db.query("INSERT INTO nivel (nivel) VALUES (?)", [nivel], (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send(result)
        }
        console.log(result)
        res.status(201).send(result)
    });
})

//editar nível
app.patch('/api/editar/nivel/:id', (req, res) => {
    const id = req.params.id;
    const nivel = req.body.nivel;
    db.query("UPDATE nivel SET nivel = ? WHERE id = ?", [nivel, id], (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send(result)
        }
        console.log(result)
        res.status(200).send(result)
    });
})

//excluir nível
app.delete('/api/excluir/nivel/:id', (req, res) => {
    let id=req.params.id
    db.query("SELECT * FROM nivel WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send(result)
        }
        if (result.length > 0) {
            db.query(`SELECT * FROM desenvolvedores WHERE nivel=?`,id,(err,result2)=>{
                if(err){
                    console.log(err)
                }
                if(result2.length==0){
                    db.query("DELETE FROM nivel WHERE id= ?", id, (err, result3) => {
                        if (err) {
                            console.log(err)
                            res.status(400).send({
                                error: "Não foi possível excluir o nível"
                            })
                        }
                        console.log(result)
                        res.status(204).send({
                            error: "Nível excluído com sucesso"
                        })
                    })
                } else {
                    //já existe desenvolvedores com esse nível
                    console.log(result2)
                    //resultado personalizado
                    res.status(501).send({
                        error: "Não é possível excluir esse nível, pois existem desenvolvedores vinculados à ele"
                    })
                    //res.status(501).send(result)
                }
            })
        } else {
            console.log(result)
            res.status(501).send(result)
        }
        
    });
})

/////////////////////////////////////////////
// inicia o servidor pra escutar a porta 3000
/////////////////////////////////////////////

app.listen(PORT, () => {
    //cria tabela de desenvolvedores se não existir
    db.query(`
    CREATE TABLE IF NOT EXISTS nivel (
        id INT NOT NULL AUTO_INCREMENT,
        nivel VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    )
    `, (err, result) => {
        if (err) {
            console.log(err)
        }
        //cria tabela de níveis se não existir
        db.query(`
        CREATE TABLE IF NOT EXISTS desenvolvedores (
            id INT NOT NULL AUTO_INCREMENT,
            nivel INT NOT NULL,
            nome VARCHAR(255) NOT NULL,
            sexo CHAR(1) NOT NULL,
            datanascimento DATE NOT NULL,
            hobby VARCHAR(255) NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (nivel) REFERENCES nivel(id)
        )
        `, (err, result) => {
            if (err) {
                console.log(err)
            }
            //lista todos os desenvolvedores com seus níveis
            db.query(`
            SELECT 
                d.id,
                n.nivel,
                d.nome,
                d.sexo,
                d.datanascimento,
                d.hobby
            FROM 
                desenvolvedores d 
                    LEFT JOIN nivel n ON n.id=d.nivel 
            ORDER BY d.id DESC
            `, (err, result) => {
                if (err) {
                    console.log(err)
                }
                //se não houver dados
                if (result.length === 0) {
                    
                    //insere os níveis de demonstração
                    niveis.reverse()
                    niveis.forEach(nivel => {   
                        db.query(`INSERT INTO nivel (nivel) VALUES ('${nivel}')`, (err, result) => {
                            if (err) {
                                console.log(err)
                            }
                        })
                    })
                    //insere os desenvolvedores de demonstração
                    desenvolvedores.reverse()
                    desenvolvedores.forEach(desenvolvedor => {
                        //formata datanascimento pra yyyy-mm-dd
                        let datanascimento = desenvolvedor.datanascimento.split("/")
                        desenvolvedor.datanascimento = datanascimento[2] + "-" + datanascimento[1] + "-" + datanascimento[0]
                        db.query(`
                        INSERT INTO 
                            desenvolvedores 
                                (nivel, nome, sexo, datanascimento, hobby) 
                        VALUES 
                            (
                                '${desenvolvedor.nivel}', 
                                '${desenvolvedor.nome}', 
                                '${desenvolvedor.sexo}',
                                '${desenvolvedor.datanascimento}',
                                '${desenvolvedor.hobby}'
                            )
                        `, (err, result) => {
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

//testes unitários
/*
const assert = require('assert');
describe('Testes unitários', function() {
    describe('Teste de criação de nível', function() {
        it('Deve criar nível', function() {
            db.query("INSERT INTO level (name, description) VALUES ('teste', 'teste')", (err, result) => {
                if (err) {
                    console.log(err)
                }
                assert.equal(result.affectedRows, 1)
            })
        })
    })
    describe('Teste de criação de dev', function() {
        it('Deve criar dev', function() {
            db.query("INSERT INTO dev (name, level, description) VALUES ('teste', '1', 'teste')", (err, result) => {
                if (err) {
                    console.log(err)
                }
                assert.equal(result.affectedRows, 1)
            })
        })
    })
    describe('Teste de busca de nível', function() {
        it('Deve buscar nível', function() {
            db.query("SELECT * FROM level WHERE id = 1", (err, result) => {
                if (err) {
                    console.log(err)
                }
                assert.equal(result[0].name, 'teste')
            })
        })
    })
    describe('Teste de busca de dev', function() {
        it('Deve buscar dev', function() {
            db.query("SELECT * FROM dev WHERE id = 1", (err, result) => {
                if (err) {
                    console.log(err)
                }
                assert.equal(result[0].name, 'teste')
            })
        })
    })
    describe('Teste de atualização de nível', function() {
        it('Deve atualizar nível', function() {
            db.query("UPDATE level SET name = 'teste2' WHERE id = 1", (err, result) => {
                if (err) {
                    console.log(err)
                }
                assert.equal(result.affectedRows, 1)
            })
        })
    })
    describe('Teste de atualização de dev', function() {
        it('Deve atualizar dev', function() {
            db.query("UPDATE dev SET name = 'teste2' WHERE id = 1", (err, result) => {
                if (err) {
                    console.log(err)
                }
                assert.equal(result.affectedRows, 1)
            })
        })
    }
    )
    describe('Teste de exclusão de nível', function() {
        it('Deve excluir nível', function() {
            db.query("DELETE FROM level WHERE id = 1", (err, result) => {
                if (err) {
                    console.log(err)
                }
                assert.equal(result.affectedRows, 1)
            })
        })
    }
    )
    describe('Teste de exclusão de dev', function() {
        it('Deve excluir dev', function() {
            db.query("DELETE FROM dev WHERE id = 1", (err, result) => {
                if (err) {
                    console.log(err)
                }
                assert.equal(result.affectedRows, 1)
            })
        })
    }
    )
})
*/