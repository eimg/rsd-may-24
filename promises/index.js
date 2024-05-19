function a() {
    return "Function A";
}

function b() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
			resolve("Function B");
		}, 2000);
    });
}

function c() {
    return "Function C";
}

console.log( a() );

b().then(result => {
    console.log(result);

    console.log( c() );
});

// async function app() {
//     console.log( a() );
//     console.log( await b() );
//     console.log( c() );
// }

// app();
