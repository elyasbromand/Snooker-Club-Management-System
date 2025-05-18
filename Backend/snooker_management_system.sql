-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 18, 2025 at 01:14 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `snooker_management_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `booktable`
--

CREATE TABLE `booktable` (
  `BookingID` bigint(20) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Date` date NOT NULL,
  `Time` time NOT NULL,
  `TableID` bigint(20) NOT NULL,
  `DurationHours` int(11) NOT NULL,
  `Phone` varchar(20) NOT NULL,
  `PlayerID` bigint(20) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booktable`
--

INSERT INTO `booktable` (`BookingID`, `Name`, `Date`, `Time`, `TableID`, `DurationHours`, `Phone`, `PlayerID`, `CreatedAt`) VALUES
(1, 'Mahmood', '2025-05-23', '17:00:00', 21, 2, '32132132', 1, '2025-05-15 11:42:33'),
(2, 'Yahya', '2025-05-26', '17:00:00', 21, 2, '32132132', 1, '2025-05-15 13:02:23');

-- --------------------------------------------------------

--
-- Table structure for table `cafesales`
--

CREATE TABLE `cafesales` (
  `SaleID` bigint(20) NOT NULL,
  `ItemID` bigint(20) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `SoldBy` bigint(20) DEFAULT NULL,
  `SaleDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `tableID` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cafesales`
--

INSERT INTO `cafesales` (`SaleID`, `ItemID`, `Quantity`, `SoldBy`, `SaleDate`, `tableID`) VALUES
(2, 1, 2, 1, '2025-05-15 10:56:31', 1),
(6, 1, 2, 1, '2025-05-15 18:54:03', 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `cafe_sales_per_game`
-- (See below for the actual view)
--
CREATE TABLE `cafe_sales_per_game` (
`GameID` bigint(20)
,`TableID` bigint(20)
,`GameDate` date
,`StartTime` time
,`EndTime` time
,`TotalCafeSales` decimal(45,2)
);

-- --------------------------------------------------------

--
-- Table structure for table `gamehistory`
--

CREATE TABLE `gamehistory` (
  `GameID` bigint(20) NOT NULL,
  `TableID` bigint(20) DEFAULT NULL,
  `Player1ID` bigint(20) NOT NULL,
  `Player2ID` bigint(20) DEFAULT NULL,
  `StartTime` time DEFAULT NULL,
  `EndTime` time DEFAULT NULL,
  `TotalAmount` decimal(10,2) DEFAULT NULL,
  `Notes` text DEFAULT NULL,
  `date` date DEFAULT curdate(),
  `hourlyRate` decimal(13,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gamehistory`
--

INSERT INTO `gamehistory` (`GameID`, `TableID`, `Player1ID`, `Player2ID`, `StartTime`, `EndTime`, `TotalAmount`, `Notes`, `date`, `hourlyRate`) VALUES
(1, 1, 1, 2, '15:13:33', '15:13:41', 0.58, 'Top Game of the Week', '2025-05-15', 300.00),
(3, 20, 8, 2, '16:03:56', '16:05:08', 2.64, 'Tournament first Game', '2025-05-15', 500.00),
(4, 21, 2, 8, '16:06:32', '16:06:59', 11.25, 'VIP Game', '2025-05-15', 1500.00),
(5, 22, 9, 1, '17:21:57', '17:23:20', 5.00, 'Friendly Game', '2025-05-15', 500.00),
(6, 1, 2, 4, '22:43:46', '22:44:02', 1.94, 'First Game of Tournament', '2025-05-15', 500.00),
(7, 1, 1, 2, '23:23:55', '23:24:09', 1.35, 'sdf', '2025-05-15', 1212.00),
(8, 1, 4, 1, '15:38:20', '15:41:05', 135.83, 'Keeping it clean\n', '2025-05-16', 3000.00),
(9, 19, 2, 9, '15:38:49', NULL, 0.00, 'Final Touch', '2025-05-16', 5000.00),
(10, 1, 8, 1, '15:57:32', '22:57:32', 1500.00, 'BlahBlah', '2025-04-10', 42.00),
(11, 1, 8, 2, '13:00:00', '14:15:00', 150.00, 'Close game', '2025-03-05', 120.00),
(12, 1, 8, 2, '15:00:00', '16:30:00', 180.00, 'Training match', '2025-03-15', 120.00),
(13, 1, 8, 2, '17:30:00', '18:15:00', 90.00, 'Short game', '2025-03-25', 120.00),
(14, 1, 8, 2, '11:00:00', '12:30:00', 160.00, 'Competitive', '2025-04-01', 120.00),
(15, 1, 8, 2, '14:00:00', '15:45:00', 200.00, 'Fun match', '2025-04-12', 120.00),
(16, 1, 8, 2, '16:00:00', '17:30:00', 190.00, 'Tense game', '2025-04-20', 120.00),
(17, 1, 8, 2, '10:00:00', '11:00:00', 120.00, 'Morning game', '2025-05-05', 120.00),
(18, 1, 8, 2, '18:00:00', '19:30:00', 210.00, 'Evening practice', '2025-05-10', 120.00),
(19, 1, 8, 2, '12:00:00', '13:30:00', 180.00, 'Good rhythm', '2025-05-15', 120.00);

