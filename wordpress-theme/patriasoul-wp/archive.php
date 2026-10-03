<?php get_header(); ?>
<main class="ps-archive-wrap"><div class="ps-wrap">
<header class="ps-archive-header"><div class="eyebrow">PatriaSoul</div><h1><?php the_archive_title(); ?></h1><?php the_archive_description('<div class="ps-archive-description">','</div>'); ?></header>
<?php if(have_posts()): ?><div class="ps-archive-grid"><?php while(have_posts()):the_post();ps_portal_render_card(get_the_ID(),'standard');endwhile; ?></div>
<?php the_posts_pagination(array('mid_size'=>1,'prev_text'=>'← Prethodno','next_text'=>'Sljedeće →')); ?>
<?php else: ?><p>Trenutno nema objava u ovoj arhivi.</p><?php endif; ?>
</div></main><?php get_footer(); ?>