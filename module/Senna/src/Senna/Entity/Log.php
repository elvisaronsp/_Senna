<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Log
 *
 * @ORM\Table(name="log")
 * @ORM\Entity
 */
class Log
{
    /**
     * @var integer
     *
     * @ORM\Column(name="Id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="local", type="string", length=255, nullable=true)
     */
    private $local;

    /**
     * @var string
     *
     * @ORM\Column(name="nomeUsuario", type="string", length=20, nullable=true)
     */
    private $nomeusuario;

    /**
     * @var string
     *
     * @ORM\Column(name="mensagem", type="string", length=255, nullable=true)
     */
    private $mensagem;

    /**
     * @var boolean
     *
     * @ORM\Column(name="tipo", type="boolean", nullable=true)
     */
    private $tipo;


}
