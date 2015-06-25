# MySQL-Front 5.0  (Build 1.0)

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE */;
/*!40101 SET SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES */;
/*!40103 SET SQL_NOTES='ON' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;


# Host: 192.168.1.10    Database: _dalcatech
# ------------------------------------------------------
# Server version 5.5.25a

#
# Table structure for table sonacl_roles
#

DROP TABLE IF EXISTS `sonacl_roles`;
CREATE TABLE `sonacl_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `nome` varchar(45) NOT NULL,
  `is_admin` tinyint(1) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sonacl_roles_sonacl_roles` (`parent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
INSERT INTO `sonacl_roles` VALUES (1,NULL,'Financeiro',NULL,'2015-06-23 22:41:22','2015-06-23 22:41:22');
INSERT INTO `sonacl_roles` VALUES (2,NULL,'Expedição',NULL,'2015-06-23 22:41:22','2015-06-23 22:41:22');
INSERT INTO `sonacl_roles` VALUES (3,NULL,'Start Line',NULL,'2015-06-23 22:41:22','2015-06-23 22:41:22');
INSERT INTO `sonacl_roles` VALUES (4,NULL,'Vendedor',NULL,'2015-06-23 22:41:22','2015-06-23 22:41:22');
INSERT INTO `sonacl_roles` VALUES (5,NULL,'Produção',NULL,'2015-06-23 22:41:22','2015-06-23 22:41:22');
INSERT INTO `sonacl_roles` VALUES (6,NULL,'Admin',1,'2015-06-23 22:41:22','2015-06-23 22:41:22');
/*!40000 ALTER TABLE `sonacl_roles` ENABLE KEYS */;
UNLOCK TABLES;

#
#  Foreign keys for table sonacl_roles
#

ALTER TABLE `sonacl_roles`
ADD CONSTRAINT `sonacl_roles_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `sonacl_roles` (`id`);


/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
