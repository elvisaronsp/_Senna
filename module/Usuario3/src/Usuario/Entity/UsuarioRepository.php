<?php

namespace Usuario\Entity;

use Doctrine\ORM\EntityRepository;

class UsuarioRepository extends EntityRepository
{
    
    public function findByEmailAndPassword($email, $senha)
    {
        $usuario = $this->findOneByEmail($email);
        
        if($usuario)
        {
        $hashSenha = $usuario->encryptSenha($senha);
        if($hashSenha == $usuario->getSenha())
                return $usuario;
            else
                return false;
        }
        else
            return false;
    }

    public function findArray()
    {
        $usuarios = $this->findAll();
        $a = array();
        foreach($usuarios as $usuario)
        {
            $a[$usuario->getId()]['id'] = $usuario->getId();
            $a[$usuario->getId()]['nome'] = $usuario->getNome();
            $a[$usuario->getId()]['email'] = $usuario->getEmail();
        }
        
        return $a;
    }

}
