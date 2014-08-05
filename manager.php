<?
header("Content-Type:text/html; charset=utf-8");

require("db.cfg");

$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
if ($mysqli->connect_errno) {
	printf("Connect failed: %s\n", $mysqli->connect_error);
	exit();
}
$mysqli->set_charset("utf8");

if (empty($_GET["code"]))
	exit();

echo $_GET["code"];

if ($_GET["code"]=="reset") {
	$sql = "UPDATE `basicinfo` SET `flag` = '0'";
	$mysqli->query($sql);

}else if ($_GET["code"]=="set") {
	$sql = "UPDATE `basicinfo` SET `flag` = '1'";
	$mysqli->query($sql);
}

else {
	$code = explode(',',$_GET["code"]);
	foreach ($code as $key => $value) {
		$v = (int)$value;
		if ($v>0)
			$f = 1;
		else
			$f = 0;

		$v = abs($v);

		$sql = "UPDATE `basicinfo` SET `flag` = '{$f}' WHERE CONVERT( `basicinfo`.`code` USING utf8 ) = '{$v}' LIMIT 1 ";
		echo '<br>'.$sql;
		$mysqli->query($sql);
	}
}




$mysqli->close();


?>