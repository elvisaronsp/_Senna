<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Fornecedores
 *
 * @ORM\Table(name="fornecedores", uniqueConstraints={@ORM\UniqueConstraint(name="Id", columns={"Id"})}, indexes={@ORM\Index(name="NomeFantasia", columns={"NomeFantasia"})})
 * @ORM\Entity
 */
class Fornecedores
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
     * @ORM\Column(name="NomeFantasia", type="string", length=100, nullable=true)
     */
    private $nomefantasia;

    /**
     * @var string
     *
     * @ORM\Column(name="NomeResponsavel", type="string", length=100, nullable=true)
     */
    private $nomeresponsavel;

    /**
     * @var string
     *
     * @ORM\Column(name="TelefoneResidencial", type="string", length=15, nullable=true)
     */
    private $telefoneresidencial;

    /**
     * @var string
     *
     * @ORM\Column(name="TelefoneComercial", type="string", length=15, nullable=true)
     */
    private $telefonecomercial;

    /**
     * @var string
     *
     * @ORM\Column(name="Celular", type="string", length=15, nullable=true)
     */
    private $celular;

    /**
     * @var string
     *
     * @ORM\Column(name="Endereco", type="string", length=100, nullable=true)
     */
    private $endereco;

    /**
     * @var string
     *
     * @ORM\Column(name="Cidade", type="string", length=50, nullable=true)
     */
    private $cidade;

    /**
     * @var string
     *
     * @ORM\Column(name="Bairro", type="string", length=50, nullable=true)
     */
    private $bairro;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=150, nullable=true)
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="CEP", type="string", length=15, nullable=true)
     */
    private $cep;

    /**
     * @var string
     *
     * @ORM\Column(name="CNPJ", type="string", length=50, nullable=true)
     */
    private $cnpj;

    /**
     * @var string
     *
     * @ORM\Column(name="CPF", type="string", length=50, nullable=true)
     */
    private $cpf;

    /**
     * @var boolean
     *
     * @ORM\Column(name="Atendimento", type="boolean", nullable=true)
     */
    private $atendimento = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="RazaoSocial", type="string", length=100, nullable=true)
     */
    private $razaosocial;

    /**
     * @var string
     *
     * @ORM\Column(name="InscricaoEstadual", type="string", length=20, nullable=true)
     */
    private $inscricaoestadual;

    /**
     * @var string
     *
     * @ORM\Column(name="InscricaoMunicipal", type="string", length=20, nullable=true)
     */
    private $inscricaomunicipal;

    /**
     * @var string
     *
     * @ORM\Column(name="paginaweb", type="string", length=50, nullable=true)
     */
    private $paginaweb;

    /**
     * @var string
     *
     * @ORM\Column(name="msn", type="string", length=50, nullable=true)
     */
    private $msn;

    /**
     * @var string
     *
     * @ORM\Column(name="Observacoes", type="string", length=255, nullable=true)
     */
    private $observacoes;

    /**
     * @var string
     *
     * @ORM\Column(name="UF", type="string", length=3, nullable=true)
     */
    private $uf;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="DataCadastro", type="date", nullable=true)
     */
    private $datacadastro;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="DataAniversario", type="date", nullable=true)
     */
    private $dataaniversario;

    /**
     * @var string
     *
     * @ORM\Column(name="NomeTerceiro", type="string", length=50, nullable=true)
     */
    private $nometerceiro;

    /**
     * @var string
     *
     * @ORM\Column(name="Atividade", type="string", length=20, nullable=true)
     */
    private $atividade;

    /**
     * @var string
     *
     * @ORM\Column(name="Telefoneterceiro", type="string", length=15, nullable=true)
     */
    private $telefoneterceiro;

    /**
     * @var integer
     *
     * @ORM\Column(name="QuantidadeMinima", type="integer", nullable=true)
     */
    private $quantidademinima = '0';

    /**
     * @var integer
     *
     * @ORM\Column(name="PrazoEntrega", type="integer", nullable=true)
     */
    private $prazoentrega = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="Cargo", type="string", length=200, nullable=true)
     */
    private $cargo;

    /**
     * @var boolean
     *
     * @ORM\Column(name="Tipo", type="boolean", nullable=true)
     */
    private $tipo = '1';

    /**
     * @var string
     *
     * @ORM\Column(name="PlacaVeiculo", type="string", length=10, nullable=true)
     */
    private $placaveiculo;

    /**
     * @var string
     *
     * @ORM\Column(name="RntcVeiculo", type="string", length=100, nullable=true)
     */
    private $rntcveiculo;

    /**
     * @var string
     *
     * @ORM\Column(name="UfVeiculo", type="string", length=2, nullable=true)
     */
    private $ufveiculo;

    /**
     * @var string
     *
     * @ORM\Column(name="PlacaReboque", type="string", length=10, nullable=true)
     */
    private $placareboque;

    /**
     * @var string
     *
     * @ORM\Column(name="RntcReboque", type="string", length=100, nullable=true)
     */
    private $rntcreboque;

    /**
     * @var string
     *
     * @ORM\Column(name="UfReboque", type="string", length=2, nullable=true)
     */
    private $ufreboque;

    /**
     * @var string
     *
     * @ORM\Column(name="NumeroEndereco", type="string", length=20, nullable=true)
     */
    private $numeroendereco = '';

    /**
     * @var string
     *
     * @ORM\Column(name="Complemento", type="string", length=50, nullable=true)
     */
    private $complemento = '';

    /**
     * @var boolean
     *
     * @ORM\Column(name="classificacao", type="boolean", nullable=true)
     */
    private $classificacao = '1';

    /**
     * @var boolean
     *
     * @ORM\Column(name="TipoPessoa", type="boolean", nullable=true)
     */
    private $tipopessoa = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="Banco", type="string", length=50, nullable=true)
     */
    private $banco;

    /**
     * @var string
     *
     * @ORM\Column(name="Agencia", type="string", length=50, nullable=true)
     */
    private $agencia;

    /**
     * @var string
     *
     * @ORM\Column(name="Conta", type="string", length=50, nullable=true)
     */
    private $conta;

    /**
     * @var string
     *
     * @ORM\Column(name="CondicoesPagamento", type="string", length=255, nullable=true)
     */
    private $condicoespagamento;

    /**
     * @var float
     *
     * @ORM\Column(name="LimiteCredito", type="float", precision=10, scale=3, nullable=true)
     */
    private $limitecredito = '0.000';

    /**
     * @var string
     *
     * @ORM\Column(name="SituacaoFiscal", type="string", length=150, nullable=true)
     */
    private $situacaofiscal = 'Simples Nacional';

    /**
     * @var boolean
     *
     * @ORM\Column(name="replicadoOnline", type="boolean", nullable=true)
     */
    private $replicadoonline = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="NomeContato", type="string", length=100, nullable=true)
     */
    private $nomecontato;

    /**
     * @var string
     *
     * @ORM\Column(name="telefoneContato", type="string", length=15, nullable=true)
     */
    private $telefonecontato;

    /**
     * @var string
     *
     * @ORM\Column(name="funcaoContato", type="string", length=50, nullable=true)
     */
    private $funcaocontato;


}