-- --------------------------------------------------------

--
-- Stand-in structure for view `gamehistoryfinalview`
-- (See below for the actual view)
--
CREATE TABLE `gamehistoryfinalview` (
`GameID` bigint(20)
,`TableID` bigint(20)
,`Player1ID` bigint(20)
,`Player2ID` bigint(20)
,`StartTime` time
,`EndTime` time
,`TotalAmount` decimal(10,2)
,`Notes` text
,`date` date
,`hourlyRate` decimal(13,2)
,`TotalCafeSales` decimal(45,2)
,`GrandTotal` decimal(46,2)
);

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `ItemID` bigint(20) NOT NULL,
  `ItemName` varchar(100) NOT NULL,
  `SupplierID` bigint(20) DEFAULT NULL,
  `Category` enum('Cafe','Equipment') NOT NULL,
  `Quantity` int(11) NOT NULL DEFAULT 0,
  `CostPerUnit` decimal(10,2) NOT NULL,
  `LastUpdated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `salePrice` decimal(13,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`ItemID`, `ItemName`, `SupplierID`, `Category`, `Quantity`, `CostPerUnit`, `LastUpdated`, `salePrice`) VALUES
(1, 'Alokozay Energy Drink', 1, 'Cafe', 200, 35.00, '2025-05-15 10:35:12', 40.00),
(2, 'Monster Energy', 1, 'Cafe', 40, 100.00, '2025-05-15 10:35:19', 180.00),
(5, 'Layes', 1, 'Cafe', 1212, 12121.00, '2025-05-15 10:35:47', 30.00),
(7, 'Cue Chalks', 1, 'Equipment', 200, 300.00, '2025-05-14 12:07:47', 1000.00),
(9, 'Stick', 8, 'Equipment', 15, 3000.00, '2025-05-15 09:34:09', 4000.00),
(10, 'Stick', 9, 'Equipment', 12, 3000.00, '2025-05-15 11:39:53', 3500.00),
(11, 'Gensing Energy', 10, 'Cafe', 100, 40.00, '2025-05-15 13:05:51', 65.00);

-- --------------------------------------------------------

--
-- Stand-in structure for view `inventory_overview`
-- (See below for the actual view)
--
CREATE TABLE `inventory_overview` (
`ItemID` bigint(20)
,`ItemName` varchar(100)
,`SupplierID` bigint(20)
,`Category` enum('Cafe','Equipment')
,`OriginalQuantity` int(11)
,`TotalSold` decimal(32,0)
,`RemainingStock` decimal(33,0)
,`CostPerUnit` decimal(10,2)
,`salePrice` decimal(13,2)
,`TotalInventoryCost` decimal(20,2)
,`TotalRevenue` decimal(45,2)
,`TotalProfit` decimal(46,2)
,`LastUpdated` timestamp
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `inventory_overview1`
-- (See below for the actual view)
--
CREATE TABLE `inventory_overview1` (
`ItemID` bigint(20)
,`ItemName` varchar(100)
,`SupplierID` bigint(20)
,`Category` enum('Cafe','Equipment')
,`OriginalQuantity` int(11)
,`TotalSold` decimal(32,0)
,`RemainingStock` decimal(33,0)
,`CostPerUnit` decimal(10,2)
,`salePrice` decimal(13,2)
,`TotalInventoryCost` decimal(20,2)
,`TotalRevenue` decimal(45,2)
,`TotalProfit` decimal(46,2)
,`LastUpdated` timestamp
);

-- --------------------------------------------------------

--
-- Table structure for table `journal`
--

CREATE TABLE `journal` (
  `JournalID` bigint(20) NOT NULL,
  `Title` varchar(150) DEFAULT NULL,
  `Type` enum('Income','Expense') NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `Description` text DEFAULT NULL,
  `EntryDate` date DEFAULT curdate(),
  `RelatedTo` enum('Cafe','Equipment') DEFAULT NULL,
  `CreatedBy` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `journal`
--

INSERT INTO `journal` (`JournalID`, `Title`, `Type`, `Amount`, `Description`, `EntryDate`, `RelatedTo`, `CreatedBy`) VALUES
(1, 'Membership Fee', 'Income', 150.00, 'Monthly membership collected from player', '2025-05-02', 'Equipment', 1),
(7, 'Snack Purchase', 'Expense', 75.00, 'Purchased snacks for the café', '2025-05-02', 'Cafe', 1),
(11, 'Journal Entry ', 'Expense', 123.00, 'Hello Wrold', '2025-05-08', 'Equipment', 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `personal_dashboard`
-- (See below for the actual view)
--
CREATE TABLE `personal_dashboard` (
`PlayerID` bigint(20)
,`FullName` varchar(100)
,`Phone` varchar(20)
,`LoyaltyPoints` int(11)
,`Address` varchar(255)
,`UserName` varchar(255)
,`TotalGamesPlayed` bigint(21)
,`TotalTimeInSeconds` decimal(42,0)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `personal_dashboard_time_date`
-- (See below for the actual view)
--
CREATE TABLE `personal_dashboard_time_date` (
`PlayerID` bigint(20)
,`FullName` varchar(100)
,`date` date
,`MatchesPlayed` bigint(21)
,`TotalTimeInSeconds` decimal(42,0)
);

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `PlayerID` bigint(20) NOT NULL,
  `FullName` varchar(100) NOT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `LoyaltyPoints` int(11) DEFAULT 0,
  `Password` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `path` varchar(300) DEFAULT NULL,
  `join_at` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`PlayerID`, `FullName`, `Phone`, `LoyaltyPoints`, `Password`, `Address`, `userName`, `path`, `join_at`) VALUES
(1, 'Abubakar Jan', '123123123', 4, 'asdf', 'Kabul', 'ab_100', 'uploads\\1747565194162-821525265-Screenshot 2024-05-02 112512.png', '2025-05-02'),
(2, 'Elyas', '12332112321', 6, 'asdf', 'Kabul', 'eb_101', 'uploads\\1746100036025-554433259-Screenshot 2024-04-24 105258.png', '2025-05-02'),
(4, 'Ahmad', '123456', 3, 'Padsf', 'Hawauirr', 'NAgar', NULL, '2025-05-12'),
(8, 'Haroon', '123123123', 73, 'asdf', 'Haji Yaqoob', 'sniper', 'uploads\\1747394779657-256755969-lucid.jpg', '2025-05-15'),
(9, 'Yahya', '12341234', 2, 'asdf', 'Taimanii', 'snookerEye', NULL, '2025-05-15');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `SupplierID` bigint(20) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `ContactInfo` text DEFAULT NULL,
  `Type` enum('Cafe','Equipment') NOT NULL,
  `Address` text DEFAULT NULL,
  `Date` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`SupplierID`, `Name`, `email`, `ContactInfo`, `Type`, `Address`, `Date`) VALUES
(1, 'Elite Supplies Co.', 'ahmad@email.com', '+971-55-1234567', 'Cafe', 'Warehouse 21, Industrial Area, Dubai, UAE', '2025-05-04'),
(3, 'Ali', 'ali@gmail.com', '123123', 'Equipment', 'Jalaabad', '2025-05-04'),
(8, 'Jamal', 'Jamal@gmail.com', '07121231', '', 'Taimani', '2025-05-15'),
(9, 'Haji Ahmad ', 'ahmad@gmail.com', '07123123123', '', 'Qalay fath', '2025-05-15'),
(10, 'Haji Jamal', 'jamal@gmail.com', '12312313', 'Cafe', 'Share-Now', '2025-05-15');

-- --------------------------------------------------------

--
-- Table structure for table `tables`
--

CREATE TABLE `tables` (
  `TableID` bigint(20) NOT NULL,
  `TableNumber` int(11) NOT NULL,
  `Status` enum('Available','In-Use','Maintenance') DEFAULT 'Available',
  `HourlyRate` decimal(10,2) NOT NULL,
  `TableType` enum('Standard','Mini','Professional') NOT NULL DEFAULT 'Standard'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tables`
