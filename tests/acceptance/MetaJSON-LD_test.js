const { get } = require( "./utils/config" );

Feature( "In order to configure JSON-LD in meta settings of Post\n" +
	"As an Yoast SEO user\n" +
	"I need to configure Knowledge Graph in \"SEO\" - \"Search Appearance\" page" );

Before( ( wpAdmin ) => {
	wpAdmin.loginWPAdmin();
} );

Scenario( 'Given social profiles are configured in "SEO" - "Social" page with "https://www.facebook.com/hohoho" and twitter "hohoho"\n' +
	"And Knowledge Graph is not set to Company or Person in \"SEO\" - \"Search Appearance\" page\n" +
	"When choose Company in Knowledge Graph\n" +
	"And fill in Company name \"Yoast\"\n" +
	"And click \"Save changes\"" +
	"Then meta settings of my Post contain type=\"application/ld+json with correct data\n",
	async ( I, post, wpAdmin ) => {
		wpAdmin.editSeoSocial();
		I.fillField( { id: "facebook_site" }, "https://www.facebook.com/hohoho" );
		I.fillField( { id: "twitter_site" }, "hohoho" );
		I.click( { id: "submit" } );
		wpAdmin.editSeoSearchAppearance();
		I.selectOption( "#company_or_person", "Choose whether you're a company or person" );
		I.click( { id: "submit" } );

		wpAdmin.editSeoSearchAppearance();
		I.selectOption( "#company_or_person", "Company" );
		I.fillField( { id: "company_name" }, "Yoast" );
		I.click( { id: "submit" } );

		post.openPost1();
		I.seeInSource( get( "ld_json_company" ) );
	} );

Scenario( 'Given social profiles are configured in "SEO" - "Social" page with "https://www.facebook.com/hohoho" and twitter "hohoho"\n' +
	"And Knowledge Graph is not set to Company or Person in \"SEO\" - \"Search Appearance\" page\n" +
	"When choose Person in Knowledge Graph\n" +
	"And fill in name \"Henk\"\n" +
	"And click \"Save changes\"" +
	"Then meta settings of my Post contain type=\"application/ld+json with correct data\n",
	async ( I, post, wpAdmin ) => {
		wpAdmin.editSeoSocial();
		I.fillField( { id: "facebook_site" }, "https://www.facebook.com/hohoho" );
		I.fillField( { id: "twitter_site" }, "hohoho" );
		I.click( { id: "submit" } );
		wpAdmin.editSeoSearchAppearance();
		I.selectOption( "#company_or_person", "Choose whether you're a company or person" );
		I.click( { id: "submit" } );

		wpAdmin.editSeoSearchAppearance();
		I.selectOption( "#company_or_person", "Person" );
		I.fillField( { id: "person_name" }, "Henk" );
		I.click( { id: "submit" } );

		post.openPost1();
		I.seeInSource( get( "ld_json_person" ) );
	} );
