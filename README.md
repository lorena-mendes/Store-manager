# Projeto Store Manager
Projeto realizado durante o curso de desenvolvimento web da Trybe.

## O que foi desenvolvido
Neste projeto, foi desenvolvido uma API utilizando a arquitetura MSC (Model-Service-Controller). A API é um sistema de gerenciamento de vendas no formato dropshipping, com funcionalidades para criar, visualizar, excluir e atualizar produtos e vendas. Foi utilizado o banco de dados MySQL para armazenar os dados. A API seguiu os princípios do estilo arquitetural RESTful.

## Tecnologias utilizadas
* JavaScript
* Node.js
* Express
* Docker
* MySQL
* Arquitetura MSC

## Pré-requisitos
Antes de começar a desenvolver e rodar a aplicação, certifique-se de ter os seguintes pré-requisitos instalados em seu sistema:
* Node.js: se não tiver o node instalado, você pode baixar a versão mais recente no site oficial (https://nodejs.org) e seguir as instruções de instalação apropriadas para o seu sistema operacional.
* Docker: O Docker é uma plataforma de virtualização leve que permite empacotar e distribuir aplicações em contêineres. Certifique-se de ter o Docker instalado em sua máquina. Você pode fazer o download do Docker em seu site oficial (https://www.docker.com/get-started) e seguir as instruções de instalação adequadas para o seu sistema operacional.
* MySQL: Instale o MySQL Server em seu sistema. Você pode baixar a versão adequada para o seu sistema operacional no site oficial: https://dev.mysql.com/downloads/installer/.

## Como rodar a aplicação
* Após clonar o repositório, rode o serviço `node` com o comando `docker-compose up -d`. Esse serviço irá inicializar um container chamado `store_manager`. A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.
* Use o comando `docker exec -it store_manager bash`. Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.
* Instale as dependências com o `npm install` e execute a aplicação com o `npm start` ou `npm run debug`.


## Desenvolvedor 
Lorena Mendes - https://github.com/lorena-mendes
