import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import '../App.css'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CadatrarDesenvolvedor() {

    toast.configure({
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    let history = useHistory();

    const [desenvolvedor, setarDesenvolvedor] = useState({
        nivel: '',
        nome: '',
        sexo: '',
        datanascimento: '',
        hobby: ''
    })
    const [niveis, setNiveis] = useState([])

    function manipularMudanca(event) {
        setarDesenvolvedor({
            ...desenvolvedor,
            [event.target.name]: event.target.value
        })
    }

    function manipularCadastro(event) {
        event.preventDefault()
        console.log(desenvolvedor)
        if (desenvolvedor.nivel=='') {
            toast.error("Selecione o nível")
        } else if (desenvolvedor.nome=='') {
            toast.error("Digite um nome")
        } else if (desenvolvedor.sexo=='') {
            toast.error("Selecione o sexo")
        } else if (desenvolvedor.datanascimento=='') {
            toast.error("Digite a data de nascimento")
        } else if (desenvolvedor.hobby=='') {
            toast.error("Digite a o hobby")
        } else {
            Axios.post('http://localhost:3002/api/cadastrar/desenvolvedor', { 
                nivel:desenvolvedor.nivel, 
                nome: desenvolvedor.nome, 
                sexo: desenvolvedor.sexo, 
                datanascimento: desenvolvedor.datanascimento, 
                hobby: desenvolvedor.hobby 
            }).then(response => {
                toast.success("Cadastrado com sucesso!")
                history.push("/")
            }).catch(error => {
                toast.error("Erro ao cadastrar!")
            })
        }
    }

    useEffect(() => {
        Axios.get('http://localhost:3002/api/listar/niveis/todos').then(response => {
            setNiveis([{value:'Selecione um nível', label:'Selecione um nível'}]);
            response.data.forEach(nivel => {
                setNiveis(niveis => [...niveis, { value: nivel.id, label: nivel.nivel }])
            })
        }).catch(error => {
            toast.error("Erro ao listar todos os níveis!")
        })
    }, [])
            
    return (
        <div className="container">
            <h2>Cadastrar desenvolvedor</h2>
            <a href="/listar/desenvolvedores" className="btn btn-xs btn-default">Ver desenvolvedores</a>
            <div className="space"></div>
            <form onSubmit={manipularCadastro}>
                <div className="form-group">
                    <label>Nível:</label>
                    <select className="form-control" name="nivel" value={desenvolvedor.nivel} onChange={manipularMudanca}>
                        {
                            niveis.map(nivel => {
                                return <option key={nivel.value} value={nivel.value}>{nivel.label}</option>
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Nome do desenvolvedor:</label>
                    <input className="form-control" type="text" name="nome" value={desenvolvedor.nome} onChange={manipularMudanca} />
                </div>
                <div className="form-group">
                    <label>Sexo:</label>
                    <input className="form-control" type="text" name="sexo" value={desenvolvedor.sexo} onChange={manipularMudanca} />
                </div>
                <div className="form-group">
                    <label>Data de nascimento:</label>
                    <input className="form-control" type="text" name="datanascimento" value={desenvolvedor.datanascimento} onChange={manipularMudanca} />
                </div>
                <div className="form-group">
                    <label>Descrição:</label>
                    <textarea className="form-control" name="hobby" onChange={manipularMudanca}>{desenvolvedor.hobby}</textarea>
                </div>
                <input className="btn btn-success right" type="submit" value="Cadastrar desenvolvedor" />
            </form>
        </div>
    )
}

export default CadatrarDesenvolvedor