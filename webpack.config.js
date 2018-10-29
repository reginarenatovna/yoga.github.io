let path = require('path');

let conf = {
	entry : './src-js/index.js',
	output : {
		path : path.resolve(__dirname, './dist-js/'),
		filename : 'main.js',
		publicPath : 'dist/'
	},//default sitting 
	devServer : {
		overlay : true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
				// exclude : '/node_modules'
			}
		]
	},
	watch: true,
	devtool: 'cheap-eval-source-map'
};

module.exports = conf; 