<?php
/**
 * Servico abstrato
 * @author Jefferson Fernandes
 * @date 18/11/2014
 * @time 20:29:05
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Senna\Service;
use Doctrine\Common\Util\Debug;
use Doctrine\ORM\EntityManager;
use Senna\Entity\Configurator;

 abstract class AbstractService {
	/**
	 * @var EntityManager
	 */
	private $em;
	
	/**
	 * @var Entity
	 */
	protected $entity;
	protected $contatos;

	public function __construct(EntityManager $em){
		$this->em = $em;
	}

	/**
	 * Metodo de insersao de novas classes 
	 * @param array $data
	 */
	public function insert(array $data){
		$entity = new $this->entity($data);
		$this->em->persist($entity);
		$this->em->flush();
		return $entity;
	}

     /**
      * @param array $data
      * @return bool|\Doctrine\Common\Proxy\Proxy|null|object|void
      * @throws \Doctrine\ORM\ORMException
      * @throws \Exception
      */
	public function update(array $data){
		$entity = $this->em->getReference($this->entity, $data['id']);
		$entity = Configurator::configure($entity, $data);
		$this->em->persist($entity);
		$this->em->flush();
		return $entity;
	}
	
	/**
	 * Metodo de remocao de classes existentes
	 * @param int $id
	 * @return int
	 */
	public function delete($id){
		$entity = $this->em->getReference($this->entity, $id);
		if($entity )
			$this->em->remove($entity);
			$this->em->flush();
			return $id;
	}

	 /**
	  * @param $data
	  * @param $key
	  * Verifica se post Existe
	  * @return bool 1 existe 0 não existe
	  */
	 public function checkPostReturnBoolean($data,$key)
	 {

		 if(isset($data[$key])):
			 if($data[$key]):
				 return true;
			 else:
				 return false;
			 endif;
		 else:
			 return false;
		 endif;
	 }

	 /**
	  * @param $entityRecebida
	  * @param $data
	  */
	 public function incluirContatos($entityRecebida, $data)
	 {
		 if (isset($data['contato__id'])):
			 foreach ($data['contato__id'] AS $key => $value) {
				 if (!empty($data['ac_' . $key])):

					 $entity = new $this->contatos();
					 $entity->setUsuarioId($entityRecebida);
					 $entity->setTipoCadastro($data['contato__id_tipo_cadastro'][$key]);
					 $entity->setTipoContato($data['contato__id_tipo_contato'][$key]);
					 $entity->setContato($data['contato__descricao'][$key]);
					 $entity->setDetalhes($data['contato__detalhes'][$key]);
					 $entity->setPodeExcluir(false);

					 $this->em->persist($entity);
					 $this->em->flush();

				 endif;
			 }
		 endif;
	 }

	 /**
	  * @param $entityRecebida
	  * @param $data
	  */
	 public function incluirEndereco($entityRecebida, $data)
	 {
		 if (isset($data['endereco__cep'])):
			 foreach ($data['endereco__cep'] AS $key => $value) {
				 if (!empty($data['ac_e_' . $key])):

					 $entity = new $this->enderecos();
					 $entity->setUsuario($entityRecebida);
					 $entity->setCep($data['endereco__cep'][$key]);
					 $entity->setLogradouro($data['endereco__logradouro'][$key]);
					 $entity->setNumero($data['endereco_entidade__numero'][$key]);
					 $entity->setComplemento($data['endereco_entidade__complemento'][$key]);
					 $entity->setBairro($data['endereco__bairro'][$key]);
					 $entity->setCidade($data['endereco__id_cidade'][$key]);
					 $entity->setReferencia($data['endereco_entidade__informacoes_adicionais'][$key]);
					 $entity->setTipo($data['endereco_entidade__id_tipo_cadastro'][$key]);
					 $entity->setUf($data['estado'][$key]);
					 $entity->setPrincipal($data['endereco_entidade__principal'][$key]);

					 $this->em->persist($entity);
					 $this->em->flush();

				 endif;
			 }
		 endif;
	 }

 }
