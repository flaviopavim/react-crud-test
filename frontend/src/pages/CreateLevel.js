import React, { useState } from 'react';
import Axios from 'axios'
import '../App.css'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateLevel() {

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

    const [level, setLevel] = useState({
        name: '',
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

        //post para o backend
        

        Axios.post('http://localhost:3002/api/create/level', 
            { name: level.name, description: level.description }
        ).then(response => {
            toast("Atualizado com sucesso!");
            history.push("/list/level")
        })
        
    }
    
    return (
        <div className="container">
            <h2>Cadastrar nível</h2>
            <a href="/list/level" className="btn btn-xs btn-default">Ver níveis</a>
            <div className="space"></div>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label>Título do nível:</label>
                    <input className="form-control" type="text" name="name" value={level.name} onChange={handleChange} />
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