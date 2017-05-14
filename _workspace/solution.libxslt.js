//
// Solution libxslt
//
// Copyright (c) 2016 Grigore Stefan, <g_stefan@yahoo.com>
// Created by Grigore Stefan <g_stefan@yahoo.com>
//
// The MIT License (MIT) <http://opensource.org/licenses/MIT>
//

.solution("libxslt",function() {
	.withPath("../libxslt-1.1.28",function() {

		.project("libxslt","process",function() {

			.process=function(mode,solution) {
				switch(mode) {
					case "build":

						var buildPath=Platform.buildPath(solution).replace("/","\\");
						var fileMarkBuild=buildPath+"/libxslt.process.build.done.txt";
						if(!Shell.fileExists(fileMarkBuild)) {

							Script.with(new Make(),function() {
								.target("win32/Makefile.msvc","../_port/libxslt.win32.Makefile.msvc",.copyFile);
								.build();
							});

							Shell.chdir("win32");
							cmd="cscript configure.js";
							//cmd+=" help";
							cmd+=" xslt_debug=no";
							cmd+=" debugger=no";
							cmd+=" zlib=yes";
							cmd+=" vcmanifest=yes";
							cmd+=" debug=no";
							cmd+=" static=no";

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

			.dependency("libxml2","libxml2","dll");
		});

		.project("libxslt","dependency-dll",function() {
			.dependency("libxml2","libxml2","dll");
			.dependencyProject("libxslt","process");
		});

		.project("libxslt","install",function() {
			.install("build-directory","include/libexslt","include/libexslt");
			.install("build-directory","include/libxslt","include/libxslt");

			.install("build-directory","bin","bin");
			.install("build-file","lib/libexslt.lib","lib/libexslt.lib");
			.install("build-file","lib/libxslt.lib","lib/libxslt.lib");
		});

	});
});


