# replace `database` with the target schema
# replace `old` with the source schema

# bancos
insert into `database`.`banks`
(`id`,
 `uuid`,
 `counter`,
 `name`,
 `code`,
 `document`,
 `createdAt`,
 `createdBy`,
 `updatedAt`,
 `updatedBy`,
 `deletedAt`,
 `deletedBy`)
select @uuid := uuid()                as 'id',
       unhex(replace(@uuid, '-', '')) as 'uuid',
       cast(replace(replace(replace(replace(current_timestamp(4), '-', ''), ':', ''), ' ', ''), '.', '') as unsigned) +
       id                             as 'counter',
       `Name`,
       `BankId`,
       `Document`,
       `created_at`,
       concat('IMPORT::', `id`),
       `updatedAt`,
       concat('IMPORT::', `id`),
       null,
       null
from `welog`.`banks`;

# contas bancárias
insert into `database`.`bank_accounts`
(`id`,
 `uuid`,
 `counter`,
 `bankId`,
 `name`,
 `agency`,
 `account`,
 `createdAt`,
 `createdBy`,
 `updatedAt`,
 `updatedBy`,
 `deletedAt`,
 `deletedBy`)
select @uuid := uuid()                as 'id',
       unhex(replace(@uuid, '-', '')) as 'uuid',
       cast(replace(replace(replace(replace(current_timestamp(4), '-', ''), ':', ''), ' ', ''), '.', '') as unsigned) +
       id                             as 'counter',
       (select uuid
        from `database`.`banks`
        where `database`.`banks`.`createdBy` = concat('IMPORT::', `welog`.`bankaccounts`.`banco`)),
       `nome`,
       `agencia`,
       `conta`,
       `created_at`,
       concat('IMPORT::', `id`),
       `updated_at`,
       concat('IMPORT::', `id`),
       null,
       null
from `welog`.`bankaccounts`;

# categorias
insert into `database`.`categories`
(`id`,
 `uuid`,
 `counter`,
 `name`,
 `createdAt`,
 `createdBy`,
 `updatedAt`,
 `updatedBy`,
 `deletedAt`,
 `deletedBy`)
select @uuid := uuid()                as 'id',
       unhex(replace(@uuid, '-', '')) as 'uuid',
       cast(replace(replace(replace(replace(current_timestamp(4), '-', ''), ':', ''), ' ', ''), '.', '') as unsigned) +
       id                             as 'counter',
       `nome`,
       `created_at`,
       concat('IMPORT::', `id`),
       `updated_at`,
       concat('IMPORT::', `id`),
       null,
       null
from `welog`.`categories`;

# empresas
insert into `database`.`companies`
(`id`,
 `uuid`,
 `counter`,
 `name`,
 `city`,
 `dateRegistration`,
 `stateRegistration`,
 `cnpj`,
 `email`,
 `createdAt`,
 `createdBy`,
 `updatedAt`,
 `updatedBy`,
 `deletedAt`,
 `deletedBy`)
select @uuid := uuid()                as 'id',
       unhex(replace(@uuid, '-', '')) as 'uuid',
       cast(replace(replace(replace(replace(current_timestamp(4), '-', ''), ':', ''), ' ', ''), '.', '') as unsigned) +
       id                             as 'counter',
       `empresa`,
       `cidade`,
       `data_registro`,
       `inscricao_estadual`,
       `cnpj`,
       `email`,
       `created_at`,
       concat('IMPORT::', `id`),
       `updated_at`,
       concat('IMPORT::', `id`),
       deleted_at,
       null
from `welog`.`companies`;

# fornecedores
insert into `database`.`suppliers`
(`id`,
 `uuid`,
 `counter`,
 `type`,
 `name`,
 `cnpj`,
 `stateRegistration`,
 `operation`,
 `cep`,
 `state`,
 `city`,
 `address`,
 `neighborhood`,
 `number`,
 `email`,
 `phone`,
 `observation`,
 `createdAt`,
 `createdBy`,
 `updatedAt`,
 `updatedBy`,
 `deletedAt`,
 `deletedBy`)
select @uuid := uuid()                as 'id',      # `id`
       unhex(replace(@uuid, '-', '')) as 'uuid',    #  `uuid`
       cast(replace(replace(replace(replace(current_timestamp(4), '-', ''), ':', ''), ' ', ''), '.', '') as unsigned) +
       id                             as 'counter', #  `counter`
       'PJ',                                        #  `type`
       `nome`,                                      #  `name`
       `cnpj`,                                      #  `cnpj`
       `inscricao_estadual`,                        #  `stateRegistration`
       `atuacao`,                                   #  `operation`
       `cep`,                                       #  `cep`
       `estado`,                                    #  `state`
       `cidade`,                                    #  `city`
       `endereco`,                                  #  `address`
       '',                                          #  `neighborhood`
       `numero`,                                    #  `number`
       `email`,                                     #  `email`
       `telefone`,                                  #  `phone`
       `observacao`,                                #  `observation`
       `created_at`,                                #  `createdAt`
       concat('IMPORT::', `id`),                    #  `createdBy`
       `updated_at`,                                #  `updatedAt`
       concat('IMPORT::', `id`),                    #  `updatedBy`
       null,                                        #  `deletedAt`
       null                                         #  `deletedBy`
