<?php
/**
 * Created by PhpStorm.
 * User: Jefferson
 * Date: 25/06/2015
 * Time: 15:03
 */

namespace Acl\Controller;
use Senna\Controller\GrudController;
/**
 * Class PerfisController
 * @package Acl\Controller
 */
class PerfisController extends GrudController {

    public function __construct()
    {
        $this->entity = "Acl\Entity\Perfis";
        $this->service = "Acl\Service\Perfis";
        $this->message_delete = "Perfil de acesso excluido com sucesso";

    }
}