<?php

/**
 * @author Jefferson Fernandes
 * @date 04/11/2014
 * @time 22:53:38
 * @project_name  Senna -- Grupo Capital Ponto
 */

namespace Senna\Entity;


use Doctrine\ORM\Mapping as ORM;
use Senna\Entity\Configurator;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Classesprodutos
 *
 * @ORM\Table(name="classesprodutos")
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="Senna\Repository\ClassesProdutosRepository")
 */
class Classesprodutos {
	/**
	 * Metodo resposavel por dar getters e setters automaticamente
	 * @param string $options
	 */	
	public function __construct($options = null){
		
		Configurator::configure($this, $options);
		 $this->subCategorias = new ArrayCollection();
	}
	/**
	 * @var integer 
	 * @ORM\Column(name="id", type="integer", nullable=false)
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="IDENTITY")
	 */
	protected $id;
	
	/**
	 * @var string 
	 * @ORM\Column(name="nome", type="string", length=200, nullable=true)
	 */
	protected $nome = '0';
	
	
	/**
	 * @ORM\OneToMany(targetEntity="Senna\Entity\Subclassesprodutos", mappedBy="id_produto_categoria")
	 * @var Collection
	 */
	protected $subCategorias;
	
	/**
	 * @param integer $id
	 */
	public function setId($id){
		$this->id = $id;
	}
	
	/**
	 * @return integer id
	 */
	public function getId(){
		return $this->id;
	}
	
	/**
	 * @param string $nome
	 */
	public function setNome($nome){
		$this->nome = strtoupper($nome);
	}
	
	/**
	 * @return string nome
	 */
	public function getNome(){
		return $this->nome;
	}
	
	/**
	 * @return string nome
	 */
	public function __toString(){
		return $this->getNome();
	}
	
	/**
	 * @return array
	 */
	public function toArray(){
		return array('id' => $this->getId (),'nome' => strtoupper($this->getNome ()));
	}

	
	public function getSubCategorias(){
		return $this->subCategorias;
       
	}
	
}
