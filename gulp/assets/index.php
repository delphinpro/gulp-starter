<!DOCTYPE html>
<html>
<?
function getPluralForm($n, $forms)
{
    $index = ($n % 10 == 1 && $n % 100 != 11 ? 0 : $n % 10 >= 2 && $n % 10 <= 4 && ($n % 100 < 10 || $n % 100 >= 20) ? 1 : 2);

    return $forms[$index];
}

$time = 0;
$files = array();
$rii = new RecursiveIteratorIterator(new RecursiveDirectoryIterator(__DIR__ . DIRECTORY_SEPARATOR), TRUE);

/**
 * @var SplFileInfo $file
 */
foreach ($rii as $file) {
    if ($file->isFile()) {
        $fileTime = $file->getMTime();
        if ($fileTime > $time) {
            $time = $fileTime;
        }
        if ($rii->getDepth() === 0 && $file->getExtension() === 'html') {
            $basename = $file->getBasename($file);
            $content = file_get_contents($file->getRealPath());
            $title = $basename;
            if (preg_match('#<title>(.*)</title>#', $content, $result)) {
                $title = htmlspecialchars($result[1]);
            }

            $files[] = array(
                'basename' => $basename,
                'title' => $title,
                'w3c_link' => 'https://validator.w3.org/nu/?showoutline=yes&doc=http://' . $_SERVER['HTTP_HOST'] . '/' . $basename,
                'pis_link' => 'https://developers.google.com/speed/pagespeed/insights/?hl=ru&url=http://' . $_SERVER['HTTP_HOST'] . '/' . $basename,
            );
        }
//        echo str_repeat('---', $rii->getDepth()) . $rii->getDepth() . ' ' . $file . ' > ' . $file->getMTime() . '<br>';
    }
}

usort($files, function ($a, $b) {
    $key = 'basename';
    if ($a[$key] == $b[$key]) return 0;
    return $a[$key] > $b[$key] ? 1 : -1;
});

?>
<head>
    <meta charset="utf-8">
    <title>Site preview</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <link rel="stylesheet" href="dev-tools/dev.css">
</head>
<body class="index-page">

<div class="index-page__wrapper">
    <div class="index-page__header">
        <div class="index-page__container">
            <div class="index-page__row">
                <div class="index-page__col">
                    <h1>Список файлов
                        <small><?= $_SERVER['HTTP_HOST'] ?></small>
                    </h1>
                </div>
            </div>
        </div>
    </div>
    <div class="index-page__content">
        <div class="index-page__row">
            <div class="index-page__col">
                <div class="index-page__block">
                    <h2>Страницы</h2>
                    <? $counter = 1; ?>

                    <ol id="files">
                        <? foreach ($files as $file) { ?>
                            <li>
                                <span class="counter"><?= $counter++ ?></span>
                                <a class="link" href="<?= $file['basename'] ?>"><?= $file['basename'] ?></a>
                                <span class="title"><?= $file['title'] ?></span>
                                <span class="check-it">
                                    <span class="check-it-in">
                                        <a class="w3c" href="<?= $file['w3c_link'] ?>" target="_blank">check it</a>
                                        <a class="psi" href="<?= $file['pis_link'] ?>" target="_blank">check it</a>
                                    </span>
                                </span>
                            </li>
                        <? } ?>
                    </ol>
                    <div class="list-footer">
                        <div class="list-footer__left">
                            <?= count($files) ?> страниц<?= getPluralForm(count($files), array('а', 'ы', '')) ?>
                        </div>
                        <div class="list-footer__right">
                            <button id="switch-grid">Grid On/Off</button>
                        </div>
                    </div>
                    <div class="list-footer">
                        <div class="list-footer__left" style="font-size: 14px;">
                            обновлено <?= date('d-m-Y H:i:s', $time); ?>
                            (<?= date_default_timezone_get() ?>)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<? //echo '<pre>';?>
<? //print_r($_SERVER); ?>
<script src="dev-tools/dev.js"></script>
</body>
</html>