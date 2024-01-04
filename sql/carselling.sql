-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 04, 2024 at 12:39 AM
-- Server version: 5.7.26
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `carselling`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(10, '2023_12_29_183521_create_tbl_dealers_table', 6),
(6, '2023_12_29_183301_create_tbl_products_table', 3),
(7, '2023_12_31_034728_create_tbl_logs_table', 4),
(9, '2024_01_02_093344_create_tbl_supplier_table', 5),
(11, '2024_01_03_195022_create_tbl_transaction_table', 7);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'masteradmin@gmail.com_Admin', '9056265da44cc03e31a729ddaa8f47ca7186af7ae43cd0238aa789785ea4817f', '[\"server:admin\"]', NULL, '2023-12-29 05:00:31', '2023-12-29 05:00:31'),
(2, 'App\\Models\\User', 1, 'masteradmin@gmail.com_Admin', '2150f88f2ddaa1c7c6dba6ef9b6a3b1041e9cde7e74b90cffed351b18103c703', '[\"server:admin\"]', '2024-01-01 13:25:08', '2023-12-29 10:03:57', '2024-01-01 13:25:08'),
(3, 'App\\Models\\User', 3, 'honda@gmail.com_Dealer', 'd5c950001635d924a564940422e8a7fb96dadbce5b0cf9834b3c5e91a2c71137', '[\"server:dealer\"]', '2024-01-02 00:45:16', '2024-01-01 09:46:14', '2024-01-02 00:45:16'),
(4, 'App\\Models\\User', 1, 'masteradmin@gmail.com_Admin', '08098f60546bbaf3220c1bc2c4c026e5b46a84e8a8fc7907990f3aa2fa50c83b', '[\"server:admin\"]', '2024-01-02 12:17:46', '2024-01-02 01:12:37', '2024-01-02 12:17:46'),
(5, 'App\\Models\\User', 3, 'honda@gmail.com_Dealer', '4a832aac16155933d279aed7ea4f1b915e5c7bcca7260539b615d0e671b07688', '[\"server:dealer\"]', '2024-01-02 12:35:11', '2024-01-02 01:12:57', '2024-01-02 12:35:11'),
(6, 'App\\Models\\User', 1, 'masteradmin@gmail.com_Admin', '0c2e8be9b68d4a7970d9503d062d03ab7e87b363307dc7a41f3d7460c02306d0', '[\"server:admin\"]', '2024-01-03 13:26:57', '2024-01-03 00:42:05', '2024-01-03 13:26:57'),
(7, 'App\\Models\\User', 3, 'honda@gmail.com_Dealer', 'abd104dd09b9133e6b20a71dee03dc20ccb2dc713c366c4c62661a52a381a8e1', '[\"server:dealer\"]', '2024-01-03 12:36:31', '2024-01-03 04:13:10', '2024-01-03 12:36:31'),
(9, 'App\\Models\\User', 7, 'superadmin@gmail.com_SuperAdmin', 'd87d45ea4768819d3fc2d388dc9f9114c0a21251b1d9187408b5705938cac03c', '[\"server:super\"]', '2024-01-03 14:40:44', '2024-01-03 13:28:03', '2024-01-03 14:40:44');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_barangay_coordinates`
--

DROP TABLE IF EXISTS `tbl_barangay_coordinates`;
CREATE TABLE IF NOT EXISTS `tbl_barangay_coordinates` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `brgy_name` varchar(30) NOT NULL,
  `lat` double(10,2) NOT NULL,
  `lng` double(10,2) NOT NULL,
  `marker_color` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=latin1 COMMENT='tbl_barangay_coordinates';

--
-- Dumping data for table `tbl_barangay_coordinates`
--

INSERT INTO `tbl_barangay_coordinates` (`id`, `brgy_name`, `lat`, `lng`, `marker_color`) VALUES
(1, 'Baobaoan', 8.92, 125.56, 'FF776B'),
(2, 'Santo Nino', 9.05, 125.52, 'FF1100'),
(3, 'Anticala', 9.01, 125.62, 'FF8000'),
(4, 'Los Angeles', 9.01, 125.63, 'DFFF00'),
(5, 'Sumilihon', 9.01, 125.63, 'FFBF00'),
(6, 'Cabcabon', 8.98, 125.53, 'FF7F50'),
(7, 'Pianing', 8.98, 125.65, 'DE3163'),
(8, 'Taguibo', 8.98, 125.61, '9FE2BF'),
(9, 'Bugsukan', 8.95, 125.64, '40E0D0'),
(10, 'Antongalon', 8.95, 125.61, '6495ED'),
(11, 'Ampayon', 8.96, 125.60, 'CCCCFF'),
(12, 'Tiniwisan', 8.97, 125.58, 'BDB76B'),
(13, 'Taligaman', 8.94, 125.62, '800000'),
(14, 'Banza', 8.94, 125.56, 'FFA07A'),
(15, 'Baan', 8.95, 125.55, 'FFA500'),
(16, 'Lemon', 8.94, 125.59, 'F0E68C'),
(17, 'Basag', 8.92, 125.60, '3CB371'),
(18, 'Maug', 8.99, 125.53, '00FFFF'),
(19, 'Pagatpatan', 8.99, 125.53, '1E90FF'),
(20, 'Lumbocan', 9.00, 125.49, 'FF00FF'),
(21, 'Agusan Pequeño', 8.98, 125.52, '8A2BE2'),
(22, 'Bading', 8.97, 125.52, '4B0082'),
(23, 'Mahogany', 8.96, 125.54, 'FFE4E1'),
(24, 'Baan Riverside', 8.95, 125.54, 'BC8F8F'),
(25, 'Buhangin', 8.91, 125.52, 'DAA520'),
(26, 'Mahay', 8.93, 125.56, 'F4A460'),
(27, 'Camayahan', 8.91, 125.51, 'A0522D'),
(28, 'Obrero', 8.96, 125.53, '00CED1'),
(29, 'Port Poyohon', 8.96, 125.53, '8A2BE2'),
(30, 'Humabon', 8.95, 125.54, '008080'),
(31, 'Leon Kilat', 8.95, 125.54, '9ACD32'),
(32, 'San Ignacio', 8.95, 125.54, '808080'),
(33, 'Sikatuna', 8.95, 125.54, 'C71585'),
(34, 'Rajah Soliman', 8.95, 125.54, 'FFFFF0'),
(35, 'Urduja', 8.95, 125.54, 'FA8072'),
(36, 'Dagohoy', 8.94, 125.53, 'FF4500'),
(37, 'Golden Ribbon', 8.94, 125.54, '550A35'),
(38, 'Imadejas', 8.94, 125.53, '7F4E52'),
(39, 'JP Rizal', 8.94, 125.53, 'F8B88B'),
(40, 'Lapu-Lapu', 8.95, 125.53, 'FFB6C1'),
(41, 'New Society Village', 8.95, 125.54, 'C25283'),
(42, 'Holy Redeemer', 8.96, 125.52, 'FF00FF'),
(43, 'Limaha', 8.95, 125.53, '583759'),
(44, 'Tandang Sora', 8.95, 125.53, '36013F'),
(45, 'Ambago', 8.97, 125.48, 'CCCCFF'),
(46, 'Bayanihan', 8.95, 125.52, 'C2B280'),
(47, 'Doongan', 8.96, 125.50, 'F75D59'),
(48, 'Manila de Bugabus', 8.81, 125.49, 'BDEDFF'),
(49, 'Babag', 8.97, 125.49, '566D7E'),
(50, 'Ong Yiu', 8.96, 125.54, 'C6AEC7'),
(51, 'Bancasi', 8.95, 125.46, 'ECC5C0'),
(52, 'Dumalagan', 8.93, 125.43, 'E5E4E2'),
(53, 'Libertad', 8.94, 125.48, '2B547E'),
(54, 'Masao', 8.99, 125.47, '16E2F5'),
(55, 'Agao', 8.94, 125.54, '82CAFF'),
(56, 'Datu Silongan', 8.95, 125.54, 'E9AB17'),
(57, 'Diego Silang', 8.95, 125.54, '4D0000'),
(58, 'Pinamanculan', 8.98, 125.45, 'C4535A'),
(59, 'Bonbon', 8.92, 125.49, '005A58'),
(60, 'Kinamlutan', 8.91, 125.51, '441FA8'),
(61, ' Maon', 8.93, 125.54, '65B8A3'),
(62, 'Pangabugan', 8.93, 125.53, 'B2779B'),
(63, 'San Vicente', 8.91, 125.54, '014831'),
(64, 'Villa Kananga', 8.93, 125.52, '689FFF'),
(65, 'Amparo', 8.85, 125.51, '580080'),
(66, 'Bit-os', 8.89, 125.47, 'B03A80'),
(67, 'Bitan-agan', 8.85, 125.49, '665AD0'),
(68, 'Dankias', 8.75, 125.56, '663F34'),
(69, 'Dulag', 8.83, 125.53, '464863'),
(70, 'Bugabus (MJ Santos)', 8.81, 125.55, '929265'),
(71, 'Nong-nong', 8.86, 125.46, '53659f'),
(72, 'San Mateo', 8.79, 125.57, '9EF2B8'),
(73, 'Tungao', 8.79, 125.44, '00E5D1'),
(74, 'Bilay', 8.85, 125.56, '66627D'),
(75, 'Don Francisco', 8.87, 125.57, '002A4C'),
(76, 'Florida', 8.79, 125.58, '421D5C'),
(77, 'Maguinda', 8.82, 125.58, '0C4A00'),
(78, 'Maibu', 8.85, 125.59, '36166B'),
(79, 'Mandamo', 8.76, 125.60, '1E6757'),
(80, 'Sumile', 8.83, 125.60, '956033'),
(81, 'Aupagan', 8.88, 125.54, '856CB8'),
(82, 'Pigdaulan', 8.90, 125.58, '383C75'),
(83, 'Salvacion', 8.87, 125.58, '9D6C58'),
(84, 'Tagabaca', 8.91, 125.55, '66A4AC'),
(85, 'Bobon', 8.98, 125.54, '00D7C3'),
(86, 'De Oro', 8.92, 125.63, '5600A1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_dealers_product`
--