from `welog`.`providers`;

delete
from `database`.`expenses`
where true;

# despesas
insert into `database`.`expenses`
(`id`,
 `uuid`,
 `counter`,
 `companyId`,
 `supplierId`,
 `categoryId`,
 `file`,
 `taxNumber`,
 `dateRegistration`,
 `observation`,
 `status`,
 `total`,
 `createdAt`,
 `createdBy`,
 `updatedAt`,
 `updatedBy`,
 `deletedAt`,
 `deletedBy`)
select @uuid := uuid()                as 'id',      # `id`
       unhex(replace(@uuid, '-', '')) as 'uuid',    #  `uuid`
       cast(replace(replace(replace(replace(current_timestamp(4), '-', ''), ':', ''), ' ', ''), '.', '') as unsigned) +
       id                             as 'counter', #  `counter`
       (select uuid
        from `database`.`companies`
        where `database`.`companies`.`createdBy` = concat('IMPORT::', `welog`.`expenses`.`company_id`)),
       (select uuid
        from `database`.`suppliers`
        where `database`.`suppliers`.`createdBy` = concat('IMPORT::', `welog`.`expenses`.`provider_id`)),
       (select uuid
        from `database`.`categories`
        where `database`.`categories`.`createdBy` = concat('IMPORT::', `welog`.`expenses`.`category_id`)),
       `anexo`,
       `numero`,
       substring(`data`, 1, 10),
       `observacao`,
       (
           case
               when `status` = 'aberto' then 'open'
               when `status` = 'cancelado' then 'cancel'
               when `status` = 'pago' then 'paid'
               end
           ),
       coalesce(`total`, 0) * 100,
       `created_at`,                                #  `createdAt`
       concat('IMPORT::', `id`),                    #  `createdBy`
       `updated_at`,                                #  `updatedAt`
       concat('IMPORT::', `id`),                    #  `updatedBy`
       null,                                        #  `deletedAt`
       null                                         #  `deletedBy`
from `welog`.`expenses`;

# parcelas
insert into `database`.`splits`
(`id`,
 `uuid`,
 `counter`,
 `expenseId`,
 `bankAccountId`,
 `parcel`,
 `expiration`,
 `value`,
 `voucher`,
 `paymentDate`,
 `status`,
 `createdAt`,
 `createdBy`,
 `updatedAt`,
 `updatedBy`,
 `deletedAt`,
 `deletedBy`)
select @uuid := uuid()                as 'id',      # `id`
       unhex(replace(@uuid, '-', '')) as 'uuid',    #  `uuid`
       cast(replace(replace(replace(replace(current_timestamp(4), '-', ''), ':', ''), ' ', ''), '.', '') as unsigned) +
       id                             as 'counter', #  `counter`
       (select uuid
        from `database`.`expenses`
        where `database`.`expenses`.`createdBy` = concat('IMPORT::', `welog`.`installments`.`expense_id`)),
       (select uuid
        from `database`.`bank_accounts`
        where `database`.`bank_accounts`.`createdBy` = concat('IMPORT::', `welog`.`installments`.`bankaccount_id`)),
       `parcela`,
       substring(`data_vencimento`, 1, 10),
       coalesce(`valor`, 0) * 100,
       `comprovante`,
       substring(`data_pagamento`, 1, 10),
       (
           case
               when `status` = 'aberto' then 'open'
               when `status` = 'cancelado' then 'cancel'
               when `status` = 'pago' then 'paid'
               end
           ),
       `created_at`,                                #  `createdAt`
       concat('IMPORT::', `id`),                    #  `createdBy`
       `updated_at`,                                #  `updatedAt`
       concat('IMPORT::', `id`),                    #  `updatedBy`
       null,                                        #  `deletedAt`
       null                                         #  `deletedBy`
from `welog`.`installments`;

delete
from `database`.`partners`
where true;

# sócios
insert into `database`.`partners`
(`id`,
 `uuid`,
 `counter`,
 `companyId`,
 `name`,
 `birth`,
 `rg`,
 `cpf`,
 `participation`,
 `createdAt`,
 `createdBy`,
 `updatedAt`,
 `updatedBy`,
 `deletedAt`,
 `deletedBy`)
select @uuid := uuid()                             as 'id',      # `id`
       unhex(replace(@uuid, '-', ''))              as 'uuid',    #  `uuid`
       cast(replace(replace(replace(replace(current_timestamp(4), '-', ''), ':', ''), ' ', ''), '.', '') as unsigned) +
       id                                          as 'counter', #  `counter`
       (select uuid
        from `database`.`companies`
        where `database`.`companies`.`createdBy` = concat('IMPORT::', `welog`.`partners`.`company_id`)),
       `nome`,
       `data_nascimento`,
       `cpf`,
       `rg`,
       ((replace(`participacao`, ',', '.')) * 100) as 'participacao',
       `created_at`,                                             #  `createdAt`
       concat('IMPORT::', `id`),                                 #  `createdBy`
       `updated_at`,                                             #  `updatedAt`
       concat('IMPORT::', `id`),                                 #  `updatedBy`
       null,                                                     #  `deletedAt`
       null                                                      #  `deletedBy`
from `welog`.`partners`;
