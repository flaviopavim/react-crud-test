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

    let historico = useHistory();

    const [niveisList, setLevelList] = useState([]);
    const [busca, setarBusca] = useState('');
    const [paginacao, setarPaginacao] = useState(1);
    const [excluir_id, setarExcluirID] = useState('');
    const [esconderMostrar, setarEsconderMostrar] = useState('hide');

    useEffect(() => {
        let action = historico.location.pathname.split("/")[1];
        let tabela = historico.location.pathname.split("/")[2];
        let search_ = historico.location.pathname.split("/")[3];
        setarPaginacao(1)
        if (action=='busca' && tabela=='nivel' && typeof search_!=undefined) {
            setarBusca(search_)
            if (typeof historico.location.pathname.split("/")[4]!='undefined') {
                setarPaginacao(historico.location.pathname.split("/")[4])
            }
            fetch(`http://localhost:3002/api/buscar/niveis/${busca}/${paginacao}`)
                .then(res => res.json())
                .then(data => {
                    setLevelList(data);
                })
        } else {
            if (typeof historico.location.pathname.split("/")[3]!='undefined') {
                setarPaginacao(historico.location.pathname.split("/")[3])
            }
            fetch(`http://localhost:3002/api/listar/niveis/${paginacao}`)
                .then(response => response.json())
                .then(data => {
                    setLevelList(data);
                });
        }
    },[historico.location.pathname])
    
    function manipularExclusao() {
        setarEsconderMostrar('hide');
        fetch(`http://localhost:3002/api/excluir/nivel/${excluir_id}`, {
            method: 'DELETE'
        }).then(res => {
            if (res.status == 501) {
                res.json().then(data => {
                    toast.error(data.error);
                });
            } else {
                fetch(`http://localhost:3002/api/listar/niveis/${paginacao}`)
                .then(response => response.json())
                .then(data => {
                    setLevelList(data)
                    toast.success('Nível excluído com sucesso');
                }).catch(error => {
                    toast.error('Não foi possível excluir o nível')
                    toast.error(error)
                });
            }
        }).catch(error => {
            toast.error('Não foi possível excluir o nível')
            toast.error(error.error)
        })
    }

    function handleChange(event) {
        event.preventDefault()
        setarBusca(event.target.value)
    }

    function handleSearch(event) {
        event.preventDefault()
        historico.push(`/buscar/niveis/${busca}/${paginacao}`)
    }

    function changePage(paginacao){
        setarPaginacao(paginacao)
        historico.push(`/listar/niveis/${paginacao}`);
    }

    let links=0
    if (niveisList.length>0) {
        links = Math.ceil(niveisList[0].total/6);
    }

    let paginas=[];
    for (let i=1; i<=links; i++) {
        paginas.push(i);
    }

    function fecharModal() {
        setarEsconderMostrar('hide');
    }
    function showModal(id) {
        setarExcluirID(id);
        setarEsconderMostrar('show');
    }

    return (
        <div className="container">
            <div className={"myModalBG "+esconderMostrar}>
                <div className="myModal">
                    <div className="myModalTitle">Excluir</div>
                    <div className="myModalBody">
                        Tem certeza que deseja excluir este ítem?
                    </div>
                    <div className="myModalFooter right">
                        <button className="btn btn-default" onClick={fecharModal}>Fechar</button>
                        <button className="btn btn-success" onClick={manipularExclusao}>Confirmar</button>
                    </div>
                </div>
            </div>
            <h2>Níveis</h2>
            <a href="/cadastrar/nivel" className="btn btn-xs btn-default">Cadastrar nível</a>
            <div className="space"></div>
            <form>
                <div className="row">
                    <div className="col-md-9">
                        <div className="form-group">
                            <label>Pesquisar:</label>
                            <input className="form-control" type="text" name="busca" value={busca} onChange={handleChange} placeholder="Digite o nível ou a descrição do nivel" />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="spaceLabel"></div>
                        <button onClick={handleSearch} type="submit" className="btn btn-block btn-default">Pesquisar</button>
                    </div>
                </div>
            </form>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th>Nível</th>
                        <th>Desenvolvedores com esse nível</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {niveisList.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>Nível: {val.nivel}</td>
                                <td>{val.total_desenvolvedores}</td>
                                <td>
                                    <div className="right">
                                        <a className="btn btn-xs btn-warning margin-right" onClick={() => historico.push('/editar/nivel/'+val.id)}>Editar</a>
                                        <a className="btn btn-xs btn-danger" onClick={() => showModal(val.id)}>Excluir</a>
                                    </div>
                                </td>
                            </tr>
                        )}
                    )}
                </tbody>
            </table>
            
            <div className="row">
                <div className="col-md-12">
                    <div className="pagination right">
                        <ul className="pagination">
                            {
                                paginas.map((val, key) => {
                                    return (
                                        <li key={key} className={paginacao==val ? 'active' : ''}><a onClick={()=>changePage(val)} value={val}>{val}</a></li>
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