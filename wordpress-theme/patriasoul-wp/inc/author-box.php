<?php
if (!defined('ABSPATH')) exit;

function ps_portal_author_name() {
    return 'Čuvari nasljeđa';
}

function ps_portal_author_description() {
    return 'Čuvamo ono što smo naslijedili i prenosimo ono što ne smije biti zaboravljeno. Kroz priče o hrvatskoj povijesti, Domovinskom ratu, braniteljima, vjeri, baštini, običajima, jeziku i ljudima koji su svojim životom ostavili trag, PatriaSoul nastoji sačuvati sjećanje i približiti ga novim generacijama.';
}

function ps_portal_author_box() {
    ?>
    <aside class="ps-author-box">
        <div class="ps-author-box__eyebrow">Autor</div>
        <h3><?php echo esc_html(ps_portal_author_name()); ?></h3>
        <p><?php echo esc_html(ps_portal_author_description()); ?></p>
        <div class="ps-author-box__motto">Vjera. Obitelj. Domovina. Nasljeđe.</div>
        <a class="ps-author-box__link" href="<?php echo esc_url(get_author_posts_url(get_current_user_id())); ?>">Svi članci autora →</a>
    </aside>
    <?php
}
