import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import '../App.css'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateDev() {

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

    const [dev, setDev] = useState({
        name: '',
        level: '',
        description: ''
    })

    const [levels, setLevels] = useState([])

    function handleChange(event) {
        console.log(event)
        setDev({
            ...dev,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(dev)
        if (dev.name=='') {
            toast.error("O nome não pode ser vazio!")
        } else if (dev.level=='') {
            toast.error("O level não pode ser vazio!")
        } else if (dev.description=='') {
            toast.error("A descrição não pode ser vazia!")
        } else {
            Axios.post('http://localhost:3002/api/create/dev', 
                { name: dev.name, level:dev.level, description: dev.description }
            ).then(response => {
                toast.success("Cadastrado com sucesso!")
                history.push("/")
            }).catch(error => {
                toast.error("Erro ao cadastrar!")
                toast.error(error)
            })
        }
    }

    useEffect(() => {
        Axios.get('http://localhost:3002/api/list/level/all').then(response => {
            setLevels([{value:'Selecione um nível', label:'Selecione um nível'}]);
            response.data.forEach(level => {
                console.log(level)
                setLevels(levels => [...levels, { value: level.id, label: level.name }])
            })
        }).catch(error => {
            toast.error("Erro ao listar todos os níveis!")
            toast.error(error)
        })
    }, [])
            
    
    return (
        <div className="container">
            <h2>Cadastrar desenvolvedor</h2>
            <a href="/list/dev" className="btn btn-xs btn-default">Ver desenvolvedores</a>
            <div className="space"></div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome do desenvolvedor:</label>
                    <input className="form-control" type="text" name="name" value={dev.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Nível:</label>
                    <select className="form-control" name="level" value={dev.level} onChange={handleChange}>
                        {
                            levels.map(level => {
                                return <option key={level.value} value={level.value}>{level.label}</option>
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Descrição:</label>
                    <textarea className="form-control" name="description" onChange={handleChange}>{dev.description}</textarea>
                </div>
                <input className="btn btn-success right" type="submit" value="Cadastrar desenvolvedor" />
            </form>
        </div>
    )

}

export default CreateDev