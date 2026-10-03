<!doctype html><html <?php language_attributes(); ?>><head><meta charset="<?php bloginfo('charset'); ?>"><meta name="viewport" content="width=device-width,initial-scale=1"><?php wp_head(); ?></head><body <?php body_class(); ?>><?php wp_body_open(); ?>
<header class="ps-header"><div class="ps-wrap ps-header-inner">
<a class="ps-brand" href="<?php echo esc_url(home_url('/')); ?>"><?php if(has_custom_logo()){the_custom_logo();}else{echo '<span>🇭🇷</span>';} ?><span>PATRIA<strong>SOUL</strong></span></a>
<button class="ps-menu" type="button" aria-label="Otvori izbornik" aria-expanded="false">☰</button>
<nav class="ps-nav" aria-label="Glavna navigacija">
<?php
if (has_nav_menu('primary')) {
    wp_nav_menu(array('theme_location'=>'primary','container'=>false,'menu_class'=>'ps-menu-list','fallback_cb'=>false));
} else {
    $menus = array(
        'Domovina'=>array('/domovina/','Domovinski rat','/domovinski-rat/','Branitelji','/branitelji/'),
        'Branitelji'=>array('/branitelji/','Svjedočanstva','/category/svjedocanstva/','Životopisi','/category/zivotopisi/','Udruge i inicijative','/category/udruge-i-inicijative/','Obljetnice i komemoracije','/category/obljetnice-i-komemoracije/'),
        'Povijest'=>array('/povijest/'),
        'Baština'=>array('/bastina/','Povijesna baština','/category/povijesna-bastina/','Običaji i tradicija','/category/obicaji-i-tradicija/','Jezik i književnost','/category/jezik-i-knjizevnost/','Sakralna i kulturna baština','/category/sakralna-i-kulturna-bastina/','Obnova i zaštita','/category/obnova-i-zastita/'),
        'Vjera'=>array('/vjera/','Evanđelje','/evandelje/','Molitve','/molitve/','Svetci','/svetci/','Blagdani','/blagdani/'),
        'Mediji'=>array('/mediji/','Vijesti','/vijesti/','Aktualnosti','/aktualnosti/','Video','/video/','Galerija','/galerija/'),
        'Igra'=>array('/igra/','Hrvatski kviz','/quiz/','Brani svoj grad','/brani-svoj-grad/','Dnevni kviz','/dnevni-kviz/','Izazovi','/izazovi/')
    );
    echo '<a href="'.esc_url(home_url('/')).'">Početna</a>';
    foreach($menus as $label=>$items){
        echo '<div class="ps-nav-dropdown"><a class="ps-nav-parent" href="'.esc_url(home_url($items[0])).'">'.esc_html($label).' <span>▼</span></a>';
        if(count($items)>1){ echo '<div class="ps-nav-submenu">'; for($i=1;$i<count($items);$i+=2){echo '<a href="'.esc_url(home_url($items[$i+1])).'">'.esc_html($items[$i]).'</a>';} echo '</div>'; }
        echo '</div>';
    }
    echo '<a href="'.esc_url(home_url('/o-nama/')).'">O nama</a><a href="'.esc_url(home_url('/kontakt/')).'">Kontakt</a>';
}
?>
</nav>
<div class="ps-header-search"><?php get_search_form(); ?></div>
</div></header>