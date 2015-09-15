## Senna (Melbourne)

> **Note:** Este repositorio embora publico é de uso particular. Favor não copiar o codigo aqui existente [Grupo Capital Ponto](https://grupocapitalponto.com.br).

## Install
cls
git clone git@github.com:cdjdesenvolvimento/_Senna.git <br/>
cd _senna<br/>
php composer.phar self-update<br/>
php composer.phar install<br/>
cd vendor<br/>
git clone https://github.com/Infanatica/InfanaticaCepModule.git<br/>
cd..<br/>
copy subs/AbstractHelper.php vendor/zendframework/zendframework/library/Zend/Form/View/Helper<br/>
copy subs/ViaCepAdapter.php vendor/InfanaticaCepModule/src/InfanaticaCepModule/Adapter<br/>
copy subs/local.php config/autoload<br/>
cd public<br/>
cls<br/>
php -S 127.0.0.1:8080<br/>
cd<br/>

## Commit
git add --all<br/>
git commit -m "continuação"<br/>
git push -u origin master<br/>
cd<br/>



