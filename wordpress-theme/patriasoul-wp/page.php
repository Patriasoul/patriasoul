<?php get_header(); ?>
<?php
$slug = get_post_field('post_name', get_queried_object_id());
$config = ps_portal_page_config($slug);
?>
<main class="ps-archive-wrap">
<div class="ps-wrap">
<nav class="ps-breadcrumb"><a href="<?php echo esc_url(home_url('/')); ?>">Početna</a><span>›</span><?php the_title(); ?></nav>
<?php if ($config) : ?>
<header class="ps-archive-header"><div class="eyebrow">PatriaSoul · <?php echo esc_html($config['title']); ?></div><h1><?php echo esc_html($config['title']); ?></h1><p class="ps-archive-description"><?php echo esc_html($config['intro']); ?></p></header>
<?php if (have_posts()) : while (have_posts()) : the_post(); if (trim(get_the_content())) : ?><div class="ps-page-intro"><?php the_content(); ?></div><?php endif; endwhile; endif; ?>
<?php $featured = ps_portal_section_query($slug, 4); if ($featured->have_posts()) : ?>
<section class="ps-category-featured"><div class="ps-portal-section__head"><div><span class="eyebrow">U fokusu</span><h2>Istaknuto iz <?php echo esc_html($config['title']); ?></h2></div></div><div class="ps-portal-grid ps-portal-grid--standard"><?php while($featured->have_posts()):$featured->the_post();ps_portal_render_card(get_the_ID(),'standard');endwhile;wp_reset_postdata(); ?></div></section>
<?php endif; ?>
<?php foreach ((array)$config['children'] as $child) : $cat=get_category_by_slug($child); if(!$cat || is_wp_error($cat)) continue; $q=ps_portal_category_query($child,4); if(!$q->have_posts()) continue; ?>
<section class="ps-category-latest"><div class="ps-portal-section__head"><div><span class="eyebrow">Tematska rubrika</span><h2><?php echo esc_html($cat->name); ?></h2></div><a class="ps-btn ps-btn-ghost" href="<?php echo esc_url(get_category_link($cat->term_id)); ?>">Pogledaj sve →</a></div><div class="ps-portal-grid ps-portal-grid--standard"><?php while($q->have_posts()):$q->the_post();ps_portal_render_card(get_the_ID(),'standard');endwhile;wp_reset_postdata(); ?></div></section>
<?php endforeach; ?>
<?php else : ?>
<header class="ps-archive-header"><div class="eyebrow">PatriaSoul</div><h1><?php the_title(); ?></h1></header>
<?php if(have_posts()):while(have_posts()):the_post(); ?><article class="ps-single-content"><?php the_content(); ?></article><?php endwhile; endif; ?>
<?php endif; ?>
</div></main>
<?php get_footer(); ?>