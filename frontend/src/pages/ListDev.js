import React, { useState, useEffect } from 'react'
import '../App.css'
import { useHistory } from "react-router-dom";

function ListDev() {

    let history = useHistory();

    const [devList, setDevList] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        let action = history.location.pathname.split("/")[1];
        let table = history.location.pathname.split("/")[2];
        let search_ = history.location.pathname.split("/")[3];
        setPage(1)
        if (action=='search' && table=='dev' && typeof search_!='undefined') {
            setSearch(search_)
            if (typeof history.location.pathname.split("/")[4]!='undefined') {
                setPage(history.location.pathname.split("/")[4])
            }
            fetch(`http://localhost:3002/api/search/dev/${search}/${page}`)
                .then(res => res.json())
                .then(data => {
                    setDevList(data);
                })
        } else {
            if (typeof history.location.pathname.split("/")[3]!='undefined') {
                setPage(history.location.pathname.split("/")[3])
            }
            fetch(`http://localhost:3002/api/list/dev/${page}`)
                .then(response => response.json())
                .then(data => {
                    setDevList(data);
                });
        }
    },[history.location.pathname]);

    function handleDelete(id) {
        fetch(`http://localhost:3002/api/delete/dev/${id}`, {
            method: 'DELETE'
        }).then(res => {
            fetch(`http://localhost:3002/api/list/dev/${page}`)
                .then(response => response.json())
                .then(data => {
                    setDevList(data);
            });
        })
    }

    function handleEdit(pg) {
        //pg.preventDefault()
        setPage(pg);
        history.push('/edit/dev/'+pg);
    }

    function handleChange(event) {
        event.preventDefault()
        setSearch(event.target.value)
    }

    function handleSearch(event) {
        event.preventDefault()
        if (page!='') {
            history.push('/search/dev/'+search+'/'+page);
        } else {
            history.push('/search/dev/'+search);
        }
        
    }

    
    function changePage(pg){
        setPage(pg)
        if (search!='') {
            history.push('/search/dev/'+search+'/'+pg);
        } else {
            history.push('/list/dev/'+pg);
        }
        
    
    }

    let links=0
    if (devList.length>0) {
        links = Math.ceil(devList[0].total/6);
    }

    let pages=[];
    for (let i=1; i<=links; i++) {
        pages.push(i);
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
                            <input className="form-control" type="text" name="search" value={search} onChange={handleChange} placeholder="Digite um nome, descrição ou nível" />
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

            <div className="row">
                <div className="col-md-12">
                    <div className="pagination right">
                        <ul className="pagination">
                            {
                                pages.map((val, key) => {
                                    return (
                                        <li key={key} className={page==val ? 'active' : ''}><a onClick={()=>changePage(val)} value={val}>{val}</a></li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default ListDev