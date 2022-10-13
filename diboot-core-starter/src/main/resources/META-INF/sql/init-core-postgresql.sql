-- 字典表
create table dictionary (
     id                   VARCHAR(32) not null,
     parent_id            VARCHAR(32)   null,
     tenant_id            VARCHAR(32)   not null default '0',
     app_module          VARCHAR(50),
     type                 VARCHAR(50)   not null,
     item_name            VARCHAR(100)  not null,
     item_value           VARCHAR(100)  null,
     description          VARCHAR(100)  null,
     extension            VARCHAR(200)  null,
     sort_id              SMALLINT      not null default 99,
     is_deletable         BOOLEAN       not null default TRUE,
     is_editable          BOOLEAN       not null default TRUE,
     is_deleted           BOOLEAN       not null default FALSE,
     create_time          timestamp     not null default CURRENT_TIMESTAMP,
     constraint PK_dictionary primary key (id)
);
-- 添加备注
comment on column dictionary.id is 'ID';
comment on column dictionary.parent_id is '父ID';
comment on column dictionary.tenant_id is '租户ID';
comment on column dictionary.app_module is '应用模块';
comment on column dictionary.type is '字典类型';
comment on column dictionary.item_name is '显示名';
comment on column dictionary.item_value is '存储值';
comment on column dictionary.description is '描述说明';
comment on column dictionary.extension is '扩展JSON';
comment on column dictionary.sort_id is '排序号';
comment on column dictionary.is_editable is '是否可改';
comment on column dictionary.is_deletable is '是否可删';
comment on column dictionary.is_deleted is '删除标记';
comment on column dictionary.create_time is '创建时间';

comment on table dictionary is '数据字典';
-- 创建索引
create index idx_directory on dictionary(type, item_value);
create index idx_directory_tenant on dictionary(tenant_id);

-- 国际化表
create table i18n_config
(
    id          VARCHAR(32)   NOT NULL,
    type        VARCHAR(20)   NOT NULL default 'CUSTOM',
    language    VARCHAR(20)   NOT NULL,
    code        VARCHAR(200)  NOT NULL,
    content     VARCHAR(1000) NOT NULL,
    is_deleted  BOOLEAN       NOT NULL default 0,
    create_time TIMESTAMP     NOT NULL default CURRENT_TIMESTAMP,
    constraint PK_dictionary primary key (id)
);
-- 添加备注
comment on column i18n_config.id is 'ID';
comment on column i18n_config.type is '类型';
comment on column i18n_config.language is '语言';
comment on column i18n_config.code is '资源标识';
comment on column i18n_config.content is '内容';
comment on column i18n_config.is_deleted is '删除标记';
comment on column i18n_config.create_time is '创建时间';
comment on table i18n_config is '国际化配置';
-- 创建索引
create index idx_i18n_config on i18n_config (code, language);