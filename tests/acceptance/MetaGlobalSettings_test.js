Feature( "In order to configure canonical link in meta settings of Post\n" +
	"As an Yoast SEO user\n" +
	"I need to change settings in Advanced tab of Post" );

Before( ( wpAdmin ) => {
	wpAdmin.loginWPAdmin();
} );

Scenario( "Given Site Title is configured with “Local WordPress Dev” in Settings - General\n" +
	"When I change Site Title to “My WordPress”  in Settings - General\n" +
	"And click Save Changes\n" +
	'Then meta settings contain meta property="og:site_name" content="My WordPress”',
	async ( I, post, wpAdmin ) => {
		wpAdmin.editGeneralSettings();
		I.fillField( "blogname", "Local WordPress Dev" );
		I.scrollTo( { id: "submit" } );
		I.click( { id: "submit" } );
		post.openPost1();
		I.seeInSource( "meta property=\"og:site_name\" content=\"Local WordPress Dev\"" );

		wpAdmin.editGeneralSettings();
		I.fillField( "blogname", "My WordPress" );
		I.scrollTo( { id: "submit" } );
		I.click( { id: "submit" } );
		post.openPost1();
		I.seeInSource( "meta property=\"og:site_name\" content=\"My WordPress\"" );
	} );

Scenario( "Given Facebook App ID is empty in SEO - Social - Facebook (is empty)\n" +
	"When I fill in Facebook App ID with “fb_app_id” in SEO - Social - Facebook\n" +
	"And click Save changes\n" +
	'Then meta settings contain meta property="fb:app_id" content="fb_app_id”',
	async ( I, post, wpAdmin ) => {
		wpAdmin.editSeoSocialFacebook();
		I.fillField( { id: "fbadminapp" }, "" );
		I.scrollTo( { id: "submit" } );
		I.click( { id: "submit" } );
		post.openPost1();
		I.dontSeeInSource( "meta property=\"fb:app_id\"" );

		wpAdmin.editSeoSocialFacebook();
		I.fillField( { id: "fbadminapp" }, "fb_app_id" );
		I.scrollTo( { id: "submit" } );
		I.click( { id: "submit" } );
		post.openPost1();
		I.seeInSource( "meta property=\"fb:app_id\" content=\"fb_app_id\"" );
	} );

Scenario( "Given Facebook App ID is configured with “fb_app_id” in SEO - Social - Facebook\n" +
	"When I add in Facebook App ID another id “fb_app_id1” separating them with comma in SEO - Social - Facebook\n" +
	"And click Save changes\n" +
	'Then meta settings contain meta property="fb:app_id" content="fb_app_id, “fb_app_id1”',
	async ( I, post, wpAdmin ) => {
		wpAdmin.editSeoSocialFacebook();
		I.fillField( { id: "fbadminapp" }, "fb_app_id" );
		I.scrollTo( { id: "submit" } );
		I.click( { id: "submit" } );
		post.openPost1();
		I.seeInSource( "meta property=\"fb:app_id\" content=\"fb_app_id\"" );

		wpAdmin.editSeoSocialFacebook();
		I.fillField( { id: "fbadminapp" }, "fb:app_id, fb_app_id1" );
		I.scrollTo( { id: "submit" } );
		I.click( { id: "submit" } );
		post.openPost1();
		I.seeInSource( "meta property=\"fb:app_id\" content=\"fb:app_id, fb_app_id1\"" );
	} );

Scenario( "Given I am on SEO - Social - Twitter page\n" +
	"And in “The default card type to use” drop down menu “Summary” is chosen\n" +
	"And click Save changes\n" +
	'Then meta settings contain meta name="twitter:card" content="summary"',
	async ( I, post, wpAdmin ) => {
		wpAdmin.editSeoSocialTwitter();
		I.selectOption( "#twitter_card_type", "Summary" );
		I.click( { id: "submit" } );
		post.openPost1();
		I.seeInSource( "meta name=\"twitter:card\" content=\"summary\"" );
	} );

Scenario( "Given I am on SEO - Social - Twitter page\n" +
	"And in “The default card type to use” drop down menu “Summary” is chosen\n" +
	"And click Save changes\n" +
	'Then meta settings contain meta name="twitter:card" content="summary"',
	async ( I, post, wpAdmin ) => {
		wpAdmin.editSeoSocialTwitter();
		I.selectOption( "#twitter_card_type", "Summary with large image" );
		I.click( { id: "submit" } );
		post.openPost1();
		I.seeInSource( "meta name=\"twitter:card\" content=\"summary_large_image\"" );
	} );
