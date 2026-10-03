<?php get_header(); ?>
<main class="ps-single-wrap">
<div class="ps-wrap ps-content-layout">
<article class="ps-single">
<?php if(have_posts()):while(have_posts()):the_post();
$post_id=get_the_ID();
$cats=get_the_category();
$cat_ids=wp_get_post_categories($post_id);
$related=ps_portal_related_query($post_id,4);
$related_ids=$related->posts?wp_list_pluck($related->posts,'ID'):array();
$missed=ps_portal_missed_query($post_id,5);
$missed_ids=$missed->posts?wp_list_pluck($missed->posts,'ID'):array();
$exclude=array_merge(array($post_id),$related_ids,$missed_ids);
$latest=ps_portal_latest_query(5,$exclude);
?>
<nav class="ps-breadcrumb">
    <a href="<?php echo esc_url(home_url('/')); ?>">Početna</a>
    <span>›</span>
    <?php if($cats): ?><a href="<?php echo esc_url(get_category_link($cats[0]->term_id)); ?>"><?php echo esc_html($cats[0]->name); ?></a><span>›</span><?php endif; ?>
    <span><?php the_title(); ?></span>
</nav>

<header class="ps-single-header">
    <div class="eyebrow">Čuvari nasljeđa</div>
    <h1><?php the_title(); ?></h1>
    <div class="ps-single-meta">
        Objavljeno <?php echo esc_html(get_the_date()); ?>
        <?php if(get_the_modified_date()!==get_the_date()): ?> · Ažurirano <?php echo esc_html(get_the_modified_date()); ?><?php endif; ?>
        · <?php echo esc_html(get_the_author()); ?>
    </div>
    <?php if($cats): ?>
    <div class="ps-single-categories">
        <?php foreach($cats as $cat): ?><a href="<?php echo esc_url(get_category_link($cat->term_id)); ?>"><?php echo esc_html($cat->name); ?></a><?php endforeach; ?>
    </div>
    <?php endif; ?>
</header>

<?php if(has_post_thumbnail()): ?>
<figure class="ps-single-hero"><?php the_post_thumbnail('full',array('loading'=>'eager')); ?></figure>
<?php endif; ?>

<div class="ps-single-content"><?php the_content(); ?></div>

<?php $tags=get_the_tags(); if($tags): ?>
<div class="ps-single-tags">
    <span>Oznake:</span>
    <?php foreach($tags as $tag): ?><a href="<?php echo esc_url(get_tag_link($tag->term_id)); ?>">#<?php echo esc_html($tag->name); ?></a><?php endforeach; ?>
</div>
<?php endif; ?>

<div class="ps-author-inline"><?php ps_portal_author_box(get_the_author_meta('ID')); ?></div>

<?php if($related->have_posts()): ?>
<section class="ps-related">
    <div class="ps-portal-section__head"><div><span class="eyebrow">Povezane priče</span><h2>Povezano</h2></div><p>Sadržaj iz iste ili srodne rubrike.</p></div>
    <div class="ps-portal-grid ps-portal-grid--standard">
        <?php while($related->have_posts()):$related->the_post();ps_portal_render_card(get_the_ID(),'standard');endwhile;wp_reset_postdata(); ?>
    </div>
</section>
<?php endif; ?>

<?php if($missed->have_posts()): ?>
<section class="ps-related">
    <div class="ps-portal-section__head"><div><span class="eyebrow">Za vas</span><h2>Možda ste propustili</h2></div><p>Starije priče koje vrijedi ponovno otkriti.</p></div>
    <div class="ps-section-missed">
        <div class="ps-portal-grid ps-portal-grid--compact">
            <?php while($missed->have_posts()):$missed->the_post();ps_portal_render_card(get_the_ID(),'compact');endwhile;wp_reset_postdata(); ?>
        </div>
    </div>
</section>
<?php endif; ?>

<?php if($latest->have_posts()): ?>
<section class="ps-related">
    <div class="ps-portal-section__head"><div><span class="eyebrow">Svježe objave</span><h2>Najnovije</h2></div></div>
    <div class="ps-portal-grid ps-portal-grid--latest">
        <?php while($latest->have_posts()):$latest->the_post();ps_portal_render_card(get_the_ID(),'latest');endwhile;wp_reset_postdata(); ?>
    </div>
</section>
<?php endif; ?>

<?php endwhile;endif; ?>
</article>
<aside class="ps-article-sidebar"><?php ps_portal_sidebar(get_the_ID()); ?></aside>
</div></main>
<?php get_footer(); ?>