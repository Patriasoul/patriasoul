<?php get_header(); ?>
<main class="ps-archive-wrap"><div class="ps-wrap">
<header class="ps-author-archive"><?php ps_portal_author_box(); ?></header>
<?php if(have_posts()): ?><div class="ps-archive-grid"><?php while(have_posts()):the_post();ps_portal_render_card(get_the_ID(),'standard');endwhile; ?></div><?php the_posts_pagination(array('mid_size'=>1,'prev_text'=>'← Prethodno','next_text'=>'Sljedeće →')); ?><?php endif; ?>
</div></main><?php get_footer(); ?>