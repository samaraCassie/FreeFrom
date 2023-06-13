-- phpMyAdmin SQL Dump
-- version 4.0.9
-- http://www.phpmyadmin.net
--
-- Máquina: 127.0.0.1
-- Data de Criação: 13-Jun-2023 às 17:33
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
  `categoria` varchar(100) DEFAULT NULL,
  `img` varchar(250) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `imagem` blob,
  PRIMARY KEY (`id_produto`),
  KEY `ct_fk_vendedor` (`id_vendedor`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=19 ;

--
-- Extraindo dados da tabela `produto`
--

INSERT INTO `produto` (`id_produto`, `descricao`, `qtd_estoque`, `preco_unit`, `id_vendedor`, `categoria`, `img`, `nome`, `imagem`) VALUES
(0, 'Sem lactose mais com glutemn', 10, '51.50', 1, 'Sem lactose', 'img/PomeloBolinho.jpg', 'Brownie', NULL),
(1, 'Produto vegano com lascas de carne', 10, '40.00', 1, 'Vegano', 'img/cupCake.jpg', 'Escondidinho de carne', NULL),
(2, 'Sem lactobacilos mais com glutemn', 10, '50.00', 2, 'Sem lactose', 'img/pomeloCereal.jpg', 'Cereal', NULL),
(3, 'COM lactose mais com glutemn', 10, '50.00', 1, 'Sem lactose', 'img/PomeloMacarrons.jpg', 'Macarrons', NULL),
(4, 'gelatina mais com glutemn', 10, '50.00', 1, 'Sem lactose', 'img/PomeloFolhado.jpg', 'Folhado', NULL),
(5, 'leite lactose mais com glutemn', 10, '50.00', 2, 'Sem lactose', 'img/PomeloMiniPizza.jpg', 'Pizza', NULL),
(6, 'Com leite mais sem queijo', 10, '50.00', 2, 'Sem lactose', 'img/PomeloOvos.jpg', 'Pao de queijo', NULL),
(7, 'saudaveu', 10, '50.00', 1, 'Saudavel', 'img/paes.jpg', 'Maçã', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(5) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `sexo` varchar(10) DEFAULT NULL,
  `endereco` varchar(250) NOT NULL,
  `numero` int(6) NOT NULL,
  `cidade` varchar(250) NOT NULL,
  `data_nascimento` date DEFAULT NULL,
  `usuario` varchar(150) NOT NULL,
  `uf` varchar(100) NOT NULL,
  `CPF` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=53 ;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `email`, `senha`, `sexo`, `endereco`, `numero`, `cidade`, `data_nascimento`, `usuario`, `uf`, `CPF`) VALUES
(38, 'julianalvesinstinto@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Masculino', '312', 312, '312', '0000-00-00', 'ju', 'SC', 2147483647),
(39, 'jujuba@gmail.com', 'fcea920f7412b5da7be0cf42b8c93759', 'Masculino', 'jyuuj', 564645, '423', '2023-04-04', 'jujuba', ' PA ', 2147483647),
(49, 'kel@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Feminino', 'jujuyg', 12, 'uyguhy', '2006-10-17', 'kel', ' MG ', 2147483647),
(50, 'samara@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Feminino', 'Sim', 123, 'Jaras', '2003-05-04', 'Samara', ' PA ', 2147483647),
(51, 'keilha@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Feminino', 'rua alagoa', 432, 'Jaras', '1994-05-13', 'Keilah', ' PR ', 371772907),
(52, 'siM@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Masculino', '432', 432, '432', '0323-05-31', 'sim', ' MS ', 2147483647);

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
(1, 2147483647, 'Suco do vale', 'Direto da fruta', 'Img/is14667-image.jpg', 'Loja de sucos naturais, feitos na hora com salgados e doces feitos na loja, sempre aqui para atender você da melhor maneira sempre!!', 'img/fundo.jpg', 38),
(2, 85462514, 'Yalla esfiharia', 'Só o melhor', 'img/esphirraria.jpg', 'Lojas de esphirras muito boa', 'Img/2022-07-29.png', 39),
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
-- Limitadores para a tabela `itens_produto`
--
ALTER TABLE `itens_produto`
  ADD CONSTRAINT `fk_id_produto` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id_produto`),
  ADD CONSTRAINT `fk_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `produto`
--
ALTER TABLE `produto`
  ADD CONSTRAINT `ct_fk_vendedor` FOREIGN KEY (`id_vendedor`) REFERENCES `vendedor` (`id_vendedor`);

--
-- Limitadores para a tabela `vendedor`
--
ALTER TABLE `vendedor`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
