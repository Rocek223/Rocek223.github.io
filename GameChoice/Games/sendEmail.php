function console_log($output, $with_script_tags = true) {
    $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . ');';
    if ($with_script_tags) {
        $js_code = '<script>' . $js_code . '</script>';
    }
    echo $js_code;
}

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

$to = 'zahonw@gmail.com';
$subject = 'Page contents';
$body = $_GET['body']
$headers = prepare_mail_headers();
mail($to, $subject, $body, $headers);

console_log("SAS")
