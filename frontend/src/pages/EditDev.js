import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import '../App.css'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditDev() {

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

    const [desenvolvedor, setDesenvolvedor] = useState({
        nivel: '',
        nome: '',
        sexo: '',
        datanascimento: '',
        hobby: ''
    })


    const [niveis, setNiveis] = useState([])
    const [nivel_id, setNivelID] = useState(0)

    useEffect(() => {
        const id = window.location.href.split('/')[5]
        Axios.get('http://localhost:3002/api/desenvolvedor/' + id)
            .then(response => {
                setDesenvolvedor(response.data[0])
                Axios.get('http://localhost:3002/api/listar/niveis/todos').then(response2 => {
                    setNiveis([]);
                    response2.data.forEach(nivel => {
                        setNiveis(niveis => [...niveis, { value: nivel.id, label: nivel.nivel }])

                        //seleciona o nivel
                        if (nivel.name == response.data[0].nivel) {
                            setNivelID(nivel.id)
                        }

                    })
                }).catch(error => {
                    toast.error("Erro ao listar os níveis!")
                })
            }).catch(error => {
                toast.error("Erro ao listar os desenvolvedores!")
            })

    }, [])
    
    function handleChange(event) {
        setDesenvolvedor({
            ...desenvolvedor,
            [event.target.name]: event.target.value
        })
        //set nivel id
        if (event.target.name == 'nivel') {
            setNivelID(event.target.value)
        }
        
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(desenvolvedor)

        if (desenvolvedor.name=='') {
            toast.error("O nome não pode ser vazio!")
        } else if (desenvolvedor.nivel=='') {
            toast.error("O nivel não pode ser vazio!")
        } else if (desenvolvedor.description=='') {
            toast.error("A descrição não pode ser vazia!")
        } else {
            const id = window.location.href.split('/')[5]
            Axios.patch('http://localhost:3002/api/edit/desenvolvedor/'+id, 
                { name: desenvolvedor.name, nivel: nivel_id, description: desenvolvedor.description }
            ).then(response => {
                toast.success("Desenvolvedor editado com sucesso!")
                history.push("/")
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
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nível:</label>
                    <select className="form-control" name="nivel" value={desenvolvedor.nivel} onChange={handleChange}>
                        {
                            niveis.map(nivel => {
                                return <option key={nivel.value} value={nivel.value}>{nivel.label}</option>
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Nome do desenvolvedor:</label>
                    <input className="form-control" type="text" name="nome" value={desenvolvedor.nome} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Sexo:</label>
                    <input className="form-control" type="text" name="sexo" value={desenvolvedor.sexo} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Data de nascimento:</label>
                    <input className="form-control" type="text" name="datanascimento" value={desenvolvedor.datanascimento} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Descrição:</label>
                    <textarea className="form-control" name="hobby" onChange={handleChange}>{desenvolvedor.hobby}</textarea>
                </div>
                <input className="btn btn-success right" type="submit" value="Cadastrar desenvolvedor" />
            </form>
        </div>
    )
}

export default EditDev