DROP TABLE IF EXISTS `tbl_dealers_product`;
CREATE TABLE IF NOT EXISTS `tbl_dealers_product` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_fk` bigint(20) UNSIGNED NOT NULL,
  `products_fk` bigint(20) UNSIGNED NOT NULL,
  `price_sold` double(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_dealers_product_user_fk_foreign` (`user_fk`),
  KEY `tbl_dealers_product_products_fk_foreign` (`products_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_dealers_product`
--

INSERT INTO `tbl_dealers_product` (`id`, `user_fk`, `products_fk`, `price_sold`, `created_at`, `updated_at`) VALUES
(2, 3, 1, 12443.00, '2024-01-03 11:58:15', '2024-01-03 11:58:15');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_logs`
--

DROP TABLE IF EXISTS `tbl_logs`;
CREATE TABLE IF NOT EXISTS `tbl_logs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_fk` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_logs_user_fk_foreign` (`user_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_logs`
--

INSERT INTO `tbl_logs` (`id`, `description`, `user_fk`, `created_at`, `updated_at`) VALUES
(1, 'Create Product to', 1, '2024-01-01 08:53:17', '2024-01-01 08:53:17'),
(2, 'Create Product to', 1, '2024-01-02 01:21:17', '2024-01-02 01:21:17'),
(3, 'Create Product to 1G1JC6SH3D4200004', 1, '2024-01-02 01:44:56', '2024-01-02 01:44:56'),
(4, 'CreatedNissi', 7, '2024-01-03 14:40:35', '2024-01-03 14:40:35');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_products`
--

DROP TABLE IF EXISTS `tbl_products`;
CREATE TABLE IF NOT EXISTS `tbl_products` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `VID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bodytype` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double(10,2) NOT NULL,
  `dealer_price` double(10,2) DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transmission` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `engine` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_year` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unique_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_fk` bigint(20) UNSIGNED NOT NULL,
  `supplier_fk` bigint(20) UNSIGNED DEFAULT NULL,
  `is_dealer_sold` int(10) NOT NULL DEFAULT '0',
  `is_customer_sold` int(10) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_fk` (`user_fk`),
  KEY `supplier_fk` (`supplier_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_products`
--

INSERT INTO `tbl_products` (`id`, `VID`, `bodytype`, `color`, `price`, `dealer_price`, `image`, `brand`, `model`, `transmission`, `engine`, `model_year`, `unique_key`, `user_fk`, `supplier_fk`, `is_dealer_sold`, `is_customer_sold`, `created_at`, `updated_at`) VALUES
(1, '19123CAWFWA#21faf', 'Body', 'Sample', 12442.00, 12443.00, 'Uploads/Files/d147e9d3e4e509d364afae9095e7524f.png', 'Sample', 'Sampe', 'Sample', 'sample', '2012', 'd147e9d3e4e509d364afae9095e7524f', 1, 3, 1, 1, '2024-01-01 08:53:17', '2024-01-03 13:11:08'),
(2, '1G1JC6SH3D4200002', 'Sample', 'Sample', 24350.00, NULL, 'Uploads/Files/997b8f4c5a198b741c42ec48a407de37.jpg', 'Sample', 'Sample', 'Sample', 'Sample', '2023', '997b8f4c5a198b741c42ec48a407de37', 1, NULL, 0, 0, '2024-01-02 01:21:17', '2024-01-02 01:21:17'),
(3, '1G1JC6SH3D4200004', 'Ez', 'ez', 32311.00, NULL, 'Uploads/Files/854ba68bc784f895b6a0f7e55d6b7c83.png', 'ex', 'ez', 'ez', 'ez', '2012', '854ba68bc784f895b6a0f7e55d6b7c83', 1, NULL, 0, 0, '2024-01-02 01:44:56', '2024-01-02 01:44:56');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_supplier`
--

DROP TABLE IF EXISTS `tbl_supplier`;
CREATE TABLE IF NOT EXISTS `tbl_supplier` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_fk` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_supplier_user_fk_foreign` (`user_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_supplier`
--

INSERT INTO `tbl_supplier` (`id`, `supplier_name`, `user_fk`, `created_at`, `updated_at`) VALUES
(1, 'Honda Industires', 1, NULL, NULL),
(2, 'Suzuki Supplier', 8, NULL, NULL),
(3, 'Toyota', 9, NULL, NULL),
(4, 'Sniper', 10, '2024-01-03 14:27:43', '2024-01-03 14:27:43'),
(5, 'Nissi', 11, '2024-01-03 14:40:34', '2024-01-03 14:40:34');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transaction`
--

DROP TABLE IF EXISTS `tbl_transaction`;
CREATE TABLE IF NOT EXISTS `tbl_transaction` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `seller_fk` bigint(20) UNSIGNED NOT NULL,
  `buyer_fk` bigint(20) UNSIGNED NOT NULL,
  `products_fk` bigint(20) UNSIGNED NOT NULL,
  `current_price` double(10,2) NOT NULL,
  `sold_price` double(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_transaction_seller_fk_foreign` (`seller_fk`),
  KEY `tbl_transaction_buyer_fk_foreign` (`buyer_fk`),
  KEY `tbl_transaction_products_fk_foreign` (`products_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_transaction`
--

INSERT INTO `tbl_transaction` (`id`, `seller_fk`, `buyer_fk`, `products_fk`, `current_price`, `sold_price`, `created_at`, `updated_at`) VALUES
(1, 1, 3, 1, 12442.00, 12443.00, '2024-01-03 11:58:15', '2024-01-03 11:58:15'),
(2, 1, 6, 1, 12442.00, 12444.00, '2024-01-03 13:11:08', '2024-01-03 13:11:08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` tinyint(4) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` bigint(20) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brgy_fk` bigint(20) UNSIGNED DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `brgy_fk` (`brgy_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `role`, `status`, `email`, `contact`, `email_verified_at`, `password`, `secret`, `brgy_fk`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Master Admin', 1, 1, 'masteradmin@gmail.com', 9213123213, NULL, '$2y$10$cWJVUK8gLG/M8UUlid0paOADlM9QwqAMTJl2WBHMaXE0yRsahNZVO', 'masteradmin1234..', 4, NULL, '2023-12-28 13:24:37', '2023-12-28 13:24:37'),
(3, 'Honda1', 2, 1, 'honda@gmail.com', 9213123213, NULL, '$2y$10$V897fC/BVkyO6fQqM9223uGTTADKM4H.DZxYR970xThsjEAvvaRdS', 'Honda', 45, NULL, '2023-12-29 19:56:47', '2023-12-29 21:00:12'),
(5, 'Grant', 2, 1, 'grant@gmail.com', 9231423435, NULL, '$2y$10$Yct0oqCDhsUHp0npAc7bY.47.0CBy8uiHhN/TxowYHu0DwJJGUrbC', 'Grant', 64, NULL, '2024-01-02 11:45:25', '2024-01-02 11:45:25'),
(6, 'Grant Jaspe', 3, 1, 'jaspe@gmail.com', NULL, NULL, '$2y$10$pZ2wmn6D3hUfLMvAeT5CyelKPcv5MLGKbzAEtdqAJW6q1g47m6z4u', 'hackfb123', NULL, NULL, '2024-01-03 12:36:05', '2024-01-03 12:36:05'),
(7, 'Super Admin', 4, 1, 'superadmin@gmail.com', NULL, NULL, '$2y$10$cWJVUK8gLG/M8UUlid0paOADlM9QwqAMTJl2WBHMaXE0yRsahNZVO', 'hackfb123', NULL, NULL, NULL, NULL),
(8, 'Suzuki', 1, 1, 'suzuki@gmail.com', 9213123, NULL, '$2y$10$ED5Vh4dnVHulJ7.lnrW8Fe9U.8JNY2PkrKCu3WO.zvcslRYr9e7vO', 'Suzuki', 74, NULL, '2024-01-03 14:10:57', '2024-01-03 14:10:57'),
(9, 'Toyota', 1, 1, 'toyota@gmail.com', 921312312, NULL, '$2y$10$jghdrzCECjoBELAjI04lC.bTYiWNpyd1dZnqhtfrFYvBEsbunix46', 'Toyota', 6, NULL, '2024-01-03 14:24:32', '2024-01-03 14:24:32'),
(10, 'Sniper', 1, 1, 'sniper@gmail.com', 93213213125, NULL, '$2y$10$7gNnKW05PxahVnv.iuPE1OdpNJxErxBeBZw5ZmSyuHOUQkOP2JAY.', 'Sniper', 81, NULL, '2024-01-03 14:27:43', '2024-01-03 14:27:43'),
(11, 'Nissi', 1, 1, 'nissi@gmail.com', 9123123424, NULL, '$2y$10$vyWmftbLBM8EI4Mwtyx0rOE/zZCAXW3W5t14xGxpKTKrJl2N18pgO', 'Nissi', 49, NULL, '2024-01-03 14:40:34', '2024-01-03 14:40:34');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_dealers_product`
--
ALTER TABLE `tbl_dealers_product`
  ADD CONSTRAINT `tbl_dealers_product_products_fk_foreign` FOREIGN KEY (`products_fk`) REFERENCES `tbl_products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_dealers_product_user_fk_foreign` FOREIGN KEY (`user_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_logs`
--
ALTER TABLE `tbl_logs`
  ADD CONSTRAINT `tbl_logs_user_fk_foreign` FOREIGN KEY (`user_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_products`
--
ALTER TABLE `tbl_products`
  ADD CONSTRAINT `tbl_products_ibfk_1` FOREIGN KEY (`user_fk`) REFERENCES `tbl_supplier` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_products_ibfk_2` FOREIGN KEY (`supplier_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_supplier`
--
ALTER TABLE `tbl_supplier`
  ADD CONSTRAINT `tbl_supplier_user_fk_foreign` FOREIGN KEY (`user_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  ADD CONSTRAINT `tbl_transaction_buyer_fk_foreign` FOREIGN KEY (`buyer_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_transaction_products_fk_foreign` FOREIGN KEY (`products_fk`) REFERENCES `tbl_products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_transaction_seller_fk_foreign` FOREIGN KEY (`seller_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`brgy_fk`) REFERENCES `tbl_barangay_coordinates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
