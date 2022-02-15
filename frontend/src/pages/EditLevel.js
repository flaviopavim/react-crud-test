import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import '../App.css'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditLevel() {

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

    useEffect(() => {
        const id = window.location.href.split('/')[5]
        Axios.get('http://localhost:3002/api/nivel/' + id)
            .then(response => {
                setNivel(response.data[0].nivel)
            })
            .catch(error => {
                toast.error("Erro ao listar os níveis!")
            })
    }, [])


    function handleChange(event) {
        setNivel(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        const id = window.location.href.split('/')[5]
        if (nivel=='') {
            toast.error("O título não pode ser vazio!")
        } else {
            Axios.patch('http://localhost:3002/api/editar/nivel/'+id, 
                { nivel: nivel }
            ).then(response => {
                toast.success("Nível editado com sucesso!")
                history.push("/listar/niveis")
            }).catch(error => {
                toast.error("Erro ao editar!")
                toast.error(error)
            })
        }
    }
            
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
            <h2>Editar nível</h2>
            <a href="/listar/niveis" className="btn btn-xs btn-default">Ver níveis</a>
            <div className="space"></div>
            <div className="form-group">
                    <label>Título do nível:</label>
                    <input className="form-control" type="text" name="name" value={nivel} onChange={handleChange} />
                </div>
                <input className="btn btn-success right" type="submit" value="Editar nível" />
            </form>
        </div>
    )

}

export default EditLevel