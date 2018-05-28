Feature( "In order to see Locale in meta settings\n" +
	"As an Yoast SEO user\n" +
	"I need to have Locale configured" );

Before( ( wpAdmin ) => {
	wpAdmin.loginWPAdmin();
} );

Scenario( "Given Locale is set by default\n" +
	"When I check meta settings of my Post\n" +
	"Then meta settings of my Post are set to:\n" +
	'meta property="og:locale" content="en_US"',
	async ( I, post  ) => {
		post.openPost1();
		I.seeInSource( "meta property=\"og:locale\" content=\"en_US" );
	} );
