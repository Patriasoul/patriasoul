<?php
if (!defined('ABSPATH')) exit;

/**
 * PatriaSoul Portal Core
 * Central configuration for automatic editorial feeds.
 */

function ps_portal_section_map() {
    return array(
        'domovina' => array('title'=>'Domovina','intro'=>'Domovinski rat, branitelji, sjećanje i hrvatska svakodnevica.','children'=>array('domovinski-rat','branitelji','sjecanje')),
        'branitelji' => array('title'=>'Branitelji','intro'=>'Svjedočanstva, životopisi, udruge, inicijative i obilježavanja.','children'=>array('svjedocanstva','zivotopisi','udruge-i-inicijative','obljetnice-i-komemoracije')),
        'povijest' => array('title'=>'Povijest','intro'=>'Razdoblja, događaji, ljudi i tragovi hrvatske povijesti.','children'=>array()),
        'bastina' => array('title'=>'Baština','intro'=>'Povijesna baština, običaji, jezik, kultura i sakralna baština.','children'=>array('cuvajmo-nasljedje','cuvajmo-nasljede','bastina','povijesna-bastina','obicaji-i-tradicija','jezik-i-knjizevnost','sakralna-i-kulturna-bastina','obnova-i-zastita')),
        'vjera' => array('title'=>'Vjera','intro'=>'Evanđelje, molitve, svetci, blagdani i duhovni sadržaj.','children'=>array('evandelje','molitve','svetci','blagdani')),
        'mediji' => array('title'=>'Mediji','intro'=>'Vijesti, video, galerija i multimedijski sadržaj PatriaSoula.','children'=>array('vijesti','aktualnosti','video','galerija')),
        'igra' => array('title'=>'Igra','intro'=>'Kvizovi, izazovi i sadržaj kroz koji učimo i pamtimo.','children'=>array('quiz','brani-svoj-grad','dnevni-kviz','izazovi')),
    );
}

function ps_portal_page_config($slug) {
    $map = ps_portal_section_map();
    $slug = sanitize_title($slug);
    return isset($map[$slug]) ? $map[$slug] : null;
}

function ps_portal_category_ids($slugs) {
    $ids = array();
    foreach ((array) $slugs as $slug) {
        $cat = get_category_by_slug(sanitize_title($slug));
        if ($cat && !is_wp_error($cat)) $ids[] = (int) $cat->term_id;
    }
    return array_values(array_unique($ids));
}

function ps_portal_section_query($slug, $count = 5, $exclude = array()) {
    $config = ps_portal_page_config($slug);
    $slugs = $config && !empty($config['children']) ? $config['children'] : array($slug);
    $ids = ps_portal_category_ids($slugs);

    if (!$ids && $slug === 'domovina') {
        $ids = ps_portal_category_ids(array('domovinski-rat','branitelji','sjecanje'));
    }
    if (!$ids && $slug === 'bastina') {
        $ids = ps_portal_category_ids(array('cuvajmo-nasljedje','cuvajmo-nasljede','bastina'));
    }
    if (!$ids) return new WP_Query(array('post__in'=>array(0)));

    return ps_portal_get_posts(array(
        'posts_per_page'=>absint($count),
        'category__in'=>$ids,
        'post__not_in'=>array_map('absint',(array)$exclude),
        'orderby'=>'date',
        'order'=>'DESC'
    ));
}

function ps_portal_feed_config() {
    return array(
        'featured' => array('title' => 'Istaknuto', 'count' => 5, 'class' => 'ps-feed-featured'),
        'latest' => array('title' => 'Najnovije', 'count' => 6, 'class' => 'ps-feed-latest'),
        'focus' => array('title' => 'U fokusu', 'count' => 4, 'class' => 'ps-feed-focus'),
        'popular' => array('title' => 'Najčitanije', 'count' => 5, 'class' => 'ps-feed-popular'),
        'missed' => array('title' => 'Možda ste propustili', 'count' => 5, 'class' => 'ps-feed-missed'),
        'recommended' => array('title' => 'Preporučujemo', 'count' => 4, 'class' => 'ps-feed-recommended'),
    );
}

function ps_portal_get_posts($args = array()) {
    $defaults = array(
        'posts_per_page' => 5,
        'post_status' => 'publish',
        'ignore_sticky_posts' => true,
    );
    $args = wp_parse_args($args, $defaults);
    return new WP_Query($args);
}

function ps_portal_render_card($post_id, $variant = 'standard') {
    $post = get_post($post_id);
    if (!$post) return;
    $classes = 'ps-portal-card ps-portal-card--' . sanitize_html_class($variant);
    ?>
    <article class="<?php echo esc_attr($classes); ?>">
        <?php if (has_post_thumbnail($post_id)) : ?>
            <a class="ps-portal-card__media" href="<?php echo esc_url(get_permalink($post_id)); ?>" aria-label="<?php echo esc_attr(get_the_title($post_id)); ?>">
                <?php echo get_the_post_thumbnail($post_id, 'large', array('loading' => 'lazy')); ?>
            </a>
        <?php endif; ?>
        <div class="ps-portal-card__body">
            <div class="ps-portal-card__meta">
                <?php echo esc_html(get_the_date('', $post_id)); ?>
            </div>
            <h3 class="ps-portal-card__title">
                <a href="<?php echo esc_url(get_permalink($post_id)); ?>"><?php echo esc_html(get_the_title($post_id)); ?></a>
            </h3>
            <?php if ($variant !== 'compact') : ?>
                <p class="ps-portal-card__excerpt"><?php echo esc_html(wp_trim_words(get_the_excerpt($post_id), 20)); ?></p>
            <?php endif; ?>
        </div>
    </article>
    <?php
}

function ps_portal_section($title, $query, $variant = 'standard', $class = '') {
    if (!$query instanceof WP_Query || !$query->have_posts()) return;
    ?>
    <section class="ps-portal-section <?php echo esc_attr($class); ?>">
        <div class="ps-portal-section__head">
            <h2><?php echo esc_html($title); ?></h2>
        </div>
        <div class="ps-portal-grid ps-portal-grid--<?php echo esc_attr($variant); ?>">
            <?php while ($query->have_posts()) : $query->the_post(); ps_portal_render_card(get_the_ID(), $variant); endwhile; ?>
        </div>
    </section>
    <?php
    wp_reset_postdata();
}

/**
 * Additional automatic portal feeds used by the homepage.
 */
function ps_portal_focus_query($count = 4, $exclude = array()) {
    return ps_portal_featured_query($count, $exclude);
}

function ps_portal_named_category_query($slugs, $count = 4, $exclude = array()) {
    $ids = ps_portal_category_ids((array) $slugs);
    if (!$ids) return new WP_Query(array('post__in'=>array(0)));
    return ps_portal_get_posts(array(
        'posts_per_page' => absint($count),
        'category__in' => $ids,
        'post__not_in' => array_map('absint', (array) $exclude),
        'orderby' => 'date',
        'order' => 'DESC',
    ));
}

function ps_portal_category_exists($slug) {
    $cat = get_category_by_slug(sanitize_title($slug));
    return $cat && !is_wp_error($cat);
}
