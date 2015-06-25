<?php
/**
 * Objeto itens venda estoque
 * @author Jefferson Fernandes
 * @date 21/11/2014
 * @time 15:49:38
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Senna\Entity;
use Doctrine\ORM\Mapping as ORM;
use Senna\Entity\Configurator;

/**
 * Itensvendaestoque
 *
 * @ORM\Table(name="itensvendaestoque", indexes={@ORM\Index(name="codigoItemVenda_FK", columns={"codigoItemVenda_FK"}), @ORM\Index(name="CodigoEstoque_FK", columns={"CodigoEstoque_FK"})})
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="Senna\Repository\ItensVendaEstoqueRepository")
 */
class Itensvendaestoque
{
	
	
	/**
	 * Metodo resposavel por dar getters e setters automaticamente
	 * @param string $options
	 */
	public function __construct($options = null){
		Configurator::configure($this, $options);
	}

     /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var \Itensvenda
     *
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\OneToOne(targetEntity="Itensvenda")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="itensvenda_id", referencedColumnName="id")
     * })
     */
    private $itensvenda;

    /**
     * @var \Estoques
     *
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\OneToOne(targetEntity="Estoques")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="estoques_id", referencedColumnName="id")
     * })
     */
    private $estoques;

    /**
     * @var float
     *
     * @ORM\Column(name="Quantidade", type="float", precision=10, scale=3, nullable=true)
     */
    private $quantidade = '0.000';

    /**
     * @var float
     *
     * @ORM\Column(name="EstoqueMinimo", type="float", precision=10, scale=3, nullable=true)
     */
    private $estoqueminimo = '0.000';
    
    
    /**
     * @var float
     *
     * @ORM\Column(name="EstoqueMaximo", type="float", precision=10, scale=3, nullable=true)
     */
    private $estoquemaximo = '0.000';

    /**
     * @var \Empresa
     *
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\OneToOne(targetEntity="Empresa")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="empresa_id", referencedColumnName="id")
     * })
     */
    private $empresa;
    
    /**
     * @param unknown $Id
     */
    public function setId($Id) {
    	$this->id = $Id;
    }
    
	/**
	 * @return number
	 */
    public function getId() {
    	return $this->id;
    }
    
	/**
	 * @param integer $itensvenda_id
	 */
    public function setItemVenda($itensvenda) {
    	$this->itensvenda = $itensvenda;
    }
    
	/**
	 * @return integer
	 */
    public function getItemVenda() {
    	return $this->itensvenda;
    }
    
	/**
	 * @param unknown $estoques_id
	 */
    public function setEstoque($estoques) {
    	$this->estoques = $estoques;
    }
    
	/**
	 * @return integer
	 */
    public function getEstoque() {
    	return $this->estoques;
    }
    
	/**
	 * @param unknown $Quantidade
	 */
    public function setQuantidade($Quantidade) {
    	$this->quantidade = $Quantidade;
    }
    
    /**
	 * @return number
	 */
	public function getQuantidade() {
    	return $this->quantidade;
    }
    
    /**
     * @param unknown $EstoqueMinimo
     */
    public function setEstoqueMinimo($EstoqueMinimo) {
    	$this->estoqueminimo = $EstoqueMinimo;
    }
    
	/**
	 * @return number
	 */
    public function getEstoqueMinimo() {
    	return $this->estoqueminimo;
    }
    
    
    /**
     * @param unknown $EstoqueMaximo
     */
    public function setEstoqueMaximo($EstoqueMaximo) {
    	$this->estoquemaximo = $EstoqueMaximo;
    }
    
    /**
     * @return number
     */
    public function getEstoqueMaximo() {
    	return $this->estoquemaximo;
    }
    
	/**
	 * @param unknown $empresa
	 */
    public function setEmpresa($empresa) {
    	$this->empresa = $empresa;
    }
    
	/**
	 * @return unknown
	 */
    public function getEmpresa() {
    	return $this->empresa;
    }
    
    /**
     * @return array
     */
    public function toArray(){
    	 
    	return array(
    			"produto_estoque__min"=>$this->getEstoqueMinimo(),
    			"produto_estoque__max"=>$this->getEstoqueMaximo()
    			
    	);
    }
    
    


}
