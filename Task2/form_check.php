<?php

session_start();

$answer=$_SESSION['captcha_text'];


	if(!empty($_POST["captcha_challenge"]))
	{
		if($answer==$_POST["captcha_challenge"])
		{
			header("Location:success.php");
		}
		else
			header("Location:error.php");
	}
	else
			header("Location:error.php");
?>