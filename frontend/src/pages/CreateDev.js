import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import '../App.css'
import { useHistory } from "react-router-dom";


function CreateDev() {

    let history = useHistory();

    const [dev, setDev] = useState({
        name: '',
        level: '',
        description: ''
    })

    const [levels, setLevels] = useState([

    ])

    function handleChange(event) {
        setDev({
            ...dev,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(dev)
        Axios.post('http://localhost:3002/api/create/dev', 
            { name: dev.name, level: dev.level, description: dev.description }
        )
        history.push("/")
    }

    useEffect(() => {
        Axios.get('http://localhost:3002/api/list/level').then(response => {
            setLevels([]);
            response.data.forEach(level => {
                console.log(level)
                setLevels(levels => [...levels, { value: level.id, label: level.name }])
                if (level.id == dev.level) {
                    setDev({ ...dev, level: level.id })
                }
            })
        })
    }, [])
            
    
    return (
        <div className="container">
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