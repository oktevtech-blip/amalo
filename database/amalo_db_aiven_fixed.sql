-- Amaloo database - Aiven-ready MySQL dump
-- Primary keys are declared inside CREATE TABLE statements so this
-- database can be imported when sql_require_primary_key=ON.
-- Generated from the supplied amalo_db.sql.

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2026 at 02:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `amalo_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`project_id`, `title`, `location`, `description`, `image`) VALUES
(1, 'Electrical Installation', 'Kampala, Uganda', 'Complete electrical installation for a commercial office complex.', '/images/projects/project1.jpg'),
(2, 'Solar Energy System', 'Mukono, Uganda', 'Design and installation of a high-capacity solar power system.', '/images/projects/project2.jpg'),
(3, 'ICT Infrastructure', 'Entebbe, Uganda', 'Structured cabling, networking and communication infrastructure.', '/images/projects/project3.jpg'),
(4, 'Industrial Automation', 'Jinja, Uganda', 'Automation systems for improved production efficiency.', '/images/projects/project4.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `short_description` text DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `image` text DEFAULT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_id`, `title`, `short_description`, `icon`, `image`) VALUES
(1, 'Electrical Installations & Infrastructure', 'Power systems engineered for performance and built to last.', 'Zap', '/images/services/electrical.jpg'),
(2, 'HVAC & Building Services', 'Comfortable, efficient environments from concept to commissioning.', 'Wind', '/images/services/mechanical.jpg'),
(3, 'Generator & Power Transfer Systems', 'Resilient power when your operation cannot afford downtime.', 'BatteryCharging', '/images/services/renewable.jpg'),
(4, 'Protection of Earthing', 'Practical safety systems that protect people and assets.', 'ShieldCheck', '/images/services/security.jpg'),
(5, 'ICT & Communication Systems', 'Connected infrastructure ready for the way teams work today.', 'RadioTower', '/images/services/ict.jpg'),
(6, 'Testing, Maintenance & Commissioning', 'Confidence after handover, with responsive ongoing support.', 'ClipboardCheck', '/images/services/maintenance.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `site_settings`
--

CREATE TABLE `site_settings` (
  `setting_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL,
  `eyebrow` varchar(255) DEFAULT NULL,
  `tagline` text DEFAULT NULL,
  `intro` text DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `hero_image` text DEFAULT NULL,
  `footer_note` text DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`setting_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `site_settings`
--

INSERT INTO `site_settings` (`setting_id`, `company_name`, `eyebrow`, `tagline`, `intro`, `phone`, `email`, `website`, `location`, `hero_image`, `footer_note`, `updated_at`) VALUES
(1, 'AMALO', 'Engineering Group', 'The future of engineering, delivered today.', 'We design, build, and maintain the essential systems that keep people moving, connected, and safe.', '+263 077 840 1416', 'info@amalo.co.org', 'www.amalo.com', 'Masaka, Uganda', 'https://images.pexels.com/photos/8482865/pexels-photo-8482865.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Engineering with purpose. Delivery with discipline.', '2026-08-11 12:23:48');

-- --------------------------------------------------------

--
-- Table structure for table `stats`
--

CREATE TABLE `stats` (
  `stat_id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(50) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`stat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stats`
--

INSERT INTO `stats` (`stat_id`, `value`, `label`) VALUES
(1, '01', 'Trusted Engineering Partner'),
(2, '360°', 'From Design to Deliver'),
(3, '24/7', 'Systems That Keep Working');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `testimonial_id` int(11) NOT NULL AUTO_INCREMENT,
  `client_name` varchar(255) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `review` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  PRIMARY KEY (`testimonial_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`testimonial_id`, `client_name`, `company`, `review`, `image`) VALUES
(1, 'John Okello', 'ABC Construction', 'AMALO Engineering exceeded our expectations. Their professionalism and attention to detail were exceptional.', '/images/testimonials/client1.jpg'),
(2, 'Sarah Namusoke', 'Green Energy Ltd', 'From planning to commissioning, every stage was handled professionally. Highly recommended.', '/images/testimonials/client2.jpg'),
(3, 'David Ouma', 'Prime Developers', 'Their team delivered our project on time while maintaining outstanding quality standards.', '/images/testimonials/client3.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `projects`
--
--
-- Indexes for table `services`
--
--
-- Indexes for table `site_settings`
--
--
-- Indexes for table `stats`
--
--
-- Indexes for table `testimonials`
--
--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `site_settings`
--
ALTER TABLE `site_settings`
  MODIFY `setting_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `stats`
--
ALTER TABLE `stats`
  MODIFY `stat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `testimonial_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
