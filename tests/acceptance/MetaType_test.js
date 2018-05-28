Feature( "In order to set property Type in meta settings\n" +
	"As an Yoast SEO user\n" +
	"I need to have configured OG:Type" );

Before( ( wpAdmin ) => {
	wpAdmin.loginWPAdmin();
} );

Scenario( "Given my Post is singular content\n" +
	"When I check meta settings of my Post\n" +
	"Then meta settings of my Post are set to:\n" +
	'meta property="og:type" content="article"',
	async ( I, post  ) => {
		post.openPost1();
		I.seeInSource( "meta property=\"og:type\" content=\"article\"" );
	} );

Scenario( "Given I am at my homepage\n" +
	"When I check meta settings of my Post\n" +
	"Then meta settings of my Post are set to:\n" +
	'meta property="og:type" content="website"',
	async ( I, post  ) => {
		post.openHomepage();
		I.seeInSource( "meta property=\"og:type\" content=\"website\"" );
	} );
