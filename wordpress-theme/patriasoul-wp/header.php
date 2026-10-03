<!doctype html><html <?php language_attributes(); ?>><head><meta charset="<?php bloginfo('charset'); ?>"><meta name="viewport" content="width=device-width,initial-scale=1"><?php wp_head(); ?></head><body <?php body_class(); ?>><?php wp_body_open(); ?>
<header class="ps-header"><div class="ps-wrap ps-header-inner">
<a class="ps-brand" href="<?php echo esc_url(home_url('/')); ?>"><?php if(has_custom_logo()){the_custom_logo();}else{echo '<span>🇭🇷</span>';} ?><span>PATRIA<strong>SOUL</strong></span></a>
<button class="ps-menu" aria-label="Otvori izbornik" aria-expanded="false">☰</button>
<nav class="ps-nav" aria-label="Glavna navigacija">
<a href="<?php echo esc_url(home_url('/')); ?>">Početna</a>
<a href="<?php echo esc_url(home_url('/domovina/')); ?>">Domovina <span>▼</span></a>
<a href="<?php echo esc_url(home_url('/branitelji/')); ?>">Branitelji <span>▼</span></a>
<a href="<?php echo esc_url(home_url('/povijest/')); ?>">Povijest <span>▼</span></a>
<a href="<?php echo esc_url(home_url('/bastina/')); ?>">Baština <span>▼</span></a>
<a href="<?php echo esc_url(home_url('/vjera/')); ?>">Vjera <span>▼</span></a>
<a href="<?php echo esc_url(home_url('/mediji/')); ?>">Mediji <span>▼</span></a>
<a href="<?php echo esc_url(home_url('/igra/')); ?>">Igra <span>▼</span></a>
<a href="<?php echo esc_url(home_url('/o-nama/')); ?>">O nama</a>
<a href="<?php echo esc_url(home_url('/kontakt/')); ?>">Kontakt</a>
</nav>
<div class="ps-header-search"><?php get_search_form(); ?></div>
</div></header>