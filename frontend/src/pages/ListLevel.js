import React, { useState, useEffect } from 'react'
import '../App.css'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ListLevel() {

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

    const [levelList, setLevelList] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [delete_id, setDeleteID] = useState('');
    const [showHide, setShowHide] = useState('hide');

    useEffect(() => {
        let action = history.location.pathname.split("/")[1];
        let table = history.location.pathname.split("/")[2];
        let search_ = history.location.pathname.split("/")[3];
        setPage(1)
        if (action=='search' && table=='level' && typeof search_!=undefined) {
            setSearch(search_)
            if (typeof history.location.pathname.split("/")[4]!='undefined') {
                setPage(history.location.pathname.split("/")[4])
            }
            fetch(`http://localhost:3002/api/search/level/${search}/${page}`)
                .then(res => res.json())
                .then(data => {
                    setLevelList(data);
                })
        } else {
            if (typeof history.location.pathname.split("/")[3]!='undefined') {
                setPage(history.location.pathname.split("/")[3])
            }
            fetch(`http://localhost:3002/api/list/level/${page}`)
                .then(response => response.json())
                .then(data => {
                    setLevelList(data);
                });
        }
    },[history.location.pathname])
    
    function handleDelete() {
        setShowHide('hide');
        fetch(`http://localhost:3002/api/delete/level/${delete_id}`, {
            method: 'DELETE'
        }).then(res => {
            fetch(`http://localhost:3002/api/list/level/${page}`)
                .then(response => response.json())
                .then(data => {
                    setLevelList(data);
            }).then(() => {
                toast.success('Nível excluído com sucesso!');   
            }).catch(error => {
                toast.error('Não foi possível excluir o nível')
                toast.error(error)
            });
            
        }).catch(error => {
            toast.error('Não foi possível excluir o nível')
            toast.error(error)
        })
    }

    function handleChange(event) {
        event.preventDefault()
        setSearch(event.target.value)
    }

    function handleSearch(event) {
        event.preventDefault()
        history.push('/search/level/'+search+'/'+page)
    }

    function changePage(page){
        setPage(page)
        history.push('/list/level/'+page);
    }

    let links=0
    if (levelList.length>0) {
        links = Math.ceil(levelList[0].total/6);
    }

    let pages=[];
    for (let i=1; i<=links; i++) {
        pages.push(i);
    }

    function closeMyModal() {
        setShowHide('hide');
    }
    function showModal(id) {
        setDeleteID(id);
        setShowHide('show');
    }

    return (
        <div className="container">
            <div className={"myModalBG "+showHide}>
                <div className="myModal">
                    <div className="myModalTitle">Excluir</div>
                    <div className="myModalBody">
                        Tem certeza que deseja excluir este ítem?
                    </div>
                    <div className="myModalFooter right">
                        <button className="btn btn-default" onClick={closeMyModal}>Fechar</button>
                        <button className="btn btn-success" onClick={handleDelete}>Confirmar</button>
                    </div>
                </div>
            </div>
            <h2>Níveis</h2>
            <a href="/create/level" className="btn btn-xs btn-default">Cadastrar nível</a>
            <div className="space"></div>
            <form>
                <div className="row">
                    <div className="col-md-9">
                        <div className="form-group">
                            <label>Pesquisar:</label>
                            <input className="form-control" type="text" name="search" value={search} onChange={handleChange} placeholder="Digite o nível ou a descrição do nivel" />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="spaceLabel"></div>
                        <button onClick={handleSearch} type="submit" className="btn btn-block btn-default">Pesquisar</button>
                    </div>
                </div>
            </form>
            <div className="row">
                {levelList.map((val, key) => {
                    return (
                        <div key={key} className="col-md-4">
                            <div className="box">
                                <i className="glyphicon glyphicon-remove" onClick={() => showModal(val.id)}></i>
                                <i className="glyphicon glyphicon-pencil" onClick={() => history.push('/edit/level/'+val.id)}></i>
                                <div>Nome: {val.name}</div>
                                <div>Descrição: {val.description}</div>
                                <div>Desenvolvedores com esse nível: {val.total_dev}</div>
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
                                //for paginação


                                
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

export default ListLevel