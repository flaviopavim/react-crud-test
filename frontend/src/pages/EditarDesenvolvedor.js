import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import '../App.css'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditarDesenvolvedor() {

    toast.configure({
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
     
    let historico = useHistory();

    const [desenvolvedor, setarDesenvolvedor] = useState({
        nivel: '',
        nome: '',
        sexo: '',
        datanascimento: '',
        hobby: ''
    })
    const [niveis, setarNiveis] = useState([])
    const [nivel_id, setarNivelID] = useState(0)

    useEffect(() => {
        const id = window.location.href.split('/')[5]
        Axios.get('http://localhost:3002/api/desenvolvedor/' + id)
            .then(response => {
                setarDesenvolvedor(response.data[0])
                Axios.get('http://localhost:3002/api/listar/niveis/todos').then(response2 => {
                    setarNiveis([]);
                    response2.data.forEach(nivel => {
                        setarNiveis(niveis => [...niveis, { value: nivel.id, label: nivel.nivel }])
                        //seleciona o nivel
                        if (nivel.name == response.data[0].nivel) {
                            setarNivelID(nivel.id)
                        }
                    })
                }).catch(error => {
                    toast.error("Erro ao listar os níveis!")
                })
            }).catch(error => {
                toast.error("Erro ao listar os desenvolvedor!")
            })

    }, [])
    
    function manipularMudanca(event) {
        setarDesenvolvedor({
            ...desenvolvedor,
            [event.target.name]: event.target.value
        })
        //set nivel id
        if (event.target.name == 'nivel') {
            setarNivelID(event.target.value)
        }
    }

    function manipularCadastro(event) {
        event.preventDefault()
        if (desenvolvedor.nivel=='') {
            toast.error("O nivel não pode ser vazio!")
        } else if (desenvolvedor.nome=='') {
            toast.error("O nome não pode ser vazio!")
        } else if (desenvolvedor.hobby=='') {
            toast.error("A descrição não pode ser vazia!")
        } else {
            const id = window.location.href.split('/')[5]
            Axios.patch('http://localhost:3002/api/editar/desenvolvedor/'+id, { 
                    nivel: nivel_id, 
                    nome: desenvolvedor.nome, 
                    sexo: desenvolvedor.sexo, 
                    datanascimento: desenvolvedor.datanascimento, 
                    hobby: desenvolvedor.hobby
            }).then(response => {
                toast.success("Desenvolvedor editado com sucesso!")
                historico.push("/")
            }).catch(error => {
                toast.error("Erro ao editar desenvolvedor!")
            })
        }
    } 

    return (
        <div className="container">
            <h2>Editar desenvolvedor</h2>
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
                    <label>Hobby:</label>
                    <input className="form-control" type="text" name="hobby" onChange={manipularMudanca} value={desenvolvedor.hobby}></input>
                </div>
                <input className="btn btn-success right" type="submit" value="Atualizar desenvolvedor" />
            </form>
        </div>
    )
}

export default EditarDesenvolvedor