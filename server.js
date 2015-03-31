var http = require("http");
var url = require("url");
var fs = require('fs');
var qs = require('querystring');
var json2csv = require('json2csv');

function start (route) {

	function onRequest (req,res) {
		if (req.method == 'POST') {
			var body = '';
			req.on('data', function (data) {
				body += data;

				// Too much POST data, kill the connection!
				if (body.length > 1e6)
					req.connection.destroy();
			});
			req.on('end', function () {
				var post = qs.parse(body);
				console.log("post data: " + body);
				
				fs.appendFile('data.json', body + ",");
				
				res.writeHead(200);
				res.end();
				// use post['blah'], etc.
			});
		}
	}
	http.createServer(onRequest).listen(80);
	console.log("Server started");
}

exports.start = start;