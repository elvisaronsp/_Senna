<?php
/**
 * Objeto itens venda composição
 * @author Jefferson Fernandes
 * @date 26/01/2015
 * @time 11:05:00
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Senna\Entity;
use Doctrine\ORM\Mapping as ORM;
use Senna\Entity\Configurator;

/**
 * Itensvendacomposicao
 *
 * @ORM\Table(name="itensvendacomposicao")
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="Senna\Repository\ItensVendaComposicaoRepository")
 */
class Itensvendacomposicao
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected  $id;

    /**
     * @var integer
     * @ORM\ManyToOne(targetEntity="Senna\Entity\Itensvenda", inversedBy="Senna\Entity\Itensvendacomposicao")
     * @ORM\JoinColumn(name="itensvenda_id", referencedColumnName="id")
     */
    protected $itensvendaId = '0';

    /**
     * @var float
     *
     * @ORM\Column(name="quantidade", type="float", precision=10, scale=3, nullable=true)
     */
    protected $quantidade = '0.000';
    
    
    
    /**
     * @var children
     *
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\OneToOne(targetEntity="Senna\Entity\Itensvenda")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="itensvenda_id_children", referencedColumnName="id")
     * })
     */
    protected $itensvendaidchildren;
    
    
    /**
     * Metodo resposavel por dar getters e setters automaticamente
     * @param string $options
     */
    public function __construct($options = null){
    	Configurator::configure($this, $options);
    }
    
    /**
     * @param unknown $id
     */
    public function setId($id){
    	$this->id = $id;
    }
    
    /**
     * @return number
     */
    public function getId(){
    	return $this->id;
    }
    
    /**
     * @param unknown $itensvendaId
     */
    public function setItensvendaId($itensvendaId){
    	$this->itensvendaId = $itensvendaId;
    }
    
    /**
     * @return number
     */
    public function getItensvendaId(){
    	return $this->itensvendaId;
    }
    
    /**
     * @param unknown $quantidade
     */
    public function setQuantidade($quantidade){
    	$this->quantidade = $quantidade;
    }
    
    /**
     * @return number
     */
    function getQuantidade(){
    	return $this->quantidade;
    }
    
    /**
     * @param unknown $itensvenda_id_children
     */
    function setItensVendaIdChildren($itensvenda_id_children){
    	$this->itensvendaidchildren = $itensvenda_id_children;
    }
    
    /**
     * @return \Senna\Entity\itensvenda_id_parent
     */
    function getItensVendaIdChildren(){
    	return $this->itensvendaidchildren;
    }
}
