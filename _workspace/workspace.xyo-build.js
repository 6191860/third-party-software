//
// Workspace
//
// Copyright (c) 2016 Grigore Stefan, <g_stefan@yahoo.com>
// Created by Grigore Stefan <g_stefan@yahoo.com>
//
// The MIT License (MIT) <http://opensource.org/licenses/MIT>
//

var options= {};

if(Build.isMode("build")) {
	options.mode="build-x-unify";
};

var solutionList=[
	"zlib",
	"libzip",
	"libpng",
	"win-iconv",
	"libxml2",
	"libxslt",
	"openssl",
	"civetweb"
];

for(var toBuild in solutionList) {
	options.script="solution."+solutionList[toBuild]+".js";
	Build.run(options);
};

