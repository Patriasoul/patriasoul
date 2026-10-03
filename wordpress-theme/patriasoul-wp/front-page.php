<?php get_header(); ?>
<?php
$hero_id = (int) get_theme_mod('ps_hero_image', 0);
$hero = $hero_id ? wp_get_attachment_image_url($hero_id, 'full') : 'https://raw.githubusercontent.com/Patriasoul/patriasoul/main/images/Bastina.jfif';
$title = get_theme_mod('ps_hero_title', 'Krist u srcu, Hrvatska u molitvi.');
$text = get_theme_mod('ps_hero_text', 'PatriaSoul je digitalni prostor za vjeru, domovinu, povijest, branitelje, baštinu i priče koje vrijedi sačuvati.');
$featured = ps_portal_featured_query(5);
$featured_ids = $featured->posts ? wp_list_pluck($featured->posts, 'ID') : array();
?>
<section class="ps-hero">
    <div class="ps-hero-bg" style="background-image:url('<?php echo esc_url($hero); ?>')"></div>
    <div class="ps-wrap ps-hero-content">
        <span class="ps-kicker">🇭🇷 PatriaSoul · vjera · domovina · nasljeđe</span>
        <h1>Patria<span>Soul</span></h1>
        <h2><?php echo esc_html($title); ?></h2>
        <p><?php echo esc_html($text); ?></p>
        <div class="ps-actions">
            <a class="ps-btn ps-btn-primary" href="#istaknuto">Istaknuto</a>
            <a class="ps-btn ps-btn-ghost" href="#najnovije">Najnovije</a>
        </div>
    </div>
</section>

<section id="istaknuto" class="ps-portal-section ps-portal-section--featured">
    <div class="ps-wrap">
        <div class="ps-portal-section__head"><div><span class="eyebrow">PatriaSoul</span><h2>Istaknuto</h2></div><p>Najvažnije objave na jednom mjestu.</p></div>
        <?php if ($featured->have_posts()) : ?>
        <div class="ps-featured-grid">
            <?php $i=0; while ($featured->have_posts()) : $featured->the_post(); $i++; ?>
                <article class="ps-featured-item ps-featured-item--<?php echo $i===1?'hero':'small'; ?>">
                    <?php if (has_post_thumbnail()) : ?><a class="ps-featured-item__media" href="<?php the_permalink(); ?>"><?php the_post_thumbnail('large', array('loading'=>'lazy')); ?></a><?php endif; ?>
                    <div class="ps-featured-item__body">
                        <div class="ps-portal-card__meta"><?php echo esc_html(get_the_date()); ?></div>
                        <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                        <?php if ($i===1) : ?><p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 28)); ?></p><?php endif; ?>
                    </div>
                </article>
            <?php endwhile; wp_reset_postdata(); ?>
        </div>
        <?php endif; ?>
    </div>
</section>

<section id="najnovije" class="ps-portal-section">
    <div class="ps-wrap">
        <?php ps_portal_section('Najnovije', ps_portal_latest_query(6, $featured_ids), 'latest', 'ps-section-latest'); ?>
    </div>
</section>

<section class="ps-portal-section ps-portal-section--split">
    <div class="ps-wrap ps-portal-split">
        <?php ps_portal_section('Najčitanije', ps_portal_popular_query(5), 'popular', 'ps-section-popular'); ?>
        <?php ps_portal_section('Možda ste propustili', ps_portal_missed_home_query(5, $featured_ids), 'compact', 'ps-section-missed'); ?>
    </div>
</section>

<?php
$themes = array(
    array('Domovina', 'domovinski-rat', 'Domovinski rat, branitelji, sjećanje i svjedočanstva.'),
    array('Vjera', 'vjera', 'Vjera, Evanđelje, molitva, svetci i duhovni sadržaj.'),
    array('Čuvajmo nasljeđe', 'bastina', 'Povijest, običaji, jezik, kultura i sakralna baština.'),
);
foreach ($themes as $theme) :
    $q = ps_portal_category_query($theme[1], 4);
    if (!$q->have_posts()) continue;
?>
<section class="ps-portal-section ps-theme-section">
    <div class="ps-wrap">
        <div class="ps-portal-section__head"><div><span class="eyebrow">Tematski izbor</span><h2><?php echo esc_html($theme[0]); ?></h2></div><p><?php echo esc_html($theme[2]); ?></p></div>
        <div class="ps-portal-grid ps-portal-grid--standard">
            <?php while ($q->have_posts()) : $q->the_post(); ps_portal_render_card(get_the_ID(), 'standard'); endwhile; wp_reset_postdata(); ?>
        </div>
    </div>
</section>
<?php endforeach; ?>

<section class="ps-portal-section ps-special">
    <div class="ps-wrap ps-special-grid">
        <div><span class="eyebrow">Vjera</span><h2>Riječ dana</h2><p>Prostor za Evanđelje dana, molitvu i duhovni sadržaj.</p><a class="ps-btn ps-btn-ghost" href="<?php echo esc_url(home_url('/evandelje/')); ?>">Evanđelje →</a></div>
        <div><span class="eyebrow">Znanje</span><h2>Hrvatski kviz</h2><p>Provjeri svoje znanje i upoznaj hrvatsku povijest, baštinu i identitet.</p><a class="ps-btn ps-btn-primary" href="<?php echo esc_url(home_url('/quiz/')); ?>">Igraj kviz →</a></div>
        <div><span class="eyebrow">Nasljeđe</span><h2>Čuvari nasljeđa</h2><p>Čuvamo ono što smo naslijedili i prenosimo ono što ne smije biti zaboravljeno.</p></div>
    </div>
</section>
<?php get_footer(); ?>
