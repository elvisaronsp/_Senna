# Host: mysql.grupocapitalponto.com.br  (Version: 5.5.43-log)
# Date: 2015-12-02 19:04:56
# Generator: MySQL-Front 5.3  (Build 4.234)

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Data for table "classesprodutos"
#


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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

#
# Data for table "empresa"
#

INSERT INTO `empresa` VALUES (1,'GRUPO CAPITAL PONTO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0','0',NULL,NULL,NULL,NULL,NULL,'PR','0000-00-00',NULL,NULL,1,NULL,NULL,NULL,10,10,0,NULL,NULL,'FB0056A08A508B573AC30ABDEA0730BF',NULL,NULL,NULL,NULL,NULL,0,NULL,'2000-01-01','2000-01-01','','',0,'','','2012-12-04',0,0,0,0,'0','0','Ate 180.000,00',4.00,0.00,0.00,0.00,0.00,2.75,1.25,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'1000',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'0');

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Data for table "estoques"
#


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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Data for table "itensvenda"
#


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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Data for table "itensvendaatributos"
#


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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Data for table "itensvendaestoque"
#


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
# Structure for table "sn_clientes"
#

DROP TABLE IF EXISTS `sn_clientes`;
CREATE TABLE `sn_clientes` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `razaoSocial` varchar(255) NOT NULL DEFAULT '',
  `nomeFantasia` varchar(255) DEFAULT NULL,
  `cnpj` varchar(18) DEFAULT NULL,
  `cpf` varchar(14) DEFAULT NULL,
  `rg` varchar(50) DEFAULT NULL,
  `sexo` char(1) DEFAULT NULL COMMENT '0 - Homem 1 - Mulher',
  `responsavel` varchar(100) DEFAULT NULL,
  `ie` varchar(50) DEFAULT NULL,
  `ieIsento` tinyint(1) DEFAULT '0',
  `im` varchar(50) DEFAULT NULL,
  `imIsento` tinyint(2) DEFAULT '0',
  `codigoCliente` varchar(25) DEFAULT NULL,
  `tipo` char(1) DEFAULT '1' COMMENT '0 - Pessoa Fisica 1- Pessoa Juridica',
  `origem` char(1) DEFAULT '1' COMMENT '0 - Nacional 1 - Estrangeira',
  `identificacaoEstrangeiro` varchar(50) DEFAULT NULL,
  `observacao` mediumtext,
  `email` varchar(100) DEFAULT NULL,
  `telefone` varchar(14) DEFAULT NULL,
  `alertas` tinyint(1) DEFAULT '0',
  `limiteCredito` double(10,2) DEFAULT '0.00',
  `saldo` double(10,2) DEFAULT '0.00',
  `classificacao` char(1) DEFAULT '1',
  `ativo` tinyint(1) DEFAULT '1',
  `criadoEm` datetime DEFAULT '0000-00-00 00:00:00',
  `atualizadoEm` datetime DEFAULT '0000-00-00 00:00:00',
  `dataNascimento` date DEFAULT NULL,
  `estadoCivil` tinyint(1) DEFAULT '0',
  `rendaMensal` double(15,2) DEFAULT '0.00',
  `profissao` varchar(255) DEFAULT NULL,
  `filiacaoMae` varchar(255) DEFAULT NULL,
  `filiacaoPai` varchar(255) DEFAULT NULL,
  `conjugeNome` varchar(255) DEFAULT NULL,
  `conjugeCpf` varchar(14) DEFAULT NULL,
  `conjugeDataNascimento` date DEFAULT NULL,
  `conjugeProfissao` varchar(255) DEFAULT NULL,
  `suframa` varchar(50) DEFAULT NULL,
  `empresa_id` char(1) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

#
# Data for table "sn_clientes"
#

INSERT INTO `sn_clientes` VALUES (7,'KAMIAL','','','061.938.339-94','77498044','0','',NULL,1,'',0,'2789116604606','0','1',NULL,'','jefferson@teste.com','(41)9565-3780',0,0.00,0.00,'1',1,'2015-09-17 21:51:13','2015-09-17 21:51:13','1987-10-03',1,0.00,'sa','sa','sa','a','010.121.212-12','1987-10-03','a','','1');

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

INSERT INTO `sn_perfis` VALUES (106,NULL,'ADMINISTRADOR',1,'2015-07-24 23:17:18','2015-07-24 23:17:18'),(107,NULL,'FINANCEIRO',0,'2015-08-15 21:18:24','2015-08-15 21:18:24');

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

#
# Data for table "sn_recursos"
#

