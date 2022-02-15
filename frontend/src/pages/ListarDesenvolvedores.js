import React, { useState, useEffect } from 'react'
import '../App.css'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ListarDesenvolvedores() {

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

    const [devList, setDevList] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [delete_id, setDeleteID] = useState('');
    const [showHide, setarEsconderMostrar] = useState('hide');

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
            fetch(`http://localhost:3002/api/buscar/desenvolvedores/${search}/${page}`)
                .then(res => res.json())
                .then(data => {
                    setDevList(data);
                }).catch(error => {
                    toast.error('Erro ao buscar desenvolvedores');
                    toast.error(error)
                })
        } else {
            if (typeof history.location.pathname.split("/")[3]!='undefined') {
                setPage(history.location.pathname.split("/")[3])
            }
            fetch(`http://localhost:3002/api/listar/desenvolvedores/${page}`)
                .then(response => response.json())
                .then(data => {
                    //formatar datanacimento em dd/mm/aaaa

                    //foreach data
                    data.forEach(element => {
                        if (element.datanascimento!='0000-00-00') {
                            let dataNascimento = new Date(element.datanascimento);
                            let dia = dataNascimento.getDate();
                            let mes = dataNascimento.getMonth() + 1;
                            let ano = dataNascimento.getFullYear();
                            element.idade=0;
                            if (typeof ano!='undefined') {
                                //adicionar zero à esquerda no dia
                                if (dia<10) {
                                    dia = '0' + dia;
                                }
                                //adicionar zero à esquerda no mês
                                if (mes<10) {
                                    mes = '0' + mes;
                                }
                                element.datanascimento = dia + '/' + mes + '/' + ano;
                                //calcular idade
                                element.idade = new Date().getFullYear() - ano;
                            }
                        } else {
                            element.datanascimento = 'Desconhecido';
                            element.idade = 0;
                        }
                    });

                    //data.datanascimento = data.datanascimento.split('T')[0].split('-').reverse().join('/');
                    
                    setDevList(data);
                }).catch(error => {
                    toast.error("Erro ao listar desenvolvedores")
                    toast.error(error)
                });
        }
    },[history.location.pathname]);

    function handleDelete() {
        setarEsconderMostrar('hide');
        fetch(`http://localhost:3002/api/excluir/desenvolvedor/${delete_id}`, {
            method: 'DELETE'
        }).then(res => {
            toast.success("Desenvolvedor excluído com sucesso!");
            fetch(`http://localhost:3002/api/listar/desenvolvedores/${page}`)
            .then(response => response.json())
            .then(data => {
                setDevList(data)
            }).catch(error => {
                toast.error('Erro ao excluir desenvolvedor');
                toast.error(error);
            });
        }).catch(error => {
            toast.error("Não foi possível excluir o desenvolvedor");
            toast.error(error)
        })
    }

    function handleEdit(pg) {
        setPage(pg);
        history.push('/editar/desenvolvedor/'+pg);
    }

    function handleChange(event) {
        event.preventDefault()
        setSearch(event.target.value)
    }

    function handleSearch(event) {
        event.preventDefault()
        if (page!='') {
            history.push('/buscar/desenvolvedores/'+search+'/'+page);
        } else {
            history.push('/buscar/desenvolvedores/'+search);
        }
        
    }

    
    function changePage(pg){
        setPage(pg)
        if (search!='') {
            history.push('/buscar/desenvolvedores/'+search+'/'+pg);
        } else {
            history.push('/listar/desenvolvedores/'+pg);
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
    
    function fecharModal() {
        setarEsconderMostrar('hide');
    }
    function showModal(id) {
        setDeleteID(id);
        setarEsconderMostrar('show');
    }

    

    return (
        <div className="container">
            <div className={"myModalBG "+showHide}>
                <div className="myModal">
                    <div className="myModalTitle">Excluir</div>
                    <div className="myModalBody">
                        Tem certeza que deseja excluir este desenvolvedor?
                    </div>
                    <div className="myModalFooter right">
                        <button className="btn btn-default" onClick={fecharModal}>Fechar</button>
                        <button className="btn btn-success" onClick={handleDelete}>Confirmar</button>
                    </div>
                </div>
            </div>
            <h2>Desenvolvedores</h2>
            <a href="/cadastrar/desenvolvedor" className="btn btn-xs btn-default">Cadastrar desenvolvedor</a>
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
                {devList.map((developer, key) => {
                    
                    //completa a string idade
                    let str_idade=''
                    if (typeof developer.idade!='undefined') {
                        if (developer.idade>0) {
                            str_idade=' ('+developer.idade+' anos)'
                        }
                    }

                    let str_sexo=''
                    if (developer.sexo=='m') {
                        str_sexo='Masculino'
                    } else if (developer.sexo=='f') {
                        str_sexo='Feminino'
                    } else {
                        str_sexo='Desconhecido'
                    }

                    return (
                        <div key={key} className="col-md-4">
                            <div className="box">
                                <i className="glyphicon glyphicon-remove" onClick={() => showModal(developer.id)}></i>
                                <i className="glyphicon glyphicon-pencil" onClick={() => handleEdit(developer.id)}></i>
                                <div><strong>Nível:</strong> {developer.nivel}</div>
                                <div><strong>Nome:</strong> {developer.nome}</div>
                                <div><strong>Sexo:</strong> {str_sexo}</div>
                                <div><strong>Data de nascimento:</strong> {developer.datanascimento}{str_idade}</div>
                                <div><strong>Hobby:</strong> {developer.hobby}</div>
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

export default ListarDesenvolvedores