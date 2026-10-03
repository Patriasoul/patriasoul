<?php
if (!defined('ABSPATH')) exit;

function ps_portal_author_name() {
    return 'Čuvari nasljeđa';
}

function ps_portal_author_description() {
    return 'Čuvamo ono što smo naslijedili i prenosimo ono što ne smije biti zaboravljeno. Kroz priče o hrvatskoj povijesti, Domovinskom ratu, braniteljima, vjeri, baštini, običajima, jeziku i ljudima koji su svojim životom ostavili trag, PatriaSoul nastoji sačuvati sjećanje i približiti ga novim generacijama.';
}

function ps_portal_author_box($author_id = 0) {
    $author_id = $author_id ? absint($author_id) : get_current_user_id();
    $author_url = $author_id ? get_author_posts_url($author_id) : home_url('/');
    ?>
    <aside class="ps-author-box">
        <div class="ps-author-box__top">
            <div class="ps-author-box__avatar" aria-hidden="true">ČN</div>
            <div>
                <div class="ps-author-box__eyebrow">Autor / uredništvo</div>
                <h3><?php echo esc_html(ps_portal_author_name()); ?></h3>
            </div>
        </div>

        <div class="ps-author-box__rule"></div>

        <p><?php echo esc_html(ps_portal_author_description()); ?></p>

        <div class="ps-author-box__motto">
            <span>Vjera.</span> <span>Obitelj.</span> <span>Domovina.</span> <span>Nasljeđe.</span>
        </div>

        <a class="ps-author-box__link" href="<?php echo esc_url($author_url); ?>">
            Istraži sve članke autora <span>→</span>
        </a>
    </aside>
    <?php
}
