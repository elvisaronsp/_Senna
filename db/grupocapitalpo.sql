# Host: mysql.grupocapitalponto.com.br  (Version: 5.5.43-log)
# Date: 2015-08-19 00:21:53
# Generator: MySQL-Front 5.3  (Build 4.224)

/*!40101 SET NAMES latin1 */;

#
# Structure for table "classesprodutos"
#

DROP TABLE IF EXISTS `classesprodutos`;
CREATE TABLE `classesprodutos` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_2` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

#
# Data for table "classesprodutos"
#

INSERT INTO `classesprodutos` VALUES (1,'CRACHA'),(4,'CORDÕES'),(6,'ACABAMENTO');

#
# Structure for table "dashboard"
#

DROP TABLE IF EXISTS `dashboard`;
CREATE TABLE `dashboard` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario_FK` int(11) DEFAULT NULL,
  `posicao` int(11) DEFAULT NULL,
  `modulo` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Data for table "dashboard"
#


#
# Structure for table "empresa"
#

DROP TABLE IF EXISTS `empresa`;
CREATE TABLE `empresa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `NomeFantasia` varchar(150) DEFAULT '0',
  `NomeResponsavel` varchar(50) DEFAULT NULL,
  `TelefoneResidencial` varchar(30) DEFAULT NULL,
  `TelefoneComercial` varchar(20) DEFAULT NULL,
  `TelefoneCelular` varchar(20) DEFAULT NULL,
  `Endereco` varchar(255) DEFAULT NULL,
  `Bairro` varchar(100) DEFAULT NULL,
  `Email` varchar(200) DEFAULT NULL,
  `Cep` varchar(12) DEFAULT NULL,
  `Cnpj` varchar(50) DEFAULT NULL,
  `Cpf` varchar(15) DEFAULT NULL,
  `Atendimento` varchar(200) DEFAULT '0',
  `RazaoSocial` varchar(150) DEFAULT '0',
  `InscricaoEstadual` varchar(50) DEFAULT NULL,
  `InscricaoMunicipal` varchar(50) DEFAULT NULL,
  `Site` varchar(50) DEFAULT NULL,
  `skype` varchar(50) DEFAULT NULL,
  `Observacao` varchar(255) DEFAULT NULL,
  `Uf` char(2) DEFAULT 'PR',
  `DataCadastro` date DEFAULT '0000-00-00',
  `Atividade` varchar(150) DEFAULT NULL,
  `Cidade` varchar(150) DEFAULT NULL,
  `numeroempresa` int(5) DEFAULT '1',
  `diretorio` varchar(255) DEFAULT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `Qtde_Micro_Terminais` int(5) DEFAULT '10',
  `Qtde_Pc` int(5) DEFAULT '10',
  `QtdeAtualTerminais` tinyint(3) DEFAULT '0',
  `MensagemPromocional` varchar(255) DEFAULT NULL,
  `codigomunicipio` varchar(7) DEFAULT NULL,
  `Md5` varchar(100) DEFAULT 'FB0056A08A508B573AC30ABDEA0730BF',
  `numerolaudo` varchar(50) DEFAULT NULL,
  `md5_bloco7` varchar(32) DEFAULT NULL,
  `inscricaoestadualsubst` varchar(100) DEFAULT NULL,
  `CNAE` varchar(100) DEFAULT NULL,
  `Crt` varchar(255) DEFAULT NULL,
  `MultiLoja` tinyint(2) DEFAULT '0',
  `NomeGrupoMultiLoja` varchar(255) DEFAULT NULL,
  `UltimaExportacao` date DEFAULT '2000-01-01',
  `UltimaImportacao` date DEFAULT '2000-01-01',
  `NomeBDDataCenter` varchar(100) DEFAULT '',
  `LoginBDDataCenter` varchar(100) DEFAULT '',
  `replicadoOnline` tinyint(1) DEFAULT '0',
  `versaoServidor` varchar(10) DEFAULT '',
  `versaoAndroid` varchar(10) DEFAULT '',
  `UltimaVerificacaoAtualizacao` date DEFAULT '2012-12-04',
  `Qtde_Mobile` int(11) DEFAULT '0',
  `Qtde_Caixa` int(11) DEFAULT '0',
  `Modulos` int(11) DEFAULT '0',
  `QTde_MultiLoja` int(11) DEFAULT '0',
  `contribuinteIpi` char(1) DEFAULT '0',
  `contribuinteISS` char(1) DEFAULT '0',
  `ReceitaBruta12meses` varchar(255) DEFAULT 'Ate 180.000,00',
  `AliquotaSimplesNacional` double(4,2) DEFAULT '4.00',
  `irpj` double(4,2) DEFAULT '0.00',
  `csll` double(4,2) DEFAULT '0.00',
  `cofins` double(4,2) DEFAULT '0.00',
  `pis` double(4,2) DEFAULT '0.00',
  `cpp` double(4,2) DEFAULT '2.75',
  `icms` double(4,2) DEFAULT '1.25',
  `iss` double(4,2) DEFAULT '0.00',
  `ipi` double(4,2) DEFAULT '0.00',
  `percentualReducaoPGDAS` double(4,2) DEFAULT '0.00',
  `irpjISS` double(4,2) DEFAULT '0.00',
  `csllISS` double(4,2) DEFAULT '0.00',
  `cofinsISS` double(4,2) DEFAULT '0.00',
  `pisISS` double(4,2) DEFAULT '0.00',
  `cppISS` double(4,2) DEFAULT '0.00',
  `LotacaoMaxima` varchar(20) DEFAULT '1000',
  `emailSms` varchar(200) DEFAULT NULL,
  `senhaSms` varchar(25) DEFAULT NULL,
  `celularSms` varchar(20) DEFAULT NULL,
  `nickNameWhastApp` varchar(100) DEFAULT NULL,
  `numeroWhatsApp` varchar(20) DEFAULT NULL,
  `emei` varchar(50) DEFAULT NULL,
  `senhaWhatsApp` varchar(100) DEFAULT NULL,
  `idWhatsApp` varchar(100) DEFAULT NULL,
  `HardRock_StoreNumber` varchar(10) DEFAULT NULL,
  `qtde_usuarios` int(11) DEFAULT '0',
  `tipo` char(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

#
# Data for table "empresa"
#

INSERT INTO `empresa` VALUES (1,'CAPITAL PONTO','Aline Bairro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'10.334.832/0001-06',NULL,'0','0',NULL,NULL,NULL,NULL,NULL,'PR','0000-00-00',NULL,NULL,1,NULL,NULL,NULL,10,10,0,NULL,NULL,'FB0056A08A508B573AC30ABDEA0730BF',NULL,NULL,NULL,NULL,NULL,0,NULL,'2000-01-01','2000-01-01','','',0,'','','2012-12-04',0,0,0,0,'0','0','Ate 180.000,00',4.00,0.00,0.00,0.00,0.00,2.75,1.25,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'1000',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'1'),(2,'RIO GRACHAS','Aline Bairro','','','','','','','','10.334.832/0001-06','','0','0','','','','','','PR','0000-00-00','','',1,'','','',10,10,0,'','','FB0056A08A508B573AC30ABDEA0730BF','','','','','',0,'','2000-01-01','2000-01-01','','',0,'','','2012-12-04',0,0,0,0,'0','0','Ate 180.000,00',4.00,0.00,0.00,0.00,0.00,2.75,1.25,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'1000','','','','','','','','','',0,'1');

#
# Structure for table "estoques"
#

DROP TABLE IF EXISTS `estoques`;
CREATE TABLE `estoques` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `observacao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nomeINDEX` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

#
# Data for table "estoques"
#

INSERT INTO `estoques` VALUES (1,'CAPITAL PONTO ',NULL);

#
# Structure for table "fornecedores"
#

DROP TABLE IF EXISTS `fornecedores`;
CREATE TABLE `fornecedores` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `NomeFantasia` varchar(100) DEFAULT NULL,
  `NomeResponsavel` varchar(100) DEFAULT NULL,
  `TelefoneResidencial` varchar(15) DEFAULT NULL,
  `TelefoneComercial` varchar(15) DEFAULT NULL,
  `Celular` varchar(15) DEFAULT NULL,
  `Endereco` varchar(100) DEFAULT NULL,
  `Cidade` varchar(50) DEFAULT NULL,
  `Bairro` varchar(50) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `CEP` varchar(15) DEFAULT NULL,
  `CNPJ` varchar(50) DEFAULT NULL,
  `CPF` varchar(50) DEFAULT NULL,
  `Atendimento` tinyint(2) unsigned DEFAULT '0',
  `RazaoSocial` varchar(100) DEFAULT NULL,
  `InscricaoEstadual` varchar(20) DEFAULT NULL,
  `InscricaoMunicipal` varchar(20) DEFAULT NULL,
  `paginaweb` varchar(50) DEFAULT NULL,
  `msn` varchar(50) DEFAULT NULL,
  `Observacoes` varchar(255) DEFAULT NULL,
  `UF` char(3) DEFAULT NULL,
  `DataCadastro` date DEFAULT NULL,
  `DataAniversario` date DEFAULT NULL,
  `NomeTerceiro` varchar(50) DEFAULT NULL,
  `Atividade` varchar(20) DEFAULT NULL,
  `Telefoneterceiro` varchar(15) DEFAULT NULL,
  `QuantidadeMinima` int(6) DEFAULT '0',
  `PrazoEntrega` int(5) DEFAULT '0',
  `Cargo` varchar(200) DEFAULT NULL,
  `Tipo` tinyint(2) DEFAULT '1',
  `PlacaVeiculo` varchar(10) DEFAULT NULL,
  `RntcVeiculo` varchar(100) DEFAULT NULL,
  `UfVeiculo` varchar(2) DEFAULT NULL,
  `PlacaReboque` varchar(10) DEFAULT NULL,
  `RntcReboque` varchar(100) DEFAULT NULL,
  `UfReboque` varchar(2) DEFAULT NULL,
  `NumeroEndereco` varchar(20) DEFAULT '',
  `Complemento` varchar(50) DEFAULT '',
  `classificacao` tinyint(1) DEFAULT '1',
  `TipoPessoa` tinyint(1) DEFAULT '0',
  `Banco` varchar(50) DEFAULT NULL,
  `Agencia` varchar(50) DEFAULT NULL,
  `Conta` varchar(50) DEFAULT NULL,
  `CondicoesPagamento` varchar(255) DEFAULT NULL,
  `LimiteCredito` float(10,3) DEFAULT '0.000',
  `SituacaoFiscal` varchar(150) DEFAULT 'Simples Nacional',
  `replicadoOnline` tinyint(1) DEFAULT '0',
  `NomeContato` varchar(100) DEFAULT NULL,
  `telefoneContato` varchar(15) DEFAULT NULL,
  `funcaoContato` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id` (`Id`),
  KEY `Id_2` (`Id`),
  KEY `NomeFantasia` (`NomeFantasia`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Data for table "fornecedores"
#


#
# Structure for table "itensvenda"
#

DROP TABLE IF EXISTS `itensvenda`;
CREATE TABLE `itensvenda` (
  `id` bigint(15) unsigned NOT NULL AUTO_INCREMENT,
  `itemVendaGrade_id` int(11) DEFAULT '0',
  `idGrade` varchar(6) DEFAULT NULL,
  `codigoLancamento` bigint(15) DEFAULT '0',
  `codigoBarras` varchar(30) DEFAULT NULL,
  `tipoItemVenda` char(1) DEFAULT '1' COMMENT 'N-normal, 2- G',
  `tipoItemSped` char(2) DEFAULT '00',
  `formaVenda` char(1) DEFAULT '1' COMMENT '1-Unitario, 2-pesado, 3-fracionado, 4-tipoPizza',
  `descricao` varchar(255) DEFAULT NULL,
  `descricaoCompleta` varchar(255) DEFAULT NULL,
  `IdClassesProdutos_FK` int(11) DEFAULT '0',
  `IdSubClassesProdutos_FK` int(11) DEFAULT '0',
  `idClassesProdutosTouch_FK` int(11) DEFAULT '0',
  `ativo` char(1) DEFAULT '1',
  `unidadeVenda` varchar(4) DEFAULT 'UN',
  `nomeUnidadeVenda` varchar(255) DEFAULT NULL,
  `unidadeCompra` varchar(4) DEFAULT 'UN',
  `nomeUnidadeCompra` varchar(255) DEFAULT NULL,
  `fatorConversao` double(10,4) DEFAULT '1.0000',
  `observacao` varchar(255) DEFAULT NULL,
  `naoPedirQuantidade` char(1) DEFAULT '0',
  `valorVenda` double(10,2) DEFAULT '0.00',
  `precoMedioCompra` double(10,4) DEFAULT '0.0000',
  `precoUltimaCompra` double(10,4) DEFAULT '0.0000',
  `PrecoPadraoCompra` double(10,2) DEFAULT '0.00',
  `custoMedioCompra` double(10,2) DEFAULT '0.00',
  `custoUltimaCompra` double(10,2) DEFAULT '0.00',
  `percentualDepreciacao` double(10,2) DEFAULT '0.00',
  `depreciacaoAcumulada` double(10,2) DEFAULT '0.00',
  `vendeDelivery` char(1) DEFAULT '1',
  `vendeTouchScreen` char(1) DEFAULT '1',
  `favoritos` char(1) DEFAULT '0',
  `naoCobraServico` char(1) DEFAULT '0',
  `permitirDesconto` char(1) DEFAULT '1',
  `temObservacao` char(1) DEFAULT '0',
  `codigoCentroResultado_FK` int(11) DEFAULT '1',
  `temBaixaEspecial` char(1) DEFAULT '0',
  `codigoBarrasVariavel` char(1) DEFAULT '0',
  `lancaNaAbertura` char(1) DEFAULT '0',
  `preparo` varchar(255) DEFAULT NULL,
  `tempoEstimado` double(5,2) DEFAULT '0.00',
  `tipoAdicional` char(1) DEFAULT '1' COMMENT '0-percentual, 1-Val.Absoluto, 2-consumacao',
  `temFichaTecnica` char(1) DEFAULT '0',
  `cadastroFinalizado` char(1) DEFAULT '0',
  `codigo_bloco_07` bigint(15) DEFAULT '0',
  `md5` varchar(50) DEFAULT NULL,
  `ncm` varchar(10) DEFAULT NULL,
  `idPlanoContasAtivo_FK` int(11) DEFAULT '0',
  `idPlanoContasAtivoDepreciacao_FK` int(11) DEFAULT '0',
  `tipoAtivoImobilizado` char(1) DEFAULT '0' COMMENT '0-Administracao,1-Producao',
  `validadeItem` varchar(5) DEFAULT '0',
  `IcmsOrigem` varchar(5) DEFAULT '0',
  `idOperacaoFiscalEntrada` int(11) DEFAULT '0',
  `idOperacaoFiscalSaida` int(11) DEFAULT '0',
  `replicado` char(1) DEFAULT '0',
  `replicadoOnline` char(1) DEFAULT '0',
  `numeroSerie` varchar(50) DEFAULT NULL,
  `tipoCombo` char(1) DEFAULT '0' COMMENT '0-Nao e Combo, 1-Combo Normal, 2 - Combo Configuravel',
  `lembreteVenda` varchar(255) DEFAULT NULL,
  `peso` double(10,3) DEFAULT '0.000',
  `largura` double(10,3) DEFAULT '0.000',
  `altura` double(10,3) DEFAULT '0.000',
  `comprimento` double(10,3) DEFAULT '0.000',
  `comissao` double(10,2) DEFAULT '0.00',
  `pontos` int(11) DEFAULT '0',
  `garantia` char(1) DEFAULT '0' COMMENT '0 - sem garantia 1- com garantia',
  `fotoPrincipal` varchar(255) DEFAULT NULL,
  `vendidoSeparado` char(1) DEFAULT '1' COMMENT '0- nao pode ser vendido separado , 1- pode ser vendido separado',
  `dataHoraCadastro` datetime DEFAULT '0000-00-00 00:00:00',
  `dataHoraAlteracao` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `TipoItemINDEX` (`tipoItemVenda`),
  KEY `FormaVendaINDEX` (`formaVenda`),
  KEY `DescricaoINDEX` (`descricao`),
  KEY `IdClasseINDEX` (`IdClassesProdutos_FK`),
  KEY `IdClasseTouchINDEX` (`idClassesProdutosTouch_FK`),
  KEY `AtivoINDEX` (`ativo`),
  KEY `NaoPedirQtdeINDEX` (`naoPedirQuantidade`),
  KEY `FavoritosINDEX` (`favoritos`),
  KEY `NaoCobraServicoINDEX` (`naoCobraServico`),
  KEY `LancaNaAberturaINDEX` (`lancaNaAbertura`),
  KEY `TipoAdicionalINDEX` (`tipoAdicional`),
  KEY `vendeTouchINDEX` (`vendeTouchScreen`),
  KEY `descricaoCompletaINDEX` (`descricaoCompleta`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

#
# Data for table "itensvenda"
#

INSERT INTO `itensvenda` VALUES (5,NULL,NULL,2748973914709,'','N','00','1','DADSASA',NULL,1,1000,0,'1','UN','UNIDUNIDADE','CX','CAIXA',1.0000,'','0',0.01,0.0000,0.0000,0.00,0.00,0.00,0.00,0.00,'1','1','0','0','1','0',1,'0','0','0',NULL,0.00,'1','0','0',0,NULL,NULL,0,0,'0','0','0',0,0,'0','0',NULL,'0',NULL,0.000,0.000,0.000,0.000,0.00,0,'0','','1',NULL,NULL);

#
# Structure for table "itensvendaatributos"
#

DROP TABLE IF EXISTS `itensvendaatributos`;
CREATE TABLE `itensvendaatributos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `itensvenda_id` bigint(15) unsigned DEFAULT '0',
  `nomeAtributo` varchar(255) DEFAULT NULL,
  `valorAtributo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `CodigoItemVenda_FK` (`itensvenda_id`),
  CONSTRAINT `itensvendaatributos_ibfk_1` FOREIGN KEY (`itensvenda_id`) REFERENCES `itensvenda` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

#
# Data for table "itensvendaatributos"
#

INSERT INTO `itensvendaatributos` VALUES (5,5,'','');

#
# Structure for table "itensvendacomposicao"
#

DROP TABLE IF EXISTS `itensvendacomposicao`;
CREATE TABLE `itensvendacomposicao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itensvenda_id` bigint(1) unsigned DEFAULT '0',
  `quantidade` double(10,3) DEFAULT '0.000',
  `itensvenda_id_children` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `itensvenda_id` (`itensvenda_id`),
  CONSTRAINT `itensvendacomposicao_ibfk_1` FOREIGN KEY (`itensvenda_id`) REFERENCES `itensvenda` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Data for table "itensvendacomposicao"
#


#
# Structure for table "itensvendaestoque"
#

DROP TABLE IF EXISTS `itensvendaestoque`;
CREATE TABLE `itensvendaestoque` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itensvenda_id` bigint(15) unsigned DEFAULT '0',
  `estoques_id` int(11) unsigned DEFAULT '0',
  `Quantidade` double(10,3) DEFAULT '0.000',
  `EstoqueMinimo` double(10,3) DEFAULT '0.000',
  `EstoqueMaximo` double(10,3) DEFAULT '0.000',
  `empresa_id` tinyint(3) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `CodigoItemVenda_FK` (`itensvenda_id`),
  KEY `CodigoEstoque_FK` (`estoques_id`),
  CONSTRAINT `itensvendaestoque_ibfk_1` FOREIGN KEY (`itensvenda_id`) REFERENCES `itensvenda` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

#
# Data for table "itensvendaestoque"
#

INSERT INTO `itensvendaestoque` VALUES (5,5,1,0.000,0.000,0.000,1);

#
# Structure for table "log"
#

DROP TABLE IF EXISTS `log`;
CREATE TABLE `log` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `local` varchar(255) DEFAULT NULL,
  `nomeUsuario` varchar(20) DEFAULT NULL,
  `mensagem` varchar(255) DEFAULT NULL,
  `tipo` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "log"
#


#
# Structure for table "modalidadegrades"
#

DROP TABLE IF EXISTS `modalidadegrades`;
CREATE TABLE `modalidadegrades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `tipo` char(1) DEFAULT 'M',
  `modalidadeGrades_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `modalidadeGrades_id` (`modalidadeGrades_id`),
  CONSTRAINT `modalidadegrades_ibfk_1` FOREIGN KEY (`modalidadeGrades_id`) REFERENCES `modalidadegrades` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

#
# Data for table "modalidadegrades"
#

INSERT INTO `modalidadegrades` VALUES (1,'COR','M',NULL),(2,'VERDE','G',1),(3,'AZUL','G',1),(4,'TAMANHO','M',NULL),(5,'25MM','G',4),(6,'11MM','G',4),(7,'15MM','G',4),(10,'PRETO','G',1);

#
# Structure for table "sn_acessos"
#

DROP TABLE IF EXISTS `sn_acessos`;
CREATE TABLE `sn_acessos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `atualizado_em` datetime NOT NULL,
  `criado_em` datetime NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

#
# Data for table "sn_acessos"
#

INSERT INTO `sn_acessos` VALUES (1,'Visualizar','2015-06-23 22:41:22','2015-06-23 22:41:22'),(2,'Criar','2015-06-23 22:41:22','2015-06-23 22:41:22'),(3,'Editar','2015-06-23 22:41:22','2015-06-23 22:41:22'),(4,'Excluir','2015-06-23 22:41:22','2015-06-23 22:41:22');

#
# Structure for table "sn_perfis"
#

DROP TABLE IF EXISTS `sn_perfis`;
CREATE TABLE `sn_perfis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `nome` varchar(45) NOT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  `criado_em` datetime DEFAULT NULL,
  `atualizado_em` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sonacl_roles_sonacl_roles` (`parent_id`),
  CONSTRAINT `sn_perfis_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `sn_perfis` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=latin1;

#
# Data for table "sn_perfis"
#

INSERT INTO `sn_perfis` VALUES (106,NULL,'ADMINISTRADOR',1,'2015-07-24 23:17:18','2015-07-24 23:17:18'),(107,NULL,'FINANCEIRO',NULL,'2015-08-15 21:18:24','2015-08-15 21:18:24');

#
# Structure for table "sn_recursos"
#

DROP TABLE IF EXISTS `sn_recursos`;
CREATE TABLE `sn_recursos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `criado_em` datetime DEFAULT NULL,
  `atualizado_em` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

#
# Data for table "sn_recursos"
#

INSERT INTO `sn_recursos` VALUES (1,'Acesso ao Senna','2015-06-23 22:41:22','2015-06-23 22:41:22'),(2,'Cadastro de itens de venda','2015-06-24 19:38:07','2015-06-24 19:38:07'),(3,'Usuarios e vendedores','2015-06-24 19:38:07','2015-06-24 19:38:07'),(4,'Gerenciar usuarios','2015-06-24 19:38:07','2015-06-24 19:38:07'),(5,'Perfis de acesso','2015-06-24 19:38:07','2015-06-24 19:38:07');

#
# Structure for table "sn_privilegios"
#

DROP TABLE IF EXISTS `sn_privilegios`;
CREATE TABLE `sn_privilegios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `resource_id` int(11) NOT NULL,
  `criado_em` datetime NOT NULL,
  `atualizado_em` datetime NOT NULL,
  `acessos_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`,`resource_id`,`acessos_id`),
  KEY `resource_id` (`resource_id`),
  KEY `acessos_id` (`acessos_id`),
  CONSTRAINT `sn_privilegios_ibfk_2` FOREIGN KEY (`resource_id`) REFERENCES `sn_recursos` (`id`),
  CONSTRAINT `sn_privilegios_ibfk_6` FOREIGN KEY (`role_id`) REFERENCES `sn_perfis` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sn_privilegios_ibfk_7` FOREIGN KEY (`acessos_id`) REFERENCES `sn_acessos` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

#
# Data for table "sn_privilegios"
#

INSERT INTO `sn_privilegios` VALUES (23,106,1,'2015-07-24 23:17:18','2015-07-24 23:17:18',1),(24,106,2,'2015-07-24 23:17:18','2015-07-24 23:17:18',1),(25,106,3,'2015-07-24 23:17:18','2015-07-24 23:17:18',1),(26,106,4,'2015-07-24 23:17:18','2015-07-24 23:17:18',1),(27,106,5,'2015-07-24 23:17:18','2015-07-24 23:17:18',1),(28,107,1,'2015-08-15 21:18:24','2015-08-15 21:18:24',1);

#
# Structure for table "sn_setores"
#

DROP TABLE IF EXISTS `sn_setores`;
CREATE TABLE `sn_setores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

#
# Data for table "sn_setores"
#

INSERT INTO `sn_setores` VALUES (1,'ADMINISTRATIVO'),(2,'FINANCEIRO'),(3,'PRODUÇÃO'),(4,'VENDAS'),(5,'GERENCIA');

#
# Structure for table "sn_usuarios"
#

DROP TABLE IF EXISTS `sn_usuarios`;
CREATE TABLE `sn_usuarios` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Id do usuario',
  `nome` varchar(255) NOT NULL DEFAULT '',
  `cpf` varchar(14) DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `confirmado` tinyint(1) DEFAULT '0' COMMENT 'verifica se usario confirmou email',
  `sexo` varchar(255) NOT NULL DEFAULT '',
  `login` varchar(50) NOT NULL DEFAULT '',
  `senha` varchar(255) NOT NULL DEFAULT '',
  `prazoRedefinirSenha` datetime DEFAULT '0000-00-00 00:00:00' COMMENT 'Tempo maximo que usuario pode redefinir sua senha depois que solicitou por email',
  `salt` varchar(255) NOT NULL DEFAULT '',
  `saltRedefinicaoSenha` varchar(255) DEFAULT '',
  `chaveAtivacao` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `telefonePrincipal` varchar(14) NOT NULL DEFAULT '',
  `observacoes` mediumtext,
  `rg` varchar(50) DEFAULT NULL,
  `dataNascimento` date DEFAULT NULL,
  `escolaridade` int(11) DEFAULT NULL,
  `comissao` double(10,2) DEFAULT '0.00',
  `dataAdminissao` date DEFAULT NULL,
  `dataDemissao` date DEFAULT NULL,
  `descancoSemanal` varchar(100) DEFAULT NULL,
  `ctps` varchar(100) DEFAULT NULL,
  `descontoMaximo` double(10,2) DEFAULT '0.00',
  `tipoContaBancaria` int(11) DEFAULT '1',
  `agencia` varchar(50) DEFAULT NULL,
  `contaCorrente` varchar(50) DEFAULT NULL,
  `numeroBanco` varchar(50) DEFAULT NULL,
  `liberdadeVenda` int(11) DEFAULT NULL,
  `bloqueioTemporario` datetime DEFAULT NULL,
  `tentativasLogin` int(11) DEFAULT '0',
  `redefinirSenha` tinyint(1) DEFAULT '0',
  `perfil_id` int(11) DEFAULT NULL,
  `setor_id` int(11) DEFAULT NULL,
  `criadoEm` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `atualizadoEm` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `modoFerias` tinyint(4) DEFAULT '0',
  `alertas` tinyint(1) DEFAULT '0',
  `visualizarDashboard` tinyint(1) DEFAULT '0',
  `visualizarTodosFuncionarios` tinyint(3) DEFAULT '0',
  `empresa_id` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=latin1;

#
# Data for table "sn_usuarios"
#

INSERT INTO `sn_usuarios` VALUES (37,'JEFFERSON FERNANDES','',1,1,'M','ADMIN','c/IqP4rAOow=','2015-08-18 19:44:17','sJO8vwA7XmsUVkChEn+q6yCLZ8qdcmziUEGiVwk6/UA=','CRPT9bEdXrwyoow/YdtKuWjP6RxX6u7xcX/RyKNUUKQ=','43a0c062812cb63fbb4cf085a54ea466','jefferson.fernandes@outlook.com','(41)9565-3780','','','2015-07-24',3,0.00,'2015-07-24','2015-07-24','','',0.00,2,'','','',NULL,'2015-08-18 19:44:17',1,0,106,5,'2015-07-24 23:18:49','2015-08-18 19:43:27',0,0,1,0,2),(68,'KAMILA REBECA ALMEIDA LEMOS','076.057.409-05',1,1,'F','KAMILA','3o9ZgFLgzpRjLbHzRPsV1WNUNkSC0Zv7n5Hll/uAHLA3r2q1zOL9oCQIOdTZvkYgCBvU4NM+0ha8Kgqj31jU+28C7MSNPA==','2015-08-18 19:47:10','CIub+5125jK6wXUqcPVmJEnQkCnasDCsn5QjtlUJHmA=','KqYif9hW/dzB33n1MKv9wS/HmWlECjRHDcExoJmexjk=','424b817b3deaa5022977873b26e17fda','kamyllarebeca@gmail.com','(41)9565-3780','TESTE DE OBSERVACAO','77498044','1990-02-02',4,10.00,'2015-05-02',NULL,'2','1234567897',11.00,2,'01254','1021','121212',NULL,'1899-12-30 00:00:00',1,0,107,5,'2015-08-16 20:55:43','2015-08-18 21:12:20',0,0,NULL,NULL,2);

#
# Structure for table "sn_horarios"
#

DROP TABLE IF EXISTS `sn_horarios`;
CREATE TABLE `sn_horarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hora_entrada` varchar(5) DEFAULT NULL,
  `hora_almoco_entrada` varchar(5) DEFAULT NULL,
  `hora_almoco_saida` varchar(5) DEFAULT NULL,
  `hora_saida` varchar(5) DEFAULT NULL,
  `dias_da_semana_1` tinyint(1) DEFAULT '1' COMMENT 'segunda-feira',
  `dias_da_semana_2` tinyint(1) DEFAULT '1' COMMENT 'terca-feira',
  `dias_da_semana_3` tinyint(1) DEFAULT '1' COMMENT 'quarta-feira',
  `dias_da_semana_4` tinyint(1) DEFAULT '1' COMMENT 'quinta-feira',
  `dias_da_semana_5` tinyint(1) DEFAULT '1' COMMENT 'sexta-feira',
  `dias_da_semana_6` tinyint(1) DEFAULT '0' COMMENT 'sabado',
  `dias_da_semana_7` tinyint(1) DEFAULT '0' COMMENT 'domingo',
  `usuarios_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT 'Id do usuario',
  PRIMARY KEY (`id`),
  KEY `sn_usuarios_id` (`usuarios_id`),
  CONSTRAINT `sn_usuarios_id` FOREIGN KEY (`usuarios_id`) REFERENCES `sn_usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=162 DEFAULT CHARSET=latin1;

#
# Data for table "sn_horarios"
#

INSERT INTO `sn_horarios` VALUES (91,'08:00','12:00','13:00','18:00',1,1,1,1,1,1,1,37),(161,'00:00','12:00','13:00','23:59',1,1,1,1,1,1,1,68);

#
# Structure for table "sn_enderecos_usuario"
#

DROP TABLE IF EXISTS `sn_enderecos_usuario`;
CREATE TABLE `sn_enderecos_usuario` (
  `Id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) unsigned NOT NULL DEFAULT '0',
  `cep` varchar(15) DEFAULT NULL,
  `logradouro` varchar(100) DEFAULT NULL,
  `numero` int(11) unsigned DEFAULT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `bairro` varchar(50) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `referencia` varchar(100) DEFAULT NULL,
  `tipo` int(11) unsigned DEFAULT NULL,
  `uf` varchar(2) DEFAULT NULL,
  `principal` tinyint(1) unsigned DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `sn_enderecos_usuario` (`usuario_id`),
  CONSTRAINT `sn_enderecos_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `sn_usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=latin1;

#
# Data for table "sn_enderecos_usuario"
#

INSERT INTO `sn_enderecos_usuario` VALUES (79,68,'81570-390','Rua Salomão Elias Feder',60,'CASA','Uberaba','Curitiba','REST',2,'PR',1);

#
# Structure for table "sn_contatos_usuario"
#

DROP TABLE IF EXISTS `sn_contatos_usuario`;
CREATE TABLE `sn_contatos_usuario` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) unsigned DEFAULT '0' COMMENT 'id do usuario dono dos contatos',
  `tipoCadastro` char(1) DEFAULT NULL,
  `tipoContato` char(1) DEFAULT NULL,
  `contato` varchar(150) DEFAULT NULL,
  `detalhes` varchar(255) DEFAULT NULL,
  `podeExcluir` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `sn_usuario_contatos` (`usuario_id`),
  CONSTRAINT `sn_usuario_contatos` FOREIGN KEY (`usuario_id`) REFERENCES `sn_usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=185 DEFAULT CHARSET=latin1;

#
# Data for table "sn_contatos_usuario"
#

INSERT INTO `sn_contatos_usuario` VALUES (183,68,'0','1','(11)1111-11111','AAAAAAAAAAAAAAAA',0),(184,68,'0','1','(22)2222-22222','BBBBBBBBBBBBBBBB',0);

#
# Structure for table "subclassesprodutos"
#

DROP TABLE IF EXISTS `subclassesprodutos`;
CREATE TABLE `subclassesprodutos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ALTER TABLE subclassesprodutos AUTO_INCREMENT = 1000;',
  `id_produto_categoria` int(11) DEFAULT NULL COMMENT 'deve comecar com 1000 ALTER TABLE subclassesprodutos ;',
  `nome` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1020 DEFAULT CHARSET=latin1;

#
# Data for table "subclassesprodutos"
#

INSERT INTO `subclassesprodutos` VALUES (1000,1,'DIVERSOS'),(1009,6,'CHAPAS'),(1010,6,'MOSQUETES'),(1011,6,'ACESSORIOS'),(1012,6,'TRAVAS'),(1013,6,'ARGOLAS'),(1014,6,'ALCAS'),(1015,6,'FECHES'),(1016,6,'GANCHOS '),(1017,6,'BOLINHAS'),(1018,6,'ROLLERS'),(1019,6,'JACARES');

#
# Structure for table "unidadesmedida"
#

DROP TABLE IF EXISTS `unidadesmedida`;
CREATE TABLE `unidadesmedida` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(40) NOT NULL DEFAULT '',
  `Abreviacao` varchar(8) DEFAULT NULL,
  `Replicado` char(1) DEFAULT '0',
  `fracionado` char(1) DEFAULT '0',
  `padrao` char(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

#
# Data for table "unidadesmedida"
#

INSERT INTO `unidadesmedida` VALUES (11,'ASDSDSDSDS','DS','0','1','1');

#
# Structure for table "usuarios"
#

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Id do usuario',
  `login` varchar(15) NOT NULL DEFAULT '0' COMMENT 'Login de acesso do usuario',
  `senha` varchar(20) DEFAULT '0' COMMENT 'Senha do usuario',
  `nome` varchar(100) DEFAULT '0' COMMENT 'Nome do usuario',
  `dataCadastro` date DEFAULT '0000-00-00' COMMENT 'Data de cadastro do usuario',
  `ativo` int(2) DEFAULT '1' COMMENT 'Status do usuario 1-Ativo ,0- Inativo',
  `nivel` char(1) DEFAULT '1' COMMENT '1-operacional,11-administrativo,111-financeiro,1111-administrador',
  `numeroEmpresa_FK` tinyint(3) DEFAULT '1' COMMENT 'Numero da empresa do usuario',
  `token` varchar(255) DEFAULT '0000000000000000000' COMMENT 'Token contolador de usuarios por login',
  `redefinir` tinyint(1) DEFAULT '0' COMMENT 'Redefinir senha 1-redefinir,0-nao redefinir',
  `ferias` tinyint(1) DEFAULT '0' COMMENT 'Usuario em ferias 1-em ferias,0-trabalhando',
  `setor` int(11) DEFAULT '0' COMMENT 'setor de trabalho',
  `Foto` varchar(255) DEFAULT '/image/users/userDefault.png' COMMENT 'avatar do usuario',
  `email` varchar(255) DEFAULT NULL COMMENT 'Email do usuario',
  `jornadaInicio` time DEFAULT '00:00:00' COMMENT 'Inicio da jornada de trabalho',
  `jornadaFim` time DEFAULT '00:00:00' COMMENT 'Fim da jornada de trabalho',
  `semanaTrabalho` varchar(7) DEFAULT '1111100',
  `administrador` char(1) DEFAULT '0',
  `cpf` varchar(15) DEFAULT '000.000.000-00',
  PRIMARY KEY (`id`),
  KEY `idx_idUsuario` (`id`),
  KEY `idx_login` (`login`),
  KEY `idx_senha` (`senha`),
  KEY `idx_ativo` (`ativo`),
  KEY `idx_numeroEmpresa_fk` (`numeroEmpresa_FK`),
  KEY `idx_redefinir` (`redefinir`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

#
# Data for table "usuarios"
#

INSERT INTO `usuarios` VALUES (1,'admin','306325','Jefferson Fernandes','2014-02-16',1,'1',1,'0000000000000000000',0,0,0,'/image/users/userDefault.png','jefferson.fernandes@outlook.com','00:00:00','00:00:00','1111100','0','000.000.000-00');
