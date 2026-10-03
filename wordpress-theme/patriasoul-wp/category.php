<?php get_header(); ?>
<main class="ps-archive-wrap"><div class="ps-wrap">
<nav class="ps-breadcrumb"><a href="<?php echo esc_url(home_url('/')); ?>">Početna</a><span>›</span><?php single_cat_title(); ?></nav>
<header class="ps-archive-header"><div class="eyebrow">Kategorija</div><h1><?php single_cat_title(); ?></h1><?php echo wp_kses_post(category_description()); ?></header>
<?php $featured=ps_portal_featured_query(4); if($featured->have_posts()): ?><section class="ps-category-featured"><div class="ps-portal-section__head"><h2>Istaknuto</h2></div><div class="ps-portal-grid ps-portal-grid--standard"><?php while($featured->have_posts()):$featured->the_post();ps_portal_render_card(get_the_ID(),'standard');endwhile;wp_reset_postdata(); ?></div></section><?php endif; ?>
<?php if(have_posts()): ?><section class="ps-category-latest"><div class="ps-portal-section__head"><h2>Najnovije</h2></div><div class="ps-archive-grid"><?php while(have_posts()):the_post();ps_portal_render_card(get_the_ID(),'standard');endwhile; ?></div><?php the_posts_pagination(array('mid_size'=>1,'prev_text'=>'← Prethodno','next_text'=>'Sljedeće →')); ?></section><?php endif; ?>
</div></main><?php get_footer(); ?>