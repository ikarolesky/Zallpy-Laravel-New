import Header from "./Header";
import { Outlet } from "react-router-dom";
import React, { Fragment } from 'react';

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Aqui o React Router renderiza as rotas */}
        <Fragment>
          <h1 id="sistema-de-cadastro-de-cooperados---laravel--react--docker">
            Sistema de Cadastro de Cooperados - Laravel + React + Docker
          </h1>
          <h2 id="resumo-do-projeto">Resumo do Projeto</h2>
          <p>
            Este projeto é um sistema robusto para cadastro, edição, visualização e
            remoção lógica &#40;soft delete&#41; de cooperados, implementado com{' '}
            <strong>Laravel 10</strong> no backend e <strong>React</strong> no
            frontend, usando <strong>Vite</strong> para build e bundling.
          </p>
          <p>
            O backend segue a arquitetura DDD &#40;Domain-Driven Design&#41; com
            separação clara entre domínio, aplicação, infraestrutura e apresentação.
            Utiliza Laravel Sanctum para autenticação API.
          </p>
          <p>
            O frontend React consome a API via chamadas REST, tem validação dinâmica
            de CPF/CNPJ e telefone &#40;formatação brasileira&#41;, e telas para
            cadastro, edição e listagem com filtros.
          </p>
          <hr />
          <h2 id="funcionalidades">Funcionalidades</h2>
          <ul>
            <li>
              Cadastro de cooperados com campos dinâmicos para CPF/CNPJ e validações
              específicas
            </li>
            <li>
              Edição e visualização de cooperados com restrição de alteração de
              CPF/CNPJ
            </li>
            <li>Remoção lógica &#40;soft delete&#41; dos registros</li>
            <li>
              Validações robustas no backend com FormRequests e regras customizadas
              para CPF, CNPJ e telefone brasileiro
            </li>
            <li>Autenticação via Laravel Sanctum &#40;token-based&#41;</li>
            <li>
              Frontend React integrado com Vite para experiência SPA e hot reload
            </li>
            <li>Filtros dinâmicos para busca de cooperados por nome, CPF ou CNPJ</li>
            <li>
              Docker configurado para ambiente de desenvolvimento completo com PHP,
              MySQL, Nginx e Node.js
            </li>
          </ul>
          <hr />
          <h2 id="tecnologias-usadas">Tecnologias Usadas</h2>
          <ul>
            <li>
              <strong>Backend:</strong> Laravel 10, PHP 8.2, MySQL, Laravel Sanctum
            </li>
            <li>
              <strong>Frontend:</strong> React 18, Vite, Axios
            </li>
            <li>
              <strong>Infraestrutura:</strong> Docker, Docker Compose, Nginx, Node.js
            </li>
            <li>
              <strong>Validações:</strong> FormRequests Laravel, Custom Validation
              Rules &#40;CPF, CNPJ, Telefone BR&#41;
            </li>
          </ul>
          <hr />
          <h2 id="estrutura-e-abordagem">Estrutura e Abordagem</h2>
          <p>O projeto segue o padrão DDD com camadas bem definidas:</p>
          <ul>
            <li>
              <strong>Domain:</strong> Entidades, regras de negócio, Value Objects
              &#40;CPF/CNPJ, renda/faturamento&#41;
            </li>
            <li>
              <strong>Application:</strong> Serviços de aplicação, DTOs, casos de uso
            </li>
            <li>
              <strong>Infrastructure:</strong> Persistência com Eloquent,
              Repositórios, Serviços externos
            </li>
            <li>
              <strong>Presentation:</strong> Controllers API REST, FormRequests,
              autenticação
            </li>
          </ul>
          <p>
            Frontend em React modular com validações dinâmicas e máscara para campos
            críticos.
          </p>
          <hr />
          <h2 id="como-rodar-o-projeto-com-docker">
            Como Rodar o Projeto com Docker
          </h2>
          <ol>
            <li>
              <p>Clone ou extraia o projeto no seu ambiente local.</p>
            </li>
            <li>
              <p>
                Configure o arquivo <code>.env</code> a partir do{' '}
                <code>.env.example</code>, especialmente a parte do banco:
              </p>
              <p>
                DB_CONNECTION=mysql DB_HOST=db DB_PORT=3306 DB_DATABASE=cooperados
                DB_USERNAME=user DB_PASSWORD=secret APP_URL=
                <a href="http://localhost:8000">http://localhost:8000</a>
              </p>
            </li>
          </ol>
          <ol start="3">
            <li>
              <p>Para construir e subir os containers, rode:</p>
              <p>make up</p>
            </li>
            <li>
              <p>Instale dependências PHP e JS:</p>
              <p>make composer-install make npm-install</p>
            </li>
            <li>
              <p>Gere a chave da aplicação e rode as migrations:</p>
              <p>make key-generate make migrate make seed</p>
            </li>
            <li>
              <p>Inicie o servidor Laravel e o Vite para desenvolvimento:</p>
              <p>make serve make vite-dev</p>
            </li>
            <li>
              <p>Acesse no navegador:</p>
              <ul>
                <li>
                  Backend + Frontend integrado via Nginx:{' '}
                  <a href="http://localhost:8000">http://localhost:8000</a>
                </li>
              </ul>
            </li>
          </ol>
          <p>Para rodar os testes PHP &#40;PHPUnit&#41;, execute:</p>
          <p>make test</p>
          <hr />
          <h2 id="rotas-principais">Rotas Principais</h2>
          <h3 id="api-rest-prefixo-apiv1">
            API REST &#40;prefixo: <code>/api/v1</code>&#41;
          </h3>
          <table>
            <thead>
              <tr>
                <th>Método</th>
                <th>Rota</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GET</td>
                <td>/api/v1/cooperados</td>
                <td>Listar cooperados &#40;com filtros&#41;</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/api/v1/cooperados</td>
                <td>Criar cooperado</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/api/v1/cooperados/&#123;id&#125;</td>
                <td>Detalhes de cooperado</td>
              </tr>
              <tr>
                <td>PUT</td>
                <td>/api/v1/cooperados/&#123;id&#125;</td>
                <td>Atualizar cooperado &#40;sem alterar CPF/CNPJ&#41;</td>
              </tr>
              <tr>
                <td>DELETE</td>
                <td>/api/v1/cooperados/&#123;id&#125;</td>
                <td>Remoção lógica &#40;soft delete&#41;</td>
              </tr>
            </tbody>
          </table>
          <h3 id="frontend-react">Frontend React</h3>
          <ul>
            <li>
              <code>/</code> - Página inicial com descrição do projeto
            </li>
            <li>
              <code>/cooperados</code> - Lista de cooperados
            </li>
            <li>
              <code>/cooperados/create</code> - Tela de cadastro
            </li>
            <li>
              <code>/cooperados/&#123;id&#125;</code> - Tela de visualização e edição
            </li>
          </ul>
          <hr />
        </Fragment>
      </main>
    </div>
  );
};

export default App;
