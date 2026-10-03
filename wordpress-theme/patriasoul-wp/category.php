<?php get_header(); ?>
<?php
$cat=get_queried_object();
$featured=ps_portal_featured_category_query($cat->term_id,4);
$featured_ids=$featured->posts?wp_list_pluck($featured->posts,'ID'):array();
$latest_ids=$featured_ids;
$related=ps_portal_related_query($featured_ids?reset($featured_ids):0,4);
?>
<main class="ps-archive-wrap"><div class="ps-wrap">
<nav class="ps-breadcrumb"><a href="<?php echo esc_url(home_url('/')); ?>">Početna</a><span>›</span><?php single_cat_title(); ?></nav>
<header class="ps-archive-header"><div class="eyebrow">PatriaSoul · Rubrika</div><h1><?php single_cat_title(); ?></h1><?php echo wp_kses_post(category_description()); ?></header>

<?php if($featured->have_posts()): ?>
<section class="ps-category-featured"><div class="ps-portal-section__head"><div><span class="eyebrow">U fokusu</span><h2>Istaknuto</h2></div></div><div class="ps-portal-grid ps-portal-grid--standard">
<?php while($featured->have_posts()):$featured->the_post();ps_portal_render_card(get_the_ID(),'standard');endwhile;wp_reset_postdata(); ?>
</div></section>
<?php endif; ?>

<?php if(have_posts()): ?>
<section class="ps-category-latest"><div class="ps-portal-section__head"><div><span class="eyebrow">Kronološki</span><h2>Najnovije</h2></div></div>
<div class="ps-archive-grid"><?php while(have_posts()):the_post();ps_portal_render_card(get_the_ID(),'standard');endwhile; ?></div>
<?php the_posts_pagination(array('mid_size'=>1,'prev_text'=>'← Prethodno','next_text'=>'Sljedeće →')); ?></section>
<?php endif; ?>

<?php
$subcats=get_categories(array('parent'=>$cat->term_id,'hide_empty'=>true));
if($subcats):
?>
<section class="ps-category-latest"><div class="ps-portal-section__head"><div><span class="eyebrow">Podrubrike</span><h2>Istraži rubriku</h2></div></div>
<div class="ps-more-links">
<?php foreach($subcats as $sub): ?><a href="<?php echo esc_url(get_category_link($sub->term_id)); ?>"><?php echo esc_html($sub->name); ?><span>→</span></a><?php endforeach; ?>
</div></section>
<?php endif; ?>
</div></main><?php get_footer(); ?>