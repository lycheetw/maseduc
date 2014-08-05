<?
header("Content-Type:text/html; charset=utf-8");

require("db.cfg");

$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
if ($mysqli->connect_errno) {
	printf("Connect failed: %s\n", $mysqli->connect_error);
	exit();
}
$mysqli->set_charset("utf8");

if (empty($_GET["city"]))
	$city = "高雄市";
else
	$city = $_GET["city"];
$sql1 = "SELECT * FROM  `basicinfo` LEFT JOIN `elementary101` ON `basicinfo`.`code` = `elementary101`.`code` WHERE `city` = '{$city}' AND `type` = '國小' AND flag >= 1";
$sql2 = "SELECT * FROM  `basicinfo` LEFT JOIN `junior101` ON `basicinfo`.`code` = `junior101`.`code` WHERE `city` = '{$city}' AND `type` = '國中'  AND flag >= 1";


$ary = array();

if ($result = $mysqli->query($sql1)) {

	/* fetch associative array */
	while ($row = $result->fetch_assoc()) {
		$row["lat"] = (float)$row["lat"];
		$row["lng"] = (float)$row["lng"];
		array_push($ary,$row);
	}

	/* free result set */
	$result->free();
}


if ($result = $mysqli->query($sql2)) {

	/* fetch associative array */
	while ($row = $result->fetch_assoc()) {
		$row["lat"] = (float)$row["lat"];
		$row["lng"] = (float)$row["lng"];
		array_push($ary,$row);
	}

	/* free result set */
	$result->free();
}
/* close connection */
$mysqli->close();

echo json_encode($ary);
?>