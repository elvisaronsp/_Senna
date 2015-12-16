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
	 * @var $contatos
	 * @var $enderecos
	 * @var $vendedores
	 */
	 protected $entity;
	 protected $contatos;
	 protected $enderecos;
	 protected $vendedores;

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
	  * @param $entidadePai
	  * @param $data
	  * @throws \Doctrine\ORM\ORMException
	  * Este metodo e utilizado para fazer a persistencia de campos do tipo contato
	  * especialmente pensado para facilitar a inserção e atualizção de campos de contatos em qualquer
	  * tela da aplicacao.Este metodo verifica se o contato que esta sendo persistido ja existe no banco de dados
	  * caso exista ele faz a atualização do mesmo caso contrario faz o insert.
	  */
	 public function resolvePersistenciaContatos($entidadePai , $data)
	 {
		 $repository = $this->em->getRepository($this->contatos);
		 $entityRemove = $repository->findAll();

		 // se existir algum contarto sendo persistido
		 if (isset($data['contato__id'])):

			 // Limpa o array de descricao para que tenha apenas os contatos que tenha alguma informacao
			 $contato = array_filter($data['contato__descricao']);

			 // Percorre todos os enderecos que estao sendo persistidos baseado nos cep que estao populados
			 foreach ($contato AS $key => $value) :

				 // Verifica se e um insert ou update false = update
				 if (!empty($data['contato__id'][$key])):
					 $entity = $this->em->getReference($this->contatos,$data['contato__id'][$key]);
					 $entityCadastradas[] = $data['contato__id'][$key];
				 else:
					 $entity = new $this->contatos();
				 endif;

				 $entity->setUsuarioId($entidadePai);
				 $entity->setTipoCadastro($data['contato__id_tipo_cadastro'][$key]);
				 $entity->setTipoContato($data['contato__id_tipo_contato'][$key]);
				 $entity->setContato($data['contato__descricao'][$key]);
				 $entity->setDetalhes($data['contato__detalhes'][$key]);
				 $entity->setPodeExcluir(false);

				 $this->em->persist($entity);
				 $this->em->flush();
			 endforeach;
		 endif;


		 // Caso não aja nenhum contato sendo persistido ou
		 // caso aja contatos sendo persistido mas nao contenham nenhuma informacao
		 // Remove todos os contatos do usuario
		 if(!isset($data['contato__id']) || count($contato) < 1):
			 // contato
			 $contatos = $repository->findBy(array('usuario' => $entidadePai->getId()));
			 foreach($contatos as $e):
				 $this->em->remove($e);
				 $this->em->flush();
			 endforeach;
		 return;
		 endif;

		 // 2/2 Segunda parte do metodo que remove id que foram excluidos da view
		 if($entityRemove):
			 foreach($entityRemove AS $k => $entity):
				 if (!in_array($entity->getId(), $entityCadastradas)) {
					 $entity = $repository->findBy(array('id' => $entity->getId()));
					 foreach($entity as $e):
						 $this->em->remove($e);
						 $this->em->flush();
					 endforeach;
				 }
			 endforeach;
		 endif;
	 }

	 /**
	  * @param $entidadePai
	  * @param $data
	  * @throws \Doctrine\ORM\ORMException
	  * Este metodo e utilizado para fazer a persistencia de campos do tipo endereço
	  * especialmente pensado para facilitar a inserção e atualizção de campos de endereço em qualquer
	  * tela da aplicacao.Este metodo verifica se o endereco que esta sendo persistido ja existe no banco de dados
	  * caso exista ele faz a atualização do mesmo caso contrario faz o insert.
	  */
	 public function resolvePersistenciaEnderecos($entidadePai , $data)
	 {
		 // 1/2 Segunda parte do metodo que remove id que foram excluidos da view
		 $repository = $this->em->getRepository($this->enderecos);
		 $entityRemove = $repository->findAll();

		 // se existir algum endereço sendo persistido
		 if (isset($data['endereco_id'])):

			 // Limpa o array de cep para que tenha apenas os enderecos que tenha alguma informacao
			 $cep = array_filter($data['endereco__cep']);

			  // Percorre todos os enderecos que estao sendo persistidos baseado nos cep que estao populados
			 foreach ($cep AS $key => $value) :

					 // Verifica se e um insert ou update false = update
					 if (!empty($data['endereco_id'][$key])):
						 $entity = $this->em->getReference($this->enderecos,$data['endereco_id'][$key]);
						 $entityCadastradas[] = $data['endereco_id'][$key];
					 else:
						 $entity = new $this->enderecos();
					 endif;

					 $entity->setUsuario($entidadePai);
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
			 endforeach;
		 endif;

		 // Caso não aja nenhum endereço sendo persistido ou
		 // caso aja enderecos sendo persistido mas nao contenham nenhuma informacao
		 // Remove todos os enderecos do usuario
		 if(!isset($data['endereco_id']) || count($cep) < 1):
			 // enderecos
			 $enderecos = $repository->findBy(array('usuario' => $entidadePai->getId()));
			 foreach($enderecos as $e):
				 $this->em->remove($e);
				 $this->em->flush();
			 endforeach;
			 return;
		 endif;

		 // 2/2 Segunda parte do metodo que remove id que foram excluidos da view
		 if($entityRemove):
			 foreach($entityRemove AS $k => $entity):
				 if (!in_array($entity->getId(), $entityCadastradas)) {
					 $entity = $repository->findBy(array('id' => $entity->getId()));
					 foreach($entity as $e):
						 $this->em->remove($e);
						 $this->em->flush();
					 endforeach;
				 }
			 endforeach;
		 endif;
	 }

	 /**
	  * @param $entidadePai
	  * @param $data
	  * @throws \Doctrine\ORM\ORMException
	  * Este metodo e utilizado para fazer a persistencia de campos do tipo vendedores
	  * especialmente pensado para facilitar a inserção e atualizção de campos de vendedores em qualquer
	  * tela da aplicacao.Este metodo verifica se o vendedor que esta sendo persistido ja existe no banco de dados
	  * caso exista ele faz a atualização do mesmo caso contrario faz o insert.
	  */
	 public function resolvePersistenciaVendedores($entidadePai , $data)
	 {
		 // 1/2 Segunda parte do metodo que remove id que foram excluidos da view
		 $repository = $this->em->getRepository($this->vendedores);
		 $entityRemove = $repository->findAll();

		 // se existir algum vendedor sendo persistido
		 if (isset($data['vendedorCliente'])):

			 // Limpa o array de vendedor para que tenha apenas os vendedores que tenha alguma informações
			 $vendedor = array_filter($data['vendedorCliente']);
			 $count = 0;
			 $vendedoresCadastrados = array();
			 // Percorre todos os vendedores que estao sendo persistidos baseado nos vendedores que estao populados
			 foreach ($vendedor AS $key => $value) {

				 foreach($value As $k => $v):

					 if(!empty($data['vendedorCliente'][$key][$k])):
						 $count++;
						 // Verifica se e um insert ou update false = update
						 if (!empty($data['vendedorId'][$key][$k])):
							 $entity = $this->em->getReference($this->vendedores,$data['vendedorId'][$key][$k]);
							 $entityCadastradas[] = $data['vendedorId'][$key][$k];
						 else:
							 $entity = new $this->vendedores();
						 endif;

						 $entity->setCliente($entidadePai);
						 $idVendedor = $this->em->getReference("Usuario\Entity\Funcionarios", $v);
						 $entity->setUsuario($idVendedor);

						 $this->em->persist($entity);
						 $this->em->flush();
					 endif;

				 endforeach;
			 }
		 endif;

		 // Caso não aja nenhum vendedor sendo persistido ou
		 // caso aja vendedores sendo persistido mas nao contenham nenhuma informacao
		 // Remove todos os vendedores do usuario
		 if(!isset($data['vendedorCliente']) || $count < 1):
			 // vendedores
			 $vendedores = $repository->findBy(array('cliente' => $entidadePai->getId()));
			 foreach($vendedores as $e):
				 $this->em->remove($e);
				 $this->em->flush();
			 endforeach;
		 return;
		 endif;

		 // 2/2 Segunda parte do metodo que remove id que foram excluidos da view
		 if($entityRemove):
			 foreach($entityRemove AS $k => $entity):
				 if (!in_array($entity->getId(), $entityCadastradas)) {
					 $entity = $repository->findBy(array('id' => $entity->getId()));
					 foreach($entity as $e):
						 $this->em->remove($e);
						 $this->em->flush();
					 endforeach;
				 }
			 endforeach;
		 endif;
	 }

 }
