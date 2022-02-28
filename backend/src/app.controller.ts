import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Desenvolvedores } from './desevolvedores.entity';
import { Niveis } from './niveis.entity';

@Controller()
export class AppController {
  
  constructor(private readonly appService: AppService) {}

  @Get()
  helloWorld(): string {
    return this.appService.helloWorld()
  }


  @Get('/listar/desenvolvedores')
  listarDesenvolvedores(): any {
    return this.appService.listarDesenvolvedores()
  }

  @Get('/listar/desenvolvedores/:paginacao')
  listarDesenvolvedoresPaginacao(@Param('paginacao') paginacao: string): any {
    return this.appService.listarDesenvolvedoresPaginacao(paginacao)
  }

  @Get('/buscar/desenvolvedores/:busca/:paginacao')
  buscarDesenvolvedores(@Param('busca') busca: string, @Param('paginacao') paginacao: string): any {
    return this.appService.buscarDesenvolvedores(busca, paginacao)
  }

  @Get('/desenvolvedor/:id')
  buscarDesenvolvedor(@Param('id') id: number): any {
    return this.appService.buscarDesenvolvedor(id)
  }

  @Post('/cadastrar/desenvolvedor')
  cadastrarDesenvolvedor(@Body() desenvolvedor: Desenvolvedores): any {
    return this.appService.cadastrarDesenvolvedor(desenvolvedor)
  }

  @Patch('/editar/desenvolvedor/:id')
  editarDesenvolvedor(@Param('id') id: number, @Body() desenvolvedor: Desenvolvedores): any {
    return this.appService.editarDesenvolvedor(id, desenvolvedor)
  }

  @Delete('/excluir/desenvolvedor/:id')
  excluirDesenvolvedor(@Param('id') id: number): any {
    return this.appService.excluirDesenvolvedor(id)
  }

  @Get('/listar/niveis')
  listarNiveis(): any {
    return this.appService.listarNiveis();
  }

  @Get('/listar/niveis/:paginacao')
  listarNiveisPaginacao(@Param('paginacao') paginacao: string): any {
    return this.appService.listarNiveisPaginacao(paginacao)
  }

  @Get('/buscar/niveis/:busca/:paginacao')
  buscarNiveis(@Param('busca') busca: string, @Param('paginacao') paginacao: string): any {
    return this.appService.buscarNiveis(busca, paginacao)
  }

  @Get('/nivel/:id')
  buscarNivel(@Param('id') id: number): any {
    return this.appService.buscarNivel(id)
  }

  @Post('/cadastrar/nivel')
  cadastrarNivel(@Body() nivel: Niveis): any {
    return this.appService.cadastrarNivel(nivel)
  }

  @Patch('/editar/nivel/:id')
  editarNivel(@Param('id') id: number, @Body() nivel: Niveis): any {
    return this.appService.editarNivel(id,nivel)
  }

  @Delete('/excluir/nivel/:id')
  excluirNivel(@Param('id') id: number): any {
    return this.appService.excluirNivel(id)
  }

}
