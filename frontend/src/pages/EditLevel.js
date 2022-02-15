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

    const [level, setDev] = useState({
        name: '',
        description: ''
    })

    useEffect(() => {
        const id = window.location.href.split('/')[5]
        Axios.get('http://localhost:3002/api/level/' + id)
            .then(response => {
                setDev(response.data[0])
            })
    }, [])

    function handleChange(event) {
        setDev({
            ...level,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        const id = window.location.href.split('/')[5]
        if (level.name=='') {
            toast.error("O título não pode ser vazio!")
        } else if (level.description=='') {
            toast.error("A descrição não pode ser vazia!")
        } else {
            Axios.patch('http://localhost:3002/api/edit/level/'+id, 
                { name: level.name, description: level.description }
            ).then(response => {
                toast.success("Editado com sucesso!")
                history.push("/list/level")
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
            <a href="/list/level" className="btn btn-xs btn-default">Ver níveis</a>
            <div className="space"></div>
            <div className="form-group">
                    <label>Título do nível:</label>
                    <input className="form-control" type="text" name="name" value={level.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Descrição:</label>
                    <textarea className="form-control" type="text" name="description" value={level.description} onChange={handleChange} />
                </div>
                <input className="btn btn-success right" type="submit" value="Editar nível" />
            </form>
        </div>
    )

}

export default EditLevel