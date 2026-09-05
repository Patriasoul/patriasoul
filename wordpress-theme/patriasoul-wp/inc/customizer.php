<?php
if(!defined('ABSPATH'))exit;
function ps_customizer($c){
$c->add_panel('ps_home',array('title'=>'PatriaSoul - Naslovnica','priority'=>25));
$c->add_section('ps_hero',array('title'=>'Hero','panel'=>'ps_home'));$c->add_section('ps_cards',array('title'=>'Slike kartica','panel'=>'ps_home'));
$c->add_setting('ps_hero_image',array('default'=>0,'sanitize_callback'=>'absint'));$c->add_control(new WP_Customize_Media_Control($c,'ps_hero_image',array('label'=>'Hero slika','section'=>'ps_hero','mime_type'=>'image')));
$c->add_setting('ps_hero_title',array('default'=>'Hrvatska. Povijest. Znanje. Identitet.','sanitize_callback'=>'sanitize_text_field'));$c->add_control('ps_hero_title',array('label'=>'Hero naslov','section'=>'ps_hero','type'=>'text'));
$c->add_setting('ps_hero_text',array('default'=>'Digitalni prostor koji povezuje hrvatsku povijest, baštinu, vjeru, gradove, branitelje i znanje.','sanitize_callback'=>'sanitize_textarea_field'));$c->add_control('ps_hero_text',array('label'=>'Hero opis','section'=>'ps_hero','type'=>'textarea'));
foreach(ps_cards() as $k=>$v){$c->add_setting('ps_img_'.$k,array('default'=>0,'sanitize_callback'=>'absint'));$c->add_control(new WP_Customize_Media_Control($c,'ps_img_'.$k,array('label'=>$v[1].' - slika','section'=>'ps_cards','mime_type'=>'image')));}}
add_action('customize_register','ps_customizer');