--

INSERT INTO `tables` (`TableID`, `TableNumber`, `Status`, `HourlyRate`, `TableType`) VALUES
(1, 1, 'Available', 200.00, 'Standard'),
(19, 2, 'In-Use', 300.00, 'Professional'),
(20, 3, 'Available', 1000.00, 'Professional'),
(21, 4, 'Available', 500.00, 'Professional'),
(22, 5, 'Available', 500.00, 'Professional'),
(23, 6, 'In-Use', 500.00, 'Mini');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` bigint(20) NOT NULL,
  `FullName` varchar(100) NOT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Role` enum('admin','staff','cafe') NOT NULL,
  `Password` text NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `FullName`, `Email`, `Phone`, `Role`, `Password`, `CreatedAt`, `username`) VALUES
(1, 'Admin', 'admin@fullcontroll.com', '123321', 'admin', 'asdf', '2025-05-02 14:26:14', 'Admin'),
(5, 'asdf', 'asdf@asdfasdf.asdf', '13123123', 'cafe', 'asdf', '2025-05-14 06:17:02', NULL);

-- --------------------------------------------------------

--
-- Structure for view `cafe_sales_per_game`
--
DROP TABLE IF EXISTS `cafe_sales_per_game`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `cafe_sales_per_game`  AS SELECT `gh`.`GameID` AS `GameID`, `gh`.`TableID` AS `TableID`, `gh`.`date` AS `GameDate`, `gh`.`StartTime` AS `StartTime`, `gh`.`EndTime` AS `EndTime`, sum(`cs`.`Quantity` * `i`.`salePrice`) AS `TotalCafeSales` FROM ((`gamehistory` `gh` left join `cafesales` `cs` on(`cs`.`tableID` = `gh`.`TableID` and cast(`cs`.`SaleDate` as date) = `gh`.`date` and cast(`cs`.`SaleDate` as time) between `gh`.`StartTime` and `gh`.`EndTime`)) left join `inventory` `i` on(`cs`.`ItemID` = `i`.`ItemID`)) GROUP BY `gh`.`GameID`, `gh`.`TableID`, `gh`.`date`, `gh`.`StartTime`, `gh`.`EndTime` ;

