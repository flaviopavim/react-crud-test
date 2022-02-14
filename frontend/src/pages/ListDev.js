import React, { useState, useEffect } from 'react'
import '../App.css'
import { useHistory } from "react-router-dom";

function ListDev() {

    let history = useHistory();

    const [devList, setDevList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3002/api/list/dev")
            .then(response => response.json())
            .then(data => {
                setDevList(data);
            });
    }, []);

    function handleDelete(id) {
        fetch(`http://localhost:3002/api/delete/dev/${id}`, {
            method: 'DELETE'
        })
        fetch("http://localhost:3002/api/list/dev")
            .then(response => response.json())
            .then(data => {
                setDevList(data);
        });   
    }

    function handleEdit(id) {
        history.push('/edit/dev/'+id);
    }

    return (
        <div className="container">
            <h1>Desenvolvedores</h1>
            <a href="/create/dev" className="btn btn-xs btn-default">Criar desenvolvedor</a>
            <div className="space"></div>
            <div className="row">
                {devList.map((val, key) => {
                    return (
                        <div key={key} className="col-md-4">
                            <div className="box">
                                <i className="glyphicon glyphicon-remove" onClick={() => handleDelete(val.id)}></i>
                                <i className="glyphicon glyphicon-pencil" onClick={() => handleEdit(val.id)}></i>
                                <div>Nome: {val.name}</div>
                                <div>Descrição: {val.description}</div>
                                <div>Nível: {val.level}</div>
                            </div>
                            <div className="space"></div>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default ListDev