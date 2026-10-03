<?php get_header(); ?>
<main class="ps-single-wrap">
<div class="ps-wrap ps-content-layout">
<article class="ps-single">
<?php if(have_posts()):while(have_posts()):the_post(); ?>
<nav class="ps-breadcrumb"><a href="<?php echo esc_url(home_url('/')); ?>">Početna</a><span>›</span><?php the_category(' <span>›</span> '); ?></nav>
<header class="ps-single-header">
<div class="eyebrow">Čuvari nasljeđa</div>
<h1><?php the_title(); ?></h1>
<div class="ps-single-meta">Objavljeno <?php echo esc_html(get_the_date()); ?> · <?php echo esc_html(get_the_author()); ?></div>
</header>
<?php if(has_post_thumbnail()): ?><div class="ps-single-hero"><?php the_post_thumbnail('full'); ?></div><?php endif; ?>
<div class="ps-single-content"><?php the_content(); ?></div>
<div class="ps-author-inline"><?php ps_portal_author_box(); ?></div>
<?php $related=ps_portal_related_query(get_the_ID(),4); if($related->have_posts()): ?>
<section class="ps-related"><div class="ps-portal-section__head"><div><span class="eyebrow">Nakon ove priče</span><h2>Povezano</h2></div></div><div class="ps-portal-grid ps-portal-grid--standard"><?php while($related->have_posts()):$related->the_post();ps_portal_render_card(get_the_ID(),'compact');endwhile;wp_reset_postdata(); ?></div></section>
<?php endif; ?>
<?php $missed=ps_portal_missed_query(get_the_ID(),5); if($missed->have_posts()): ?>
<section class="ps-related"><div class="ps-portal-section__head"><div><span class="eyebrow">Za vas</span><h2>Možda ste propustili</h2></div></div><div class="ps-portal-grid ps-portal-grid--latest"><?php while($missed->have_posts()):$missed->the_post();ps_portal_render_card(get_the_ID(),'compact');endwhile;wp_reset_postdata(); ?></div></section>
<?php endif; ?>
<?php endwhile;endif; ?>
</article>
<aside class="ps-article-sidebar"><?php ps_portal_sidebar(); ?></aside>
</div></main>
<?php get_footer(); ?>