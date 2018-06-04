Feature( "In order to configure canonical link in meta settings of Post\n" +
	"As an Yoast SEO user\n" +
	"I need to change settings in Advanced tab of Post" );

Before( ( wpAdmin ) => {
	wpAdmin.loginWPAdmin();
} );

Scenario( 'Given "Allow search engines to show this Post in search results?" is set to "Default for Posts, currently: Yes" in Advanced tab of my Post\n' +
	"And Canonical URL is left empty in Advanced tab of my Post\n" +
	"And permalink of my Post is http://local.wordpress.test/newpost/\n" +
	"When I check meta settings of my Post\n" +
	"And click Update\n" +
	"Then meta settings are:\n" +
	'link rel="canonical" href="http://local.wordpress.test/newpost\n' +
	'meta property="og:url" content="http://local.wordpress.test/newpost"',
	async ( I, post, wpAdmin ) => {
		wpAdmin.editPost2();
		I.click( "Advanced" );
		I.selectOption( "#yoast_wpseo_meta-robots-noindex", "Default for Posts, currently: Yes" );
		I.fillField( "yoast_wpseo_canonical", "" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );

		post.openPost2();
		I.seeInSource( "link rel=\"canonical\" href=\"http://local.wordpress.test/newpost\"" );
		I.seeInSource( "meta property=\"og:url\" content=\"http://local.wordpress.test/newpost\"" );
	} );

Scenario( 'Given "Allow search engines to show this Post in search results?" is set to "Default for Posts, currently: Yes" in Advanced tab of my Post\n' +
	"And Canonical URL is left empty in Advanced tab of my Post\n" +
	"And permalink of my Post is http://local.wordpress.test/newpost/\n" +
	'When I set canonical link to http://local.wordpress.test/mypost/ in Advanced tab - "Canonical URL" of my Post\n' +
	"And click Update\n" +
	"Then meta settings are:\n" +
	'link rel="canonical" href="http://local.wordpress.test/mypost/\n' +
	'meta property="og:url" content="http://local.wordpress.test/mypost/"',
	async ( I, post, wpAdmin ) => {
		wpAdmin.editPost2();
		I.click( "Advanced" );
		I.selectOption( "#yoast_wpseo_meta-robots-noindex", "Default for Posts, currently: Yes" );
		I.fillField( "yoast_wpseo_canonical", "" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );

		I.click( "Advanced" );
		I.fillField( "yoast_wpseo_canonical", "http://local.wordpress.test/mypost/" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );

		post.openPost2();
		I.seeInSource( "link rel=\"canonical\" href=\"http://local.wordpress.test/mypost/\"" );
		I.seeInSource( "meta property=\"og:url\" content=\"http://local.wordpress.test/mypost/\"" );
	} );

Scenario( "Given Canonical URL is configured with http://local.wordpress.test/mypost/ in Advanced tab of my Post\n" +
	'And "Allow search engines to show this Post in search results?" is set to "Default for Posts, currently: Yes" in Advanced tab of my Post\n' +
	'When I set "Allow search engines to show this Post in search results?" to No in Advanced tab of my Post\n' +
	"And click Update\n" +
	"Then canonical link is not included in meta settings\n" +
	"And meta property=\"og:url\" content=\"http://local.wordpress.test/mypost/\n",
	async ( I, post, wpAdmin ) => {
		wpAdmin.editPost2();
		I.click( "Advanced" );
		I.selectOption( "#yoast_wpseo_meta-robots-noindex", "Default for Posts, currently: Yes" );
		I.fillField( "yoast_wpseo_canonical", "http://local.wordpress.test/mypost/" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );

		I.click( "Advanced" );
		I.selectOption( "#yoast_wpseo_meta-robots-noindex", "No" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );

		post.openPost2();
		I.dontSeeInSource( "link rel=\"canonical\" href=\"http://local.wordpress.test/mypost\"" );
	} );
