<?php
/**
 * PatriaSoul WordPress Theme Functions
 *
 * Customizer sustav za slike stranica Domovina i Hrvatska.
 * Sve vrijednosti slika spremaju se kao attachment ID-ovi u theme_mods.
 *
 * WordPress koristi WP_Customize_Media_Control za odabir slike iz
 * Medijske biblioteke ili učitavanje nove slike.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * PatriaSoul: osnovna podrška teme.
 */
function patriasoul_theme_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-logo' );
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ) );
}
add_action( 'after_setup_theme', 'patriasoul_theme_setup' );

/**
 * Dohvati URL slike iz Customizera.
 *
 * WP_Customize_Media_Control sprema ID privitka, pa ovdje ID pretvaramo
 * u URL. Ako slika nije odabrana, vraća se zadana vrijednost.
 */
function patriasoul_get_image_url( $setting_id, $default = '' ) {
    $attachment_id = absint( get_theme_mod( $setting_id, 0 ) );

    if ( $attachment_id ) {
        $url = wp_get_attachment_image_url( $attachment_id, 'full' );

        if ( $url ) {
            return $url;
        }
    }

    return $default;
}

/**
 * Ispis slike iz Customizera.
 *
 * Primjer u templateu:
 * echo patriasoul_get_image_url( 'patriasoul_domovina_hero' );
 */
function patriasoul_image( $setting_id, $alt = '', $default = '', $size = 'full', $attrs = array() ) {
    $attachment_id = absint( get_theme_mod( $setting_id, 0 ) );

    if ( $attachment_id ) {
        $image_attrs = array_merge(
            array(
                'alt'     => $alt,
                'loading' => 'lazy',
            ),
            $attrs
        );

        echo wp_get_attachment_image( $attachment_id, $size, false, $image_attrs );
        return;
    }

    if ( $default ) {
        $default_attrs = array_merge(
            array(
                'alt'     => $alt,
                'loading' => 'lazy',
            ),
            $attrs
        );

        printf(
            '<img src="%1$s" alt="%2$s" loading="lazy"%3$s />',
            esc_url( $default ),
            esc_attr( $alt ),
            patriasoul_html_attributes( $attrs )
        );
    }
}

/**
 * Pretvori dodatne HTML atribute u siguran string.
 */
function patriasoul_html_attributes( $attrs ) {
    $output = '';

    foreach ( $attrs as $name => $value ) {
        if ( 'alt' === $name || 'loading' === $name ) {
            continue;
        }

        $output .= sprintf(
            ' %1$s="%2$s"',
            esc_attr( $name ),
            esc_attr( $value )
        );
    }

    return $output;
}

/**
 * Registracija svih PatriaSoul Customizer postavki za Domovinu i Hrvatsku.
 */
