-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bomberos
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accidentes`
--

DROP TABLE IF EXISTS `accidentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accidentes` (
  `IdAccidentes` int NOT NULL AUTO_INCREMENT,
  `TipoAccidente` varchar(150) DEFAULT NULL,
  `FechaAccidente` datetime DEFAULT NULL,
  `LugarAccidente` varchar(200) DEFAULT NULL,
  `DescripcionAccidente` text,
  `Id_UnidadAccidente` int DEFAULT NULL,
  PRIMARY KEY (`IdAccidentes`),
  KEY `Id_UnidadAccidente` (`Id_UnidadAccidente`),
  CONSTRAINT `accidentes_ibfk_1` FOREIGN KEY (`Id_UnidadAccidente`) REFERENCES `unidadservicio` (`IdUnidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accidentes`
--

LOCK TABLES `accidentes` WRITE;
/*!40000 ALTER TABLE `accidentes` DISABLE KEYS */;
/*!40000 ALTER TABLE `accidentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accidentestransito`
--

DROP TABLE IF EXISTS `accidentestransito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accidentestransito` (
  `IdAccidentesTransito` int NOT NULL AUTO_INCREMENT,
  `TipoAccidenteTransito` varchar(100) DEFAULT NULL,
  `FechaAccidenteTransito` datetime DEFAULT NULL,
  `LugarAccidenteTransito` varchar(200) DEFAULT NULL,
  `DescripcionAT` text,
  `Id_UnidadAT` int DEFAULT NULL,
  PRIMARY KEY (`IdAccidentesTransito`),
  KEY `Id_UnidadAT` (`Id_UnidadAT`),
  CONSTRAINT `accidentestransito_ibfk_1` FOREIGN KEY (`Id_UnidadAT`) REFERENCES `unidadservicio` (`IdUnidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accidentestransito`
--

LOCK TABLES `accidentestransito` WRITE;
/*!40000 ALTER TABLE `accidentestransito` DISABLE KEYS */;
/*!40000 ALTER TABLE `accidentestransito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ambulancias`
--

DROP TABLE IF EXISTS `ambulancias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ambulancias` (
  `IdAmbulancia` int NOT NULL AUTO_INCREMENT,
  `Marca` varchar(50) DEFAULT NULL,
  `Modelo` varchar(50) DEFAULT NULL,
  `Placa` varchar(50) DEFAULT NULL,
  `TipoAmbulancia` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`IdAmbulancia`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ambulancias`
--

