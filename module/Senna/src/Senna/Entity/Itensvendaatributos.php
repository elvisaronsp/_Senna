<?php
/**
 * Objeto itens venda estoque
 * @author Jefferson Fernandes
 * @date 20/01/2015
 * @time 13:18:00
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Senna\Entity;
use Doctrine\ORM\Mapping as ORM;
use Senna\Entity\Configurator;

/**
 * Itensvendaatributos
 *
 * @ORM\Table(name="itensvendaatributos", indexes={@ORM\Index(name="CodigoItemVenda_FK", columns={"itensvenda_id"})})
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="Senna\Repository\ItensVendaAtributosRepository")
 */
class Itensvendaatributos
{
    /**
     * @var integer
     *
     * @ORM\Column(name="Id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected  $id;
    
    /**
     * @var integer
     * @ORM\ManyToOne(targetEntity="Senna\Entity\Itensvenda", inversedBy="Senna\Entity\Itensvendaatributos")
     * @ORM\JoinColumn(name="itensvenda_id", referencedColumnName="id")
     */
	protected $itensvendaId = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="nomeAtributo", type="string", length=255, nullable=true)
     */
    protected $nomeatributo;

    /**
     * @var string
     *
     * @ORM\Column(name="valorAtributo", type="string", length=255, nullable=true)
     */
    protected $valoratributo;
    
    /**
     * Metodo resposavel por dar getters e setters automaticamente
     * @param string $options
     */
    public function __construct($options = null){
    	Configurator::configure($this, $options);
    }
    
    /**
     * @param unknown $Id
     */
    function setId($Id){
    	$this->id = $Id;
    }
    
    /**
     * @return number
     */
    function getId(){
    	return $this->id;
    }
    
    /**
     * @param unknown $itensvenda_id
     */
    function setItensVendaId($itensvenda_id){
    	$this->itensvendaId = $itensvenda_id;
    }
    
    /**
     * @return unknown
     */
    function getItensVendaId(){
    	return $this->itensvendaId;
    }
    
    /**
     * @param unknown $nomeAtributo
     */
    function setNomeAtributo($nomeAtributo){
    	$this->nomeatributo = strtoupper($nomeAtributo);
    }
    
    /**
     * @return string
     */
    function getNomeAtributo(){
    	return $this->nomeatributo;
    }
    
    /**
     * @param unknown $valorAtributo
     */
    function setValorAtributo($valorAtributo){
    	$this->valoratributo = strtoupper($valorAtributo);
    }
    
    /**
     * @return string
     */
    function getValorAtributo(){
    	return $this->valoratributo;
    }
}
