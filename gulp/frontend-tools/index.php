<?
/**
 * @author delphinpro <delphinpro@gmail.com>
 * @copyright copyright © 2017 delphinpro
 * @license licensed under the MIT license
 */

function getPluralForm($n, $forms)
{
  $index = ($n % 10 == 1 && $n % 100 != 11 ? 0 : $n % 10 >= 2 && $n % 10 <= 4 && ($n % 100 < 10 || $n % 100 >= 20) ? 1 : 2);

  return $forms[$index];
}

function ext($file)
{
  return pathinfo($file, PATHINFO_EXTENSION);
}

function getTitleHtmlPage($file)
{
  $content = file_get_contents($file);
  if (preg_match('#<title>(.*)</title>#', $content, $result)) {
    return htmlspecialchars(strip_tags($result[1]));
  } else {
    return '';
  }
}

const DS = DIRECTORY_SEPARATOR;
const DIR_DOCS = 'docs';
const INDEX_DOC = 'README.md';

$TITLE = $_SERVER['HTTP_HOST'];

$HTML = null;
$docList = null;
$pages = [];
$files = [];
$dirs = [];

if (isset($_GET['doc'])) {
  $doc = ($_GET['doc'] === '')
      ? INDEX_DOC
      : trim(str_replace(['..', '\\'], '', $_GET['doc']), '/');

  if (empty($doc) or ext($doc) !== 'md') {
    echo '<head><meta http-equiv="refresh" content="3;URL=?doc=">';
    echo '<body><h1>Invalid request. Redirect in 3 seconds...</h1>';
    exit;
  }

  $pattern = '~\[[^\\]]+\](\(docs\\/)[^)]+\.md\)~';
  $pattern2 = '~\[[^\\]]*\](\(\\.\\.\\/source\\/)[^)]+\)~';
  $docFile = __DIR__ . DS . DIR_DOCS . DS . $doc;

  if (file_exists($docFile) && is_readable($docFile)) {
    $markdown = file_get_contents($docFile);

    $markdown = preg_replace_callback($pattern, function ($match) {
      return str_replace($match[1], '(?doc=', $match[0]);
    }, $markdown);

    preg_match($pattern2, $markdown, $matches);

    $markdown = preg_replace_callback($pattern2, function ($match) {
      return str_replace($match[1], '(design/', $match[0]);
    }, $markdown);
//    echo '<body><pre>';
//    print_r($pattern2);
//    print_r($matches);
//    echo $markdown;
//    exit;
    /** @noinspection PhpIncludeInspection */
    require_once __DIR__ . DS . 'frontend-tools' . DS . 'Parsedown.php';
    $parser = new \Parsedown();
    $HTML = $parser->text($markdown);
    $TITLE = strtoupper($doc) . ' :: ' . $TITLE;
  } else {
    $docList = glob(__DIR__ . DS . DIR_DOCS . DS . '*.md');
    sort($docList);
    $TITLE = 'DOCS :: ' . $TITLE;
  }
} else {
  $pages = glob(__DIR__ . DS . '*.html');
  sort($pages);

  $files = array_diff(glob(__DIR__ . DS . '*.*'), $pages);
  sort($files);

  $dirs = glob(__DIR__ . DS . '*', GLOB_ONLYDIR);
  sort($dirs);
}

$DOC_EXISTS = is_dir(__DIR__ . DS . DIR_DOCS);

?><!DOCTYPE html>
<html>
<head>
  <title><?= $TITLE ?></title>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

  <link rel="stylesheet" href="frontend-tools/index.css">
</head>
<body>

