-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 20-Abr-2023 às 22:09
-- Versão do servidor: 10.4.21-MariaDB
-- versão do PHP: 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `freefrom`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(5) NOT NULL,
  `cpf` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `compra`
--

CREATE TABLE `compra` (
  `id_compra` int(5) NOT NULL,
  `data` date DEFAULT NULL,
  `total_compra` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto`
--

CREATE TABLE `produto` (
  `id_produto` int(5) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `qtd_estoque` int(100) DEFAULT NULL,
  `preco_unit` decimal(10,0) DEFAULT NULL,
  `id_vendedor` int(5) DEFAULT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `img` varchar(250) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `imagem` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `produto`
--

INSERT INTO `produto` (`id_produto`, `descricao`, `qtd_estoque`, `preco_unit`, `id_vendedor`, `categoria`, `img`, `nome`, `imagem`) VALUES
(0, 'Sem lactose mais com glutemn', 10, '50', 1, 'Sem lactose', 'img/PomeloBolinho.jpg', 'Brownie', NULL),
(1, 'Produto vegano com lascas de carne', 5, '40', 1, 'Vegano', 'img/cupCake.jpg', 'Escondidinho de carne', NULL),
(2, 'Sem lactobacilos mais com glutemn', 10, '50', 2, 'Sem lactose', 'img/pomeloCereal.jpg', 'Cereal', NULL),
(3, 'COM lactose mais com glutemn', 10, '50', 1, 'Sem lactose', 'img/PomeloMacarrons.jpg', 'Macarrons', NULL),
(4, 'gelatina mais com glutemn', 10, '50', 1, 'Sem lactose', 'img/PomeloFolhado.jpg', 'Folhado', NULL),
(5, 'leite lactose mais com glutemn', 10, '50', 2, 'Sem lactose', 'img/PomeloMiniPizza.jpg', 'Pizza', NULL),
(6, 'Com leite mais sem queijo', 10, '50', 2, 'Sem lactose', 'img/PomeloOvos.jpg', 'Pao de queijo', NULL),
(7, 'saudaveu', 10, '50', 1, 'Saudavel', 'img/paes.jpg', 'Maçã', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(5) NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `sexo` varchar(10) DEFAULT NULL,
  `endereco` varchar(250) NOT NULL,
  `numero` int(6) NOT NULL,
  `cidade` varchar(250) NOT NULL,
  `data_nascimento` date DEFAULT NULL,
  `usuario` varchar(150) NOT NULL,
  `uf` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `email`, `senha`, `sexo`, `endereco`, `numero`, `cidade`, `data_nascimento`, `usuario`, `uf`) VALUES
(23, 'ju@gmail.com', '0e38e67f330be882c03a1e31dd1812d7', 'Masculino', 'Sim', 564645, 'kyuky', '2023-03-15', 'julian', ' MG '),
(24, 'julian@gmail.com', 'fcea920f7412b5da7be0cf42b8c93759', 'Masculino', 'Nessa rua', 12, 'jaras', '2023-04-03', 'julian', ' SC ');

-- --------------------------------------------------------

--
-- Estrutura da tabela `vendedor`
--

CREATE TABLE `vendedor` (
  `id_vendedor` int(5) NOT NULL,
  `cnpj` int(20) DEFAULT NULL,
  `nome_loja` varchar(100) DEFAULT NULL,
  `slogan` varchar(200) DEFAULT NULL,
  `img` varchar(200) DEFAULT NULL,
  `sobre` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `vendedor`
--

INSERT INTO `vendedor` (`id_vendedor`, `cnpj`, `nome_loja`, `slogan`, `img`, `sobre`) VALUES
(1, 2147483647, 'Suco do vale', 'Direto da fruta', 'Img/is14667-image.jpg', 'Loja de sucos naturais, feitos na hora com salgados e doces feitos na loja, sempre aqui para atender você da melhor maneira sempre!!'),
(2, 85462514, 'Yalla esfiharia', 'Só o melhor', 'img/esphirraria.jpg', 'Lojas de esphirras muito boa');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Índices para tabela `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`id_compra`);

--
-- Índices para tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`id_produto`),
  ADD KEY `ct_fk_vendedor` (`id_vendedor`);

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Índices para tabela `vendedor`
--
ALTER TABLE `vendedor`
  ADD PRIMARY KEY (`id_vendedor`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `compra`
--
ALTER TABLE `compra`
  MODIFY `id_compra` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `id_produto` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de tabela `vendedor`
--
ALTER TABLE `vendedor`
  MODIFY `id_vendedor` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `produto`
--
ALTER TABLE `produto`
  ADD CONSTRAINT `ct_fk_vendedor` FOREIGN KEY (`id_vendedor`) REFERENCES `vendedor` (`id_vendedor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
