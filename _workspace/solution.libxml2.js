//
// Solution libxml2
//
// Copyright (c) 2016 Grigore Stefan, <g_stefan@yahoo.com>
// Created by Grigore Stefan <g_stefan@yahoo.com>
//
// The MIT License (MIT) <http://opensource.org/licenses/MIT>
//

.solution("libxml2",function() {
	.withPath("../libxml2-2.9.1",function() {

		.project("libxml2","process",function() {

			.process=function(mode,solution) {
				switch(mode) {
					case "build":

						var buildPath=Platform.buildPath(solution).replace("/","\\");
						var fileMarkBuild=buildPath+"/libxml2.process.build.done.txt";
						if(!Shell.fileExists(fileMarkBuild)) {

							Shell.chdir("win32");
							cmd="cscript configure.js";
							//cmd+=" help";
							cmd+=" zlib=yes";
							cmd+=" vcmanifest=yes";
							cmd+=" debug=no";
							cmd+=" static=no";
							cmd+=" xml_debug=yes";

							cmd+=" bindir="+buildPath+"\\bin";
							cmd+=" incdir="+buildPath+"\\include";
							cmd+=" libdir="+buildPath+"\\lib";
							cmd+=" sodir="+buildPath+"\\bin";

							Shell.cmd(cmd);
							Shell.cmd("nmake /f Makefile.msvc clean");
							Shell.cmd("nmake /f Makefile.msvc");
							Shell.cmd("nmake /f Makefile.msvc install");
							Shell.cmd("nmake /f Makefile.msvc clean");

							Shell.prepareFilePath(fileMarkBuild);
							Shell.touch(fileMarkBuild);

						};

						break;
				};
				return true;
			};

			.dependency("zlib","libz","dll");
			.dependency("win-iconv","win-iconv","dll");
		});

		.project("libxml2","dependency-dll",function() {
			.dependency("zlib","libz","dll");
			.dependency("win-iconv","win-iconv","dll");
			.dependencyProject("libxml2","process");
		});

		.project("libxml2","install",function() {
			.install("build-directory","include/libxml2/libxml","include/libxml");
			.install("build-file","bin/libxml2.dll","bin/libxml2.dll");
			.install("build-file","bin/xmlcatalog.exe","bin/xmlcatalog.exe");
			.install("build-file","bin/xmllint.exe","bin/xmllint.exe");
			.install("build-file","lib/libxml2.lib","lib/libxml2.lib");
			.install("build-file","lib/libxml2_a.lib","lib/libxml2_a.lib");
			.install("build-file","lib/libxml2_a_dll.lib","lib/libxml2_a_dll.lib");
		});

	});
});


