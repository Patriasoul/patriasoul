<?php get_header(); ?>
<main class="ps-archive-wrap"><div class="ps-wrap">
<header class="ps-archive-header"><div class="eyebrow">Pretraga</div><h1>Rezultati za: <?php echo esc_html(get_search_query()); ?></h1></header>
<?php if (have_posts()) : ?><div class="ps-archive-grid"><?php while (have_posts()) : the_post(); ps_portal_render_card(get_the_ID(), "standard"); endwhile; ?></div>
<?php the_posts_pagination(array("mid_size"=>1,"prev_text"=>"← Prethodno","next_text"=>"Sljedeće →")); ?>
<?php else : ?><div class="ps-empty-note">Nema pronađenih objava. Pokušajte s drugim pojmom.</div><?php endif; ?>
</div></main><?php get_footer(); ?>