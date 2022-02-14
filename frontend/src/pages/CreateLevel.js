import React, { useState } from 'react';
import Axios from 'axios'
import '../App.css'
import { useHistory } from "react-router-dom";


function CreateLevel() {

    let history = useHistory();

    const [level, setLevel] = useState({
        name: '',
        level: 0,
        description: ''
    })

    function handleChange(event) {
        setLevel({
            ...level,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(level)
        Axios.post('http://localhost:3002/api/create/level', 
            { name: level.name, level: level.level, description: level.description }
        )
        history.push("/list/level")
    }
    
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label>Título do nível:</label>
                    <input className="form-control" type="text" name="name" value={level.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Nível:</label>
                    <input className="form-control" type="number" name="level" value={level.level} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Descrição:</label>
                    <input className="form-control" type="text" name="description" value={level.description} onChange={handleChange} />
                </div>
                <input className="btn btn-success right" type="submit" value="Cadastrar nível" />
            </form>
        </div>
    )

}

export default CreateLevel