-- --------------------------------------------------------

--
-- Structure for view `gamehistoryfinalview`
--
DROP TABLE IF EXISTS `gamehistoryfinalview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `gamehistoryfinalview`  AS SELECT `gh`.`GameID` AS `GameID`, `gh`.`TableID` AS `TableID`, `gh`.`Player1ID` AS `Player1ID`, `gh`.`Player2ID` AS `Player2ID`, `gh`.`StartTime` AS `StartTime`, `gh`.`EndTime` AS `EndTime`, `gh`.`TotalAmount` AS `TotalAmount`, `gh`.`Notes` AS `Notes`, `gh`.`date` AS `date`, `gh`.`hourlyRate` AS `hourlyRate`, ifnull(`cspg`.`TotalCafeSales`,0) AS `TotalCafeSales`, ifnull(`gh`.`TotalAmount`,0) + ifnull(`cspg`.`TotalCafeSales`,0) AS `GrandTotal` FROM (`gamehistory` `gh` left join `cafe_sales_per_game` `cspg` on(`gh`.`GameID` = `cspg`.`GameID`)) ;

-- --------------------------------------------------------

--
-- Structure for view `inventory_overview`
--
DROP TABLE IF EXISTS `inventory_overview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `inventory_overview`  AS SELECT `i`.`ItemID` AS `ItemID`, `i`.`ItemName` AS `ItemName`, `i`.`SupplierID` AS `SupplierID`, `i`.`Category` AS `Category`, `i`.`Quantity` AS `OriginalQuantity`, ifnull(sum(`cs`.`Quantity`),0) AS `TotalSold`, `i`.`Quantity`- ifnull(sum(`cs`.`Quantity`),0) AS `RemainingStock`, `i`.`CostPerUnit` AS `CostPerUnit`, `i`.`salePrice` AS `salePrice`, `i`.`Quantity`* `i`.`CostPerUnit` AS `TotalInventoryCost`, ifnull(sum(`i`.`salePrice` * `cs`.`Quantity`),0) AS `TotalRevenue`, ifnull(sum((`i`.`salePrice` - `i`.`CostPerUnit`) * `cs`.`Quantity`),0) AS `TotalProfit`, `i`.`LastUpdated` AS `LastUpdated` FROM (`inventory` `i` left join `cafesales` `cs` on(`i`.`ItemID` = `cs`.`ItemID`)) GROUP BY `i`.`ItemID`, `i`.`ItemName`, `i`.`SupplierID`, `i`.`Category`, `i`.`Quantity`, `i`.`CostPerUnit`, `i`.`salePrice`, `i`.`LastUpdated` ;

