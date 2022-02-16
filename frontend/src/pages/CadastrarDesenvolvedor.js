import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import '../App.css'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CadatrarDesenvolvedor() {

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

    function manipularMudanca(event) {
        if (event.target.name == "sexo") {
            //verificar se digitou o sexo certo
            if (event.target.value=='m' || event.target.value=='f') {
                setarDesenvolvedor({
                    ...desenvolvedor,
                    [event.target.name]: event.target.value
                })
            } else {
                toast.error("Sexo inválido")
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
            event.target.value=data
            //se o dia for maior que 31, setar o dia para 31
            if (data.substring(0, 2) > 31) {
                data = event.target.value = '31/' + data.substring(3, 5) + '/' + data.substring(6, 10)
            }
            event.target.value=data
            //se o mês for maior que 12, setar o mês para 12
            if (data.substring(3, 5) > 12) {
                data = event.target.value = data.substring(0, 2) + '/' + '12' + '/' + data.substring(6, 10)
            }
            event.target.value=data
            //se o ano for menor que 1900, setar o ano para 1900
            if (data.length == 10 && Number(data.substring(6, 10)) < 1900) {
                event.target.value = data.substring(0, 6)+'1900'
            }
        }
        setarDesenvolvedor({
            ...desenvolvedor,
            [event.target.name]: event.target.value
        })
    }

    function manipularCadastro(event) {
        event.preventDefault()
        if (desenvolvedor.nivel=='') {
            toast.error("Selecione o nível")
        } else if (desenvolvedor.nome=='') {
            toast.error("Digite um nome")
        } else if (desenvolvedor.sexo=='') {
            toast.error("Selecione o sexo")
        } else if (desenvolvedor.datanascimento=='') {
            toast.error("Digite a data de nascimento")
        } else if (desenvolvedor.hobby=='') {
            toast.error("Digite a o hobby")
        } else {
            
            //formata data para yyyy-mm-dd antes de enviar
            let dataNascimento=
                desenvolvedor.datanascimento.substring(6, 10)+'-'+
                desenvolvedor.datanascimento.substring(3, 5)+'-'+
                desenvolvedor.datanascimento.substring(0, 2)

            Axios.post('http://localhost:3002/api/cadastrar/desenvolvedor', { 
                nivel:desenvolvedor.nivel, 
                nome: desenvolvedor.nome, 
                sexo: desenvolvedor.sexo, 
                datanascimento: dataNascimento, 
                hobby: desenvolvedor.hobby 
            }).then(response => {
                toast.success("Cadastrado com sucesso")
                historico.push("/")
            }).catch(error => {
                toast.error("Erro ao cadastrar")
            })
        }
    }

    useEffect(() => {
        Axios.get('http://localhost:3002/api/listar/niveis/todos').then(response => {
            setarNiveis([{value:'Selecione um nível', label:'Selecione um nível'}]);
            response.data.forEach(nivel => {
                setarNiveis(niveis => [...niveis, { value: nivel.id, label: nivel.nivel }])
            })
        }).catch(error => {
            toast.error("Erro ao listar todos os níveis!")
        })
    }, [])

    return (
        <div className="container">
            <h2>Cadastrar desenvolvedor</h2>
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
                    <select className="form-control" type="text" name="sexo" value={desenvolvedor.sexo} onChange={manipularMudanca}>
                        <option value="">Selecione o sexo</option>
                        <option value="m">Masculino</option>
                        <option value="f">Feminino</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Data de nascimento:</label>
                    <input className="form-control" type="text" name="datanascimento" value={desenvolvedor.datanascimento} onChange={manipularMudanca} />
                </div>
                <div className="form-group">
                    <label>Hobby:</label>
                    <input className="form-control" type="text" name="hobby" value={desenvolvedor.hobby} onChange={manipularMudanca} />
                </div>
                <input className="btn btn-success right" type="submit" value="Cadastrar desenvolvedor" />
            </form>
        </div>
    )
}

export default CadatrarDesenvolvedor