<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	require 'phpmailer/src/SMTP.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	/*
	$mail->isSMTP();                                            //Send using SMTP
	$mail->Host       = 'smtp.example.com';                     //Set the SMTP server to send through
	$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
	$mail->Username   = 'user@example.com';                     //SMTP username
	$mail->Password   = 'secret';                               //SMTP password
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
	$mail->Port       = 465;                 
	*/

	//От кого письмо
	$mail->setFrom($_POST['email'], $_POST['name']); // Указать нужный E-mail
	//Кому отправить
	$mail->addAddress('to@gmail.com'); // Указать нужный E-mail
	//Тема письма
	$mail->Subject = 'Новый клиент';

	//Тело письма
	$body = '<h1>Новый клиент</h1>';

	if(trim(!empty($_POST['name']))) {
		$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
  }
	if(trim(!empty($_POST['phone']))) {
		$body.='<p><strong>Имя:</strong> '.$_POST['phone'].'</p>';
  }
	if(trim(!empty($_POST['email']))) {
		$body.='<p><strong>Имя:</strong> '.$_POST['email'].'</p>';
  }

	$mail->Body = $body;

	//Отправляем
	if (!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	// echo json_encode($response);
?>