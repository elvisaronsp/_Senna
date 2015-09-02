<html>
<head>


</head>
<body>
<form action="<?php $_SERVER['PHP_SELF'] ?>" method="post">
    <textarea cols="90" rows="20" id="campo" name="campo"></textarea>
    <input type="submit" value="Enviar" name="Enviar">
</form>

</body>
</html>

<?php
if (isset($_POST['campo'])) {
    $string = $_POST['campo'];
    $string = str_replace("input", "", $string);
    $string = str_replace("<", "", $string);
    $string = str_replace("/", "", $string);
    $string = str_replace(">", "", $string);


    $string = explode(" ", $string);
    $string = array_filter($string);

    $name = "";
    foreach ($string as $key => $value) {
        $elementos = explode('="', $value);
        if ($elementos[0] == "name") {
            $name = $elementos[1] = str_replace('"', "", $elementos[1]);
        }
    }


    foreach ($string as $key => $value) {
        $elementos = explode('="', $value);
        if ($elementos[0] == "type") {
            $elementos[1] = str_replace('"', "", $elementos[1]);
            if ($elementos[1] == "hidden") {
                echo "&#36;hidden = new \Zend\Form\Element\Hidden('$name');<br /> ";
            }
            if ($elementos[1] == "text") {
                echo "&#36;input = new \Zend\Form\Element\Text('$name');<br /> ";
            }
        }
    }

    $cont = 0;
    foreach ($string as $key => $value) {
        $elementos = explode('="', $value);
        if ($elementos[0] != "type") {
            $elementos[1] = str_replace('"', "", $elementos[1]);
            if ($elementos[0] != "value") {
                if ($cont == 0) {
                    echo "&#36;input->setAttribute('$elementos[0]','$elementos[1]')<br /> ";
                    $cont++;
                } else {
                    echo "->setAttribute('$elementos[0]','$elementos[1]')<br /> ";
                }

            } else {
                $valor =  "->setValue('$elementos[1]');<br /> ";
            }
        }
    }
    echo $valor;
    echo "&#36;this->add(&#36;input);";


}
?>