INSERT INTO `sn_recursos` VALUES (1,'Acesso ao Senna','2015-06-23 22:41:22','2015-06-23 22:41:22'),(2,'Cadastro de itens de venda','2015-06-24 19:38:07','2015-06-24 19:38:07'),(3,'Usuarios e vendedores','2015-06-24 19:38:07','2015-06-24 19:38:07'),(4,'Gerenciar usuarios','2015-06-24 19:38:07','2015-06-24 19:38:07'),(5,'Perfis de acesso','2015-06-24 19:38:07','2015-06-24 19:38:07'),(6,'Cadastros','2015-06-24 19:38:07','2015-06-24 19:38:07'),(7,'Clientes','2015-06-24 19:38:07','2015-06-24 19:38:07'),(8,'Fornecedores','2015-06-24 19:38:07','2015-06-24 19:38:07');

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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;

#
# Data for table "sn_privilegios"
#

INSERT INTO `sn_privilegios` VALUES (37,106,1,'2015-08-21 00:54:37','2015-08-21 00:54:37',1),(38,106,2,'2015-08-21 00:54:37','2015-08-21 00:54:37',1),(39,106,3,'2015-08-21 00:54:37','2015-08-21 00:54:37',1),(40,106,4,'2015-08-21 00:54:37','2015-08-21 00:54:37',1),(41,106,5,'2015-08-21 00:54:37','2015-08-21 00:54:37',1),(42,107,1,'2015-09-15 02:54:48','2015-09-15 02:54:48',1),(43,107,2,'2015-09-15 02:54:48','2015-09-15 02:54:48',1);

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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;

#
# Data for table "sn_usuarios"
#

INSERT INTO `sn_usuarios` VALUES (37,'JEFFERSON FERNANDES','061.938.339-94',1,1,'M','ADMIN','c/IqP4rAOoz0s82BWwbIaaUSxQ2aTquDuk8kK3tM6E8bvrcTuv/DPBjUNEDGvXwFHcaX3YEBd22Xg58b','2015-08-19 15:29:31','sJO8vwA7XmsUVkChEn+q6yCLZ8qdcmziUEGiVwk6/UA=','Cwtl+REoDyFdFzgc0ydppywFjwaXVfFEAkbNm9o8A50=','ffb079d5492a341036ccaadc920947ae','jefferson.fernandes@outlook.com','(41)9565-3780','','','2015-07-24',3,0.00,'2015-07-24','2015-07-24','','',0.00,2,'','','',NULL,'2015-08-19 15:29:31',0,0,106,4,'2015-07-24 23:18:49','2015-08-19 23:32:24',0,0,1,0,1),(42,'ALINE','',1,1,'M','2769268230007','FYfIXQH8UxadB5+osURwy3ULCpQRsnn+FBjH7mraF6ltTdeko5/R44D4Y3NqhUajmr14vG5BtbIjPTUP',NULL,'0DaSLFMNnvAMgI0UjOMBkH08QFxdjl6L9e6EXTFhca4=','','fe47f9feff87d03d9ad48ab70c0bc719','jeajhsjahs@SDSDS.COM','(41)9565-3781','','','2015-10-15',3,0.00,NULL,NULL,'','',0.00,2,'','','',NULL,NULL,0,0,106,5,'2015-10-15 21:57:48','2015-11-05 21:45:41',0,0,NULL,NULL,1),(43,'DFDGTRHGF','',1,1,'M','2712914718527','dsnMZV4JMFxKcl6BpblJE4xyxvVn6Mt22AbeJ7FC7EKVu5lRLeErpjb6CzN1dYWpCPlNMYB81p9hH4qhJ1fLFjPJ0T7ZgjGnHFy5ZKdYV5k=',NULL,'129495V5vNG8N27ZDUjSZr/34hPhRje1IILwdlyeSF4=','','c1220baf76d8913b115414cf3e8c54af','sasasa@dsadsds.com','','','',NULL,3,0.00,NULL,NULL,'','',0.00,2,'','','',NULL,NULL,0,0,106,5,'2015-10-27 16:31:34','2015-10-27 16:31:34',0,0,NULL,NULL,1);

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
) ENGINE=InnoDB AUTO_INCREMENT=185 DEFAULT CHARSET=latin1;

#
# Data for table "sn_horarios"
#

INSERT INTO `sn_horarios` VALUES (173,'00:00','12:00','12:01','23:59',1,1,1,1,1,1,1,37),(182,'08:00','12:00','13:00','18:00',1,1,1,1,1,NULL,NULL,43),(184,'08:00','12:00','13:00','18:00',1,1,1,1,1,NULL,NULL,42);

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Data for table "sn_enderecos_usuario"
#


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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Data for table "sn_contatos_usuario"
#


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
