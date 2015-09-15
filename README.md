## Senna (Melbourne)

> **Note:** Este repositorio embora publico é de uso particular. Favor não copiar o codigo aqui existente [Grupo Capital Ponto](https://grupocapitalponto.com.br).

## Install
git clone git@github.com:cdjdesenvolvimento/_Senna.git
cd _senna
php composer.phar self-update
php composer.phar install
cd vendor
git clone https://github.com/Infanatica/InfanaticaCepModule.git
cd..
copy subs/AbstractHelper.php vendor/zendframework/zendframework/library/Zend/Form/View/Helper
copy subs/ViaCepAdapter.php vendor/InfanaticaCepModule/src/InfanaticaCepModule/Adapter
copy subs/local.php config/autoload
cd public
cls
php -S 127.0.0.1:8080
cd

## Commit
git add --all
git commit -m "continuação"
git push -u origin master
cd