LOCK TABLES `ambulancias` WRITE;
/*!40000 ALTER TABLE `ambulancias` DISABLE KEYS */;
/*!40000 ALTER TABLE `ambulancias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ataques`
--

DROP TABLE IF EXISTS `ataques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ataques` (
  `IdAtaques` int NOT NULL AUTO_INCREMENT,
  `TipoAtaque` varchar(150) DEFAULT NULL,
  `FechaAtaque` datetime DEFAULT NULL,
  `LugarAtaque` varchar(250) DEFAULT NULL,
  `DescripcionAtaque` text,
  `Id_UnidadAtaque` int DEFAULT NULL,
  PRIMARY KEY (`IdAtaques`),
  KEY `Id_UnidadAtaque` (`Id_UnidadAtaque`),
  CONSTRAINT `ataques_ibfk_1` FOREIGN KEY (`Id_UnidadAtaque`) REFERENCES `unidadservicio` (`IdUnidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ataques`
--

LOCK TABLES `ataques` WRITE;
/*!40000 ALTER TABLE `ataques` DISABLE KEYS */;
/*!40000 ALTER TABLE `ataques` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bombero`
--

DROP TABLE IF EXISTS `bombero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bombero` (
  `IdBombero` int NOT NULL AUTO_INCREMENT,
  `Nombres` varchar(100) DEFAULT NULL,
  `Apellidos` varchar(100) DEFAULT NULL,
  `Telefono` varchar(50) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `sexo` varchar(50) DEFAULT NULL,
  `FechaNacimiento` date DEFAULT NULL,
  `DPI` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdBombero`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bombero`
--

LOCK TABLES `bombero` WRITE;
/*!40000 ALTER TABLE `bombero` DISABLE KEYS */;
INSERT INTO `bombero` VALUES (1,'bomberoprueba','rojo','41665656','mazate','Masculino','1990-10-15','55435135513');
/*!40000 ALTER TABLE `bombero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fugas`
--

DROP TABLE IF EXISTS `fugas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fugas` (
  `IdFugas` int NOT NULL AUTO_INCREMENT,
  `TipoFuga` varchar(150) DEFAULT NULL,
  `FechaFuga` datetime DEFAULT NULL,
  `LugarFuga` varchar(250) DEFAULT NULL,
  `PropietarioFuga` varchar(150) DEFAULT NULL,
  `DescripcionFuga` text,
  `Id_UnidadFuga` int DEFAULT NULL,
  PRIMARY KEY (`IdFugas`),
  KEY `Id_UnidadFuga` (`Id_UnidadFuga`),
  CONSTRAINT `fugas_ibfk_1` FOREIGN KEY (`Id_UnidadFuga`) REFERENCES `unidadservicio` (`IdUnidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fugas`
--

LOCK TABLES `fugas` WRITE;
/*!40000 ALTER TABLE `fugas` DISABLE KEYS */;
/*!40000 ALTER TABLE `fugas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospitalarios`
--

DROP TABLE IF EXISTS `hospitalarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospitalarios` (
  `IdHospitalarios` int NOT NULL AUTO_INCREMENT,
  `TipoHospitalario` varchar(150) DEFAULT NULL,
  `FechaHospitalario` datetime DEFAULT NULL,
  `LugarHospitalario` varchar(250) DEFAULT NULL,
  `DescripcionHospitalario` text,
  `Id_UnidadHospitalario` int DEFAULT NULL,
  PRIMARY KEY (`IdHospitalarios`),
  KEY `Id_UnidadHospitalario` (`Id_UnidadHospitalario`),
  CONSTRAINT `hospitalarios_ibfk_1` FOREIGN KEY (`Id_UnidadHospitalario`) REFERENCES `unidadservicio` (`IdUnidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospitalarios`
--

LOCK TABLES `hospitalarios` WRITE;
/*!40000 ALTER TABLE `hospitalarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `hospitalarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `incendios`
--

DROP TABLE IF EXISTS `incendios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `incendios` (
  `IdIncendios` int NOT NULL AUTO_INCREMENT,
  `TipoIncendio` varchar(150) DEFAULT NULL,
  `FechaIncendio` datetime DEFAULT NULL,
  `LugarIncendio` varchar(250) DEFAULT NULL,
  `PropietarioIncendio` varchar(150) DEFAULT NULL,
  `DescripcionIncendio` text,
  `Id_UnidadIncendio` int DEFAULT NULL,
  PRIMARY KEY (`IdIncendios`),
  KEY `Id_UnidadIncendio` (`Id_UnidadIncendio`),
  CONSTRAINT `incendios_ibfk_1` FOREIGN KEY (`Id_UnidadIncendio`) REFERENCES `unidadservicio` (`IdUnidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incendios`
--

LOCK TABLES `incendios` WRITE;
/*!40000 ALTER TABLE `incendios` DISABLE KEYS */;
/*!40000 ALTER TABLE `incendios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `IdPersona` int NOT NULL AUTO_INCREMENT,
  `NombrePersona` varchar(250) DEFAULT NULL,
  `EdadPersona` varchar(50) DEFAULT NULL,
  `sexo` varchar(50) DEFAULT NULL,
  `EstadoPersona` varchar(50) DEFAULT NULL,
  `Armas` varchar(50) DEFAULT NULL,
  `TipoPasajero` varchar(100) DEFAULT NULL,
  `Id_Accidentes` int DEFAULT NULL,
  `Id_AccidentesTransito` int DEFAULT NULL,
  `Id_Ataques` int DEFAULT NULL,
  `Id_Fugas` int DEFAULT NULL,
  `Id_Hospitalarios` int DEFAULT NULL,
  `Id_Incendios` int DEFAULT NULL,
  `Id_RR` int DEFAULT NULL,
  `Id_Viviendas` int DEFAULT NULL,
  `Id_Transportes` int DEFAULT NULL,
  PRIMARY KEY (`IdPersona`),
  KEY `Id_AccidentesTransito` (`Id_AccidentesTransito`),
  KEY `Id_Accidentes` (`Id_Accidentes`),
  KEY `Id_Ataques` (`Id_Ataques`),
  KEY `Id_Fugas` (`Id_Fugas`),
  KEY `Id_Hospitalarios` (`Id_Hospitalarios`),
  KEY `Id_Incendios` (`Id_Incendios`),
  KEY `Id_RR` (`Id_RR`),
  KEY `Id_Viviendas` (`Id_Viviendas`),
  KEY `persona_ibfk_10` (`Id_Transportes`),
  CONSTRAINT `persona_ibfk_1` FOREIGN KEY (`Id_AccidentesTransito`) REFERENCES `accidentestransito` (`IdAccidentesTransito`),
  CONSTRAINT `persona_ibfk_10` FOREIGN KEY (`Id_Transportes`) REFERENCES `transportes` (`IdTransportes`),
  CONSTRAINT `persona_ibfk_2` FOREIGN KEY (`Id_Accidentes`) REFERENCES `accidentes` (`IdAccidentes`),
  CONSTRAINT `persona_ibfk_3` FOREIGN KEY (`Id_Ataques`) REFERENCES `ataques` (`IdAtaques`),
  CONSTRAINT `persona_ibfk_4` FOREIGN KEY (`Id_Fugas`) REFERENCES `fugas` (`IdFugas`),
  CONSTRAINT `persona_ibfk_5` FOREIGN KEY (`Id_Hospitalarios`) REFERENCES `hospitalarios` (`IdHospitalarios`),
  CONSTRAINT `persona_ibfk_6` FOREIGN KEY (`Id_Incendios`) REFERENCES `incendios` (`IdIncendios`),
  CONSTRAINT `persona_ibfk_8` FOREIGN KEY (`Id_RR`) REFERENCES `rastreosyrescates` (`IdRR`),
  CONSTRAINT `persona_ibfk_9` FOREIGN KEY (`Id_Viviendas`) REFERENCES `viviendas` (`IdViviendas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rastreosyrescates`
--

DROP TABLE IF EXISTS `rastreosyrescates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rastreosyrescates` (
  `IdRR` int NOT NULL AUTO_INCREMENT,
  `TipoRR` varchar(150) DEFAULT NULL,
  `FechaRR` datetime DEFAULT NULL,
  `LugarRR` varchar(250) DEFAULT NULL,
  `DescripcionRR` text,
  `Id_UnidadRR` int DEFAULT NULL,
  PRIMARY KEY (`IdRR`),
  KEY `Id_UnidadRR` (`Id_UnidadRR`),
  CONSTRAINT `rastreosyrescates_ibfk_1` FOREIGN KEY (`Id_UnidadRR`) REFERENCES `unidadservicio` (`IdUnidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rastreosyrescates`
--

LOCK TABLES `rastreosyrescates` WRITE;
/*!40000 ALTER TABLE `rastreosyrescates` DISABLE KEYS */;
/*!40000 ALTER TABLE `rastreosyrescates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `IdRol` int NOT NULL AUTO_INCREMENT,
  `TipoRol` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdRol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Premium'),(2,'Normal');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicios` (
  `IdServicios` int NOT NULL AUTO_INCREMENT,
  `TipoServicio` varchar(150) DEFAULT NULL,
  `FechaServicio` datetime DEFAULT NULL,
  `LugarServicio` varchar(250) DEFAULT NULL,
  `Solicitante` varchar(150) DEFAULT NULL,
  `DescripcionServicio` text,
  `Id_UnidadServicio` int DEFAULT NULL,
  PRIMARY KEY (`IdServicios`),
  KEY `Id_UnidadServicio` (`Id_UnidadServicio`),
  CONSTRAINT `servicios_ibfk_1` FOREIGN KEY (`Id_UnidadServicio`) REFERENCES `unidadservicio` (`IdUnidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('2FTcSmrz-R54wexRJHsQg5LgayMtg1AP',1666983222,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),('5i91kk05pmm2QI-Xh-WSCUuU90YqkNU-',1666982882,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":1}}'),('9MTCWMG_Q18xCQn2N_-emAoOGoV-BJY8',1666983156,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"success\":[\"Bienvenido admin\"]}}'),('hmdP2mwHw-ncZF96rI3bbdhGn5KUhWPt',1666983011,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":4}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transportes`
--

DROP TABLE IF EXISTS `transportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transportes` (
  `IdTransportes` int NOT NULL AUTO_INCREMENT,
  `TipoTransporte` varchar(100) DEFAULT NULL,
  `MarcaTransporte` varchar(100) DEFAULT NULL,
  `PlacaTransporte` varchar(100) DEFAULT NULL,
  `Id_AccidentesTransito` int DEFAULT NULL,
  PRIMARY KEY (`IdTransportes`),
  KEY `Id_AccidentesTransito` (`Id_AccidentesTransito`),
  CONSTRAINT `transportes_ibfk_1` FOREIGN KEY (`Id_AccidentesTransito`) REFERENCES `accidentestransito` (`IdAccidentesTransito`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transportes`
--

LOCK TABLES `transportes` WRITE;
/*!40000 ALTER TABLE `transportes` DISABLE KEYS */;
/*!40000 ALTER TABLE `transportes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidadservicio`
--

DROP TABLE IF EXISTS `unidadservicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidadservicio` (
  `IdUnidad` int NOT NULL AUTO_INCREMENT,
  `Id_Bombero` int DEFAULT NULL,
  `Id_Ambulancia` int DEFAULT NULL,
  PRIMARY KEY (`IdUnidad`),
  KEY `fk_bombero` (`Id_Bombero`),
  KEY `fk_ambulancia` (`Id_Ambulancia`),
  CONSTRAINT `fk_ambulancia` FOREIGN KEY (`Id_Ambulancia`) REFERENCES `ambulancias` (`IdAmbulancia`),
  CONSTRAINT `fk_bombero` FOREIGN KEY (`Id_Bombero`) REFERENCES `bombero` (`IdBombero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidadservicio`
--

LOCK TABLES `unidadservicio` WRITE;
/*!40000 ALTER TABLE `unidadservicio` DISABLE KEYS */;
/*!40000 ALTER TABLE `unidadservicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `IdUsuario` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `Id_Bombero` int DEFAULT NULL,
  `Id_Rol` int DEFAULT NULL,
  PRIMARY KEY (`IdUsuario`),
  KEY `fk_roluser_idx` (`Id_Rol`),
  KEY `fk:bomuser_idx` (`Id_Bombero`),
  CONSTRAINT `fk_bomuser` FOREIGN KEY (`Id_Bombero`) REFERENCES `bombero` (`IdBombero`),
  CONSTRAINT `fk_roluser` FOREIGN KEY (`Id_Rol`) REFERENCES `rol` (`IdRol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','123',1,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viviendas`
--

DROP TABLE IF EXISTS `viviendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viviendas` (
  `IdViviendas` int NOT NULL AUTO_INCREMENT,
  `TipoVivienda` varchar(150) DEFAULT NULL,
  `FechaVivienda` datetime DEFAULT NULL,
  `LugarVivienda` varchar(250) DEFAULT NULL,
  `PropietarioVivienda` varchar(150) DEFAULT NULL,
  `DescripcionVivienda` text,
  `Id_UnidadVivienda` int DEFAULT NULL,
  PRIMARY KEY (`IdViviendas`),
  KEY `Id_UnidadVivienda` (`Id_UnidadVivienda`),
  CONSTRAINT `viviendas_ibfk_1` FOREIGN KEY (`Id_UnidadVivienda`) REFERENCES `unidadservicio` (`IdUnidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viviendas`
--

LOCK TABLES `viviendas` WRITE;
/*!40000 ALTER TABLE `viviendas` DISABLE KEYS */;
/*!40000 ALTER TABLE `viviendas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-27 12:54:23
