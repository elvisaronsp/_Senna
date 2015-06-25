<?php
/**
 * @author Jefferson Fernandes
 * @date 21/11/2014
 * @time 14:28:38
 * @project_name  Senna -- Grupo Capital Ponto
 */

namespace Senna\Entity;

use Doctrine\ORM\Mapping as ORM,
	Doctrine\Common\Collections\ArrayCollection,
	Senna\Entity\Configurator,
	Senna\Entity\Reconfigurator;

/**
 * Itensvenda
 *
 * @ORM\Table(name="itensvenda", indexes={@ORM\Index(name="TipoItemINDEX", columns={"tipoItemVenda"}), @ORM\Index(name="FormaVendaINDEX", columns={"formaVenda"}), @ORM\Index(name="DescricaoINDEX", columns={"descricao"}), @ORM\Index(name="IdClasseINDEX", columns={"IdClassesProdutos_FK"}), @ORM\Index(name="IdClasseTouchINDEX", columns={"idClassesProdutosTouch_FK"}), @ORM\Index(name="AtivoINDEX", columns={"ativo"}), @ORM\Index(name="NaoPedirQtdeINDEX", columns={"naoPedirQuantidade"}), @ORM\Index(name="FavoritosINDEX", columns={"favoritos"}), @ORM\Index(name="NaoCobraServicoINDEX", columns={"naoCobraServico"}), @ORM\Index(name="LancaNaAberturaINDEX", columns={"lancaNaAbertura"}), @ORM\Index(name="TipoAdicionalINDEX", columns={"tipoAdicional"}), @ORM\Index(name="vendeTouchINDEX", columns={"vendeTouchScreen"}), @ORM\Index(name="descricaoCompletaINDEX", columns={"descricaoCompleta"})})
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="Senna\Repository\ProdutosRepository")
 */

class Itensvenda
{
	
