import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import '../App.css'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditarDesenvolvedor() {

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

    const [desenvolvedor, setarDesenvolvedor] = useState({
        nivel: '',
        nome: '',
        sexo: '',
        datanascimento: '',
        hobby: ''
    })
    const [niveis, setarNiveis] = useState([])
    const [nivel_id, setarNivelID] = useState(0)

    useEffect(() => {

        const id = window.location.href.split('/')[5]
        
        //busca dados do desenvolvedor selecionado
        Axios.get('http://localhost:3002/api/desenvolvedor/' + id)
            .then(response => {
              
                //formata data de nascimento para dd/mm/yyyy
                let data = response.data[0].datanascimento
                data = data.substring(8, 10) + '/' + data.substring(5, 7) + '/' + data.substring(0, 4)
                response.data[0].datanascimento = data
                
                //seta os valores do desenvolvedor
                setarDesenvolvedor(response.data[0])

                //busca todos os niveis para o select
                Axios.get('http://localhost:3002/api/listar/niveis/todos').then(response2 => {
                    setarNiveis([]);
                    response2.data.forEach(nivel => {
                        setarNiveis(niveis => [...niveis, { value: nivel.id, label: nivel.nivel }])
                        //seleciona o nivel
                        if (nivel.name == response.data[0].nivel) {
                            setarNivelID(nivel.id)
                        }
                        
                    })
                }).catch(error => {
                    toast.error("Erro ao listar os níveis!")
                })
            }).catch(error => {
                toast.error("Erro ao listar os desenvolvedor!")
            })

    }, [])
    
    function manipularMudanca(event) {
        if (event.target.name == "sexo") {
            //verificar se digitou o sexo certo
            if (event.target.value=='m' || event.target.value=='f') {
                setarDesenvolvedor({
                    ...desenvolvedor,
                    [event.target.name]: event.target.value
                })
            } else {
                toast.error("Sexo inválido!")
            }

        } else if (event.target.name == "datanascimento") {
            //formata a data conforme digita
            let data = event.target.value
            if (data.length == 2) {
                data = data + '/'
            } else if (data.length == 5) {
                data = data + '/'
            }
            event.target.value=data
            if (data.length > 10) {
                data = event.target.value = data.substring(0, 10)
            }
            if (data.length == 10 && Number(data.substring(6, 10)) < 1950) {
                event.target.value = data.substring(0, 6)+'1950'
            }
        }
        setarDesenvolvedor({
            ...desenvolvedor,
            [event.target.name]: event.target.value
        })
        //set nivel id
        if (event.target.name == 'nivel') {
            setarNivelID(event.target.value)
        }
    }

    //formata e atualiza
    function manipularCadastro(event) {
        event.preventDefault()
        if (desenvolvedor.nivel=='') {
            toast.error("O nivel não pode ser vazio!")
        } else if (desenvolvedor.nome=='') {
            toast.error("O nome não pode ser vazio!")
        } else if (desenvolvedor.hobby=='') {
            toast.error("A descrição não pode ser vazia!")
        } else {
            const id = window.location.href.split('/')[5]
            Axios.patch('http://localhost:3002/api/editar/desenvolvedor/'+id, { 
                    nivel: nivel_id, 
                    nome: desenvolvedor.nome, 
                    sexo: desenvolvedor.sexo, 
                    datanascimento: desenvolvedor.datanascimento, 
                    hobby: desenvolvedor.hobby
            }).then(response => {
                toast.success("Desenvolvedor editado com sucesso!")
                historico.push("/")
            }).catch(error => {
                toast.error("Erro ao editar desenvolvedor!")
            })
        }
    } 

    return (
        <div className="container">
            <h2>Editar desenvolvedor</h2>
            <a href="/listar/desenvolvedores" className="btn btn-xs btn-default">Ver desenvolvedores</a>
            <div className="space"></div>
            <form onSubmit={manipularCadastro}>
                <div className="form-group">
                    <label>Nível:</label>
                    <select className="form-control" name="nivel" value={desenvolvedor.nivel} onChange={manipularMudanca}>
                        {
                            niveis.map(nivel => {
                                return <option key={nivel.value} value={nivel.value}>{nivel.label}</option>
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Nome do desenvolvedor:</label>
                    <input className="form-control" type="text" name="nome" value={desenvolvedor.nome} onChange={manipularMudanca} />
                </div>
                <div className="form-group">
                    <label>Sexo:</label>
                    <input className="form-control" type="text" name="sexo" value={desenvolvedor.sexo} onChange={manipularMudanca} />
                </div>
                <div className="form-group">
                    <label>Data de nascimento:</label>
                    <input className="form-control" type="text" name="datanascimento" value={desenvolvedor.datanascimento} onChange={manipularMudanca} />
                </div>
                <div className="form-group">
                    <label>Hobby:</label>
                    <input className="form-control" type="text" name="hobby" onChange={manipularMudanca} value={desenvolvedor.hobby}></input>
                </div>
                <input className="btn btn-success right" type="submit" value="Atualizar desenvolvedor" />
            </form>
        </div>
    )
}

export default EditarDesenvolvedor