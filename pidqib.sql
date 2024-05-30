-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  mar. 28 mai 2024 à 13:44
-- Version du serveur :  10.1.38-MariaDB
-- Version de PHP :  7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `pidqib`
--

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `id_admin` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `admins`
--

INSERT INTO `admins` (`id_admin`, `name`, `email`, `password`) VALUES
(1, 'Admin Account', 'admin@gmail.com', 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `conjugaisons`
--

CREATE TABLE `conjugaisons` (
  `id_conjug` int(11) NOT NULL,
  `id_time` int(11) NOT NULL,
  `id_verb` int(11) NOT NULL,
  `id_person` int(11) NOT NULL,
  `conjugated` varchar(255) NOT NULL,
  `numeric_value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `conjugaisons`
--

INSERT INTO `conjugaisons` (`id_conjug`, `id_time`, `id_verb`, `id_person`, `conjugated`, `numeric_value`) VALUES
(1, 1, 1, 1, 'Je mange', 40),
(2, 1, 1, 2, 'Tu manges', 59),
(4, 1, 1, 3, 'Il mange', 40),
(5, 1, 1, 4, 'Nous mangeons', 88),
(6, 1, 1, 5, 'Vous mangez', 66),
(7, 1, 1, 6, 'Ils mangent', 74),
(20, 2, 1, 1, 'Je mangea', 0),
(24, 2, 1, 3, 'Nous mangeâmes', 0),
(25, 2, 1, 4, 'Vous mangeâtes', 0),
(26, 1, 2, 1, 'Je cours', 0),
(27, 1, 2, 2, 'Tu cours', 0),
(28, 2, 1, 2, 'Tu mangeas', 0),
(29, 2, 1, 5, 'Nous mangeames', 0),
(30, 2, 1, 6, 'mangèrent', 92);

-- --------------------------------------------------------

--
-- Structure de la table `games`
--

CREATE TABLE `games` (
  `id_game` int(11) NOT NULL,
  `game_name` varchar(255) NOT NULL,
  `game_description` varchar(255) NOT NULL,
  `game_song` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `games`
--

INSERT INTO `games` (`id_game`, `game_name`, `game_description`, `game_song`) VALUES
(1, 'QI-Verbs', 'Jeux de conjugaison', 'qiverbs.mp3'),
(2, 'QI-Foot', 'Jeux de culture générale en terme de football', 'qifoot.mp3');

-- --------------------------------------------------------

--
-- Structure de la table `levels`
--

CREATE TABLE `levels` (
  `id_level` int(11) NOT NULL,
  `level_name` varchar(255) NOT NULL,
  `duration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `levels`
--

INSERT INTO `levels` (`id_level`, `level_name`, `duration`) VALUES
(1, 'Normal', 25),
(2, 'Moyen', 25);

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id_notification` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `parties`
--

CREATE TABLE `parties` (
  `id_partie` int(11) NOT NULL,
  `id_game` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `parties`
--

INSERT INTO `parties` (`id_partie`, `id_game`, `id_user`, `question`, `answer`, `score`) VALUES
(1, 1, 1, 'exemple question', 'exemple anwser', 12),
(2, 1, 1, 'exemple question', 'exemple anwser', 12),
(3, 1, 1, 'exemple question', 'exemple anwser', 12),
(4, 1, 1, 'exemple question', 'exemple anwser', 12),
(5, 1, 1, 'ton nom ?', 'lucien', 15);

-- --------------------------------------------------------

--
-- Structure de la table `partners`
--

CREATE TABLE `partners` (
  `id_partner` int(11) NOT NULL,
  `partner_name` varchar(255) NOT NULL,
  `partner_avatar` varchar(255) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `partners`
--

INSERT INTO `partners` (`id_partner`, `partner_name`, `partner_avatar`, `created_at`) VALUES
(1, 'Josué TALU', 'url', '2024-05-23'),
(2, 'mm', 'll', '2024-05-23');

-- --------------------------------------------------------

--
-- Structure de la table `persons`
--

CREATE TABLE `persons` (
  `id_person` int(11) NOT NULL,
  `person` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `persons`
--

INSERT INTO `persons` (`id_person`, `person`) VALUES
(1, '1er p'),
(2, '2e p'),
(3, '3e p'),
(4, '4e p'),
(5, '5e p'),
(6, '6e p');

-- --------------------------------------------------------

--
-- Structure de la table `players`
--

CREATE TABLE `players` (
  `id_player` int(11) NOT NULL,
  `player_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `players`
--

INSERT INTO `players` (`id_player`, `player_name`) VALUES
(1, 'Maradonna'),
(3, 'KOOL'),
(4, 'KOOL'),
(5, 'Lionel Messi'),
(6, 'Christiano Ronaldo'),
(7, 'Vinicius Jr.'),
(9, 'ffff');

-- --------------------------------------------------------

--
-- Structure de la table `qifoot_questions`
--

CREATE TABLE `qifoot_questions` (
  `id_question` int(11) NOT NULL,
  `id_player` int(11) NOT NULL,
  `question_content` text NOT NULL,
  `answer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `qifoot_questions`
--

INSERT INTO `qifoot_questions` (`id_question`, `id_player`, `question_content`, `answer`) VALUES
(1, 1, 'Quel est son nom ?', 'Maradona'),
(2, 1, 'Sa nationalité ?', 'Argentin');

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

CREATE TABLE `questions` (
  `id_question` int(11) NOT NULL,
  `id_time` int(255) DEFAULT NULL,
  `id_verb` int(255) DEFAULT NULL,
  `id_person` int(255) NOT NULL,
  `question1` text,
  `answer1` text,
  `question2` text,
  `answer2` text,
  `point_question1` int(11) DEFAULT NULL,
  `point_question2` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `questions`
--

INSERT INTO `questions` (`id_question`, `id_time`, `id_verb`, `id_person`, `question1`, `answer1`, `question2`, `answer2`, `point_question1`, `point_question2`) VALUES
(1, 1, 1, 1, 'Ici la question', 'reponse1', 'Ici la question 2', 'Reponse 2', 5, 5),
(2, 1, 1, 1, 'question ex', 'reponse', 'xxxxx', 'xxxx', NULL, 10);

-- --------------------------------------------------------

--
-- Structure de la table `times`
--

CREATE TABLE `times` (
  `id_time` int(11) NOT NULL,
  `time_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `times`
--

INSERT INTO `times` (`id_time`, `time_name`) VALUES
(1, 'Présent'),
(2, 'Passé Simple'),
(3, 'Imparfait'),
(4, 'cool'),
(5, 'Plus que parfait');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `avatar_user` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `email`, `name`, `password`, `phone`, `avatar_user`, `address`) VALUES
(1, 'jtt@gmail.com', 'Josué', '123', '+243895092749', 'img', 'MMA MOBUTU');

-- --------------------------------------------------------

--
-- Structure de la table `verbs`
--

CREATE TABLE `verbs` (
  `id_verb` int(11) NOT NULL,
  `verb` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `verbs`
--

INSERT INTO `verbs` (`id_verb`, `verb`) VALUES
(1, 'manger'),
(2, 'courir'),
(3, 'boire'),
(4, 'voir'),
(5, 'danser'),
(6, 'parler'),
(7, 'noircir'),
(8, 'polir'),
(9, 'luire'),
(10, 'Venir'),
(14, 'ff');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id_admin`);

--
-- Index pour la table `conjugaisons`
--
ALTER TABLE `conjugaisons`
  ADD PRIMARY KEY (`id_conjug`);

--
-- Index pour la table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id_game`);

--
-- Index pour la table `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`id_level`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id_notification`);

--
-- Index pour la table `parties`
--
ALTER TABLE `parties`
  ADD PRIMARY KEY (`id_partie`);

--
-- Index pour la table `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`id_partner`);

--
-- Index pour la table `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`id_person`);

