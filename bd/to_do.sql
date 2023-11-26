
-- // CRIAÇÂO DO BANCO DE DADOS // 

CREATE DATABASE todo_app;
USE todo_app;
CREATE TABLE tarefas (
  id int NOT NULL AUTO_INCREMENT,
  descricao varchar(255) NOT NULL,
  completa tinyint NOT NULL,
  PRIMARY KEY (`id`)
);
