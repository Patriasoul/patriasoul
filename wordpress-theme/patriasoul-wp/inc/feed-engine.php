<?php
if (!defined('ABSPATH')) exit;

/**
 * Automatic feed engine.
 * Categories drive thematic blocks; editorial flags can be added later.
 */

function ps_portal_category_query($slug, $count = 5, $exclude = array()) {
    return ps_portal_get_posts(array(
        'posts_per_page' => absint($count),
        'category_name' => sanitize_title($slug),
        'post__not_in' => array_map('absint', (array) $exclude),
    ));
}

function ps_portal_latest_query($count = 6, $exclude = array()) {
    return ps_portal_get_posts(array(
        'posts_per_page' => absint($count),
        'post__not_in' => array_map('absint', (array) $exclude),
        'orderby' => 'date',
        'order' => 'DESC',
    ));
}

function ps_portal_featured_query($count = 5, $exclude = array()) {
    $sticky = get_option('sticky_posts', array());
    if ($sticky) {
        return ps_portal_get_posts(array(
            'posts_per_page' => absint($count),
            'post__in' => array_map('absint', $sticky),
            'post__not_in' => array_map('absint', (array) $exclude),
            'orderby' => 'date',
            'order' => 'DESC',
        ));
    }
    return ps_portal_latest_query($count, $exclude);
}

function ps_portal_popular_query($count = 5, $exclude = array()) {
    $query = ps_portal_get_posts(array(
        'posts_per_page' => absint($count),
        'post__not_in' => array_map('absint', (array) $exclude),
        'meta_key' => 'ps_views',
        'orderby' => 'meta_value_num',
        'order' => 'DESC',
    ));
    return $query;
}

function ps_portal_related_query($post_id, $count = 4) {
    $cats = wp_get_post_categories($post_id);
    if (!$cats) return ps_portal_latest_query($count, array($post_id));

    return ps_portal_get_posts(array(
        'posts_per_page' => absint($count),
        'post__not_in' => array($post_id),
        'category__in' => $cats,
        'orderby' => 'date',
        'order' => 'DESC',
    ));
}

function ps_portal_missed_query($post_id = 0, $count = 5) {
    $exclude = $post_id ? array($post_id) : array();
    if ($post_id) {
        $related = ps_portal_related_query($post_id, $count + 2);
        if ($related->have_posts()) return $related;
    }
    return ps_portal_latest_query($count, $exclude);
}

function ps_portal_track_views() {
    if (!is_singular('post') || is_admin() || wp_doing_ajax()) return;
    $post_id = get_queried_object_id();
    if (!$post_id) return;
    $views = (int) get_post_meta($post_id, 'ps_views', true);
    update_post_meta($post_id, 'ps_views', $views + 1);
}
add_action('template_redirect', 'ps_portal_track_views');