-- --------------------------------------------------------

--
-- Structure for view `inventory_overview1`
--
DROP TABLE IF EXISTS `inventory_overview1`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `inventory_overview1`  AS SELECT `i`.`ItemID` AS `ItemID`, `i`.`ItemName` AS `ItemName`, `i`.`SupplierID` AS `SupplierID`, `i`.`Category` AS `Category`, `i`.`Quantity` AS `OriginalQuantity`, ifnull(sum(`cs`.`Quantity`),0) AS `TotalSold`, `i`.`Quantity`- ifnull(sum(`cs`.`Quantity`),0) AS `RemainingStock`, `i`.`CostPerUnit` AS `CostPerUnit`, `i`.`salePrice` AS `salePrice`, `i`.`Quantity`* `i`.`CostPerUnit` AS `TotalInventoryCost`, ifnull(sum(`i`.`salePrice` * `cs`.`Quantity`),0) AS `TotalRevenue`, ifnull(sum((`i`.`salePrice` - `i`.`CostPerUnit`) * `cs`.`Quantity`),0) AS `TotalProfit`, `i`.`LastUpdated` AS `LastUpdated` FROM (`inventory` `i` left join `cafesales` `cs` on(`i`.`ItemID` = `cs`.`ItemID`)) GROUP BY `i`.`ItemID`, `i`.`ItemName`, `i`.`SupplierID`, `i`.`Category`, `i`.`Quantity`, `i`.`CostPerUnit`, `i`.`salePrice`, `i`.`LastUpdated` ;

-- --------------------------------------------------------

--
-- Structure for view `personal_dashboard`
--
DROP TABLE IF EXISTS `personal_dashboard`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `personal_dashboard`  AS SELECT `p`.`PlayerID` AS `PlayerID`, `p`.`FullName` AS `FullName`, `p`.`Phone` AS `Phone`, `p`.`LoyaltyPoints` AS `LoyaltyPoints`, `p`.`Address` AS `Address`, `p`.`userName` AS `UserName`, coalesce(count(`gh`.`GameID`),0) AS `TotalGamesPlayed`, coalesce(sum(timestampdiff(SECOND,`gh`.`StartTime`,`gh`.`EndTime`)),0) AS `TotalTimeInSeconds` FROM (`players` `p` left join `gamehistory` `gh` on(`p`.`PlayerID` = `gh`.`Player1ID` or `p`.`PlayerID` = `gh`.`Player2ID`)) GROUP BY `p`.`PlayerID` ;

-- --------------------------------------------------------

