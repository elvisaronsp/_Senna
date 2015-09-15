<?php
/**
 * Entidade de modalidades de grade
 * @author Jefferson Fernandes
 * @date 28/11/2014
 * @time 19:57:59
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Senna\Entity;

use Doctrine\ORM\Mapping as ORM;
use Senna\Entity\Configurator;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Modalidadegrades
 *
 * @ORM\Table(name="modalidadegrades", uniqueConstraints={@ORM\UniqueConstraint(name="id_UNIQUE", columns={"id"})})
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="Senna\Repository\ModalidadesRepository")
 *
 */
class Modalidadegrades
{
	
	/**
	 * Metodo resposavel por dar getters e setters automaticamente
	 * @param string $options
	 */
	public function __construct($options = null){
	
		Configurator::configure($this, $options);
		$this->grade = new \Doctrine\Common\Collections\ArrayCollection();
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
     * @ORM\Column(name="nome", type="string", length=255, nullable=false)
     */
    private $nome;

    /**
     * @var string
     *
     * @ORM\Column(name="tipo", type="string", length=1, nullable=true)
     */
    private $tipo = 'M';

    /**
     * @ORM\OneToMany(targetEntity="Senna\Entity\Modalidadegrades", mappedBy="modalidade", cascade={"remove","persist"} ,orphanRemoval=true)
     **/
    private $grade;
    
    /**
     * @ORM\ManyToOne(targetEntity="Senna\Entity\Modalidadegrades", inversedBy="grade")
     * @ORM\JoinColumn(name="modalidadeGrades_id", referencedColumnName="id")
     **/
    private $modalidade;
    
    /**
     * @param  $id
     */
    function setId($id) {
    	$this->id = $id;
    }
    
    /**
     *
     * @return number
     */
    function getId() {
    	return $this->id;
    }
    
    /**
     *
     * @param  $nome
     */
    function setDescricao($nome) {
    	$this->nome = strtoupper($nome);
    }
    
    /**
     * @return string
     */
    function getDescricao() {
    	return $this->nome;
    }
    
    /**
     *
     * @param $tipo
     */
    function setTipo($tipo) {
    	$this->tipo = $tipo;
    }
    
    /**
     * @return boolean
     */
    function getTipo() {
    	return $this->tipo;
    }
    
    /**
     *
     * @param  $modalidades
     */
    function setModalidade($modalidade) {
		 $this->modalidade = $modalidade;
    }
    
    
    /**
     * @return id modalidade
     */
    function getModalidade(){
    	return $this->modalidade;
    }
    
      
    /**
     * @param $grades
     */
    function setGrade($grade) {
    	$this->grade = $grade;
    }
    
    /**
     * @return array
     */
    function getGrade() {
    	return $this->grade;
    }
       
    
    /**
     * @return array
     */
    public function toArray(){
    	
    	$modalidade = ($this->getTipo()=="M")?null:$this->getModalidade()->getDescricao();
    	$idModalidade = ($this->getTipo()=="M")?null:$this->getModalidade()->getId();

    	return array('id' => $this->getId (),
    				 'descricao' => strtoupper($this->getDescricao()),
    			     'tipo'=> $this->getTipo(),
    			     'id_modalidade'=> $idModalidade,
    				 'modalidade'=>$idModalidade,
    				 'ac_modalidade'=>	strtoupper($modalidade)	
    
    	);
    }


}
