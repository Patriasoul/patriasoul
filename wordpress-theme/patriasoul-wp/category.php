<?php get_header(); ?>
<?php
$cat = get_queried_object();
$featured = ps_portal_featured_category_query($cat->term_id, 4);
$featured_ids = $featured->posts ? wp_list_pluck($featured->posts, 'ID') : array();
$subcats = get_categories(array('parent'=>$cat->term_id,'hide_empty'=>true));
$latest_args = array('category__in'=>array($cat->term_id),'posts_per_page'=>9,'post__not_in'=>$featured_ids,'orderby'=>'date','order'=>'DESC');
$latest = ps_portal_get_posts($latest_args);
?>
<main class="ps-archive-wrap">
<div class="ps-wrap">
<nav class="ps-breadcrumb"><a href="<?php echo esc_url(home_url('/')); ?>">Početna</a><span>›</span><span><?php single_cat_title(); ?></span></nav>

<header class="ps-archive-header">
    <div class="eyebrow">PatriaSoul · Rubrika</div>
    <h1><?php single_cat_title(); ?></h1>
    <?php if(category_description()): ?><div class="ps-archive-description"><?php echo wp_kses_post(category_description()); ?></div><?php endif; ?>
</header>

<?php if($subcats): ?>
<section class="ps-category-subcats">
    <div class="ps-portal-section__head"><div><span class="eyebrow">Istraži</span><h2>Podrubrike</h2></div><p>Odaberi područje koje želiš istražiti.</p></div>
    <div class="ps-more-links">
        <?php foreach($subcats as $sub): ?>
            <a href="<?php echo esc_url(get_category_link($sub->term_id)); ?>">
                <span><?php echo esc_html($sub->name); ?></span>
                <em><?php echo esc_html($sub->count); ?> objava&nbsp; →</em>
            </a>
        <?php endforeach; ?>
    </div>
</section>
<?php endif; ?>

<?php if($featured->have_posts()): ?>
<section class="ps-category-featured">
    <div class="ps-portal-section__head"><div><span class="eyebrow">U fokusu</span><h2>Istaknuto</h2></div><p>Odabrane priče iz ove rubrike.</p></div>
    <div class="ps-featured-grid">
        <?php $i=0; while($featured->have_posts()):$featured->the_post(); $i++; ?>
        <article class="ps-featured-item <?php echo $i===1?'ps-featured-item--hero':''; ?>">
            <div class="ps-featured-item__media"><?php if(has_post_thumbnail()) the_post_thumbnail('large'); ?></div>
            <div class="ps-featured-item__body">
                <div class="ps-portal-card__meta"><?php echo esc_html(get_the_date()); ?></div>
                <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                <p><?php echo esc_html(wp_trim_words(get_the_excerpt(),18)); ?></p>
            </div>
        </article>
        <?php endwhile; wp_reset_postdata(); ?>
    </div>
</section>
<?php endif; ?>

<section class="ps-category-latest">
    <div class="ps-portal-section__head"><div><span class="eyebrow">Kronološki</span><h2>Najnovije iz rubrike</h2></div></div>
    <?php if($latest->have_posts()): ?>
    <div class="ps-archive-grid">
        <?php while($latest->have_posts()):$latest->the_post(); ps_portal_render_card(get_the_ID(),'standard'); endwhile; ?>
    </div>
    <?php the_posts_pagination(array('mid_size'=>1,'prev_text'=>'← Prethodno','next_text'=>'Sljedeće →')); ?>
    <?php else: ?>
    <div class="ps-empty-note">U ovoj rubrici trenutno nema dodatnih objava.</div>
    <?php endif; wp_reset_postdata(); ?>
</section>
</div>
</main>
<?php get_footer(); ?>