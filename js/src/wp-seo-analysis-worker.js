import { App } from "yoastseo";

let app;

function initialize( payload ) {
	console.log( 'ARGS', payload );
}


function executeCommand( command, payload ) {
	switch ( command ) {
		case "initialize":
			initialize( payload );
			break;
	}
}

function router( message ) {
	const { data } = message;
	const { command, payload } = data;

	executeCommand( command, payload );
}

onmessage = function( message ) {
	console.log( message );

	postMessage( [ "HI" ] );
};

console.log( 'hi' );
