<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Dashboard
 *
 * @ORM\Table(name="dashboard")
 * @ORM\Entity
 */
class Dashboard
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
     * @var integer
     *
     * @ORM\Column(name="idusuario_FK", type="integer", nullable=true)
     */
    private $idusuarioFk;

    /**
     * @var integer
     *
     * @ORM\Column(name="posicao", type="integer", nullable=true)
     */
    private $posicao;

    /**
     * @var integer
     *
     * @ORM\Column(name="modulo", type="integer", nullable=true)
     */
    private $modulo;


}
