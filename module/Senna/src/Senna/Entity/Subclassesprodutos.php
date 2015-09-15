<?php

/**
 * @author Jefferson Fernandes
 * @date 05/11/2014
 * @time 21:35:08
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Senna\Entity;
use Doctrine\ORM\Mapping as ORM;
use Senna\Entity\Configurator;

/**
 * Subclassesprodutos
 *
 * @ORM\Table(name="subclassesprodutos")
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="Senna\Repository\SubClassesProdutosRepository")
 */
class Subclassesprodutos {
	
	/**
	 * Metodo resposavel por dar getters e setters automaticamente
	 * @param string $options
	 */
	public function __construct($options = null){
		Configurator::configure($this, $options);
	}
	
	/**
	 * @var integer 
	 * @ORM\Column(name="Id", type="integer", nullable=false)
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="IDENTITY")
	 */
	protected $id;
	
	/**
	 * @var integer 
	 * @ORM\ManyToOne(targetEntity="Senna\Entity\Classesprodutos", inversedBy="Senna\Entity\Subclassesprodutos")
     * @ORM\JoinColumn(name="id_produto_categoria", referencedColumnName="id")
	 */
	protected $id_produto_categoria;
	
	/**
	 * @var string 
	 * @ORM\Column(name="nome", type="string", length=100, nullable=true)
	 */
	protected $nome;
	
	/**
	 * @param int $id
	 */
	public function setId($id) {
		$this->id = $id;
	}
	
	/**
	 * @return int $id
	 */
	public function getId() {
		return $this->id;
	}
	
	/**
	 * @param int $id_produto_categoria
	 */
	public function setIdProdutoCategoria($id_produto_categoria) {
		$this->id_produto_categoria = $id_produto_categoria;
	}
	
	/**
	 * @return int $id_produto_categoria
	 */
	public function getIdProdutoCategoria() {
		return $this->id_produto_categoria;
	}
	
	/**
	 * @param string $nome
	 */
	public function setNome($nome) {
		$this->nome = strtoupper($nome);
	}
	
	/**
	 * @return string $nome
	 */
	public function getNome() {
		return strtoupper($this->nome);
	}

	
	
	/**
	 * @return string nome
	 */
	public function __toString(){
		return strtoupper($this->getNome());
	}
	/**
	 * @return array
	 */
	public function toArray(){
		return array('id' => $this->getId (),
				'nome' => strtoupper($this->getNome ()),
				'id_produto_categoria' => $this->getIdProdutoCategoria()
				
		);
	}
}
