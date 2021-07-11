<div align="center">
  <img alt="Devitools logo" src="https://devi.tools/images/logo-horizontal.png" />
</div>
<br>
<br>


<p align="center">
  <a href="#" style="text-decoration: none">
    <img alt="License" src="https://img.shields.io/github/license/devitools/laravel?color=34CB79" />
  </a>
  <a href="https://github.com/devitools/laravel/issues" style="text-decoration: none" target="_blank">
    <img alt="Issues" src="https://img.shields.io/github/issues/devitools/laravel?color=34CB79" />
  </a>
    <a href="https://github.com/devitools/laravel/graphs/contributors" style="text-decoration: none" target="_blank">
    <img src="https://img.shields.io/github/contributors/devitools/laravel?color=34CB79" />
  </a>
  <a href="#" style="text-decoration: none">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/devitools/laravel?color=34CB79" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/devitools/laravel/stargazers" style="text-decoration: none" target="_blank">
    <img alt="Github Stars" src="https://img.shields.io/github/stars/devitools/laravel?style=social" />
  </a>
  <a href="https://github.com/devitools/laravel/network/members" style="text-decoration: none" target="_blank">
    <img alt="Github Forks" src="https://img.shields.io/github/forks/devitools/laravel?style=social" />
  </a>
  <a href="https://twitter.com/devitools" style="text-decoration: none" target="_blank">
    <img alt="Twitter" src="https://img.shields.io/twitter/follow/devitools?label=Twitter&style=social" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/devitools/laravel/tags" style="text-decoration: none" target="_blank">
    <img alt="Github Tags" src="https://img.shields.io/github/v/tag/devitools/laravel.svg?logo=github" />
  </a>
  <a href="https://github.com/devitools/laravel/releases" style="text-decoration: none" target="_blank">
    <img alt="Github Releases" src="https://img.shields.io/github/last-commit/devitools/laravel.svg?label=Updated&logo=github&maxAge=600" />
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

Este é o adaptador do núcleo **Devitools** para o Laravel. O objetivo principal é entregar de forma simples uma base para usar tecnologia de ponta em diversas etapas da produção de software. Por ser um conjunto de ferramentas, nossas tecnologias podem ser adotadas de forma parcial ou progressiva.

## 🚀 Tecnologias

Este projeto foi construído utilizando estas tecnologias:

- [PHP](https://php.net)
- [Laravel](https://laravel.com)

## 👍 Contribuir

Fique livre para abrir uma [_issue_](https://github.com/devitools/laravel/issues).

- Abra uma _issue_;
- Faça um _fork_ do projeto;
- Crie uma _branch_: `git checkout -b new-feature`
- Faça suas mudanças;
- Faça um _commit_ das suas mudanças: `git commit -m '[feature] New feature'`
- Envie sua versão: `git push origin new-feature`
- Abra um _pull request_ referenciando o nº da sua _issue_.

Após seu _pull request_ ser aprovado, você pode excluir a sua _branch_.

## 🔧 Como testar

Inicialize um novo arquivo de configurações com base no `sample` que é incorporado ao projeto.
```bash
cp tests/phpunit.xml.sample tests/phpunit.xml
```

### 🔦 Comandos

#### Composer instalado

Rode o comando `test` que está na seção de `scripts` do `composer.json`.
```bash
composer run test
```

#### Docker

Caso esteja usando docker use o comando `docker-compose up -d` para iniciar os serviços e rode o comando a seguir.
```bash
docker-compose exec laravel-adapter bash -c "su -c \"composer run test\" application"
```

Se seu sistema tiver suporte a `makefile` é possível utilizar o comando abaixo.
```bash
make test
```

## 🤔 Documentação
Se você tiver dúvidas ou precisar de ajuda para integrar o devitools/laravel ao seu projeto, [clique aqui](https://docs.devi.tools/) para consultar a documentação ou entre em contato através do e-mail _contato@devi.tools_

## 📝 Licença

Este projeto está sob licença MIT.
