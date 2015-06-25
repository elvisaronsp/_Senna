<?php
/**
 * Objeto unidades de medida
 * @author Jefferson Fernandes
 * @date 15/11/2014
 * @time 20:40:38
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Senna\Entity;
use Doctrine\ORM\Mapping as ORM;
use Senna\Entity\Configurator;

/**
 * Unidadesmedida
 *
 * @ORM\Table(name="unidadesmedida")
 * @ORM\Entity 
 * @ORM\Entity(repositoryClass="Senna\Repository\UnidadesMedidaRepository")
 */
class Unidadesmedida {
	
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
    protected  $id;

    /**
     * @var string
     *
     * @ORM\Column(name="descricao", type="string", length=40, nullable=false)
     */
    protected $descricao = '';

    /**
     * @var string
     *
     * @ORM\Column(name="Abreviacao", type="string", length=8, nullable=true)
     */
    protected $sigla;

    /**
     * @var string
     *
     * @ORM\Column(name="fracionado", type="string", length=1, nullable=true)
     */
    protected $fracionado = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="padrao", type="string", length=1, nullable=true)
     */
    protected $padrao = '0';
	
	/**
	 * @param integer $numero
	 */
	public function setId($id) {
		$this->id = $id;
	}
	
	/**
	 * @return integer
	 */
	public function getId() {
		return $this->id;
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
	 * @param string $Abreviacao
	 */
	public function setSigla($sigla) {
		$this->sigla = strtoupper($sigla);
	}
	
	/**
	 * @return string
	 */
	public function getSigla() {
		return $this->sigla;
	}
	
	/**
	 * @param integer $fracionado
	 */
	public function setFracionado($fracionado) { 
		$this->fracionado = $fracionado; 
	}
	
	/**
	 * @return integer
	 */
	public function getFracionado() { 
		return $this->fracionado; 
	}
	
	/**
	 * @param integer $padrao
	 */
	public function setPadrao($padrao) { 
		$this->padrao = $padrao; 
	}
	
	/**
	 * @return integer
	 */
	public function getPadrao() { 
		return $this->padrao; 
	}
	
	/**
	 * @return string descricao
	 */
	public function __toString(){
		return $this->getDescricao();
	}
	
	/**
	 * @return array
	 */
	public function toArray(){
		return array(
				'id' => $this->getId(),
				'moficador_padrao'=>'false',
				'descricao' => strtoupper($this->getDescricao ()),
				'sigla'=>strtoupper($this->getSigla ()),
				'fracionado'=>$this->getFracionado (),
				'padrao'=>$this->getPadrao ()
				);
	}
}
