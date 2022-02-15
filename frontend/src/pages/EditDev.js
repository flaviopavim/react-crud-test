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

    const [dev, setDev] = useState({
        id: '',
        name: '',
        level: '',
        description: ''
    })

    const [levels, setLevels] = useState([])
    const [level_id, setLevelID] = useState(0)

    useEffect(() => {
        const id = window.location.href.split('/')[5]
        Axios.get('http://localhost:3002/api/dev/' + id)
            .then(response => {
                setDev(response.data[0])
                Axios.get('http://localhost:3002/api/list/level/all').then(response2 => {
                    setLevels([]);
                    response2.data.forEach(level => {
                        console.log(level)
                        setLevels(levels => [...levels, { value: level.id, label: level.name }])

                        //seleciona o level
                        if (level.name == response.data[0].level) {
                            setLevelID(level.id)
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
        setDev({
            ...dev,
            [event.target.name]: event.target.value
        })
        //set level id
        if (event.target.name == 'level') {
            setLevelID(event.target.value)
        }
        
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
            const id = window.location.href.split('/')[5]
            Axios.post('http://localhost:3002/api/edit/dev/'+id, 
                { name: dev.name, level: level_id, description: dev.description }
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
            <a href="/list/dev" className="btn btn-xs btn-default">Ver desenvolvedores</a>
            <div className="space"></div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome do desenvolvedor:</label>
                    <input className="form-control" type="text" name="name" value={dev.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Nível:</label>
                    <select className="form-control" name="level" value={level_id} onChange={handleChange}>
                        {
                            levels.map(level => {
                                return <option key={level.value} value={level.value}>{level.label}</option>
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Descrição:</label>
                    <textarea className="form-control" name="description" value={dev.description} onChange={handleChange} />
                </div>
                <input className="btn btn-success right" type="submit" value="Editar desenvolvedor" />
            </form>
        </div>
    )
}

export default EditDev