-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 20/05/2024 às 00:20
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `job`
--
create schema if not exists `job` default character set utf8;
use `job`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `job`
--

CREATE TABLE `job` (
  `id` int(11) NOT NULL,
  `companyFunction` varchar(250) NOT NULL,
  `companyName` varchar(250) NOT NULL,
  `companyLocation` varchar(250) NOT NULL,
  `salary` varchar(250) NOT NULL,
  `companyLogo` text NOT NULL,
  `jobDescription` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `job`
--

INSERT INTO `job` (`id`, `companyFunction`, `companyName`, `companyLocation`, `salary`, `companyLogo`, `jobDescription`) VALUES
(1, 'Software Engineer', 'Amazon', 'Sumaré', '5000.00', 'data:image/png;base64,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', 'O que é engenheiro de software? O engenheiro de software é o profissional responsável por projetar e guiar o desenvolvimento de sistemas, aplicativos e programas. O software é o conjunto de i'),
(2, 'Product Manager', 'Meta', 'São Paulo', '7000.00', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSlndloWgi0DjWaBR2aTCfc3x5YGNgREzzEw&s', 'O que é engenheiro de software? O engenheiro de software é o profissional responsável por projetar e guiar o desenvolvimento de sistemas, aplicativos e programas. O software é o conjunto de i'),
(3, 'Data Scientist', 'Meta', 'New York', '12000.00', 'https://marketplace.canva.com/EAF2TXGZIcM/2/0/1600w/canva-logotipo-para-empresa-de-desenvolvimento-de-aplicativos-profissional-simples-amarelo-preto-branco-BGvQOOGl3E0.jpg', 'O que é engenheiro de software? O engenheiro de software é o profissional responsável por projetar e guiar o desenvolvimento de sistemas, aplicativos e programas. O software é o conjunto de i'),
(4, 'Software Engineer', 'Amazon', 'Sumaré', '5000.00', 'data:image/png;base64,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', 'O que é engenheiro de software? O engenheiro de software é o profissional responsável por projetar e guiar o desenvolvimento de sistemas, aplicativos e programas. O software é o conjunto de i'),
(5, 'Product Manager', 'Meta', 'São Paulo', '7000.00', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSlndloWgi0DjWaBR2aTCfc3x5YGNgREzzEw&s', 'O que é engenheiro de software? O engenheiro de software é o profissional responsável por projetar e guiar o desenvolvimento de sistemas, aplicativos e programas. O software é o conjunto de i'),
(6, 'Data Scientist', 'Meta', 'New York', '12000.00', 'https://marketplace.canva.com/EAF2TXGZIcM/2/0/1600w/canva-logotipo-para-empresa-de-desenvolvimento-de-aplicativos-profissional-simples-amarelo-preto-branco-BGvQOOGl3E0.jpg', 'O que é engenheiro de software? O engenheiro de software é o profissional responsável por projetar e guiar o desenvolvimento de sistemas, aplicativos e programas. O software é o conjunto de i'),
(7, 'Software Engineer', 'Amazon', 'Sumaré', '5000.00', 'data:image/png;base64,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', 'O que é engenheiro de software? O engenheiro de software é o profissional responsável por projetar e guiar o desenvolvimento de shdsgvfgfhsuygv ujghbvuf gfshbvu gufshysdg fhds istemas, aplica'),
(8, 'jnhyr6unjfy', ',jugh,kg', 'São Paulo', '50250', 'https://avatars.githubusercontent.com/u/133153563?v=4', 'fjmfvhymkj jkgkfhklf ilyhl,');

-- --------------------------------------------------------

--
-- Estrutura para tabela `session`
--

CREATE TABLE `session` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `token` varchar(1000) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `session`
--

INSERT INTO `session` (`id`, `userId`, `token`, `createdAt`) VALUES
(1, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Ikx1aXMgRWR1YXJkbyIsImlhdCI6MTcxNjE0ODI0NSwiZXhwIjoxNzE2MTUwMDQ1fQ.p3LXeXOTbbo9XyS8QaSvuzF8cxF9xW3byNEQvsmqmRA', '2024-05-19 16:50:45.509'),
(2, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Ikx1aXMgRWR1YXJkbyIsImlhdCI6MTcxNjE1NjAxMywiZXhwIjoxNzE2MTU2MDczfQ.91S057L176VKLYu88U3RFH_-g5fzt1bHXqN6LTs6U6w', '2024-05-19 19:00:13.314');

-- --------------------------------------------------------

--
-- Estrutura para tabela `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `pass` text NOT NULL,
  `avatar` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `pass`, `avatar`) VALUES
(1, 'Luis Eduardo', 'luis@gmail.com', '$2b$10$xOUKF88v2hNSGc3DvDvDn.GrjYIo5ci0Z8YIykND57bltAm4V7kxO', 'https://avatars.githubusercontent.com/u/133153563?v=4'),
(2, 'Luis Eduardo', 'luis1@gmail.com', '$2b$10$CpH5zKEZaERr4sYpspVhw.jvU8VHr7qPz7mN5XcK3jyKy24ouvIWy', 'https://avatars.githubusercontent.com/u/133153563?v=4');

-- --------------------------------------------------------

--
-- Estrutura para tabela `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('ac7ae59d-da0a-4eae-b777-7e58906313b7', '0b56b3998903f236273be0e361df0de96808345283358df01c4acbadd8fc5d24', '2024-05-19 19:19:19.864', '20240519191917_new_table', NULL, NULL, '2024-05-19 19:19:17.768', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `session_token_key` (`token`) USING HASH,
  ADD KEY `userId` (`userId`);

--
-- Índices de tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique-email` (`email`);

--
-- Índices de tabela `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `job`
--
ALTER TABLE `job`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `session`
--
ALTER TABLE `session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
