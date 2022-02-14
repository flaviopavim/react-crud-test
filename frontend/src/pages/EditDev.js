import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import '../App.css'
import { useHistory } from "react-router-dom";

function EditDev() {
     
    let history = useHistory();

    const [dev, setDev] = useState({
        id: '',
        name: '',
        level: '',
        description: ''
    })

    useEffect(() => {
        const id = window.location.href.split('/')[5]
        Axios.get('http://localhost:3002/api/dev/' + id)
            .then(response => {
                setDev(response.data[0])
            })
    }, [])


    function handleChange(event) {
        setDev({
            ...dev,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(dev)
        const id = window.location.href.split('/')[5]
        Axios.post('http://localhost:3002/api/edit/dev/'+id, 
            { name: dev.name, level: dev.level, description: dev.description }
        )
        history.push("/")
    } 
    
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
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Descrição:</label>
                    <input className="form-control" type="text" name="description" value={dev.description} onChange={handleChange} />
                </div>
                <input className="btn btn-success right" type="submit" value="Editar desenvolvedor" />
            </form>
        </div>
    )
}

export default EditDev