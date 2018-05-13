<?php
/**
 * WPSEO plugin file.
 *
 * @package WPSEO\Admin\ConfigurationUI
 */

/**
 * Class WPSEO_Config_Field_Profile_URL_VK
 */
class WPSEO_Config_Field_Profile_URL_VK extends WPSEO_Config_Field {

	/**
	 * WPSEO_Config_Field_Profile_URL_VK constructor.
	 */
	public function __construct() {
		parent::__construct( 'profileUrlVK', 'Input' );

		$this->set_property( 'label', __( 'VK Page URL', 'wordpress-seo' ) );
		$this->set_property( 'pattern', '^https:\/\/www\.vk\.com\/([^/]+)\/$' );
	}

	/**
	 * Set adapter
	 *
	 * @param WPSEO_Configuration_Options_Adapter $adapter Adapter to register lookup on.
	 */
	public function set_adapter( WPSEO_Configuration_Options_Adapter $adapter ) {
		$adapter->add_option_lookup( $this->get_identifier(), 'vk_url' );
	}
}