--
-- Index pour la table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id_player`);

--
-- Index pour la table `qifoot_questions`
--
ALTER TABLE `qifoot_questions`
  ADD PRIMARY KEY (`id_question`),
  ADD KEY `id_player` (`id_player`);

--
-- Index pour la table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id_question`);

--
-- Index pour la table `times`
--
ALTER TABLE `times`
  ADD PRIMARY KEY (`id_time`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- Index pour la table `verbs`
--
ALTER TABLE `verbs`
  ADD PRIMARY KEY (`id_verb`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admins`
--
ALTER TABLE `admins`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `conjugaisons`
--
ALTER TABLE `conjugaisons`
  MODIFY `id_conjug` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `games`
--
ALTER TABLE `games`
  MODIFY `id_game` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `levels`
--
ALTER TABLE `levels`
  MODIFY `id_level` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id_notification` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `parties`
--
ALTER TABLE `parties`
  MODIFY `id_partie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `partners`
--
ALTER TABLE `partners`
  MODIFY `id_partner` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `persons`
--
ALTER TABLE `persons`
  MODIFY `id_person` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `players`
--
ALTER TABLE `players`
  MODIFY `id_player` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `qifoot_questions`
--
ALTER TABLE `qifoot_questions`
  MODIFY `id_question` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `questions`
--
ALTER TABLE `questions`
  MODIFY `id_question` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `times`
--
ALTER TABLE `times`
  MODIFY `id_time` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `verbs`
--
ALTER TABLE `verbs`
  MODIFY `id_verb` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `qifoot_questions`
--
ALTER TABLE `qifoot_questions`
  ADD CONSTRAINT `qifoot_questions_ibfk_1` FOREIGN KEY (`id_player`) REFERENCES `players` (`id_player`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
