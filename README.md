<div align="center">
  <img alt="Devitools logo" src="https://devi.tools/images/logo-horizontal.png" />
</div>
<br>
<br>
<p align="center">
  <a href="#" style="text-decoration: none">
    <img alt="License" src="https://img.shields.io/github/license/devitools/starter-kit?color=34CB79" />
  </a>
  <a href="https://github.com/devitools/starter-kit/issues" style="text-decoration: none" target="_blank">
    <img alt="Issues" src="https://img.shields.io/github/issues/devitools/starter-kit?color=34CB79" />
  </a>
    <a href="https://github.com/devitools/starter-kit/graphs/contributors" style="text-decoration: none" target="_blank">
    <img src="https://img.shields.io/github/contributors/devitools/starter-kit?color=34CB79" />
  </a>
  <a href="#" style="text-decoration: none">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/devitools/starter-kit?color=34CB79" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/devitools/starter-kit/stargazers" style="text-decoration: none" target="_blank">
    <img alt="Github Stars" src="https://img.shields.io/github/stars/devitools/starter-kit?style=social" />
  </a>
  <a href="https://github.com/devitools/starter-kit/network/members" style="text-decoration: none" target="_blank">
    <img alt="Github Forks" src="https://img.shields.io/github/forks/devitools/starter-kit?style=social" />
  </a>
  <a href="https://twitter.com/devitools" style="text-decoration: none" target="_blank">
    <img alt="Twitter" src="https://img.shields.io/twitter/follow/devitools?label=Twitter&style=social" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/devitools/starter-kit/tags" style="text-decoration: none" target="_blank">
    <img alt="Github Tags" src="https://img.shields.io/github/v/tag/devitools/starter-kit.svg?logo=github" />
  </a>
  <a href="https://github.com/devitools/starter-kit/releases" style="text-decoration: none" target="_blank">
    <img alt="Github Releases" src="https://img.shields.io/github/last-commit/devitools/starter-kit.svg?label=Updated&logo=github&maxAge=600" />
  </a>
</p>

<p align="center">
 <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-contribuir">Contribuir</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#+1-documentacao">Documentação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## 💻 Projeto

_Template_ para iniciar um projeto Devitools utilizando Laravel (PHP) no backend e Quasar (Vue) no frontend.

## 🚀 Tecnologias

Este _template_ foi construído utilizando estas tecnologias:

