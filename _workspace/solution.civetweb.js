//
// Solution civetweb
//
// Copyright (c) 2014 Grigore Stefan, <g_stefan@yahoo.com>
// Created by Grigore Stefan <g_stefan@yahoo.com>
//
// The MIT License (MIT) <http://opensource.org/licenses/MIT>
//

.solution("civetweb",function() {
	.withPath("../civetweb-master",function() {

		.option("include","include");
		.option("include","resources");

		.option("licence","mit");

		.project("civetweb","lib",function() {
			.file("source","src/civetweb.c");
			.option("crt","type","static");
			.dependencyOption("crt","type","static");
		});

		.project("civetweb","dll",function() {
			.file("source","src/civetweb.c");
			.file("source","resources/dll.def");
			.option("sign","xyo-security");
		});

		.project("civetweb","exe",function() {
			.file("source","src/main.c");
			.file("source","resources/res.rc");
			.dependencyProject("civetweb","lib");
			.option("sign","xyo-security");
			.option("library","comdlg32");
		});

		.project("civetweb","install",function() {
			.install("include","include/civetweb.h");
		});

	});
});