--
-- Structure for view `personal_dashboard_time_date`
--
DROP TABLE IF EXISTS `personal_dashboard_time_date`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `personal_dashboard_time_date`  AS SELECT `p`.`PlayerID` AS `PlayerID`, `p`.`FullName` AS `FullName`, `gh`.`date` AS `date`, count(0) AS `MatchesPlayed`, sum(timestampdiff(SECOND,`gh`.`StartTime`,`gh`.`EndTime`)) AS `TotalTimeInSeconds` FROM (`players` `p` join `gamehistory` `gh` on(`p`.`PlayerID` = `gh`.`Player1ID` or `p`.`PlayerID` = `gh`.`Player2ID`)) GROUP BY `p`.`PlayerID`, `gh`.`date` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booktable`
--
ALTER TABLE `booktable`
  ADD PRIMARY KEY (`BookingID`),
  ADD KEY `TableID` (`TableID`),
  ADD KEY `PlayerID` (`PlayerID`);

--
-- Indexes for table `cafesales`
--
ALTER TABLE `cafesales`
  ADD PRIMARY KEY (`SaleID`),
  ADD KEY `ItemID` (`ItemID`),
  ADD KEY `SoldBy` (`SoldBy`),
  ADD KEY `fk_tableID` (`tableID`);

--
-- Indexes for table `gamehistory`
--
ALTER TABLE `gamehistory`
  ADD PRIMARY KEY (`GameID`),
  ADD KEY `TableID` (`TableID`),
  ADD KEY `Player1ID` (`Player1ID`),
  ADD KEY `Player2ID` (`Player2ID`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`ItemID`),
  ADD KEY `SupplierID` (`SupplierID`);

--
-- Indexes for table `journal`
--
ALTER TABLE `journal`
  ADD PRIMARY KEY (`JournalID`),
  ADD KEY `CreatedBy` (`CreatedBy`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`PlayerID`),
  ADD UNIQUE KEY `unique_username` (`userName`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`SupplierID`);

--
-- Indexes for table `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`TableID`),
  ADD UNIQUE KEY `TableNumber` (`TableNumber`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booktable`
--
ALTER TABLE `booktable`
  MODIFY `BookingID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cafesales`
--
ALTER TABLE `cafesales`
  MODIFY `SaleID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `gamehistory`
--
ALTER TABLE `gamehistory`
  MODIFY `GameID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `ItemID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `journal`
--
ALTER TABLE `journal`
  MODIFY `JournalID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `PlayerID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `SupplierID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tables`
--
ALTER TABLE `tables`
  MODIFY `TableID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booktable`
--
ALTER TABLE `booktable`
  ADD CONSTRAINT `booktable_ibfk_1` FOREIGN KEY (`TableID`) REFERENCES `tables` (`TableID`),
  ADD CONSTRAINT `booktable_ibfk_2` FOREIGN KEY (`PlayerID`) REFERENCES `players` (`PlayerID`);

--
-- Constraints for table `cafesales`
--
ALTER TABLE `cafesales`
  ADD CONSTRAINT `cafesales_ibfk_1` FOREIGN KEY (`ItemID`) REFERENCES `inventory` (`ItemID`),
  ADD CONSTRAINT `cafesales_ibfk_2` FOREIGN KEY (`SoldBy`) REFERENCES `users` (`UserID`),
  ADD CONSTRAINT `fk_tableID` FOREIGN KEY (`tableID`) REFERENCES `tables` (`TableID`);

--
-- Constraints for table `gamehistory`
--
ALTER TABLE `gamehistory`
  ADD CONSTRAINT `gamehistory_ibfk_1` FOREIGN KEY (`TableID`) REFERENCES `tables` (`TableID`),
  ADD CONSTRAINT `gamehistory_ibfk_2` FOREIGN KEY (`Player1ID`) REFERENCES `players` (`PlayerID`) ON DELETE CASCADE,
  ADD CONSTRAINT `gamehistory_ibfk_3` FOREIGN KEY (`Player2ID`) REFERENCES `players` (`PlayerID`) ON DELETE CASCADE;

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`SupplierID`) REFERENCES `suppliers` (`SupplierID`);

--
-- Constraints for table `journal`
--
ALTER TABLE `journal`
  ADD CONSTRAINT `journal_ibfk_1` FOREIGN KEY (`CreatedBy`) REFERENCES `users` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
