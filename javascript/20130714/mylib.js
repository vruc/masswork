

// 商店名字: 指的就是这里的模块名
// 从哪进货: 代表它依赖什么其他模块
// 只卖什么: 表示它对外提供一些什么特性

(function( win, undefined ) {
	var moduleMap = {};
	var fileMap = {};
	var noop = function(){};

	win.thin = {

		log: function(msg){
			console.log(msg);
		},

		define: function( name, dependencies, factory ){
			
			if( !moduleMap[name] ){
				var module = {
					name: name,
					dependencies: dependencies,
					factory: factory
				};
				moduleMap[name] = module;
			}
			return moduleMap[name];
		},

		use: function(name){
			
			var module = moduleMap[name];
			var argDecl = annotate(module.factory);
			if(!module.entity){
				var args = [], nss = {};

				module.dependencies.forEach(function(item){
					if(item.lastIndexOf('.')>-1){
						var sp = item.split('.'), len = sp.length;
						nss[sp[len-1]] = sp.slice(0, len-1).join('.');
					}
				});

				for (var i = 0, l = module.dependencies.length; i < l; i++) {

					var arg = argDecl[i], 
						dep = module.dependencies[i],
						key = isInObject(arg, nss);
						
					arg = key !== false ? [nss[key], key].join('.') : arg;


					if(arg != dep ){
						if(moduleMap[arg].entity){
							args.push(moduleMap[arg].entity);
						} else {
							args.push(this.use(arg));
						}
					}
					else if(dep.entity){
						args.push(dep.entity);
					} else {
						args.push(this.use(dep));
					}
				};
				module.entity = module.factory.apply(noop, args);
			}
			return module.entity;
		},

		use2: function(name){
			
			var module = moduleMap[name];
			var argDecl = annotate(module.factory);
			if(!module.entity){
				var args = [], nss = {};

				module.dependencies.forEach(function(item){
					if(item.lastIndexOf('.')>-1){
						var sp = item.split('.'), len = sp.length;
						nss[sp[len-1]] = sp.slice(0, len-1).join('.');
					}
				});

				for (var i = 0, l = module.dependencies.length; i < l; i++) {

					var arg = argDecl[i], 
						dep = module.dependencies[i];
					arg = arg in nss ? [nss[arg], arg].join('.') : arg;

					if(arg != module.dependencies[i] ){
						if(moduleMap[arg].entity){
							args.push(moduleMap[arg].entity);
						} else {
							args.push(this.use(arg));
						}
					}
					else if(module.dependencies[i].entity){
						args.push(module.dependencies[i].entity);
					} else {
						args.push(this.use(module.dependencies[i]));
					}
				};
				module.entity = module.factory.apply(noop, args);
			}
			return module.entity;
		}
	};

	var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
	var FN_ARG_SPLIT = /,/;
	var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
	var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

	function annotate(fn) {
	  var $inject, fnText, argDecl, last;

	  if (typeof fn == 'function') {
	    if (!($inject = fn.$inject)) {
	      $inject = [];
	      fnText = fn.toString().replace(STRIP_COMMENTS, '');
	      argDecl = fnText.match(FN_ARGS);
	      forEach(argDecl[1].split(FN_ARG_SPLIT), function(arg){
	        arg && arg.replace(FN_ARG, function(all, underscore, name){
	          $inject.push(name);
	        });
	      });
	      fn.$inject = $inject;
	    }
	  } else if (isArray(fn)) {
	    last = fn.length - 1;
	    assertArgFn(fn[last], 'fn');
	    $inject = fn.slice(0, last);
	  } else {
	    assertArgFn(fn, 'fn', true);
	  }
	  return $inject;
	};	

	function isInObject(key, obj){
		for(var p in obj) {
			if( key.toLowerCase() === p.toLowerCase() ) return p;
		}
		return false;
	};

	function forEach(array, callback){
		array.forEach(function(item){ 
			callback(item);
		});
	};

	function assertArgFn(fn, name, bool){ };

	function isArray(fn){
		return Object.prototype.toString.call(fn) === '[object Function]';
	};
})(window);