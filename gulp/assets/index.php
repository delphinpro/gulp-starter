<!DOCTYPE html>
<html>
<?
function getPluralForm($n, $forms)
{
    $index = ($n % 10 == 1 && $n % 100 != 11 ? 0 : $n % 10 >= 2 && $n % 10 <= 4 && ($n % 100 < 10 || $n % 100 >= 20) ? 1 : 2);

    return $forms[$index];
}

?>
<head>
    <meta charset="utf-8">
    <title>Site preview</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            background: #eee;
            font-size: 16px;
            line-height: 22px;
            font-family: Consolas, "Consolas", "Lucida Console", Monaco, monospace;
            padding: 0;
            margin: 0;
        }

        a {
            color: #389ac6;
        }

        a:hover {
            color: #266485;
        }

        h1 {
            margin: 0;
            font-weight: 400;
        }

        h2 {
            margin: 0;
            font-weight: 400;
        }

        .header {
            background: #ee6e73;
            box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
            color: #ffffff;
            padding: 20px;
        }

        .block {
            background: #fff;
            box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            padding: 20px;
        }

        .container {
            max-width: 800px;
            margin: auto;
        }

        ::-moz-selection {
            text-shadow: none !important;
            color: #fff;
            background: #408aff;
        }

        ::selection {
            text-shadow: none !important;
            color: #fff;
            background: #408aff;
        }

        #files {
            margin: 0.5rem 0 1rem 0;
            border: 1px solid #e0e0e0;
            border-radius: 2px;
            overflow: hidden;
            position: relative;
            line-height: normal;
            width: 100%;
            list-style: none;
            padding: 0;
        }

        #files > li {
            background-color: #fff;
            line-height: 1.5rem;
            padding: 10px 20px;
            margin: 0;
            border-bottom: 1px solid #e0e0e0;
            display: block;
            transition: .25s;
            color: #26a69a;
        }

        #files > li > .title {
            display: block;
            color: #777;
            font-size: 0.85em;
            font-style: italic;
        }

        #files > li > .check-it {
            display: none;
        }

        #files > li .check-it-in {
            display: flex;
        }

        #files > li .check-it-in > a {
            display: block;
            text-indent: -9999px;
            overflow: hidden;
            border: 1px solid #389AC6;
            width: 60px;
            height: 26px;
            margin: 0 1px;
        }

        #files > li .check-it-in > a.w3c {
            background: url('data:image/png;base64,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') no-repeat center;
            background-size: contain;
        }

        #files > li .check-it-in > a.psi {
            background: url('data:image/png;base64,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') no-repeat center;
            background-size: contain;
        }

        .list-footer {
            color: #cccccc;
        }

        @media (min-width: 480px) {
            #files > li > .check-it {
                display: block;
                font-size: 0.65em;
                font-style: italic;
                position: absolute;
                right: 20px;
                top: 10px;
            }

            #files > li {
                position: relative;
            }
        }

        @media (min-width: 768px) {
            #files {
                display: table;
                /*table-layout: fixed;*/
            }

            #files > li {
                display: table-row;
            }

            #files > li > .link,
            #files > li > .title,
            #files > li > .check-it {
                display: table-cell;
                border-bottom: 1px solid #e0e0e0;
                padding: 10px 20px;
                position: static;
            }

            #files > li > .title {
                width: 60%;
            }

            #files > li > .check-it {
                width: 100px;
                /*text-align: right;*/
                /*white-space: nowrap;*/
            }
        }
    </style>
</head>
<body>

<div class="header">
    <div class="container">
        <h1>Список файлов</h1>
    </div>
</div>

<div class="container">

    <div class="block content">
        <h2>Страницы</h2>
        <?
        $files = glob(__DIR__ . DIRECTORY_SEPARATOR . '*.html');
        sort($files); ?>

        <ol id="files">
            <?
            foreach ($files as $file) {
                $content = file_get_contents($file);
                $title = '';
                if (preg_match('#<title>(.*)</title>#', $content, $result)) {
                    $title = htmlspecialchars($result[1]);
                }
                $file = basename($file);
                ?>
                <li>
                    <a class="link"
                       href="<?= $file ?>"><?= $file ?></a>

                    <span class="title"><?= $title ?></span>

                    <span class="check-it">
                    <span class="check-it-in">
                        <a class="w3c"
                           href="https://validator.w3.org/nu/?showoutline=yes&doc=<?= urlencode($_SERVER['REQUEST_SCHEME']) ?>://<?= $_SERVER['HTTP_HOST'] ?>/<?= $file ?>"
                           target="_blank">check it</a>

                        <a class="psi"
                           href="https://developers.google.com/speed/pagespeed/insights/?hl=ru&url=<?= urlencode($_SERVER['REQUEST_SCHEME']) ?>://<?= $_SERVER['HTTP_HOST'] ?>/<?= $file ?>"
                           target="_blank">check it</a>
                    </span>
                    </span>
                </li>
                <?
            }
            ?>
        </ol>
        <div class="list-footer"><?= count($files) ?>
            страниц<?= getPluralForm(count($files), array('а', 'ы', '')) ?></div>
    </div>
</div>

</body>
</html>