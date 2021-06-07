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

### 🛠 Backend

É possível configurar o ambiente de desenvolvimento do backend de três formas:
  - [Local](#-local);
  - [Docker](#-usando-docker);
  - [Makefile](#-usando-makefile).

#### 🔰 🏡 Local

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
php artisan migrate:fresh
```
---
#### 🐋 Usando Docker

```shell
cd backend
```

```shell
cp .env.example .env
```

```shell
cp docker-compose.yml.example docker-compose.yml
```
Opcionalmente você pode editar no `.env` os valores de `APP_DEV_USERNAME` e `APP_DEV_PASSWORD` para definir o usuário e a senha padrão para acessar o sistema.
Por padrão os valores destas variáveis serão respectivamente `root@devi.tools` e `aq1sw2de3`.
```shell
docker-compose up -d
```

```shell
docker-compose exec devitools-nginx bash -c "su -c 'composer install' application"
```

```shell
docker-compose exec devitools-nginx bash -c "su -c 'php artisan key:generate' application"
```

```shell
docker-compose exec devitools-nginx bash -c "su -c 'php artisan jwt:secret --force' application"
```

```shell
docker-compose exec devitools-nginx bash -c "su -c 'php artisan migrate:fresh' application"
```

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
Opcionalmente você pode editar no `.env` os valores de `APP_DEV_USERNAME` e `APP_DEV_PASSWORD` para definir o usuário e a senha padrão para acessar o sistema.
Por padrão os valores destas variáveis serão respectivamente `root@devi.tools` e `aq1sw2de3`.
```shell
yarn
```
```shell
yarn dev
```

#### 🖲 Usando `npm`

```shell
cd frontend
```
```shell
cp .env.example .env
```
Opcionalmente você pode editar no `.env` os valores de `APP_DEV_USERNAME` e `APP_DEV_PASSWORD` para definir o usuário e a senha padrão para acessar o sistema.
Por padrão os valores destas variáveis serão respectivamente `root@devi.tools` e `aq1sw2de3`.
```shell
npm install
```
```shell
npm run dev
```
