# Sistema de Cadastro de Cooperados - Laravel + React + Docker

## Resumo do Projeto

Este projeto é um sistema robusto para cadastro, edição, visualização e remoção lógica (soft delete) de cooperados, implementado com **Laravel 10** no backend e **React** no frontend, usando **Vite** para build e bundling.

O backend segue a arquitetura DDD (Domain-Driven Design) com separação clara entre domínio, aplicação, infraestrutura e apresentação. Utiliza Laravel Sanctum para autenticação API.

O frontend React consome a API via chamadas REST, tem validação dinâmica de CPF/CNPJ e telefone (formatação brasileira), e telas para cadastro, edição e listagem com filtros.

- - -

## Funcionalidades

*   Cadastro de cooperados com campos dinâmicos para CPF/CNPJ e validações específicas
*   Edição e visualização de cooperados com restrição de alteração de CPF/CNPJ
*   Remoção lógica (soft delete) dos registros
*   Validações robustas no backend com FormRequests e regras customizadas para CPF, CNPJ e telefone brasileiro
*   Autenticação via Laravel Sanctum (token-based)
*   Frontend React integrado com Vite para experiência SPA e hot reload
*   Filtros dinâmicos para busca de cooperados por nome, CPF ou CNPJ
*   Docker configurado para ambiente de desenvolvimento completo com PHP, MySQL, Nginx e Node.js

- - -

## Tecnologias Usadas

*   **Backend:** Laravel 10, PHP 8.2, MySQL, Laravel Sanctum
*   **Frontend:** React 18, Vite, Axios
*   **Infraestrutura:** Docker, Docker Compose, Nginx, Node.js
*   **Validações:** FormRequests Laravel, Custom Validation Rules (CPF, CNPJ, Telefone BR)

- - -

## Estrutura e Abordagem

O projeto segue o padrão DDD com camadas bem definidas:

*   **Domain:** Entidades, regras de negócio, Value Objects (CPF/CNPJ, renda/faturamento)
*   **Application:** Serviços de aplicação, DTOs, casos de uso
*   **Infrastructure:** Persistência com Eloquent, Repositórios, Serviços externos
*   **Presentation:** Controllers API REST, FormRequests, autenticação

Frontend em React modular com validações dinâmicas e máscara para campos críticos.

- - -

## Como Rodar o Projeto com Docker

1.  Clone ou extraia o projeto no seu ambiente local.
2.  Configure o arquivo `.env` a partir do `.env.example`, especialmente a parte do banco:
    
    DB\_CONNECTION=mysql
    DB\_HOST=db
    DB\_PORT=3306
    DB\_DATABASE=cooperados
    DB\_USERNAME=user
    DB\_PASSWORD=secret
    APP\_URL=http://localhost:8000
            
    
3.  Para construir e subir os containers, rode:
    
    make up
    
4.  Instale dependências PHP e JS:
    
    make composer-install
    make npm-install
    
5.  Gere a chave da aplicação e rode as migrations:
    
    make key-generate
    make migrate
    make seed
    
6.  Inicie o servidor Laravel e o Vite para desenvolvimento:
    
    make serve
    make vite-dev
    
7.  Acesse no navegador:
    *   Backend + Frontend integrado via Nginx: [http://localhost:8000](http://localhost:8000)
    *   Servidor Vite (hot reload): [http://localhost:5173](http://localhost:5173) (opcional)

Para rodar os testes PHP (PHPUnit), execute:

make test

- - -

## Rotas Principais

### API REST (prefixo: `/api/v1`)

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | /api/v1/cooperados | Listar cooperados (com filtros) |
| POST | /api/v1/cooperados | Criar cooperado |
| GET | /api/v1/cooperados/{id} | Detalhes de cooperado |
| PUT | /api/v1/cooperados/{id} | Atualizar cooperado (sem alterar CPF/CNPJ) |
| DELETE | /api/v1/cooperados/{id} | Remoção lógica (soft delete) |

### Frontend React

*   `/` - Página inicial, listagem e filtros
*   `/cooperados/create` - Tela de cadastro
*   `/cooperados/{id}` - Tela de visualização e edição

- - -