<?php
namespace Usuario\Entity;

use Doctrine\ORM\Mapping as ORM;
use Zend\Stdlib\Hydrator;

/**
 * @ORM\Entity
 * @ORM\Table(name="sn_contatos_usuario")
 * @ORM\Entity(repositoryClass="Usuario\Repository\ContatosRepository")
 */
class Contatos
{

    /**
     * @param array $options
     */
    public function __construct($options = array())
    {
        (new Hydrator\ClassMethods)->hydrate($options, $this);
    }


    /**
     * @var integer
     *
     * @ORM\Column(name="Id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="Usuario\Entity\Funcionarios")
     * @ORM\JoinColumn(name="usuario_id", referencedColumnName="id")
     */
    private $usuarioId;

    /**
     * @var string
     *
     * @ORM\Column(name="tipoCadastro", type="string", length=1, nullable=true)
     */
    private $tipocadastro;

    /**
     * @var string
     *
     * @ORM\Column(name="tipoContato", type="string", length=1, nullable=true)
     */
    private $tipocontato;

    /**
     * @var string
     *
     * @ORM\Column(name="contato", type="string", length=150, nullable=true)
     */
    private $contato;

    /**
     * @var string
     *
     * @ORM\Column(name="detalhes", type="string", length=255, nullable=true)
     */
    private $detalhes;

    /**
     * @var boolean
     *
     * @ORM\Column(name="podeExcluir", type="boolean", nullable=true)
     */
    private $podeexcluir;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return SnContatosUsuario
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return int
     */
    public function getUsuarioId()
    {
        return $this->usuarioId;
    }

    /**
     * @param int $usuarioId
     * @return SnContatosUsuario
     */
    public function setUsuarioId($usuarioId)
    {
        $this->usuarioId = $usuarioId;
        return $this;
    }

    /**
     * @return string
     */
    public function getTipoCadastro()
    {
        return $this->tipocadastro;
    }

    /**
     * @param $tipocadastro
     * @return $this
     */
    public function setTipoCadastro($tipocadastro)
    {
        $this->tipocadastro = $tipocadastro;
        return $this;
    }

    /**
     * @return string
     */
    public function getTipoContato()
    {
        return $this->tipocontato;
    }

    /**
     * @param string $tipocontato
     * @return SnContatosUsuario
     */
    public function setTipoContato($tipocontato)
    {
        $this->tipocontato = $tipocontato;
        return $this;
    }

    /**
     * @return string
     */
    public function getContato()
    {
        return $this->contato;
    }

    /**
     * @param string $contato
     * @return SnContatosUsuario
     */
    public function setContato($contato)
    {
        $this->contato = $contato;
        return $this;
    }

    /**
     * @return string
     */
    public function getDetalhes()
    {
        return $this->detalhes;
    }

    /**
     * @param string $detalhes
     * @return SnContatosUsuario
     */
    public function setDetalhes($detalhes)
    {
        $this->detalhes = $detalhes;
        return $this;
    }

    /**
     * @return boolean
     */
    public function getPodeExcluir()
    {
        return $this->podeexcluir;
    }

    /**
     * @param boolean $podeexcluir
     * @return SnContatosUsuario
     */
    public function setPodeExcluir($podeexcluir)
    {
        $this->podeexcluir = $podeexcluir;
        return $this;
    }

    /**
     * @return array
     */
    public function toArray()
    {
        return array(
            'id' => $this->id,
            'usuarioid' => $this->usuarioId,
            'tipocadastro' => $this->tipocadastro,
            'tipocontato' => $this->tipocontato,
            'contato' => $this->contato,
            'detalhes' => $this->detalhes,
            'podeexcluir' => $this->podeexcluir
        );
    }
}

