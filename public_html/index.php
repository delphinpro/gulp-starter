<?

define( 'DIR_ROOT', __DIR__ );
?><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Site preview</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	
	<style>
@charset "UTF-8";
/*! DO NOT CHANGE THIS FILE!!! Built in SASS. */
/*! Этот файл не нужно подключать на сайт. Используется только для превью верстки. */
/*! Пока не придумал как его организовать, чтобы не мешался :) */
body {
  background: #ffffff;
  font-size: 16px;
  line-height: 22px;
  font-family: Consolas, "Consolas", "Lucida Console", Monaco, monospace;
  padding: 0;
  margin: 0; }

a {
  color: #389ac6; }

::-moz-selection {
  text-shadow: none !important;
  color: #fff;
  background: #408aff; }

::selection {
  text-shadow: none !important;
  color: #fff;
  background: #408aff; }


.system-side {
  background: #3C3F41;
  bottom: 0;
  box-shadow: 0 0 10px -5px gray;
  box-sizing: border-box;
  left: 0;
  padding: 20px;
  position: fixed;
  top: 0;
  width: 250px; }

.system-preview {
  display: none; }

.system-preview-frame {
  position: relative; }

.system-preview-iframe {
  position: absolute;
  background: #fff; }
  .system-preview-iframe::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background: transparent;
    position: fixed; }
    .system-preview-iframe::-webkit-scrollbar:vertical {
      display: none; }
  .system-preview-iframe::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.75);
    width: 4px;
    height: 4px; }

.system-menu {
  padding: 0;
  margin: 0;
  list-style: none; }
  .system-menu li a {
    display: inline-block;
    padding: 3px 0;
    color: #eee; }
  .system-menu li.system-menu__item_active a {
    color: #389ac6; }

.system-content {
  margin-left: 250px;
  padding: 20px; }

.system-list-files {
  display: table;
  padding: 0;
  width: 100%; }
  .system-list-files__row {
    display: table-row; }
    .system-list-files__row:nth-child(2n+1) {
      background: #fafafa; }
  .system-list-files__cell {
    display: table-cell;
    padding: 0.2em 0.2em; }
    .system-list-files__cell._1 {
      padding-right: 2em; }

@media (max-width: 960px) {
  .system-list-files {
    display: block; }
    .system-list-files__row {
      display: block; }
    .system-list-files__cell {
      display: block; }
      .system-list-files__cell._1 {
        padding-bottom: 0; }
      .system-list-files__cell._2 {
        display: none;
        padding-top: 0;
        padding-left: 3em; } }

@media (max-width: 600px) {
  .system-side {
    display: none; }
  .system-content {
    margin-left: 0; } }


.ctx-system-view-iphone .system-preview {
  display: block;
  position: fixed;
  left: 250px;
  top: 0;
  padding-top: 20px;
  padding-left: 20px; }

.ctx-system-view-iphone .system-preview-frame {
  width: 366px;
  height: 746px;
  background: url(/app/system/frame-iphone.png); }

.ctx-system-view-iphone .system-preview-iframe {
  width: 320px;
  height: 568px;
  left: 24px;
  top: 84px; }

.ctx-system-view-iphone .system-content {
  margin-left: 636px; }

@media (max-width: 1200px) {
  .ctx-system-view-iphone .system-list-files {
    display: block; }
    .ctx-system-view-iphone .system-list-files__row {
      display: block; }
    .ctx-system-view-iphone .system-list-files__cell {
      display: block; }
      .ctx-system-view-iphone .system-list-files__cell._1 {
        padding-bottom: 0; }
      .ctx-system-view-iphone .system-list-files__cell._2 {
        display: none;
        padding-top: 0;
        padding-left: 3em; } }

@media (max-width: 960px) {
  .ctx-system-view-iphone .system-side {
    width: 90px; }
  .ctx-system-view-iphone .system-preview {
    left: 90px; }
  .ctx-system-view-iphone .system-content {
    margin-left: 476px; }
  .ctx-system-view-iphone .system-menu {
    display: none; } }

@media (max-width: 730px) {
  .ctx-system-view-iphone .system-side {
    width: 100%;
    height: 90px; }
  .ctx-system-view-iphone .system-preview {
    top: 90px;
    left: 0; }
  .ctx-system-view-iphone .system-content {
    padding-top: 90px;
    margin-left: 386px; } }

@media (max-width: 767px) {
  .ctx-system-view-iphone .system-side {
    display: none; }
  .ctx-system-view-iphone .system-preview {
    display: none; }
  .ctx-system-view-iphone .system-content {
    padding-top: 0;
    margin-left: 0; } }

.ctx-system-view-iphone-landscape .system-preview {
  display: block;
  position: fixed;
  left: 250px;
  top: 0;
  right: 0;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  background: #ffffff; }

.ctx-system-view-iphone-landscape .system-preview-frame {
  width: 746px;
  height: 366px;
  background: url(/app/system/frame-iphone-landscape.png); }

.ctx-system-view-iphone-landscape .system-preview-iframe {
  width: 568px;
  height: 320px;
  left: 84px;
  top: 24px; }

.ctx-system-view-iphone-landscape .system-content {
  padding-top: 406px; }

@media (max-width: 1030px) {
  .ctx-system-view-iphone-landscape .system-side {
    width: 90px; }
  .ctx-system-view-iphone-landscape .system-menu {
    display: none; }
  .ctx-system-view-iphone-landscape .system-preview {
    left: 90px; }
  .ctx-system-view-iphone-landscape .system-content {
    margin-left: 90px; } }

@media (max-width: 870px) {
  .ctx-system-view-iphone-landscape .system-side {
    width: 100%;
    height: 90px; }
  .ctx-system-view-iphone-landscape .system-preview {
    top: 90px;
    left: 0; }
  .ctx-system-view-iphone-landscape .system-content {
    padding-top: 496px;
    margin-left: 0; } }

@media (max-width: 767px) {
  .ctx-system-view-iphone-landscape .system-side {
    display: none; }
  .ctx-system-view-iphone-landscape .system-preview {
    display: none; }
  .ctx-system-view-iphone-landscape .system-content {
    padding-top: 0;
    margin-left: 0; } }

#files_list {
  line-height: normal; }
  #files_list li span {
    padding-bottom: 1em;
    display: block;
    color: #777;
    font-size: 0.85em;
    font-style: italic; }
  @media (min-width: 480px) {
    #files_list {
      display: table; }
      #files_list li {
        display: table-row; }
        #files_list li a, #files_list li span {
          display: table-cell; }
        #files_list li span {
          padding-left: 1.5em; } }
  @media (min-width: 768px) {
    #files_list li span {
      padding-bottom: 0.5em; } }

	</style>
</head>
<body class="ctx-system-view-computer">

<div class="system-content">
<?
$files = glob(DIR_ROOT.DIRECTORY_SEPARATOR.'*.html');
sort($files);

echo '<ol id="files_list">';
foreach ($files as $file) {
    $content = file_get_contents($file);
    $title = '';
    if (preg_match('#<title>(.*)</title>#', $content, $result)) {
        $title = htmlspecialchars($result[1]);
    }
	$file = basename($file);
	echo '<li><a href="'.$file.'#dev">'.$file.'</a><span>'.$title.'</span></li>';
}
echo '</ol>';
?>
</div>

</body>
</html>