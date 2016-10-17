//
// Solution win-iconv
//
// Copyright (c) 2016 Grigore Stefan, <g_stefan@yahoo.com>
// Created by Grigore Stefan <g_stefan@yahoo.com>
//
// The MIT License (MIT) <http://opensource.org/licenses/MIT>
//

//
// Source code of library
// svn checkout http://win-iconv.googlecode.com/svn/trunk/ win-iconv
//

.solution("win-iconv",function() {
	.withPath("../win-iconv",function() {

		.option("licence","public-domain");

		.project("win-iconv","lib",function() {
			.file("source","win_iconv.c");
			.option("crt","type","static");
			.dependencyOption("crt","type","static");
			.dependencyOption("install-include","iconv");
		});

		.project("win-iconv","dll",function() {
			.option("define","MAKE_DLL");
			.file("source","win_iconv.c");
			.file("source","iconv.def");
			.option("sign","xyo-security");
			.dependencyOption("install-include","iconv");
		});

		.project("win-iconv","exe",function() {
			.option("define","MAKE_EXE");
			.file("source","win_iconv.c");
			.option("sign","xyo-security");
		});

		.project("win-iconv","install",function() {
			.install("include","iconv.h",["","iconv"]);
			.install("build-file","win-iconv.lib","lib/iconv.lib");
		});

	});
});

