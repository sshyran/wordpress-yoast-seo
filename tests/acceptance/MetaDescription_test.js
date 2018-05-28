Feature( "In order to configure Post custom Description in meta settings\n" +
	"As an Yoast SEO user\n" +
	"I need to change Meta description/Facebook description/Twitter description" );

Before( ( wpAdmin ) => {
	wpAdmin.loginWPAdmin();
} );

Scenario( 'Given Post begins with "This is the beginning of everything!"\n' +
	"And Meta description is left empty in Content optimization tab - \"Edit Snippet\" of my Post\n" +
	"And Facebook and Twitter descriptions are left empty\n" +
	"When I check meta settings of my Post\n" +
	"Then meta settings of my Post are set to:\n" +
	'meta property="og:description" content="This is the beginning of everything!"\n' +
	'meta name="twitter:description" content="This is the beginning of everything!"',
	async ( I, post, wpAdmin ) => {
		wpAdmin.editPost1();
		I.click( { id: "content-html" } );
		I.clearField( { id: "content" } );
		I.fillField( { id: "content" }, "This is the beginning of everything!" );
		I.click( "Update" );
		I.click( "Content optimization" );
		I.click( "#wpseo_content" );
		I.click( "Edit snippet" );
		I.see( "Meta description" );
		I.fillField( "Meta description", "" );
		I.click( 'a[href="#wpseo-meta-section-social"]' );
		I.fillField( "#yoast_wpseo_opengraph-description", "" );
		I.click( 'a[href="#wpseo_twitter"]' );
		I.fillField( "#yoast_wpseo_twitter-description", "" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );

		post.openPost1();
		I.seeInSource( "meta property=\"og:description\" content=\"This is the beginning of everything!\"" );
		I.seeInSource( "meta name=\"twitter:description\" content=\"This is the beginning of everything!\"" );
	} );

Scenario( 'Given Meta description is left empty in Content optimization tab - "Edit Snippet" of my Post\n' +
	"And content of my Post is empty\n" +
	"And Facebook and Twitter descriptions are left empty\n" +
	"When I check meta settings of my Post\n" +
	"Then meta settings of my Post does not include:\n" +
	"meta name=\"description\"\n" +
	"meta property=\"og:description\"n" +
	"meta name=\"twitter:description\"",
	async ( I, post, wpAdmin ) => {
		wpAdmin.editPost1();
		I.click( { id: "content-html" } );
		I.clearField( { id: "content" } );
		I.fillField( { id: "content" }, "" );
		I.click( "Content optimization" );
		I.click( "#wpseo_content" );
		I.click( "Edit snippet" );
		I.see( "Meta description" );
		I.fillField( "Meta description", "" );
		I.click( 'a[href="#wpseo-meta-section-social"]' );
		I.click( { id: "publish" } );

		post.openPost1();
		I.dontSeeInSource( "meta name=\"description\"" );
		I.dontSeeInSource( "meta property=\"og:description\"" );
		I.dontSeeInSource( "meta name=\"twitter:description\"" );
	} );

Scenario( 'Given Meta description is left empty in Content optimization tab - "Edit Snippet" of my Post\n' +
	"And Facebook and Twitter descriptions are left empty\n" +
	'When I change Meta Description to "I confi-gure you!" in Content optimization tab - "Edit Snippet" of my Post\n' +
	"And click Update\n" +
	"Then meta settings of my Post are set to:\n" +
	'meta name="description" content="I confi-gure you!"\n' +
	'meta property="og:description" content="I confi-gure you!"\n' +
	'meta name="twitter:description" content="I confi-gure you!"',
	async ( I, post, wpAdmin ) => {
		wpAdmin.editPost1();
		I.click( "Content optimization" );
		I.click( "#wpseo_content" );
		I.click( "Edit snippet" );
		I.see( "Meta description" );
		I.fillField( "Meta description", "" );
		I.click( 'a[href="#wpseo-meta-section-social"]' );
		I.fillField( "#yoast_wpseo_opengraph-description", "" );
		I.click( 'a[href="#wpseo_twitter"]' );
		I.fillField( "#yoast_wpseo_twitter-description", "" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );

		I.click( "Content optimization" );
		I.click( "#wpseo_content" );
		I.click( "Edit snippet" );
		I.see( "Meta description" );
		I.fillField( "Meta description", "I confi-gure you!" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );


		post.openPost1();
		I.seeInSource( "meta name=\"description\" content=\"I confi-gure you!\"" );
		I.seeInSource( "meta property=\"og:description\" content=\"I confi-gure you!\"" );
		I.seeInSource( "meta name=\"twitter:description\" content=\"I confi-gure you!\"" );
	} );

Scenario( 'Given Meta description is configure with "I confi-gure you!" in Content optimization tab - "Edit Snippet" of my Post\n' +
	"And Facebook description is not changed\n" +
	'When I change Facebook description to "I did not configure you" in Social tab of my Post\n' +
	"And click Update\n" +
	"Then meta settings of my Post is changed to meta property=\"og:description\" content=\"I did not configure you\"\n",
	async ( I, post, wpAdmin ) => {
		wpAdmin.editPost1();
		I.click( "Content optimization" );
		I.click( "#wpseo_content" );
		I.click( "Edit snippet" );
		I.see( "Meta description" );
		I.fillField( "Meta description", "I confi-gure you!" );
		I.click( 'a[href="#wpseo-meta-section-social"]' );
		I.fillField( "#yoast_wpseo_opengraph-description", "" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );
		post.openPost1();
		I.seeInSource( "meta name=\"description\" content=\"I confi-gure you!\"" );
		I.seeInSource( "meta property=\"og:description\" content=\"I confi-gure you!\"" );

		wpAdmin.editPost1();
		I.click( 'a[href="#wpseo-meta-section-social"]' );
		I.fillField( "#yoast_wpseo_opengraph-description", "I did not configure you" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );

		post.openPost1();
		I.seeInSource( "meta property=\"og:description\" content=\"I did not configure you\"" );
	} );

Scenario( 'Given Meta description is configure with "I confi-gure you!" in Content optimization tab - "Edit Snippet" of my Post\n' +
	"And Twitter description is not changed\n" +
	'When I change Twitter description to "I will not configure you" in Social tab of my Post\n' +
	"And click Update\n" +
	"Then meta settings of my Post is changed to meta name=\"twitter:description\" content=\"I will not configure you\"\n",
	async ( I, post, wpAdmin ) => {
		wpAdmin.editPost1();
		I.click( "Content optimization" );
		I.click( "#wpseo_content" );
		I.click( "Edit snippet" );
		I.see( "Meta description" );
		I.fillField( "Meta description", "I confi-gure you!" );
		I.click( 'a[href="#wpseo-meta-section-social"]' );
		I.click( 'a[href="#wpseo_twitter"]' );
		I.fillField( "#yoast_wpseo_twitter-description", "" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );
		post.openPost1();
		I.seeInSource( "meta name=\"description\" content=\"I confi-gure you!\"" );
		I.seeInSource( "meta name=\"twitter:description\" content=\"I confi-gure you!\"" );

		wpAdmin.editPost1();
		I.click( 'a[href="#wpseo-meta-section-social"]' );
		I.click( 'a[href="#wpseo_twitter"]' );
		I.fillField( "#yoast_wpseo_twitter-description", "I will not configure you" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );

		post.openPost1();
		I.seeInSource( "meta name=\"twitter:description\" content=\"I will not configure you\"" );
	} );
