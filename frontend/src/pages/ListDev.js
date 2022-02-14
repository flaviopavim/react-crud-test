import React, { useState, useEffect } from 'react'
import '../App.css'
import { useHistory } from "react-router-dom";

function ListDev() {

    let history = useHistory();

    const [devList, setDevList] = useState([]);

    useEffect(() => {
        //if page == search
        let action = history.location.pathname.split("/")[1];
        let table = history.location.pathname.split("/")[2];
        let search = history.location.pathname.split("/")[3];
        console.log(search);
        if (action=='search' && table=='dev' && typeof search!=undefined) {
            
            fetch(`http://localhost:3002/api/search/dev/${search}`)
                .then(res => res.json())
                .then(data => {
                    setDevList(data);
                })
        } else {
            fetch("http://localhost:3002/api/list/dev")
                .then(response => response.json())
                .then(data => {
                setDevList(data);
            });
        }
    }, [history.location.pathname]);

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


    const [search, setSearch] = useState({
        search: ''
    });
    function handleChange(event) {
        event.preventDefault()
        setSearch({
            [event.target.name]: event.target.value
        })
        console.log(search)
    }

    function handleSearch(event) {
        event.preventDefault()
        console.log(search)
        history.push('/search/dev/'+search.search)
    }

    return (
        <div className="container">
            <h1>Desenvolvedores</h1>
            <a href="/create/dev" className="btn btn-xs btn-default">Criar desenvolvedor</a>
            <div className="space"></div>
            <form>
                <div className="row">
                    <div className="col-md-9">
                        <div className="form-group">
                            <label>Pesquisar:</label>
                            <input className="form-control" type="text" name="search" value={search.search} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="spaceLabel"></div>
                        <button onClick={handleSearch} type="submit" className="btn btn-block btn-default">Pesquisar</button>
                    </div>

                </div>
            </form>

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