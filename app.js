var fs = require('fs');
var path = require('path');
var readline = require('readline');
var clc = require('cli-color');


// print process.argv
// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });

/** helper */
var processLines = function( path_in, filename_in , info2){
	var rd = readline.createInterface({
    input: fs.createReadStream(path_in),
    output: process.stdout,
    terminal: false
    });
    rd.on('line', function(line , filename){
    	var startIndex =0;
    	if( (startIndex = line.toLowerCase().indexOf("http://mpstd-soa01:8001/soa-infra/")) > -1 ){
	    	//console.log(filename_in);
	    	console.log(clc.magentaBright(filename_in)+ clc.yellowBright(" -> ") +clc.cyan(info2) );
	    	console.log("	"+line.substring(startIndex +33));
    	}
    });
}
/** main routine to search the proxyfile and extract service end points in a service directory*/
var processMain = function(){
	var arg_dir =".";
	if( process.argv[3]){
		arg_dir = process.argv[3];
	}else{
		arg_dir ="C:\\Users\\tyoon\\Webcenter\\MPSTDView\\Services\\src\\mil\\army\\mepcom\\mpstd\\services";
	}
	console.log('Starting directory: ' + process.cwd());
	try {
	  process.chdir( path.normalize(arg_dir) );
	  console.log('New directory: ' + process.cwd());
	}
	catch (err) {
	  console.log('chdir: ' + err);
	}

	var top_dirs =fs.readdirSync(process.cwd());

	top_dirs.forEach(function(val_top, index_top){
		var second_dir_name = path.join(path.normalize(arg_dir),val_top);
		if(fs.lstatSync(second_dir_name).isDirectory() &&
			val_top.toUpperCase() != ".SVN"){
				var second_dirs = fs.readdirSync( second_dir_name );

				if(second_dirs){
					//console.log(index_top+"+"+val_top);
					second_dirs.forEach(function(val,index){
						if(val.toUpperCase() !=".SVN"){
							if( val.toUpperCase().indexOf(".JAVA") > -1){
								//console.log("	"+val);
								processLines( path.join(second_dir_name,val), val_top , val);
							}
						}
					})
				}
		}
	})
}

/** execute main */
processMain();