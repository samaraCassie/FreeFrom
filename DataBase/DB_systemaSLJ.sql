CREATE TABLE usuario(
id_usuario INT(5) AUTO INCREMENT,
email VARCHAR(50) NOT NULL,
senha VARCHAR(50) NOT NULL,
PRIMARY KEY(id_usuario)
);

CREATE TABLE cliente(
id_cliente INT(5) AUTO INCREMENT,
cpf INT(20),
FOREIGN KEY(fk_usuario) REFERENCES usuario(id_cliente),
PRIMARY KEY(id_cliente)
);

CREATE TABLE vendedor(
id_vendedor INT(5) AUTO INCREMENT,
cnpj INT(20),
FOREIGN KEY(fk_usuario) REFERENCES usuario(id_vendedor),
PRIMARY KEY(id_vendedor)
);

CREATE TABLE compra (
id_compra INT(5) AUTO INCREMENT,
data DATE(10),
total_compra DECIMAL(10),
fk_cliente int(5),
--FOREIGN KEY(fk_cliente) REFERENCES cliente(id_cliente),
PRIMARY KEY(id_compra)
);

--CREATE TABLE item_compra(
-- id_item_compra INT(5) AUTO_INCREMENT,
-- id_produto INT(5),
-- qtde INT(200),
-- val_unit DECIMAL(10),
-- val_total DECIMAL(10),
-- fk_compra int(5),
-- fk_produto INT(5),
-- --FOREIGN KEY(fk_compra) REFERENCES compra(id_compra),
-- --FOREIGN KEY(fk_produto) REFERENCES produto(id_produto)
-- PRIMARY KEY (id_item_compra)
-- );

CREATE TABLE produto(
id_produto INT(5) AUTO INCREMENT,
descricao VARCHAR(100),
qtd_estoque INT(100),
preco_unit DECIMAL(10),
id_vendedor INT(5),
FOREIGN KEY(fk_vendedor) REFERENCES vendedor(id_vendedor),
PRIMARY KEY(id_produto)
);