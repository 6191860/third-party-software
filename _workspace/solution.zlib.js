//
// Solution zlib
//
// Copyright (c) 2016 Grigore Stefan, <g_stefan@yahoo.com>
// Created by Grigore Stefan <g_stefan@yahoo.com>
//
// The MIT License (MIT) <http://opensource.org/licenses/MIT>
//

.solution("zlib",function() {
	.withPath("../zlib-1.2.8",function() {

		.option("license","zlib");
		.option("license-file","../_license/license-zlib-1.2.8.txt");

		var sourceFiles=[

					"zlib.h",
					"zconf.h",

					"adler32.*",
					"compress.*",
					"crc32.*",
					"uncompr.*",
					"deflate.*",
					"trees.*",
					"zutil.*",
					"inflate.*",
					"infback.*",
					"inftrees.*",
					"inffast.*",
					"gzread.*",
					"gzwrite.*",
					"gzlib.*",
					"gzclose.*",
					"win32/zlib.def",
					"win32/zlib1.rc"

				];

		.project("libz","lib",function() {
			.file("source",sourceFiles);
			.option("crt","type","static");
			.dependencyOption("crt","type","static");
		});

		.project("libz","dll",function() {
			.file("source",sourceFiles);
			.option("sign","xyo-security");
		});

		.project("minigzip","exe",function() {
			.option("include",".");
			.file("source","test/minigzip.c");
			.dependencyProject("libz","dll");
			.option("digital-sign","xyo-security");
		});

		.project("minizip","exe",function() {
			.option("include",".");
			.file("source","contrib/minizip/minizip.c");
			.file("source","contrib/minizip/zip.c");
			.file("source","contrib/minizip/ioapi.c");
			if(Platform.is("win")) {
				.file("source","contrib/minizip/iowin32.c");
			};
			.dependencyProject("libz","lib");
			.option("crt","type","static");
			.option("digital-sign","xyo-security");
		});

		.project("miniunz","exe",function() {
			.option("include",".");
			.file("source","contrib/minizip/miniunz.c");
			.file("source","contrib/minizip/unzip.c");
			.file("source","contrib/minizip/ioapi.c");
			if(Platform.is("win")) {
				.file("source","contrib/minizip/iowin32.c");
			};
			.dependencyProject("libz","lib");
			.option("crt","type","static");
			.option("digital-sign","xyo-security");
		});

		.project("zlib","install",function() {
			.install("include","zlib.h");
			.install("include","zconf.h");
			.install("license","../_license/license-zlib-1.2.8.txt");
			.install("build-file","libz.lib",["lib/zdll.lib","lib/zlib.lib"]);
		});

	});
});

