//
// Solution libpng
//
// Copyright (c) 2016 Grigore Stefan, <g_stefan@yahoo.com>
// Created by Grigore Stefan <g_stefan@yahoo.com>
//
// The MIT License (MIT) <http://opensource.org/licenses/MIT>
//

.solution("libpng",function() {
	.withPath("../libpng-1.6.21",function() {

		.option("license","zlib");
		.option("license-file","../_license/license-libpng-1.6.21.txt");
		.option("define","__STDC__");

		var sourceFiles=[

					"pngconf.*",
					"pnglibconf.*",
					"png.*",
					"pnginfo.*",
					"pngstruct.*",

					"pngerror.*",
					"pngget.*",
					"pngmem.*",
					"pngpread.*",
					"pngread.*",
					"pngrio.*",
					"pngrtran.*",
					"pngrutil.*",
					"pngset.*",
					"pngtrans.*",
					"pngwio.*",
					"pngwrite.*",
					"pngwtran.*",
					"pngwutil.*",
					"scripts/pngwin.rc"

				];

		.project("libpng","process",function() {
			.process=function(mode) {
				switch(mode) {
					case "build":
						With(new Make(),function() {
							.target("pnglibconf.h","../_port/libpng.pnglibconf.h",.copyFile);
							.build();
						});
						break;
				};
				return true;
			};
		});

		.project("libpng","lib",function() {
			.file("source",sourceFiles);
			.dependency("zlib","libz","lib");
			.dependencyProject("libpng","process");
		});

		.project("libpng","dll",function() {
			.file("source",sourceFiles);
			.file("source","../_port/libpng.scripts.symbols.def");
			.option("sign","xyo-security");
			.dependency("zlib","libz","dll");
			.dependencyProject("libpng","process");
		});

		.project("pngtest","exe",function() {
			.file("source","pngtest.c");
			.option("sign","xyo-security");
			.dependencyProject("libpng","dll");
		});

		.project("libpng","install",function() {
			.install("include","pngconf.h");
			.install("include","pnglibconf.h");
			.install("include","png.h");
			.install("include","pnginfo.h");
			.install("include","pngstruct.h");
			.install("license","../_license/license-libpng-1.6.21.txt");
		});

	});
});

