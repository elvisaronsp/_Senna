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
# Table structure for table sn_acessos
#

DROP TABLE IF EXISTS `sn_acessos`;
CREATE TABLE `sn_acessos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
INSERT INTO `sn_acessos` VALUES (1,'Exibir','2015-06-23 22:41:22','2015-06-23 22:41:22');
INSERT INTO `sn_acessos` VALUES (2,'Editar','2015-06-23 22:41:22','2015-06-23 22:41:22');
INSERT INTO `sn_acessos` VALUES (3,'Excluir','2015-06-23 22:41:22','2015-06-23 22:41:22');
/*!40000 ALTER TABLE `sn_acessos` ENABLE KEYS */;
UNLOCK TABLES;

#
# Table structure for table sn_usuario
#

DROP TABLE IF EXISTS `sn_usuario`;
CREATE TABLE `sn_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `sobrenome` varchar(255) DEFAULT NULL,
  `login` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `salt` varchar(255) NOT NULL,
  `ativo` tinyint(1) DEFAULT NULL,
  `chave_ativacao` varchar(255) DEFAULT NULL,
  `atualizacao` datetime DEFAULT NULL,
  `criado` datetime DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL COMMENT 'Perfil de acesso do usuario cadastrado',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
INSERT INTO `sn_usuario` VALUES (11,'admin',NULL,NULL,'admin@admin.com','tEI/kYny','HeHRWyxg/YI=',1,'919946c809542670be1390b309f6bb66','2015-06-24 19:30:14','2015-06-24 19:30:14',6);
INSERT INTO `sn_usuario` VALUES (13,'jefferson',NULL,NULL,'jefferson.fernandes@outlook.com','+Yxv6zxf','947JBRO8Z6o=',1,'acbcb11462a7d0ce7bb9841fc03aa379','2015-06-24 20:12:26','2015-06-24 20:12:26',2);
INSERT INTO `sn_usuario` VALUES (14,'a',NULL,NULL,'jotainsanny@gmail.com','/g==','Q1bQA3AOG90=',1,'f5efc0e8549ec4b0cbae8dace1f98577','2015-06-24 23:17:15','2015-06-24 23:17:15',1);
/*!40000 ALTER TABLE `sn_usuario` ENABLE KEYS */;
UNLOCK TABLES;

#
# Table structure for table sonacl_privileges
#

DROP TABLE IF EXISTS `sonacl_privileges`;
CREATE TABLE `sonacl_privileges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `resource_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `acessos_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sonacl_privileges_sonacl_roles1` (`role_id`),
  KEY `fk_sonacl_privileges_sonacl_resources1` (`resource_id`),
  KEY `acessos_id` (`acessos_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
INSERT INTO `sonacl_privileges` VALUES (4,1,2,'2015-06-24 19:49:43','2015-06-24 19:49:43',1);
INSERT INTO `sonacl_privileges` VALUES (5,1,2,'2015-06-24 19:49:56','2015-06-24 19:49:56',2);
INSERT INTO `sonacl_privileges` VALUES (6,1,2,'2015-06-24 19:50:30','2015-06-24 19:50:30',3);
/*!40000 ALTER TABLE `sonacl_privileges` ENABLE KEYS */;
UNLOCK TABLES;

#
# Table structure for table sonacl_resources
#

DROP TABLE IF EXISTS `sonacl_resources`;
CREATE TABLE `sonacl_resources` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
INSERT INTO `sonacl_resources` VALUES (1,'Cadastros','2015-06-23 22:41:22','2015-06-23 22:41:22');
INSERT INTO `sonacl_resources` VALUES (2,'Cadastro Usuario','2015-06-24 19:38:07','2015-06-24 19:38:07');
/*!40000 ALTER TABLE `sonacl_resources` ENABLE KEYS */;
UNLOCK TABLES;

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
# Table structure for table sonuser_users
#

DROP TABLE IF EXISTS `sonuser_users`;
CREATE TABLE `sonuser_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `activation_key` varchar(255) NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40000 ALTER TABLE `sonuser_users` ENABLE KEYS */;
UNLOCK TABLES;

#
#  Foreign keys for table sonacl_privileges
#

ALTER TABLE `sonacl_privileges`
ADD CONSTRAINT `fk_sonacl_privileges_sonacl_resources1` FOREIGN KEY (`resource_id`) REFERENCES `sonacl_resources` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_sonacl_privileges_sonacl_roles1` FOREIGN KEY (`role_id`) REFERENCES `sonacl_roles` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `sonacl_privileges_ibfk_1` FOREIGN KEY (`acessos_id`) REFERENCES `sn_acessos` (`Id`);

#
#  Foreign keys for table sonacl_roles
#

ALTER TABLE `sonacl_roles`
ADD CONSTRAINT `sonacl_roles_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `sonacl_roles` (`id`);


/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
