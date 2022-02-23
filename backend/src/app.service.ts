import { Injectable, Param } from '@nestjs/common';
import { Desenvolvedores } from './desevolvedores.entity';

import "reflect-metadata";
import { getConnection, Like } from "typeorm";
import { Niveis } from './niveis.entity';

@Injectable()
export class AppService {

  helloWorld(): string {
    return 'Hello World!';
  }

  //listar desenvolvedores
  async listarDesenvolvedores(): Promise<Desenvolvedores[]> {
      const defaultConnection = getConnection();
      const desenvolvedores = await defaultConnection.getRepository(Desenvolvedores).find();
      return desenvolvedores;
  }

  //listar desenvolvedores paginando
  async listarDesenvolvedoresPaginacao(paginacao): Promise<Desenvolvedores[]> {
      const defaultConnection = getConnection();
      const desenvolvedores = await defaultConnection.getRepository(Desenvolvedores).find({
          skip: parseInt(paginacao)-1,
          take: 10
      });
      return desenvolvedores;
  }

  //api/buscar/desenvolvedores/:busca/:paginacao
  async buscarDesenvolvedores(@Param('busca') busca: string, @Param('paginacao') paginacao: string): Promise<Desenvolvedores[]> {
      const defaultConnection = getConnection();

      //buscar desenvolvedor where nome like '%busca%'
      const desenvolvedores = await defaultConnection.getRepository(Desenvolvedores).find({
          where: {
              nome: Like(`%${busca}%`),
              nivel: Like(`%${busca}%`)
          },
          skip: parseInt(paginacao)-1,
          take: 10
      });

      
      return desenvolvedores;
  }

  //api/desenvolvedor/:id
  async buscarDesenvolvedor(@Param('id') id: number): Promise<Desenvolvedores> {
      const defaultConnection = getConnection();
      const desenvolvedor = await defaultConnection.getRepository(Desenvolvedores).findOne(id);
      return desenvolvedor;
  }

  //api/cadastrar/desenvolvedor
  async cadastrarDesenvolvedor(desenvolvedor: Desenvolvedores): Promise<Desenvolvedores> {
      const defaultConnection = getConnection();
      const desenvolvedorCadastrado = await defaultConnection.getRepository(Desenvolvedores).save(desenvolvedor);
      return desenvolvedorCadastrado;
  }

  //api/editar/desenvolvedor/:id
  async editarDesenvolvedor(@Param('id') id: number, desenvolvedor: Desenvolvedores): Promise<any> {
      const defaultConnection = getConnection();
      const desenvolvedorEditado = await defaultConnection.getRepository(Desenvolvedores).update(id, desenvolvedor);
      return desenvolvedorEditado;
  }

  //api/deletar/desenvolvedor/:id
  async excluirDesenvolvedor(@Param('id') id: number): Promise<any> {
      const defaultConnection = getConnection();
      const desenvolvedorExcluido = await defaultConnection.getRepository(Desenvolvedores).delete(id);
      if (desenvolvedorExcluido.affected === 1) {
          return {
            message: 'Desenvolvedor excluído com sucesso'
          }
      } else {
          return {
            message: 'Desenvolvedor não encontrado'
          }
      }
  }

  //listar niveis
  async listarNiveis(): Promise<Niveis[]> {
      const defaultConnection = getConnection();
      const niveis = await defaultConnection.getRepository(Niveis).find();
      return niveis;
  }

  //listar niveis com paginação
  async listarNiveisPaginacao(@Param('paginacao') paginacao:string): Promise<Niveis[]> {
    const defaultConnection = getConnection();
    const niveis = await defaultConnection.getRepository(Niveis).find({
        skip: parseInt(paginacao)-1,
        take: 10
    });
    return niveis;
  }

  //api/buscar/niveis/:busca/:paginacao
  async buscarNiveis(@Param('busca') busca: string, @Param('paginacao') paginacao: string): Promise<Niveis[]> {
      const defaultConnection = getConnection();
      const niveis = await defaultConnection.getRepository(Niveis).find({
          where: {
              nivel: Like(`%${busca}%`)
          },
          skip: parseInt(paginacao)-1,
          take: 10
      });
      return niveis;
  }

  //api/nivel/:id
  async buscarNivel(@Param('id') id: number): Promise<Niveis> {
      const defaultConnection = getConnection();
      const nivel = await defaultConnection.getRepository(Niveis).findOne(id);
      return nivel;
  }

  //api/cadastrar/nivel
  async cadastrarNivel(nivel: Niveis): Promise<Niveis> {
      const defaultConnection = getConnection();
      const nivelCadastrado = await defaultConnection.getRepository(Niveis).save(nivel)
      return nivelCadastrado;
  }

  //api/editar/nivel/:id
  async editarNivel(@Param('id') id: number, nivel: Niveis): Promise<any> {
      const defaultConnection = getConnection();
      const nivelEditado = await defaultConnection.getRepository(Niveis).update(id, nivel);
      return nivelEditado;
  }

  //api/deletar/nivel/:id
  async excluirNivel(@Param('id') id: number): Promise<any> {
      const defaultConnection = getConnection()

      //verificar se algum desenvolvedor está associado ao nível
      const desenvolvedores = await defaultConnection.getRepository(Desenvolvedores).find({
          where: {
              nivel: Like(`%${id}%`)
          }
      });

      if (desenvolvedores.length > 0) {
          return {
            message: 'Nível não pode ser excluído, pois existem desenvolvedores associados a ele'
          }
      } else {
          const nivelExcluido = await defaultConnection.getRepository(Niveis).delete(id)
          if (nivelExcluido.affected === 1) {
            return {
              message: 'Nível excluído com sucesso'
            }
        } else {
            return {
              message: 'Nível não encontrado'
            }
        }
      }
      
  }

  


}