	/**
	 * Metodo resposavel por dar getters e setters automaticamente
	 * @param string $options
	 */
	public function __construct($options = null){
		$options = Reconfigurator::reconfigure($this,$options);
		Configurator::configure($this, $options);
		$this->atributos = new ArrayCollection();
		$this->children = new \Doctrine\Common\Collections\ArrayCollection();
		$this->composicao = new \Doctrine\Common\Collections\ArrayCollection();
	}
	
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="bigint", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="codigoLancamento", type="bigint", nullable=true)
     */
    protected $codigolancamento = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="codigoBarras", type="string", length=30, nullable=true)
     */
    protected $codigobarras;

    /**
     * @var string
     *
     * @ORM\Column(name="tipoItemVenda", type="string", length=1, nullable=true)
     */
    protected $tipoitemvenda = 'N';

    /**
     * @var string
     *
     * @ORM\Column(name="tipoItemSped", type="string", length=2, nullable=true)
     */
    protected $tipoitemsped = '00';

    /**
     * @var string
     *
     * @ORM\Column(name="formaVenda", type="string", length=1, nullable=true)
     */
    protected $formavenda = '1';

    /**
     * @var string
     *
     * @ORM\Column(name="descricao", type="string", length=255, nullable=true)
     */
    protected $descricao;

    /**
     * @var string
     *
     * @ORM\Column(name="descricaoCompleta", type="string", length=255, nullable=true)
     */
    protected $descricaocompleta;

	/**
	 * @var integer 
	 * @ORM\ManyToOne(targetEntity="Classesprodutos", inversedBy="itensvenda")
     * @ORM\JoinColumn(name="IdClassesProdutos_FK", referencedColumnName="id")
	 */
    protected $IdClassesProdutos_FK = '0';

	/**
	 * @var integer 
	 * @ORM\ManyToOne(targetEntity="Subclassesprodutos", inversedBy="itensvenda")
     * @ORM\JoinColumn(name="IdSubClassesProdutos_FK", referencedColumnName="Id")
	 */
    protected $idsubclassesprodutos;

    /**
     * @var integer
     *
     * @ORM\Column(name="idClassesProdutosTouch_FK", type="integer", nullable=true)
     */
    protected $idclassesprodutostouchFk = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="ativo", type="string", length=1, nullable=true)
     */
    protected $ativo = '1';

    /**
     * @var string
     *
     * @ORM\Column(name="unidadeVenda", type="string", length=4, nullable=true)
     */
    protected $unidadeVenda = 'UN';
   
    /**
     * @var string
     *
     * @ORM\Column(name="nomeunidadeVenda", type="string", length=255, nullable=true)
     */
    protected $nomeunidadevenda = 'UNIDADE';

    /**
     * @var string
     *
     * @ORM\Column(name="unidadeCompra", type="string", length=4, nullable=true)
     */
    protected $unidadecompra = 'UN';
    
    /**
     * @var string
     *
     * @ORM\Column(name="nomeunidadeCompra", type="string", length=255, nullable=true)
     */
    protected $nomeunidadecompra = 'UNIDADE';

    /**
     * @var float
     *
     * @ORM\Column(name="fatorConversao", type="float", precision=10, scale=4, nullable=true)
     */
    protected $fatorconversao = '1.0000';

    /**
     * @var string
     *
     * @ORM\Column(name="observacao", type="string", length=255, nullable=true)
     */
    protected $observacao;

    /**
     * @var string
     *
     * @ORM\Column(name="naoPedirQuantidade", type="string", length=1, nullable=true)
     */
    protected $naopedirquantidade = '0';

    /**
     * @var float
     *
     * @ORM\Column(name="valorVenda", type="float", precision=10, scale=2, nullable=true)
     */
    protected $valorvenda = '0.00';

    /**
     * @var float
     *
     * @ORM\Column(name="precoMedioCompra", type="float", precision=10, scale=4, nullable=true)
     */
    protected $precoMedioCompra = '0.0000';

    /**
     * @var float
     *
     * @ORM\Column(name="precoUltimaCompra", type="float", precision=10, scale=4, nullable=true)
     */
    protected $precoultimacompra = '0.0000';

    /**
     * @var float
     *
     * @ORM\Column(name="PrecoPadraoCompra", type="float", precision=10, scale=2, nullable=true)
     */
    protected $precopadraocompra = '0.00';

    /**
     * @var float
     *
     * @ORM\Column(name="custoMedioCompra", type="float", precision=10, scale=2, nullable=true)
     */
    protected $customediocompra = '0.00';

    /**
     * @var float
     *
     * @ORM\Column(name="custoUltimaCompra", type="float", precision=10, scale=2, nullable=true)
     */
    protected $custoultimacompra = '0.00';

    /**
     * @var float
     *
     * @ORM\Column(name="percentualDepreciacao", type="float", precision=10, scale=2, nullable=true)
     */
    protected $percentualdepreciacao = '0.00';

    /**
     * @var float
     *
     * @ORM\Column(name="depreciacaoAcumulada", type="float", precision=10, scale=2, nullable=true)
     */
    protected $depreciacaoacumulada = '0.00';

    /**
     * @var string
     *
     * @ORM\Column(name="vendeDelivery", type="string", length=1, nullable=true)
     */
    protected $vendedelivery = '1';

    /**
     * @var string
     *
     * @ORM\Column(name="vendeTouchScreen", type="string", length=1, nullable=true)
     */
    protected $vendetouchscreen = '1';

    /**
     * @var string
     *
     * @ORM\Column(name="favoritos", type="string", length=1, nullable=true)
     */
    protected $favoritos = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="naoCobraServico", type="string", length=1, nullable=true)
     */
    protected $naocobraservico = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="permitirDesconto", type="string", length=1, nullable=true)
     */
    protected $permitirdesconto = '1';

    /**
     * @var string
     *
     * @ORM\Column(name="temObservacao", type="string", length=1, nullable=true)
     */
    protected $temobservacao = '0';

    /**
     * @var integer
     *
     * @ORM\Column(name="codigoCentroResultado_FK", type="integer", nullable=true)
     */
    protected $codigocentroresultadoFk = '1';

    /**
     * @var string
     *
     * @ORM\Column(name="temBaixaEspecial", type="string", length=1, nullable=true)
     */
    protected $tembaixaespecial = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="codigoBarrasVariavel", type="string", length=1, nullable=true)
     */
    protected $codigobarrasvariavel = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="lancaNaAbertura", type="string", length=1, nullable=true)
     */
    protected $lancanaabertura = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="preparo", type="string", length=255, nullable=true)
     */
    protected $preparo;

    /**
     * @var float
     *
     * @ORM\Column(name="tempoEstimado", type="float", precision=5, scale=2, nullable=true)
     */
    protected $tempoestimado = '0.00';

    /**
     * @var string
     *
     * @ORM\Column(name="tipoAdicional", type="string", length=1, nullable=true)
     */
    protected $tipoadicional = '1';

    /**
     * @var string
     *
     * @ORM\Column(name="temFichaTecnica", type="string", length=1, nullable=true)
     */
    protected $temfichatecnica = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="cadastroFinalizado", type="string", length=1, nullable=true)
     */
    protected $cadastrofinalizado = '0';

    /**
     * @var integer
     *
     * @ORM\Column(name="codigo_bloco_07", type="bigint", nullable=true)
     */
    protected $codigoBloco07 = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="md5", type="string", length=50, nullable=true)
     */
    protected $md5;

    /**
     * @var string
     *
     * @ORM\Column(name="ncm", type="string", length=10, nullable=true)
     */
    protected $ncm;

    /**
     * @var integer
     *
     * @ORM\Column(name="idPlanoContasAtivo_FK", type="integer", nullable=true)
     */
    protected $idplanocontasativoFk = '0';

    /**
     * @var integer
     *
     * @ORM\Column(name="idPlanoContasAtivoDepreciacao_FK", type="integer", nullable=true)
     */
    protected $idplanocontasativodepreciacaoFk = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="tipoAtivoImobilizado", type="string", length=1, nullable=true)
     */
    protected $tipoativoimobilizado = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="validadeItem", type="string", length=5, nullable=true)
     */
    protected $validadeitem = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="IcmsOrigem", type="string", length=5, nullable=true)
     */
    protected $icmsorigem = '0';

    /**
     * @var integer
     *
     * @ORM\Column(name="idOperacaoFiscalEntrada", type="integer", nullable=true)
     */
    protected $idoperacaofiscalentrada = '0';

    /**
     * @var integer
     *
     * @ORM\Column(name="idOperacaoFiscalSaida", type="integer", nullable=true)
     */
    protected $idoperacaofiscalsaida = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="replicado", type="string", length=1, nullable=true)
     */
    protected $replicado = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="replicadoOnline", type="string", length=1, nullable=true)
     */
    protected $replicadoonline = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="numeroSerie", type="string", length=50, nullable=true)
     */
    protected $numeroserie;

    /**
     * @var string
     *
     * @ORM\Column(name="tipoCombo", type="string", length=1, nullable=true)
     */
    protected $tipocombo = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="lembreteVenda", type="string", length=255, nullable=true)
     */
    protected $lembretevenda;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dataHoraCadastro", type="datetime", nullable=true)
     */
    protected $datahoracadastro;
    
    
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dataHoraAlteracao", type="datetime", nullable=true)
     */
    protected $datahoraalteracao;
    
    /**
     * @var float
     *
     * @ORM\Column(name="peso", type="float", precision=10, scale=3, nullable=true)
     */
    protected $peso;
    
    /**
     * @var float
     *
     * @ORM\Column(name="largura", type="float", precision=10, scale=3, nullable=true)
     */
    protected $largura;
    
    /**
     * @var float
     *
     * @ORM\Column(name="altura", type="float", precision=10, scale=3, nullable=true)
     */
    protected $altura;
    
    /**
     * @var float
     *
     * @ORM\Column(name="comprimento", type="float", precision=10, scale=3, nullable=true)
     */
    protected $comprimento;
    
    /**
     * @var float
     *
     * @ORM\Column(name="comissao", type="float", precision=10, scale=2, nullable=true)
     */
    protected $comissao;
	
    /**
     * @var integer
     *
     * @ORM\Column(name="pontos", type="integer", nullable=true)
     */
    protected $pontos = '0';
    
    /**
     * @var string
     *
     * @ORM\Column(name="garantia", type="string", length=1, nullable=true)
     */
    private $garantia = '0';
    
    /**
     * @var string
     *
     * @ORM\Column(name="vendidoSeparado", type="string", length=1, nullable=true)
     */
    private $vendidoSeparado = '1';
    
    
    /**
     * @ORM\OneToMany(targetEntity="Senna\Entity\Itensvendaatributos", mappedBy="itensvendaId")
     * @var Collection
     */
    protected $atributos;
    
    /**
     * @ORM\OneToMany(targetEntity="Senna\Entity\Itensvendacomposicao", mappedBy="itensvendaId")
     * @var Collection
     */
    protected $composicao;
    
    /**
     * @ORM\OneToMany(targetEntity="Senna\Entity\Itensvenda", mappedBy="parent", cascade={"remove","persist"} ,orphanRemoval=true)
     **/
    protected $children;
    
    /**
     * @ORM\ManyToOne(targetEntity="Senna\Entity\Itensvenda", inversedBy="children")
     * @ORM\JoinColumn(name="itemVendaGrade_id", referencedColumnName="id")
     **/
    protected $parent;
    
    /**
     * @var integer
     *
     * @ORM\Column(name="idGrade", type="string", nullable=true)
     */
    protected $idgrade;
    
    
    /**
     * @var string
     *
     * @ORM\Column(name="fotoPrincipal", type="string", length=255, nullable=true)
     */
    protected $fotoprincipal;
    

    /**
     * @param integer $id
     */
    public function setId($id) {
    	$this->id = $id;
    }

	/**
     * @return number
     */
    public function getId() {
    	return $this->id;
    }

    /**
     * @param integer $codigoLancamento
     */
    public function setCodigoLancamento($codigoLancamento) {
    	$this->codigolancamento = $codigoLancamento;
    }

    /**
     * @return number
     */
    public function getCodigoLancamento() {
    	return $this->codigolancamento;
    }

    /**
     * @param integer $codigoBarras
     */
    public function setCodigoBarras($codigoBarras) {
    	$this->codigobarras = $codigoBarras;
    }

    /**
     * @return string
     */
    public function getCodigoBarras() {
    	return $this->codigobarras;
    }

    /**
     * @param integer $tipoItemVenda
     */
    public function setTipoItemVenda($tipoItemVenda) {
    	$this->tipoitemvenda = $tipoItemVenda;
    }

    /**
     * @return string
     */
    public function getTipoItemVenda() {
    	return $this->tipoitemvenda;
    }

    /**
     * @param integer $tipoItemSped
     */
    public function setTipoItemSped($tipoItemSped) {
    	$this->tipoItemSped = $tipoItemSped;
    }

    /**
     * @return string
     */
    public function getTipoItemSped() {
    	return $this->tipoItemSped;
    }

    /**
     * @param integer $formaVenda
     */
    public function setFormaVenda($formaVenda) {
    	$this->formaVenda = $formaVenda;
    }

    /**
     * @return string
     */
    public function getFormaVenda() {
    	return $this->formaVenda;
    }

    /**
     * @param string $descricao
     */
    public function setDescricao($descricao) {
    	$this->descricao = strtoupper($descricao);
    }

    /**
     * @return string
     */
    public function getDescricao() {
    	return $this->descricao;
    }

    /**
     * @param integer $descricaoCompleta
     */
    public function setDescricaoCompleta($descricaoCompleta) {
    	$this->descricaoCompleta = $descricaoCompleta;
    }

    /**
     * @return string
     */
    public function getDescricaoCompleta() {
    	return $this->descricaoCompleta;
    }

    /**
     * @param integer $IdClassesProdutos_FK
     */
    public function setIdClassesProdutos($IdClassesProdutos_FK) {
    	$this->IdClassesProdutos_FK = $IdClassesProdutos_FK;
    }

    /**
     * @return integer
     */
    public function getIdClassesProdutos() {
    	return $this->IdClassesProdutos_FK;
    }

    /**
     * @param integer $IdSubClassesProdutos_FK
     */
    public function setIdSubClassesProdutos($IdSubClassesProdutos_FK) {
    	$this->idsubclassesprodutos = $IdSubClassesProdutos_FK;
    }

    /**
     * @return integer
     */
    public function getIdSubClassesProdutos() {
    	return $this->idsubclassesprodutos;
    }

    /**
     * @param integer $idClassesProdutosTouch_FK
     */
    public function setIdClassesProdutosTouch_FK($idClassesProdutosTouch_FK) {
    	$this->idClassesProdutosTouch_FK = $idClassesProdutosTouch_FK;
    }

    /**
     * @return integer
     */
    public function getIdClassesProdutosTouch_FK() {
    	return $this->idClassesProdutosTouch_FK;
    }

    /**
     * @param integer $ativo
     */
    public function setAtivo($ativo) {
    	$this->ativo = $ativo;
    }

    /**
     * @return string
     */
    public function getAtivo() {
    	return $this->ativo;
    }

    /**
     * @param integer $unidadeVenda
     */
    public function setUnidadeVenda($unidadeVenda) {
    	$this->unidadeVenda = $unidadeVenda;
    }

    /**
     * @return string
     */
    public function getUnidadeVenda() {
    	return $this->unidadeVenda;
    }
    

    
    /**
     * @param integer $nomeunidadeVenda
     */
    public function setNomeUnidadeVenda($NomeUnidadeVenda) {
    	$this->nomeunidadevenda = $NomeUnidadeVenda;
    }
    
    /**
     * @return string
     */
    public function getNomeUnidadeVenda() {
    	return $this->nomeunidadevenda;
    }
    

    /**
     * @param integer $nomeunidadeCompra
     */
    public function setNomeUnidadeCompra($NomeUnidadeCompra) {
    	$this->nomeunidadecompra = $NomeUnidadeCompra;
    }
    
    /**
     * @return string
     */
    public function getNomeUnidadeCompra() {
    	return $this->nomeunidadecompra;
    }

    /**
     * @param integer $unidadeCompra
     */
    public function setUnidadeCompra($unidadeCompra) {
    	$this->unidadecompra = $unidadeCompra;
    }

    /**
     * @return string
     */
    public function getUnidadeCompra() {
    	return $this->unidadecompra;
    }

    /**
     * @param integer $fatorConversao
     */
    public function setFatorConversao($fatorConversao) {
    	$this->fatorconversao = $fatorConversao;
    }

    /**
     * @return number
     */
    public function getFatorConversao() {
    	return $this->fatorconversao;
    }

    /**
     * @param integer $observacao
     */
    public function setObservacao($observacao) {
    	$this->observacao = strtoupper($observacao);
    }

    /**
     * @return string
     */
    public function getObservacao() {
    	return $this->observacao;
    }

    /**
     * @param integer $naoPedirQuantidade
     */
    public function setNaoPedirQuantidade($naoPedirQuantidade) {
    	$this->naoPedirQuantidade = $naoPedirQuantidade;
    }

    /**
     * @return string
     */
    public function getNaoPedirQuantidade() {
    	return $this->naoPedirQuantidade;
    }

    /**
     * @param integer $valorVenda
     */
    public function setValorVenda($valorVenda) {
    	$this->valorvenda = $valorVenda;
    }

    /**
     * @return number
     */
    public function getValorVenda() {
    	return $this->valorvenda;
    }

    /**
     * @param integer $precoMedioCompra
     */
    public function setPrecoMedioCompra($precoMedioCompra) {
    	$this->precoMedioCompra = $precoMedioCompra;
    }

    /**
     * @return number
     */
    public function getPrecoMedioCompra() {
    	return $this->precoMedioCompra;
    }

    /**
     * @param integer $precoUltimaCompra
     */
    public function setPrecoUltimaCompra($precoUltimaCompra) {
    	$this->precoUltimaCompra = $precoUltimaCompra;
    }

    /**
     * @return number
     */
    public function getPrecoUltimaCompra() {
    	return $this->precoUltimaCompra;
    }

    /**
     * @param integer $PrecoPadraoCompra
     */
    public function setPrecoPadraoCompra($PrecoPadraoCompra) {
    	$this->PrecoPadraoCompra = $PrecoPadraoCompra;
    }

    /**
     * @return number
     */
    public function getPrecoPadraoCompra() {
    	return $this->PrecoPadraoCompra;
    }

    /**
     * @param integer $custoMedioCompra
     */
    public function setCustoMedioCompra($custoMedioCompra) {
    	$this->custoMedioCompra = $custoMedioCompra;
    }

    /**
     * @return number
     */
    public function getCustoMedioCompra() {
    	return $this->custoMedioCompra;
    }

    /**
     * @param integer $custoUltimaCompra
     */
    public function setCustoUltimaCompra($custoUltimaCompra) {
    	$this->custoUltimaCompra = $custoUltimaCompra;
    }

    /**
     * @return number
     */
    public function getCustoUltimaCompra() {
    	return $this->custoUltimaCompra;
    }

    /**
     * @param integer $percentualDepreciacao
     */
    public function setPercentualDepreciacao($percentualDepreciacao) {
    	$this->percentualDepreciacao = $percentualDepreciacao;
    }

    /**
     * @return number
     */
    public function getPercentualDepreciacao() {
    	return $this->percentualDepreciacao;
    }

    /**
     * @param integer $depreciacaoAcumulada
     */
    public function setDepreciacaoAcumulada($depreciacaoAcumulada) {
    	$this->depreciacaoAcumulada = $depreciacaoAcumulada;
    }

    /**
     * @return number
     */
    public function getDepreciacaoAcumulada() {
    	return $this->depreciacaoAcumulada;
    }
    
    /**
     * @param integer $vendeDelivery
     */
    public function setVendeDelivery($vendeDelivery) {
    	$this->vendeDelivery = $vendeDelivery;
    }

    /**
     * @return string
     */
    public function getVendeDelivery() {
    	return $this->vendeDelivery;
    }

    /**
     * @param integer $vendeTouchScreen
     */
    public function setVendeTouchScreen($vendeTouchScreen) {
    	$this->vendeTouchScreen = $vendeTouchScreen;
    }

    /**
     * @return string
     */
    public function getVendeTouchScreen() {
    	return $this->vendeTouchScreen;
    }

    /**
     * @param integer $favoritos
     */
    public function setFavoritos($favoritos) {
    	$this->favoritos = $favoritos;
    }

    /**
     * @return string
     */
    public function getFavoritos() {
    	return $this->favoritos;
    }

    /**
     * @param integer $naoCobraServico
     */
    public function setNaoCobraServico($naoCobraServico) {
    	$this->naoCobraServico = $naoCobraServico;
    }

    /**
     * @return string
     */
    public function getNaoCobraServico() {
    	return $this->naoCobraServico;
    }

    /**
     * @param integer $permitirDesconto
     */
    public function setPermitirDesconto($permitirDesconto) {
    	$this->permitirDesconto = $permitirDesconto;
    }

    /**
     * @return string
     */
    public function getPermitirDesconto() {
    	return $this->permitirDesconto;
    }

    /**
     * @param integer $temObservacao
     */
    public function setTemObservacao($temObservacao) {
    	$this->temObservacao = $temObservacao;
    }

    /**
     * @return string
     */
    public function getTemObservacao() {
    	return $this->temObservacao;
    }

    /**
     * @param integer $codigoCentroResultado_FK
     */
    public function setCodigoCentroResultado_FK($codigoCentroResultado_FK) {
    	$this->codigoCentroResultado_FK = $codigoCentroResultado_FK;
    }

    /**
     * @return integer
     */
    public function getCodigoCentroResultado_FK() {
    	return $this->codigoCentroResultado_FK;
    }

    /**
     * @param integer $temBaixaEspecial
     */
    public function setTemBaixaEspecial($temBaixaEspecial) {
    	$this->temBaixaEspecial = $temBaixaEspecial;
    }

    /**
     * @return string
     */
    public function getTemBaixaEspecial() {
    	return $this->temBaixaEspecial;
    }

    /**
     * @param integer $codigoBarrasVariavel
     */
    public function setCodigoBarrasVariavel($codigoBarrasVariavel) {
    	$this->codigoBarrasVariavel = $codigoBarrasVariavel;
    }

    /**
     * @return string
     */
    public function getCodigoBarrasVariavel() {
    	return $this->codigoBarrasVariavel;
    }

    /**
     * @param integer $lancaNaAbertura
     */
    public function setLancaNaAbertura($lancaNaAbertura) {
		$this->lancaNaAbertura = $lancaNaAbertura;
    }

    public function getLancaNaAbertura() {
    	return $this->lancaNaAbertura;
    }

    /**
     * @param integer $preparo
     */
    public function setPreparo($preparo) {
    	$this->preparo = $preparo;
    }

    /**
     * @return string
     */
    public function getPreparo() {
    	return $this->preparo;
    }

    /**
     * @param integer $tempoEstimado
     */
    public function setTempoEstimado($tempoEstimado) {
    	$this->tempoEstimado = $tempoEstimado;
    }

    /**
     * @return number
     */
    public function getTempoEstimado() {
    	return $this->tempoEstimado;
    }

    /**
     * @param integer $tipoAdicional
     */
    public function setTipoAdicional($tipoAdicional) {
    	$this->tipoAdicional = $tipoAdicional;
    }

    /**
     * @return string
     */
    public function getTipoAdicional() {
    	return $this->tipoAdicional;
    }

    /**
     * @param integer $temFichaTecnica
     */
    public function setTemFichaTecnica($temFichaTecnica) {
    	$this->temFichaTecnica = $temFichaTecnica;
    }

    /**
     * @return string
     */
    public function getTemFichaTecnica() {
    	return $this->temFichaTecnica;
    }

    /**
     * @param integer $cadastroFinalizado
     */
    public function setCadastroFinalizado($cadastroFinalizado) {
    	$this->cadastroFinalizado = $cadastroFinalizado;
    }

    /**
     * @return string
     */
    public function getCadastroFinalizado() {
    	return $this->cadastroFinalizado;
    }

    /**
     * @param integer $codigo_bloco_07
     */
    public function setCodigo_bloco_07($codigo_bloco_07) {
    	$this->codigo_bloco_07 = $codigo_bloco_07;
    }

    /**
     * @return integer
     */
    public function getCodigo_bloco_07() {
    	return $this->codigo_bloco_07;
    }

    /**
     * @param integer $md5
     */
    public function setMd5($md5) {
    	$this->md5 = $md5;
    }

    /**
     * @return string
     */
    public function getMd5() {
    	return $this->md5;
    }

    /**
     * @param integer $ncm
     */
    public function setNcm($ncm) {
    	$this->ncm = $ncm;
    }

    /**
     * @return string
     */
    public function getNcm() {
    	return $this->ncm;
    }

    /**
     * @param integer $idPlanoContasAtivo_FK
     */
    public function setIdPlanoContasAtivo_FK($idPlanoContasAtivo_FK) {
    	$this->idPlanoContasAtivo_FK = $idPlanoContasAtivo_FK;
    }

    /**
     * @return integer
     */
    public function getIdPlanoContasAtivo_FK() {
    	return $this->idPlanoContasAtivo_FK;
    }

    /**
     * @param integer $idPlanoContasAtivoDepreciacao_FK
     */
    public function setIdPlanoContasAtivoDepreciacao_FK($idPlanoContasAtivoDepreciacao_FK) {
    	$this->idPlanoContasAtivoDepreciacao_FK = $idPlanoContasAtivoDepreciacao_FK;
    }

    /**
     * @return integer
     */
    public function getIdPlanoContasAtivoDepreciacao_FK() {
    	return $this->idPlanoContasAtivoDepreciacao_FK;
    }

    /**
     * @param integer $tipoAtivoImobilizado
     */
    public function setTipoAtivoImobilizado($tipoAtivoImobilizado) {
    	$this->tipoAtivoImobilizado = $tipoAtivoImobilizado;
    }

    /**
     * @return string
     */
    public function getTipoAtivoImobilizado() {
    	return $this->tipoAtivoImobilizado;
    }

    /**
     * @param integer $validadeItem
     */
    public function setValidadeItem($validadeItem) {
    	$this->validadeItem = $validadeItem;
    }

    /**
     * @return string
     */
    public function getValidadeItem() {
    	return $this->validadeItem;
    }

    /**
     * @param integer $IcmsOrigem
     */
    public function setIcmsOrigem($IcmsOrigem) {
    	$this->IcmsOrigem = $IcmsOrigem;
    }

    /**
     * @return string
     */
    public function getIcmsOrigem() {
    	return $this->IcmsOrigem;
    }

    /**
     * @param integer $idOperacaoFiscalEntrada
     */
    public function setIdOperacaoFiscalEntrada($idOperacaoFiscalEntrada) {
    	$this->idOperacaoFiscalEntrada = $idOperacaoFiscalEntrada;
    }

    /**
     * @return number
     */
    public function getIdOperacaoFiscalEntrada() {
    	return $this->idOperacaoFiscalEntrada;
    }

    /**
     * @param integer $idOperacaoFiscalSaida
     */
    public function setIdOperacaoFiscalSaida($idOperacaoFiscalSaida) {
    	$this->idOperacaoFiscalSaida = $idOperacaoFiscalSaida;
    }

    /**
     * @return number
     */
    public function getIdOperacaoFiscalSaida() {
    	return $this->idOperacaoFiscalSaida;
    }

    /**
     * @param integer $replicado
     */
    public function setReplicado($replicado) {
    	$this->replicado = $replicado;
    }

    /**
     * @return string
     */
    public function getReplicado() {
    	return $this->replicado;
    }

    /**
     * @param integer $replicadoOnline
     */
    public function setReplicadoOnline($replicadoOnline) {
    	$this->replicadoOnline = $replicadoOnline;
    }

    /**
     * @return string
     */
    public function getReplicadoOnline() {
    	return $this->replicadoOnline;
    }

    /**
     * @param integer $numeroSerie
     */
    public function setNumeroSerie($numeroSerie) {
    	$this->numeroSerie = $numeroSerie;
    }

    /**
     * @return string
     */
    public function getNumeroSerie() {
    	return $this->numeroSerie;
    }

    /**
     * @param integer $tipoCombo
     */
    public function setTipoCombo($tipoCombo) {
    	$this->tipoCombo = $tipoCombo;
    }

    /**
     * @return string
     */
    public function getTipoCombo() {
    	return $this->tipoCombo;
    }

    /**
     * @param integer $lembreteVenda
     */
    public function setLembreteVenda($lembreteVenda) {
    	$this->lembreteVenda = $lembreteVenda;
    }

    /**
     * @return string
     */
    public function getLembreteVenda() {
    	return $this->lembreteVenda;
    }

    /**
     * @param integer $dataHoraCadastro
     */
    public function setDataHoraCadastro($dataHoraCadastro) {
    	$this->dataHoraCadastro = $dataHoraCadastro;
    }

    /**
     * @return DateTime
     */
    public function getDataHoraCadastro() {
    	return $this->dataHoraCadastro;
    }
    
    /**
     * @param unknown $peso
     */
    public function setPeso($peso) { 
    	$this->peso = $peso; 
    }
    
    /**
     * @return number
     */
    public function getPeso() { 
    	return $this->peso; 
    }
    
    /**
     * @param unknown $largura
     */
    public function setLargura($largura) { 
    	$this->largura = $largura; 
    }
    
    /**
     * @return number
     */
    public function getLargura() { 
    	return $this->largura; 
    }
    
    /**
     * @param unknown $altura
     */
    public function setAltura($altura) { 
    	$this->altura = $altura; 
    }
    
    /**
     * @return number
     */
    public function getAltura() { 
    	return $this->altura; 
    }
    
    /**
     * @param unknown $comprimento
     */
    public function setComprimento($comprimento) { 
    	$this->comprimento = $comprimento; 
    }
    
    /**
     * @return number
     */
    public function getComprimento() { 
    	return $this->comprimento; 
    }
    
    /**
     * @param unknown $comissao
     */
    public function setComissao($comissao) { 
    	$this->comissao = $comissao; 
    }
    
    /**
     * @return number
     */
    public function getComissao() { 
    	return $this->comissao; 
    }

    /** 
     * @param unknown $pontos
     */
    public function setPontos($pontos) { 
    	$this->pontos = $pontos; 
    }
    
    /**
     * @return number
     */
    public function getPontos() { 
    	return $this->pontos; 
    }
    
    /**
     * @param unknown $garantia
     */
    public function setGarantia($garantia) { 
    	$this->garantia = $garantia; 
    }
    
    /**
     * @return string
     */
    public function getGarantia() { 
    	return $this->garantia; 
    }
    
    /**
     * @param unknown $vendidoSeparado
     */
    public function setVendidoSeparado($vendidoSeparado) { 
    	$this->vendidoSeparado = $vendidoSeparado; 
    }
    
	/**
     * @return string
     */
    public function getVendidoSeparado() { 
    	return $this->vendidoSeparado; 
    }
   
    /**
     * @return \Senna\Entity\Collection
     */
    function getAtributos(){

		$array = array();
    	foreach ($this->atributos as $key =>$value):
			$array[$key]['id'] = $value->getId();
			$array[$key]['item'] = $value->getItensVendaId()->getId();
	    	$array[$key]['nome'] = $value->getNomeAtributo();
	    	$array[$key]['valor'] = $value->getValorAtributo();
		endforeach;
    	return $array;
    }
    
    /**
     * @param unknown $children
     */
    function setChildren($children) {
    	$this->children = $children;
    }
    
    /**
     * @return Ambigous <unknown, \Doctrine\Common\Collections\ArrayCollection>
     */
    function getChildren() {
	
    	$array = array();
    	foreach ($this->children as $key =>$value):
    	
	   	$array[$key]['produto_grade__cod_grade'] = $value->getIdGrade();
    	$array[$key]['produto_grade__id'] = $value->getParent()->getId();
    	$array[$key]['produto_grade__cod_secundario'] = $value->getCodigoLancamento();
    	$array[$key]['produto_grade__descricao_produto'] = $value->getDescricao();
    	$array[$key]['produto_grade__quantidade'] = '0.000';
    	endforeach;
    	return $array;
    }
    
    /**
     * retorn objeto filhos ao inves do metodo acima que retorna um array
     * @return Ambigous <\Doctrine\Common\Collections\ArrayCollection, unknown>
     */
    function getChildrens() {
    	 return $this->children;
    }
    
    
    /**
     * @return \Senna\Entity\Collection
     */
    public function getComposicao(){
    	
    	$array = array();
    	foreach ($this->composicao as $key =>$value):
    	 
	    	$array[$key]['produto_vinculado__id'] = $value->getId();
	    	$array[$key]['produto_vinculado__id_produto_item_vinculado'] = $value->getItensVendaIdChildren()->getId();
	    	$array[$key]['produto_vinculado__descricao_produto'] = $value->getItensVendaIdChildren()->getDescricao();
	    	$array[$key]['produto_vinculado__qtd_vinculada'] = $value->getQuantidade();
	    	$array[$key]['produto_vinculado__sigla'] = $value->getItensVendaIdChildren()->getUnidadeVenda();
	    	$array[$key]['produto_vinculado__vr_venda'] = $value->getItensVendaIdChildren()->getValorVenda();
	    	$array[$key]['produto_vinculado__id_produto'] = $value->getItensVendaId()->getId();
	    	$array[$key]['produto_vinculado__ativa'] = "1";
	    	$array[$key]['produto_vinculado__data_ativacao'] = "";
	    	$array[$key]['produto_vinculado__data_desativacao'] = "";
	    	$array[$key]['produto_vinculado__fracionado'] = "1";
    	
    	endforeach;
    	return $array;
    	
    	
    	//return $this->composicao;
    }
    
    /**
     * @param unknown $parent
     */
    function setParent($parent) {
    	$this->parent = $parent;
    }
    
    /**
     * @return unknown
     */
    function getParent() {
    	return $this->parent;
    }
    
    /**
     * @param unknown $idGrade
     */
    function setIdGrade($idGrade) { 
    	$this->idgrade = $idGrade; 
    }
    
    /**
     * @return number
     */
    function getIdGrade() { 
    	return $this->idgrade; 
    }
    
    /** 
     * @param unknown $fotoPrincipal
     */
    function setFotoPrincipal($fotoPrincipal) { 
    	$this->fotoprincipal = $fotoPrincipal; 
    }
    
    /**
     * @return unknown
     */
    function getFotoPrincipal() { 
    	return $this->fotoprincipal; 
    }
    
    
    /**
     * @return array
     */
    public function toArray(){
    	
   	return array(
    			"produto__id"=>$this->getId(),
    			"produto__descricao_produto" => $this->getDescricao(),
    			"produto__id_categoria"=>$this->getIdClassesProdutos()->getId(),
    			"ac_049414089535f7737919726a321016f5bde0ec5752"=>$this->getIdClassesProdutos()->__toString(),
    			"produto__cod_secundario"=>$this->getCodigoLancamento(),
    			"produto__cod_barra"=>$this->getCodigoBarras(),
    			"produto__id_unidade_entrada"=>$this->getUnidadeCompra(),
    			"ac_03140142178661bc5664537f0f165dc0a75782d030"=>$this->getNomeUnidadeCompra(),
    			"produto__id_unidade_saida"=>$this->getUnidadeVenda(),
   				"ac_0179607757978bfb3b16a9b41b4f5e3e78decfce81e"=>$this->getNomeUnidadeVenda(),
    			"valor_venda_varejo_aux"=>$this->getValorVenda(),
   				"valor_venda_varejo"=>$this->getValorVenda(),
   				"produto_valor_venda__vr_venda"=>$this->getValorVenda(),
    			"produto__tx_conversao_e_s"=>$this->getFatorConversao(),
    			"produto__ativo"=>$this->getAtivo(),
    			"produto__vinculacao"=>$this->getTipoItemVenda(),
    			"produto__peso"=>$this->getPeso(),
    			"produto__largura"=>$this->getLargura(),
    			"produto__altura"=>$this->getAltura(),
    			"produto__comprimento"=>$this->getComprimento(),
    			"produto__informacao_adicional"=>$this->getObservacao(),
    			"produto__comissao"=>$this->getComissao(),
    			"produto__pontos"=>$this->getPontos(),
    			"produto__serie"=>$this->getGarantia(),
    			"produto__vendido_separado"=>$this->getVendidoSeparado()
    	);
    } 
    /**
     * retorna um array para lista de itens cadastrados no sistema
     */
    public function toArrayList(){
    	array(
    	"id"=>$this->getId(),
    	"id_categoria"=>$this->getIdClassesProdutos()->getId(),
    	"id_moeda"=>"1",
    	//"id_unidade_entrada"=>,
    	//"id_unidade_inventario"=>,
    	//"id_unidade_saida"=>,
    	//"id_unidade_tributavel"=>,
    	//"id_produto_principal_grade"=>,
    	"altura"=>$this->getAltura(),
    	"ativo"=>$this->getAtivo(),
    	//"arredondamento"=>"",
    	//"cfop"=>,
    	//"cnpj_produtor"=>,
    	"cod_barra"=>$this->getCodigoBarras(),
    	"cod_grade"=>getIdGrade(),
    	"cod_secundario"=>$this->getCodigoLancamento(),
    	//"cod_cst_a"=>,
    	//"cod_ncm"=>,
    	"comercializavel"=>$this->getVendidoSeparado(),
    	"comissao"=>$this->getComissao(),
    	//"comissao_calc_vv"=>,
    	"comprimento"=>$this->getComprimento(),
    	//"conta_contabil"=>,
    	//"custo_outras_despesas"=>,
    	//"custo_utilizado"=>,
    	//"data_criacao"=>,
		//"data_alteracao"=>,
    	"descricao_produto"=>$this->getDescricao(),
    	//"descricao_resumida"=>,
    	//"ex_tipi"=>,
    	//"foto_principal"=>,
    	"informacao_adicional"=>$this->getObservacao(),
    	//"inventario"=>,
    	"largura"=>$this->getLargura(),
    	//"opcoes_loja_virtual"=>,
    	"peso"=>$this->getPeso(),
    	"pontos"=>$this->getPontos(),
    	//"produto_composto"=>,
    	//"ref_ipi"=>,
    	//"ref_icms"=>,
    	//"ref_cofins"=>,
    	//"ref_comissao"=>,
    	//"ref_cpp"=>,
    	//"ref_csll"=>,
    	//"ref_pis"=>,
    	//"ref_irpj"=>,
    	"serie"=>$this->getGarantia(),
    	//"tipo_mercadoria"=>,
    	//"tipo_producao"=>,
    	"tx_conversao_e_s"=>$this->getFatorConversao(),
    	//"tx_conversao_e_i"=>,
    	//"tx_conversao_s_i"=>,
    	//"tx_conversao_trib"=>,
    	"vendido_separado"=>$this->getVendidoSeparado(),
    	//"vinculacao"=>,
    	"vr_venda"=>$this->getValorVenda(),
    	"id_produto"=>$this->getId(),
    	//"relevancia"=>,
    	"cod"=>$this->getCodigoBarras(),
    	"value"=>$this->getDescricao(),
    	"estoque_revenda"=>"0.000",
    	"estoque_imobilizado"=>"0.000",
    	"estoque_uso_consumo"=>"0.000",
    	"info"=>"[Cod_barra]:".$this->getCodigoBarras() ."[Cod_int]:".$this->getCodigoLancamento() ."[ESTOQ_REV]:0.000",
		"fracionado"=>"1",
		"fracionado_entrada"=>"1",
		"desc_unidade_saida"=>$this->getUnidadeVenda(),
		"desc_unidade_entrada"=>$this->getUnidadeCompra(),
		"sigla_unidade_saida"=>$this->getUnidadeVenda(),
		"sigla_unidade_entrada"=>$this->getUnidadeCompra(),
		"unidade_saida"=>$this->getUnidadeVenda()
    	);
    }
    
    
}
