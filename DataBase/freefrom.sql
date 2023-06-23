-- phpMyAdmin SQL Dump
-- version 4.0.9
-- http://www.phpmyadmin.net
--
-- Máquina: 127.0.0.1
-- Data de Criação: 23-Jun-2023 às 18:40
-- Versão do servidor: 5.5.34
-- versão do PHP: 5.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de Dados: `freefrom`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria`
--

CREATE TABLE IF NOT EXISTS `categoria` (
  `id_categoria` int(3) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Extraindo dados da tabela `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `categoria`) VALUES
(1, 'Vegano'),
(2, 'Sem lactose'),
(3, 'Sem açucar'),
(4, 'Sem gluten'),
(5, 'FitNess');

-- --------------------------------------------------------

--
-- Estrutura da tabela `compra`
--

CREATE TABLE IF NOT EXISTS `compra` (
  `id_compra` int(3) NOT NULL AUTO_INCREMENT,
  `data` date DEFAULT NULL,
  `total_compra` decimal(15,2) DEFAULT NULL,
  `quantidade` int(4) NOT NULL,
  `id_produto` int(3) DEFAULT NULL,
  `id_usuario` int(3) DEFAULT NULL,
  PRIMARY KEY (`id_compra`),
  KEY `fk_produto` (`id_produto`),
  KEY `fk_idusuario` (`id_usuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=65 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `endereco`
--

CREATE TABLE IF NOT EXISTS `endereco` (
  `id_endereco` int(3) NOT NULL AUTO_INCREMENT,
  `cep` int(20) DEFAULT NULL,
  `endereco` varchar(200) DEFAULT NULL,
  `bairro` varchar(200) DEFAULT NULL,
  `numero` int(6) DEFAULT NULL,
  `cidade` varchar(200) DEFAULT NULL,
  `uf` varchar(3) DEFAULT NULL,
  `id_usuario` int(3) DEFAULT NULL,
  PRIMARY KEY (`id_endereco`),
  KEY `fk_id_usuariooo` (`id_usuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Extraindo dados da tabela `endereco`
--

INSERT INTO `endereco` (`id_endereco`, `cep`, `endereco`, `bairro`, `numero`, `cidade`, `uf`, `id_usuario`) VALUES
(3, 45154555, 'rua alagoa', 'ilha figueirizada', 85, 'jaras', 'uf', 49),
(4, 45154555, 'rua alagoa', 'ilha figueirizada', 85, 'jaras', 'uf', 50),
(5, 45154555, 'rua alagoa', 'ilha figueirizada', 85, 'jaras', 'uf', 51),
(6, 45154555, 'rua alagoa', 'ilha figueirizada', 85, 'jaras', 'uf', 52),
(8, 89258030, 'Rua alagoa', 'ilha da figueira', 85, 'jaras', ' SC', 55),
(9, 65464654, '6646', '145645', 546464, '6564', ' PR', 56),
(10, 432432432, '432432', '32432423', 4324324, '4324324', ' MT', 57);

-- --------------------------------------------------------

--
-- Estrutura da tabela `itens_produto`
--

CREATE TABLE IF NOT EXISTS `itens_produto` (
  `id_itens_produto` int(3) NOT NULL AUTO_INCREMENT,
  `quantidade` int(3) NOT NULL,
  `id_produto` int(3) NOT NULL,
  `id_usuario` int(3) NOT NULL,
  PRIMARY KEY (`id_itens_produto`),
  KEY `fk_id_produto` (`id_produto`),
  KEY `fk_id_usuario` (`id_usuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto`
--

CREATE TABLE IF NOT EXISTS `produto` (
  `id_produto` int(5) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(100) DEFAULT NULL,
  `qtd_estoque` int(100) DEFAULT NULL,
  `preco_unit` decimal(5,2) DEFAULT NULL,
  `id_vendedor` int(5) DEFAULT NULL,
  `img` varchar(250) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `categoria` int(3) DEFAULT NULL,
  PRIMARY KEY (`id_produto`),
  KEY `ct_fk_vendedor` (`id_vendedor`),
  KEY `fk_id_categoria` (`categoria`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=19 ;

--
-- Extraindo dados da tabela `produto`
--

INSERT INTO `produto` (`id_produto`, `descricao`, `qtd_estoque`, `preco_unit`, `id_vendedor`, `img`, `nome`, `categoria`) VALUES
(0, 'Sem lactose mais com glutemn', 10, '51.50', 1, 'img/PomeloBolinho.jpg', 'Brownie', 1),
(1, 'Produto vegano com lascas de carne', 10, '40.00', 1, 'img/cupCake.jpg', 'Escondidinho de carne', 2),
(2, 'Sem lactobacilos mais com glutemn', 10, '50.00', 2, 'img/pomeloCereal.jpg', 'Cereal', 2),
(3, 'COM lactose mais com glutemn', 10, '50.00', 1, 'img/PomeloMacarrons.jpg', 'Macarrons', 5),
(4, 'gelatina mais com glutemn', 10, '50.00', 1, 'img/PomeloFolhado.jpg', 'Folhado', 3),
(5, 'leite lactose mais com glutemn', 10, '50.00', 2, 'img/PomeloMiniPizza.jpg', 'Pizza', 4),
(6, 'Com leite mais sem queijo', 10, '50.00', 2, 'img/PomeloOvos.jpg', 'Pao de queijo', 1),
(7, 'saudaveu', 10, '50.00', 1, 'img/paes.jpg', 'Maçã', 5);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(5) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `senha` varchar(300) DEFAULT NULL,
  `sexo` varchar(10) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `usuario` varchar(150) NOT NULL,
  `CPF` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=58 ;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `email`, `senha`, `sexo`, `data_nascimento`, `usuario`, `CPF`) VALUES
(49, 'kel@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Feminino', '2006-10-17', 'kel', 2147483647),
(50, 'samara@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Feminino', '2003-05-04', 'Samara', 2147483647),
(51, 'keilha@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Feminino', '1994-05-13', 'Keilah', 371772907),
(52, 'siM@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Masculino', '0323-05-31', 'sim', 2147483647),
(55, 'julianalvesinstinto@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Masculino', '2007-05-16', 'Julian', 2147483647),
(56, 'nao@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Masculino', '0022-05-16', 'nao', 2147483647),
(57, 'jujuba@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Masculino', '2007-05-16', 'Ju', 2147483647);

-- --------------------------------------------------------

--
-- Estrutura da tabela `vendedor`
--

CREATE TABLE IF NOT EXISTS `vendedor` (
  `id_vendedor` int(5) NOT NULL AUTO_INCREMENT,
  `cnpj` int(20) DEFAULT NULL,
  `nome_loja` varchar(100) DEFAULT NULL,
  `slogan` varchar(200) DEFAULT NULL,
  `img` varchar(200) DEFAULT NULL,
  `sobre` varchar(200) DEFAULT NULL,
  `back_img` varchar(200) DEFAULT NULL,
  `id_usuario` int(3) DEFAULT NULL,
  PRIMARY KEY (`id_vendedor`),
  KEY `fk_usuario` (`id_usuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=8 ;

--
-- Extraindo dados da tabela `vendedor`
--

INSERT INTO `vendedor` (`id_vendedor`, `cnpj`, `nome_loja`, `slogan`, `img`, `sobre`, `back_img`, `id_usuario`) VALUES
(1, 2147483647, 'Suco do vale', 'Direto da fruta', 'Img/is14667-image.jpg', 'Loja de sucos naturais, feitos na hora com salgados e doces feitos na loja, sempre aqui para atender você da melhor maneira sempre!!', 'img/fundo.jpg', 55),
(2, 85462514, 'Yalla esfiharia', 'Só o melhor', 'img/esphirraria.jpg', 'Lojas de esphirras muito boa', 'Img/2022-07-29.png', 57),
(4, 123, 'Kel loja', 'Melhor loja', 'Img\\1686668587632857681.png', 'Feita por mim', 'Img\\1686668628895e535317715110bfe8248fd6abc017314.jpg', 49),
(5, 132442342, 'Loja Sam', 'A loja do poço', 'Img\\168666882905702_2210251357377676_20221025135745-650x650.jpg', 'Veja uma fita e você tem APENAS 7 DIAS para conseguir a SUPER PROMOÇÃO DE NOSSOS PRODUTOS', 'Img\\16866688290585490026-legumes-desenhados-a-mao-padrao-sem-costura-fundo-de-alimento-vegano-em-estilo-esboco-gratis-vetor.jpg', 50),
(6, 432434342, 'Sul doce mania', 'Doces de qualidade do SulMania', 'Img\\1686669305519logo.png', 'Melhor loja de doces do sul!!', 'Img\\1686669327371images.jfif', 51),
(7, 432432, '432432', '43242', 'Img\\1686670218858DOCE MANIA (@suldocemania) _ Instagram.png', '32432', 'Img\\168667021886702_2210251357377676_20221025135745-650x650.jpg', 52);

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `fk_idusuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `fk_produto` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id_produto`);

--
-- Limitadores para a tabela `endereco`
--
ALTER TABLE `endereco`
  ADD CONSTRAINT `fk_id_usuariooo` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `itens_produto`
--
ALTER TABLE `itens_produto`
  ADD CONSTRAINT `fk_id_produto` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id_produto`),
  ADD CONSTRAINT `fk_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `produto`
--
ALTER TABLE `produto`
  ADD CONSTRAINT `ct_fk_vendedor` FOREIGN KEY (`id_vendedor`) REFERENCES `vendedor` (`id_vendedor`),
  ADD CONSTRAINT `fk_id_categoria` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`id_categoria`);

--
-- Limitadores para a tabela `vendedor`
--
ALTER TABLE `vendedor`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
