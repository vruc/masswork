(function(win, undefined){

	var trimLeft = /^\s+/, 
		trimRight = /\s+$/,
		obj = Object,
		sli = Array.prototype.slice,
		pn = 'parentNode',
		gbid = 'getElementById',
		ae = 'addEventListener',
		ga = 'getAttribute',
		sa = 'setAttribute',
		low = 'toLowerCase',
		ts = 'toString',
		pt = 'prototype',
		rp = 'replace',
		st = 'style',
		c = 'call',
		ck = 'click',
		cg = 'change',
		ih = 'innerHTML',
		rc = 'removeChild',
		ap = 'appendChild',
		ce = 'createElement',
		cdf = 'createDocumentFragment',
		fec = 'firstElementChild',
		ots = obj[pt][ts];

	var jQuery = function(selector) {
		return (function(){
			if(typeof selector === 'string'){
				if(selector.indexOf("#") == 0) return document[gbid](selector[rp]("#",""));
				else if (selector === "html")  return document.body.parentNode;
				else if (selector === "body")  return document.body;
				else return selector;
			}
			else return selector;
		})(selector);
	}

	jQuery.trim = function(text){ return text === undefined ? "" : text[ts]()[rp]( trimLeft, "" )[rp]( trimRight, "" ); };

	var HTTPRequest = function(){
		var xmlHttp = false;
		if( window.XMLHttpRequest ) {
			xmlHttp = new XMLHttpRequest();	
		}
		return xmlHttp;
	};

	jQuery.ajax = function(obj){
		obj = {
			type: obj.type || 'get',
			url:  obj.url  || 'ykm',
			data: obj.data || '',
			dataType: obj.dataType || '',
			cache: obj.cache || true,
			success: obj.success || function(){}
		};

    	var request = new HTTPRequest();

	    if ( !request ) alert("faliure");
	    request.onreadystatechange = function(){
			if (request.readyState==4){
				if (request.status==200) {
					obj.success(request.responseText);
				}
				else {
					alert("Problem retrieving XML data");
				}
			}
		};
	    request.open( obj.type, obj.url, false );
	    request.send( obj.data );
	};

	function isFN(ctx){ return ots[c](ctx)[low]() === "[object function]"; };

	function isOBJ(ctx){ return ots[c](ctx)[low]() === "[object object]"; };


	function clean(){

		while ( this.firstChild ) {
			this.removeChild( this.firstChild );
		}
		
		return this;
	};

	obj[pt].html = function (text) {
		if( text === undefined ){ return this[ih]; } 
		else { 
			var frag = document.createDocumentFragment();
			var span = document.createElement('span');
			span.innerHTML = text;
			var scripts = sli.call(span.getElementsByTagName('script')).map(function(script){
				return ( script.parentNode ? script.parentNode.removeChild( script ) : script );					
			});
			sli.call(span.childNodes).forEach(function(elem){ frag.appendChild(elem); });
			
			clean.call(this).appendChild(frag);
			
			delete span;
			scripts.forEach(function( data ){
				( window.execScript || function( data ) {
					window["eval"].call( window, data.text || data.textContent || data.innerHTML || "" );
				} )( data );
			});
		}
	};

	obj[pt].val = function (text) {
		if(this.nodeName[low]()==="select"){ 
			var i=0, l = this.children.length;
			for(;i<l;i++) if(this.children[i].selected) return this.children[i].value; 
		}
		else if(text === undefined){ return this[ga]("value"); }
		else{ this[sa]("value", text); }
	};

	obj[pt].focus = function (text) {
		this.focus();
	};
	
	obj[pt].hide = function () {
		this.css('display','none');
	};

	obj[pt].show = function () {
		this.css('display','');
	};	

	obj[pt].attr = function (attr, value) {
		if(isOBJ(attr)){
			for(p in attr) !isFN(attr[p]) && this[sa](p, attr[p]);
		} else{
			if(value === undefined) return this[ga](attr);
			else this[sa](attr, value);
		}
	};

	obj[pt].css = function (attr, value) {
		if(isOBJ(attr)){
			for(p in attr) !isFN(attr[p]) && (this[st][p] = attr[p]);
		} else {
			if(value === undefined) return this[st][attr]; 
			else this[st][attr] = value;
		}
	};

	HTMLSelectElement[pt][ck] = HTMLParagraphElement[pt][ck] = HTMLAnchorElement[pt][ck] = HTMLInputElement[pt][ck] = HTMLSpanElement[pt][ck] = HTMLDivElement[pt][ck] = function(fn){ this[ae]('click', fn, false); };

	HTMLSelectElement[pt][cg] = function(fn){ this[ae]('change', fn, false); };
	
	HTMLInputElement[pt][cg] = function(fn){ 
		var timer, that;
		this[ae]('keyup', function(){
			timer && clearTimeout(timer);
			that = this || {value:''};
			timer = setTimeout(function(){ fn.call(that); }, 500);
		}, false);  			
	};
	obj[pt].remove = function(){ this[pn] && this[pn][rc]( this ); };

	obj[pt].empty = function(){ this[ih] = ""; };

	obj[pt].append = function(obj){
		if(typeof obj==='string'){
			var sp = document[ce]('span');
			sp.innerHTML = obj;
			var o = sp[fec];
			this[ap](o);
			delete sp;
		}
		else this[ap](obj);
	};

	win.jQuery = win.$ = jQuery;

})(window);	