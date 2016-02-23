-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 05, 2014 at 07:29 PM
-- Server version: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `lindt`
--

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
`id` int(11) NOT NULL,
  `code` varchar(128) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `active` int(11) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `code`, `name`, `description`, `active`) VALUES
(1, 'P10001', 'GBI-GEARS', 'Supply chain tool for Apple.Inc', 1),
(2, 'P10002', 'Marcom-DENALI', 'Apple.com CMS for Apple.Inc', 1),
(3, 'P10003', 'WhiteLabel Mobile App', 'Custom Fin Subsidy mobile app', 1),
(4, 'P10004', 'NSLHD', 'Healthcare website for NSW', 1),
(5, 'P10005', 'www.skynet.nl', 'Telecom media portal for Belgacom', 1),
(6, 'P10006', 'Web Templates', 'Generic Web Templates for Amgen', 1),
(7, 'P10007', 'PLCE', 'Power Lender Consumber Edition for UOB', 1),
(8, 'P10008', 'www.stylelist.com', 'Fashion & Media portal for AOL', 1),
(9, 'P10009', 'www.aisledash.com', 'Fashion & Ornaments portal for AOL', 0),
(10, 'P10010', 'www.royalwedding.com', 'Royal wedding portal for AOL', 0),
(11, 'P10011', 'www.luxist.com', 'Clothing portal for AOL', 0),
(12, 'P10012', 'WCARO.org', 'Uniceff data samples for Upwelling', 1),
(13, 'P10013', 'Hirewiser', 'Recruitment portal for Amdocs', 0),
(14, 'P10014', 'RAMMS', 'Admin portal for RAMMS retails', 0),
(15, 'P10015', 'Gateforum Etutor Admin', 'Etutor admin panel for Gateforum', 1),
(16, 'P10016', '20North Ad Management', 'Ad management System for 20North', 1),
(17, 'P10017', 'ifOnline', 'Project Management System for ifOnline', 1),
(18, 'P10018', 'Envoy', 'HR Management tool for ', 1),
(19, 'P10019', 'CompuTaught', 'ELearning tool for Thompson', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
