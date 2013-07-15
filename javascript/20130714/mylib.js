

// 商店名字: 指的就是这里的模块名
// 从哪进货: 代表它依赖什么其他模块
// 只卖什么: 表示它对外提供一些什么特性

(function( win, undefined ) {
	var moduleMap = {};
	var fileMap = {};
	var noop = function(){};

	win.thin = {

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

		use: function(name) {
		    var module = moduleMap[name];
		    var argDecl = annotate(module.factory);

		    if (!module.entity) {
		        var args = [];
		        for (var i=0; i<module.dependencies.length; i++) {
		        	if(argDecl[i] != module.dependencies[i] ){
						if(moduleMap[argDecl[i]].entity){
							args.push(moduleMap[argDecl[i]].entity);
						} else {
							args.push(this.use(argDecl[i]));
						}
					}
					else if (moduleMap[module.dependencies[i]].entity) {
		                args.push(moduleMap[module.dependencies[i]].entity);
		            }
		            else {
		                args.push(this.use(module.dependencies[i]));
		            }
		        }

		        module.entity = module.factory.apply(noop, args);
		    }

		    return module.entity;
		},

		use2: function(name){
			
			var module = moduleMap[name];
			var argDecl = annotate(module.factory);
			// console.log('use2', module.factory, annotate(module.factory));
			// console.log(argDecl);

			if(!module.entity){
				var args = [];
				for (var i = 0, l = module.dependencies.length; i < l; i++) {
					if(argDecl[i] != module.dependencies[i] ){
						if(moduleMap[argDecl[i]].entity){
							args.push(moduleMap[argDecl[i]].entity);
						} else {
							args.push(this.use(argDecl[i]));
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