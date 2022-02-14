import React, { useState, useEffect } from 'react'
import '../App.css'
import { useHistory } from "react-router-dom";

function ListLevel() {

    let history = useHistory();

    const [devList, setDevList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3002/api/list/level")
            .then(response => response.json())
            .then(data => {
                setDevList(data);
            });
    }, []);
    
    function handleDelete(id) {
        fetch(`http://localhost:3002/api/delete/level/${id}`, {
            method: 'DELETE'
        }).then(res => {
            
            
        })
        fetch("http://localhost:3002/api/list/level")
            .then(response => response.json())
            .then(data => {
                setDevList(data);
        });   
    }

    return (
        <div className="container">
            <h1>Níveis</h1>
            <a href="/create/level" className="btn btn-xs btn-default">Criar nível</a>
            <div className="space"></div>
            <div className="row">
                {devList.map((val, key) => {
                    return (
                        <div key={key} className="col-md-4">
                            <div className="box">
                                <i className="glyphicon glyphicon-remove" onClick={() => handleDelete(val.id)}></i>
                                <i className="glyphicon glyphicon-pencil" onClick={() => history.push('/edit/level/'+val.id)}></i>
                                <div>Nome: {val.name}</div>
                                <div>Descrição: {val.description}</div>
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

export default ListLevel