<div class="page">
  <div class="page__header header">
    <div class="container">
      <h1><?= $_SERVER['HTTP_HOST'] ?></h1>
    </div>
  </div>

  <div class="page__main">
    <div class="container">

      <div class="panel">
        <?php if ($HTML) { ?>
          <div style="padding: 2rem;">
            <? if ($DOC_EXISTS) { ?>
              <a class="btn" href="/" onclick="history.back();return false;">Назад</a>
            <? } ?>
            <div class="markdown">
              <?= $HTML ?>
            </div>
          </div>
        <?php } else { ?>
          <? if ($DOC_EXISTS) { ?>
            <a class="btn" href="?doc=">Документация</a>
          <? } ?>
          <div class="files">
            <div class="files__group">
              <? foreach ($dirs as $file) { ?>
                <? if (basename($file) === DIR_DOCS) { ?>
                  <a class="files__item" href="?doc=">
                    <span class="files__cell files__icon"><i class="icon icon-folder"></i></span>
                    <span class="files__cell files__title"><?= basename($file) ?></span>
                    <span class="files__cell files__desc"></span>
                  </a>
                <? } else { ?>
                  <div class="files__item">
                    <span class="files__cell files__icon"><i class="icon icon-folder"></i></span>
                    <span class="files__cell files__title"><?= basename($file) ?></span>
                    <span class="files__cell files__desc"></span>
                  </div>
                <? } ?>
              <? } ?>
            </div>

            <div class="files__group">
              <? foreach ($pages as $file) { ?>
                <a class="files__item" href="<?= basename($file) ?>">
                  <span class="files__cell files__icon"><i class="icon icon-html"></i></span>
                  <span class="files__cell files__title"><?= basename($file) ?></span>
                  <span class="files__cell files__desc"><?= getTitleHtmlPage($file) ?></span>
                </a>
              <? } ?>
            </div>

            <div class="files__group">
              <? foreach ($files as $file) { ?>
                <? if (basename($file) != basename(__FILE__)) { ?>
                  <a class="files__item" href="<?= basename($file) ?>">
                    <span class="files__cell files__icon"><i class="icon icon-<?= ext($file) ?>"></i></span>
                    <span class="files__cell files__title"><?= basename($file) ?></span>
                    <span class="files__cell files__desc"></span>
                  </a>
                <? } ?>
              <? } ?>
            </div>
          </div>
          <div class="panel__footer">
            <div><?= count($pages) ?> страниц<?= getPluralForm(count($pages), array('а', 'ы', '')) ?></div>
            <div><?= count($files) - 1 ?> файл<?= getPluralForm(count($files) - 1, array('', 'а', 'ов')) ?></div>
            <div><?= count($dirs) ?> директор<?= getPluralForm(count($dirs), array('ия', 'ии', 'ий')) ?></div>
          </div>
        <?php } ?>

      </div>
    </div>
  </div>

  <div class="page__footer">
    <div class="footer">
      <div class="container">
        frontend-tools © 2017 <a href="http://delphinpro.ru" target="_blank">delphinpro</a>
      </div>
    </div>
  </div>
</div>

<!--suppress ALL -->
<script>
  // @formatter:off
  var p={t:function(){window.CSS&&window.CSS.supports&&window.CSS.supports('(--foo: red)')||(p.v={},p.b={},p.o={},p.f(),p.u());},f:function(){var a=document.querySelectorAll('style:not([id*="inserted"]),link[type="text/css"],link[rel="stylesheet"]'),b=1;[].forEach.call(a,function(a){var c;'STYLE'===a.nodeName?(c=a.innerHTML,p.i(a.innerHTML,function(c){a.innerHTML=c,p.s(c,b);})):'LINK'===a.nodeName&&(p.g(a.getAttribute('href'),b,function(a,b){p.i(b.responseText,function(b){p.s(b,a),p.o[a]=b,p.u();});}),c=''),p.o[b]=c,b++;});},s:function(a,b){p.b[b]=a.match(/([^var\/*])--[a-zA-Z0-9\-]+:(\s?)(.+?);/gim);},u:function(){p.r(p.b);for(var a in p.o){var b=p.c(p.o[a],p.v);if(document.querySelector('#inserted'+a))document.querySelector('#inserted'+a).innerHTML=b;else{var c=document.createElement('style');c.innerHTML=b,c.id='inserted'+a,document.getElementsByTagName('head')[0].appendChild(c);}}},c:function(a,b){for(var c in b){var d=new RegExp('var\\(\\s*?'+c.trim()+'(\\)|,([\\s\\,\\w]*\\)))','g');a=a.replace(d,b[c]);}for(var e=/var\(\s*?([^)^,.]*)(?:[\s,])*([^).]*)\)/g;match=e.exec(a);)a=a.replace(match[0],match[2]);return a;},r:function(a){for(var b in a){var c=a[b];c.forEach(function(a){var b=a.split(/:\s*/);p.v[b[0]]=b[1].replace(/;/,'');});}},g:function(a,b,c){var d=new XMLHttpRequest;d.open('GET',a,!0),d.overrideMimeType('text/css;'),d.onload=function(){d.status>=200&&d.status<400?'function'==typeof c&&c(b,d,a):console.warn('an error was returned from:',a);},d.onerror=function(){console.warn('we could not get anything from:',a);},d.send();},i:function(a,b){var d,c=/^(?![\/*])@import\s.*(?:url\(["'])([a-zA-Z0-9.:\/_-]*)["']\)?([^;]*);/gim,e=0,f=0,g={};for(a.search(c)===-1&&b(a);d=c.exec(a);)g[d[1]]=d,e++,p.g(d[1],null,function(c,d,h){a=a.replace(g[h][0],(g[h][2].trim()?'@media '+g[h][2].trim()+' {':'')+d.responseText+(g[h][2].trim()?'}':'')),f++,f===e&&b(a);})}};p.t();
  // @formatter:on
</script>
</body>
</html>