<?php
if (!defined('ABSPATH')) exit;

/**
 * PatriaSoul Portal Core
 * Central configuration for automatic editorial feeds.
 */

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
