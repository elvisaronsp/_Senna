<?php
namespace Usuario\Entity;

use Doctrine\ORM\Mapping as ORM;
use Zend\Stdlib\Hydrator;

/**
 * SnHorarios
 *
 * @ORM\Table(name="sn_horarios")
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="Usuario\Repository\FuncionariosRepository")
 */
class Horarios
{
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
     * @ORM\Column(name="hora_entrada", type="string", nullable=true)
     */
    private $horaEntrada;

    /**
     * @var string
     *
     * @ORM\Column(name="hora_almoco_entrada", type="string", nullable=true)
     */
    private $horaAlmocoEntrada;

    /**
     * @var string
     *
     * @ORM\Column(name="hora_almoco_saida", type="string", nullable=true)
     */
    private $horaAlmocoSaida;

    /**
     * @var string
     *
     * @ORM\Column(name="hora_saida", type="string", nullable=true)
     */
    private $horaSaida;

    /**
     * @var boolean
     *
     * @ORM\Column(name="dias_da_semana_1", type="boolean", nullable=true)
     */
    private $diasDaSemana1;

    /**
     * @var boolean
     *
     * @ORM\Column(name="dias_da_semana_2", type="boolean", nullable=true)
     */
    private $diasDaSemana2;

    /**
     * @var boolean
     *
     * @ORM\Column(name="dias_da_semana_3", type="boolean", nullable=true)
     */
    private $diasDaSemana3;

    /**
     * @var boolean
     *
     * @ORM\Column(name="dias_da_semana_4", type="boolean", nullable=true)
     */
    private $diasDaSemana4;

    /**
     * @var boolean
     *
     * @ORM\Column(name="dias_da_semana_5", type="boolean", nullable=true)
     */
    private $diasDaSemana5;

    /**
     * @var boolean
     *
     * @ORM\Column(name="dias_da_semana_6", type="boolean", nullable=true)
     */
    private $diasDaSemana6;

    /**
     * @var boolean
     *
     * @ORM\Column(name="dias_da_semana_7", type="boolean", nullable=true)
     */
    private $diasDaSemana7;

    /**
     * @ORM\OneToOne(targetEntity="Usuario\Entity\Funcionarios")
     * @ORM\JoinColumn(name="usuarios_id", referencedColumnName="id")
     */
    private $usuario;

    /**
     * @param array $options
     */
    public function __construct($options = array())
    {
        (new Hydrator\ClassMethods)->hydrate($options, $this);
    }

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param $id
     * @return $this
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getHoraEntrada()
    {
        return $this->horaEntrada;
    }

    /**
     * @param $horaEntrada
     * @return $this
     */
    public function setHoraEntrada($horaEntrada)
    {
        $this->horaEntrada = $horaEntrada;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getHoraAlmocoEntrada()
    {
        return $this->horaAlmocoEntrada;
    }

    /**
     * @param $horaAlmocoEntrada
     * @return $this
     */
    public function setHoraAlmocoEntrada($horaAlmocoEntrada)
    {
        $this->horaAlmocoEntrada = $horaAlmocoEntrada;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getHoraAlmocoSaida()
    {
        return $this->horaAlmocoSaida;
    }

    /**
     * @param $horaAlmocoSaida
     * @return $this
     */
    public function setHoraAlmocoSaida($horaAlmocoSaida)
    {
        $this->horaAlmocoSaida = $horaAlmocoSaida;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getHoraSaida()
    {
        return $this->horaSaida;
    }

    /**
     * @param $horaSaida
     * @return $this
     */
    public function setHoraSaida($horaSaida)
    {
        $this->horaSaida = $horaSaida;
        return $this;
    }

    /**
     * @return boolean
     */
    public function getDiasDaSemana1()
    {
        return $this->diasDaSemana1;
    }

    /**
     * @param $diasDaSemana1
     * @return $this
     */
    public function setDiasDaSemana1($diasDaSemana1)
    {
        $this->diasDaSemana1 = $diasDaSemana1;
        return $this;
    }

    /**
     * @return boolean
     */
    public function getDiasDaSemana2()
    {
        return $this->diasDaSemana2;
    }

    /**
     * @param $diasDaSemana2
     * @return $this
     */
    public function setDiasDaSemana2($diasDaSemana2)
    {
        $this->diasDaSemana2 = $diasDaSemana2;
        return $this;
    }

    /**
     * @return boolean
     */
    public function getDiasDaSemana3()
    {
        return $this->diasDaSemana3;
    }

    /**
     * @param $diasDaSemana3
     * @return $this
     */
    public function setDiasDaSemana3($diasDaSemana3)
    {
        $this->diasDaSemana3 = $diasDaSemana3;
        return $this;
    }

    /**
     * @return boolean
     */
    public function getDiasDaSemana4()
    {
        return $this->diasDaSemana4;
    }

    /**
     * @param $diasDaSemana4
     * @return $this
     */
    public function setDiasDaSemana4($diasDaSemana4)
    {
        $this->diasDaSemana4 = $diasDaSemana4;
        return $this;
    }

    /**
     * @return boolean
     */
    public function getDiasDaSemana5()
    {
        return $this->diasDaSemana5;
    }

    /**
     * @param $diasDaSemana5
     * @return $this
     */
    public function setDiasDaSemana5($diasDaSemana5)
    {
        $this->diasDaSemana5 = $diasDaSemana5;
        return $this;
    }

    /**
     * @return boolean
     */
    public function getDiasDaSemana6()
    {
        return $this->diasDaSemana6;
    }

    /**
     * @param $diasDaSemana6
     * @return $this
     */
    public function setDiasDaSemana6($diasDaSemana6)
    {
        $this->diasDaSemana6 = $diasDaSemana6;
        return $this;
    }

    /**
     * @return boolean
     */
    public function getDiasDaSemana7()
    {
        return $this->diasDaSemana7;
    }

    /**
     * @param $diasDaSemana7
     * @return $this
     */
    public function setDiasDaSemana7($diasDaSemana7)
    {
        $this->diasDaSemana7 = $diasDaSemana7;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getUsuario()
    {
        return $this->usuario;
    }

    /**
     * @param mixed $usuario
     */
    public function setUsuario($usuario)
    {
        $this->usuario = $usuario;
    }

    /**
     * @return array
     */
    public function toArray()
    {
        return array(
            'id'=>$this->id,
            'horaEntrada'=>$this->horaEntrada,
            'horaAlmocoEntrada'=>$this->horaAlmocoEntrada,
            'horaAlmocoSaida'=>$this->horaAlmocoSaida,
            'horaSaida'=>$this->horaSaida,
            'diasDaSemana1'=>$this->diasDaSemana1,
            'diasDaSemana2'=>$this->diasDaSemana2,
            'diasDaSemana3'=>$this->diasDaSemana3,
            'diasDaSemana4'=>$this->diasDaSemana4,
            'diasDaSemana5'=>$this->diasDaSemana5,
            'diasDaSemana6'=>$this->diasDaSemana6,
            'diasDaSemana7'=>$this->diasDaSemana7
        );
    }
}

