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
 <a href="#projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#contribuir">Contribuir</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#+1-documentacao">Documentação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## 💻 Projeto

_Template_ para iniciar um projeto Devitools utilizando Laravel (PHP) no backend e Quasar (Vue) no frontend.

## 🚀 Tecnologias

Este _template_ foi construído utilizando estas tecnologias:

- [PHP](https://php.net)
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

## 📝 Licença

Este projeto está sob licença MIT.

## 🤔 Documentação

Use este guia para preparar seu ambiente de desenvolvimento.

### 🛠 Backend

É possível configurar o ambiente de desenvolvimento do backend de três formas:
  - Local;
  - Docker;
  - Makefile.

#### Com ambiente local

```shell
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate:fresh
```

edite os valores de `APP_DEV_USERNAME` e `APP_DEV_PASSWORD` para definir o usuário e a senha padrão para acessar o sistema inicial

#### 🐋 Usando Docker

```shell
cd backend
cp .env.example .env
cp docker-compose.yml.example docker-compose.yml`
docker-compose up -d
docker-compose exec devitools-nginx bash -c "su -c 'composer install' application"
docker-compose exec devitools-nginx bash -c "su -c 'php artisan key:generate' application"
docker-compose exec devitools-nginx bash -c "su -c 'php artisan jwt:secret --force' application"
docker-compose exec devitools-nginx bash -c "su -c 'php artisan migrate:fresh' application"
```

edite os valores de `APP_DEV_USERNAME` e `APP_DEV_PASSWORD` para definir o usuário e a senha padrão para acessar o  sistema inicial

#### ✏ Usando makefile

```shell
cd backend
cp .env.example .env
cp docker-compose.yml.example docker-compose.yml
make init
```

edite os valores de `APP_DEV_USERNAME` e `APP_DEV_PASSWORD` para definir o usuário e a senha padrão para acessar o
sistema inicial

### 🎨 Frontend: iniciar o modo de desenvolvimento

#### Usando `yarn`

```shell
cd frontend
cp .env.example .env
yarn
yarn dev
```

edite os valores de `APP_DEV_USERNAME` e `APP_DEV_PASSWORD` para definir o usuário e a senha padrão para acessar o  sistema inicial

#### Usando `npm`

```shell
cd frontend
cp .env.example .env
npm install
npm run dev
```

edite os valores de `APP_DEV_USERNAME` e `APP_DEV_PASSWORD` para definir o usuário e a senha padrão para acessar o  sistema inicial
