const { get } = require( "./utils/config" );

Feature( "In order to configure social information in meta settings of Post\n" +
	"As an Yoast SEO user\n" +
	"I need to configure Social profiles" );

Before( ( wpAdmin ) => {
	wpAdmin.loginWPAdmin();
} );

Scenario( 'Given social profiles are empty in "SEO" - "Social" page\n' +
	"When I fill in Facebook Page URL and Twitter Username with \"https://www.facebook.com/hohoho\" and \"hohoho\"\n" +
	"And click \"Save changes\n" +
	"Then meta settings of my Post contain:\n" +
	'meta property="article:publisher" content="https://www.facebook.com/hohoho"\n' +
	'meta name="twitter:site" content="@hohoho"\n' +
	'meta name="twitter:creator" content="@hohoho"',
	async ( I, post, wpAdmin ) => {
		wpAdmin.editSeoSocial();
		I.fillField( { id: "facebook_site" }, "" );
		I.fillField( { id: "twitter_site" }, "" );
		I.click( { id: "submit" } );

		I.fillField( { id: "facebook_site" }, "https://www.facebook.com/hohoho" );
		I.fillField( { id: "twitter_site" }, "hohoho" );
		I.click( { id: "submit" } );

		post.openPost1();
		I.seeInSource( "meta property=\"article:publisher\" content=\"https://www.facebook.com/hohoho\"" );
		I.seeInSource( "meta name=\"twitter:site\" content=\"@hohoho\"" );
		I.seeInSource( "meta name=\"twitter:creator\" content=\"@hohoho\"" );
	} );

Scenario( 'Given Image URL is empty in "SEO" - "Social" Facebook page\n' +
	"And Facebook image is empty in Social - Facebook page of my Post\n" +
	"And no image is presented within my Post\n" +
	"When I upload image to Image URL in \"SEO\" - \"Social\" Facebook page\n" +
	'And click "Save changes"\n' +
	"Then meta settings of my Post contain:\n" +
	'meta property="og:image" content=<link_to_pic>\n',
	// 'meta property="og:image:width" content=<pic_width>\n' +
	// 'meta property="og:image:height" content=<pic_height>',
	async ( I, post, wpAdmin ) => {
		wpAdmin.editSeoSocialFacebook();
		I.fillField( { id: "wpseo_og_default_image" }, "" );
		I.scrollTo( { id: "submit" } );
		I.click( { id: "submit" } );
		wpAdmin.editPost1();
		I.click( 'a[href="#wpseo-meta-section-social"]' );
		I.fillField( "#yoast_wpseo_opengraph-image", "" );
		I.click( { id: "content-html" } );
		I.clearField( { id: "content" } );
		I.fillField( { id: "content" }, "" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );
		post.openPost1();
		I.dontSeeInSource( "meta property=\"og:image\"" );

		wpAdmin.editSeoSocialFacebook();
		I.fillField( { id: "wpseo_og_default_image" }, get( "cookie_monster_pic" ) );
		I.scrollTo( { id: "submit" } );
		I.click( { id: "submit" } );

		post.openPost1();
		I.seeInSource( "meta property=\"og:image\" content=" + get( "cookie_monster_pic" ) );
		// Assertions to be added when image is uploaded correctly
		// I.seeInSource( "meta property=\"og:image:width\" content=" + get( "cookie_monster_pic_width" ) );
		// I.seeInSource( "meta property=\"og:image:height\" content=" + get( "cookie_monster_pic_height" ) );
	} );

Scenario( 'Given Image URL is empty in "SEO" - "Social" Facebook page\n' +
	"And Facebook image is empty in Social - Facebook page of my Post\n" +
	"And no image is presented within my Post\n" +
	"When I upload image to Facebook image in Social - Facebook page of my Post\n" +
	'And click "Update"\n' +
	"Then meta settings of my Post contain:\n" +
	'meta property="og:image" content=<link_to_pic>\n',
	// 'meta property="og:image:width" content=<pic_width>\n' +
	// 'meta property="og:image:height" content=<pic_height>',
	async ( I, post, wpAdmin ) => {
		wpAdmin.editSeoSocialFacebook();
		I.fillField( { id: "wpseo_og_default_image" }, "" );
		I.scrollTo( { id: "submit" } );
		I.click( { id: "submit" } );
		wpAdmin.editPost1();
		I.click( 'a[href="#wpseo-meta-section-social"]' );
		I.fillField( "#yoast_wpseo_opengraph-image", "" );
		I.click( { id: "content-html" } );
		I.clearField( { id: "content" } );
		I.fillField( { id: "content" }, "" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );
		post.openPost1();
		I.dontSeeInSource( "meta property=\"og:image\"" );

		wpAdmin.editPost1();
		I.click( 'a[href="#wpseo-meta-section-social"]' );
		I.fillField( "#yoast_wpseo_opengraph-image", get( "elmo_pic" ) );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );

		post.openPost1();
		I.seeInSource( "meta property=\"og:image\" content=" + get( "elmo_pic" ) );
		// Assertions to be added when image is uploaded correctly
		// I.seeInSource( "meta property=\"og:image:width\" content=" + get( "elmo_pic_width" ) );
		// I.seeInSource( "meta property=\"og:image:height\" content=" + get( "elmo_pic_height" ) );
	} );

Scenario( 'Given Image URL is empty in "SEO" - "Social" Facebook page\n' +
	"And Facebook image is empty in Social - Facebook page of my Post\n" +
	"And no image is presented within my Post\n" +
	"When I upload image to the content of My Post\n" +
	'And click "Update"\n' +
	"Then meta settings of my Post contain:\n" +
	'meta property="og:image" content=<link_to_pic>\n',
	// 'meta property="og:image:width" content=<pic_width>\n' +
	// 'meta property="og:image:height" content=<pic_height>',
	async ( I, post, wpAdmin ) => {
		wpAdmin.editSeoSocialFacebook();
		I.fillField( { id: "wpseo_og_default_image" }, "" );
		I.scrollTo( { id: "submit" } );
		I.click( { id: "submit" } );
		wpAdmin.editPost1();
		I.click( 'a[href="#wpseo-meta-section-social"]' );
		I.fillField( "#yoast_wpseo_opengraph-image", "" );
		I.click( { id: "content-html" } );
		I.clearField( { id: "content" } );
		I.fillField( { id: "content" }, "" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );
		post.openPost1();
		I.dontSeeInSource( "meta property=\"og:image\"" );

		wpAdmin.editPost1();
		I.fillField( { id: "content" }, "<img src=" + get( "piggy_pic" )  + " alt=\"\" width=" + get( "piggy_pic_width" ) + " height=" + get( "piggy_pic_height" ) + " class=\"alignnone size-medium wp-image-66\" />" );
		I.scrollTo( { id: "submitdiv" } );
		I.click( { id: "publish" } );

		post.openPost1();
		I.seeInSource( "meta property=\"og:image\" content=" + get( "piggy_pic" ) );
		// Assertions to be added when image is uploaded correctly
		// I.seeInSource( "meta property=\"og:image:width\" content=" + get( "piggy_pic_width" ) );
		// I.seeInSource( "meta property=\"og:image:height\" content=" + get( "piggy_pic_height" ) );
	} );
