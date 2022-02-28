# React CRUD MySQL test

Teste feito com carinho pra amostra de habilidades de CRUD em React com MySQL

No repositório encontra-se duas pastas na raiz: backend e frontend

1. Baixe o repositório completo
2. Instale as dependências (npm i) de forma individual (na pasta backend e na pasta frontend)
3. Edite o arquivo backend/config/db.js com a configuração de conexão com o banco de dados (utilize algum programa pra usar o MySQL)
4. Só rodar cada uma das pastas com npm start

---------------------------------------------

#### Endpoints utilizados no projeto

#### URL base: http://localhost:3002

---------------------------------------------

#### Desenvolvedores:

```
Endpoint: /listar/desenvolvedores/:paginacao
Método - GET
Função: Listar desenvolvedores
```

```
Endpoint: /buscar/desenvolvedores/:busca/:paginacao
Método - GET
Função: Busca por desenvolvedores
```

```
Endpoint: /desenvolvedor/:id
Método - GET
Função: Listar desenvolvedor
```

```
Endpoint: /cadastrar/desenvolvedor
Método - POST
Função: Criar desenvolvedor
```

```
Endpoint: /editar/desenvolvedor
Método - PATCH
Função: Editar desenvolvedor
```

```
Endpoint: /excluir/desenvolvedor/:id
Método - DELETE
Função: Editar desenvolvedor
```

#### Níveis:

```
Endpoint: /listar/niveis/:paginacao
Método - GET
Função: Listar níveis
```

```
Endpoint: /buscar/nivel/:busca/:paginacao
Método - GET
Função: Busca níveis
```

```
Endpoint: /nivel/:id
Método - GET
Função: Listar nível
```

```
Endpoint: /cadastrar/nivel
Método - POST
Função: Criar nível
```

```
Endpoint: /editar/nivel/:id
Método - PATCH
Função: Editar nível
```

```
Endpoint: /excluir/nivel/:id
Método - DELETE
Função: Editar nível
```