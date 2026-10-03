<?php get_header(); ?>
<?php
$slug = get_post_field('post_name', get_queried_object_id());
$config = ps_portal_page_config($slug);
?>
<main class="ps-archive-wrap">
<div class="ps-wrap">
<nav class="ps-breadcrumb"><a href="<?php echo esc_url(home_url('/')); ?>">Početna</a><span>›</span><?php the_title(); ?></nav>

<?php if ($config) : ?>
<header class="ps-archive-header">
    <div class="eyebrow">PatriaSoul · <?php echo esc_html($config['title']); ?></div>
    <h1><?php echo esc_html($config['title']); ?></h1>
    <p class="ps-archive-description"><?php echo esc_html($config['intro']); ?></p>
</header>

<?php if (have_posts()) : while (have_posts()) : the_post(); if (trim(get_the_content())) : ?>
<div class="ps-page-intro"><?php the_content(); ?></div>
<?php endif; endwhile; endif; ?>

<?php
$used = array();
$featured = ps_portal_section_query($slug, 5);
if ($featured->have_posts()) :
    $used = wp_list_pluck($featured->posts, 'ID');
?>
<section class="ps-category-featured">
    <div class="ps-portal-section__head">
        <div><span class="eyebrow">U fokusu</span><h2>Istaknuto iz <?php echo esc_html($config['title']); ?></h2></div>
    </div>
    <div class="ps-featured-grid ps-featured-grid--section">
        <?php $i=0; while($featured->have_posts()):$featured->the_post();$i++; ?>
        <article class="ps-featured-item ps-featured-item--<?php echo $i===1?'hero':'small'; ?>">
            <?php if(has_post_thumbnail()): ?><a class="ps-featured-item__media" href="<?php the_permalink(); ?>"><?php the_post_thumbnail('large',array('loading'=>'lazy')); ?></a><?php endif; ?>
            <div class="ps-featured-item__body"><div class="ps-portal-card__meta"><?php echo esc_html(get_the_date()); ?></div><h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3><?php if($i===1): ?><p><?php echo esc_html(wp_trim_words(get_the_excerpt(),28)); ?></p><?php endif; ?></div>
        </article>
        <?php endwhile; wp_reset_postdata(); ?>
    </div>
</section>
<?php endif; ?>

<?php foreach ((array)$config['children'] as $child) :
    $cat=get_category_by_slug($child);
    if(!$cat || is_wp_error($cat)) continue;
    $q=ps_portal_category_query($child,4,$used);
    if(!$q->have_posts()) continue;
    $ids=wp_list_pluck($q->posts,'ID');
    $used=array_merge($used,$ids);
?>
<section class="ps-category-latest">
    <div class="ps-portal-section__head">
        <div><span class="eyebrow">Tematska rubrika</span><h2><?php echo esc_html($cat->name); ?></h2></div>
        <a class="ps-btn ps-btn-ghost" href="<?php echo esc_url(get_category_link($cat->term_id)); ?>">Pogledaj sve →</a>
    </div>
    <div class="ps-portal-grid ps-portal-grid--standard">
        <?php while($q->have_posts()):$q->the_post();ps_portal_render_card(get_the_ID(),'standard');endwhile;wp_reset_postdata(); ?>
    </div>
</section>
<?php endforeach; ?>

<?php
$more = ps_portal_latest_query(6,$used);
if($more->have_posts()):
?>
<section class="ps-category-latest">
    <div class="ps-portal-section__head"><div><span class="eyebrow">Još iz rubrike</span><h2>Najnovije</h2></div></div>
    <div class="ps-portal-grid ps-portal-grid--latest">
        <?php while($more->have_posts()):$more->the_post();ps_portal_render_card(get_the_ID(),'latest');endwhile;wp_reset_postdata(); ?>
    </div>
</section>
<?php endif; ?>

<?php else : ?>
<header class="ps-archive-header"><div class="eyebrow">PatriaSoul</div><h1><?php the_title(); ?></h1></header>
<?php if(have_posts()):while(have_posts()):the_post(); ?><article class="ps-single-content"><?php the_content(); ?></article><?php endwhile; endif; ?>
<?php endif; ?>
</div></main>
<?php get_footer(); ?>