- [Laravel](https://laravel.com)
- [Quasar](https://quasar.dev)

## 👍 Contribuir

Fique livre para abrir uma [_issue_](https://github.com/devitools/starter-kit/issues).

- Abra uma _issue_;
- Faça um _fork_ do projeto;
- Crie uma _branch_: `git checkout -b new-feature`
- Faça suas mudanças;
- Faça um _commit_ das suas mudanças: `git commit -m '[feature] New feature'`
- Envie sua branch com as modificações: `git push origin new-feature`
- Abra um _pull request_ referenciando o nº da sua _issue_.
- Acompanhe o andamento do seu _pull request_.

## ⚖ Licença

Este projeto está sob licença MIT. [Clique aqui](./LICENSE.md) para consultá-la.

## 📝 Documentação

Para baixar este template use as opções de clone do Github ou use o [Devitools CLI](https://github.com/devitools/cli).

Use o guia a seguir para preparar seu ambiente de desenvolvimento.

### ⌨️ Clonar o projeto e inicialiar o git

Para clonar esta branch é necessário usar o argumento `-b` no comando clone informando o nome da branch (templates/laravel-quasar).
Confira um exemplo abaixo.
```shell
git clone -b templates/laravel-quasar https://github.com/devitools/starter-kit.git
```

Após fazer o clone é preciso inicialiazar os sub-módulos que irão usar os recursos do [@devitools](https://devi.tools).
Use os comandos a seguir para providenciar isso.
```shell
git submodule sync --recursive
```
```shell
git submodule update --init --recursive
```

### 🛠 Backend

É possível configurar o ambiente de desenvolvimento do backend de três formas:
  - [Local](#-local);
  - [Docker](#-usando-docker);
  - [Makefile](#-usando-makefile).

#### 🏡 Local

```shell
cd backend
```

```shell
cp .env.example .env
```
Opcionalmente você pode editar no `.env` os valores de `APP_DEV_USERNAME` e `APP_DEV_PASSWORD` para definir o usuário e a senha padrão para acessar o sistema.
Por padrão os valores destas variáveis serão respectivamente `root@devi.tools` e `aq1sw2de3`.

```shell
composer install
```

```shell
php artisan key:generate
```

```shell
php artisan jwt:secret --force
```

```shell
php artisan migrate:fresh
```

Neste ponto já é possível acessar o backend na URL que está configurada no seu ambiente.

Vá para a seção de [frontend](#-frontend) para configurar a outra parte do ambiente de desenvolvimento.

---
#### 🐋 Usando Docker

```shell
cd backend
```

```shell
cp .env.example .env
```
Opcionalmente você pode editar no `.env` os valores de `APP_DEV_USERNAME` e `APP_DEV_PASSWORD` para definir o usuário e a senha padrão para acessar o sistema.
Por padrão os valores destas variáveis serão respectivamente `root@devi.tools` e `aq1sw2de3`.

```shell
cp docker-compose.yml.example docker-compose.yml
```
As definições do docker vem por padrão com o prefixo 'replace.app.short'. Edite o arquivo `docker-compose.yml` com o nome que for mais conveniente.

```shell
docker-compose up -d
```

```shell
docker-compose exec <replace.app.short>-nginx bash -c "su -c 'composer install' application"
```

```shell
docker-compose exec <replace.app.short>-nginx bash -c "su -c 'php artisan key:generate' application"
```

```shell
docker-compose exec <replace.app.short>-nginx bash -c "su -c 'php artisan jwt:secret --force' application"
```

```shell
docker-compose exec <replace.app.short>-nginx bash -c "su -c 'php artisan migrate:fresh' application"
```

Neste ponto, caso não tenha sido feita nenhuma modificação nos arquivos de configuração, é possível acessar o backend na URL [http://localhost:8080](http://localhost:8080).

Vá para a seção de [frontend](#-frontend) para configurar a outra parte do ambiente de desenvolvimento.

---
#### ⚙ Usando makefile

```shell
cd backend
```

```shell
cp .env.example .env
```

Opcionalmente você pode editar no `.env` os valores de `APP_DEV_USERNAME` e `APP_DEV_PASSWORD` para definir o usuário e a senha padrão para acessar o sistema.
Por padrão os valores destas variáveis serão respectivamente `root@devi.tools` e `aq1sw2de3`.

```shell
cp docker-compose.yml.example docker-compose.yml
```

```shell
make init
```

Neste ponto, caso não tenha sido feita nenhuma modificação nos arquivos de configuração, é possível acessar o backend na URL [http://localhost:8080](http://localhost:8080).

Vá para a seção de [frontend](#-frontend) para configurar a outra parte do ambiente de desenvolvimento.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)
### 🎨 Frontend

É possível configurar o ambiente de desenvolvimento do frontend de duas formas:
- [Yarn](#-usando-yarn);
- [NPM](#-usando-npm).

#### 🖱 Usando `yarn`

```shell
cd frontend
```

```shell
cp .env.example .env
```

Caso você tenha mudado as variáveis de `APP_DEV_USERNAME` e `APP_DEV_PASSWORD` no backend modifique no `.env` as variáveis `VUE_APP_DEV_USERNAME` e `VUE_APP_DEV_PASSWORD` para usar os mesmos valores informados anteriormente.

```shell
yarn
```

```shell
yarn dev
```

Ao executar este comando, caso não tenha sido feita nenhuma mudança nas configurações padrão, o navegador abrirá automaticamente a URL [http://localhost:8000](http://localhost:8000).

#### 🖲 Usando `npm`

```shell
cd frontend
```

```shell
cp .env.example .env
```

Caso você tenha mudado as variáveis de `APP_DEV_USERNAME` e `APP_DEV_PASSWORD` no backend modifique no `.env` as variáveis `VUE_APP_DEV_USERNAME` e `VUE_APP_DEV_PASSWORD` para usar os mesmos valores informados anteriormente.

```shell
npm install
```

```shell
npm run dev
```

Ao executar este comando, caso não tenha sido feita nenhuma mudança nas configurações padrão, o navegador abrirá automaticamente a URL [http://localhost:8000](http://localhost:8000).

