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

    const [nivel, setNivel] = useState('')

    function handleChange(event) {
        setNivel(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
    
        Axios.post('http://localhost:3002/api/cadastrar/nivel', { nivel: nivel }).then(response => {
            toast.success("Cadastrado com sucesso!");
            history.push("/listar/niveis")
        })
        
    }
    
    return (
        <div className="container">
            <h2>Cadastrar nível</h2>
            <a href="/listar/niveis" className="btn btn-xs btn-default">Ver níveis</a>
            <div className="space"></div>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label>Título do nível:</label>
                    <input className="form-control" type="text" name="nivel" value={nivel} onChange={handleChange} />
                </div>
                <input className="btn btn-success right" type="submit" value="Cadastrar nível" />
            </form>
        </div>
    )

}

export default CreateLevel