function patriasoul_customize_register( $wp_customize ) {

    /* ================================================================
     * PANEL: DOMOVINA
     * ================================================================ */
    $wp_customize->add_panel(
        'patriasoul_domovina_panel',
        array(
            'title'       => __( 'PatriaSoul – Domovina', 'patriasoul' ),
            'description' => __( 'Upravljanje slikama svih glavnih sekcija stranice Domovina.', 'patriasoul' ),
            'priority'    => 30,
        )
    );

    $domovina_images = array(
        'hero' => array(
            'label'       => 'Glavna slika Domovine',
            'description' => 'Velika naslovna slika na vrhu stranice Domovina.',
        ),
        'hrvatska' => array(
            'label'       => 'Hrvatska',
            'description' => 'Slika za karticu/poveznicu Hrvatska.',
        ),
        'gradovi' => array(
            'label'       => 'Gradovi',
            'description' => 'Slika za sekciju hrvatskih gradova.',
        ),
        'krajevi' => array(
            'label'       => 'Krajevi i geografija',
            'description' => 'Slika za geografiju, regije i krajeve Hrvatske.',
        ),
        'danas' => array(
            'label'       => 'Hrvatska danas',
            'description' => 'Slika za aktualni život, društvo i razvoj Hrvatske.',
        ),
        'vijesti' => array(
            'label'       => 'Vijesti',
            'description' => 'Slika za poveznicu na PatriaSoul Vijesti.',
        ),
        'kultura' => array(
            'label'       => 'Kultura i baština',
            'description' => 'Slika za kulturu, baštinu, običaje i tradiciju.',
        ),
        'povijest' => array(
            'label'       => 'Povijest',
            'description' => 'Slika za povijesne sadržaje Hrvatske.',
        ),
        'priroda' => array(
            'label'       => 'Priroda',
            'description' => 'Slika za prirodu, nacionalne parkove i zaštićena područja.',
        ),
        'dijaspora' => array(
            'label'       => 'Hrvatska i dijaspora',
            'description' => 'Slika za poveznicu na sadržaje o Hrvatima izvan Hrvatske.',
        ),
        'stvara' => array(
            'label'       => 'Hrvatska stvara',
            'description' => 'Slika za poduzetništvo, inovacije, domaće proizvode i uspješne priče.',
        ),
    );

    $domovina_sections = array(
        'glavna' => array(
            'title'       => '01. Glavna slika',
            'description' => 'Naslovna fotografija/ilustracija stranice Domovina.',
            'priority'    => 10,
            'keys'        => array( 'hero' ),
        ),
        'sadrzaj' => array(
            'title'       => '02. Glavne sekcije',
            'description' => 'Slike glavnih kategorija Domovine.',
            'priority'    => 20,
            'keys'        => array( 'hrvatska', 'gradovi', 'krajevi', 'danas', 'vijesti' ),
        ),
        'bastina' => array(
            'title'       => '03. Povijest, kultura i priroda',
            'description' => 'Slike za povijest, kulturu, baštinu i prirodu.',
            'priority'    => 30,
            'keys'        => array( 'kultura', 'povijest', 'priroda' ),
        ),
        'veze' => array(
            'title'       => '04. Hrvatska izvan granica',
            'description' => 'Slike za dijasporu i Hrvatsku stvara.',
            'priority'    => 40,
            'keys'        => array( 'dijaspora', 'stvara' ),
        ),
    );

    foreach ( $domovina_sections as $section_id => $section ) {
        $customizer_section_id = 'patriasoul_domovina_' . $section_id;

        $wp_customize->add_section(
            $customizer_section_id,
            array(
                'title'       => $section['title'],
                'description' => $section['description'],
                'panel'       => 'patriasoul_domovina_panel',
                'priority'    => $section['priority'],
            )
        );

        foreach ( $section['keys'] as $key ) {
            $setting_id = 'patriasoul_domovina_' . $key;
            $image      = $domovina_images[ $key ];

            $wp_customize->add_setting(
                $setting_id,
                array(
                    'type'              => 'theme_mod',
                    'default'           => '',
                    'sanitize_callback' => 'absint',
                    'transport'         => 'refresh',
                )
            );

            $wp_customize->add_control(
                new WP_Customize_Media_Control(
                    $wp_customize,
                    $setting_id,
                    array(
                        'label'       => $image['label'],
                        'description' => $image['description'],
                        'section'     => $customizer_section_id,
                        'settings'    => $setting_id,
                        'mime_type'   => 'image',
                    )
                )
            );
        }
    }

    /* ================================================================
     * PANEL: HRVATSKA
     * ================================================================ */
    $wp_customize->add_panel(
        'patriasoul_hrvatska_panel',
        array(
            'title'       => __( 'PatriaSoul – Hrvatska', 'patriasoul' ),
            'description' => __( 'Upravljanje slikama svih glavnih sekcija stranice Hrvatska.', 'patriasoul' ),
            'priority'    => 31,
        )
    );

    $hrvatska_images = array(
        'hero' => array(
            'label'       => 'Glavna slika Hrvatske',
            'description' => 'Velika naslovna slika stranice Hrvatska.',
        ),
        'geografija' => array(
            'label'       => 'Geografija Hrvatske',
            'description' => 'Slika za geografiju, regije, obalu, otoke i kopneni dio Hrvatske.',
        ),
        'regije' => array(
            'label'       => 'Regije Hrvatske',
            'description' => 'Slika za pregled hrvatskih regija i povijesnih krajeva.',
        ),
        'gradovi' => array(
            'label'       => 'Hrvatski gradovi',
            'description' => 'Slika za sekciju hrvatskih gradova.',
        ),
        'priroda' => array(
            'label'       => 'Priroda i nacionalni parkovi',
            'description' => 'Slika za prirodnu baštinu, parkove i zaštićena područja.',
        ),
        'povijest' => array(
            'label'       => 'Povijest Hrvatske',
            'description' => 'Slika za vremensku crtu i povijesne sadržaje.',
        ),
        'kultura' => array(
            'label'       => 'Kultura i baština',
            'description' => 'Slika za kulturnu, nematerijalnu i graditeljsku baštinu.',
        ),
        'danas' => array(
            'label'       => 'Hrvatska danas',
            'description' => 'Slika za suvremenu Hrvatsku, društvo, gospodarstvo i život.',
        ),
        'dijaspora' => array(
            'label'       => 'Hrvatska i dijaspora',
            'description' => 'Slika za poveznicu na hrvatske zajednice izvan Hrvatske.',
        ),
        'stvara' => array(
            'label'       => 'Hrvatska stvara',
            'description' => 'Slika za domaće proizvode, poduzetništvo, inovacije i uspješne priče.',
        ),
        'identitet' => array(
            'label'       => 'Identitet Hrvatske',
            'description' => 'Slika za jezik, simbole, običaje i hrvatski identitet.',
        ),
        'domovinski_rat' => array(
            'label'       => 'Domovinski rat',
            'description' => 'Slika za povijest, svjedočanstva i memoriju Domovinskog rata.',
        ),
    );

    $hrvatska_sections = array(
        'glavna' => array(
            'title'       => '01. Glavna slika',
            'description' => 'Naslovna fotografija/ilustracija stranice Hrvatska.',
            'priority'    => 10,
            'keys'        => array( 'hero' ),
        ),
        'zemljopis' => array(
            'title'       => '02. Zemljopis i prostor',
            'description' => 'Slike geografije, regija, gradova i prirode.',
            'priority'    => 20,
            'keys'        => array( 'geografija', 'regije', 'gradovi', 'priroda' ),
        ),
        'povijest_kultura' => array(
            'title'       => '03. Povijest i kultura',
            'description' => 'Slike povijesti, kulture i baštine.',
            'priority'    => 30,
            'keys'        => array( 'povijest', 'kultura', 'identitet', 'domovinski_rat' ),
        ),
        'danas' => array(
            'title'       => '04. Hrvatska danas',
            'description' => 'Suvremena Hrvatska i njezine poveznice sa svijetom.',
            'priority'    => 40,
            'keys'        => array( 'danas', 'dijaspora', 'stvara' ),
        ),
    );

    foreach ( $hrvatska_sections as $section_id => $section ) {
        $customizer_section_id = 'patriasoul_hrvatska_' . $section_id;

        $wp_customize->add_section(
            $customizer_section_id,
            array(
                'title'       => $section['title'],
                'description' => $section['description'],
                'panel'       => 'patriasoul_hrvatska_panel',
                'priority'    => $section['priority'],
            )
        );

        foreach ( $section['keys'] as $key ) {
            $setting_id = 'patriasoul_hrvatska_' . $key;
            $image      = $hrvatska_images[ $key ];

            $wp_customize->add_setting(
                $setting_id,
                array(
                    'type'              => 'theme_mod',
                    'default'           => '',
                    'sanitize_callback' => 'absint',
                    'transport'         => 'refresh',
                )
            );

            $wp_customize->add_control(
                new WP_Customize_Media_Control(
                    $wp_customize,
                    $setting_id,
                    array(
                        'label'       => $image['label'],
                        'description' => $image['description'],
                        'section'     => $customizer_section_id,
                        'settings'    => $setting_id,
                        'mime_type'   => 'image',
                    )
                )
            );
        }
    }
}
add_action( 'customize_register', 'patriasoul_customize_register' );

/**
 * Dodaj nekoliko korisnih veličina slika za kartice.
 */
function patriasoul_custom_image_sizes() {
    add_image_size( 'patriasoul-card', 900, 600, true );
    add_image_size( 'patriasoul-hero', 1920, 900, true );
    add_image_size( 'patriasoul-square', 800, 800, true );
}
add_action( 'after_setup_theme', 'patriasoul_custom_image_sizes' );

/**
 * Kompatibilni helperi za template datoteke.
 *
 * Primjeri:
 * patriasoul_get_image_url( 'patriasoul_domovina_hero' );
 * patriasoul_get_image_url( 'patriasoul_hrvatska_gradovi' );
 *
 * Ili izravni HTML:
 * <img src="<?php echo esc_url( patriasoul_get_image_url( 'patriasoul_domovina_gradovi' ) ); ?>" alt="Gradovi Hrvatske">
 */
