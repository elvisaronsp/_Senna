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
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Estoques
 *
 * @ORM\Table(name="estoques", indexes={@ORM\Index(name="nomeINDEX", columns={"nome"})})
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="Senna\Repository\EstoquesRepository")
 */
class Estoques
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
     * @var string
     *
     * @ORM\Column(name="nome", type="string", length=255, nullable=true)
     */
    private $nome;

    /**
     * @var string
     *
     * @ORM\Column(name="observacao", type="string", length=255, nullable=true)
     */
    private $observacao;
   
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
     * @param string $nome
     */
    public function setNome($nome) {
    	$this->nome = $nome;
    }
    
	/**
	 * @return string
	 */
    public function getNome() {
    	return $this->nome;
    }
    
	/**
	 * @param string $observacao
	 */
    public function setObservacao($observacao) {
    	$this->observacao = $observacao;
    }
    
	/**
	 * @return string
	 */
    public function getObservacao() {
    	return $this->observacao;
    }
 
}
