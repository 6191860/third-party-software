//
// Solution openssl
//
// Copyright (c) 2016 Grigore Stefan, <g_stefan@yahoo.com>
// Created by Grigore Stefan <g_stefan@yahoo.com>
//
// The MIT License (MIT) <http://opensource.org/licenses/MIT>
//

.solution("openssl",function() {
	.withPath("../openssl-1.0.1s",function() {

		.project("openssl","process",function() {

			.process=function(mode,solution) {
				switch(mode) {
					case "build":

						var buildPath=Platform.buildPath(solution).replace("/","\\");
						var fileMarkBuild=buildPath+"/openssl.process.build.done.txt";
						if(!Shell.fileExists(fileMarkBuild)) {

							With(new Make(),function() {
								.target("ms/32all.bat","../_port/openssl.ms.32all.bat",.copyFile);
								.build();
							});

							Shell.removeDirRecursively("tmp32");
							Shell.removeDirRecursively("tmp32.dbg");
							Shell.removeDirRecursively("tmp32dll");
							Shell.removeDirRecursively("tmp32dll.dll");
							Shell.removeDirRecursively("tmp32dll.dbg");
							Shell.removeDirRecursively("out32");
							Shell.removeDirRecursively("out32.dbg");
							Shell.removeDirRecursively("out32dll");
							Shell.removeDirRecursively("out32dll.dbg");

							if(Platform.is("win32")) {
								Shell.cmd("perl Configure VC-WIN32");
								Shell.cmd("cmd.exe /C call ms\\32all.bat");
							};

							if(Platform.is("win64")) {
								Shell.cmd("perl Configure VC-WIN64A");
								Shell.cmd("cmd.exe /C call ms\\do_win64a.bat");
								Shell.cmd("nmake -f ms\\ntdll.mak");
							};

							var buildPath=Platform.buildPath(solution).replace("/","\\");

							Shell.prepareFilePath(buildPath+"\\bin\\.dummy");
							Shell.prepareFilePath(buildPath+"\\lib\\.dummy");
							Shell.prepareFilePath(buildPath+"\\include\\.dummy");

							Shell.copy("out32dll\\openssl.exe",buildPath+"\\bin\\openssl.exe");
							Shell.copyFilesToDirectory("out32dll\\*.dll",buildPath+"\\bin");
							Shell.copyFilesToDirectory("out32dll\\*.lib",buildPath+"\\lib");
							Shell.copy("out32\\libeay32.lib",buildPath+"\\lib\\libeay32.static.lib");
							Shell.copy("out32\\ssleay32.lib",buildPath+"\\lib\\ssleay32.static.lib");
							Shell.copyDirRecursively("inc32\\openssl",buildPath+"\\include\\openssl");

							Shell.prepareFilePath(buildPath+"\\lib\\VC\\.dummy");
							Shell.copy("out32dll\\libeay32.lib",buildPath+"\\lib\\libeay32.lib");
							Shell.copy("out32dll\\libeay32.lib",buildPath+"\\lib\\libeay32st.lib");
							Shell.copy("out32dll\\libeay32.lib",buildPath+"\\lib\\VC\\libeay32MD.lib");
							Shell.copy("out32dll\\libeay32.lib",buildPath+"\\lib\\VC\\libeay32st.lib");

							Shell.copy("out32dll\\ssleay32.lib",buildPath+"\\lib\\ssleay32.lib");
							Shell.copy("out32dll\\ssleay32.lib",buildPath+"\\lib\\ssleay32st.lib");
							Shell.copy("out32dll\\ssleay32.lib",buildPath+"\\lib\\VC\\ssleay32MD.lib");
							Shell.copy("out32dll\\ssleay32.lib",buildPath+"\\lib\\VC\\ssleay32st.lib");

							Shell.removeDirRecursively("tmp32");
							Shell.removeDirRecursively("tmp32.dbg");
							Shell.removeDirRecursively("tmp32dll");
							Shell.removeDirRecursively("tmp32dll.dll");
							Shell.removeDirRecursively("tmp32dll.dbg");
							Shell.removeDirRecursively("out32");
							Shell.removeDirRecursively("out32.dbg");
							Shell.removeDirRecursively("out32dll");
							Shell.removeDirRecursively("out32dll.dbg");

							Shell.prepareFilePath(fileMarkBuild);
							Shell.touch(fileMarkBuild);

						};

						break;
				};
				return true;
			};

		});


		.project("openssl","dependency-exe",function() {
			.dependencyProject("openssl","process");
		});
		.project("openssl","dependency-dll",function() {
			.dependencyProject("openssl","process");
			.dependencyOption("library","libeay32");
			.dependencyOption("library","ssleay32");
		});
		.project("openssl","dependency-lib",function() {
			.dependencyProject("openssl","process");

			.dependencyOption("library","libeay32.static");
			.dependencyOption("library","ssleay32.static");
		});

		.project("openssl","install",function() {

			.install("build-directory","bin","bin");
			.install("build-directory","lib","lib");
			.install("build-directory","include","include");

		});
	});
});

