Feature( "In order to configure Post custom Title in meta settings\n" +
	"As an Yoast SEO user\n" +
	"I need to change SEO title/Facebook title/Twitter title" );

Before( ( I, post, wpAdmin ) => {
	wpAdmin.loginWPAdmin();
	wpAdmin.editGeneralSettings();
	I.fillField( "blogname", "Local WordPress Dev" );
	I.scrollTo( { id: "submit" } );
	I.click( { id: "submit" } );
	post.openPost1();
	I.seeInSource( "meta property=\"og:site_name\" content=\"Local WordPress Dev\"" );
} );

Scenario( 'Given SEO title is set to default value in Content optimization tab - "Edit Snippet" of my Post\n' +
	"And Facebook and Twitter titles are not changed\n" +
	'When I change SEO title to "You name it -  %%sitename%%" in Content optimization tab - "Edit Snippet" of my Post\n' +
	"And click Update\n" +
	"Then Title of my Post is set to: <title>You name it - Local WordPress Dev</title>\n" +
	"And meta settings of my Post are set to:\n" +
	'meta property="og:title" content="You name it - Local WordPress Dev"\n' +
	'meta name="twitter:title" content="You name it - Local WordPress Dev"',
	async ( I, post, wpAdmin ) => {
		wpAdmin.editPost1();
		I.click( "Content optimization" );
		I.click( "#wpseo_content" );
		I.click( "Edit snippet" );
		I.see( "SEO title" );
		I.fillField( "SEO title", "" );
		I.click( 'a[href="#wpseo-meta-section-social"]' );
		I.fillField( "#yoast_wpseo_opengraph-title", "" );
		I.click( 'a[href="#wpseo_twitter"]' );
		I.fillField( "#yoast_wpseo_twitter-title", "" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );
		post.openPost1();
		I.seeInSource( "<title>Mypost - Local WordPress Dev</title>" );
		I.seeInSource( "meta property=\"og:title\" content=\"Mypost - Local WordPress Dev\"" );
		I.seeInSource( "meta name=\"twitter:title\" content=\"Mypost - Local WordPress Dev\"" );


		wpAdmin.editPost1();
		I.click( "Content optimization" );
		I.click( "Edit snippet" );
		I.fillField( "SEO title", "You name it -  %%sitename%%" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );

		post.openPost1();
		I.seeInSource( "<title>You name it - Local WordPress Dev</title>" );
		I.seeInSource( "meta property=\"og:title\" content=\"You name it - Local WordPress Dev\"" );
		I.seeInSource( "meta name=\"twitter:title\" content=\"You name it - Local WordPress Dev\"" );
	} );

Scenario( 'Given SEO title is set to default value in Content optimization tab - "Edit Snippet" of my Post\n' +
	"And Facebook title is not changed\n" +
	'When I change Facebook title to "Got it - %%sitename%%" in Social tab of my Post\n' +
	"And click Update\n" +
	'Then meta settings of my Post is set to meta property="og:title" content="Got it Local WordPress Dev"',
	async ( I, post, wpAdmin ) => {
		wpAdmin.editPost1();
		I.click( "Content optimization" );
		I.click( "#wpseo_content" );
		I.click( "Edit snippet" );
		I.see( "SEO title" );
		I.fillField( "SEO title", "" );
		I.click( 'a[href="#wpseo-meta-section-social"]' );
		I.fillField( "#yoast_wpseo_opengraph-title", "" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );
		post.openPost1();
		I.seeInSource( "<title>Mypost - Local WordPress Dev</title>" );
		I.seeInSource( "meta property=\"og:title\" content=\"Mypost - Local WordPress Dev\"" );

		wpAdmin.editPost1();
		I.click( 'a[href="#wpseo-meta-section-social"]' );
		I.fillField( "#yoast_wpseo_opengraph-title", "Got it - %%sitename%%" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );

		post.openPost1();
		I.seeInSource( "meta property=\"og:title\" content=\"Got it - Local WordPress Dev\"" );
	} );

// Scenario fails, known issue https://github.com/Yoast/wordpress-seo/issues/9426
Scenario( 'Given SEO title is set to default value in Content optimization tab - "Edit Snippet" of my Post\n' +
	"And Twitter title is not changed\n" +
	'When I change Twitter title to "Happy life - %%sitename%%" in Social tab of my Post\n' +
	"And click Update\n" +
	'Then meta settings of my Post is set to meta property="twitter:title" content="Happy life - WordPress Dev"',
	async ( I, post, wpAdmin ) => {
		wpAdmin.editPost1();
		I.click( "Content optimization" );
		I.click( "#wpseo_content" );
		I.click( "Edit snippet" );
		I.see( "SEO title" );
		I.fillField( "SEO title", "" );
		I.click( 'a[href="#wpseo-meta-section-social"]' );
		I.click( 'a[href="#wpseo_twitter"]' );
		I.fillField( "#yoast_wpseo_twitter-title", "" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );
		post.openPost1();
		I.seeInSource( "<title>Mypost - Local WordPress Dev</title>" );
		I.seeInSource( "meta name=\"twitter:title\" content=\"Mypost - Local WordPress Dev\"" );

		wpAdmin.editPost1();
		I.click( 'a[href="#wpseo-meta-section-social"]' );
		I.click( 'a[href="#wpseo_twitter"]' );
		I.fillField( "#yoast_wpseo_twitter-title", "Happy life - %%sitename%%" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );

		post.openPost1();
		I.seeInSource( "meta name=\"twitter:title\" content=\"Happy life - Local WordPress Dev\"" );
	} );
