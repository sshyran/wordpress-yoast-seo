Feature( "In order to configure robots in meta settings of Post\n" +
	"As an Yoast SEO user\n" +
	"I need to change settings in Advanced tab of Post" );


Before( ( wpAdmin ) => {
	wpAdmin.loginWPAdmin();
} );

Scenario( 'Given "Allow search engines to show this Post in search results?" is set to "Default for Posts, currently: Yes" in Advanced tab of my Post\n' +
	'And "Should search engines follow links on this Post?" is set to Yes in Advanced tab of my Post\n' +
	'And "Meta robots advanced" set to default "Site-wide default: None" in Advanced tab of my Post\n' +
	'When I change "Allow search engines to show this Post in search results?" to No\n' +
	"And click Update\n" +
	'Then robots meta setting is included meta name="robots" content="noindex,follow"',
	async ( I, post, wpAdmin ) => {
		wpAdmin.editPost2();
		I.click( "Advanced" );
		I.selectOption( "#yoast_wpseo_meta-robots-noindex", "Default for Posts, currently: Yes" );
		I.click( { id: "yoast_wpseo_meta-robots-nofollow_0" } );
		I.selectOption( "#yoast_wpseo_meta-robots-adv", "-" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );

		I.click( "Advanced" );
		I.selectOption( "#yoast_wpseo_meta-robots-noindex", "No" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );

		post.openPost2();
		I.seeInSource( "meta name=\"robots\" content=\"noindex,follow\"" );
	} );

Scenario( 'Given robots meta setting configured with <meta name="robots" content="noindex,nofollow"/>\n' +
	'And "Meta robots advanced" set to default "Site-wide default: None" in Advanced tab of my Post\n' +
	'When I change "Should search engines follow links on this Post?" to No in Advanced tab of my Post\n' +
	"And click Update\n" +
	'Then robot meta setting is changed to meta name="robots" content="noindex,nofollow"',
	async ( I, post, wpAdmin ) => {
		wpAdmin.editPost2();
		I.click( "Advanced" );
		I.selectOption( "#yoast_wpseo_meta-robots-noindex", "No" );
		I.click( { id: "yoast_wpseo_meta-robots-nofollow_0" } );
		I.selectOption( "#yoast_wpseo_meta-robots-adv", "-" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );

		I.click( "Advanced" );
		I.click( { id: "yoast_wpseo_meta-robots-nofollow_1" } );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );

		post.openPost2();
		I.seeInSource( "meta name=\"robots\" content=\"noindex,nofollow\"" );
	} );

Scenario( 'Given robots meta setting configured with <meta name="robots" content="noindex,follow"/>\n' +
	'And "Meta robots advanced" set to default "Site-wide default: None" in Advanced tab of my Post\n' +
	'When I add "No Image index", "No Archive", "No snippet" from drop down list in "Meta robots advanced" in Advanced tab of my Post\n' +
	"And click Update\n" +
	'Then robot meta setting is changed to meta name="robots" content="noindex,nofollow,noimageindex,noarchive,nosnippet"',
	async ( I, post, wpAdmin ) => {
		wpAdmin.editPost2();
		I.click( "Advanced" );
		I.selectOption( "#yoast_wpseo_meta-robots-noindex", "No" );
		I.click( { id: "yoast_wpseo_meta-robots-nofollow_0" } );
		I.selectOption( "#yoast_wpseo_meta-robots-adv", "-" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );

		I.click( "Advanced" );
		I.click( "//span[@class='select2-selection__choice__remove']" );
		I.selectOption( "#yoast_wpseo_meta-robots-adv", "noimageindex" );
		I.selectOption( "#yoast_wpseo_meta-robots-adv", "noarchive" );
		I.selectOption( "#yoast_wpseo_meta-robots-adv", "nosnippet" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );

		post.openPost2();
		I.seeInSource( "meta name=\"robots\" content=\"noindex,follow,noimageindex,noarchive,nosnippet\"" );
	} );
