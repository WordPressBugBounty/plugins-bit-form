var Ir=Object.defineProperty,Pr=Object.defineProperties;var Fr=Object.getOwnPropertyDescriptors;var Xt=Object.getOwnPropertySymbols;var Nr=Object.prototype.hasOwnProperty,zr=Object.prototype.propertyIsEnumerable;var Yt=(k,f,n)=>f in k?Ir(k,f,{enumerable:!0,configurable:!0,writable:!0,value:n}):k[f]=n,Oe=(k,f)=>{for(var n in f||(f={}))Nr.call(f,n)&&Yt(k,n,f[n]);if(Xt)for(var n of Xt(f))zr.call(f,n)&&Yt(k,n,f[n]);return k},We=(k,f)=>Pr(k,Fr(f));import{be as ie,bd as kt,r as he,aa as Dr,aA as Br,d$ as pn,a as hn,j as W,bg as jr,b4 as Hr,q as qr,w as Ur,g as Wr,al as Vr,c as ft,ai as ye,_ as mt,I as bt,c$ as Gr,aY as Kr,c0 as Xr,c1 as Yr,a$ as Jr,V as Zr}from"./main-643.js";import{a as rt}from"./bf-312-185.js";import{D as Qr,B as ei}from"./bf-544-70.js";import{S as ti}from"./bf-171-172.js";import{C as Jt}from"./bf-572-324.js";import{L as ni}from"./bf-134-279.js";import{S as ri,G as Zt}from"./bf-344-252.js";import{P as Qt}from"./bf-91-80.js";import"./bf-816-79.js";import"./bf-76-112.js";import"./bf-768-113.js";import"./bf-351-114.js";import"./bf-485-280.js";import"./bf-857-85.js";import"./bf-706-83.js";import"./bf-354-86.js";var ii={exports:{}};(function(k,f){ace.define("ace/mode/css_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(n,c,E){var e=n("../lib/oop");n("../lib/lang");var a=n("./text_highlight_rules").TextHighlightRules,u=c.supportType="align-content|align-items|align-self|all|animation|animation-delay|animation-direction|animation-duration|animation-fill-mode|animation-iteration-count|animation-name|animation-play-state|animation-timing-function|backface-visibility|background|background-attachment|background-blend-mode|background-clip|background-color|background-image|background-origin|background-position|background-repeat|background-size|border|border-bottom|border-bottom-color|border-bottom-left-radius|border-bottom-right-radius|border-bottom-style|border-bottom-width|border-collapse|border-color|border-image|border-image-outset|border-image-repeat|border-image-slice|border-image-source|border-image-width|border-left|border-left-color|border-left-style|border-left-width|border-radius|border-right|border-right-color|border-right-style|border-right-width|border-spacing|border-style|border-top|border-top-color|border-top-left-radius|border-top-right-radius|border-top-style|border-top-width|border-width|bottom|box-shadow|box-sizing|caption-side|clear|clip|color|column-count|column-fill|column-gap|column-rule|column-rule-color|column-rule-style|column-rule-width|column-span|column-width|columns|content|counter-increment|counter-reset|cursor|direction|display|empty-cells|filter|flex|flex-basis|flex-direction|flex-flow|flex-grow|flex-shrink|flex-wrap|float|font|font-family|font-size|font-size-adjust|font-stretch|font-style|font-variant|font-weight|hanging-punctuation|height|justify-content|left|letter-spacing|line-height|list-style|list-style-image|list-style-position|list-style-type|margin|margin-bottom|margin-left|margin-right|margin-top|max-height|max-width|max-zoom|min-height|min-width|min-zoom|nav-down|nav-index|nav-left|nav-right|nav-up|opacity|order|outline|outline-color|outline-offset|outline-style|outline-width|overflow|overflow-x|overflow-y|padding|padding-bottom|padding-left|padding-right|padding-top|page-break-after|page-break-before|page-break-inside|perspective|perspective-origin|position|quotes|resize|right|tab-size|table-layout|text-align|text-align-last|text-decoration|text-decoration-color|text-decoration-line|text-decoration-style|text-indent|text-justify|text-overflow|text-shadow|text-transform|top|transform|transform-origin|transform-style|transition|transition-delay|transition-duration|transition-property|transition-timing-function|unicode-bidi|user-select|user-zoom|vertical-align|visibility|white-space|width|word-break|word-spacing|word-wrap|z-index",g=c.supportFunction="rgb|rgba|url|attr|counter|counters",p=c.supportConstant="absolute|after-edge|after|all-scroll|all|alphabetic|always|antialiased|armenian|auto|avoid-column|avoid-page|avoid|balance|baseline|before-edge|before|below|bidi-override|block-line-height|block|bold|bolder|border-box|both|bottom|box|break-all|break-word|capitalize|caps-height|caption|center|central|char|circle|cjk-ideographic|clone|close-quote|col-resize|collapse|column|consider-shifts|contain|content-box|cover|crosshair|cubic-bezier|dashed|decimal-leading-zero|decimal|default|disabled|disc|disregard-shifts|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ease-in|ease-in-out|ease-out|ease|ellipsis|end|exclude-ruby|flex-end|flex-start|fill|fixed|georgian|glyphs|grid-height|groove|hand|hanging|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|icon|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|ideographic|inactive|include-ruby|inherit|initial|inline-block|inline-box|inline-line-height|inline-table|inline|inset|inside|inter-ideograph|inter-word|invert|italic|justify|katakana-iroha|katakana|keep-all|last|left|lighter|line-edge|line-through|line|linear|list-item|local|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|mathematical|max-height|max-size|medium|menu|message-box|middle|move|n-resize|ne-resize|newspaper|no-change|no-close-quote|no-drop|no-open-quote|no-repeat|none|normal|not-allowed|nowrap|nw-resize|oblique|open-quote|outset|outside|overline|padding-box|page|pointer|pre-line|pre-wrap|pre|preserve-3d|progress|relative|repeat-x|repeat-y|repeat|replaced|reset-size|ridge|right|round|row-resize|rtl|s-resize|scroll|se-resize|separate|slice|small-caps|small-caption|solid|space|square|start|static|status-bar|step-end|step-start|steps|stretch|strict|sub|super|sw-resize|table-caption|table-cell|table-column-group|table-column|table-footer-group|table-header-group|table-row-group|table-row|table|tb-rl|text-after-edge|text-before-edge|text-bottom|text-size|text-top|text|thick|thin|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|use-script|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|z-index|zero|zoom",o=c.supportConstantColor="aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen",i=c.supportConstantFonts="arial|century|comic|courier|cursive|fantasy|garamond|georgia|helvetica|impact|lucida|symbol|system|tahoma|times|trebuchet|utopia|verdana|webdings|sans-serif|serif|monospace",d=c.numRe="\\-?(?:(?:[0-9]+(?:\\.[0-9]+)?)|(?:\\.[0-9]+))",m=c.pseudoElements="(\\:+)\\b(after|before|first-letter|first-line|moz-selection|selection)\\b",_=c.pseudoClasses="(:)\\b(active|checked|disabled|empty|enabled|first-child|first-of-type|focus|hover|indeterminate|invalid|last-child|last-of-type|link|not|nth-child|nth-last-child|nth-last-of-type|nth-of-type|only-child|only-of-type|required|root|target|valid|visited)\\b",T=function(){var b=this.createKeywordMapper({"support.function":g,"support.constant":p,"support.type":u,"support.constant.color":o,"support.constant.fonts":i},"text",!0);this.$rules={start:[{include:["strings","url","comments"]},{token:"paren.lparen",regex:"\\{",next:"ruleset"},{token:"paren.rparen",regex:"\\}"},{token:"string",regex:"@(?!viewport)",next:"media"},{token:"keyword",regex:"#[a-z0-9-_]+"},{token:"keyword",regex:"%"},{token:"variable",regex:"\\.[a-z0-9-_]+"},{token:"string",regex:":[a-z0-9-_]+"},{token:"constant.numeric",regex:d},{token:"constant",regex:"[a-z0-9-_]+"},{caseInsensitive:!0}],media:[{include:["strings","url","comments"]},{token:"paren.lparen",regex:"\\{",next:"start"},{token:"paren.rparen",regex:"\\}",next:"start"},{token:"string",regex:";",next:"start"},{token:"keyword",regex:"(?:media|supports|document|charset|import|namespace|media|supports|document|page|font|keyframes|viewport|counter-style|font-feature-values|swash|ornaments|annotation|stylistic|styleset|character-variant)"}],comments:[{token:"comment",regex:"\\/\\*",push:[{token:"comment",regex:"\\*\\/",next:"pop"},{defaultToken:"comment"}]}],ruleset:[{regex:"-(webkit|ms|moz|o)-",token:"text"},{token:"punctuation.operator",regex:"[:;]"},{token:"paren.rparen",regex:"\\}",next:"start"},{include:["strings","url","comments"]},{token:["constant.numeric","keyword"],regex:"("+d+")(ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vmax|vmin|vm|vw|%)"},{token:"constant.numeric",regex:d},{token:"constant.numeric",regex:"#[a-f0-9]{6}"},{token:"constant.numeric",regex:"#[a-f0-9]{3}"},{token:["punctuation","entity.other.attribute-name.pseudo-element.css"],regex:m},{token:["punctuation","entity.other.attribute-name.pseudo-class.css"],regex:_},{include:"url"},{token:b,regex:"\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"},{token:"paren.lparen",regex:"\\{"},{caseInsensitive:!0}],url:[{token:"support.function",regex:"(?:url(:?-prefix)?|domain|regexp)\\(",push:[{token:"support.function",regex:"\\)",next:"pop"},{defaultToken:"string"}]}],strings:[{token:"string.start",regex:"'",push:[{token:"string.end",regex:"'|$",next:"pop"},{include:"escapes"},{token:"constant.language.escape",regex:/\\$/,consumeLineEnd:!0},{defaultToken:"string"}]},{token:"string.start",regex:'"',push:[{token:"string.end",regex:'"|$',next:"pop"},{include:"escapes"},{token:"constant.language.escape",regex:/\\$/,consumeLineEnd:!0},{defaultToken:"string"}]}],escapes:[{token:"constant.language.escape",regex:/\\([a-fA-F\d]{1,6}|[^a-fA-F\d])/}]},this.normalizeRules()};e.inherits(T,a),c.CssHighlightRules=T}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(n,c,E){var e=n("../range").Range,a=function(){};(function(){this.checkOutdent=function(u,g){return/^\s+$/.test(u)?/^\s*\}/.test(g):!1},this.autoOutdent=function(u,g){var p=u.getLine(g),o=p.match(/^(\s*\})/);if(!o)return 0;var i=o[1].length,d=u.findMatchingBracket({row:g,column:i});if(!d||d.row==g)return 0;var m=this.$getIndent(u.getLine(d.row));u.replace(new e(g,0,g,i-1),m)},this.$getIndent=function(u){return u.match(/^\s*/)[0]}}).call(a.prototype),c.MatchingBraceOutdent=a}),ace.define("ace/mode/css_completions",["require","exports","module"],function(n,c,E){var e={background:{"#$0":1},"background-color":{"#$0":1,transparent:1,fixed:1},"background-image":{"url('/$0')":1},"background-repeat":{repeat:1,"repeat-x":1,"repeat-y":1,"no-repeat":1,inherit:1},"background-position":{bottom:2,center:2,left:2,right:2,top:2,inherit:2},"background-attachment":{scroll:1,fixed:1},"background-size":{cover:1,contain:1},"background-clip":{"border-box":1,"padding-box":1,"content-box":1},"background-origin":{"border-box":1,"padding-box":1,"content-box":1},border:{"solid $0":1,"dashed $0":1,"dotted $0":1,"#$0":1},"border-color":{"#$0":1},"border-style":{solid:2,dashed:2,dotted:2,double:2,groove:2,hidden:2,inherit:2,inset:2,none:2,outset:2,ridged:2},"border-collapse":{collapse:1,separate:1},bottom:{px:1,em:1,"%":1},clear:{left:1,right:1,both:1,none:1},color:{"#$0":1,"rgb(#$00,0,0)":1},cursor:{default:1,pointer:1,move:1,text:1,wait:1,help:1,progress:1,"n-resize":1,"ne-resize":1,"e-resize":1,"se-resize":1,"s-resize":1,"sw-resize":1,"w-resize":1,"nw-resize":1},display:{none:1,block:1,inline:1,"inline-block":1,"table-cell":1},"empty-cells":{show:1,hide:1},float:{left:1,right:1,none:1},"font-family":{Arial:2,"Comic Sans MS":2,Consolas:2,"Courier New":2,Courier:2,Georgia:2,Monospace:2,"Sans-Serif":2,"Segoe UI":2,Tahoma:2,"Times New Roman":2,"Trebuchet MS":2,Verdana:1},"font-size":{px:1,em:1,"%":1},"font-weight":{bold:1,normal:1},"font-style":{italic:1,normal:1},"font-variant":{normal:1,"small-caps":1},height:{px:1,em:1,"%":1},left:{px:1,em:1,"%":1},"letter-spacing":{normal:1},"line-height":{normal:1},"list-style-type":{none:1,disc:1,circle:1,square:1,decimal:1,"decimal-leading-zero":1,"lower-roman":1,"upper-roman":1,"lower-greek":1,"lower-latin":1,"upper-latin":1,georgian:1,"lower-alpha":1,"upper-alpha":1},margin:{px:1,em:1,"%":1},"margin-right":{px:1,em:1,"%":1},"margin-left":{px:1,em:1,"%":1},"margin-top":{px:1,em:1,"%":1},"margin-bottom":{px:1,em:1,"%":1},"max-height":{px:1,em:1,"%":1},"max-width":{px:1,em:1,"%":1},"min-height":{px:1,em:1,"%":1},"min-width":{px:1,em:1,"%":1},overflow:{hidden:1,visible:1,auto:1,scroll:1},"overflow-x":{hidden:1,visible:1,auto:1,scroll:1},"overflow-y":{hidden:1,visible:1,auto:1,scroll:1},padding:{px:1,em:1,"%":1},"padding-top":{px:1,em:1,"%":1},"padding-right":{px:1,em:1,"%":1},"padding-bottom":{px:1,em:1,"%":1},"padding-left":{px:1,em:1,"%":1},"page-break-after":{auto:1,always:1,avoid:1,left:1,right:1},"page-break-before":{auto:1,always:1,avoid:1,left:1,right:1},position:{absolute:1,relative:1,fixed:1,static:1},right:{px:1,em:1,"%":1},"table-layout":{fixed:1,auto:1},"text-decoration":{none:1,underline:1,"line-through":1,blink:1},"text-align":{left:1,right:1,center:1,justify:1},"text-transform":{capitalize:1,uppercase:1,lowercase:1,none:1},top:{px:1,em:1,"%":1},"vertical-align":{top:1,bottom:1},visibility:{hidden:1,visible:1},"white-space":{nowrap:1,normal:1,pre:1,"pre-line":1,"pre-wrap":1},width:{px:1,em:1,"%":1},"word-spacing":{normal:1},filter:{"alpha(opacity=$0100)":1},"text-shadow":{"$02px 2px 2px #777":1},"text-overflow":{"ellipsis-word":1,clip:1,ellipsis:1},"-moz-border-radius":1,"-moz-border-radius-topright":1,"-moz-border-radius-bottomright":1,"-moz-border-radius-topleft":1,"-moz-border-radius-bottomleft":1,"-webkit-border-radius":1,"-webkit-border-top-right-radius":1,"-webkit-border-top-left-radius":1,"-webkit-border-bottom-right-radius":1,"-webkit-border-bottom-left-radius":1,"-moz-box-shadow":1,"-webkit-box-shadow":1,transform:{"rotate($00deg)":1,"skew($00deg)":1},"-moz-transform":{"rotate($00deg)":1,"skew($00deg)":1},"-webkit-transform":{"rotate($00deg)":1,"skew($00deg)":1}},a=function(){};(function(){this.completionsDefined=!1,this.defineCompletions=function(){if(document){var u=document.createElement("c").style;for(var g in u)if(typeof u[g]=="string"){var p=g.replace(/[A-Z]/g,function(o){return"-"+o.toLowerCase()});e.hasOwnProperty(p)||(e[p]=1)}}this.completionsDefined=!0},this.getCompletions=function(u,g,p,o){if(this.completionsDefined||this.defineCompletions(),u==="ruleset"||g.$mode.$id=="ace/mode/scss"){var i=g.getLine(p.row).substr(0,p.column),d=/\([^)]*$/.test(i);return d&&(i=i.substr(i.lastIndexOf("(")+1)),/:[^;]+$/.test(i)?this.getPropertyValueCompletions(u,g,p,o):this.getPropertyCompletions(u,g,p,o,d)}return[]},this.getPropertyCompletions=function(u,g,p,o,i){i=i||!1;var d=Object.keys(e);return d.map(function(m){return{caption:m,snippet:m+": $0"+(i?"":";"),meta:"property",score:1e6}})},this.getPropertyValueCompletions=function(u,g,p,o){var i=g.getLine(p.row).substr(0,p.column),d=(/([\w\-]+):[^:]*$/.exec(i)||{})[1];if(!d)return[];var m=[];return d in e&&typeof e[d]=="object"&&(m=Object.keys(e[d])),m.map(function(_){return{caption:_,snippet:_,meta:"property value",score:1e6}})}}).call(a.prototype),c.CssCompletions=a}),ace.define("ace/mode/behaviour/css",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/mode/behaviour/cstyle","ace/token_iterator"],function(n,c,E){var e=n("../../lib/oop");n("../behaviour").Behaviour;var a=n("./cstyle").CstyleBehaviour,u=n("../../token_iterator").TokenIterator,g=function(){this.inherit(a),this.add("colon","insertion",function(p,o,i,d,m){if(m===":"&&i.selection.isEmpty()){var _=i.getCursorPosition(),T=new u(d,_.row,_.column),b=T.getCurrentToken();if(b&&b.value.match(/\s+/)&&(b=T.stepBackward()),b&&b.type==="support.type"){var y=d.doc.getLine(_.row),M=y.substring(_.column,_.column+1);if(M===":")return{text:"",selection:[1,1]};if(/^(\s+[^;]|\s*$)/.test(y.substring(_.column)))return{text:":;",selection:[1,1]}}}}),this.add("colon","deletion",function(p,o,i,d,m){var _=d.doc.getTextRange(m);if(!m.isMultiLine()&&_===":"){var T=i.getCursorPosition(),b=new u(d,T.row,T.column),y=b.getCurrentToken();if(y&&y.value.match(/\s+/)&&(y=b.stepBackward()),y&&y.type==="support.type"){var M=d.doc.getLine(m.start.row),P=M.substring(m.end.column,m.end.column+1);if(P===";")return m.end.column++,m}}}),this.add("semicolon","insertion",function(p,o,i,d,m){if(m===";"&&i.selection.isEmpty()){var _=i.getCursorPosition(),T=d.doc.getLine(_.row),b=T.substring(_.column,_.column+1);if(b===";")return{text:"",selection:[1,1]}}}),this.add("!important","insertion",function(p,o,i,d,m){if(m==="!"&&i.selection.isEmpty()){var _=i.getCursorPosition(),T=d.doc.getLine(_.row);if(/^\s*(;|}|$)/.test(T.substring(_.column)))return{text:"!important",selection:[10,10]}}})};e.inherits(g,a),c.CssBehaviour=g}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(n,c,E){var e=n("../../lib/oop"),a=n("../../range").Range,u=n("./fold_mode").FoldMode,g=c.FoldMode=function(p){p&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+p.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+p.end)))};e.inherits(g,u),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(p,o,i){var d=p.getLine(i);if(this.singleLineBlockCommentRe.test(d)&&!this.startRegionRe.test(d)&&!this.tripleStarBlockCommentRe.test(d))return"";var m=this._getFoldWidgetBase(p,o,i);return!m&&this.startRegionRe.test(d)?"start":m},this.getFoldWidgetRange=function(p,o,i,d){var m=p.getLine(i);if(this.startRegionRe.test(m))return this.getCommentRegionBlock(p,m,i);var b=m.match(this.foldingStartMarker);if(b){var _=b.index;if(b[1])return this.openingBracketBlock(p,b[1],i,_);var T=p.getCommentFoldRange(i,_+b[0].length,1);return T&&!T.isMultiLine()&&(d?T=this.getSectionRange(p,i):o!="all"&&(T=null)),T}if(o!=="markbegin"){var b=m.match(this.foldingStopMarker);if(b){var _=b.index+b[0].length;return b[1]?this.closingBracketBlock(p,b[1],i,_):p.getCommentFoldRange(i,_,-1)}}},this.getSectionRange=function(p,o){var i=p.getLine(o),d=i.search(/\S/),m=o,_=i.length;o+=1;for(var T=o,b=p.getLength();++o<b;){i=p.getLine(o);var y=i.search(/\S/);if(y!==-1){if(d>y)break;var M=this.getFoldWidgetRange(p,"all",o);if(M){if(M.start.row<=m)break;if(M.isMultiLine())o=M.end.row;else if(d==y)break}T=o}}return new a(m,_,T,p.getLine(T).length)},this.getCommentRegionBlock=function(p,o,i){for(var d=o.search(/\s*$/),m=p.getLength(),_=i,T=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,b=1;++i<m;){o=p.getLine(i);var y=T.exec(o);if(y&&(y[1]?b--:b++,!b))break}var M=i;if(M>_)return new a(_,d,M,o.length)}}.call(g.prototype)}),ace.define("ace/mode/css",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/css_highlight_rules","ace/mode/matching_brace_outdent","ace/worker/worker_client","ace/mode/css_completions","ace/mode/behaviour/css","ace/mode/folding/cstyle"],function(n,c,E){var e=n("../lib/oop"),a=n("./text").Mode,u=n("./css_highlight_rules").CssHighlightRules,g=n("./matching_brace_outdent").MatchingBraceOutdent,p=n("../worker/worker_client").WorkerClient,o=n("./css_completions").CssCompletions,i=n("./behaviour/css").CssBehaviour,d=n("./folding/cstyle").FoldMode,m=function(){this.HighlightRules=u,this.$outdent=new g,this.$behaviour=new i,this.$completer=new o,this.foldingRules=new d};e.inherits(m,a),function(){this.foldingRules="cStyle",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(_,T,b){var y=this.$getIndent(T),M=this.getTokenizer().getLineTokens(T,_).tokens;if(M.length&&M[M.length-1].type=="comment")return y;var P=T.match(/^.*\{\s*$/);return P&&(y+=b),y},this.checkOutdent=function(_,T,b){return this.$outdent.checkOutdent(T,b)},this.autoOutdent=function(_,T,b){this.$outdent.autoOutdent(T,b)},this.getCompletions=function(_,T,b,y){return this.$completer.getCompletions(_,T,b,y)},this.createWorker=function(_){var T=new p(["ace"],"ace/mode/css_worker","Worker");return T.attachToDocument(_.getDocument()),T.on("annotate",function(b){_.setAnnotations(b.data)}),T.on("terminate",function(){_.clearAnnotations()}),T},this.$id="ace/mode/css",this.snippetFileId="ace/snippets/css"}.call(m.prototype),c.Mode=m}),function(){ace.require(["ace/mode/css"],function(n){k&&(k.exports=n)})}()})(ii);var oi={exports:{}};(function(k,f){ace.define("ace/mode/jsdoc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(n,c,E){var e=n("../lib/oop"),a=n("./text_highlight_rules").TextHighlightRules,u=function(){this.$rules={start:[{token:["comment.doc.tag","comment.doc.text","lparen.doc"],regex:"(@(?:param|member|typedef|property|namespace|var|const|callback))(\\s*)({)",push:[{token:"lparen.doc",regex:"{",push:[{include:"doc-syntax"},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"}]},{token:["rparen.doc","text.doc","variable.parameter.doc","lparen.doc","variable.parameter.doc","rparen.doc"],regex:/(})(\s*)(?:([\w=:\/\.]+)|(?:(\[)([\w=:\/\.\-\'\" ]+)(\])))/,next:"pop"},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"},{include:"doc-syntax"},{defaultToken:"text.doc"}]},{token:["comment.doc.tag","text.doc","lparen.doc"],regex:"(@(?:returns?|yields|type|this|suppress|public|protected|private|package|modifies|implements|external|exception|throws|enum|define|extends))(\\s*)({)",push:[{token:"lparen.doc",regex:"{",push:[{include:"doc-syntax"},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"}]},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"},{include:"doc-syntax"},{defaultToken:"text.doc"}]},{token:["comment.doc.tag","text.doc","variable.parameter.doc"],regex:'(@(?:alias|memberof|instance|module|name|lends|namespace|external|this|template|requires|param|implements|function|extends|typedef|mixes|constructor|var|memberof\\!|event|listens|exports|class|constructs|interface|emits|fires|throws|const|callback|borrows|augments))(\\s+)(\\w[\\w#.:/~"\\-]*)?'},{token:["comment.doc.tag","text.doc","variable.parameter.doc"],regex:"(@method)(\\s+)(\\w[\\w.\\(\\)]*)"},{token:"comment.doc.tag",regex:"@access\\s+(?:private|public|protected)"},{token:"comment.doc.tag",regex:"@kind\\s+(?:class|constant|event|external|file|function|member|mixin|module|namespace|typedef)"},{token:"comment.doc.tag",regex:"@\\w+(?=\\s|$)"},u.getTagRule(),{defaultToken:"comment.doc.body",caseInsensitive:!0}],"doc-syntax":[{token:"operator.doc",regex:/[|:]/},{token:"paren.doc",regex:/[\[\]]/}]},this.normalizeRules()};e.inherits(u,a),u.getTagRule=function(g){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},u.getStartRule=function(g){return{token:"comment.doc",regex:/\/\*\*(?!\/)/,next:g}},u.getEndRule=function(g){return{token:"comment.doc",regex:"\\*\\/",next:g}},c.JsDocCommentHighlightRules=u}),ace.define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/jsdoc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(n,c,E){function e(){var d=o.replace("\\d","\\d\\-"),m={onMatch:function(T,b,y){var M=T.charAt(1)=="/"?2:1;return M==1?(b!=this.nextState?y.unshift(this.next,this.nextState,0):y.unshift(this.next),y[2]++):M==2&&b==this.nextState&&(y[1]--,(!y[1]||y[1]<0)&&(y.shift(),y.shift())),[{type:"meta.tag.punctuation."+(M==1?"":"end-")+"tag-open.xml",value:T.slice(0,M)},{type:"meta.tag.tag-name.xml",value:T.substr(M)}]},regex:"</?(?:"+d+"|(?=>))",next:"jsxAttributes",nextState:"jsx"};this.$rules.start.unshift(m);var _={regex:"{",token:"paren.quasi.start",push:"start"};this.$rules.jsx=[_,m,{include:"reference"},{defaultToken:"string.xml"}],this.$rules.jsxAttributes=[{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",onMatch:function(T,b,y){return b==y[0]&&y.shift(),T.length==2&&(y[0]==this.nextState&&y[1]--,(!y[1]||y[1]<0)&&y.splice(0,2)),this.next=y[0]||"start",[{type:this.token,value:T}]},nextState:"jsx"},_,a("jsxAttributes"),{token:"entity.other.attribute-name.xml",regex:d},{token:"keyword.operator.attribute-equals.xml",regex:"="},{token:"text.tag-whitespace.xml",regex:"\\s+"},{token:"string.attribute-value.xml",regex:"'",stateName:"jsx_attr_q",push:[{token:"string.attribute-value.xml",regex:"'",next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},{token:"string.attribute-value.xml",regex:'"',stateName:"jsx_attr_qq",push:[{token:"string.attribute-value.xml",regex:'"',next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},m],this.$rules.reference=[{token:"constant.language.escape.reference.xml",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}]}function a(d){return[{token:"comment",regex:/\/\*/,next:[g.getTagRule(),{token:"comment",regex:"\\*\\/",next:d||"pop"},{defaultToken:"comment",caseInsensitive:!0}]},{token:"comment",regex:"\\/\\/",next:[g.getTagRule(),{token:"comment",regex:"$|^",next:d||"pop"},{defaultToken:"comment",caseInsensitive:!0}]}]}var u=n("../lib/oop"),g=n("./jsdoc_comment_highlight_rules").JsDocCommentHighlightRules,p=n("./text_highlight_rules").TextHighlightRules,o="[a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*",i=function(d){var m={"variable.language":"Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Symbol|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document",keyword:"const|yield|import|get|set|async|await|break|case|catch|continue|default|delete|do|else|finally|for|if|in|of|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static|constructor","storage.type":"const|let|var|function","constant.language":"null|Infinity|NaN|undefined","support.function":"alert","constant.language.boolean":"true|false"},_=this.createKeywordMapper(m,"identifier"),T="case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void",b="\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|u{[0-9a-fA-F]{1,6}}|[0-2][0-7]{0,2}|3[0-7][0-7]?|[4-7][0-7]?|.)",y="(function)(\\s*)(\\*?)",M={token:["identifier","text","paren.lparen"],regex:"(\\b(?!"+Object.values(m).join("|")+"\\b)"+o+")(\\s*)(\\()"};this.$rules={no_regex:[g.getStartRule("doc-start"),a("no_regex"),M,{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/},{token:"constant.numeric",regex:/(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/},{token:["entity.name.function","text","keyword.operator","text","storage.type","text","storage.type","text","paren.lparen"],regex:"("+o+")(\\s*)(=)(\\s*)"+y+"(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","storage.type","text","text","entity.name.function","text","paren.lparen"],regex:"(function)(?:(?:(\\s*)(\\*)(\\s*))|(\\s+))("+o+")(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","punctuation.operator","text","storage.type","text","storage.type","text","paren.lparen"],regex:"("+o+")(\\s*)(:)(\\s*)"+y+"(\\s*)(\\()",next:"function_arguments"},{token:["text","text","storage.type","text","storage.type","text","paren.lparen"],regex:"(:)(\\s*)"+y+"(\\s*)(\\()",next:"function_arguments"},{token:"keyword",regex:`from(?=\\s*('|"))`},{token:"keyword",regex:"(?:"+T+")\\b",next:"start"},{token:"support.constant",regex:/that\b/},{token:["storage.type","punctuation.operator","support.function.firebug"],regex:/(console)(\.)(warn|info|log|error|debug|time|trace|timeEnd|assert)\b/},{token:_,regex:o},{token:"punctuation.operator",regex:/[.](?![.])/,next:"property"},{token:"storage.type",regex:/=>/,next:"start"},{token:"keyword.operator",regex:/--|\+\+|\.{3}|===|==|=|!=|!==|<+=?|>+=?|!|&&|\|\||\?:|[!$%&*+\-~\/^]=?/,next:"start"},{token:"punctuation.operator",regex:/[?:,;.]/,next:"start"},{token:"paren.lparen",regex:/[\[({]/,next:"start"},{token:"paren.rparen",regex:/[\])}]/},{token:"comment",regex:/^#!.*$/}],property:[{token:"text",regex:"\\s+"},{token:"keyword.operator",regex:/=/},{token:["storage.type","text","storage.type","text","paren.lparen"],regex:y+"(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","storage.type","text","text","entity.name.function","text","paren.lparen"],regex:"(function)(?:(?:(\\s*)(\\*)(\\s*))|(\\s+))(\\w+)(\\s*)(\\()",next:"function_arguments"},{token:"punctuation.operator",regex:/[.](?![.])/},{token:"support.function",regex:"prototype"},{token:"support.function",regex:/(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|lter|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward|rEach)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/},{token:"support.function.dom",regex:/(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/},{token:"support.constant",regex:/(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/},{token:"identifier",regex:o},{regex:"",token:"empty",next:"no_regex"}],start:[g.getStartRule("doc-start"),a("start"),{token:"string.regexp",regex:"\\/",next:"regex"},{token:"text",regex:"\\s+|^$",next:"start"},{token:"empty",regex:"",next:"no_regex"}],regex:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp",regex:"/[sxngimy]*",next:"no_regex"},{token:"invalid",regex:/\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/},{token:"constant.language.escape",regex:/\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/},{token:"constant.language.delimiter",regex:/\|/},{token:"constant.language.escape",regex:/\[\^?/,next:"regex_character_class"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp"}],regex_character_class:[{token:"regexp.charclass.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"constant.language.escape",regex:"]",next:"regex"},{token:"constant.language.escape",regex:"-"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp.charachterclass"}],default_parameter:[{token:"string",regex:"'(?=.)",push:[{token:"string",regex:"'|$",next:"pop"},{include:"qstring"}]},{token:"string",regex:'"(?=.)',push:[{token:"string",regex:'"|$',next:"pop"},{include:"qqstring"}]},{token:"constant.language",regex:"null|Infinity|NaN|undefined"},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/},{token:"constant.numeric",regex:/(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/},{token:"punctuation.operator",regex:",",next:"function_arguments"},{token:"text",regex:"\\s+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],function_arguments:[a("function_arguments"),{token:"variable.parameter",regex:o},{token:"punctuation.operator",regex:","},{token:"text",regex:"\\s+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],qqstring:[{token:"constant.language.escape",regex:b},{token:"string",regex:"\\\\$",consumeLineEnd:!0},{token:"string",regex:'"|$',next:"no_regex"},{defaultToken:"string"}],qstring:[{token:"constant.language.escape",regex:b},{token:"string",regex:"\\\\$",consumeLineEnd:!0},{token:"string",regex:"'|$",next:"no_regex"},{defaultToken:"string"}]},(!d||!d.noES6)&&(this.$rules.no_regex.unshift({regex:"[{}]",onMatch:function(P,R,S){if(this.next=P=="{"?this.nextState:"",P=="{"&&S.length)S.unshift("start",R);else if(P=="}"&&S.length&&(S.shift(),this.next=S.shift(),this.next.indexOf("string")!=-1||this.next.indexOf("jsx")!=-1))return"paren.quasi.end";return P=="{"?"paren.lparen":"paren.rparen"},nextState:"start"},{token:"string.quasi.start",regex:/`/,push:[{token:"constant.language.escape",regex:b},{token:"paren.quasi.start",regex:/\${/,push:"start"},{token:"string.quasi.end",regex:/`/,next:"pop"},{defaultToken:"string.quasi"}]},{token:["variable.parameter","text"],regex:"("+o+")(\\s*)(?=\\=>)"},{token:"paren.lparen",regex:"(\\()(?=[^\\(]+\\s*=>)",next:"function_arguments"},{token:"variable.language",regex:"(?:(?:(?:Weak)?(?:Set|Map))|Promise)\\b"}),this.$rules.function_arguments.unshift({token:"keyword.operator",regex:"=",next:"default_parameter"},{token:"keyword.operator",regex:"\\.{3}"}),this.$rules.property.unshift({token:"support.function",regex:"(findIndex|repeat|startsWith|endsWith|includes|isSafeInteger|trunc|cbrt|log2|log10|sign|then|catch|finally|resolve|reject|race|any|all|allSettled|keys|entries|isInteger)\\b(?=\\()"},{token:"constant.language",regex:"(?:MAX_SAFE_INTEGER|MIN_SAFE_INTEGER|EPSILON)\\b"}),(!d||d.jsx!=0)&&e.call(this)),this.embedRules(g,"doc-",[g.getEndRule("no_regex")]),this.normalizeRules()};u.inherits(i,p),c.JavaScriptHighlightRules=i}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(n,c,E){var e=n("../range").Range,a=function(){};(function(){this.checkOutdent=function(u,g){return/^\s+$/.test(u)?/^\s*\}/.test(g):!1},this.autoOutdent=function(u,g){var p=u.getLine(g),o=p.match(/^(\s*\})/);if(!o)return 0;var i=o[1].length,d=u.findMatchingBracket({row:g,column:i});if(!d||d.row==g)return 0;var m=this.$getIndent(u.getLine(d.row));u.replace(new e(g,0,g,i-1),m)},this.$getIndent=function(u){return u.match(/^\s*/)[0]}}).call(a.prototype),c.MatchingBraceOutdent=a}),ace.define("ace/mode/behaviour/xml",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator"],function(n,c,E){function e(o,i){return o&&o.type.lastIndexOf(i+".xml")>-1}var a=n("../../lib/oop"),u=n("../behaviour").Behaviour,g=n("../../token_iterator").TokenIterator,p=function(){this.add("string_dquotes","insertion",function(o,i,d,m,_){if(_=='"'||_=="'"){var T=_,b=m.doc.getTextRange(d.getSelectionRange());if(b!==""&&b!=="'"&&b!='"'&&d.getWrapBehavioursEnabled())return{text:T+b+T,selection:!1};var y=d.getCursorPosition(),M=m.doc.getLine(y.row),P=M.substring(y.column,y.column+1),R=new g(m,y.row,y.column),S=R.getCurrentToken();if(P==T&&(e(S,"attribute-value")||e(S,"string")))return{text:"",selection:[1,1]};if(S||(S=R.stepBackward()),!S)return;for(;e(S,"tag-whitespace")||e(S,"whitespace");)S=R.stepBackward();var t=!P||P.match(/\s/);if(e(S,"attribute-equals")&&(t||P==">")||e(S,"decl-attribute-equals")&&(t||P=="?"))return{text:T+T,selection:[1,1]}}}),this.add("string_dquotes","deletion",function(o,i,d,m,_){var T=m.doc.getTextRange(_);if(!_.isMultiLine()&&(T=='"'||T=="'")){var b=m.doc.getLine(_.start.row),y=b.substring(_.start.column+1,_.start.column+2);if(y==T)return _.end.column++,_}}),this.add("autoclosing","insertion",function(o,i,d,m,_){if(_==">"){var T=d.getSelectionRange().start,b=new g(m,T.row,T.column),y=b.getCurrentToken()||b.stepBackward();if(!y||!(e(y,"tag-name")||e(y,"tag-whitespace")||e(y,"attribute-name")||e(y,"attribute-equals")||e(y,"attribute-value"))||e(y,"reference.attribute-value"))return;if(e(y,"attribute-value")){var M=b.getCurrentTokenColumn()+y.value.length;if(T.column<M)return;if(T.column==M){var P=b.stepForward();if(P&&e(P,"attribute-value"))return;b.stepBackward()}}if(/^\s*>/.test(m.getLine(T.row).slice(T.column)))return;for(;!e(y,"tag-name");)if(y=b.stepBackward(),y.value=="<"){y=b.stepForward();break}var R=b.getCurrentTokenRow(),S=b.getCurrentTokenColumn();if(e(b.stepBackward(),"end-tag-open"))return;var t=y.value;return R==T.row&&(t=t.substring(0,T.column-S)),this.voidElements&&this.voidElements.hasOwnProperty(t.toLowerCase())?void 0:{text:"></"+t+">",selection:[1,1]}}}),this.add("autoindent","insertion",function(o,i,d,m,_){if(_==`
`){var T=d.getCursorPosition(),b=m.getLine(T.row),y=new g(m,T.row,T.column),M=y.getCurrentToken();if(e(M,"")&&M.type.indexOf("tag-close")!==-1){if(M.value=="/>")return;for(;M&&M.type.indexOf("tag-name")===-1;)M=y.stepBackward();if(!M)return;var P=M.value,R=y.getCurrentTokenRow();if(M=y.stepBackward(),!M||M.type.indexOf("end-tag")!==-1)return;if(this.voidElements&&!this.voidElements[P]||!this.voidElements){var S=m.getTokenAt(T.row,T.column+1),b=m.getLine(R),t=this.$getIndent(b),s=t+m.getTabString();return S&&S.value==="</"?{text:`
`+s+`
`+t,selection:[1,s.length,1,s.length]}:{text:`
`+s}}}}})};a.inherits(p,u),c.XmlBehaviour=p}),ace.define("ace/mode/behaviour/javascript",["require","exports","module","ace/lib/oop","ace/token_iterator","ace/mode/behaviour/cstyle","ace/mode/behaviour/xml"],function(n,c,E){var e=n("../../lib/oop"),a=n("../../token_iterator").TokenIterator,u=n("../behaviour/cstyle").CstyleBehaviour,g=n("../behaviour/xml").XmlBehaviour,p=function(){var o=new g({closeCurlyBraces:!0}).getBehaviours();this.addBehaviours(o),this.inherit(u),this.add("autoclosing-fragment","insertion",function(i,d,m,_,T){if(T==">"){var b=m.getSelectionRange().start,y=new a(_,b.row,b.column),M=y.getCurrentToken()||y.stepBackward();if(!M)return;if(M.value=="<")return{text:"></>",selection:[1,1]}}})};e.inherits(p,u),c.JavaScriptBehaviour=p}),ace.define("ace/mode/folding/xml",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(n,c,E){function e(i,d){return i&&i.type&&i.type.lastIndexOf(d+".xml")>-1}var a=n("../../lib/oop"),u=n("../../range").Range,g=n("./fold_mode").FoldMode,p=c.FoldMode=function(i,d){g.call(this),this.voidElements=i||{},this.optionalEndTags=a.mixin({},this.voidElements),d&&a.mixin(this.optionalEndTags,d)};a.inherits(p,g);var o=function(){this.tagName="",this.closing=!1,this.selfClosing=!1,this.start={row:0,column:0},this.end={row:0,column:0}};(function(){this.getFoldWidget=function(i,d,m){var _=this._getFirstTagInLine(i,m);return _?_.closing||!_.tagName&&_.selfClosing?d==="markbeginend"?"end":"":!_.tagName||_.selfClosing||this.voidElements.hasOwnProperty(_.tagName.toLowerCase())||this._findEndTagInLine(i,m,_.tagName,_.end.column)?"":"start":this.getCommentFoldWidget(i,m)},this.getCommentFoldWidget=function(i,d){return/comment/.test(i.getState(d))&&/<!-/.test(i.getLine(d))?"start":""},this._getFirstTagInLine=function(i,d){for(var m=i.getTokens(d),_=new o,T=0;T<m.length;T++){var b=m[T];if(e(b,"tag-open")){if(_.end.column=_.start.column+b.value.length,_.closing=e(b,"end-tag-open"),b=m[++T],!b)return null;if(_.tagName=b.value,b.value===""){if(b=m[++T],!b)return null;_.tagName=b.value}for(_.end.column+=b.value.length,T++;T<m.length;T++)if(b=m[T],_.end.column+=b.value.length,e(b,"tag-close")){_.selfClosing=b.value=="/>";break}return _}if(e(b,"tag-close"))return _.selfClosing=b.value=="/>",_;_.start.column+=b.value.length}return null},this._findEndTagInLine=function(i,d,m,_){for(var T=i.getTokens(d),b=0,y=0;y<T.length;y++){var M=T[y];if(b+=M.value.length,!(b<_-1)&&e(M,"end-tag-open")&&(M=T[y+1],e(M,"tag-name")&&M.value===""&&(M=T[y+2]),M&&M.value==m))return!0}return!1},this.getFoldWidgetRange=function(i,d,m){var _=this._getFirstTagInLine(i,m);if(!_)return this.getCommentFoldWidget(i,m)&&i.getCommentFoldRange(m,i.getLine(m).length);var T=i.getMatchingTags({row:m,column:0});if(T)return new u(T.openTag.end.row,T.openTag.end.column,T.closeTag.start.row,T.closeTag.start.column)}}).call(p.prototype)}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(n,c,E){var e=n("../../lib/oop"),a=n("../../range").Range,u=n("./fold_mode").FoldMode,g=c.FoldMode=function(p){p&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+p.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+p.end)))};e.inherits(g,u),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(p,o,i){var d=p.getLine(i);if(this.singleLineBlockCommentRe.test(d)&&!this.startRegionRe.test(d)&&!this.tripleStarBlockCommentRe.test(d))return"";var m=this._getFoldWidgetBase(p,o,i);return!m&&this.startRegionRe.test(d)?"start":m},this.getFoldWidgetRange=function(p,o,i,d){var m=p.getLine(i);if(this.startRegionRe.test(m))return this.getCommentRegionBlock(p,m,i);var b=m.match(this.foldingStartMarker);if(b){var _=b.index;if(b[1])return this.openingBracketBlock(p,b[1],i,_);var T=p.getCommentFoldRange(i,_+b[0].length,1);return T&&!T.isMultiLine()&&(d?T=this.getSectionRange(p,i):o!="all"&&(T=null)),T}if(o!=="markbegin"){var b=m.match(this.foldingStopMarker);if(b){var _=b.index+b[0].length;return b[1]?this.closingBracketBlock(p,b[1],i,_):p.getCommentFoldRange(i,_,-1)}}},this.getSectionRange=function(p,o){var i=p.getLine(o),d=i.search(/\S/),m=o,_=i.length;o+=1;for(var T=o,b=p.getLength();++o<b;){i=p.getLine(o);var y=i.search(/\S/);if(y!==-1){if(d>y)break;var M=this.getFoldWidgetRange(p,"all",o);if(M){if(M.start.row<=m)break;if(M.isMultiLine())o=M.end.row;else if(d==y)break}T=o}}return new a(m,_,T,p.getLine(T).length)},this.getCommentRegionBlock=function(p,o,i){for(var d=o.search(/\s*$/),m=p.getLength(),_=i,T=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,b=1;++i<m;){o=p.getLine(i);var y=T.exec(o);if(y&&(y[1]?b--:b++,!b))break}var M=i;if(M>_)return new a(_,d,M,o.length)}}.call(g.prototype)}),ace.define("ace/mode/folding/javascript",["require","exports","module","ace/lib/oop","ace/mode/folding/xml","ace/mode/folding/cstyle"],function(n,c,E){var e=n("../../lib/oop"),a=n("./xml").FoldMode,u=n("./cstyle").FoldMode,g=c.FoldMode=function(p){p&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+p.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+p.end))),this.xmlFoldMode=new a};e.inherits(g,u),function(){this.getFoldWidgetRangeBase=this.getFoldWidgetRange,this.getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(p,o,i){var d=this.getFoldWidgetBase(p,o,i);return d||this.xmlFoldMode.getFoldWidget(p,o,i)},this.getFoldWidgetRange=function(p,o,i,d){var m=this.getFoldWidgetRangeBase(p,o,i,d);return m||this.xmlFoldMode.getFoldWidgetRange(p,o,i)}}.call(g.prototype)}),ace.define("ace/mode/javascript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/worker/worker_client","ace/mode/behaviour/javascript","ace/mode/folding/javascript"],function(n,c,E){var e=n("../lib/oop"),a=n("./text").Mode,u=n("./javascript_highlight_rules").JavaScriptHighlightRules,g=n("./matching_brace_outdent").MatchingBraceOutdent,p=n("../worker/worker_client").WorkerClient,o=n("./behaviour/javascript").JavaScriptBehaviour,i=n("./folding/javascript").FoldMode,d=function(){this.HighlightRules=u,this.$outdent=new g,this.$behaviour=new o,this.foldingRules=new i};e.inherits(d,a),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.$quotes={'"':'"',"'":"'","`":"`"},this.$pairQuotesAfter={"`":/\w/},this.getNextLineIndent=function(m,_,T){var b=this.$getIndent(_),y=this.getTokenizer().getLineTokens(_,m),M=y.tokens,P=y.state;if(M.length&&M[M.length-1].type=="comment")return b;if(m=="start"||m=="no_regex"){var R=_.match(/^.*(?:\bcase\b.*:|[\{\(\[])\s*$/);R&&(b+=T)}else if(m=="doc-start"&&(P=="start"||P=="no_regex"))return"";return b},this.checkOutdent=function(m,_,T){return this.$outdent.checkOutdent(_,T)},this.autoOutdent=function(m,_,T){this.$outdent.autoOutdent(_,T)},this.createWorker=function(m){var _=new p(["ace"],"ace/mode/javascript_worker","JavaScriptWorker");return _.attachToDocument(m.getDocument()),_.on("annotate",function(T){m.setAnnotations(T.data)}),_.on("terminate",function(){m.clearAnnotations()}),_},this.$id="ace/mode/javascript",this.snippetFileId="ace/snippets/javascript"}.call(d.prototype),c.Mode=d}),function(){ace.require(["ace/mode/javascript"],function(n){k&&(k.exports=n)})}()})(oi);var si={exports:{}};(function(k,f){ace.define("ace/snippets/css.snippets",["require","exports","module"],function(n,c,E){E.exports=`snippet .
	\${1} {
		\${2}
	}
snippet !
	 !important
snippet bdi:m+
	-moz-border-image: url(\${1}) \${2:0} \${3:0} \${4:0} \${5:0} \${6:stretch} \${7:stretch};
snippet bdi:m
	-moz-border-image: \${1};
snippet bdrz:m
	-moz-border-radius: \${1};
snippet bxsh:m+
	-moz-box-shadow: \${1:0} \${2:0} \${3:0} #\${4:000};
snippet bxsh:m
	-moz-box-shadow: \${1};
snippet bdi:w+
	-webkit-border-image: url(\${1}) \${2:0} \${3:0} \${4:0} \${5:0} \${6:stretch} \${7:stretch};
snippet bdi:w
	-webkit-border-image: \${1};
snippet bdrz:w
	-webkit-border-radius: \${1};
snippet bxsh:w+
	-webkit-box-shadow: \${1:0} \${2:0} \${3:0} #\${4:000};
snippet bxsh:w
	-webkit-box-shadow: \${1};
snippet @f
	@font-face {
		font-family: \${1};
		src: url(\${2});
	}
snippet @i
	@import url(\${1});
snippet @m
	@media \${1:print} {
		\${2}
	}
snippet bg+
	background: #\${1:FFF} url(\${2}) \${3:0} \${4:0} \${5:no-repeat};
snippet bga
	background-attachment: \${1};
snippet bga:f
	background-attachment: fixed;
snippet bga:s
	background-attachment: scroll;
snippet bgbk
	background-break: \${1};
snippet bgbk:bb
	background-break: bounding-box;
snippet bgbk:c
	background-break: continuous;
snippet bgbk:eb
	background-break: each-box;
snippet bgcp
	background-clip: \${1};
snippet bgcp:bb
	background-clip: border-box;
snippet bgcp:cb
	background-clip: content-box;
snippet bgcp:nc
	background-clip: no-clip;
snippet bgcp:pb
	background-clip: padding-box;
snippet bgc
	background-color: #\${1:FFF};
snippet bgc:t
	background-color: transparent;
snippet bgi
	background-image: url(\${1});
snippet bgi:n
	background-image: none;
snippet bgo
	background-origin: \${1};
snippet bgo:bb
	background-origin: border-box;
snippet bgo:cb
	background-origin: content-box;
snippet bgo:pb
	background-origin: padding-box;
snippet bgpx
	background-position-x: \${1};
snippet bgpy
	background-position-y: \${1};
snippet bgp
	background-position: \${1:0} \${2:0};
snippet bgr
	background-repeat: \${1};
snippet bgr:n
	background-repeat: no-repeat;
snippet bgr:x
	background-repeat: repeat-x;
snippet bgr:y
	background-repeat: repeat-y;
snippet bgr:r
	background-repeat: repeat;
snippet bgz
	background-size: \${1};
snippet bgz:a
	background-size: auto;
snippet bgz:ct
	background-size: contain;
snippet bgz:cv
	background-size: cover;
snippet bg
	background: \${1};
snippet bg:ie
	filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='\${1}',sizingMethod='\${2:crop}');
snippet bg:n
	background: none;
snippet bd+
	border: \${1:1px} \${2:solid} #\${3:000};
snippet bdb+
	border-bottom: \${1:1px} \${2:solid} #\${3:000};
snippet bdbc
	border-bottom-color: #\${1:000};
snippet bdbi
	border-bottom-image: url(\${1});
snippet bdbi:n
	border-bottom-image: none;
snippet bdbli
	border-bottom-left-image: url(\${1});
snippet bdbli:c
	border-bottom-left-image: continue;
snippet bdbli:n
	border-bottom-left-image: none;
snippet bdblrz
	border-bottom-left-radius: \${1};
snippet bdbri
	border-bottom-right-image: url(\${1});
snippet bdbri:c
	border-bottom-right-image: continue;
snippet bdbri:n
	border-bottom-right-image: none;
snippet bdbrrz
	border-bottom-right-radius: \${1};
snippet bdbs
	border-bottom-style: \${1};
snippet bdbs:n
	border-bottom-style: none;
snippet bdbw
	border-bottom-width: \${1};
snippet bdb
	border-bottom: \${1};
snippet bdb:n
	border-bottom: none;
snippet bdbk
	border-break: \${1};
snippet bdbk:c
	border-break: close;
snippet bdcl
	border-collapse: \${1};
snippet bdcl:c
	border-collapse: collapse;
snippet bdcl:s
	border-collapse: separate;
snippet bdc
	border-color: #\${1:000};
snippet bdci
	border-corner-image: url(\${1});
snippet bdci:c
	border-corner-image: continue;
snippet bdci:n
	border-corner-image: none;
snippet bdf
	border-fit: \${1};
snippet bdf:c
	border-fit: clip;
snippet bdf:of
	border-fit: overwrite;
snippet bdf:ow
	border-fit: overwrite;
snippet bdf:r
	border-fit: repeat;
snippet bdf:sc
	border-fit: scale;
snippet bdf:sp
	border-fit: space;
snippet bdf:st
	border-fit: stretch;
snippet bdi
	border-image: url(\${1}) \${2:0} \${3:0} \${4:0} \${5:0} \${6:stretch} \${7:stretch};
snippet bdi:n
	border-image: none;
snippet bdl+
	border-left: \${1:1px} \${2:solid} #\${3:000};
snippet bdlc
	border-left-color: #\${1:000};
snippet bdli
	border-left-image: url(\${1});
snippet bdli:n
	border-left-image: none;
snippet bdls
	border-left-style: \${1};
snippet bdls:n
	border-left-style: none;
snippet bdlw
	border-left-width: \${1};
snippet bdl
	border-left: \${1};
snippet bdl:n
	border-left: none;
snippet bdlt
	border-length: \${1};
snippet bdlt:a
	border-length: auto;
snippet bdrz
	border-radius: \${1};
snippet bdr+
	border-right: \${1:1px} \${2:solid} #\${3:000};
snippet bdrc
	border-right-color: #\${1:000};
snippet bdri
	border-right-image: url(\${1});
snippet bdri:n
	border-right-image: none;
snippet bdrs
	border-right-style: \${1};
snippet bdrs:n
	border-right-style: none;
snippet bdrw
	border-right-width: \${1};
snippet bdr
	border-right: \${1};
snippet bdr:n
	border-right: none;
snippet bdsp
	border-spacing: \${1};
snippet bds
	border-style: \${1};
snippet bds:ds
	border-style: dashed;
snippet bds:dtds
	border-style: dot-dash;
snippet bds:dtdtds
	border-style: dot-dot-dash;
snippet bds:dt
	border-style: dotted;
snippet bds:db
	border-style: double;
snippet bds:g
	border-style: groove;
snippet bds:h
	border-style: hidden;
snippet bds:i
	border-style: inset;
snippet bds:n
	border-style: none;
snippet bds:o
	border-style: outset;
snippet bds:r
	border-style: ridge;
snippet bds:s
	border-style: solid;
snippet bds:w
	border-style: wave;
snippet bdt+
	border-top: \${1:1px} \${2:solid} #\${3:000};
snippet bdtc
	border-top-color: #\${1:000};
snippet bdti
	border-top-image: url(\${1});
snippet bdti:n
	border-top-image: none;
snippet bdtli
	border-top-left-image: url(\${1});
snippet bdtli:c
	border-corner-image: continue;
snippet bdtli:n
	border-corner-image: none;
snippet bdtlrz
	border-top-left-radius: \${1};
snippet bdtri
	border-top-right-image: url(\${1});
snippet bdtri:c
	border-top-right-image: continue;
snippet bdtri:n
	border-top-right-image: none;
snippet bdtrrz
	border-top-right-radius: \${1};
snippet bdts
	border-top-style: \${1};
snippet bdts:n
	border-top-style: none;
snippet bdtw
	border-top-width: \${1};
snippet bdt
	border-top: \${1};
snippet bdt:n
	border-top: none;
snippet bdw
	border-width: \${1};
snippet bd
	border: \${1};
snippet bd:n
	border: none;
snippet b
	bottom: \${1};
snippet b:a
	bottom: auto;
snippet bxsh+
	box-shadow: \${1:0} \${2:0} \${3:0} #\${4:000};
snippet bxsh
	box-shadow: \${1};
snippet bxsh:n
	box-shadow: none;
snippet bxz
	box-sizing: \${1};
snippet bxz:bb
	box-sizing: border-box;
snippet bxz:cb
	box-sizing: content-box;
snippet cps
	caption-side: \${1};
snippet cps:b
	caption-side: bottom;
snippet cps:t
	caption-side: top;
snippet cl
	clear: \${1};
snippet cl:b
	clear: both;
snippet cl:l
	clear: left;
snippet cl:n
	clear: none;
snippet cl:r
	clear: right;
snippet cp
	clip: \${1};
snippet cp:a
	clip: auto;
snippet cp:r
	clip: rect(\${1:0} \${2:0} \${3:0} \${4:0});
snippet c
	color: #\${1:000};
snippet ct
	content: \${1};
snippet ct:a
	content: attr(\${1});
snippet ct:cq
	content: close-quote;
snippet ct:c
	content: counter(\${1});
snippet ct:cs
	content: counters(\${1});
snippet ct:ncq
	content: no-close-quote;
snippet ct:noq
	content: no-open-quote;
snippet ct:n
	content: normal;
snippet ct:oq
	content: open-quote;
snippet coi
	counter-increment: \${1};
snippet cor
	counter-reset: \${1};
snippet cur
	cursor: \${1};
snippet cur:a
	cursor: auto;
snippet cur:c
	cursor: crosshair;
snippet cur:d
	cursor: default;
snippet cur:ha
	cursor: hand;
snippet cur:he
	cursor: help;
snippet cur:m
	cursor: move;
snippet cur:p
	cursor: pointer;
snippet cur:t
	cursor: text;
snippet d
	display: \${1};
snippet d:mib
	display: -moz-inline-box;
snippet d:mis
	display: -moz-inline-stack;
snippet d:b
	display: block;
snippet d:cp
	display: compact;
snippet d:ib
	display: inline-block;
snippet d:itb
	display: inline-table;
snippet d:i
	display: inline;
snippet d:li
	display: list-item;
snippet d:n
	display: none;
snippet d:ri
	display: run-in;
snippet d:tbcp
	display: table-caption;
snippet d:tbc
	display: table-cell;
snippet d:tbclg
	display: table-column-group;
snippet d:tbcl
	display: table-column;
snippet d:tbfg
	display: table-footer-group;
snippet d:tbhg
	display: table-header-group;
snippet d:tbrg
	display: table-row-group;
snippet d:tbr
	display: table-row;
snippet d:tb
	display: table;
snippet ec
	empty-cells: \${1};
snippet ec:h
	empty-cells: hide;
snippet ec:s
	empty-cells: show;
snippet exp
	expression()
snippet fl
	float: \${1};
snippet fl:l
	float: left;
snippet fl:n
	float: none;
snippet fl:r
	float: right;
snippet f+
	font: \${1:1em} \${2:Arial},\${3:sans-serif};
snippet fef
	font-effect: \${1};
snippet fef:eb
	font-effect: emboss;
snippet fef:eg
	font-effect: engrave;
snippet fef:n
	font-effect: none;
snippet fef:o
	font-effect: outline;
snippet femp
	font-emphasize-position: \${1};
snippet femp:a
	font-emphasize-position: after;
snippet femp:b
	font-emphasize-position: before;
snippet fems
	font-emphasize-style: \${1};
snippet fems:ac
	font-emphasize-style: accent;
snippet fems:c
	font-emphasize-style: circle;
snippet fems:ds
	font-emphasize-style: disc;
snippet fems:dt
	font-emphasize-style: dot;
snippet fems:n
	font-emphasize-style: none;
snippet fem
	font-emphasize: \${1};
snippet ff
	font-family: \${1};
snippet ff:c
	font-family: \${1:'Monotype Corsiva','Comic Sans MS'},cursive;
snippet ff:f
	font-family: \${1:Capitals,Impact},fantasy;
snippet ff:m
	font-family: \${1:Monaco,'Courier New'},monospace;
snippet ff:ss
	font-family: \${1:Helvetica,Arial},sans-serif;
snippet ff:s
	font-family: \${1:Georgia,'Times New Roman'},serif;
snippet fza
	font-size-adjust: \${1};
snippet fza:n
	font-size-adjust: none;
snippet fz
	font-size: \${1};
snippet fsm
	font-smooth: \${1};
snippet fsm:aw
	font-smooth: always;
snippet fsm:a
	font-smooth: auto;
snippet fsm:n
	font-smooth: never;
snippet fst
	font-stretch: \${1};
snippet fst:c
	font-stretch: condensed;
snippet fst:e
	font-stretch: expanded;
snippet fst:ec
	font-stretch: extra-condensed;
snippet fst:ee
	font-stretch: extra-expanded;
snippet fst:n
	font-stretch: normal;
snippet fst:sc
	font-stretch: semi-condensed;
snippet fst:se
	font-stretch: semi-expanded;
snippet fst:uc
	font-stretch: ultra-condensed;
snippet fst:ue
	font-stretch: ultra-expanded;
snippet fs
	font-style: \${1};
snippet fs:i
	font-style: italic;
snippet fs:n
	font-style: normal;
snippet fs:o
	font-style: oblique;
snippet fv
	font-variant: \${1};
snippet fv:n
	font-variant: normal;
snippet fv:sc
	font-variant: small-caps;
snippet fw
	font-weight: \${1};
snippet fw:b
	font-weight: bold;
snippet fw:br
	font-weight: bolder;
snippet fw:lr
	font-weight: lighter;
snippet fw:n
	font-weight: normal;
snippet f
	font: \${1};
snippet h
	height: \${1};
snippet h:a
	height: auto;
snippet l
	left: \${1};
snippet l:a
	left: auto;
snippet lts
	letter-spacing: \${1};
snippet lh
	line-height: \${1};
snippet lisi
	list-style-image: url(\${1});
snippet lisi:n
	list-style-image: none;
snippet lisp
	list-style-position: \${1};
snippet lisp:i
	list-style-position: inside;
snippet lisp:o
	list-style-position: outside;
snippet list
	list-style-type: \${1};
snippet list:c
	list-style-type: circle;
snippet list:dclz
	list-style-type: decimal-leading-zero;
snippet list:dc
	list-style-type: decimal;
snippet list:d
	list-style-type: disc;
snippet list:lr
	list-style-type: lower-roman;
snippet list:n
	list-style-type: none;
snippet list:s
	list-style-type: square;
snippet list:ur
	list-style-type: upper-roman;
snippet lis
	list-style: \${1};
snippet lis:n
	list-style: none;
snippet mb
	margin-bottom: \${1};
snippet mb:a
	margin-bottom: auto;
snippet ml
	margin-left: \${1};
snippet ml:a
	margin-left: auto;
snippet mr
	margin-right: \${1};
snippet mr:a
	margin-right: auto;
snippet mt
	margin-top: \${1};
snippet mt:a
	margin-top: auto;
snippet m
	margin: \${1};
snippet m:4
	margin: \${1:0} \${2:0} \${3:0} \${4:0};
snippet m:3
	margin: \${1:0} \${2:0} \${3:0};
snippet m:2
	margin: \${1:0} \${2:0};
snippet m:0
	margin: 0;
snippet m:a
	margin: auto;
snippet mah
	max-height: \${1};
snippet mah:n
	max-height: none;
snippet maw
	max-width: \${1};
snippet maw:n
	max-width: none;
snippet mih
	min-height: \${1};
snippet miw
	min-width: \${1};
snippet op
	opacity: \${1};
snippet op:ie
	filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=\${1:100});
snippet op:ms
	-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=\${1:100})';
snippet orp
	orphans: \${1};
snippet o+
	outline: \${1:1px} \${2:solid} #\${3:000};
snippet oc
	outline-color: \${1:#000};
snippet oc:i
	outline-color: invert;
snippet oo
	outline-offset: \${1};
snippet os
	outline-style: \${1};
snippet ow
	outline-width: \${1};
snippet o
	outline: \${1};
snippet o:n
	outline: none;
snippet ovs
	overflow-style: \${1};
snippet ovs:a
	overflow-style: auto;
snippet ovs:mq
	overflow-style: marquee;
snippet ovs:mv
	overflow-style: move;
snippet ovs:p
	overflow-style: panner;
snippet ovs:s
	overflow-style: scrollbar;
snippet ovx
	overflow-x: \${1};
snippet ovx:a
	overflow-x: auto;
snippet ovx:h
	overflow-x: hidden;
snippet ovx:s
	overflow-x: scroll;
snippet ovx:v
	overflow-x: visible;
snippet ovy
	overflow-y: \${1};
snippet ovy:a
	overflow-y: auto;
snippet ovy:h
	overflow-y: hidden;
snippet ovy:s
	overflow-y: scroll;
snippet ovy:v
	overflow-y: visible;
snippet ov
	overflow: \${1};
snippet ov:a
	overflow: auto;
snippet ov:h
	overflow: hidden;
snippet ov:s
	overflow: scroll;
snippet ov:v
	overflow: visible;
snippet pb
	padding-bottom: \${1};
snippet pl
	padding-left: \${1};
snippet pr
	padding-right: \${1};
snippet pt
	padding-top: \${1};
snippet p
	padding: \${1};
snippet p:4
	padding: \${1:0} \${2:0} \${3:0} \${4:0};
snippet p:3
	padding: \${1:0} \${2:0} \${3:0};
snippet p:2
	padding: \${1:0} \${2:0};
snippet p:0
	padding: 0;
snippet pgba
	page-break-after: \${1};
snippet pgba:aw
	page-break-after: always;
snippet pgba:a
	page-break-after: auto;
snippet pgba:l
	page-break-after: left;
snippet pgba:r
	page-break-after: right;
snippet pgbb
	page-break-before: \${1};
snippet pgbb:aw
	page-break-before: always;
snippet pgbb:a
	page-break-before: auto;
snippet pgbb:l
	page-break-before: left;
snippet pgbb:r
	page-break-before: right;
snippet pgbi
	page-break-inside: \${1};
snippet pgbi:a
	page-break-inside: auto;
snippet pgbi:av
	page-break-inside: avoid;
snippet pos
	position: \${1};
snippet pos:a
	position: absolute;
snippet pos:f
	position: fixed;
snippet pos:r
	position: relative;
snippet pos:s
	position: static;
snippet q
	quotes: \${1};
snippet q:en
	quotes: '\\201C' '\\201D' '\\2018' '\\2019';
snippet q:n
	quotes: none;
snippet q:ru
	quotes: '\\00AB' '\\00BB' '\\201E' '\\201C';
snippet rz
	resize: \${1};
snippet rz:b
	resize: both;
snippet rz:h
	resize: horizontal;
snippet rz:n
	resize: none;
snippet rz:v
	resize: vertical;
snippet r
	right: \${1};
snippet r:a
	right: auto;
snippet tbl
	table-layout: \${1};
snippet tbl:a
	table-layout: auto;
snippet tbl:f
	table-layout: fixed;
snippet tal
	text-align-last: \${1};
snippet tal:a
	text-align-last: auto;
snippet tal:c
	text-align-last: center;
snippet tal:l
	text-align-last: left;
snippet tal:r
	text-align-last: right;
snippet ta
	text-align: \${1};
snippet ta:c
	text-align: center;
snippet ta:l
	text-align: left;
snippet ta:r
	text-align: right;
snippet td
	text-decoration: \${1};
snippet td:l
	text-decoration: line-through;
snippet td:n
	text-decoration: none;
snippet td:o
	text-decoration: overline;
snippet td:u
	text-decoration: underline;
snippet te
	text-emphasis: \${1};
snippet te:ac
	text-emphasis: accent;
snippet te:a
	text-emphasis: after;
snippet te:b
	text-emphasis: before;
snippet te:c
	text-emphasis: circle;
snippet te:ds
	text-emphasis: disc;
snippet te:dt
	text-emphasis: dot;
snippet te:n
	text-emphasis: none;
snippet th
	text-height: \${1};
snippet th:a
	text-height: auto;
snippet th:f
	text-height: font-size;
snippet th:m
	text-height: max-size;
snippet th:t
	text-height: text-size;
snippet ti
	text-indent: \${1};
snippet ti:-
	text-indent: -9999px;
snippet tj
	text-justify: \${1};
snippet tj:a
	text-justify: auto;
snippet tj:d
	text-justify: distribute;
snippet tj:ic
	text-justify: inter-cluster;
snippet tj:ii
	text-justify: inter-ideograph;
snippet tj:iw
	text-justify: inter-word;
snippet tj:k
	text-justify: kashida;
snippet tj:t
	text-justify: tibetan;
snippet to+
	text-outline: \${1:0} \${2:0} #\${3:000};
snippet to
	text-outline: \${1};
snippet to:n
	text-outline: none;
snippet tr
	text-replace: \${1};
snippet tr:n
	text-replace: none;
snippet tsh+
	text-shadow: \${1:0} \${2:0} \${3:0} #\${4:000};
snippet tsh
	text-shadow: \${1};
snippet tsh:n
	text-shadow: none;
snippet tt
	text-transform: \${1};
snippet tt:c
	text-transform: capitalize;
snippet tt:l
	text-transform: lowercase;
snippet tt:n
	text-transform: none;
snippet tt:u
	text-transform: uppercase;
snippet tw
	text-wrap: \${1};
snippet tw:no
	text-wrap: none;
snippet tw:n
	text-wrap: normal;
snippet tw:s
	text-wrap: suppress;
snippet tw:u
	text-wrap: unrestricted;
snippet t
	top: \${1};
snippet t:a
	top: auto;
snippet va
	vertical-align: \${1};
snippet va:bl
	vertical-align: baseline;
snippet va:b
	vertical-align: bottom;
snippet va:m
	vertical-align: middle;
snippet va:sub
	vertical-align: sub;
snippet va:sup
	vertical-align: super;
snippet va:tb
	vertical-align: text-bottom;
snippet va:tt
	vertical-align: text-top;
snippet va:t
	vertical-align: top;
snippet v
	visibility: \${1};
snippet v:c
	visibility: collapse;
snippet v:h
	visibility: hidden;
snippet v:v
	visibility: visible;
snippet whsc
	white-space-collapse: \${1};
snippet whsc:ba
	white-space-collapse: break-all;
snippet whsc:bs
	white-space-collapse: break-strict;
snippet whsc:k
	white-space-collapse: keep-all;
snippet whsc:l
	white-space-collapse: loose;
snippet whsc:n
	white-space-collapse: normal;
snippet whs
	white-space: \${1};
snippet whs:n
	white-space: normal;
snippet whs:nw
	white-space: nowrap;
snippet whs:pl
	white-space: pre-line;
snippet whs:pw
	white-space: pre-wrap;
snippet whs:p
	white-space: pre;
snippet wid
	widows: \${1};
snippet w
	width: \${1};
snippet w:a
	width: auto;
snippet wob
	word-break: \${1};
snippet wob:ba
	word-break: break-all;
snippet wob:bs
	word-break: break-strict;
snippet wob:k
	word-break: keep-all;
snippet wob:l
	word-break: loose;
snippet wob:n
	word-break: normal;
snippet wos
	word-spacing: \${1};
snippet wow
	word-wrap: \${1};
snippet wow:no
	word-wrap: none;
snippet wow:n
	word-wrap: normal;
snippet wow:s
	word-wrap: suppress;
snippet wow:u
	word-wrap: unrestricted;
snippet z
	z-index: \${1};
snippet z:a
	z-index: auto;
snippet zoo
	zoom: 1;
`}),ace.define("ace/snippets/css",["require","exports","module","ace/snippets/css.snippets"],function(n,c,E){c.snippetText=n("./css.snippets"),c.scope="css"}),function(){ace.require(["ace/snippets/css"],function(n){k&&(k.exports=n)})}()})(si);var ai={exports:{}};(function(k,f){ace.define("ace/snippets/javascript.snippets",["require","exports","module"],function(n,c,E){E.exports=`# Prototype
snippet proto
	\${1:class_name}.prototype.\${2:method_name} = function(\${3:first_argument}) {
		\${4:// body...}
	};
# Function
snippet fun
	function \${1?:function_name}(\${2:argument}) {
		\${3:// body...}
	}
# Anonymous Function
regex /((=)\\s*|(:)\\s*|(\\()|\\b)/f/(\\))?/
snippet f
	function\${M1?: \${1:functionName}}($2) {
		\${0:$TM_SELECTED_TEXT}
	}\${M2?;}\${M3?,}\${M4?)}
# Immediate function
trigger \\(?f\\(
endTrigger \\)?
snippet f(
	(function(\${1}) {
		\${0:\${TM_SELECTED_TEXT:/* code */}}
	}(\${1}));
# if
snippet if
	if (\${1:true}) {
		\${0}
	}
# if ... else
snippet ife
	if (\${1:true}) {
		\${2}
	} else {
		\${0}
	}
# tertiary conditional
snippet ter
	\${1:/* condition */} ? \${2:a} : \${3:b}
# switch
snippet switch
	switch (\${1:expression}) {
		case '\${3:case}':
			\${4:// code}
			break;
		\${5}
		default:
			\${2:// code}
	}
# case
snippet case
	case '\${1:case}':
		\${2:// code}
		break;
	\${3}

# while (...) {...}
snippet wh
	while (\${1:/* condition */}) {
		\${0:/* code */}
	}
# try
snippet try
	try {
		\${0:/* code */}
	} catch (e) {}
# do...while
snippet do
	do {
		\${2:/* code */}
	} while (\${1:/* condition */});
# Object Method
snippet :f
regex /([,{[])|^\\s*/:f/
	\${1:method_name}: function(\${2:attribute}) {
		\${0}
	}\${3:,}
# setTimeout function
snippet setTimeout
regex /\\b/st|timeout|setTimeo?u?t?/
	setTimeout(function() {\${3:$TM_SELECTED_TEXT}}, \${1:10});
# Get Elements
snippet gett
	getElementsBy\${1:TagName}('\${2}')\${3}
# Get Element
snippet get
	getElementBy\${1:Id}('\${2}')\${3}
# console.log (Firebug)
snippet cl
	console.log(\${1});
# return
snippet ret
	return \${1:result}
# for (property in object ) { ... }
snippet fori
	for (var \${1:prop} in \${2:Things}) {
		\${0:$2[$1]}
	}
# hasOwnProperty
snippet has
	hasOwnProperty(\${1})
# docstring
snippet /**
	/**
	 * \${1:description}
	 *
	 */
snippet @par
regex /^\\s*\\*\\s*/@(para?m?)?/
	@param {\${1:type}} \${2:name} \${3:description}
snippet @ret
	@return {\${1:type}} \${2:description}
# JSON.parse
snippet jsonp
	JSON.parse(\${1:jstr});
# JSON.stringify
snippet jsons
	JSON.stringify(\${1:object});
# self-defining function
snippet sdf
	var \${1:function_name} = function(\${2:argument}) {
		\${3:// initial code ...}

		$1 = function($2) {
			\${4:// main code}
		};
	}
# singleton
snippet sing
	function \${1:Singleton} (\${2:argument}) {
		// the cached instance
		var instance;

		// rewrite the constructor
		$1 = function $1($2) {
			return instance;
		};
		
		// carry over the prototype properties
		$1.prototype = this;

		// the instance
		instance = new $1();

		// reset the constructor pointer
		instance.constructor = $1;

		\${3:// code ...}

		return instance;
	}
# class
snippet class
regex /^\\s*/clas{0,2}/
	var \${1:class} = function(\${20}) {
		$40$0
	};
	
	(function() {
		\${60:this.prop = ""}
	}).call(\${1:class}.prototype);
	
	exports.\${1:class} = \${1:class};
# 
snippet for-
	for (var \${1:i} = \${2:Things}.length; \${1:i}--; ) {
		\${0:\${2:Things}[\${1:i}];}
	}
# for (...) {...}
snippet for
	for (var \${1:i} = 0; $1 < \${2:Things}.length; $1++) {
		\${3:$2[$1]}$0
	}
# for (...) {...} (Improved Native For-Loop)
snippet forr
	for (var \${1:i} = \${2:Things}.length - 1; $1 >= 0; $1--) {
		\${3:$2[$1]}$0
	}


#modules
snippet def
	define(function(require, exports, module) {
	"use strict";
	var \${1/.*\\///} = require("\${1}");
	
	$TM_SELECTED_TEXT
	});
snippet req
guard ^\\s*
	var \${1/.*\\///} = require("\${1}");
	$0
snippet requ
guard ^\\s*
	var \${1/.*\\/(.)/\\u$1/} = require("\${1}").\${1/.*\\/(.)/\\u$1/};
	$0
`}),ace.define("ace/snippets/javascript",["require","exports","module","ace/snippets/javascript.snippets"],function(n,c,E){c.snippetText=n("./javascript.snippets"),c.scope="javascript"}),function(){ace.require(["ace/snippets/javascript"],function(n){k&&(k.exports=n)})}()})(ai);var li={exports:{}};(function(k,f){ace.define("ace/theme/tomorrow-css",["require","exports","module"],function(n,c,E){E.exports=`.ace-tomorrow .ace_gutter {
  background: #f6f6f6;
  color: #4D4D4C
}

.ace-tomorrow .ace_print-margin {
  width: 1px;
  background: #f6f6f6
}

.ace-tomorrow {
  background-color: #FFFFFF;
  color: #4D4D4C
}

.ace-tomorrow .ace_cursor {
  color: #AEAFAD
}

.ace-tomorrow .ace_marker-layer .ace_selection {
  background: #D6D6D6
}

.ace-tomorrow.ace_multiselect .ace_selection.ace_start {
  box-shadow: 0 0 3px 0px #FFFFFF;
}

.ace-tomorrow .ace_marker-layer .ace_step {
  background: rgb(255, 255, 0)
}

.ace-tomorrow .ace_marker-layer .ace_bracket {
  margin: -1px 0 0 -1px;
  border: 1px solid #D1D1D1
}

.ace-tomorrow .ace_marker-layer .ace_active-line {
  background: #EFEFEF
}

.ace-tomorrow .ace_gutter-active-line {
  background-color : #dcdcdc
}

.ace-tomorrow .ace_marker-layer .ace_selected-word {
  border: 1px solid #D6D6D6
}

.ace-tomorrow .ace_invisible {
  color: #D1D1D1
}

.ace-tomorrow .ace_keyword,
.ace-tomorrow .ace_meta,
.ace-tomorrow .ace_storage,
.ace-tomorrow .ace_storage.ace_type,
.ace-tomorrow .ace_support.ace_type {
  color: #8959A8
}

.ace-tomorrow .ace_keyword.ace_operator {
  color: #3E999F
}

.ace-tomorrow .ace_constant.ace_character,
.ace-tomorrow .ace_constant.ace_language,
.ace-tomorrow .ace_constant.ace_numeric,
.ace-tomorrow .ace_keyword.ace_other.ace_unit,
.ace-tomorrow .ace_support.ace_constant,
.ace-tomorrow .ace_variable.ace_parameter {
  color: #F5871F
}

.ace-tomorrow .ace_constant.ace_other {
  color: #666969
}

.ace-tomorrow .ace_invalid {
  color: #FFFFFF;
  background-color: #C82829
}

.ace-tomorrow .ace_invalid.ace_deprecated {
  color: #FFFFFF;
  background-color: #8959A8
}

.ace-tomorrow .ace_fold {
  background-color: #4271AE;
  border-color: #4D4D4C
}

.ace-tomorrow .ace_entity.ace_name.ace_function,
.ace-tomorrow .ace_support.ace_function,
.ace-tomorrow .ace_variable {
  color: #4271AE
}

.ace-tomorrow .ace_support.ace_class,
.ace-tomorrow .ace_support.ace_type {
  color: #C99E00
}

.ace-tomorrow .ace_heading,
.ace-tomorrow .ace_markup.ace_heading,
.ace-tomorrow .ace_string {
  color: #718C00
}

.ace-tomorrow .ace_entity.ace_name.ace_tag,
.ace-tomorrow .ace_entity.ace_other.ace_attribute-name,
.ace-tomorrow .ace_meta.ace_tag,
.ace-tomorrow .ace_string.ace_regexp,
.ace-tomorrow .ace_variable {
  color: #C82829
}

.ace-tomorrow .ace_comment {
  color: #8E908C
}

.ace-tomorrow .ace_indent-guide {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bdu3f/BwAlfgctduB85QAAAABJRU5ErkJggg==) right repeat-y
}

.ace-tomorrow .ace_indent-guide-active {
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAZSURBVHjaYvj///9/hivKyv8BAAAA//8DACLqBhbvk+/eAAAAAElFTkSuQmCC") right repeat-y;
} 
`}),ace.define("ace/theme/tomorrow",["require","exports","module","ace/theme/tomorrow-css","ace/lib/dom"],function(n,c,E){c.isDark=!1,c.cssClass="ace-tomorrow",c.cssText=n("./tomorrow-css");var e=n("../lib/dom");e.importCssString(c.cssText,c.cssClass,!1)}),function(){ace.require(["ace/theme/tomorrow"],function(n){k&&(k.exports=n)})}()})(li);var ci={exports:{}};(function(k,f){ace.define("ace/theme/twilight-css",["require","exports","module"],function(n,c,E){E.exports=`.ace-twilight .ace_gutter {
  background: #232323;
  color: #E2E2E2
}

.ace-twilight .ace_print-margin {
  width: 1px;
  background: #232323
}

.ace-twilight {
  background-color: #141414;
  color: #F8F8F8
}

.ace-twilight .ace_cursor {
  color: #A7A7A7
}

.ace-twilight .ace_marker-layer .ace_selection {
  background: rgba(221, 240, 255, 0.20)
}

.ace-twilight.ace_multiselect .ace_selection.ace_start {
  box-shadow: 0 0 3px 0px #141414;
}

.ace-twilight .ace_marker-layer .ace_step {
  background: rgb(102, 82, 0)
}

.ace-twilight .ace_marker-layer .ace_bracket {
  margin: -1px 0 0 -1px;
  border: 1px solid rgba(255, 255, 255, 0.25)
}

.ace-twilight .ace_marker-layer .ace_active-line {
  background: rgba(255, 255, 255, 0.031)
}

.ace-twilight .ace_gutter-active-line {
  background-color: rgba(255, 255, 255, 0.031)
}

.ace-twilight .ace_marker-layer .ace_selected-word {
  border: 1px solid rgba(221, 240, 255, 0.20)
}

.ace-twilight .ace_invisible {
  color: rgba(255, 255, 255, 0.25)
}

.ace-twilight .ace_keyword,
.ace-twilight .ace_meta {
  color: #CDA869
}

.ace-twilight .ace_constant,
.ace-twilight .ace_constant.ace_character,
.ace-twilight .ace_constant.ace_character.ace_escape,
.ace-twilight .ace_constant.ace_other,
.ace-twilight .ace_heading,
.ace-twilight .ace_markup.ace_heading,
.ace-twilight .ace_support.ace_constant {
  color: #CF6A4C
}

.ace-twilight .ace_invalid.ace_illegal {
  color: #F8F8F8;
  background-color: rgba(86, 45, 86, 0.75)
}

.ace-twilight .ace_invalid.ace_deprecated {
  text-decoration: underline;
  font-style: italic;
  color: #D2A8A1
}

.ace-twilight .ace_support {
  color: #9B859D
}

.ace-twilight .ace_fold {
  background-color: #AC885B;
  border-color: #F8F8F8
}

.ace-twilight .ace_support.ace_function {
  color: #DAD085
}

.ace-twilight .ace_list,
.ace-twilight .ace_markup.ace_list,
.ace-twilight .ace_storage {
  color: #F9EE98
}

.ace-twilight .ace_entity.ace_name.ace_function,
.ace-twilight .ace_meta.ace_tag {
  color: #AC885B
}

.ace-twilight .ace_string {
  color: #8F9D6A
}

.ace-twilight .ace_string.ace_regexp {
  color: #E9C062
}

.ace-twilight .ace_comment {
  font-style: italic;
  color: #5F5A60
}

.ace-twilight .ace_variable {
  color: #7587A6
}

.ace-twilight .ace_xml-pe {
  color: #494949
}

.ace-twilight .ace_indent-guide {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWMQERFpYLC1tf0PAAgOAnPnhxyiAAAAAElFTkSuQmCC) right repeat-y
}

.ace-twilight .ace_indent-guide-active {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQIW2PQ1dX9zzBz5sz/ABCcBFFentLlAAAAAElFTkSuQmCC) right repeat-y;
}
`}),ace.define("ace/theme/twilight",["require","exports","module","ace/theme/twilight-css","ace/lib/dom"],function(n,c,E){c.isDark=!0,c.cssClass="ace-twilight",c.cssText=n("./twilight-css");var e=n("../lib/dom");e.importCssString(c.cssText,c.cssClass,!1)}),function(){ace.require(["ace/theme/twilight"],function(n){k&&(k.exports=n)})}()})(ci);var pi={exports:{}};(function(k,f){ace.define("ace/snippets",["require","exports","module","ace/lib/dom","ace/lib/oop","ace/lib/event_emitter","ace/lib/lang","ace/range","ace/range_list","ace/keyboard/hash_handler","ace/tokenizer","ace/clipboard","ace/editor"],function(n,c,E){function e(t){var s=new Date().toLocaleString("en-us",t);return s.length==1?"0"+s:s}var a=n("./lib/dom"),u=n("./lib/oop"),g=n("./lib/event_emitter").EventEmitter,p=n("./lib/lang"),o=n("./range").Range,i=n("./range_list").RangeList,d=n("./keyboard/hash_handler").HashHandler,m=n("./tokenizer").Tokenizer,_=n("./clipboard"),T={CURRENT_WORD:function(t){return t.session.getTextRange(t.session.getWordRange())},SELECTION:function(t,s,r){var l=t.session.getTextRange();return r?l.replace(/\n\r?([ \t]*\S)/g,`
`+r+"$1"):l},CURRENT_LINE:function(t){return t.session.getLine(t.getCursorPosition().row)},PREV_LINE:function(t){return t.session.getLine(t.getCursorPosition().row-1)},LINE_INDEX:function(t){return t.getCursorPosition().row},LINE_NUMBER:function(t){return t.getCursorPosition().row+1},SOFT_TABS:function(t){return t.session.getUseSoftTabs()?"YES":"NO"},TAB_SIZE:function(t){return t.session.getTabSize()},CLIPBOARD:function(t){return _.getText&&_.getText()},FILENAME:function(t){return/[^/\\]*$/.exec(this.FILEPATH(t))[0]},FILENAME_BASE:function(t){return/[^/\\]*$/.exec(this.FILEPATH(t))[0].replace(/\.[^.]*$/,"")},DIRECTORY:function(t){return this.FILEPATH(t).replace(/[^/\\]*$/,"")},FILEPATH:function(t){return"/not implemented.txt"},WORKSPACE_NAME:function(){return"Unknown"},FULLNAME:function(){return"Unknown"},BLOCK_COMMENT_START:function(t){var s=t.session.$mode||{};return s.blockComment&&s.blockComment.start||""},BLOCK_COMMENT_END:function(t){var s=t.session.$mode||{};return s.blockComment&&s.blockComment.end||""},LINE_COMMENT:function(t){var s=t.session.$mode||{};return s.lineCommentStart||""},CURRENT_YEAR:e.bind(null,{year:"numeric"}),CURRENT_YEAR_SHORT:e.bind(null,{year:"2-digit"}),CURRENT_MONTH:e.bind(null,{month:"numeric"}),CURRENT_MONTH_NAME:e.bind(null,{month:"long"}),CURRENT_MONTH_NAME_SHORT:e.bind(null,{month:"short"}),CURRENT_DATE:e.bind(null,{day:"2-digit"}),CURRENT_DAY_NAME:e.bind(null,{weekday:"long"}),CURRENT_DAY_NAME_SHORT:e.bind(null,{weekday:"short"}),CURRENT_HOUR:e.bind(null,{hour:"2-digit",hour12:!1}),CURRENT_MINUTE:e.bind(null,{minute:"2-digit"}),CURRENT_SECOND:e.bind(null,{second:"2-digit"})};T.SELECTED_TEXT=T.SELECTION;var b=function(){function t(){this.snippetMap={},this.snippetNameMap={},this.variables=T}return t.prototype.getTokenizer=function(){return t.$tokenizer||this.createTokenizer()},t.prototype.createTokenizer=function(){function s(h){return h=h.substr(1),/^\d+$/.test(h)?[{tabstopId:parseInt(h,10)}]:[{text:h}]}function r(h){return"(?:[^\\\\"+h+"]|\\\\.)"}var l={regex:"/("+r("/")+"+)/",onMatch:function(h,v,x){var $=x[0];return $.fmtString=!0,$.guard=h.slice(1,-1),$.flag="",""},next:"formatString"};return t.$tokenizer=new m({start:[{regex:/\\./,onMatch:function(h,v,x){var $=h[1];return($=="}"&&x.length||"`$\\".indexOf($)!=-1)&&(h=$),[h]}},{regex:/}/,onMatch:function(h,v,x){return[x.length?x.shift():h]}},{regex:/\$(?:\d+|\w+)/,onMatch:s},{regex:/\$\{[\dA-Z_a-z]+/,onMatch:function(h,v,x){var $=s(h.substr(1));return x.unshift($[0]),$},next:"snippetVar"},{regex:/\n/,token:"newline",merge:!1}],snippetVar:[{regex:"\\|"+r("\\|")+"*\\|",onMatch:function(h,v,x){var $=h.slice(1,-1).replace(/\\[,|\\]|,/g,function(C){return C.length==2?C[1]:"\0"}).split("\0").map(function(C){return{value:C}});return x[0].choices=$,[$[0]]},next:"start"},l,{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"start"}],formatString:[{regex:/:/,onMatch:function(h,v,x){return x.length&&x[0].expectElse?(x[0].expectElse=!1,x[0].ifEnd={elseEnd:x[0]},[x[0].ifEnd]):":"}},{regex:/\\./,onMatch:function(h,v,x){var $=h[1];return $=="}"&&x.length||"`$\\".indexOf($)!=-1?h=$:$=="n"?h=`
`:$=="t"?h="	":"ulULE".indexOf($)!=-1&&(h={changeCase:$,local:$>"a"}),[h]}},{regex:"/\\w*}",onMatch:function(h,v,x){var $=x.shift();return $&&($.flag=h.slice(1,-1)),this.next=$&&$.tabstopId?"start":"",[$||h]},next:"start"},{regex:/\$(?:\d+|\w+)/,onMatch:function(h,v,x){return[{text:h.slice(1)}]}},{regex:/\${\w+/,onMatch:function(h,v,x){var $={text:h.slice(2)};return x.unshift($),[$]},next:"formatStringVar"},{regex:/\n/,token:"newline",merge:!1},{regex:/}/,onMatch:function(h,v,x){var $=x.shift();return this.next=$&&$.tabstopId?"start":"",[$||h]},next:"start"}],formatStringVar:[{regex:/:\/\w+}/,onMatch:function(h,v,x){var $=x[0];return $.formatFunction=h.slice(2,-1),[x.shift()]},next:"formatString"},l,{regex:/:[\?\-+]?/,onMatch:function(h,v,x){h[1]=="+"&&(x[0].ifEnd=x[0]),h[1]=="?"&&(x[0].expectElse=!0)},next:"formatString"},{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"formatString"}]}),t.$tokenizer},t.prototype.tokenizeTmSnippet=function(s,r){return this.getTokenizer().getLineTokens(s,r).tokens.map(function(l){return l.value||l})},t.prototype.getVariableValue=function(s,r,l){if(/^\d+$/.test(r))return(this.variables.__||{})[r]||"";if(/^[A-Z]\d+$/.test(r))return(this.variables[r[0]+"__"]||{})[r.substr(1)]||"";if(r=r.replace(/^TM_/,""),!this.variables.hasOwnProperty(r))return"";var h=this.variables[r];return typeof h=="function"&&(h=this.variables[r](s,r,l)),h==null?"":h},t.prototype.tmStrFormat=function(s,r,l){if(!r.fmt)return s;var h=r.flag||"",v=r.guard;v=new RegExp(v,h.replace(/[^gim]/g,""));var x=typeof r.fmt=="string"?this.tokenizeTmSnippet(r.fmt,"formatString"):r.fmt,$=this,C=s.replace(v,function(){var A=$.variables.__;$.variables.__=[].slice.call(arguments);for(var I=$.resolveVariables(x,l),N="E",L=0;L<I.length;L++){var z=I[L];if(typeof z=="object")if(I[L]="",z.changeCase&&z.local){var B=I[L+1];B&&typeof B=="string"&&(z.changeCase=="u"?I[L]=B[0].toUpperCase():I[L]=B[0].toLowerCase(),I[L+1]=B.substr(1))}else z.changeCase&&(N=z.changeCase);else N=="U"?I[L]=z.toUpperCase():N=="L"&&(I[L]=z.toLowerCase())}return $.variables.__=A,I.join("")});return C},t.prototype.tmFormatFunction=function(s,r,l){return r.formatFunction=="upcase"?s.toUpperCase():r.formatFunction=="downcase"?s.toLowerCase():s},t.prototype.resolveVariables=function(s,r){function l(N){var L=s.indexOf(N,$+1);L!=-1&&($=L)}for(var h=[],v="",x=!0,$=0;$<s.length;$++){var C=s[$];if(typeof C=="string"){h.push(C),C==`
`?(x=!0,v=""):x&&(v=/^\t*/.exec(C)[0],x=/\S/.test(C));continue}if(C){if(x=!1,C.fmtString){var A=s.indexOf(C,$+1);A==-1&&(A=s.length),C.fmt=s.slice($+1,A),$=A}if(C.text){var I=this.getVariableValue(r,C.text,v)+"";C.fmtString&&(I=this.tmStrFormat(I,C,r)),C.formatFunction&&(I=this.tmFormatFunction(I,C,r)),I&&!C.ifEnd?(h.push(I),l(C)):!I&&C.ifEnd&&l(C.ifEnd)}else C.elseEnd?l(C.elseEnd):(C.tabstopId!=null||C.changeCase!=null)&&h.push(C)}}return h},t.prototype.getDisplayTextForSnippet=function(s,r){var l=y.call(this,s,r);return l.text},t.prototype.insertSnippetForSelection=function(s,r,l){l===void 0&&(l={});var h=y.call(this,s,r,l),v=s.getSelectionRange(),x=s.session.replace(v,h.text),$=new M(s),C=s.inVirtualSelectionMode&&s.selection.index;$.addTabstops(h.tabstops,v.start,x,C)},t.prototype.insertSnippet=function(s,r,l){l===void 0&&(l={});var h=this;if(s.inVirtualSelectionMode)return h.insertSnippetForSelection(s,r,l);s.forEachSelection(function(){h.insertSnippetForSelection(s,r,l)},null,{keepOrder:!0}),s.tabstopManager&&s.tabstopManager.tabNext()},t.prototype.$getScope=function(s){var r=s.session.$mode.$id||"";if(r=r.split("/").pop(),r==="html"||r==="php"){r==="php"&&!s.session.$mode.inlinePhp&&(r="html");var l=s.getCursorPosition(),h=s.session.getState(l.row);typeof h=="object"&&(h=h[0]),h.substring&&(h.substring(0,3)=="js-"?r="javascript":h.substring(0,4)=="css-"?r="css":h.substring(0,4)=="php-"&&(r="php"))}return r},t.prototype.getActiveScopes=function(s){var r=this.$getScope(s),l=[r],h=this.snippetMap;return h[r]&&h[r].includeScopes&&l.push.apply(l,h[r].includeScopes),l.push("_"),l},t.prototype.expandWithTab=function(s,r){var l=this,h=s.forEachSelection(function(){return l.expandSnippetForSelection(s,r)},null,{keepOrder:!0});return h&&s.tabstopManager&&s.tabstopManager.tabNext(),h},t.prototype.expandSnippetForSelection=function(s,r){var l=s.getCursorPosition(),h=s.session.getLine(l.row),v=h.substring(0,l.column),x=h.substr(l.column),$=this.snippetMap,C;return this.getActiveScopes(s).some(function(A){var I=$[A];return I&&(C=this.findMatchingSnippet(I,v,x)),!!C},this),C?(r&&r.dryRun||(s.session.doc.removeInLine(l.row,l.column-C.replaceBefore.length,l.column+C.replaceAfter.length),this.variables.M__=C.matchBefore,this.variables.T__=C.matchAfter,this.insertSnippetForSelection(s,C.content),this.variables.M__=this.variables.T__=null),!0):!1},t.prototype.findMatchingSnippet=function(s,r,l){for(var h=s.length;h--;){var v=s[h];if(!(v.startRe&&!v.startRe.test(r))&&!(v.endRe&&!v.endRe.test(l))&&!(!v.startRe&&!v.endRe))return v.matchBefore=v.startRe?v.startRe.exec(r):[""],v.matchAfter=v.endRe?v.endRe.exec(l):[""],v.replaceBefore=v.triggerRe?v.triggerRe.exec(r)[0]:"",v.replaceAfter=v.endTriggerRe?v.endTriggerRe.exec(l)[0]:"",v}},t.prototype.register=function(s,r){function l(A){return A&&!/^\^?\(.*\)\$?$|^\\b$/.test(A)&&(A="(?:"+A+")"),A||""}function h(A,I,N){return A=l(A),I=l(I),N?(A=I+A,A&&A[A.length-1]!="$"&&(A+="$")):(A+=I,A&&A[0]!="^"&&(A="^"+A)),new RegExp(A)}function v(A){A.scope||(A.scope=r||"_"),r=A.scope,x[r]||(x[r]=[],$[r]={});var I=$[r];if(A.name){var N=I[A.name];N&&C.unregister(N),I[A.name]=A}x[r].push(A),A.prefix&&(A.tabTrigger=A.prefix),!A.content&&A.body&&(A.content=Array.isArray(A.body)?A.body.join(`
`):A.body),A.tabTrigger&&!A.trigger&&(!A.guard&&/^\w/.test(A.tabTrigger)&&(A.guard="\\b"),A.trigger=p.escapeRegExp(A.tabTrigger)),!(!A.trigger&&!A.guard&&!A.endTrigger&&!A.endGuard)&&(A.startRe=h(A.trigger,A.guard,!0),A.triggerRe=new RegExp(A.trigger),A.endRe=h(A.endTrigger,A.endGuard,!0),A.endTriggerRe=new RegExp(A.endTrigger))}var x=this.snippetMap,$=this.snippetNameMap,C=this;s||(s=[]),Array.isArray(s)?s.forEach(v):Object.keys(s).forEach(function(A){v(s[A])}),this._signal("registerSnippets",{scope:r})},t.prototype.unregister=function(s,r){function l(x){var $=v[x.scope||r];if($&&$[x.name]){delete $[x.name];var C=h[x.scope||r],A=C&&C.indexOf(x);A>=0&&C.splice(A,1)}}var h=this.snippetMap,v=this.snippetNameMap;s.content?l(s):Array.isArray(s)&&s.forEach(l)},t.prototype.parseSnippetFile=function(s){s=s.replace(/\r/g,"");for(var r=[],l={},h=/^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm,v;v=h.exec(s);){if(v[1])try{l=JSON.parse(v[1]),r.push(l)}catch(A){}if(v[4])l.content=v[4].replace(/^\t/gm,""),r.push(l),l={};else{var x=v[2],$=v[3];if(x=="regex"){var C=/\/((?:[^\/\\]|\\.)*)|$/g;l.guard=C.exec($)[1],l.trigger=C.exec($)[1],l.endTrigger=C.exec($)[1],l.endGuard=C.exec($)[1]}else x=="snippet"?(l.tabTrigger=$.match(/^\S*/)[0],l.name||(l.name=$)):x&&(l[x]=$)}}return r},t.prototype.getSnippetByName=function(s,r){var l=this.snippetNameMap,h;return this.getActiveScopes(r).some(function(v){var x=l[v];return x&&(h=x[s]),!!h},this),h},t}();u.implement(b.prototype,g);var y=function(t,s,r){function l(D){for(var Y=[],X=0;X<D.length;X++){var U=D[X];if(typeof U=="object"){if(I[U.tabstopId])continue;var ue=D.lastIndexOf(U,X-1);U=Y[ue]||{tabstopId:U.tabstopId}}Y[X]=U}return Y}r===void 0&&(r={});var h=t.getCursorPosition(),v=t.session.getLine(h.row),x=t.session.getTabString(),$=v.match(/^\s*/)[0];h.column<$.length&&($=$.slice(0,h.column)),s=s.replace(/\r/g,"");var C=this.tokenizeTmSnippet(s);C=this.resolveVariables(C,t),C=C.map(function(D){return D==`
`&&!r.excludeExtraIndent?D+$:typeof D=="string"?D.replace(/\t/g,x):D});var A=[];C.forEach(function(D,Y){if(typeof D=="object"){var X=D.tabstopId,U=A[X];if(U||(U=A[X]=[],U.index=X,U.value="",U.parents={}),U.indexOf(D)===-1){D.choices&&!U.choices&&(U.choices=D.choices),U.push(D);var ue=C.indexOf(D,Y+1);if(ue!==-1){var de=C.slice(Y+1,ue),Ce=de.some(function(Fe){return typeof Fe=="object"});Ce&&!U.value?U.value=de:de.length&&(!U.value||typeof U.value!="string")&&(U.value=de.join(""))}}}}),A.forEach(function(D){D.length=0});for(var I={},N=0;N<C.length;N++){var L=C[N];if(typeof L=="object"){var z=L.tabstopId,B=A[z],V=C.indexOf(L,N+1);if(I[z]){I[z]===L&&(delete I[z],Object.keys(I).forEach(function(D){B.parents[D]=!0}));continue}I[z]=L;var ee=B.value;typeof ee!="string"?ee=l(ee):L.fmt&&(ee=this.tmStrFormat(ee,L,t)),C.splice.apply(C,[N+1,Math.max(0,V-N)].concat(ee,L)),B.indexOf(L)===-1&&B.push(L)}}var re=0,Z=0,K="";return C.forEach(function(D){if(typeof D=="string"){var Y=D.split(`
`);Y.length>1?(Z=Y[Y.length-1].length,re+=Y.length-1):Z+=D.length,K+=D}else D&&(D.start?D.end={row:re,column:Z}:D.start={row:re,column:Z})}),{text:K,tabstops:A,tokens:C}},M=function(){function t(s){if(this.index=0,this.ranges=[],this.tabstops=[],s.tabstopManager)return s.tabstopManager;s.tabstopManager=this,this.$onChange=this.onChange.bind(this),this.$onChangeSelection=p.delayedCall(this.onChangeSelection.bind(this)).schedule,this.$onChangeSession=this.onChangeSession.bind(this),this.$onAfterExec=this.onAfterExec.bind(this),this.attach(s)}return t.prototype.attach=function(s){this.$openTabstops=null,this.selectedTabstop=null,this.editor=s,this.session=s.session,this.editor.on("change",this.$onChange),this.editor.on("changeSelection",this.$onChangeSelection),this.editor.on("changeSession",this.$onChangeSession),this.editor.commands.on("afterExec",this.$onAfterExec),this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)},t.prototype.detach=function(){this.tabstops.forEach(this.removeTabstopMarkers,this),this.ranges.length=0,this.tabstops.length=0,this.selectedTabstop=null,this.editor.off("change",this.$onChange),this.editor.off("changeSelection",this.$onChangeSelection),this.editor.off("changeSession",this.$onChangeSession),this.editor.commands.off("afterExec",this.$onAfterExec),this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.tabstopManager=null,this.session=null,this.editor=null},t.prototype.onChange=function(s){for(var r=s.action[0]=="r",l=this.selectedTabstop||{},h=l.parents||{},v=this.tabstops.slice(),x=0;x<v.length;x++){var $=v[x],C=$==l||h[$.index];if($.rangeList.$bias=C?0:1,s.action=="remove"&&$!==l){var A=$.parents&&$.parents[l.index],I=$.rangeList.pointIndex(s.start,A);I=I<0?-I-1:I+1;var N=$.rangeList.pointIndex(s.end,A);N=N<0?-N-1:N-1;for(var L=$.rangeList.ranges.slice(I,N),z=0;z<L.length;z++)this.removeRange(L[z])}$.rangeList.$onChange(s)}var B=this.session;!this.$inChange&&r&&B.getLength()==1&&!B.getValue()&&this.detach()},t.prototype.updateLinkedFields=function(){var s=this.selectedTabstop;if(!(!s||!s.hasLinkedRanges||!s.firstNonLinked)){this.$inChange=!0;for(var r=this.session,l=r.getTextRange(s.firstNonLinked),h=0;h<s.length;h++){var v=s[h];if(v.linked){var x=v.original,$=c.snippetManager.tmStrFormat(l,x,this.editor);r.replace(v,$)}}this.$inChange=!1}},t.prototype.onAfterExec=function(s){s.command&&!s.command.readOnly&&this.updateLinkedFields()},t.prototype.onChangeSelection=function(){if(this.editor){for(var s=this.editor.selection.lead,r=this.editor.selection.anchor,l=this.editor.selection.isEmpty(),h=0;h<this.ranges.length;h++)if(!this.ranges[h].linked){var v=this.ranges[h].contains(s.row,s.column),x=l||this.ranges[h].contains(r.row,r.column);if(v&&x)return}this.detach()}},t.prototype.onChangeSession=function(){this.detach()},t.prototype.tabNext=function(s){var r=this.tabstops.length,l=this.index+(s||1);l=Math.min(Math.max(l,1),r),l==r&&(l=0),this.selectTabstop(l),this.updateTabstopMarkers(),l===0&&this.detach()},t.prototype.selectTabstop=function(s){this.$openTabstops=null;var r=this.tabstops[this.index];if(r&&this.addTabstopMarkers(r),this.index=s,r=this.tabstops[this.index],!(!r||!r.length)){this.selectedTabstop=r;var l=r.firstNonLinked||r;if(r.choices&&(l.cursor=l.start),this.editor.inVirtualSelectionMode)this.editor.selection.fromOrientedRange(l);else{var h=this.editor.multiSelect;h.toSingleRange(l);for(var v=0;v<r.length;v++)r.hasLinkedRanges&&r[v].linked||h.addRange(r[v].clone(),!0)}this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler),this.selectedTabstop&&this.selectedTabstop.choices&&this.editor.execCommand("startAutocomplete",{matches:this.selectedTabstop.choices})}},t.prototype.addTabstops=function(s,r,l){var h=this.useLink||!this.editor.getOption("enableMultiselect");if(this.$openTabstops||(this.$openTabstops=[]),!s[0]){var v=o.fromPoints(l,l);R(v.start,r),R(v.end,r),s[0]=[v],s[0].index=0}var x=this.index,$=[x+1,0],C=this.ranges,A=this.snippetId=(this.snippetId||0)+1;s.forEach(function(I,N){var L=this.$openTabstops[N]||I;L.snippetId=A;for(var z=0;z<I.length;z++){var B=I[z],V=o.fromPoints(B.start,B.end||B.start);P(V.start,r),P(V.end,r),V.original=B,V.tabstop=L,C.push(V),L!=I?L.unshift(V):L[z]=V,B.fmtString||L.firstNonLinked&&h?(V.linked=!0,L.hasLinkedRanges=!0):L.firstNonLinked||(L.firstNonLinked=V)}L.firstNonLinked||(L.hasLinkedRanges=!1),L===I&&($.push(L),this.$openTabstops[N]=L),this.addTabstopMarkers(L),L.rangeList=L.rangeList||new i,L.rangeList.$bias=0,L.rangeList.addList(L)},this),$.length>2&&(this.tabstops.length&&$.push($.splice(2,1)[0]),this.tabstops.splice.apply(this.tabstops,$))},t.prototype.addTabstopMarkers=function(s){var r=this.session;s.forEach(function(l){l.markerId||(l.markerId=r.addMarker(l,"ace_snippet-marker","text"))})},t.prototype.removeTabstopMarkers=function(s){var r=this.session;s.forEach(function(l){r.removeMarker(l.markerId),l.markerId=null})},t.prototype.updateTabstopMarkers=function(){if(this.selectedTabstop){var s=this.selectedTabstop.snippetId;this.selectedTabstop.index===0&&s--,this.tabstops.forEach(function(r){r.snippetId===s?this.addTabstopMarkers(r):this.removeTabstopMarkers(r)},this)}},t.prototype.removeRange=function(s){var r=s.tabstop.indexOf(s);r!=-1&&s.tabstop.splice(r,1),r=this.ranges.indexOf(s),r!=-1&&this.ranges.splice(r,1),r=s.tabstop.rangeList.ranges.indexOf(s),r!=-1&&s.tabstop.splice(r,1),this.session.removeMarker(s.markerId),s.tabstop.length||(r=this.tabstops.indexOf(s.tabstop),r!=-1&&this.tabstops.splice(r,1),this.tabstops.length||this.detach())},t}();M.prototype.keyboardHandler=new d,M.prototype.keyboardHandler.bindKeys({Tab:function(t){c.snippetManager&&c.snippetManager.expandWithTab(t)||(t.tabstopManager.tabNext(1),t.renderer.scrollCursorIntoView())},"Shift-Tab":function(t){t.tabstopManager.tabNext(-1),t.renderer.scrollCursorIntoView()},Esc:function(t){t.tabstopManager.detach()}});var P=function(t,s){t.row==0&&(t.column+=s.column),t.row+=s.row},R=function(t,s){t.row==s.row&&(t.column-=s.column),t.row-=s.row};a.importCssString(`
.ace_snippet-marker {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: rgba(194, 193, 208, 0.09);
    border: 1px dotted rgba(211, 208, 235, 0.62);
    position: absolute;
}`,"snippets.css",!1),c.snippetManager=new b;var S=n("./editor").Editor;(function(){this.insertSnippet=function(t,s){return c.snippetManager.insertSnippet(this,t,s)},this.expandSnippet=function(t){return c.snippetManager.expandWithTab(this,t)}}).call(S.prototype)}),ace.define("ace/ext/emmet",["require","exports","module","ace/keyboard/hash_handler","ace/editor","ace/snippets","ace/range","ace/config","resources","resources","tabStops","resources","utils","actions"],function(n,c,E){var e=n("../keyboard/hash_handler").HashHandler,a=n("../editor").Editor,u=n("../snippets").snippetManager,g=n("../range").Range,p=n("../config"),o,i,d=function(){function y(){}return y.prototype.setupContext=function(M){this.ace=M,this.indentation=M.session.getTabString(),o||(o=window.emmet);var P=o.resources||o.require("resources");P.setVariable("indentation",this.indentation),this.$syntax=null,this.$syntax=this.getSyntax()},y.prototype.getSelectionRange=function(){var M=this.ace.getSelectionRange(),P=this.ace.session.doc;return{start:P.positionToIndex(M.start),end:P.positionToIndex(M.end)}},y.prototype.createSelection=function(M,P){var R=this.ace.session.doc;this.ace.selection.setRange({start:R.indexToPosition(M),end:R.indexToPosition(P)})},y.prototype.getCurrentLineRange=function(){var M=this.ace,P=M.getCursorPosition().row,R=M.session.getLine(P).length,S=M.session.doc.positionToIndex({row:P,column:0});return{start:S,end:S+R}},y.prototype.getCaretPos=function(){var M=this.ace.getCursorPosition();return this.ace.session.doc.positionToIndex(M)},y.prototype.setCaretPos=function(M){var P=this.ace.session.doc.indexToPosition(M);this.ace.selection.moveToPosition(P)},y.prototype.getCurrentLine=function(){var M=this.ace.getCursorPosition().row;return this.ace.session.getLine(M)},y.prototype.replaceContent=function(M,P,R,S){R==null&&(R=P==null?this.getContent().length:P),P==null&&(P=0);var t=this.ace,s=t.session.doc,r=g.fromPoints(s.indexToPosition(P),s.indexToPosition(R));t.session.remove(r),r.end=r.start,M=this.$updateTabstops(M),u.insertSnippet(t,M)},y.prototype.getContent=function(){return this.ace.getValue()},y.prototype.getSyntax=function(){if(this.$syntax)return this.$syntax;var M=this.ace.session.$modeId.split("/").pop();if(M=="html"||M=="php"){var P=this.ace.getCursorPosition(),R=this.ace.session.getState(P.row);typeof R!="string"&&(R=R[0]),R&&(R=R.split("-"),R.length>1?M=R[0]:M=="php"&&(M="html"))}return M},y.prototype.getProfileName=function(){var M=o.resources||o.require("resources");switch(this.getSyntax()){case"css":return"css";case"xml":case"xsl":return"xml";case"html":var P=M.getVariable("profile");return P||(P=this.ace.session.getLines(0,2).join("").search(/<!DOCTYPE[^>]+XHTML/i)!=-1?"xhtml":"html"),P;default:var R=this.ace.session.$mode;return R.emmetConfig&&R.emmetConfig.profile||"xhtml"}},y.prototype.prompt=function(M){return prompt(M)},y.prototype.getSelection=function(){return this.ace.session.getTextRange()},y.prototype.getFilePath=function(){return""},y.prototype.$updateTabstops=function(M){var P=1e3,R=0,S=null,t=o.tabStops||o.require("tabStops"),s=o.resources||o.require("resources"),r=s.getVocabulary("user"),l={tabstop:function(v){var x=parseInt(v.group,10),$=x===0;$?x=++R:x+=P;var C=v.placeholder;C&&(C=t.processText(C,l));var A="${"+x+(C?":"+C:"")+"}";return $&&(S=[v.start,A]),A},escape:function(v){return v=="$"?"\\$":v=="\\"?"\\\\":v}};if(M=t.processText(M,l),r.variables.insert_final_tabstop&&!/\$\{0\}$/.test(M))M+="${0}";else if(S){var h=o.utils?o.utils.common:o.require("utils");M=h.replaceSubstring(M,"${0}",S[0],S[1])}return M},y}(),m={expand_abbreviation:{mac:"ctrl+alt+e",win:"alt+e"},match_pair_outward:{mac:"ctrl+d",win:"ctrl+,"},match_pair_inward:{mac:"ctrl+j",win:"ctrl+shift+0"},matching_pair:{mac:"ctrl+alt+j",win:"alt+j"},next_edit_point:"alt+right",prev_edit_point:"alt+left",toggle_comment:{mac:"command+/",win:"ctrl+/"},split_join_tag:{mac:"shift+command+'",win:"shift+ctrl+`"},remove_tag:{mac:"command+'",win:"shift+ctrl+;"},evaluate_math_expression:{mac:"shift+command+y",win:"shift+ctrl+y"},increment_number_by_1:"ctrl+up",decrement_number_by_1:"ctrl+down",increment_number_by_01:"alt+up",decrement_number_by_01:"alt+down",increment_number_by_10:{mac:"alt+command+up",win:"shift+alt+up"},decrement_number_by_10:{mac:"alt+command+down",win:"shift+alt+down"},select_next_item:{mac:"shift+command+.",win:"shift+ctrl+."},select_previous_item:{mac:"shift+command+,",win:"shift+ctrl+,"},reflect_css_value:{mac:"shift+command+r",win:"shift+ctrl+r"},encode_decode_data_url:{mac:"shift+ctrl+d",win:"ctrl+'"},expand_abbreviation_with_tab:"Tab",wrap_with_abbreviation:{mac:"shift+ctrl+a",win:"shift+ctrl+a"}},_=new d;c.commands=new e,c.runEmmetCommand=function y(M){if(this.action=="expand_abbreviation_with_tab"){if(!M.selection.isEmpty())return!1;var P=M.selection.lead,R=M.session.getTokenAt(P.row,P.column);if(R&&/\btag\b/.test(R.type))return!1}try{_.setupContext(M);var S=o.actions||o.require("actions");if(this.action=="wrap_with_abbreviation")return setTimeout(function(){S.run("wrap_with_abbreviation",_)},0);var t=S.run(this.action,_)}catch(r){if(!o){var s=c.load(y.bind(this,M));return this.action=="expand_abbreviation_with_tab"?!1:s}M._signal("changeStatus",typeof r=="string"?r:r.message),p.warn(r),t=!1}return t};for(var T in m)c.commands.addCommand({name:"emmet:"+T,action:T,bindKey:m[T],exec:c.runEmmetCommand,multiSelectAction:"forEach"});c.updateCommands=function(y,M){M?y.keyBinding.addKeyboardHandler(c.commands):y.keyBinding.removeKeyboardHandler(c.commands)},c.isSupportedMode=function(y){if(!y)return!1;if(y.emmetConfig)return!0;var M=y.$id||y;return/css|less|scss|sass|stylus|html|php|twig|ejs|handlebars/.test(M)},c.isAvailable=function(y,M){if(/(evaluate_math_expression|expand_abbreviation)$/.test(M))return!0;var P=y.session.$mode,R=c.isSupportedMode(P);if(R&&P.$modes)try{_.setupContext(y),/js|php/.test(_.getSyntax())&&(R=!1)}catch(S){}return R};var b=function(y,M){var P=M;if(P){var R=c.isSupportedMode(P.session.$mode);y.enableEmmet===!1&&(R=!1),R&&c.load(),c.updateCommands(P,R)}};c.load=function(y){return typeof i!="string"?(p.warn("script for emmet-core is not loaded"),!1):(p.loadModule(i,function(){i=null,y&&y()}),!0)},c.AceEmmetEditor=d,p.defineOptions(a.prototype,"editor",{enableEmmet:{set:function(y){this[y?"on":"removeListener"]("changeMode",b),b({enableEmmet:!!y},this)},value:!0}}),c.setCore=function(y){typeof y=="string"?i=y:o=y}}),function(){ace.require(["ace/ext/emmet"],function(n){k&&(k.exports=n)})}()})(pi);var hi={exports:{}};(function(k,f){ace.define("ace/snippets",["require","exports","module","ace/lib/dom","ace/lib/oop","ace/lib/event_emitter","ace/lib/lang","ace/range","ace/range_list","ace/keyboard/hash_handler","ace/tokenizer","ace/clipboard","ace/editor"],function(n,c,E){function e(t){var s=new Date().toLocaleString("en-us",t);return s.length==1?"0"+s:s}var a=n("./lib/dom"),u=n("./lib/oop"),g=n("./lib/event_emitter").EventEmitter,p=n("./lib/lang"),o=n("./range").Range,i=n("./range_list").RangeList,d=n("./keyboard/hash_handler").HashHandler,m=n("./tokenizer").Tokenizer,_=n("./clipboard"),T={CURRENT_WORD:function(t){return t.session.getTextRange(t.session.getWordRange())},SELECTION:function(t,s,r){var l=t.session.getTextRange();return r?l.replace(/\n\r?([ \t]*\S)/g,`
`+r+"$1"):l},CURRENT_LINE:function(t){return t.session.getLine(t.getCursorPosition().row)},PREV_LINE:function(t){return t.session.getLine(t.getCursorPosition().row-1)},LINE_INDEX:function(t){return t.getCursorPosition().row},LINE_NUMBER:function(t){return t.getCursorPosition().row+1},SOFT_TABS:function(t){return t.session.getUseSoftTabs()?"YES":"NO"},TAB_SIZE:function(t){return t.session.getTabSize()},CLIPBOARD:function(t){return _.getText&&_.getText()},FILENAME:function(t){return/[^/\\]*$/.exec(this.FILEPATH(t))[0]},FILENAME_BASE:function(t){return/[^/\\]*$/.exec(this.FILEPATH(t))[0].replace(/\.[^.]*$/,"")},DIRECTORY:function(t){return this.FILEPATH(t).replace(/[^/\\]*$/,"")},FILEPATH:function(t){return"/not implemented.txt"},WORKSPACE_NAME:function(){return"Unknown"},FULLNAME:function(){return"Unknown"},BLOCK_COMMENT_START:function(t){var s=t.session.$mode||{};return s.blockComment&&s.blockComment.start||""},BLOCK_COMMENT_END:function(t){var s=t.session.$mode||{};return s.blockComment&&s.blockComment.end||""},LINE_COMMENT:function(t){var s=t.session.$mode||{};return s.lineCommentStart||""},CURRENT_YEAR:e.bind(null,{year:"numeric"}),CURRENT_YEAR_SHORT:e.bind(null,{year:"2-digit"}),CURRENT_MONTH:e.bind(null,{month:"numeric"}),CURRENT_MONTH_NAME:e.bind(null,{month:"long"}),CURRENT_MONTH_NAME_SHORT:e.bind(null,{month:"short"}),CURRENT_DATE:e.bind(null,{day:"2-digit"}),CURRENT_DAY_NAME:e.bind(null,{weekday:"long"}),CURRENT_DAY_NAME_SHORT:e.bind(null,{weekday:"short"}),CURRENT_HOUR:e.bind(null,{hour:"2-digit",hour12:!1}),CURRENT_MINUTE:e.bind(null,{minute:"2-digit"}),CURRENT_SECOND:e.bind(null,{second:"2-digit"})};T.SELECTED_TEXT=T.SELECTION;var b=function(){function t(){this.snippetMap={},this.snippetNameMap={},this.variables=T}return t.prototype.getTokenizer=function(){return t.$tokenizer||this.createTokenizer()},t.prototype.createTokenizer=function(){function s(h){return h=h.substr(1),/^\d+$/.test(h)?[{tabstopId:parseInt(h,10)}]:[{text:h}]}function r(h){return"(?:[^\\\\"+h+"]|\\\\.)"}var l={regex:"/("+r("/")+"+)/",onMatch:function(h,v,x){var $=x[0];return $.fmtString=!0,$.guard=h.slice(1,-1),$.flag="",""},next:"formatString"};return t.$tokenizer=new m({start:[{regex:/\\./,onMatch:function(h,v,x){var $=h[1];return($=="}"&&x.length||"`$\\".indexOf($)!=-1)&&(h=$),[h]}},{regex:/}/,onMatch:function(h,v,x){return[x.length?x.shift():h]}},{regex:/\$(?:\d+|\w+)/,onMatch:s},{regex:/\$\{[\dA-Z_a-z]+/,onMatch:function(h,v,x){var $=s(h.substr(1));return x.unshift($[0]),$},next:"snippetVar"},{regex:/\n/,token:"newline",merge:!1}],snippetVar:[{regex:"\\|"+r("\\|")+"*\\|",onMatch:function(h,v,x){var $=h.slice(1,-1).replace(/\\[,|\\]|,/g,function(C){return C.length==2?C[1]:"\0"}).split("\0").map(function(C){return{value:C}});return x[0].choices=$,[$[0]]},next:"start"},l,{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"start"}],formatString:[{regex:/:/,onMatch:function(h,v,x){return x.length&&x[0].expectElse?(x[0].expectElse=!1,x[0].ifEnd={elseEnd:x[0]},[x[0].ifEnd]):":"}},{regex:/\\./,onMatch:function(h,v,x){var $=h[1];return $=="}"&&x.length||"`$\\".indexOf($)!=-1?h=$:$=="n"?h=`
`:$=="t"?h="	":"ulULE".indexOf($)!=-1&&(h={changeCase:$,local:$>"a"}),[h]}},{regex:"/\\w*}",onMatch:function(h,v,x){var $=x.shift();return $&&($.flag=h.slice(1,-1)),this.next=$&&$.tabstopId?"start":"",[$||h]},next:"start"},{regex:/\$(?:\d+|\w+)/,onMatch:function(h,v,x){return[{text:h.slice(1)}]}},{regex:/\${\w+/,onMatch:function(h,v,x){var $={text:h.slice(2)};return x.unshift($),[$]},next:"formatStringVar"},{regex:/\n/,token:"newline",merge:!1},{regex:/}/,onMatch:function(h,v,x){var $=x.shift();return this.next=$&&$.tabstopId?"start":"",[$||h]},next:"start"}],formatStringVar:[{regex:/:\/\w+}/,onMatch:function(h,v,x){var $=x[0];return $.formatFunction=h.slice(2,-1),[x.shift()]},next:"formatString"},l,{regex:/:[\?\-+]?/,onMatch:function(h,v,x){h[1]=="+"&&(x[0].ifEnd=x[0]),h[1]=="?"&&(x[0].expectElse=!0)},next:"formatString"},{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"formatString"}]}),t.$tokenizer},t.prototype.tokenizeTmSnippet=function(s,r){return this.getTokenizer().getLineTokens(s,r).tokens.map(function(l){return l.value||l})},t.prototype.getVariableValue=function(s,r,l){if(/^\d+$/.test(r))return(this.variables.__||{})[r]||"";if(/^[A-Z]\d+$/.test(r))return(this.variables[r[0]+"__"]||{})[r.substr(1)]||"";if(r=r.replace(/^TM_/,""),!this.variables.hasOwnProperty(r))return"";var h=this.variables[r];return typeof h=="function"&&(h=this.variables[r](s,r,l)),h==null?"":h},t.prototype.tmStrFormat=function(s,r,l){if(!r.fmt)return s;var h=r.flag||"",v=r.guard;v=new RegExp(v,h.replace(/[^gim]/g,""));var x=typeof r.fmt=="string"?this.tokenizeTmSnippet(r.fmt,"formatString"):r.fmt,$=this,C=s.replace(v,function(){var A=$.variables.__;$.variables.__=[].slice.call(arguments);for(var I=$.resolveVariables(x,l),N="E",L=0;L<I.length;L++){var z=I[L];if(typeof z=="object")if(I[L]="",z.changeCase&&z.local){var B=I[L+1];B&&typeof B=="string"&&(z.changeCase=="u"?I[L]=B[0].toUpperCase():I[L]=B[0].toLowerCase(),I[L+1]=B.substr(1))}else z.changeCase&&(N=z.changeCase);else N=="U"?I[L]=z.toUpperCase():N=="L"&&(I[L]=z.toLowerCase())}return $.variables.__=A,I.join("")});return C},t.prototype.tmFormatFunction=function(s,r,l){return r.formatFunction=="upcase"?s.toUpperCase():r.formatFunction=="downcase"?s.toLowerCase():s},t.prototype.resolveVariables=function(s,r){function l(N){var L=s.indexOf(N,$+1);L!=-1&&($=L)}for(var h=[],v="",x=!0,$=0;$<s.length;$++){var C=s[$];if(typeof C=="string"){h.push(C),C==`
`?(x=!0,v=""):x&&(v=/^\t*/.exec(C)[0],x=/\S/.test(C));continue}if(C){if(x=!1,C.fmtString){var A=s.indexOf(C,$+1);A==-1&&(A=s.length),C.fmt=s.slice($+1,A),$=A}if(C.text){var I=this.getVariableValue(r,C.text,v)+"";C.fmtString&&(I=this.tmStrFormat(I,C,r)),C.formatFunction&&(I=this.tmFormatFunction(I,C,r)),I&&!C.ifEnd?(h.push(I),l(C)):!I&&C.ifEnd&&l(C.ifEnd)}else C.elseEnd?l(C.elseEnd):(C.tabstopId!=null||C.changeCase!=null)&&h.push(C)}}return h},t.prototype.getDisplayTextForSnippet=function(s,r){var l=y.call(this,s,r);return l.text},t.prototype.insertSnippetForSelection=function(s,r,l){l===void 0&&(l={});var h=y.call(this,s,r,l),v=s.getSelectionRange(),x=s.session.replace(v,h.text),$=new M(s),C=s.inVirtualSelectionMode&&s.selection.index;$.addTabstops(h.tabstops,v.start,x,C)},t.prototype.insertSnippet=function(s,r,l){l===void 0&&(l={});var h=this;if(s.inVirtualSelectionMode)return h.insertSnippetForSelection(s,r,l);s.forEachSelection(function(){h.insertSnippetForSelection(s,r,l)},null,{keepOrder:!0}),s.tabstopManager&&s.tabstopManager.tabNext()},t.prototype.$getScope=function(s){var r=s.session.$mode.$id||"";if(r=r.split("/").pop(),r==="html"||r==="php"){r==="php"&&!s.session.$mode.inlinePhp&&(r="html");var l=s.getCursorPosition(),h=s.session.getState(l.row);typeof h=="object"&&(h=h[0]),h.substring&&(h.substring(0,3)=="js-"?r="javascript":h.substring(0,4)=="css-"?r="css":h.substring(0,4)=="php-"&&(r="php"))}return r},t.prototype.getActiveScopes=function(s){var r=this.$getScope(s),l=[r],h=this.snippetMap;return h[r]&&h[r].includeScopes&&l.push.apply(l,h[r].includeScopes),l.push("_"),l},t.prototype.expandWithTab=function(s,r){var l=this,h=s.forEachSelection(function(){return l.expandSnippetForSelection(s,r)},null,{keepOrder:!0});return h&&s.tabstopManager&&s.tabstopManager.tabNext(),h},t.prototype.expandSnippetForSelection=function(s,r){var l=s.getCursorPosition(),h=s.session.getLine(l.row),v=h.substring(0,l.column),x=h.substr(l.column),$=this.snippetMap,C;return this.getActiveScopes(s).some(function(A){var I=$[A];return I&&(C=this.findMatchingSnippet(I,v,x)),!!C},this),C?(r&&r.dryRun||(s.session.doc.removeInLine(l.row,l.column-C.replaceBefore.length,l.column+C.replaceAfter.length),this.variables.M__=C.matchBefore,this.variables.T__=C.matchAfter,this.insertSnippetForSelection(s,C.content),this.variables.M__=this.variables.T__=null),!0):!1},t.prototype.findMatchingSnippet=function(s,r,l){for(var h=s.length;h--;){var v=s[h];if(!(v.startRe&&!v.startRe.test(r))&&!(v.endRe&&!v.endRe.test(l))&&!(!v.startRe&&!v.endRe))return v.matchBefore=v.startRe?v.startRe.exec(r):[""],v.matchAfter=v.endRe?v.endRe.exec(l):[""],v.replaceBefore=v.triggerRe?v.triggerRe.exec(r)[0]:"",v.replaceAfter=v.endTriggerRe?v.endTriggerRe.exec(l)[0]:"",v}},t.prototype.register=function(s,r){function l(A){return A&&!/^\^?\(.*\)\$?$|^\\b$/.test(A)&&(A="(?:"+A+")"),A||""}function h(A,I,N){return A=l(A),I=l(I),N?(A=I+A,A&&A[A.length-1]!="$"&&(A+="$")):(A+=I,A&&A[0]!="^"&&(A="^"+A)),new RegExp(A)}function v(A){A.scope||(A.scope=r||"_"),r=A.scope,x[r]||(x[r]=[],$[r]={});var I=$[r];if(A.name){var N=I[A.name];N&&C.unregister(N),I[A.name]=A}x[r].push(A),A.prefix&&(A.tabTrigger=A.prefix),!A.content&&A.body&&(A.content=Array.isArray(A.body)?A.body.join(`
`):A.body),A.tabTrigger&&!A.trigger&&(!A.guard&&/^\w/.test(A.tabTrigger)&&(A.guard="\\b"),A.trigger=p.escapeRegExp(A.tabTrigger)),!(!A.trigger&&!A.guard&&!A.endTrigger&&!A.endGuard)&&(A.startRe=h(A.trigger,A.guard,!0),A.triggerRe=new RegExp(A.trigger),A.endRe=h(A.endTrigger,A.endGuard,!0),A.endTriggerRe=new RegExp(A.endTrigger))}var x=this.snippetMap,$=this.snippetNameMap,C=this;s||(s=[]),Array.isArray(s)?s.forEach(v):Object.keys(s).forEach(function(A){v(s[A])}),this._signal("registerSnippets",{scope:r})},t.prototype.unregister=function(s,r){function l(x){var $=v[x.scope||r];if($&&$[x.name]){delete $[x.name];var C=h[x.scope||r],A=C&&C.indexOf(x);A>=0&&C.splice(A,1)}}var h=this.snippetMap,v=this.snippetNameMap;s.content?l(s):Array.isArray(s)&&s.forEach(l)},t.prototype.parseSnippetFile=function(s){s=s.replace(/\r/g,"");for(var r=[],l={},h=/^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm,v;v=h.exec(s);){if(v[1])try{l=JSON.parse(v[1]),r.push(l)}catch(A){}if(v[4])l.content=v[4].replace(/^\t/gm,""),r.push(l),l={};else{var x=v[2],$=v[3];if(x=="regex"){var C=/\/((?:[^\/\\]|\\.)*)|$/g;l.guard=C.exec($)[1],l.trigger=C.exec($)[1],l.endTrigger=C.exec($)[1],l.endGuard=C.exec($)[1]}else x=="snippet"?(l.tabTrigger=$.match(/^\S*/)[0],l.name||(l.name=$)):x&&(l[x]=$)}}return r},t.prototype.getSnippetByName=function(s,r){var l=this.snippetNameMap,h;return this.getActiveScopes(r).some(function(v){var x=l[v];return x&&(h=x[s]),!!h},this),h},t}();u.implement(b.prototype,g);var y=function(t,s,r){function l(D){for(var Y=[],X=0;X<D.length;X++){var U=D[X];if(typeof U=="object"){if(I[U.tabstopId])continue;var ue=D.lastIndexOf(U,X-1);U=Y[ue]||{tabstopId:U.tabstopId}}Y[X]=U}return Y}r===void 0&&(r={});var h=t.getCursorPosition(),v=t.session.getLine(h.row),x=t.session.getTabString(),$=v.match(/^\s*/)[0];h.column<$.length&&($=$.slice(0,h.column)),s=s.replace(/\r/g,"");var C=this.tokenizeTmSnippet(s);C=this.resolveVariables(C,t),C=C.map(function(D){return D==`
`&&!r.excludeExtraIndent?D+$:typeof D=="string"?D.replace(/\t/g,x):D});var A=[];C.forEach(function(D,Y){if(typeof D=="object"){var X=D.tabstopId,U=A[X];if(U||(U=A[X]=[],U.index=X,U.value="",U.parents={}),U.indexOf(D)===-1){D.choices&&!U.choices&&(U.choices=D.choices),U.push(D);var ue=C.indexOf(D,Y+1);if(ue!==-1){var de=C.slice(Y+1,ue),Ce=de.some(function(Fe){return typeof Fe=="object"});Ce&&!U.value?U.value=de:de.length&&(!U.value||typeof U.value!="string")&&(U.value=de.join(""))}}}}),A.forEach(function(D){D.length=0});for(var I={},N=0;N<C.length;N++){var L=C[N];if(typeof L=="object"){var z=L.tabstopId,B=A[z],V=C.indexOf(L,N+1);if(I[z]){I[z]===L&&(delete I[z],Object.keys(I).forEach(function(D){B.parents[D]=!0}));continue}I[z]=L;var ee=B.value;typeof ee!="string"?ee=l(ee):L.fmt&&(ee=this.tmStrFormat(ee,L,t)),C.splice.apply(C,[N+1,Math.max(0,V-N)].concat(ee,L)),B.indexOf(L)===-1&&B.push(L)}}var re=0,Z=0,K="";return C.forEach(function(D){if(typeof D=="string"){var Y=D.split(`
`);Y.length>1?(Z=Y[Y.length-1].length,re+=Y.length-1):Z+=D.length,K+=D}else D&&(D.start?D.end={row:re,column:Z}:D.start={row:re,column:Z})}),{text:K,tabstops:A,tokens:C}},M=function(){function t(s){if(this.index=0,this.ranges=[],this.tabstops=[],s.tabstopManager)return s.tabstopManager;s.tabstopManager=this,this.$onChange=this.onChange.bind(this),this.$onChangeSelection=p.delayedCall(this.onChangeSelection.bind(this)).schedule,this.$onChangeSession=this.onChangeSession.bind(this),this.$onAfterExec=this.onAfterExec.bind(this),this.attach(s)}return t.prototype.attach=function(s){this.$openTabstops=null,this.selectedTabstop=null,this.editor=s,this.session=s.session,this.editor.on("change",this.$onChange),this.editor.on("changeSelection",this.$onChangeSelection),this.editor.on("changeSession",this.$onChangeSession),this.editor.commands.on("afterExec",this.$onAfterExec),this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)},t.prototype.detach=function(){this.tabstops.forEach(this.removeTabstopMarkers,this),this.ranges.length=0,this.tabstops.length=0,this.selectedTabstop=null,this.editor.off("change",this.$onChange),this.editor.off("changeSelection",this.$onChangeSelection),this.editor.off("changeSession",this.$onChangeSession),this.editor.commands.off("afterExec",this.$onAfterExec),this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.tabstopManager=null,this.session=null,this.editor=null},t.prototype.onChange=function(s){for(var r=s.action[0]=="r",l=this.selectedTabstop||{},h=l.parents||{},v=this.tabstops.slice(),x=0;x<v.length;x++){var $=v[x],C=$==l||h[$.index];if($.rangeList.$bias=C?0:1,s.action=="remove"&&$!==l){var A=$.parents&&$.parents[l.index],I=$.rangeList.pointIndex(s.start,A);I=I<0?-I-1:I+1;var N=$.rangeList.pointIndex(s.end,A);N=N<0?-N-1:N-1;for(var L=$.rangeList.ranges.slice(I,N),z=0;z<L.length;z++)this.removeRange(L[z])}$.rangeList.$onChange(s)}var B=this.session;!this.$inChange&&r&&B.getLength()==1&&!B.getValue()&&this.detach()},t.prototype.updateLinkedFields=function(){var s=this.selectedTabstop;if(!(!s||!s.hasLinkedRanges||!s.firstNonLinked)){this.$inChange=!0;for(var r=this.session,l=r.getTextRange(s.firstNonLinked),h=0;h<s.length;h++){var v=s[h];if(v.linked){var x=v.original,$=c.snippetManager.tmStrFormat(l,x,this.editor);r.replace(v,$)}}this.$inChange=!1}},t.prototype.onAfterExec=function(s){s.command&&!s.command.readOnly&&this.updateLinkedFields()},t.prototype.onChangeSelection=function(){if(this.editor){for(var s=this.editor.selection.lead,r=this.editor.selection.anchor,l=this.editor.selection.isEmpty(),h=0;h<this.ranges.length;h++)if(!this.ranges[h].linked){var v=this.ranges[h].contains(s.row,s.column),x=l||this.ranges[h].contains(r.row,r.column);if(v&&x)return}this.detach()}},t.prototype.onChangeSession=function(){this.detach()},t.prototype.tabNext=function(s){var r=this.tabstops.length,l=this.index+(s||1);l=Math.min(Math.max(l,1),r),l==r&&(l=0),this.selectTabstop(l),this.updateTabstopMarkers(),l===0&&this.detach()},t.prototype.selectTabstop=function(s){this.$openTabstops=null;var r=this.tabstops[this.index];if(r&&this.addTabstopMarkers(r),this.index=s,r=this.tabstops[this.index],!(!r||!r.length)){this.selectedTabstop=r;var l=r.firstNonLinked||r;if(r.choices&&(l.cursor=l.start),this.editor.inVirtualSelectionMode)this.editor.selection.fromOrientedRange(l);else{var h=this.editor.multiSelect;h.toSingleRange(l);for(var v=0;v<r.length;v++)r.hasLinkedRanges&&r[v].linked||h.addRange(r[v].clone(),!0)}this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler),this.selectedTabstop&&this.selectedTabstop.choices&&this.editor.execCommand("startAutocomplete",{matches:this.selectedTabstop.choices})}},t.prototype.addTabstops=function(s,r,l){var h=this.useLink||!this.editor.getOption("enableMultiselect");if(this.$openTabstops||(this.$openTabstops=[]),!s[0]){var v=o.fromPoints(l,l);R(v.start,r),R(v.end,r),s[0]=[v],s[0].index=0}var x=this.index,$=[x+1,0],C=this.ranges,A=this.snippetId=(this.snippetId||0)+1;s.forEach(function(I,N){var L=this.$openTabstops[N]||I;L.snippetId=A;for(var z=0;z<I.length;z++){var B=I[z],V=o.fromPoints(B.start,B.end||B.start);P(V.start,r),P(V.end,r),V.original=B,V.tabstop=L,C.push(V),L!=I?L.unshift(V):L[z]=V,B.fmtString||L.firstNonLinked&&h?(V.linked=!0,L.hasLinkedRanges=!0):L.firstNonLinked||(L.firstNonLinked=V)}L.firstNonLinked||(L.hasLinkedRanges=!1),L===I&&($.push(L),this.$openTabstops[N]=L),this.addTabstopMarkers(L),L.rangeList=L.rangeList||new i,L.rangeList.$bias=0,L.rangeList.addList(L)},this),$.length>2&&(this.tabstops.length&&$.push($.splice(2,1)[0]),this.tabstops.splice.apply(this.tabstops,$))},t.prototype.addTabstopMarkers=function(s){var r=this.session;s.forEach(function(l){l.markerId||(l.markerId=r.addMarker(l,"ace_snippet-marker","text"))})},t.prototype.removeTabstopMarkers=function(s){var r=this.session;s.forEach(function(l){r.removeMarker(l.markerId),l.markerId=null})},t.prototype.updateTabstopMarkers=function(){if(this.selectedTabstop){var s=this.selectedTabstop.snippetId;this.selectedTabstop.index===0&&s--,this.tabstops.forEach(function(r){r.snippetId===s?this.addTabstopMarkers(r):this.removeTabstopMarkers(r)},this)}},t.prototype.removeRange=function(s){var r=s.tabstop.indexOf(s);r!=-1&&s.tabstop.splice(r,1),r=this.ranges.indexOf(s),r!=-1&&this.ranges.splice(r,1),r=s.tabstop.rangeList.ranges.indexOf(s),r!=-1&&s.tabstop.splice(r,1),this.session.removeMarker(s.markerId),s.tabstop.length||(r=this.tabstops.indexOf(s.tabstop),r!=-1&&this.tabstops.splice(r,1),this.tabstops.length||this.detach())},t}();M.prototype.keyboardHandler=new d,M.prototype.keyboardHandler.bindKeys({Tab:function(t){c.snippetManager&&c.snippetManager.expandWithTab(t)||(t.tabstopManager.tabNext(1),t.renderer.scrollCursorIntoView())},"Shift-Tab":function(t){t.tabstopManager.tabNext(-1),t.renderer.scrollCursorIntoView()},Esc:function(t){t.tabstopManager.detach()}});var P=function(t,s){t.row==0&&(t.column+=s.column),t.row+=s.row},R=function(t,s){t.row==s.row&&(t.column-=s.column),t.row-=s.row};a.importCssString(`
.ace_snippet-marker {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: rgba(194, 193, 208, 0.09);
    border: 1px dotted rgba(211, 208, 235, 0.62);
    position: absolute;
}`,"snippets.css",!1),c.snippetManager=new b;var S=n("./editor").Editor;(function(){this.insertSnippet=function(t,s){return c.snippetManager.insertSnippet(this,t,s)},this.expandSnippet=function(t){return c.snippetManager.expandWithTab(this,t)}}).call(S.prototype)}),ace.define("ace/autocomplete/popup",["require","exports","module","ace/virtual_renderer","ace/editor","ace/range","ace/lib/event","ace/lib/lang","ace/lib/dom","ace/config","ace/lib/useragent"],function(n,c,E){var e=n("../virtual_renderer").VirtualRenderer,a=n("../editor").Editor,u=n("../range").Range,g=n("../lib/event"),p=n("../lib/lang"),o=n("../lib/dom"),i=n("../config").nls,d=n("./../lib/useragent"),m=function(P){return"suggest-aria-id:".concat(P)},_=d.isSafari?"menu":"listbox",T=d.isSafari?"menuitem":"option",b=d.isSafari?"aria-current":"aria-selected",y=function(P){var R=new e(P);R.$maxLines=4;var S=new a(R);return S.setHighlightActiveLine(!1),S.setShowPrintMargin(!1),S.renderer.setShowGutter(!1),S.renderer.setHighlightGutterLine(!1),S.$mouseHandler.$focusTimeout=0,S.$highlightTagPending=!0,S},M=function(){function P(R){var S=o.createElement("div"),t=y(S);R&&R.appendChild(S),S.style.display="none",t.renderer.content.style.cursor="default",t.renderer.setStyle("ace_autocomplete"),t.renderer.$textLayer.element.setAttribute("role",_),t.renderer.$textLayer.element.setAttribute("aria-roledescription",i("autocomplete.popup.aria-roledescription","Autocomplete suggestions")),t.renderer.$textLayer.element.setAttribute("aria-label",i("autocomplete.popup.aria-label","Autocomplete suggestions")),t.renderer.textarea.setAttribute("aria-hidden","true"),t.setOption("displayIndentGuides",!1),t.setOption("dragDelay",150);var s=function(){};t.focus=s,t.$isFocused=!0,t.renderer.$cursorLayer.restartTimer=s,t.renderer.$cursorLayer.element.style.opacity="0",t.renderer.$maxLines=8,t.renderer.$keepTextAreaAtCursor=!1,t.setHighlightActiveLine(!1),t.session.highlight(""),t.session.$searchHighlight.clazz="ace_highlight-marker",t.on("mousedown",function(C){var A=C.getDocumentPosition();t.selection.moveToPosition(A),h.start.row=h.end.row=A.row,C.stop()});var r,l=new u(-1,0,-1,1/0),h=new u(-1,0,-1,1/0);h.id=t.session.addMarker(h,"ace_active-line","fullLine"),t.setSelectOnHover=function(C){C?l.id&&(t.session.removeMarker(l.id),l.id=null):l.id=t.session.addMarker(l,"ace_line-hover","fullLine")},t.setSelectOnHover(!1),t.on("mousemove",function(C){if(!r){r=C;return}if(!(r.x==C.x&&r.y==C.y)){r=C,r.scrollTop=t.renderer.scrollTop,t.isMouseOver=!0;var A=r.getDocumentPosition().row;l.start.row!=A&&(l.id||t.setRow(A),x(A))}}),t.renderer.on("beforeRender",function(){if(r&&l.start.row!=-1){r.$pos=null;var C=r.getDocumentPosition().row;l.id||t.setRow(C),x(C,!0)}}),t.renderer.on("afterRender",function(){for(var C=t.renderer.$textLayer,A=C.config.firstRow,I=C.config.lastRow;A<=I;A++){var N=C.element.childNodes[A-C.config.firstRow];N.setAttribute("role",T),N.setAttribute("aria-roledescription",i("autocomplete.popup.item.aria-roledescription","item")),N.setAttribute("aria-setsize",t.data.length),N.setAttribute("aria-describedby","doc-tooltip"),N.setAttribute("aria-posinset",A+1);var L=t.getData(A);if(L){var z="".concat(L.caption||L.value).concat(L.meta?", ".concat(L.meta):"");N.setAttribute("aria-label",z)}var B=N.querySelectorAll(".ace_completion-highlight");B.forEach(function(V){V.setAttribute("role","mark")})}}),t.renderer.on("afterRender",function(){var C=t.getRow(),A=t.renderer.$textLayer,I=A.element.childNodes[C-A.config.firstRow],N=document.activeElement;if(I!==t.selectedNode&&t.selectedNode&&(o.removeCssClass(t.selectedNode,"ace_selected"),t.selectedNode.removeAttribute(b),t.selectedNode.removeAttribute("id")),N.removeAttribute("aria-activedescendant"),t.selectedNode=I,I){var L=m(C);o.addCssClass(I,"ace_selected"),I.id=L,A.element.setAttribute("aria-activedescendant",L),N.setAttribute("aria-activedescendant",L),I.setAttribute(b,"true")}});var v=function(){x(-1)},x=function(C,A){C!==l.start.row&&(l.start.row=l.end.row=C,A||t.session._emit("changeBackMarker"),t._emit("changeHoverMarker"))};t.getHoveredRow=function(){return l.start.row},g.addListener(t.container,"mouseout",function(){t.isMouseOver=!1,v()}),t.on("hide",v),t.on("changeSelection",v),t.session.doc.getLength=function(){return t.data.length},t.session.doc.getLine=function(C){var A=t.data[C];return typeof A=="string"?A:A&&A.value||""};var $=t.session.bgTokenizer;return $.$tokenizeRow=function(C){function A(D,Y){D&&N.push({type:(I.className||"")+(Y||""),value:D})}var I=t.data[C],N=[];if(!I)return N;typeof I=="string"&&(I={value:I});for(var L=I.caption||I.value||I.name,z=L.toLowerCase(),B=(t.filterText||"").toLowerCase(),V=0,ee=0,re=0;re<=B.length;re++)if(re!=ee&&(I.matchMask&1<<re||re==B.length)){var Z=B.slice(ee,re);ee=re;var K=z.indexOf(Z,V);if(K==-1)continue;A(L.slice(V,K),""),V=K+Z.length,A(L.slice(K,V),"completion-highlight")}return A(L.slice(V,L.length),""),N.push({type:"completion-spacer",value:" "}),I.meta&&N.push({type:"completion-meta",value:I.meta}),I.message&&N.push({type:"completion-message",value:I.message}),N},$.$updateOnChange=s,$.start=s,t.session.$computeWidth=function(){return this.screenWidth=0},t.isOpen=!1,t.isTopdown=!1,t.autoSelect=!0,t.filterText="",t.isMouseOver=!1,t.data=[],t.setData=function(C,A){t.filterText=A||"",t.setValue(p.stringRepeat(`
`,C.length),-1),t.data=C||[],t.setRow(0)},t.getData=function(C){return t.data[C]},t.getRow=function(){return h.start.row},t.setRow=function(C){C=Math.max(this.autoSelect?0:-1,Math.min(this.data.length-1,C)),h.start.row!=C&&(t.selection.clearSelection(),h.start.row=h.end.row=C||0,t.session._emit("changeBackMarker"),t.moveCursorTo(C||0,0),t.isOpen&&t._signal("select"))},t.on("changeSelection",function(){t.isOpen&&t.setRow(t.selection.lead.row),t.renderer.scrollCursorIntoView()}),t.hide=function(){this.container.style.display="none",t.anchorPos=null,t.anchor=null,t.isOpen&&(t.isOpen=!1,this._signal("hide"))},t.tryShow=function(C,A,I,N){if(!N&&t.isOpen&&t.anchorPos&&t.anchor&&t.anchorPos.top===C.top&&t.anchorPos.left===C.left&&t.anchor===I)return!0;var L=this.container,z=this.renderer.scrollBar.width||10,B=window.innerHeight-z,V=window.innerWidth-z,ee=this.renderer,re=ee.$maxLines*A*1.4,Z={top:0,bottom:0,left:0},K=B-C.top-3*this.$borderSize-A,D=C.top-3*this.$borderSize;I||(D<=K||K>=re?I="bottom":I="top"),I==="top"?(Z.bottom=C.top-this.$borderSize,Z.top=Z.bottom-re):I==="bottom"&&(Z.top=C.top+A+this.$borderSize,Z.bottom=Z.top+re);var Y=Z.top>=0&&Z.bottom<=B;if(!N&&!Y)return!1;Y?ee.$maxPixelHeight=null:I==="top"?ee.$maxPixelHeight=D:ee.$maxPixelHeight=K,I==="top"?(L.style.top="",L.style.bottom=B+z-Z.bottom+"px",t.isTopdown=!1):(L.style.top=Z.top+"px",L.style.bottom="",t.isTopdown=!0),L.style.display="";var X=C.left;return X+L.offsetWidth>V&&(X=V-L.offsetWidth),L.style.left=X+"px",L.style.right="",t.isOpen||(t.isOpen=!0,this._signal("show"),r=null),t.anchorPos=C,t.anchor=I,!0},t.show=function(C,A,I){this.tryShow(C,A,I?"bottom":void 0,!0)},t.goTo=function(C){var A=this.getRow(),I=this.session.getLength()-1;switch(C){case"up":A=A<=0?I:A-1;break;case"down":A=A>=I?-1:A+1;break;case"start":A=0;break;case"end":A=I}this.setRow(A)},t.getTextLeftOffset=function(){return this.$borderSize+this.renderer.$padding+this.$imageSize},t.$imageSize=0,t.$borderSize=1,t}return P}();o.importCssString(`
.ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {
    background-color: #CAD6FA;
    z-index: 1;
}
.ace_dark.ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {
    background-color: #3a674e;
}
.ace_editor.ace_autocomplete .ace_line-hover {
    border: 1px solid #abbffe;
    margin-top: -1px;
    background: rgba(233,233,253,0.4);
    position: absolute;
    z-index: 2;
}
.ace_dark.ace_editor.ace_autocomplete .ace_line-hover {
    border: 1px solid rgba(109, 150, 13, 0.8);
    background: rgba(58, 103, 78, 0.62);
}
.ace_completion-meta {
    opacity: 0.5;
    margin-left: 0.9em;
}
.ace_completion-message {
    margin-left: 0.9em;
    color: blue;
}
.ace_editor.ace_autocomplete .ace_completion-highlight{
    color: #2d69c7;
}
.ace_dark.ace_editor.ace_autocomplete .ace_completion-highlight{
    color: #93ca12;
}
.ace_editor.ace_autocomplete {
    width: 300px;
    z-index: 200000;
    border: 1px lightgray solid;
    position: fixed;
    box-shadow: 2px 3px 5px rgba(0,0,0,.2);
    line-height: 1.4;
    background: #fefefe;
    color: #111;
}
.ace_dark.ace_editor.ace_autocomplete {
    border: 1px #484747 solid;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.51);
    line-height: 1.4;
    background: #25282c;
    color: #c1c1c1;
}
.ace_autocomplete .ace_text-layer  {
    width: calc(100% - 8px);
}
.ace_autocomplete .ace_line {
    display: flex;
    align-items: center;
}
.ace_autocomplete .ace_line > * {
    min-width: 0;
    flex: 0 0 auto;
}
.ace_autocomplete .ace_line .ace_ {
    flex: 0 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
}
.ace_autocomplete .ace_completion-spacer {
    flex: 1;
}
.ace_autocomplete.ace_loading:after  {
    content: "";
    position: absolute;
    top: 0px;
    height: 2px;
    width: 8%;
    background: blue;
    z-index: 100;
    animation: ace_progress 3s infinite linear;
    animation-delay: 300ms;
    transform: translateX(-100%) scaleX(1);
}
@keyframes ace_progress {
    0% { transform: translateX(-100%) scaleX(1) }
    50% { transform: translateX(625%) scaleX(2) } 
    100% { transform: translateX(1500%) scaleX(3) } 
}
@media (prefers-reduced-motion) {
    .ace_autocomplete.ace_loading:after {
        transform: translateX(625%) scaleX(2);
        animation: none;
     }
}
`,"autocompletion.css",!1),c.AcePopup=M,c.$singleLineEditor=y,c.getAriaId=m}),ace.define("ace/autocomplete/inline_screenreader",["require","exports","module"],function(n,c,E){var e=function(){function a(u){this.editor=u,this.screenReaderDiv=document.createElement("div"),this.screenReaderDiv.classList.add("ace_screenreader-only"),this.editor.container.appendChild(this.screenReaderDiv)}return a.prototype.setScreenReaderContent=function(u){for(!this.popup&&this.editor.completer&&this.editor.completer.popup&&(this.popup=this.editor.completer.popup,this.popup.renderer.on("afterRender",function(){var p=this.popup.getRow(),o=this.popup.renderer.$textLayer,i=o.element.childNodes[p-o.config.firstRow];if(i){for(var d="doc-tooltip ",m=0;m<this._lines.length;m++)d+="ace-inline-screenreader-line-".concat(m," ");i.setAttribute("aria-describedby",d)}}.bind(this)));this.screenReaderDiv.firstChild;)this.screenReaderDiv.removeChild(this.screenReaderDiv.firstChild);this._lines=u.split(/\r\n|\r|\n/);var g=this.createCodeBlock();this.screenReaderDiv.appendChild(g)},a.prototype.destroy=function(){this.screenReaderDiv.remove()},a.prototype.createCodeBlock=function(){var u=document.createElement("pre");u.setAttribute("id","ace-inline-screenreader");for(var g=0;g<this._lines.length;g++){var p=document.createElement("code");p.setAttribute("id","ace-inline-screenreader-line-".concat(g));var o=document.createTextNode(this._lines[g]);p.appendChild(o),u.appendChild(p)}return u},a}();c.AceInlineScreenReader=e}),ace.define("ace/autocomplete/inline",["require","exports","module","ace/snippets","ace/autocomplete/inline_screenreader"],function(n,c,E){var e=n("../snippets").snippetManager,a=n("./inline_screenreader").AceInlineScreenReader,u=function(){function g(){this.editor=null}return g.prototype.show=function(p,o,i){if(i=i||"",p&&this.editor&&this.editor!==p&&(this.hide(),this.editor=null,this.inlineScreenReader=null),!p||!o)return!1;this.inlineScreenReader||(this.inlineScreenReader=new a(p));var d=o.snippet?e.getDisplayTextForSnippet(p,o.snippet):o.value;return o.hideInlinePreview||!d||!d.startsWith(i)?!1:(this.editor=p,this.inlineScreenReader.setScreenReaderContent(d),d=d.slice(i.length),d===""?p.removeGhostText():p.setGhostText(d),!0)},g.prototype.isOpen=function(){return this.editor?!!this.editor.renderer.$ghostText:!1},g.prototype.hide=function(){return this.editor?(this.editor.removeGhostText(),!0):!1},g.prototype.destroy=function(){this.hide(),this.editor=null,this.inlineScreenReader&&(this.inlineScreenReader.destroy(),this.inlineScreenReader=null)},g}();c.AceInline=u}),ace.define("ace/autocomplete/util",["require","exports","module"],function(n,c,E){c.parForEach=function(a,u,g){var p=0,o=a.length;o===0&&g();for(var i=0;i<o;i++)u(a[i],function(d,m){p++,p===o&&g(d,m)})};var e=/[a-zA-Z_0-9\$\-\u00A2-\u2000\u2070-\uFFFF]/;c.retrievePrecedingIdentifier=function(a,u,g){g=g||e;for(var p=[],o=u-1;o>=0&&g.test(a[o]);o--)p.push(a[o]);return p.reverse().join("")},c.retrieveFollowingIdentifier=function(a,u,g){g=g||e;for(var p=[],o=u;o<a.length&&g.test(a[o]);o++)p.push(a[o]);return p},c.getCompletionPrefix=function(a){var u=a.getCursorPosition(),g=a.session.getLine(u.row),p;return a.completers.forEach(function(o){o.identifierRegexps&&o.identifierRegexps.forEach(function(i){!p&&i&&(p=this.retrievePrecedingIdentifier(g,u.column,i))}.bind(this))}.bind(this)),p||this.retrievePrecedingIdentifier(g,u.column)},c.triggerAutocomplete=function(a,g){var g=g==null?a.session.getPrecedingCharacter():g;return a.completers.some(function(p){if(p.triggerCharacters&&Array.isArray(p.triggerCharacters))return p.triggerCharacters.includes(g)})}}),ace.define("ace/autocomplete",["require","exports","module","ace/keyboard/hash_handler","ace/autocomplete/popup","ace/autocomplete/inline","ace/autocomplete/popup","ace/autocomplete/util","ace/lib/lang","ace/lib/dom","ace/snippets","ace/config","ace/lib/event","ace/lib/scroll"],function(n,c,E){var e=n("./keyboard/hash_handler").HashHandler,a=n("./autocomplete/popup").AcePopup,u=n("./autocomplete/inline").AceInline,g=n("./autocomplete/popup").getAriaId,p=n("./autocomplete/util"),o=n("./lib/lang"),i=n("./lib/dom"),d=n("./snippets").snippetManager,m=n("./config"),_=n("./lib/event"),T=n("./lib/scroll").preventParentScroll,b=function(R,S){S.completer&&S.completer.destroy()},y=function(){function R(){this.autoInsert=!1,this.autoSelect=!0,this.autoShown=!1,this.exactMatch=!1,this.inlineEnabled=!1,this.keyboardHandler=new e,this.keyboardHandler.bindKeys(this.commands),this.parentNode=null,this.setSelectOnHover=!1,this.hasSeen=new Set,this.showLoadingState=!1,this.stickySelectionDelay=500,this.blurListener=this.blurListener.bind(this),this.changeListener=this.changeListener.bind(this),this.mousedownListener=this.mousedownListener.bind(this),this.mousewheelListener=this.mousewheelListener.bind(this),this.onLayoutChange=this.onLayoutChange.bind(this),this.changeTimer=o.delayedCall(function(){this.updateCompletions(!0)}.bind(this)),this.tooltipTimer=o.delayedCall(this.updateDocTooltip.bind(this),50),this.popupTimer=o.delayedCall(this.$updatePopupPosition.bind(this),50),this.stickySelectionTimer=o.delayedCall(function(){this.stickySelection=!0}.bind(this),this.stickySelectionDelay),this.$firstOpenTimer=o.delayedCall(function(){var S=this.completionProvider&&this.completionProvider.initialPosition;this.autoShown||this.popup&&this.popup.isOpen||!S||this.editor.completers.length===0||(this.completions=new P(R.completionsForLoading),this.openPopup(this.editor,S.prefix,!1),this.popup.renderer.setStyle("ace_loading",!0))}.bind(this),this.stickySelectionDelay)}return Object.defineProperty(R,"completionsForLoading",{get:function(){return[{caption:m.nls("autocomplete.loading","Loading..."),value:""}]},enumerable:!1,configurable:!0}),R.prototype.$init=function(){return this.popup=new a(this.parentNode||document.body||document.documentElement),this.popup.on("click",function(S){this.insertMatch(),S.stop()}.bind(this)),this.popup.focus=this.editor.focus.bind(this.editor),this.popup.on("show",this.$onPopupShow.bind(this)),this.popup.on("hide",this.$onHidePopup.bind(this)),this.popup.on("select",this.$onPopupChange.bind(this)),_.addListener(this.popup.container,"mouseout",this.mouseOutListener.bind(this)),this.popup.on("changeHoverMarker",this.tooltipTimer.bind(null,null)),this.popup.renderer.on("afterRender",this.$onPopupRender.bind(this)),this.popup},R.prototype.$initInline=function(){if(!(!this.inlineEnabled||this.inlineRenderer))return this.inlineRenderer=new u,this.inlineRenderer},R.prototype.getPopup=function(){return this.popup||this.$init()},R.prototype.$onHidePopup=function(){this.inlineRenderer&&this.inlineRenderer.hide(),this.hideDocTooltip(),this.stickySelectionTimer.cancel(),this.popupTimer.cancel(),this.stickySelection=!1},R.prototype.$seen=function(S){!this.hasSeen.has(S)&&S&&S.completer&&S.completer.onSeen&&typeof S.completer.onSeen=="function"&&(S.completer.onSeen(this.editor,S),this.hasSeen.add(S))},R.prototype.$onPopupChange=function(S){if(this.inlineRenderer&&this.inlineEnabled){var t=S?null:this.popup.getData(this.popup.getRow());if(this.$updateGhostText(t),this.popup.isMouseOver&&this.setSelectOnHover){this.tooltipTimer.call(null,null);return}this.popupTimer.schedule(),this.tooltipTimer.schedule()}else this.popupTimer.call(null,null),this.tooltipTimer.call(null,null)},R.prototype.$updateGhostText=function(S){var t=this.base.row,s=this.base.column,r=this.editor.getCursorPosition().column,l=this.editor.session.getLine(t).slice(s,r);this.inlineRenderer.show(this.editor,S,l)?this.$seen(S):this.inlineRenderer.hide()},R.prototype.$onPopupRender=function(){var S=this.inlineRenderer&&this.inlineEnabled;if(this.completions&&this.completions.filtered&&this.completions.filtered.length>0)for(var t=this.popup.getFirstVisibleRow();t<=this.popup.getLastVisibleRow();t++){var s=this.popup.getData(t);s&&(!S||s.hideInlinePreview)&&this.$seen(s)}},R.prototype.$onPopupShow=function(S){this.$onPopupChange(S),this.stickySelection=!1,this.stickySelectionDelay>=0&&this.stickySelectionTimer.schedule(this.stickySelectionDelay)},R.prototype.observeLayoutChanges=function(){if(!(this.$elements||!this.editor)){window.addEventListener("resize",this.onLayoutChange,{passive:!0}),window.addEventListener("wheel",this.mousewheelListener);for(var S=this.editor.container.parentNode,t=[];S;)t.push(S),S.addEventListener("scroll",this.onLayoutChange,{passive:!0}),S=S.parentNode;this.$elements=t}},R.prototype.unObserveLayoutChanges=function(){var S=this;window.removeEventListener("resize",this.onLayoutChange,{passive:!0}),window.removeEventListener("wheel",this.mousewheelListener),this.$elements&&this.$elements.forEach(function(t){t.removeEventListener("scroll",S.onLayoutChange,{passive:!0})}),this.$elements=null},R.prototype.onLayoutChange=function(){if(!this.popup.isOpen)return this.unObserveLayoutChanges();this.$updatePopupPosition(),this.updateDocTooltip()},R.prototype.$updatePopupPosition=function(){var S=this.editor,t=S.renderer,s=t.layerConfig.lineHeight,r=t.$cursorLayer.getPixelPosition(this.base,!0);r.left-=this.popup.getTextLeftOffset();var l=S.container.getBoundingClientRect();r.top+=l.top-t.layerConfig.offset,r.left+=l.left-S.renderer.scrollLeft,r.left+=t.gutterWidth;var h={top:r.top,left:r.left};t.$ghostText&&t.$ghostTextWidget&&this.base.row===t.$ghostText.position.row&&(h.top+=t.$ghostTextWidget.el.offsetHeight);var v=S.container.getBoundingClientRect().bottom-s,x=v<h.top?{top:v,left:h.left}:h;this.popup.tryShow(x,s,"bottom")||this.popup.tryShow(r,s,"top")||this.popup.show(r,s)},R.prototype.openPopup=function(S,t,s){this.$firstOpenTimer.cancel(),this.popup||this.$init(),this.inlineEnabled&&!this.inlineRenderer&&this.$initInline(),this.popup.autoSelect=this.autoSelect,this.popup.setSelectOnHover(this.setSelectOnHover);var r=this.popup.getRow(),l=this.popup.data[r];this.popup.setData(this.completions.filtered,this.completions.filterText),this.editor.textInput.setAriaOptions&&this.editor.textInput.setAriaOptions({activeDescendant:g(this.popup.getRow()),inline:this.inlineEnabled}),S.keyBinding.addKeyboardHandler(this.keyboardHandler);var h;this.stickySelection&&(h=this.popup.data.indexOf(l)),(!h||h===-1)&&(h=0),this.popup.setRow(this.autoSelect?h:-1),h===r&&l!==this.completions.filtered[h]&&this.$onPopupChange();var v=this.inlineRenderer&&this.inlineEnabled;if(h===r&&v){var x=this.popup.getData(this.popup.getRow());this.$updateGhostText(x)}s||(this.popup.setTheme(S.getTheme()),this.popup.setFontSize(S.getFontSize()),this.$updatePopupPosition(),this.tooltipNode&&this.updateDocTooltip()),this.changeTimer.cancel(),this.observeLayoutChanges()},R.prototype.detach=function(){this.editor&&(this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.off("changeSelection",this.changeListener),this.editor.off("blur",this.blurListener),this.editor.off("mousedown",this.mousedownListener),this.editor.off("mousewheel",this.mousewheelListener)),this.$firstOpenTimer.cancel(),this.changeTimer.cancel(),this.hideDocTooltip(),this.completionProvider&&this.completionProvider.detach(),this.popup&&this.popup.isOpen&&this.popup.hide(),this.popup&&this.popup.renderer&&this.popup.renderer.off("afterRender",this.$onPopupRender),this.base&&this.base.detach(),this.activated=!1,this.completionProvider=this.completions=this.base=null,this.unObserveLayoutChanges()},R.prototype.changeListener=function(S){var t=this.editor.selection.lead;(t.row!=this.base.row||t.column<this.base.column)&&this.detach(),this.activated?this.changeTimer.schedule():this.detach()},R.prototype.blurListener=function(S){var t=document.activeElement,s=this.editor.textInput.getElement(),r=S.relatedTarget&&this.tooltipNode&&this.tooltipNode.contains(S.relatedTarget),l=this.popup&&this.popup.container;t!=s&&t.parentNode!=l&&!r&&t!=this.tooltipNode&&S.relatedTarget!=s&&this.detach()},R.prototype.mousedownListener=function(S){this.detach()},R.prototype.mousewheelListener=function(S){this.popup&&!this.popup.isMouseOver&&this.detach()},R.prototype.mouseOutListener=function(S){this.popup.isOpen&&this.$updatePopupPosition()},R.prototype.goTo=function(S){this.popup.goTo(S)},R.prototype.insertMatch=function(S,t){if(S||(S=this.popup.getData(this.popup.getRow())),!S)return!1;if(S.value==="")return this.detach();var s=this.completions,r=this.getCompletionProvider().insertMatch(this.editor,S,s.filterText,t);return this.completions==s&&this.detach(),r},R.prototype.showPopup=function(S,t){this.editor&&this.detach(),this.activated=!0,this.editor=S,S.completer!=this&&(S.completer&&S.completer.detach(),S.completer=this),S.on("changeSelection",this.changeListener),S.on("blur",this.blurListener),S.on("mousedown",this.mousedownListener),S.on("mousewheel",this.mousewheelListener),this.updateCompletions(!1,t)},R.prototype.getCompletionProvider=function(S){return this.completionProvider||(this.completionProvider=new M(S)),this.completionProvider},R.prototype.gatherCompletions=function(S,t){return this.getCompletionProvider().gatherCompletions(S,t)},R.prototype.updateCompletions=function(S,t){if(S&&this.base&&this.completions){var r=this.editor.getCursorPosition(),l=this.editor.session.getTextRange({start:this.base,end:r});if(l==this.completions.filterText)return;if(this.completions.setFilter(l),!this.completions.filtered.length)return this.detach();if(this.completions.filtered.length==1&&this.completions.filtered[0].value==l&&!this.completions.filtered[0].snippet)return this.detach();this.openPopup(this.editor,l,S);return}if(t&&t.matches){var r=this.editor.getSelectionRange().start;return this.base=this.editor.session.doc.createAnchor(r.row,r.column),this.base.$insertRight=!0,this.completions=new P(t.matches),this.getCompletionProvider().completions=this.completions,this.openPopup(this.editor,"",S)}var s=this.editor.getSession(),r=this.editor.getCursorPosition(),l=p.getCompletionPrefix(this.editor);this.base=s.doc.createAnchor(r.row,r.column-l.length),this.base.$insertRight=!0;var h={exactMatch:this.exactMatch,ignoreCaption:this.ignoreCaption};this.getCompletionProvider({prefix:l,pos:r}).provideCompletions(this.editor,h,function(v,x,$){var C=x.filtered,A=p.getCompletionPrefix(this.editor);if(this.$firstOpenTimer.cancel(),$){if(!C.length){var I=!this.autoShown&&this.emptyMessage;if(typeof I=="function"&&(I=this.emptyMessage(A)),I){var N=[{caption:I,value:""}];this.completions=new P(N),this.openPopup(this.editor,A,S),this.popup.renderer.setStyle("ace_loading",!1),this.popup.renderer.setStyle("ace_empty-message",!0);return}return this.detach()}if(C.length==1&&C[0].value==A&&!C[0].snippet)return this.detach();if(this.autoInsert&&!this.autoShown&&C.length==1)return this.insertMatch(C[0])}this.completions=!$&&this.showLoadingState?new P(R.completionsForLoading.concat(C),x.filterText):x,this.openPopup(this.editor,A,S),this.popup.renderer.setStyle("ace_empty-message",!1),this.popup.renderer.setStyle("ace_loading",!$)}.bind(this)),this.showLoadingState&&!this.autoShown&&(!this.popup||!this.popup.isOpen)&&this.$firstOpenTimer.delay(this.stickySelectionDelay/2)},R.prototype.cancelContextMenu=function(){this.editor.$mouseHandler.cancelContextMenu()},R.prototype.updateDocTooltip=function(){var S=this.popup,t=this.completions&&this.completions.filtered,s=t&&(t[S.getHoveredRow()]||t[S.getRow()]),r=null;if(!s||!this.editor||!this.popup.isOpen)return this.hideDocTooltip();for(var l=this.editor.completers.length,h=0;h<l;h++){var v=this.editor.completers[h];if(v.getDocTooltip&&s.completerId===v.id){r=v.getDocTooltip(s);break}}if(!r&&typeof s!="string"&&(r=s),typeof r=="string"&&(r={docText:r}),!r||!r.docHTML&&!r.docText)return this.hideDocTooltip();this.showDocTooltip(r)},R.prototype.showDocTooltip=function(S){this.tooltipNode||(this.tooltipNode=i.createElement("div"),this.tooltipNode.style.margin="0",this.tooltipNode.style.pointerEvents="auto",this.tooltipNode.style.overscrollBehavior="contain",this.tooltipNode.tabIndex=-1,this.tooltipNode.onblur=this.blurListener.bind(this),this.tooltipNode.onclick=this.onTooltipClick.bind(this),this.tooltipNode.id="doc-tooltip",this.tooltipNode.setAttribute("role","tooltip"),this.tooltipNode.addEventListener("wheel",T));var t=this.editor.renderer.theme;this.tooltipNode.className="ace_tooltip ace_doc-tooltip "+(t.isDark?"ace_dark ":"")+(t.cssClass||"");var s=this.tooltipNode;S.docHTML?s.innerHTML=S.docHTML:S.docText&&(s.textContent=S.docText),s.parentNode||this.popup.container.appendChild(this.tooltipNode);var r=this.popup,l=r.container.getBoundingClientRect(),h=400,v=300,x=r.renderer.scrollBar.width||10,$=l.left,C=window.innerWidth-l.right-x,A=r.isTopdown?l.top:window.innerHeight-x-l.bottom,I=[Math.min(C/h,1),Math.min($/h,1),Math.min(A/v*.9)],N=Math.max.apply(Math,I),L=s.style;L.display="block",N==I[0]?(L.left=l.right+1+"px",L.right="",L.maxWidth=h*N+"px",L.top=l.top+"px",L.bottom="",L.maxHeight=Math.min(window.innerHeight-x-l.top,v)+"px"):N==I[1]?(L.right=window.innerWidth-l.left+"px",L.left="",L.maxWidth=h*N+"px",L.top=l.top+"px",L.bottom="",L.maxHeight=Math.min(window.innerHeight-x-l.top,v)+"px"):N==I[2]&&(L.left=window.innerWidth-l.left+"px",L.maxWidth=Math.min(h,window.innerWidth)+"px",r.isTopdown?(L.top=l.bottom+"px",L.left=l.left+"px",L.right="",L.bottom="",L.maxHeight=Math.min(window.innerHeight-x-l.bottom,v)+"px"):(L.top=r.container.offsetTop-s.offsetHeight+"px",L.left=l.left+"px",L.right="",L.bottom="",L.maxHeight=Math.min(r.container.offsetTop,v)+"px"))},R.prototype.hideDocTooltip=function(){if(this.tooltipTimer.cancel(),!!this.tooltipNode){var S=this.tooltipNode;!this.editor.isFocused()&&document.activeElement==S&&this.editor.focus(),this.tooltipNode=null,S.parentNode&&S.parentNode.removeChild(S)}},R.prototype.onTooltipClick=function(S){for(var t=S.target;t&&t!=this.tooltipNode;){if(t.nodeName=="A"&&t.href){t.rel="noreferrer",t.target="_blank";break}t=t.parentNode}},R.prototype.destroy=function(){if(this.detach(),this.popup){this.popup.destroy();var S=this.popup.container;S&&S.parentNode&&S.parentNode.removeChild(S)}this.editor&&this.editor.completer==this&&(this.editor.off("destroy",b),this.editor.completer=null),this.inlineRenderer=this.popup=this.editor=null},R.for=function(S){return S.completer instanceof R||(S.completer&&(S.completer.destroy(),S.completer=null),m.get("sharedPopups")?(R.$sharedInstance||(R.$sharedInstance=new R),S.completer=R.$sharedInstance):(S.completer=new R,S.once("destroy",b))),S.completer},R}();y.prototype.commands={Up:function(R){R.completer.goTo("up")},Down:function(R){R.completer.goTo("down")},"Ctrl-Up|Ctrl-Home":function(R){R.completer.goTo("start")},"Ctrl-Down|Ctrl-End":function(R){R.completer.goTo("end")},Esc:function(R){R.completer.detach()},Return:function(R){return R.completer.insertMatch()},"Shift-Return":function(R){R.completer.insertMatch(null,{deleteSuffix:!0})},Tab:function(R){var S=R.completer.insertMatch();if(S||R.tabstopManager)return S;R.completer.goTo("down")},Backspace:function(R){R.execCommand("backspace");var S=p.getCompletionPrefix(R);!S&&R.completer&&R.completer.detach()},PageUp:function(R){R.completer.popup.gotoPageUp()},PageDown:function(R){R.completer.popup.gotoPageDown()}},y.startCommand={name:"startAutocomplete",exec:function(R,S){var t=y.for(R);t.autoInsert=!1,t.autoSelect=!0,t.autoShown=!1,t.showPopup(R,S),t.cancelContextMenu()},bindKey:"Ctrl-Space|Ctrl-Shift-Space|Alt-Space"};var M=function(){function R(S){this.initialPosition=S,this.active=!0}return R.prototype.insertByIndex=function(S,t,s){return!this.completions||!this.completions.filtered?!1:this.insertMatch(S,this.completions.filtered[t],s)},R.prototype.insertMatch=function(S,t,s){if(!t)return!1;if(S.startOperation({command:{name:"insertMatch"}}),t.completer&&t.completer.insertMatch)t.completer.insertMatch(S,t);else{if(!this.completions)return!1;var r=this.completions.filterText.length,l=0;if(t.range&&t.range.start.row===t.range.end.row&&(r-=this.initialPosition.prefix.length,r+=this.initialPosition.pos.column-t.range.start.column,l+=t.range.end.column-this.initialPosition.pos.column),r||l){var h;S.selection.getAllRanges?h=S.selection.getAllRanges():h=[S.getSelectionRange()];for(var v=0,x;x=h[v];v++)x.start.column-=r,x.end.column+=l,S.session.remove(x)}t.snippet?d.insertSnippet(S,t.snippet):this.$insertString(S,t),t.completer&&t.completer.onInsert&&typeof t.completer.onInsert=="function"&&t.completer.onInsert(S,t),t.command&&t.command==="startAutocomplete"&&S.execCommand(t.command)}return S.endOperation(),!0},R.prototype.$insertString=function(S,t){var s=t.value||t;S.execCommand("insertstring",s)},R.prototype.gatherCompletions=function(S,t){var s=S.getSession(),r=S.getCursorPosition(),l=p.getCompletionPrefix(S),h=[];this.completers=S.completers;var v=S.completers.length;return S.completers.forEach(function(x,$){x.getCompletions(S,s,r,l,function(C,A){x.hideInlinePreview&&(A=A.map(function(I){return Object.assign(I,{hideInlinePreview:x.hideInlinePreview})})),!C&&A&&(h=h.concat(A)),t(null,{prefix:p.getCompletionPrefix(S),matches:h,finished:--v===0})})}),!0},R.prototype.provideCompletions=function(S,t,s){var r=function(x){var $=x.prefix,C=x.matches;this.completions=new P(C),t.exactMatch&&(this.completions.exactMatch=!0),t.ignoreCaption&&(this.completions.ignoreCaption=!0),this.completions.setFilter($),(x.finished||this.completions.filtered.length)&&s(null,this.completions,x.finished)}.bind(this),l=!0,h=null;if(this.gatherCompletions(S,function(x,$){if(this.active){x&&(s(x,[],!0),this.detach());var C=$.prefix;if(C.indexOf($.prefix)===0){if(l){h=$;return}r($)}}}.bind(this)),l=!1,h){var v=h;h=null,r(v)}},R.prototype.detach=function(){this.active=!1,this.completers&&this.completers.forEach(function(S){typeof S.cancel=="function"&&S.cancel()})},R}(),P=function(){function R(S,t){this.all=S,this.filtered=S,this.filterText=t||"",this.exactMatch=!1,this.ignoreCaption=!1}return R.prototype.setFilter=function(S){if(S.length>this.filterText&&S.lastIndexOf(this.filterText,0)===0)var t=this.filtered;else var t=this.all;this.filterText=S,t=this.filterCompletions(t,this.filterText),t=t.sort(function(r,l){return l.exactMatch-r.exactMatch||l.$score-r.$score||(r.caption||r.value).localeCompare(l.caption||l.value)});var s=null;t=t.filter(function(r){var l=r.snippet||r.caption||r.value;return l===s?!1:(s=l,!0)}),this.filtered=t},R.prototype.filterCompletions=function(S,t){var s=[],r=t.toUpperCase(),l=t.toLowerCase();e:for(var h=0,v;v=S[h];h++){if(v.skipFilter){v.$score=v.score,s.push(v);continue}var x=!this.ignoreCaption&&v.caption||v.value||v.snippet;if(x){var $=-1,C=0,A=0,I,N;if(this.exactMatch){if(t!==x.substr(0,t.length))continue e}else{var L=x.toLowerCase().indexOf(l);if(L>-1)A=L;else for(var z=0;z<t.length;z++){var B=x.indexOf(l[z],$+1),V=x.indexOf(r[z],$+1);if(I=B>=0&&(V<0||B<V)?B:V,I<0)continue e;N=I-$-1,N>0&&($===-1&&(A+=10),A+=N,C|=1<<z),$=I}}v.matchMask=C,v.exactMatch=A?0:1,v.$score=(v.score||0)-A,s.push(v)}}return s},R}();c.Autocomplete=y,c.CompletionProvider=M,c.FilteredList=P}),ace.define("ace/autocomplete/text_completer",["require","exports","module","ace/range"],function(n,c,E){function e(p,o){var i=p.getTextRange(u.fromPoints({row:0,column:0},o));return i.split(g).length-1}function a(p,o){var i=e(p,o),d=p.getValue().split(g),m=Object.create(null),_=d[i];return d.forEach(function(T,b){if(!(!T||T===_)){var y=Math.abs(i-b),M=d.length-y;m[T]?m[T]=Math.max(M,m[T]):m[T]=M}}),m}var u=n("../range").Range,g=/[^a-zA-Z_0-9\$\-\u00C0-\u1FFF\u2C00-\uD7FF\w]+/;c.getCompletions=function(p,o,i,d,m){var _=a(o,i),T=Object.keys(_);m(null,T.map(function(b){return{caption:b,value:b,score:_[b],meta:"local"}}))}}),ace.define("ace/ext/language_tools",["require","exports","module","ace/snippets","ace/autocomplete","ace/config","ace/lib/lang","ace/autocomplete/util","ace/autocomplete/text_completer","ace/editor","ace/config"],function(n,c,E){var e=n("../snippets").snippetManager,a=n("../autocomplete").Autocomplete,u=n("../config"),g=n("../lib/lang"),p=n("../autocomplete/util"),o=n("../autocomplete/text_completer"),i={getCompletions:function(r,l,h,v,x){if(l.$mode.completer)return l.$mode.completer.getCompletions(r,l,h,v,x);var $=r.session.getState(h.row),C=l.$mode.getCompletions($,l,h,v);C=C.map(function(A){return A.completerId=i.id,A}),x(null,C)},id:"keywordCompleter"},d=function(r){var l={};return r.replace(/\${(\d+)(:(.*?))?}/g,function(h,v,x,$){return l[v]=$||""}).replace(/\$(\d+?)/g,function(h,v){return l[v]})},m={getCompletions:function(r,l,h,v,x){var $=[],C=l.getTokenAt(h.row,h.column);C&&C.type.match(/(tag-name|tag-open|tag-whitespace|attribute-name|attribute-value)\.xml$/)?$.push("html-tag"):$=e.getActiveScopes(r);var A=e.snippetMap,I=[];$.forEach(function(N){for(var L=A[N]||[],z=L.length;z--;){var B=L[z],V=B.name||B.tabTrigger;V&&I.push({caption:V,snippet:B.content,meta:B.tabTrigger&&!B.name?B.tabTrigger+"⇥ ":"snippet",completerId:m.id})}},this),x(null,I)},getDocTooltip:function(r){r.snippet&&!r.docHTML&&(r.docHTML=["<b>",g.escapeHTML(r.caption),"</b>","<hr></hr>",g.escapeHTML(d(r.snippet))].join(""))},id:"snippetCompleter"},_=[m,o,i];c.setCompleters=function(r){_.length=0,r&&_.push.apply(_,r)},c.addCompleter=function(r){_.push(r)},c.textCompleter=o,c.keyWordCompleter=i,c.snippetCompleter=m;var T={name:"expandSnippet",exec:function(r){return e.expandWithTab(r)},bindKey:"Tab"},b=function(r,l){y(l.session.$mode)},y=function(r){typeof r=="string"&&(r=u.$modes[r]),r&&(e.files||(e.files={}),M(r.$id,r.snippetFileId),r.modes&&r.modes.forEach(y))},M=function(r,l){!l||!r||e.files[r]||(e.files[r]={},u.loadModule(l,function(h){h&&(e.files[r]=h,!h.snippets&&h.snippetText&&(h.snippets=e.parseSnippetFile(h.snippetText)),e.register(h.snippets||[],h.scope),h.includeScopes&&(e.snippetMap[h.scope].includeScopes=h.includeScopes,h.includeScopes.forEach(function(v){y("ace/mode/"+v)})))}))},P=function(r){var l=r.editor,h=l.completer&&l.completer.activated;if(r.command.name==="backspace")h&&!p.getCompletionPrefix(l)&&l.completer.detach();else if(r.command.name==="insertstring"&&!h){R=r;var v=r.editor.$liveAutocompletionDelay;v?S.delay(v):t(r)}},R,S=g.delayedCall(function(){t(R)},0),t=function(r){var l=r.editor,h=p.getCompletionPrefix(l),v=r.args,x=p.triggerAutocomplete(l,v);if(h&&h.length>=l.$liveAutocompletionThreshold||x){var $=a.for(l);$.autoShown=!0,$.showPopup(l)}},s=n("../editor").Editor;n("../config").defineOptions(s.prototype,"editor",{enableBasicAutocompletion:{set:function(r){r?(this.completers||(this.completers=Array.isArray(r)?r:_),this.commands.addCommand(a.startCommand)):this.commands.removeCommand(a.startCommand)},value:!1},enableLiveAutocompletion:{set:function(r){r?(this.completers||(this.completers=Array.isArray(r)?r:_),this.commands.on("afterExec",P)):this.commands.off("afterExec",P)},value:!1},liveAutocompletionDelay:{initialValue:0},liveAutocompletionThreshold:{initialValue:0},enableSnippets:{set:function(r){r?(this.commands.addCommand(T),this.on("changeMode",b),b(null,this)):(this.commands.removeCommand(T),this.off("changeMode",b))},value:!1}})}),function(){ace.require(["ace/ext/language_tools"],function(n){k&&(k.exports=n)})}()})(hi);var ui={exports:{}};(function(k,f){ace.define("ace/ext/searchbox-css",["require","exports","module"],function(n,c,E){E.exports=`

/* ------------------------------------------------------------------------------------------
 * Editor Search Form
 * --------------------------------------------------------------------------------------- */
.ace_search {
    background-color: #ddd;
    color: #666;
    border: 1px solid #cbcbcb;
    border-top: 0 none;
    overflow: hidden;
    margin: 0;
    padding: 4px 6px 0 4px;
    position: absolute;
    top: 0;
    z-index: 99;
    white-space: normal;
}
.ace_search.left {
    border-left: 0 none;
    border-radius: 0px 0px 5px 0px;
    left: 0;
}
.ace_search.right {
    border-radius: 0px 0px 0px 5px;
    border-right: 0 none;
    right: 0;
}

.ace_search_form, .ace_replace_form {
    margin: 0 20px 4px 0;
    overflow: hidden;
    line-height: 1.9;
}
.ace_replace_form {
    margin-right: 0;
}
.ace_search_form.ace_nomatch {
    outline: 1px solid red;
}

.ace_search_field {
    border-radius: 3px 0 0 3px;
    background-color: white;
    color: black;
    border: 1px solid #cbcbcb;
    border-right: 0 none;
    outline: 0;
    padding: 0;
    font-size: inherit;
    margin: 0;
    line-height: inherit;
    padding: 0 6px;
    min-width: 17em;
    vertical-align: top;
    min-height: 1.8em;
    box-sizing: content-box;
}
.ace_searchbtn {
    border: 1px solid #cbcbcb;
    line-height: inherit;
    display: inline-block;
    padding: 0 6px;
    background: #fff;
    border-right: 0 none;
    border-left: 1px solid #dcdcdc;
    cursor: pointer;
    margin: 0;
    position: relative;
    color: #666;
}
.ace_searchbtn:last-child {
    border-radius: 0 3px 3px 0;
    border-right: 1px solid #cbcbcb;
}
.ace_searchbtn:disabled {
    background: none;
    cursor: default;
}
.ace_searchbtn:hover {
    background-color: #eef1f6;
}
.ace_searchbtn.prev, .ace_searchbtn.next {
     padding: 0px 0.7em
}
.ace_searchbtn.prev:after, .ace_searchbtn.next:after {
     content: "";
     border: solid 2px #888;
     width: 0.5em;
     height: 0.5em;
     border-width:  2px 0 0 2px;
     display:inline-block;
     transform: rotate(-45deg);
}
.ace_searchbtn.next:after {
     border-width: 0 2px 2px 0 ;
}
.ace_searchbtn_close {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAcCAYAAABRVo5BAAAAZ0lEQVR42u2SUQrAMAhDvazn8OjZBilCkYVVxiis8H4CT0VrAJb4WHT3C5xU2a2IQZXJjiQIRMdkEoJ5Q2yMqpfDIo+XY4k6h+YXOyKqTIj5REaxloNAd0xiKmAtsTHqW8sR2W5f7gCu5nWFUpVjZwAAAABJRU5ErkJggg==) no-repeat 50% 0;
    border-radius: 50%;
    border: 0 none;
    color: #656565;
    cursor: pointer;
    font: 16px/16px Arial;
    padding: 0;
    height: 14px;
    width: 14px;
    top: 9px;
    right: 7px;
    position: absolute;
}
.ace_searchbtn_close:hover {
    background-color: #656565;
    background-position: 50% 100%;
    color: white;
}

.ace_button {
    margin-left: 2px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
    user-select: none;
    overflow: hidden;
    opacity: 0.7;
    border: 1px solid rgba(100,100,100,0.23);
    padding: 1px;
    box-sizing:    border-box!important;
    color: black;
}

.ace_button:hover {
    background-color: #eee;
    opacity:1;
}
.ace_button:active {
    background-color: #ddd;
}

.ace_button.checked {
    border-color: #3399ff;
    opacity:1;
}

.ace_search_options{
    margin-bottom: 3px;
    text-align: right;
    -webkit-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
    user-select: none;
    clear: both;
}

.ace_search_counter {
    float: left;
    font-family: arial;
    padding: 0 8px;
}`}),ace.define("ace/ext/searchbox",["require","exports","module","ace/lib/dom","ace/lib/lang","ace/lib/event","ace/ext/searchbox-css","ace/keyboard/hash_handler","ace/lib/keys","ace/config"],function(n,c,E){var e=n("../lib/dom"),a=n("../lib/lang"),u=n("../lib/event"),g=n("./searchbox-css"),p=n("../keyboard/hash_handler").HashHandler,o=n("../lib/keys"),i=n("../config").nls,d=999;e.importCssString(g,"ace_searchbox",!1);var m=function(){function b(y,M,P){this.activeInput,this.element=e.buildDom(["div",{class:"ace_search right"},["span",{action:"hide",class:"ace_searchbtn_close"}],["div",{class:"ace_search_form"},["input",{class:"ace_search_field",placeholder:i("search-box.find.placeholder","Search for"),spellcheck:"false"}],["span",{action:"findPrev",class:"ace_searchbtn prev"},"​"],["span",{action:"findNext",class:"ace_searchbtn next"},"​"],["span",{action:"findAll",class:"ace_searchbtn",title:"Alt-Enter"},i("search-box.find-all.text","All")]],["div",{class:"ace_replace_form"},["input",{class:"ace_search_field",placeholder:i("search-box.replace.placeholder","Replace with"),spellcheck:"false"}],["span",{action:"replaceAndFindNext",class:"ace_searchbtn"},i("search-box.replace-next.text","Replace")],["span",{action:"replaceAll",class:"ace_searchbtn"},i("search-box.replace-all.text","All")]],["div",{class:"ace_search_options"},["span",{action:"toggleReplace",class:"ace_button",title:i("search-box.toggle-replace.title","Toggle Replace mode"),style:"float:left;margin-top:-2px;padding:0 5px;"},"+"],["span",{class:"ace_search_counter"}],["span",{action:"toggleRegexpMode",class:"ace_button",title:i("search-box.toggle-regexp.title","RegExp Search")},".*"],["span",{action:"toggleCaseSensitive",class:"ace_button",title:i("search-box.toggle-case.title","CaseSensitive Search")},"Aa"],["span",{action:"toggleWholeWords",class:"ace_button",title:i("search-box.toggle-whole-word.title","Whole Word Search")},"\\b"],["span",{action:"searchInSelection",class:"ace_button",title:i("search-box.toggle-in-selection.title","Search In Selection")},"S"]]]),this.setSession=this.setSession.bind(this),this.$onEditorInput=this.onEditorInput.bind(this),this.$init(),this.setEditor(y),e.importCssString(g,"ace_searchbox",y.container),u.addListener(this.element,"touchstart",function(R){R.stopPropagation()},y)}return b.prototype.setEditor=function(y){y.searchBox=this,y.renderer.scroller.appendChild(this.element),this.editor=y},b.prototype.setSession=function(y){this.searchRange=null,this.$syncOptions(!0)},b.prototype.onEditorInput=function(){this.find(!1,!1,!0)},b.prototype.$initElements=function(y){this.searchBox=y.querySelector(".ace_search_form"),this.replaceBox=y.querySelector(".ace_replace_form"),this.searchOption=y.querySelector("[action=searchInSelection]"),this.replaceOption=y.querySelector("[action=toggleReplace]"),this.regExpOption=y.querySelector("[action=toggleRegexpMode]"),this.caseSensitiveOption=y.querySelector("[action=toggleCaseSensitive]"),this.wholeWordOption=y.querySelector("[action=toggleWholeWords]"),this.searchInput=this.searchBox.querySelector(".ace_search_field"),this.replaceInput=this.replaceBox.querySelector(".ace_search_field"),this.searchCounter=y.querySelector(".ace_search_counter")},b.prototype.$init=function(){var y=this.element;this.$initElements(y);var M=this;u.addListener(y,"mousedown",function(P){setTimeout(function(){M.activeInput.focus()},0),u.stopPropagation(P)}),u.addListener(y,"click",function(P){var R=P.target||P.srcElement,S=R.getAttribute("action");S&&M[S]?M[S]():M.$searchBarKb.commands[S]&&M.$searchBarKb.commands[S].exec(M),u.stopPropagation(P)}),u.addCommandKeyListener(y,function(P,R,S){var t=o.keyCodeToString(S),s=M.$searchBarKb.findKeyCommand(R,t);s&&s.exec&&(s.exec(M),u.stopEvent(P))}),this.$onChange=a.delayedCall(function(){M.find(!1,!1)}),u.addListener(this.searchInput,"input",function(){M.$onChange.schedule(20)}),u.addListener(this.searchInput,"focus",function(){M.activeInput=M.searchInput,M.searchInput.value&&M.highlight()}),u.addListener(this.replaceInput,"focus",function(){M.activeInput=M.replaceInput,M.searchInput.value&&M.highlight()})},b.prototype.setSearchRange=function(y){this.searchRange=y,y?this.searchRangeMarker=this.editor.session.addMarker(y,"ace_active-line"):this.searchRangeMarker&&(this.editor.session.removeMarker(this.searchRangeMarker),this.searchRangeMarker=null)},b.prototype.$syncOptions=function(y){e.setCssClass(this.replaceOption,"checked",this.searchRange),e.setCssClass(this.searchOption,"checked",this.searchOption.checked),this.replaceOption.textContent=this.replaceOption.checked?"-":"+",e.setCssClass(this.regExpOption,"checked",this.regExpOption.checked),e.setCssClass(this.wholeWordOption,"checked",this.wholeWordOption.checked),e.setCssClass(this.caseSensitiveOption,"checked",this.caseSensitiveOption.checked);var M=this.editor.getReadOnly();this.replaceOption.style.display=M?"none":"",this.replaceBox.style.display=this.replaceOption.checked&&!M?"":"none",this.find(!1,!1,y)},b.prototype.highlight=function(y){this.editor.session.highlight(y||this.editor.$search.$options.re),this.editor.renderer.updateBackMarkers()},b.prototype.find=function(y,M,P){var R=this.editor.find(this.searchInput.value,{skipCurrent:y,backwards:M,wrap:!0,regExp:this.regExpOption.checked,caseSensitive:this.caseSensitiveOption.checked,wholeWord:this.wholeWordOption.checked,preventScroll:P,range:this.searchRange}),S=!R&&this.searchInput.value;e.setCssClass(this.searchBox,"ace_nomatch",S),this.editor._emit("findSearchBox",{match:!S}),this.highlight(),this.updateCounter()},b.prototype.updateCounter=function(){var y=this.editor,M=y.$search.$options.re,P=M.unicode,R=0,S=0;if(M){var t=this.searchRange?y.session.getTextRange(this.searchRange):y.getValue();y.$search.$isMultilineSearch(y.getLastSearchOptions())&&(t=t.replace(/\r\n|\r|\n/g,`
`),y.session.doc.$autoNewLine=`
`);var s=y.session.doc.positionToIndex(y.selection.anchor);this.searchRange&&(s-=y.session.doc.positionToIndex(this.searchRange.start));for(var r=M.lastIndex=0,l;(l=M.exec(t))&&(R++,r=l.index,r<=s&&S++,!(R>d||!l[0]&&(M.lastIndex=r+=a.skipEmptyMatch(t,r,P),r>=t.length))););}this.searchCounter.textContent=i("search-box.search-counter","$0 of $1",[S,R>d?d+"+":R])},b.prototype.findNext=function(){this.find(!0,!1)},b.prototype.findPrev=function(){this.find(!0,!0)},b.prototype.findAll=function(){var y=this.editor.findAll(this.searchInput.value,{regExp:this.regExpOption.checked,caseSensitive:this.caseSensitiveOption.checked,wholeWord:this.wholeWordOption.checked}),M=!y&&this.searchInput.value;e.setCssClass(this.searchBox,"ace_nomatch",M),this.editor._emit("findSearchBox",{match:!M}),this.highlight(),this.hide()},b.prototype.replace=function(){this.editor.getReadOnly()||this.editor.replace(this.replaceInput.value)},b.prototype.replaceAndFindNext=function(){this.editor.getReadOnly()||(this.editor.replace(this.replaceInput.value),this.findNext())},b.prototype.replaceAll=function(){this.editor.getReadOnly()||this.editor.replaceAll(this.replaceInput.value)},b.prototype.hide=function(){this.active=!1,this.setSearchRange(null),this.editor.off("changeSession",this.setSession),this.editor.off("input",this.$onEditorInput),this.element.style.display="none",this.editor.keyBinding.removeKeyboardHandler(this.$closeSearchBarKb),this.editor.focus()},b.prototype.show=function(y,M){this.active=!0,this.editor.on("changeSession",this.setSession),this.editor.on("input",this.$onEditorInput),this.element.style.display="",this.replaceOption.checked=M,this.editor.$search.$options.regExp&&(y=a.escapeRegExp(y)),y&&(this.searchInput.value=y),this.searchInput.focus(),this.searchInput.select(),this.editor.keyBinding.addKeyboardHandler(this.$closeSearchBarKb),this.$syncOptions(!0)},b.prototype.isFocused=function(){var y=document.activeElement;return y==this.searchInput||y==this.replaceInput},b}(),_=new p;_.bindKeys({"Ctrl-f|Command-f":function(b){var y=b.isReplace=!b.isReplace;b.replaceBox.style.display=y?"":"none",b.replaceOption.checked=!1,b.$syncOptions(),b.searchInput.focus()},"Ctrl-H|Command-Option-F":function(b){b.editor.getReadOnly()||(b.replaceOption.checked=!0,b.$syncOptions(),b.replaceInput.focus())},"Ctrl-G|Command-G":function(b){b.findNext()},"Ctrl-Shift-G|Command-Shift-G":function(b){b.findPrev()},esc:function(b){setTimeout(function(){b.hide()})},Return:function(b){b.activeInput==b.replaceInput&&b.replace(),b.findNext()},"Shift-Return":function(b){b.activeInput==b.replaceInput&&b.replace(),b.findPrev()},"Alt-Return":function(b){b.activeInput==b.replaceInput&&b.replaceAll(),b.findAll()},Tab:function(b){(b.activeInput==b.replaceInput?b.searchInput:b.replaceInput).focus()}}),_.addCommands([{name:"toggleRegexpMode",bindKey:{win:"Alt-R|Alt-/",mac:"Ctrl-Alt-R|Ctrl-Alt-/"},exec:function(b){b.regExpOption.checked=!b.regExpOption.checked,b.$syncOptions()}},{name:"toggleCaseSensitive",bindKey:{win:"Alt-C|Alt-I",mac:"Ctrl-Alt-R|Ctrl-Alt-I"},exec:function(b){b.caseSensitiveOption.checked=!b.caseSensitiveOption.checked,b.$syncOptions()}},{name:"toggleWholeWords",bindKey:{win:"Alt-B|Alt-W",mac:"Ctrl-Alt-B|Ctrl-Alt-W"},exec:function(b){b.wholeWordOption.checked=!b.wholeWordOption.checked,b.$syncOptions()}},{name:"toggleReplace",exec:function(b){b.replaceOption.checked=!b.replaceOption.checked,b.$syncOptions()}},{name:"searchInSelection",exec:function(b){b.searchOption.checked=!b.searchRange,b.setSearchRange(b.searchOption.checked&&b.editor.getSelectionRange()),b.$syncOptions()}}]);var T=new p([{bindKey:"Esc",name:"closeSearchBar",exec:function(b){b.searchBox.hide()}}]);m.prototype.$searchBarKb=_,m.prototype.$closeSearchBarKb=T,c.SearchBox=m,c.Search=function(b,y){var M=b.searchBox||new m(b);M.show(b.session.getTextRange(),y)}}),function(){ace.require(["ace/ext/searchbox"],function(n){k&&(k.exports=n)})}()})(ui);var De={},$t={},it={exports:{}};it.exports;(function(k,f){var n=200,c="__lodash_hash_undefined__",E=1,e=2,a=9007199254740991,u="[object Arguments]",g="[object Array]",p="[object AsyncFunction]",o="[object Boolean]",i="[object Date]",d="[object Error]",m="[object Function]",_="[object GeneratorFunction]",T="[object Map]",b="[object Number]",y="[object Null]",M="[object Object]",P="[object Promise]",R="[object Proxy]",S="[object RegExp]",t="[object Set]",s="[object String]",r="[object Symbol]",l="[object Undefined]",h="[object WeakMap]",v="[object ArrayBuffer]",x="[object DataView]",$="[object Float32Array]",C="[object Float64Array]",A="[object Int8Array]",I="[object Int16Array]",N="[object Int32Array]",L="[object Uint8Array]",z="[object Uint8ClampedArray]",B="[object Uint16Array]",V="[object Uint32Array]",ee=/[\\^$.*+?()[\]{}|]/g,re=/^\[object .+?Constructor\]$/,Z=/^(?:0|[1-9]\d*)$/,K={};K[$]=K[C]=K[A]=K[I]=K[N]=K[L]=K[z]=K[B]=K[V]=!0,K[u]=K[g]=K[v]=K[o]=K[x]=K[i]=K[d]=K[m]=K[T]=K[b]=K[M]=K[S]=K[t]=K[s]=K[h]=!1;var D=typeof ie=="object"&&ie&&ie.Object===Object&&ie,Y=typeof self=="object"&&self&&self.Object===Object&&self,X=D||Y||Function("return this")(),U=f&&!f.nodeType&&f,ue=U&&!0&&k&&!k.nodeType&&k,de=ue&&ue.exports===U,Ce=de&&D.process,Fe=function(){try{return Ce&&Ce.binding&&Ce.binding("util")}catch(w){}}(),Mt=Fe&&Fe.isTypedArray;function $n(w,O){for(var F=-1,j=w==null?0:w.length,Q=0,G=[];++F<j;){var ne=w[F];O(ne,F,w)&&(G[Q++]=ne)}return G}function Sn(w,O){for(var F=-1,j=O.length,Q=w.length;++F<j;)w[Q+F]=O[F];return w}function Cn(w,O){for(var F=-1,j=w==null?0:w.length;++F<j;)if(O(w[F],F,w))return!0;return!1}function Tn(w,O){for(var F=-1,j=Array(w);++F<w;)j[F]=O(F);return j}function En(w){return function(O){return w(O)}}function An(w,O){return w.has(O)}function Mn(w,O){return w==null?void 0:w[O]}function Rn(w){var O=-1,F=Array(w.size);return w.forEach(function(j,Q){F[++O]=[Q,j]}),F}function On(w,O){return function(F){return w(O(F))}}function Ln(w){var O=-1,F=Array(w.size);return w.forEach(function(j){F[++O]=j}),F}var In=Array.prototype,Pn=Function.prototype,Ke=Object.prototype,lt=X["__core-js_shared__"],Rt=Pn.toString,ve=Ke.hasOwnProperty,Ot=function(){var w=/[^.]+$/.exec(lt&&lt.keys&&lt.keys.IE_PROTO||"");return w?"Symbol(src)_1."+w:""}(),Lt=Ke.toString,Fn=RegExp("^"+Rt.call(ve).replace(ee,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),It=de?X.Buffer:void 0,Xe=X.Symbol,Pt=X.Uint8Array,Ft=Ke.propertyIsEnumerable,Nn=In.splice,Te=Xe?Xe.toStringTag:void 0,Nt=Object.getOwnPropertySymbols,zn=It?It.isBuffer:void 0,Dn=On(Object.keys,Object),ct=Ne(X,"DataView"),je=Ne(X,"Map"),pt=Ne(X,"Promise"),ht=Ne(X,"Set"),ut=Ne(X,"WeakMap"),He=Ne(Object,"create"),Bn=Me(ct),jn=Me(je),Hn=Me(pt),qn=Me(ht),Un=Me(ut),zt=Xe?Xe.prototype:void 0,dt=zt?zt.valueOf:void 0;function Ee(w){var O=-1,F=w==null?0:w.length;for(this.clear();++O<F;){var j=w[O];this.set(j[0],j[1])}}function Wn(){this.__data__=He?He(null):{},this.size=0}function Vn(w){var O=this.has(w)&&delete this.__data__[w];return this.size-=O?1:0,O}function Gn(w){var O=this.__data__;if(He){var F=O[w];return F===c?void 0:F}return ve.call(O,w)?O[w]:void 0}function Kn(w){var O=this.__data__;return He?O[w]!==void 0:ve.call(O,w)}function Xn(w,O){var F=this.__data__;return this.size+=this.has(w)?0:1,F[w]=He&&O===void 0?c:O,this}Ee.prototype.clear=Wn,Ee.prototype.delete=Vn,Ee.prototype.get=Gn,Ee.prototype.has=Kn,Ee.prototype.set=Xn;function xe(w){var O=-1,F=w==null?0:w.length;for(this.clear();++O<F;){var j=w[O];this.set(j[0],j[1])}}function Yn(){this.__data__=[],this.size=0}function Jn(w){var O=this.__data__,F=Je(O,w);if(F<0)return!1;var j=O.length-1;return F==j?O.pop():Nn.call(O,F,1),--this.size,!0}function Zn(w){var O=this.__data__,F=Je(O,w);return F<0?void 0:O[F][1]}function Qn(w){return Je(this.__data__,w)>-1}function er(w,O){var F=this.__data__,j=Je(F,w);return j<0?(++this.size,F.push([w,O])):F[j][1]=O,this}xe.prototype.clear=Yn,xe.prototype.delete=Jn,xe.prototype.get=Zn,xe.prototype.has=Qn,xe.prototype.set=er;function Ae(w){var O=-1,F=w==null?0:w.length;for(this.clear();++O<F;){var j=w[O];this.set(j[0],j[1])}}function tr(){this.size=0,this.__data__={hash:new Ee,map:new(je||xe),string:new Ee}}function nr(w){var O=Ze(this,w).delete(w);return this.size-=O?1:0,O}function rr(w){return Ze(this,w).get(w)}function ir(w){return Ze(this,w).has(w)}function or(w,O){var F=Ze(this,w),j=F.size;return F.set(w,O),this.size+=F.size==j?0:1,this}Ae.prototype.clear=tr,Ae.prototype.delete=nr,Ae.prototype.get=rr,Ae.prototype.has=ir,Ae.prototype.set=or;function Ye(w){var O=-1,F=w==null?0:w.length;for(this.__data__=new Ae;++O<F;)this.add(w[O])}function sr(w){return this.__data__.set(w,c),this}function ar(w){return this.__data__.has(w)}Ye.prototype.add=Ye.prototype.push=sr,Ye.prototype.has=ar;function ke(w){var O=this.__data__=new xe(w);this.size=O.size}function lr(){this.__data__=new xe,this.size=0}function cr(w){var O=this.__data__,F=O.delete(w);return this.size=O.size,F}function pr(w){return this.__data__.get(w)}function hr(w){return this.__data__.has(w)}function ur(w,O){var F=this.__data__;if(F instanceof xe){var j=F.__data__;if(!je||j.length<n-1)return j.push([w,O]),this.size=++F.size,this;F=this.__data__=new Ae(j)}return F.set(w,O),this.size=F.size,this}ke.prototype.clear=lr,ke.prototype.delete=cr,ke.prototype.get=pr,ke.prototype.has=hr,ke.prototype.set=ur;function dr(w,O){var F=Qe(w),j=!F&&Er(w),Q=!F&&!j&&gt(w),G=!F&&!j&&!Q&&Gt(w),ne=F||j||Q||G,oe=ne?Tn(w.length,String):[],se=oe.length;for(var te in w)(O||ve.call(w,te))&&!(ne&&(te=="length"||Q&&(te=="offset"||te=="parent")||G&&(te=="buffer"||te=="byteLength"||te=="byteOffset")||kr(te,se)))&&oe.push(te);return oe}function Je(w,O){for(var F=w.length;F--;)if(qt(w[F][0],O))return F;return-1}function gr(w,O,F){var j=O(w);return Qe(w)?j:Sn(j,F(w))}function qe(w){return w==null?w===void 0?l:y:Te&&Te in Object(w)?wr(w):Tr(w)}function Dt(w){return Ue(w)&&qe(w)==u}function Bt(w,O,F,j,Q){return w===O?!0:w==null||O==null||!Ue(w)&&!Ue(O)?w!==w&&O!==O:fr(w,O,F,j,Bt,Q)}function fr(w,O,F,j,Q,G){var ne=Qe(w),oe=Qe(O),se=ne?g:$e(w),te=oe?g:$e(O);se=se==u?M:se,te=te==u?M:te;var pe=se==M,me=te==M,ae=se==te;if(ae&&gt(w)){if(!gt(O))return!1;ne=!0,pe=!1}if(ae&&!pe)return G||(G=new ke),ne||Gt(w)?jt(w,O,F,j,Q,G):yr(w,O,se,F,j,Q,G);if(!(F&E)){var ge=pe&&ve.call(w,"__wrapped__"),fe=me&&ve.call(O,"__wrapped__");if(ge||fe){var Se=ge?w.value():w,we=fe?O.value():O;return G||(G=new ke),Q(Se,we,F,j,G)}}return ae?(G||(G=new ke),xr(w,O,F,j,Q,G)):!1}function mr(w){if(!Vt(w)||Sr(w))return!1;var O=Ut(w)?Fn:re;return O.test(Me(w))}function br(w){return Ue(w)&&Wt(w.length)&&!!K[qe(w)]}function vr(w){if(!Cr(w))return Dn(w);var O=[];for(var F in Object(w))ve.call(w,F)&&F!="constructor"&&O.push(F);return O}function jt(w,O,F,j,Q,G){var ne=F&E,oe=w.length,se=O.length;if(oe!=se&&!(ne&&se>oe))return!1;var te=G.get(w);if(te&&G.get(O))return te==O;var pe=-1,me=!0,ae=F&e?new Ye:void 0;for(G.set(w,O),G.set(O,w);++pe<oe;){var ge=w[pe],fe=O[pe];if(j)var Se=ne?j(fe,ge,pe,O,w,G):j(ge,fe,pe,w,O,G);if(Se!==void 0){if(Se)continue;me=!1;break}if(ae){if(!Cn(O,function(we,Re){if(!An(ae,Re)&&(ge===we||Q(ge,we,F,j,G)))return ae.push(Re)})){me=!1;break}}else if(!(ge===fe||Q(ge,fe,F,j,G))){me=!1;break}}return G.delete(w),G.delete(O),me}function yr(w,O,F,j,Q,G,ne){switch(F){case x:if(w.byteLength!=O.byteLength||w.byteOffset!=O.byteOffset)return!1;w=w.buffer,O=O.buffer;case v:return!(w.byteLength!=O.byteLength||!G(new Pt(w),new Pt(O)));case o:case i:case b:return qt(+w,+O);case d:return w.name==O.name&&w.message==O.message;case S:case s:return w==O+"";case T:var oe=Rn;case t:var se=j&E;if(oe||(oe=Ln),w.size!=O.size&&!se)return!1;var te=ne.get(w);if(te)return te==O;j|=e,ne.set(w,O);var pe=jt(oe(w),oe(O),j,Q,G,ne);return ne.delete(w),pe;case r:if(dt)return dt.call(w)==dt.call(O)}return!1}function xr(w,O,F,j,Q,G){var ne=F&E,oe=Ht(w),se=oe.length,te=Ht(O),pe=te.length;if(se!=pe&&!ne)return!1;for(var me=se;me--;){var ae=oe[me];if(!(ne?ae in O:ve.call(O,ae)))return!1}var ge=G.get(w);if(ge&&G.get(O))return ge==O;var fe=!0;G.set(w,O),G.set(O,w);for(var Se=ne;++me<se;){ae=oe[me];var we=w[ae],Re=O[ae];if(j)var Kt=ne?j(Re,we,ae,O,w,G):j(we,Re,ae,w,O,G);if(!(Kt===void 0?we===Re||Q(we,Re,F,j,G):Kt)){fe=!1;break}Se||(Se=ae=="constructor")}if(fe&&!Se){var et=w.constructor,tt=O.constructor;et!=tt&&"constructor"in w&&"constructor"in O&&!(typeof et=="function"&&et instanceof et&&typeof tt=="function"&&tt instanceof tt)&&(fe=!1)}return G.delete(w),G.delete(O),fe}function Ht(w){return gr(w,Rr,_r)}function Ze(w,O){var F=w.__data__;return $r(O)?F[typeof O=="string"?"string":"hash"]:F.map}function Ne(w,O){var F=Mn(w,O);return mr(F)?F:void 0}function wr(w){var O=ve.call(w,Te),F=w[Te];try{w[Te]=void 0;var j=!0}catch(G){}var Q=Lt.call(w);return j&&(O?w[Te]=F:delete w[Te]),Q}var _r=Nt?function(w){return w==null?[]:(w=Object(w),$n(Nt(w),function(O){return Ft.call(w,O)}))}:Or,$e=qe;(ct&&$e(new ct(new ArrayBuffer(1)))!=x||je&&$e(new je)!=T||pt&&$e(pt.resolve())!=P||ht&&$e(new ht)!=t||ut&&$e(new ut)!=h)&&($e=function(w){var O=qe(w),F=O==M?w.constructor:void 0,j=F?Me(F):"";if(j)switch(j){case Bn:return x;case jn:return T;case Hn:return P;case qn:return t;case Un:return h}return O});function kr(w,O){return O=O==null?a:O,!!O&&(typeof w=="number"||Z.test(w))&&w>-1&&w%1==0&&w<O}function $r(w){var O=typeof w;return O=="string"||O=="number"||O=="symbol"||O=="boolean"?w!=="__proto__":w===null}function Sr(w){return!!Ot&&Ot in w}function Cr(w){var O=w&&w.constructor,F=typeof O=="function"&&O.prototype||Ke;return w===F}function Tr(w){return Lt.call(w)}function Me(w){if(w!=null){try{return Rt.call(w)}catch(O){}try{return w+""}catch(O){}}return""}function qt(w,O){return w===O||w!==w&&O!==O}var Er=Dt(function(){return arguments}())?Dt:function(w){return Ue(w)&&ve.call(w,"callee")&&!Ft.call(w,"callee")},Qe=Array.isArray;function Ar(w){return w!=null&&Wt(w.length)&&!Ut(w)}var gt=zn||Lr;function Mr(w,O){return Bt(w,O)}function Ut(w){if(!Vt(w))return!1;var O=qe(w);return O==m||O==_||O==p||O==R}function Wt(w){return typeof w=="number"&&w>-1&&w%1==0&&w<=a}function Vt(w){var O=typeof w;return w!=null&&(O=="object"||O=="function")}function Ue(w){return w!=null&&typeof w=="object"}var Gt=Mt?En(Mt):br;function Rr(w){return Ar(w)?dr(w):vr(w)}function Or(){return[]}function Lr(){return!1}k.exports=Mr})(it,it.exports);var un=it.exports,be={};Object.defineProperty(be,"__esModule",{value:!0});be.getAceInstance=be.debounce=be.editorEvents=be.editorOptions=void 0;var di=["minLines","maxLines","readOnly","highlightActiveLine","tabSize","enableBasicAutocompletion","enableLiveAutocompletion","enableSnippets"];be.editorOptions=di;var gi=["onChange","onFocus","onInput","onBlur","onCopy","onPaste","onSelectionChange","onCursorChange","onScroll","handleOptions","updateRef"];be.editorEvents=gi;var fi=function(){var k;return typeof window=="undefined"?(ie.window={},k=rt,delete ie.window):window.ace?(k=window.ace,k.acequire=window.ace.require||window.ace.acequire):k=rt,k};be.getAceInstance=fi;var mi=function(k,f){var n=null;return function(){var c=this,E=arguments;clearTimeout(n),n=setTimeout(function(){k.apply(c,E)},f)}};be.debounce=mi;var bi=ie&&ie.__extends||function(){var k=function(f,n){return k=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(c,E){c.__proto__=E}||function(c,E){for(var e in E)Object.prototype.hasOwnProperty.call(E,e)&&(c[e]=E[e])},k(f,n)};return function(f,n){if(typeof n!="function"&&n!==null)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");k(f,n);function c(){this.constructor=f}f.prototype=n===null?Object.create(n):(c.prototype=n.prototype,new c)}}(),wt=ie&&ie.__assign||function(){return wt=Object.assign||function(k){for(var f,n=1,c=arguments.length;n<c;n++){f=arguments[n];for(var E in f)Object.prototype.hasOwnProperty.call(f,E)&&(k[E]=f[E])}return k},wt.apply(this,arguments)};Object.defineProperty($t,"__esModule",{value:!0});var vi=rt,H=kt,en=he,nt=un,ze=be,tn=(0,ze.getAceInstance)(),yi=function(k){bi(f,k);function f(n){var c=k.call(this,n)||this;return ze.editorEvents.forEach(function(E){c[E]=c[E].bind(c)}),c.debounce=ze.debounce,c}return f.prototype.isInShadow=function(n){for(var c=n&&n.parentNode;c;){if(c.toString()==="[object ShadowRoot]")return!0;c=c.parentNode}return!1},f.prototype.componentDidMount=function(){var n=this,c=this.props,E=c.className,e=c.onBeforeLoad,a=c.onValidate,u=c.mode,g=c.focus,p=c.theme,o=c.fontSize,i=c.value,d=c.defaultValue,m=c.showGutter,_=c.wrapEnabled,T=c.showPrintMargin,b=c.scrollMargin,y=b===void 0?[0,0,0,0]:b,M=c.keyboardHandler,P=c.onLoad,R=c.commands,S=c.annotations,t=c.markers,s=c.placeholder;this.editor=tn.edit(this.refEditor),e&&e(tn);for(var r=Object.keys(this.props.editorProps),l=0;l<r.length;l++)this.editor[r[l]]=this.props.editorProps[r[l]];this.props.debounceChangePeriod&&(this.onChange=this.debounce(this.onChange,this.props.debounceChangePeriod)),this.editor.renderer.setScrollMargin(y[0],y[1],y[2],y[3]),this.isInShadow(this.refEditor)&&this.editor.renderer.attachToShadowRoot(),this.editor.getSession().setMode(typeof u=="string"?"ace/mode/".concat(u):u),p&&p!==""&&this.editor.setTheme("ace/theme/".concat(p)),this.editor.setFontSize(typeof o=="number"?"".concat(o,"px"):o),this.editor.getSession().setValue(d||i||""),this.props.navigateToFileEnd&&this.editor.navigateFileEnd(),this.editor.renderer.setShowGutter(m),this.editor.getSession().setUseWrapMode(_),this.editor.setShowPrintMargin(T),this.editor.on("focus",this.onFocus),this.editor.on("blur",this.onBlur),this.editor.on("copy",this.onCopy),this.editor.on("paste",this.onPaste),this.editor.on("change",this.onChange),this.editor.on("input",this.onInput),s&&this.updatePlaceholder(),this.editor.getSession().selection.on("changeSelection",this.onSelectionChange),this.editor.getSession().selection.on("changeCursor",this.onCursorChange),a&&this.editor.getSession().on("changeAnnotation",function(){var v=n.editor.getSession().getAnnotations();n.props.onValidate(v)}),this.editor.session.on("changeScrollTop",this.onScroll),this.editor.getSession().setAnnotations(S||[]),t&&t.length>0&&this.handleMarkers(t);var h=this.editor.$options;ze.editorOptions.forEach(function(v){h.hasOwnProperty(v)?n.editor.setOption(v,n.props[v]):n.props[v]}),this.handleOptions(this.props),Array.isArray(R)&&R.forEach(function(v){typeof v.exec=="string"?n.editor.commands.bindKey(v.bindKey,v.exec):n.editor.commands.addCommand(v)}),M&&this.editor.setKeyboardHandler("ace/keyboard/"+M),E&&(this.refEditor.className+=" "+E),P&&P(this.editor),this.editor.resize(),g&&this.editor.focus()},f.prototype.componentDidUpdate=function(n){for(var c=n,E=this.props,e=0;e<ze.editorOptions.length;e++){var a=ze.editorOptions[e];E[a]!==c[a]&&this.editor.setOption(a,E[a])}if(E.className!==c.className){var u=this.refEditor.className,g=u.trim().split(" "),p=c.className.trim().split(" ");p.forEach(function(d){var m=g.indexOf(d);g.splice(m,1)}),this.refEditor.className=" "+E.className+" "+g.join(" ")}var o=this.editor&&E.value!=null&&this.editor.getValue()!==E.value;if(o){this.silent=!0;var i=this.editor.session.selection.toJSON();this.editor.setValue(E.value,E.cursorStart),this.editor.session.selection.fromJSON(i),this.silent=!1}E.placeholder!==c.placeholder&&this.updatePlaceholder(),E.mode!==c.mode&&this.editor.getSession().setMode(typeof E.mode=="string"?"ace/mode/".concat(E.mode):E.mode),E.theme!==c.theme&&this.editor.setTheme("ace/theme/"+E.theme),E.keyboardHandler!==c.keyboardHandler&&(E.keyboardHandler?this.editor.setKeyboardHandler("ace/keyboard/"+E.keyboardHandler):this.editor.setKeyboardHandler(null)),E.fontSize!==c.fontSize&&this.editor.setFontSize(typeof E.fontSize=="number"?"".concat(E.fontSize,"px"):E.fontSize),E.wrapEnabled!==c.wrapEnabled&&this.editor.getSession().setUseWrapMode(E.wrapEnabled),E.showPrintMargin!==c.showPrintMargin&&this.editor.setShowPrintMargin(E.showPrintMargin),E.showGutter!==c.showGutter&&this.editor.renderer.setShowGutter(E.showGutter),nt(E.setOptions,c.setOptions)||this.handleOptions(E),(o||!nt(E.annotations,c.annotations))&&this.editor.getSession().setAnnotations(E.annotations||[]),!nt(E.markers,c.markers)&&Array.isArray(E.markers)&&this.handleMarkers(E.markers),nt(E.scrollMargin,c.scrollMargin)||this.handleScrollMargins(E.scrollMargin),(n.height!==this.props.height||n.width!==this.props.width)&&this.editor.resize(),this.props.focus&&!n.focus&&this.editor.focus()},f.prototype.handleScrollMargins=function(n){n===void 0&&(n=[0,0,0,0]),this.editor.renderer.setScrollMargin(n[0],n[1],n[2],n[3])},f.prototype.componentWillUnmount=function(){this.editor&&(this.editor.destroy(),this.editor=null)},f.prototype.onChange=function(n){if(this.props.onChange&&!this.silent){var c=this.editor.getValue();this.props.onChange(c,n)}},f.prototype.onSelectionChange=function(n){if(this.props.onSelectionChange){var c=this.editor.getSelection();this.props.onSelectionChange(c,n)}},f.prototype.onCursorChange=function(n){if(this.props.onCursorChange){var c=this.editor.getSelection();this.props.onCursorChange(c,n)}},f.prototype.onInput=function(n){this.props.onInput&&this.props.onInput(n),this.props.placeholder&&this.updatePlaceholder()},f.prototype.onFocus=function(n){this.props.onFocus&&this.props.onFocus(n,this.editor)},f.prototype.onBlur=function(n){this.props.onBlur&&this.props.onBlur(n,this.editor)},f.prototype.onCopy=function(n){var c=n.text;this.props.onCopy&&this.props.onCopy(c)},f.prototype.onPaste=function(n){var c=n.text;this.props.onPaste&&this.props.onPaste(c)},f.prototype.onScroll=function(){this.props.onScroll&&this.props.onScroll(this.editor)},f.prototype.handleOptions=function(n){for(var c=Object.keys(n.setOptions),E=0;E<c.length;E++)this.editor.setOption(c[E],n.setOptions[c[E]])},f.prototype.handleMarkers=function(n){var c=this,E=this.editor.getSession().getMarkers(!0);for(var e in E)E.hasOwnProperty(e)&&this.editor.getSession().removeMarker(E[e].id);E=this.editor.getSession().getMarkers(!1);for(var e in E)E.hasOwnProperty(e)&&E[e].clazz!=="ace_active-line"&&E[e].clazz!=="ace_selected-word"&&this.editor.getSession().removeMarker(E[e].id);n.forEach(function(a){var u=a.startRow,g=a.startCol,p=a.endRow,o=a.endCol,i=a.className,d=a.type,m=a.inFront,_=m===void 0?!1:m,T=new vi.Range(u,g,p,o);c.editor.getSession().addMarker(T,i,d,_)})},f.prototype.updatePlaceholder=function(){var n=this.editor,c=this.props.placeholder,E=!n.session.getValue().length,e=n.renderer.placeholderNode;!E&&e?(n.renderer.scroller.removeChild(n.renderer.placeholderNode),n.renderer.placeholderNode=null):E&&!e?(e=n.renderer.placeholderNode=document.createElement("div"),e.textContent=c||"",e.className="ace_comment ace_placeholder",e.style.padding="0 9px",e.style.position="absolute",e.style.zIndex="3",n.renderer.scroller.appendChild(e)):E&&e&&(e.textContent=c)},f.prototype.updateRef=function(n){this.refEditor=n},f.prototype.render=function(){var n=this.props,c=n.name,E=n.width,e=n.height,a=n.style,u=wt({width:E,height:e},a);return en.createElement("div",{ref:this.updateRef,id:c,style:u})},f.propTypes={mode:H.oneOfType([H.string,H.object]),focus:H.bool,theme:H.string,name:H.string,className:H.string,height:H.string,width:H.string,fontSize:H.oneOfType([H.number,H.string]),showGutter:H.bool,onChange:H.func,onCopy:H.func,onPaste:H.func,onFocus:H.func,onInput:H.func,onBlur:H.func,onScroll:H.func,value:H.string,defaultValue:H.string,onLoad:H.func,onSelectionChange:H.func,onCursorChange:H.func,onBeforeLoad:H.func,onValidate:H.func,minLines:H.number,maxLines:H.number,readOnly:H.bool,highlightActiveLine:H.bool,tabSize:H.number,showPrintMargin:H.bool,cursorStart:H.number,debounceChangePeriod:H.number,editorProps:H.object,setOptions:H.object,style:H.object,scrollMargin:H.array,annotations:H.array,markers:H.array,keyboardHandler:H.string,wrapEnabled:H.bool,enableSnippets:H.bool,enableBasicAutocompletion:H.oneOfType([H.bool,H.array]),enableLiveAutocompletion:H.oneOfType([H.bool,H.array]),navigateToFileEnd:H.bool,commands:H.array,placeholder:H.string},f.defaultProps={name:"ace-editor",focus:!1,mode:"",theme:"",height:"500px",width:"500px",fontSize:12,enableSnippets:!1,showGutter:!0,onChange:null,onPaste:null,onLoad:null,onScroll:null,minLines:null,maxLines:null,readOnly:!1,highlightActiveLine:!0,showPrintMargin:!0,tabSize:4,cursorStart:1,editorProps:{},style:{},scrollMargin:[0,0,0,0],setOptions:{},wrapEnabled:!1,enableBasicAutocompletion:!1,enableLiveAutocompletion:!1,placeholder:null,navigateToFileEnd:!0},f}(en.Component);$t.default=yi;var St={},ot={},dn={exports:{}};(function(k,f){ace.define("ace/split",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/lib/event_emitter","ace/editor","ace/virtual_renderer","ace/edit_session"],function(n,c,E){var e=n("./lib/oop");n("./lib/lang");var a=n("./lib/event_emitter").EventEmitter,u=n("./editor").Editor,g=n("./virtual_renderer").VirtualRenderer,p=n("./edit_session").EditSession,o;o=function(i,d,m){this.BELOW=1,this.BESIDE=0,this.$container=i,this.$theme=d,this.$splits=0,this.$editorCSS="",this.$editors=[],this.$orientation=this.BESIDE,this.setSplits(m||1),this.$cEditor=this.$editors[0],this.on("focus",function(_){this.$cEditor=_}.bind(this))},function(){e.implement(this,a),this.$createEditor=function(){var i=document.createElement("div");i.className=this.$editorCSS,i.style.cssText="position: absolute; top:0px; bottom:0px",this.$container.appendChild(i);var d=new u(new g(i,this.$theme));return d.on("focus",function(){this._emit("focus",d)}.bind(this)),this.$editors.push(d),d.setFontSize(this.$fontSize),d},this.setSplits=function(i){var d;if(i<1)throw"The number of splits have to be > 0!";if(i!=this.$splits){if(i>this.$splits){for(;this.$splits<this.$editors.length&&this.$splits<i;)d=this.$editors[this.$splits],this.$container.appendChild(d.container),d.setFontSize(this.$fontSize),this.$splits++;for(;this.$splits<i;)this.$createEditor(),this.$splits++}else for(;this.$splits>i;)d=this.$editors[this.$splits-1],this.$container.removeChild(d.container),this.$splits--;this.resize()}},this.getSplits=function(){return this.$splits},this.getEditor=function(i){return this.$editors[i]},this.getCurrentEditor=function(){return this.$cEditor},this.focus=function(){this.$cEditor.focus()},this.blur=function(){this.$cEditor.blur()},this.setTheme=function(i){this.$editors.forEach(function(d){d.setTheme(i)})},this.setKeyboardHandler=function(i){this.$editors.forEach(function(d){d.setKeyboardHandler(i)})},this.forEach=function(i,d){this.$editors.forEach(i,d)},this.$fontSize="",this.setFontSize=function(i){this.$fontSize=i,this.forEach(function(d){d.setFontSize(i)})},this.$cloneSession=function(i){var d=new p(i.getDocument(),i.getMode()),m=i.getUndoManager();return d.setUndoManager(m),d.setTabSize(i.getTabSize()),d.setUseSoftTabs(i.getUseSoftTabs()),d.setOverwrite(i.getOverwrite()),d.setBreakpoints(i.getBreakpoints()),d.setUseWrapMode(i.getUseWrapMode()),d.setUseWorker(i.getUseWorker()),d.setWrapLimitRange(i.$wrapLimitRange.min,i.$wrapLimitRange.max),d.$foldData=i.$cloneFoldData(),d},this.setSession=function(i,d){var m;d==null?m=this.$cEditor:m=this.$editors[d];var _=this.$editors.some(function(T){return T.session===i});return _&&(i=this.$cloneSession(i)),m.setSession(i),i},this.getOrientation=function(){return this.$orientation},this.setOrientation=function(i){this.$orientation!=i&&(this.$orientation=i,this.resize())},this.resize=function(){var i=this.$container.clientWidth,d=this.$container.clientHeight,m;if(this.$orientation==this.BESIDE)for(var _=i/this.$splits,T=0;T<this.$splits;T++)m=this.$editors[T],m.container.style.width=_+"px",m.container.style.top="0px",m.container.style.left=T*_+"px",m.container.style.height=d+"px",m.resize();else for(var b=d/this.$splits,T=0;T<this.$splits;T++)m=this.$editors[T],m.container.style.width=i+"px",m.container.style.top=T*b+"px",m.container.style.left="0px",m.container.style.height=b+"px",m.resize()}}.call(o.prototype),c.Split=o}),ace.define("ace/ext/split",["require","exports","module","ace/split"],function(n,c,E){E.exports=n("../split")}),function(){ace.require(["ace/ext/split"],function(n){k&&(k.exports=n)})}()})(dn);var xi=dn.exports,wi="Expected a function",gn="__lodash_hash_undefined__",fn=1/0,_i="[object Function]",ki="[object GeneratorFunction]",$i="[object Symbol]",Si=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Ci=/^\w*$/,Ti=/^\./,Ei=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Ai=/[\\^$.*+?()[\]{}|]/g,Mi=/\\(\\)?/g,Ri=/^\[object .+?Constructor\]$/,Oi=typeof ie=="object"&&ie&&ie.Object===Object&&ie,Li=typeof self=="object"&&self&&self.Object===Object&&self,Ct=Oi||Li||Function("return this")();function Ii(k,f){return k==null?void 0:k[f]}function Pi(k){var f=!1;if(k!=null&&typeof k.toString!="function")try{f=!!(k+"")}catch(n){}return f}var Fi=Array.prototype,Ni=Function.prototype,mn=Object.prototype,vt=Ct["__core-js_shared__"],nn=function(){var k=/[^.]+$/.exec(vt&&vt.keys&&vt.keys.IE_PROTO||"");return k?"Symbol(src)_1."+k:""}(),bn=Ni.toString,Tt=mn.hasOwnProperty,vn=mn.toString,zi=RegExp("^"+bn.call(Tt).replace(Ai,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),rn=Ct.Symbol,Di=Fi.splice,Bi=yn(Ct,"Map"),Ge=yn(Object,"create"),on=rn?rn.prototype:void 0,sn=on?on.toString:void 0;function Ie(k){var f=-1,n=k?k.length:0;for(this.clear();++f<n;){var c=k[f];this.set(c[0],c[1])}}function ji(){this.__data__=Ge?Ge(null):{}}function Hi(k){return this.has(k)&&delete this.__data__[k]}function qi(k){var f=this.__data__;if(Ge){var n=f[k];return n===gn?void 0:n}return Tt.call(f,k)?f[k]:void 0}function Ui(k){var f=this.__data__;return Ge?f[k]!==void 0:Tt.call(f,k)}function Wi(k,f){var n=this.__data__;return n[k]=Ge&&f===void 0?gn:f,this}Ie.prototype.clear=ji;Ie.prototype.delete=Hi;Ie.prototype.get=qi;Ie.prototype.has=Ui;Ie.prototype.set=Wi;function Be(k){var f=-1,n=k?k.length:0;for(this.clear();++f<n;){var c=k[f];this.set(c[0],c[1])}}function Vi(){this.__data__=[]}function Gi(k){var f=this.__data__,n=st(f,k);if(n<0)return!1;var c=f.length-1;return n==c?f.pop():Di.call(f,n,1),!0}function Ki(k){var f=this.__data__,n=st(f,k);return n<0?void 0:f[n][1]}function Xi(k){return st(this.__data__,k)>-1}function Yi(k,f){var n=this.__data__,c=st(n,k);return c<0?n.push([k,f]):n[c][1]=f,this}Be.prototype.clear=Vi;Be.prototype.delete=Gi;Be.prototype.get=Ki;Be.prototype.has=Xi;Be.prototype.set=Yi;function Pe(k){var f=-1,n=k?k.length:0;for(this.clear();++f<n;){var c=k[f];this.set(c[0],c[1])}}function Ji(){this.__data__={hash:new Ie,map:new(Bi||Be),string:new Ie}}function Zi(k){return at(this,k).delete(k)}function Qi(k){return at(this,k).get(k)}function eo(k){return at(this,k).has(k)}function to(k,f){return at(this,k).set(k,f),this}Pe.prototype.clear=Ji;Pe.prototype.delete=Zi;Pe.prototype.get=Qi;Pe.prototype.has=eo;Pe.prototype.set=to;function st(k,f){for(var n=k.length;n--;)if(uo(k[n][0],f))return n;return-1}function no(k,f){f=so(f,k)?[f]:oo(f);for(var n=0,c=f.length;k!=null&&n<c;)k=k[po(f[n++])];return n&&n==c?k:void 0}function ro(k){if(!wn(k)||lo(k))return!1;var f=go(k)||Pi(k)?zi:Ri;return f.test(ho(k))}function io(k){if(typeof k=="string")return k;if(At(k))return sn?sn.call(k):"";var f=k+"";return f=="0"&&1/k==-fn?"-0":f}function oo(k){return xn(k)?k:co(k)}function at(k,f){var n=k.__data__;return ao(f)?n[typeof f=="string"?"string":"hash"]:n.map}function yn(k,f){var n=Ii(k,f);return ro(n)?n:void 0}function so(k,f){if(xn(k))return!1;var n=typeof k;return n=="number"||n=="symbol"||n=="boolean"||k==null||At(k)?!0:Ci.test(k)||!Si.test(k)||f!=null&&k in Object(f)}function ao(k){var f=typeof k;return f=="string"||f=="number"||f=="symbol"||f=="boolean"?k!=="__proto__":k===null}function lo(k){return!!nn&&nn in k}var co=Et(function(k){k=mo(k);var f=[];return Ti.test(k)&&f.push(""),k.replace(Ei,function(n,c,E,e){f.push(E?e.replace(Mi,"$1"):c||n)}),f});function po(k){if(typeof k=="string"||At(k))return k;var f=k+"";return f=="0"&&1/k==-fn?"-0":f}function ho(k){if(k!=null){try{return bn.call(k)}catch(f){}try{return k+""}catch(f){}}return""}function Et(k,f){if(typeof k!="function"||f&&typeof f!="function")throw new TypeError(wi);var n=function(){var c=arguments,E=f?f.apply(this,c):c[0],e=n.cache;if(e.has(E))return e.get(E);var a=k.apply(this,c);return n.cache=e.set(E,a),a};return n.cache=new(Et.Cache||Pe),n}Et.Cache=Pe;function uo(k,f){return k===f||k!==k&&f!==f}var xn=Array.isArray;function go(k){var f=wn(k)?vn.call(k):"";return f==_i||f==ki}function wn(k){var f=typeof k;return!!k&&(f=="object"||f=="function")}function fo(k){return!!k&&typeof k=="object"}function At(k){return typeof k=="symbol"||fo(k)&&vn.call(k)==$i}function mo(k){return k==null?"":io(k)}function bo(k,f,n){var c=k==null?void 0:no(k,f);return c===void 0?n:c}var vo=bo,yo=ie&&ie.__extends||function(){var k=function(f,n){return k=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(c,E){c.__proto__=E}||function(c,E){for(var e in E)Object.prototype.hasOwnProperty.call(E,e)&&(c[e]=E[e])},k(f,n)};return function(f,n){if(typeof n!="function"&&n!==null)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");k(f,n);function c(){this.constructor=f}f.prototype=n===null?Object.create(n):(c.prototype=n.prototype,new c)}}(),_t=ie&&ie.__assign||function(){return _t=Object.assign||function(k){for(var f,n=1,c=arguments.length;n<c;n++){f=arguments[n];for(var E in f)Object.prototype.hasOwnProperty.call(f,E)&&(k[E]=f[E])}return k},_t.apply(this,arguments)};Object.defineProperty(ot,"__esModule",{value:!0});var Le=be,yt=(0,Le.getAceInstance)(),xo=rt,wo=xi,q=kt,an=he,xt=un,_e=vo,_o=function(k){yo(f,k);function f(n){var c=k.call(this,n)||this;return Le.editorEvents.forEach(function(E){c[E]=c[E].bind(c)}),c.debounce=Le.debounce,c}return f.prototype.isInShadow=function(n){for(var c=n&&n.parentNode;c;){if(c.toString()==="[object ShadowRoot]")return!0;c=c.parentNode}return!1},f.prototype.componentDidMount=function(){var n=this,c=this.props,E=c.className,e=c.onBeforeLoad,a=c.mode,u=c.focus,g=c.theme,p=c.fontSize,o=c.value,i=c.defaultValue,d=c.cursorStart,m=c.showGutter,_=c.wrapEnabled,T=c.showPrintMargin,b=c.scrollMargin,y=b===void 0?[0,0,0,0]:b,M=c.keyboardHandler,P=c.onLoad,R=c.commands,S=c.annotations,t=c.markers,s=c.splits;this.editor=yt.edit(this.refEditor),this.isInShadow(this.refEditor)&&this.editor.renderer.attachToShadowRoot(),this.editor.setTheme("ace/theme/".concat(g)),e&&e(yt);var r=Object.keys(this.props.editorProps),l=new wo.Split(this.editor.container,"ace/theme/".concat(g),s);this.editor.env.split=l,this.splitEditor=l.getEditor(0),this.split=l,this.editor.setShowPrintMargin(!1),this.editor.renderer.setShowGutter(!1);var h=this.splitEditor.$options;this.props.debounceChangePeriod&&(this.onChange=this.debounce(this.onChange,this.props.debounceChangePeriod)),l.forEach(function(x,$){for(var C=0;C<r.length;C++)x[r[C]]=n.props.editorProps[r[C]];var A=_e(i,$),I=_e(o,$,"");x.session.setUndoManager(new yt.UndoManager),x.setTheme("ace/theme/".concat(g)),x.renderer.setScrollMargin(y[0],y[1],y[2],y[3]),x.getSession().setMode("ace/mode/".concat(a)),x.setFontSize(p),x.renderer.setShowGutter(m),x.getSession().setUseWrapMode(_),x.setShowPrintMargin(T),x.on("focus",n.onFocus),x.on("blur",n.onBlur),x.on("input",n.onInput),x.on("copy",n.onCopy),x.on("paste",n.onPaste),x.on("change",n.onChange),x.getSession().selection.on("changeSelection",n.onSelectionChange),x.getSession().selection.on("changeCursor",n.onCursorChange),x.session.on("changeScrollTop",n.onScroll),x.setValue(A===void 0?I:A,d);var N=_e(S,$,[]),L=_e(t,$,[]);x.getSession().setAnnotations(N),L&&L.length>0&&n.handleMarkers(L,x);for(var C=0;C<Le.editorOptions.length;C++){var z=Le.editorOptions[C];h.hasOwnProperty(z)?x.setOption(z,n.props[z]):n.props[z]}n.handleOptions(n.props,x),Array.isArray(R)&&R.forEach(function(B){typeof B.exec=="string"?x.commands.bindKey(B.bindKey,B.exec):x.commands.addCommand(B)}),M&&x.setKeyboardHandler("ace/keyboard/"+M)}),E&&(this.refEditor.className+=" "+E),u&&this.splitEditor.focus();var v=this.editor.env.split;v.setOrientation(this.props.orientation==="below"?v.BELOW:v.BESIDE),v.resize(!0),P&&P(v)},f.prototype.componentDidUpdate=function(n){var c=this,E=n,e=this.props,a=this.editor.env.split;if(e.splits!==E.splits&&a.setSplits(e.splits),e.orientation!==E.orientation&&a.setOrientation(e.orientation==="below"?a.BELOW:a.BESIDE),a.forEach(function(o,i){e.mode!==E.mode&&o.getSession().setMode("ace/mode/"+e.mode),e.keyboardHandler!==E.keyboardHandler&&(e.keyboardHandler?o.setKeyboardHandler("ace/keyboard/"+e.keyboardHandler):o.setKeyboardHandler(null)),e.fontSize!==E.fontSize&&o.setFontSize(e.fontSize),e.wrapEnabled!==E.wrapEnabled&&o.getSession().setUseWrapMode(e.wrapEnabled),e.showPrintMargin!==E.showPrintMargin&&o.setShowPrintMargin(e.showPrintMargin),e.showGutter!==E.showGutter&&o.renderer.setShowGutter(e.showGutter);for(var d=0;d<Le.editorOptions.length;d++){var m=Le.editorOptions[d];e[m]!==E[m]&&o.setOption(m,e[m])}xt(e.setOptions,E.setOptions)||c.handleOptions(e,o);var _=_e(e.value,i,"");if(o.getValue()!==_){c.silent=!0;var T=o.session.selection.toJSON();o.setValue(_,e.cursorStart),o.session.selection.fromJSON(T),c.silent=!1}var b=_e(e.annotations,i,[]),y=_e(E.annotations,i,[]);xt(b,y)||o.getSession().setAnnotations(b);var M=_e(e.markers,i,[]),P=_e(E.markers,i,[]);!xt(M,P)&&Array.isArray(M)&&c.handleMarkers(M,o)}),e.className!==E.className){var u=this.refEditor.className,g=u.trim().split(" "),p=E.className.trim().split(" ");p.forEach(function(o){var i=g.indexOf(o);g.splice(i,1)}),this.refEditor.className=" "+e.className+" "+g.join(" ")}e.theme!==E.theme&&a.setTheme("ace/theme/"+e.theme),e.focus&&!E.focus&&this.splitEditor.focus(),(e.height!==this.props.height||e.width!==this.props.width)&&this.editor.resize()},f.prototype.componentWillUnmount=function(){this.editor.destroy(),this.editor=null},f.prototype.onChange=function(n){if(this.props.onChange&&!this.silent){var c=[];this.editor.env.split.forEach(function(E){c.push(E.getValue())}),this.props.onChange(c,n)}},f.prototype.onSelectionChange=function(n){if(this.props.onSelectionChange){var c=[];this.editor.env.split.forEach(function(E){c.push(E.getSelection())}),this.props.onSelectionChange(c,n)}},f.prototype.onCursorChange=function(n){if(this.props.onCursorChange){var c=[];this.editor.env.split.forEach(function(E){c.push(E.getSelection())}),this.props.onCursorChange(c,n)}},f.prototype.onFocus=function(n){this.props.onFocus&&this.props.onFocus(n)},f.prototype.onInput=function(n){this.props.onInput&&this.props.onInput(n)},f.prototype.onBlur=function(n){this.props.onBlur&&this.props.onBlur(n)},f.prototype.onCopy=function(n){this.props.onCopy&&this.props.onCopy(n)},f.prototype.onPaste=function(n){this.props.onPaste&&this.props.onPaste(n)},f.prototype.onScroll=function(){this.props.onScroll&&this.props.onScroll(this.editor)},f.prototype.handleOptions=function(n,c){for(var E=Object.keys(n.setOptions),e=0;e<E.length;e++)c.setOption(E[e],n.setOptions[E[e]])},f.prototype.handleMarkers=function(n,c){var E=c.getSession().getMarkers(!0);for(var e in E)E.hasOwnProperty(e)&&c.getSession().removeMarker(E[e].id);E=c.getSession().getMarkers(!1);for(var e in E)E.hasOwnProperty(e)&&c.getSession().removeMarker(E[e].id);n.forEach(function(a){var u=a.startRow,g=a.startCol,p=a.endRow,o=a.endCol,i=a.className,d=a.type,m=a.inFront,_=m===void 0?!1:m,T=new xo.Range(u,g,p,o);c.getSession().addMarker(T,i,d,_)})},f.prototype.updateRef=function(n){this.refEditor=n},f.prototype.render=function(){var n=this.props,c=n.name,E=n.width,e=n.height,a=n.style,u=_t({width:E,height:e},a);return an.createElement("div",{ref:this.updateRef,id:c,style:u})},f.propTypes={className:q.string,debounceChangePeriod:q.number,defaultValue:q.arrayOf(q.string),focus:q.bool,fontSize:q.oneOfType([q.number,q.string]),height:q.string,mode:q.string,name:q.string,onBlur:q.func,onChange:q.func,onCopy:q.func,onFocus:q.func,onInput:q.func,onLoad:q.func,onPaste:q.func,onScroll:q.func,orientation:q.string,showGutter:q.bool,splits:q.number,theme:q.string,value:q.arrayOf(q.string),width:q.string,onSelectionChange:q.func,onCursorChange:q.func,onBeforeLoad:q.func,minLines:q.number,maxLines:q.number,readOnly:q.bool,highlightActiveLine:q.bool,tabSize:q.number,showPrintMargin:q.bool,cursorStart:q.number,editorProps:q.object,setOptions:q.object,style:q.object,scrollMargin:q.array,annotations:q.array,markers:q.array,keyboardHandler:q.string,wrapEnabled:q.bool,enableBasicAutocompletion:q.oneOfType([q.bool,q.array]),enableLiveAutocompletion:q.oneOfType([q.bool,q.array]),commands:q.array},f.defaultProps={name:"ace-editor",focus:!1,orientation:"beside",splits:2,mode:"",theme:"",height:"500px",width:"500px",value:[],fontSize:12,showGutter:!0,onChange:null,onPaste:null,onLoad:null,onScroll:null,minLines:null,maxLines:null,readOnly:!1,highlightActiveLine:!0,showPrintMargin:!0,tabSize:4,cursorStart:1,editorProps:{},style:{},scrollMargin:[0,0,0,0],setOptions:{},wrapEnabled:!1,enableBasicAutocompletion:!1,enableLiveAutocompletion:!1},f}(an.Component);ot.default=_o;var _n={exports:{}};(function(k){var f=function(){this.Diff_Timeout=1,this.Diff_EditCost=4,this.Match_Threshold=.5,this.Match_Distance=1e3,this.Patch_DeleteThreshold=.5,this.Patch_Margin=4,this.Match_MaxBits=32},n=-1,c=1,E=0;f.Diff=function(e,a){return[e,a]},f.prototype.diff_main=function(e,a,u,g){typeof g=="undefined"&&(this.Diff_Timeout<=0?g=Number.MAX_VALUE:g=new Date().getTime()+this.Diff_Timeout*1e3);var p=g;if(e==null||a==null)throw new Error("Null input. (diff_main)");if(e==a)return e?[new f.Diff(E,e)]:[];typeof u=="undefined"&&(u=!0);var o=u,i=this.diff_commonPrefix(e,a),d=e.substring(0,i);e=e.substring(i),a=a.substring(i),i=this.diff_commonSuffix(e,a);var m=e.substring(e.length-i);e=e.substring(0,e.length-i),a=a.substring(0,a.length-i);var _=this.diff_compute_(e,a,o,p);return d&&_.unshift(new f.Diff(E,d)),m&&_.push(new f.Diff(E,m)),this.diff_cleanupMerge(_),_},f.prototype.diff_compute_=function(e,a,u,g){var p;if(!e)return[new f.Diff(c,a)];if(!a)return[new f.Diff(n,e)];var o=e.length>a.length?e:a,i=e.length>a.length?a:e,d=o.indexOf(i);if(d!=-1)return p=[new f.Diff(c,o.substring(0,d)),new f.Diff(E,i),new f.Diff(c,o.substring(d+i.length))],e.length>a.length&&(p[0][0]=p[2][0]=n),p;if(i.length==1)return[new f.Diff(n,e),new f.Diff(c,a)];var m=this.diff_halfMatch_(e,a);if(m){var _=m[0],T=m[1],b=m[2],y=m[3],M=m[4],P=this.diff_main(_,b,u,g),R=this.diff_main(T,y,u,g);return P.concat([new f.Diff(E,M)],R)}return u&&e.length>100&&a.length>100?this.diff_lineMode_(e,a,g):this.diff_bisect_(e,a,g)},f.prototype.diff_lineMode_=function(e,a,u){var g=this.diff_linesToChars_(e,a);e=g.chars1,a=g.chars2;var p=g.lineArray,o=this.diff_main(e,a,!1,u);this.diff_charsToLines_(o,p),this.diff_cleanupSemantic(o),o.push(new f.Diff(E,""));for(var i=0,d=0,m=0,_="",T="";i<o.length;){switch(o[i][0]){case c:m++,T+=o[i][1];break;case n:d++,_+=o[i][1];break;case E:if(d>=1&&m>=1){o.splice(i-d-m,d+m),i=i-d-m;for(var b=this.diff_main(_,T,!1,u),y=b.length-1;y>=0;y--)o.splice(i,0,b[y]);i=i+b.length}m=0,d=0,_="",T="";break}i++}return o.pop(),o},f.prototype.diff_bisect_=function(e,a,u){for(var g=e.length,p=a.length,o=Math.ceil((g+p)/2),i=o,d=2*o,m=new Array(d),_=new Array(d),T=0;T<d;T++)m[T]=-1,_[T]=-1;m[i+1]=0,_[i+1]=0;for(var b=g-p,y=b%2!=0,M=0,P=0,R=0,S=0,t=0;t<o&&!(new Date().getTime()>u);t++){for(var s=-t+M;s<=t-P;s+=2){var r=i+s,l;s==-t||s!=t&&m[r-1]<m[r+1]?l=m[r+1]:l=m[r-1]+1;for(var h=l-s;l<g&&h<p&&e.charAt(l)==a.charAt(h);)l++,h++;if(m[r]=l,l>g)P+=2;else if(h>p)M+=2;else if(y){var v=i+b-s;if(v>=0&&v<d&&_[v]!=-1){var x=g-_[v];if(l>=x)return this.diff_bisectSplit_(e,a,l,h,u)}}}for(var $=-t+R;$<=t-S;$+=2){var v=i+$,x;$==-t||$!=t&&_[v-1]<_[v+1]?x=_[v+1]:x=_[v-1]+1;for(var C=x-$;x<g&&C<p&&e.charAt(g-x-1)==a.charAt(p-C-1);)x++,C++;if(_[v]=x,x>g)S+=2;else if(C>p)R+=2;else if(!y){var r=i+b-$;if(r>=0&&r<d&&m[r]!=-1){var l=m[r],h=i+l-r;if(x=g-x,l>=x)return this.diff_bisectSplit_(e,a,l,h,u)}}}}return[new f.Diff(n,e),new f.Diff(c,a)]},f.prototype.diff_bisectSplit_=function(e,a,u,g,p){var o=e.substring(0,u),i=a.substring(0,g),d=e.substring(u),m=a.substring(g),_=this.diff_main(o,i,!1,p),T=this.diff_main(d,m,!1,p);return _.concat(T)},f.prototype.diff_linesToChars_=function(e,a){var u=[],g={};u[0]="";function p(m){for(var _="",T=0,b=-1,y=u.length;b<m.length-1;){b=m.indexOf(`
`,T),b==-1&&(b=m.length-1);var M=m.substring(T,b+1);(g.hasOwnProperty?g.hasOwnProperty(M):g[M]!==void 0)?_+=String.fromCharCode(g[M]):(y==o&&(M=m.substring(T),b=m.length),_+=String.fromCharCode(y),g[M]=y,u[y++]=M),T=b+1}return _}var o=4e4,i=p(e);o=65535;var d=p(a);return{chars1:i,chars2:d,lineArray:u}},f.prototype.diff_charsToLines_=function(e,a){for(var u=0;u<e.length;u++){for(var g=e[u][1],p=[],o=0;o<g.length;o++)p[o]=a[g.charCodeAt(o)];e[u][1]=p.join("")}},f.prototype.diff_commonPrefix=function(e,a){if(!e||!a||e.charAt(0)!=a.charAt(0))return 0;for(var u=0,g=Math.min(e.length,a.length),p=g,o=0;u<p;)e.substring(o,p)==a.substring(o,p)?(u=p,o=u):g=p,p=Math.floor((g-u)/2+u);return p},f.prototype.diff_commonSuffix=function(e,a){if(!e||!a||e.charAt(e.length-1)!=a.charAt(a.length-1))return 0;for(var u=0,g=Math.min(e.length,a.length),p=g,o=0;u<p;)e.substring(e.length-p,e.length-o)==a.substring(a.length-p,a.length-o)?(u=p,o=u):g=p,p=Math.floor((g-u)/2+u);return p},f.prototype.diff_commonOverlap_=function(e,a){var u=e.length,g=a.length;if(u==0||g==0)return 0;u>g?e=e.substring(u-g):u<g&&(a=a.substring(0,u));var p=Math.min(u,g);if(e==a)return p;for(var o=0,i=1;;){var d=e.substring(p-i),m=a.indexOf(d);if(m==-1)return o;i+=m,(m==0||e.substring(p-i)==a.substring(0,i))&&(o=i,i++)}},f.prototype.diff_halfMatch_=function(e,a){if(this.Diff_Timeout<=0)return null;var u=e.length>a.length?e:a,g=e.length>a.length?a:e;if(u.length<4||g.length*2<u.length)return null;var p=this;function o(P,R,S){for(var t=P.substring(S,S+Math.floor(P.length/4)),s=-1,r="",l,h,v,x;(s=R.indexOf(t,s+1))!=-1;){var $=p.diff_commonPrefix(P.substring(S),R.substring(s)),C=p.diff_commonSuffix(P.substring(0,S),R.substring(0,s));r.length<C+$&&(r=R.substring(s-C,s)+R.substring(s,s+$),l=P.substring(0,S-C),h=P.substring(S+$),v=R.substring(0,s-C),x=R.substring(s+$))}return r.length*2>=P.length?[l,h,v,x,r]:null}var i=o(u,g,Math.ceil(u.length/4)),d=o(u,g,Math.ceil(u.length/2)),m;if(!i&&!d)return null;d?i?m=i[4].length>d[4].length?i:d:m=d:m=i;var _,T,b,y;e.length>a.length?(_=m[0],T=m[1],b=m[2],y=m[3]):(b=m[0],y=m[1],_=m[2],T=m[3]);var M=m[4];return[_,T,b,y,M]},f.prototype.diff_cleanupSemantic=function(e){for(var a=!1,u=[],g=0,p=null,o=0,i=0,d=0,m=0,_=0;o<e.length;)e[o][0]==E?(u[g++]=o,i=m,d=_,m=0,_=0,p=e[o][1]):(e[o][0]==c?m+=e[o][1].length:_+=e[o][1].length,p&&p.length<=Math.max(i,d)&&p.length<=Math.max(m,_)&&(e.splice(u[g-1],0,new f.Diff(n,p)),e[u[g-1]+1][0]=c,g--,g--,o=g>0?u[g-1]:-1,i=0,d=0,m=0,_=0,p=null,a=!0)),o++;for(a&&this.diff_cleanupMerge(e),this.diff_cleanupSemanticLossless(e),o=1;o<e.length;){if(e[o-1][0]==n&&e[o][0]==c){var T=e[o-1][1],b=e[o][1],y=this.diff_commonOverlap_(T,b),M=this.diff_commonOverlap_(b,T);y>=M?(y>=T.length/2||y>=b.length/2)&&(e.splice(o,0,new f.Diff(E,b.substring(0,y))),e[o-1][1]=T.substring(0,T.length-y),e[o+1][1]=b.substring(y),o++):(M>=T.length/2||M>=b.length/2)&&(e.splice(o,0,new f.Diff(E,T.substring(0,M))),e[o-1][0]=c,e[o-1][1]=b.substring(0,b.length-M),e[o+1][0]=n,e[o+1][1]=T.substring(M),o++),o++}o++}},f.prototype.diff_cleanupSemanticLossless=function(e){function a(M,P){if(!M||!P)return 6;var R=M.charAt(M.length-1),S=P.charAt(0),t=R.match(f.nonAlphaNumericRegex_),s=S.match(f.nonAlphaNumericRegex_),r=t&&R.match(f.whitespaceRegex_),l=s&&S.match(f.whitespaceRegex_),h=r&&R.match(f.linebreakRegex_),v=l&&S.match(f.linebreakRegex_),x=h&&M.match(f.blanklineEndRegex_),$=v&&P.match(f.blanklineStartRegex_);return x||$?5:h||v?4:t&&!r&&l?3:r||l?2:t||s?1:0}for(var u=1;u<e.length-1;){if(e[u-1][0]==E&&e[u+1][0]==E){var g=e[u-1][1],p=e[u][1],o=e[u+1][1],i=this.diff_commonSuffix(g,p);if(i){var d=p.substring(p.length-i);g=g.substring(0,g.length-i),p=d+p.substring(0,p.length-i),o=d+o}for(var m=g,_=p,T=o,b=a(g,p)+a(p,o);p.charAt(0)===o.charAt(0);){g+=p.charAt(0),p=p.substring(1)+o.charAt(0),o=o.substring(1);var y=a(g,p)+a(p,o);y>=b&&(b=y,m=g,_=p,T=o)}e[u-1][1]!=m&&(m?e[u-1][1]=m:(e.splice(u-1,1),u--),e[u][1]=_,T?e[u+1][1]=T:(e.splice(u+1,1),u--))}u++}},f.nonAlphaNumericRegex_=/[^a-zA-Z0-9]/,f.whitespaceRegex_=/\s/,f.linebreakRegex_=/[\r\n]/,f.blanklineEndRegex_=/\n\r?\n$/,f.blanklineStartRegex_=/^\r?\n\r?\n/,f.prototype.diff_cleanupEfficiency=function(e){for(var a=!1,u=[],g=0,p=null,o=0,i=!1,d=!1,m=!1,_=!1;o<e.length;)e[o][0]==E?(e[o][1].length<this.Diff_EditCost&&(m||_)?(u[g++]=o,i=m,d=_,p=e[o][1]):(g=0,p=null),m=_=!1):(e[o][0]==n?_=!0:m=!0,p&&(i&&d&&m&&_||p.length<this.Diff_EditCost/2&&i+d+m+_==3)&&(e.splice(u[g-1],0,new f.Diff(n,p)),e[u[g-1]+1][0]=c,g--,p=null,i&&d?(m=_=!0,g=0):(g--,o=g>0?u[g-1]:-1,m=_=!1),a=!0)),o++;a&&this.diff_cleanupMerge(e)},f.prototype.diff_cleanupMerge=function(e){e.push(new f.Diff(E,""));for(var a=0,u=0,g=0,p="",o="",i;a<e.length;)switch(e[a][0]){case c:g++,o+=e[a][1],a++;break;case n:u++,p+=e[a][1],a++;break;case E:u+g>1?(u!==0&&g!==0&&(i=this.diff_commonPrefix(o,p),i!==0&&(a-u-g>0&&e[a-u-g-1][0]==E?e[a-u-g-1][1]+=o.substring(0,i):(e.splice(0,0,new f.Diff(E,o.substring(0,i))),a++),o=o.substring(i),p=p.substring(i)),i=this.diff_commonSuffix(o,p),i!==0&&(e[a][1]=o.substring(o.length-i)+e[a][1],o=o.substring(0,o.length-i),p=p.substring(0,p.length-i))),a-=u+g,e.splice(a,u+g),p.length&&(e.splice(a,0,new f.Diff(n,p)),a++),o.length&&(e.splice(a,0,new f.Diff(c,o)),a++),a++):a!==0&&e[a-1][0]==E?(e[a-1][1]+=e[a][1],e.splice(a,1)):a++,g=0,u=0,p="",o="";break}e[e.length-1][1]===""&&e.pop();var d=!1;for(a=1;a<e.length-1;)e[a-1][0]==E&&e[a+1][0]==E&&(e[a][1].substring(e[a][1].length-e[a-1][1].length)==e[a-1][1]?(e[a][1]=e[a-1][1]+e[a][1].substring(0,e[a][1].length-e[a-1][1].length),e[a+1][1]=e[a-1][1]+e[a+1][1],e.splice(a-1,1),d=!0):e[a][1].substring(0,e[a+1][1].length)==e[a+1][1]&&(e[a-1][1]+=e[a+1][1],e[a][1]=e[a][1].substring(e[a+1][1].length)+e[a+1][1],e.splice(a+1,1),d=!0)),a++;d&&this.diff_cleanupMerge(e)},f.prototype.diff_xIndex=function(e,a){var u=0,g=0,p=0,o=0,i;for(i=0;i<e.length&&(e[i][0]!==c&&(u+=e[i][1].length),e[i][0]!==n&&(g+=e[i][1].length),!(u>a));i++)p=u,o=g;return e.length!=i&&e[i][0]===n?o:o+(a-p)},f.prototype.diff_prettyHtml=function(e){for(var a=[],u=/&/g,g=/</g,p=/>/g,o=/\n/g,i=0;i<e.length;i++){var d=e[i][0],m=e[i][1],_=m.replace(u,"&amp;").replace(g,"&lt;").replace(p,"&gt;").replace(o,"&para;<br>");switch(d){case c:a[i]='<ins style="background:#e6ffe6;">'+_+"</ins>";break;case n:a[i]='<del style="background:#ffe6e6;">'+_+"</del>";break;case E:a[i]="<span>"+_+"</span>";break}}return a.join("")},f.prototype.diff_text1=function(e){for(var a=[],u=0;u<e.length;u++)e[u][0]!==c&&(a[u]=e[u][1]);return a.join("")},f.prototype.diff_text2=function(e){for(var a=[],u=0;u<e.length;u++)e[u][0]!==n&&(a[u]=e[u][1]);return a.join("")},f.prototype.diff_levenshtein=function(e){for(var a=0,u=0,g=0,p=0;p<e.length;p++){var o=e[p][0],i=e[p][1];switch(o){case c:u+=i.length;break;case n:g+=i.length;break;case E:a+=Math.max(u,g),u=0,g=0;break}}return a+=Math.max(u,g),a},f.prototype.diff_toDelta=function(e){for(var a=[],u=0;u<e.length;u++)switch(e[u][0]){case c:a[u]="+"+encodeURI(e[u][1]);break;case n:a[u]="-"+e[u][1].length;break;case E:a[u]="="+e[u][1].length;break}return a.join("	").replace(/%20/g," ")},f.prototype.diff_fromDelta=function(e,a){for(var u=[],g=0,p=0,o=a.split(/\t/g),i=0;i<o.length;i++){var d=o[i].substring(1);switch(o[i].charAt(0)){case"+":try{u[g++]=new f.Diff(c,decodeURI(d))}catch(T){throw new Error("Illegal escape in diff_fromDelta: "+d)}break;case"-":case"=":var m=parseInt(d,10);if(isNaN(m)||m<0)throw new Error("Invalid number in diff_fromDelta: "+d);var _=e.substring(p,p+=m);o[i].charAt(0)=="="?u[g++]=new f.Diff(E,_):u[g++]=new f.Diff(n,_);break;default:if(o[i])throw new Error("Invalid diff operation in diff_fromDelta: "+o[i])}}if(p!=e.length)throw new Error("Delta length ("+p+") does not equal source text length ("+e.length+").");return u},f.prototype.match_main=function(e,a,u){if(e==null||a==null||u==null)throw new Error("Null input. (match_main)");return u=Math.max(0,Math.min(u,e.length)),e==a?0:e.length?e.substring(u,u+a.length)==a?u:this.match_bitap_(e,a,u):-1},f.prototype.match_bitap_=function(e,a,u){if(a.length>this.Match_MaxBits)throw new Error("Pattern too long for this browser.");var g=this.match_alphabet_(a),p=this;function o(l,h){var v=l/a.length,x=Math.abs(u-h);return p.Match_Distance?v+x/p.Match_Distance:x?1:v}var i=this.Match_Threshold,d=e.indexOf(a,u);d!=-1&&(i=Math.min(o(0,d),i),d=e.lastIndexOf(a,u+a.length),d!=-1&&(i=Math.min(o(0,d),i)));var m=1<<a.length-1;d=-1;for(var _,T,b=a.length+e.length,y,M=0;M<a.length;M++){for(_=0,T=b;_<T;)o(M,u+T)<=i?_=T:b=T,T=Math.floor((b-_)/2+_);b=T;var P=Math.max(1,u-T+1),R=Math.min(u+T,e.length)+a.length,S=Array(R+2);S[R+1]=(1<<M)-1;for(var t=R;t>=P;t--){var s=g[e.charAt(t-1)];if(M===0?S[t]=(S[t+1]<<1|1)&s:S[t]=(S[t+1]<<1|1)&s|((y[t+1]|y[t])<<1|1)|y[t+1],S[t]&m){var r=o(M,t-1);if(r<=i)if(i=r,d=t-1,d>u)P=Math.max(1,2*u-d);else break}}if(o(M+1,u)>i)break;y=S}return d},f.prototype.match_alphabet_=function(e){for(var a={},u=0;u<e.length;u++)a[e.charAt(u)]=0;for(var u=0;u<e.length;u++)a[e.charAt(u)]|=1<<e.length-u-1;return a},f.prototype.patch_addContext_=function(e,a){if(a.length!=0){if(e.start2===null)throw Error("patch not initialized");for(var u=a.substring(e.start2,e.start2+e.length1),g=0;a.indexOf(u)!=a.lastIndexOf(u)&&u.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin;)g+=this.Patch_Margin,u=a.substring(e.start2-g,e.start2+e.length1+g);g+=this.Patch_Margin;var p=a.substring(e.start2-g,e.start2);p&&e.diffs.unshift(new f.Diff(E,p));var o=a.substring(e.start2+e.length1,e.start2+e.length1+g);o&&e.diffs.push(new f.Diff(E,o)),e.start1-=p.length,e.start2-=p.length,e.length1+=p.length+o.length,e.length2+=p.length+o.length}},f.prototype.patch_make=function(e,a,u){var g,p;if(typeof e=="string"&&typeof a=="string"&&typeof u=="undefined")g=e,p=this.diff_main(g,a,!0),p.length>2&&(this.diff_cleanupSemantic(p),this.diff_cleanupEfficiency(p));else if(e&&typeof e=="object"&&typeof a=="undefined"&&typeof u=="undefined")p=e,g=this.diff_text1(p);else if(typeof e=="string"&&a&&typeof a=="object"&&typeof u=="undefined")g=e,p=a;else if(typeof e=="string"&&typeof a=="string"&&u&&typeof u=="object")g=e,p=u;else throw new Error("Unknown call format to patch_make.");if(p.length===0)return[];for(var o=[],i=new f.patch_obj,d=0,m=0,_=0,T=g,b=g,y=0;y<p.length;y++){var M=p[y][0],P=p[y][1];switch(!d&&M!==E&&(i.start1=m,i.start2=_),M){case c:i.diffs[d++]=p[y],i.length2+=P.length,b=b.substring(0,_)+P+b.substring(_);break;case n:i.length1+=P.length,i.diffs[d++]=p[y],b=b.substring(0,_)+b.substring(_+P.length);break;case E:P.length<=2*this.Patch_Margin&&d&&p.length!=y+1?(i.diffs[d++]=p[y],i.length1+=P.length,i.length2+=P.length):P.length>=2*this.Patch_Margin&&d&&(this.patch_addContext_(i,T),o.push(i),i=new f.patch_obj,d=0,T=b,m=_);break}M!==c&&(m+=P.length),M!==n&&(_+=P.length)}return d&&(this.patch_addContext_(i,T),o.push(i)),o},f.prototype.patch_deepCopy=function(e){for(var a=[],u=0;u<e.length;u++){var g=e[u],p=new f.patch_obj;p.diffs=[];for(var o=0;o<g.diffs.length;o++)p.diffs[o]=new f.Diff(g.diffs[o][0],g.diffs[o][1]);p.start1=g.start1,p.start2=g.start2,p.length1=g.length1,p.length2=g.length2,a[u]=p}return a},f.prototype.patch_apply=function(e,a){if(e.length==0)return[a,[]];e=this.patch_deepCopy(e);var u=this.patch_addPadding(e);a=u+a+u,this.patch_splitMax(e);for(var g=0,p=[],o=0;o<e.length;o++){var i=e[o].start2+g,d=this.diff_text1(e[o].diffs),m,_=-1;if(d.length>this.Match_MaxBits?(m=this.match_main(a,d.substring(0,this.Match_MaxBits),i),m!=-1&&(_=this.match_main(a,d.substring(d.length-this.Match_MaxBits),i+d.length-this.Match_MaxBits),(_==-1||m>=_)&&(m=-1))):m=this.match_main(a,d,i),m==-1)p[o]=!1,g-=e[o].length2-e[o].length1;else{p[o]=!0,g=m-i;var T;if(_==-1?T=a.substring(m,m+d.length):T=a.substring(m,_+this.Match_MaxBits),d==T)a=a.substring(0,m)+this.diff_text2(e[o].diffs)+a.substring(m+d.length);else{var b=this.diff_main(d,T,!1);if(d.length>this.Match_MaxBits&&this.diff_levenshtein(b)/d.length>this.Patch_DeleteThreshold)p[o]=!1;else{this.diff_cleanupSemanticLossless(b);for(var y=0,M,P=0;P<e[o].diffs.length;P++){var R=e[o].diffs[P];R[0]!==E&&(M=this.diff_xIndex(b,y)),R[0]===c?a=a.substring(0,m+M)+R[1]+a.substring(m+M):R[0]===n&&(a=a.substring(0,m+M)+a.substring(m+this.diff_xIndex(b,y+R[1].length))),R[0]!==n&&(y+=R[1].length)}}}}}return a=a.substring(u.length,a.length-u.length),[a,p]},f.prototype.patch_addPadding=function(e){for(var a=this.Patch_Margin,u="",g=1;g<=a;g++)u+=String.fromCharCode(g);for(var g=0;g<e.length;g++)e[g].start1+=a,e[g].start2+=a;var p=e[0],o=p.diffs;if(o.length==0||o[0][0]!=E)o.unshift(new f.Diff(E,u)),p.start1-=a,p.start2-=a,p.length1+=a,p.length2+=a;else if(a>o[0][1].length){var i=a-o[0][1].length;o[0][1]=u.substring(o[0][1].length)+o[0][1],p.start1-=i,p.start2-=i,p.length1+=i,p.length2+=i}if(p=e[e.length-1],o=p.diffs,o.length==0||o[o.length-1][0]!=E)o.push(new f.Diff(E,u)),p.length1+=a,p.length2+=a;else if(a>o[o.length-1][1].length){var i=a-o[o.length-1][1].length;o[o.length-1][1]+=u.substring(0,i),p.length1+=i,p.length2+=i}return u},f.prototype.patch_splitMax=function(e){for(var a=this.Match_MaxBits,u=0;u<e.length;u++)if(!(e[u].length1<=a)){var g=e[u];e.splice(u--,1);for(var p=g.start1,o=g.start2,i="";g.diffs.length!==0;){var d=new f.patch_obj,m=!0;for(d.start1=p-i.length,d.start2=o-i.length,i!==""&&(d.length1=d.length2=i.length,d.diffs.push(new f.Diff(E,i)));g.diffs.length!==0&&d.length1<a-this.Patch_Margin;){var _=g.diffs[0][0],T=g.diffs[0][1];_===c?(d.length2+=T.length,o+=T.length,d.diffs.push(g.diffs.shift()),m=!1):_===n&&d.diffs.length==1&&d.diffs[0][0]==E&&T.length>2*a?(d.length1+=T.length,p+=T.length,m=!1,d.diffs.push(new f.Diff(_,T)),g.diffs.shift()):(T=T.substring(0,a-d.length1-this.Patch_Margin),d.length1+=T.length,p+=T.length,_===E?(d.length2+=T.length,o+=T.length):m=!1,d.diffs.push(new f.Diff(_,T)),T==g.diffs[0][1]?g.diffs.shift():g.diffs[0][1]=g.diffs[0][1].substring(T.length))}i=this.diff_text2(d.diffs),i=i.substring(i.length-this.Patch_Margin);var b=this.diff_text1(g.diffs).substring(0,this.Patch_Margin);b!==""&&(d.length1+=b.length,d.length2+=b.length,d.diffs.length!==0&&d.diffs[d.diffs.length-1][0]===E?d.diffs[d.diffs.length-1][1]+=b:d.diffs.push(new f.Diff(E,b))),m||e.splice(++u,0,d)}}},f.prototype.patch_toText=function(e){for(var a=[],u=0;u<e.length;u++)a[u]=e[u];return a.join("")},f.prototype.patch_fromText=function(e){var a=[];if(!e)return a;for(var u=e.split(`
`),g=0,p=/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;g<u.length;){var o=u[g].match(p);if(!o)throw new Error("Invalid patch string: "+u[g]);var i=new f.patch_obj;for(a.push(i),i.start1=parseInt(o[1],10),o[2]===""?(i.start1--,i.length1=1):o[2]=="0"?i.length1=0:(i.start1--,i.length1=parseInt(o[2],10)),i.start2=parseInt(o[3],10),o[4]===""?(i.start2--,i.length2=1):o[4]=="0"?i.length2=0:(i.start2--,i.length2=parseInt(o[4],10)),g++;g<u.length;){var d=u[g].charAt(0);try{var m=decodeURI(u[g].substring(1))}catch(_){throw new Error("Illegal escape in patch_fromText: "+m)}if(d=="-")i.diffs.push(new f.Diff(n,m));else if(d=="+")i.diffs.push(new f.Diff(c,m));else if(d==" ")i.diffs.push(new f.Diff(E,m));else{if(d=="@")break;if(d!=="")throw new Error('Invalid patch mode "'+d+'" in: '+m)}g++}}return a},f.patch_obj=function(){this.diffs=[],this.start1=null,this.start2=null,this.length1=0,this.length2=0},f.patch_obj.prototype.toString=function(){var e,a;this.length1===0?e=this.start1+",0":this.length1==1?e=this.start1+1:e=this.start1+1+","+this.length1,this.length2===0?a=this.start2+",0":this.length2==1?a=this.start2+1:a=this.start2+1+","+this.length2;for(var u=["@@ -"+e+" +"+a+` @@
`],g,p=0;p<this.diffs.length;p++){switch(this.diffs[p][0]){case c:g="+";break;case n:g="-";break;case E:g=" ";break}u[p+1]=g+encodeURI(this.diffs[p][1])+`
`}return u.join("").replace(/%20/g," ")},k.exports=f,k.exports.diff_match_patch=f,k.exports.DIFF_DELETE=n,k.exports.DIFF_INSERT=c,k.exports.DIFF_EQUAL=E})(_n);var ko=_n.exports,$o=ie&&ie.__extends||function(){var k=function(f,n){return k=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(c,E){c.__proto__=E}||function(c,E){for(var e in E)Object.prototype.hasOwnProperty.call(E,e)&&(c[e]=E[e])},k(f,n)};return function(f,n){if(typeof n!="function"&&n!==null)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");k(f,n);function c(){this.constructor=f}f.prototype=n===null?Object.create(n):(c.prototype=n.prototype,new c)}}();Object.defineProperty(St,"__esModule",{value:!0});var J=kt,ln=he,So=ot,Co=ko,To=function(k){$o(f,k);function f(n){var c=k.call(this,n)||this;return c.state={value:c.props.value},c.onChange=c.onChange.bind(c),c.diff=c.diff.bind(c),c}return f.prototype.componentDidUpdate=function(){var n=this.props.value;n!==this.state.value&&this.setState({value:n})},f.prototype.onChange=function(n){this.setState({value:n}),this.props.onChange&&this.props.onChange(n)},f.prototype.diff=function(){var n=new Co,c=this.state.value[0],E=this.state.value[1];if(c.length===0&&E.length===0)return[];var e=n.diff_main(c,E);n.diff_cleanupSemantic(e);var a=this.generateDiffedLines(e),u=this.setCodeMarkers(a);return u},f.prototype.generateDiffedLines=function(n){var c={DIFF_EQUAL:0,DIFF_DELETE:-1,DIFF_INSERT:1},E={left:[],right:[]},e={left:1,right:1};return n.forEach(function(a){var u=a[0],g=a[1],p=g.split(`
`).length-1;if(g.length!==0){var o=g[0],i=g[g.length-1],d=0;switch(u){case c.DIFF_EQUAL:e.left+=p,e.right+=p;break;case c.DIFF_DELETE:o===`
`&&(e.left++,p--),d=p,d===0&&E.right.push({startLine:e.right,endLine:e.right}),i===`
`&&(d-=1),E.left.push({startLine:e.left,endLine:e.left+d}),e.left+=p;break;case c.DIFF_INSERT:o===`
`&&(e.right++,p--),d=p,d===0&&E.left.push({startLine:e.left,endLine:e.left}),i===`
`&&(d-=1),E.right.push({startLine:e.right,endLine:e.right+d}),e.right+=p;break;default:throw new Error("Diff type was not defined.")}}}),E},f.prototype.setCodeMarkers=function(n){n===void 0&&(n={left:[],right:[]});for(var c=[],E={left:[],right:[]},e=0;e<n.left.length;e++){var a={startRow:n.left[e].startLine-1,endRow:n.left[e].endLine,type:"text",className:"codeMarker"};E.left.push(a)}for(var e=0;e<n.right.length;e++){var a={startRow:n.right[e].startLine-1,endRow:n.right[e].endLine,type:"text",className:"codeMarker"};E.right.push(a)}return c[0]=E.left,c[1]=E.right,c},f.prototype.render=function(){var n=this.diff();return ln.createElement(So.default,{name:this.props.name,className:this.props.className,focus:this.props.focus,orientation:this.props.orientation,splits:this.props.splits,mode:this.props.mode,theme:this.props.theme,height:this.props.height,width:this.props.width,fontSize:this.props.fontSize,showGutter:this.props.showGutter,onChange:this.onChange,onPaste:this.props.onPaste,onLoad:this.props.onLoad,onScroll:this.props.onScroll,minLines:this.props.minLines,maxLines:this.props.maxLines,readOnly:this.props.readOnly,highlightActiveLine:this.props.highlightActiveLine,showPrintMargin:this.props.showPrintMargin,tabSize:this.props.tabSize,cursorStart:this.props.cursorStart,editorProps:this.props.editorProps,style:this.props.style,scrollMargin:this.props.scrollMargin,setOptions:this.props.setOptions,wrapEnabled:this.props.wrapEnabled,enableBasicAutocompletion:this.props.enableBasicAutocompletion,enableLiveAutocompletion:this.props.enableLiveAutocompletion,value:this.state.value,markers:n})},f.propTypes={cursorStart:J.number,editorProps:J.object,enableBasicAutocompletion:J.bool,enableLiveAutocompletion:J.bool,focus:J.bool,fontSize:J.number,height:J.string,highlightActiveLine:J.bool,maxLines:J.number,minLines:J.number,mode:J.string,name:J.string,className:J.string,onLoad:J.func,onPaste:J.func,onScroll:J.func,onChange:J.func,orientation:J.string,readOnly:J.bool,scrollMargin:J.array,setOptions:J.object,showGutter:J.bool,showPrintMargin:J.bool,splits:J.number,style:J.object,tabSize:J.number,theme:J.string,value:J.array,width:J.string,wrapEnabled:J.bool},f.defaultProps={cursorStart:1,editorProps:{},enableBasicAutocompletion:!1,enableLiveAutocompletion:!1,focus:!1,fontSize:12,height:"500px",highlightActiveLine:!0,maxLines:null,minLines:null,mode:"",name:"ace-editor",onLoad:null,onScroll:null,onPaste:null,onChange:null,orientation:"beside",readOnly:!1,scrollMargin:[0,0,0,0],setOptions:{},showGutter:!0,showPrintMargin:!0,splits:2,style:{},tabSize:4,theme:"github",value:["",""],width:"500px",wrapEnabled:!0},f}(ln.Component);St.default=To;Object.defineProperty(De,"__esModule",{value:!0});De.diff=De.split=void 0;var Eo=$t,Ao=St;De.diff=Ao.default;var Mo=ot;De.split=Mo.default;var cn=De.default=Eo.default;const Ro=Dr(Br),Oo=k=>k.lbl||k.adminLbl||k.txt,kn=()=>Object.entries(Ro).map(([k,f])=>({lbl:Oo(f)||k,val:`${k}`})),Lo=()=>ti.map(({name:k,label:f})=>({lbl:f,val:`bfVars["${k}"]`})),Io=k=>`/* On Field ${pn(k)}*/
document.querySelector(\`#form-\${bfContentId}\`).querySelector(\`#fieldKey-\${bfSlNo}\`).addEventListener('${k}', event => {
  /* Write your code here*/
})`,le=k=>({lbl:`On ${pn(k)}`,val:Io(k)}),Po=[{type:"group-opts",name:"Global Variables",childs:[{lbl:"Form ID",val:"bf_globals[bfContentId].formId"},...Lo()]},{type:"group-opts",name:"Field Keys",childs:[...kn()]},{type:"group-opts",name:"Form Events",childs:[{lbl:"On Form Submit Success",val:"/* On Form Submit Success */\ndocument.querySelector(`#form-${bfContentId}`).addEventListener('bf-form-submit-success', ({detail:{formId, entryId, formData}}) => {\n	/* Write your code here... */\n})"},{lbl:"On Form Submit Error",val:"/* On Form Submit Error */\ndocument.querySelector(`#form-${bfContentId}`).addEventListener('bf-form-submit-error', ({detail:{formId, errors}}) => {\n	/* Write your code here... */\n})"},{lbl:"On Form Reset",val:"/* On Form Reset */\ndocument.querySelector(`#form-${bfContentId}`).addEventListener('bf-form-reset', ({detail:{formId}}) => {\n	/* Write your code here... */\n})"},{lbl:"On Form Validation Error",val:"/* On Form Validation Error */\ndocument.querySelector(`#form-${bfContentId}`).addEventListener('bf-form-validation-error', ({detail:{formId, fieldId, error}}) => {\n	/* Write your code here... */\n})"}]},{type:"group-title",name:"Field Events"},{type:"group-accordion",name:"Text Field",childs:[le("change"),le("input"),le("blur"),le("focus")]},{type:"group-accordion",name:"Textarea Field",childs:[le("change"),le("input"),le("blur"),le("focus")]},{type:"group-accordion",name:"Email Field",childs:[le("change"),le("input"),le("blur"),le("focus")]},{type:"group-accordion",name:"Checkbox",childs:[le("change")]},{type:"group-accordion",name:"Select",childs:[le("change")]},{type:"group-accordion",name:"Button",childs:[le("click")]},{type:"group-opts",name:"Filter Functions",childs:[{lbl:"Filter Logic status",val:`function bf_modify_workflow_logic_status(logicStatus, logics, fieldValues, rowIndex, condIndx, props) {
	/* write your code here */ 
	return logicStatus
}`},{lbl:"Filter Razorpay Notes",val:`function bf_modify_razorpay_notes(notes) {
	 /* write your code here */ 
	return notes
}`}]}],Fo=[{type:"group-opts",name:"Field Keys",childs:[...kn()]}],No=k=>{let f=0;return k.reduce((n,c)=>(c.type?(n.push(c),f=0):(f||(n.push({type:"no-group",childs:[]}),f=1),n[n.length-1].childs.push(c)),n),[])};function zo({options:k,action:f}){var p;const{css:n}=hn(),c=No(k),[E,e]=he.useState(c);he.useEffect(()=>{e(c)},[k]);const a=o=>{const i=o.target.value.toLowerCase().trim();if(!i)return e(c);const m=qr(c).reduce((_,T)=>(T.type!=="group-title"&&(_.push(T),T.childs&&(_[_.length-1].childs=T.childs.filter(b=>b.lbl.toLowerCase().includes(i)),_[_.length-1].childs.length===0&&_.pop())),_),[]);e(m)},u=()=>{g.current.value="",e(c)},g=he.useRef(null);return W.jsxs("div",{className:n(ce.main),children:[W.jsxs("div",{className:n(ce.fields_search),children:[W.jsx("input",{ref:g,title:"Search Field","aria-label":"Search Field",autoComplete:"off","data-testid":"tlbr-srch-inp",placeholder:"Search...",id:"search-icon",type:"search",name:"searchIcn",onChange:a,className:n(ce.search_field)}),((p=g==null?void 0:g.current)==null?void 0:p.value)&&W.jsx("span",{title:"clear",className:n(ce.clear_icn),role:"button",tabIndex:"-1",onClick:u,onKeyDown:u,children:" "}),W.jsx("span",{title:"search",className:n(ce.search_icn),children:W.jsx(jr,{size:"20"})})]}),W.jsx(Hr,{style:{height:"92%"},autoHide:!0,children:W.jsx("div",{className:n(ce.groupList),children:E.map(o=>W.jsxs(he.Fragment,{children:[o.type==="group-accordion"&&W.jsx(ni,{title:o.name,children:W.jsx("ul",{className:n(ce.ul),children:"childs"in o&&o.childs.map(i=>W.jsx("li",{className:n(ce.li),children:W.jsx("button",{type:"button",className:`${n(ce.button)} btnHover`,title:i.lbl,onClick:()=>f(i.val),children:i.lbl})},`childs-${i.val}`))})},`group-accordion-${o.name}`),o.type==="group-opts"&&W.jsxs("ul",{className:n(ce.ul),children:[o.type.match(/group-opts|group-title/)&&W.jsx("h4",{className:n(ce.title),children:o.name}),"childs"in o&&o.childs.map(i=>W.jsx("li",{className:n(ce.li),children:W.jsx("button",{type:"button",className:`${n(ce.button)} btnHover`,title:i.lbl,onClick:()=>f(i.val),children:i.lbl})},`group-child-${i.val}`))]}),o.type==="group-title"&&W.jsx("h4",{className:n(ce.title),children:o.name})]},`group-acc-${o.name}`))})})]})}const ce={main:{h:300,w:200,py:3,ow:"hidden"},title:{m:0,pt:7,pb:5,pn:"sticky",tp:0,bd:"#fff",zx:9},fields_search:{pn:"relative",tn:"width .2s"},search_field:{mx:2,w:"98%",oe:"none",b:"none !important",brs:"9px !important",pl:"27px !important",pr:"5px !important",bd:"var(--white-0-97) !important",":focus":{oe:"none",bs:"0px 0px 0px 1.5px var(--b-50) !important",pr:"0px !important","& ~ .shortcut":{dy:"none"},"& ~ span svg":{cr:"var(--b-50)"}},"::placeholder":{fs:12},"::-webkit-search-cancel-button":{appearance:"none"}},search_icn:{pn:"absolute",tp:"50%",mx:6,lt:0,tm:"translateY(-50%)",cr:"var(--white-0-50)",curp:1,"& svg":{dy:"block"}},clear_icn:{pn:"absolute",tp:"50%",mx:6,rt:0,tm:"translateY(-50%)",cr:"var(--white-0-50)",curp:1,w:14,h:14,bd:"var(--white-0-83)",brs:20,backgroundPosition:"54% 50% !important",bi:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='Black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'%3E%3C/line%3E%3Cline x1='6' y1='6' x2='18' y2='18'%3E%3C/line%3E%3C/svg%3E")`},groupList:{mt:10},ul:{mt:0,mb:10},li:{mb:0,mt:5,ml:5},button:{fw:"normal",brs:5,dy:"block",w:"100%",ta:"left",b:0,bd:"none",p:3,curp:1,"&:hover":{bd:"var(--white-0-95)",cr:"var(--black-0)"},fs:11}};function rs(){const{css:k}=hn(),{formType:f,formID:n}=Ur(),[c,E]=he.useState("JavaScript"),[e,a]=he.useState(localStorage.getItem("bf-editor-theme")||"tomorrow"),[u,g]=he.useState(localStorage.getItem("bf-enable-editor")||"on"),p=he.useRef({}),[o,i]=Wr(Kr),d=Vr(Xr),[m,_]=he.useState(Do),T=["JavaScript","CSS"],b=[{label:"Light Theme",value:"tomorrow"},{label:"Dark Theme",value:"twilight"}],y=l=>{l&&!(l in p.current)&&(p.current[c]=l)},M=l=>{i(h=>We(Oe({},h),{[c]:l}))},P=l=>{const h=p.current[c],{editor:v}=h;v.session.insert(v.getCursorPosition(),l);const x=v.getValue();i($=>We(Oe({},$),{[c]:x})),h.editor.renderer.scrollBarV.scrollTop!==h.editor.renderer.scrollBarV.maxScrollTop&&h.editor.gotoLine(h.editor.session.getLength()+1)},R=l=>{localStorage.setItem("bf-editor-theme",l),a(l)},S=l=>{const{checked:h}=l.target;h?(g("on"),localStorage.setItem("bf-enable-editor","on")):(g("off"),localStorage.setItem("bf-enable-editor","off"))},t=l=>{if(!bt){d(Oe({show:!0},Yr.customCode));return}if(f==="new"){Jr("#update-btn").click();return}const v=ft({form_id:n,customCodes:o},"bitforms_add_custom_code").then(x=>x);Zr.promise(v,{loading:mt("Updating..."),success:x=>{var $;return(($=x==null?void 0:x.data)==null?void 0:$.message)||(x==null?void 0:x.data)},error:mt("Error occurred, Please try again.")}),l.preventDefault()},s=()=>{if(c==="JavaScript")return Po;if(c==="CSS")return Fo},r={mode:c.toLowerCase(),theme:e,name:c,value:o[c]||"",onChange:l=>{M(l)},height:"330px",width:"100%",placeholder:"Write your code here...",setOptions:m,ref:y};return he.useEffect(()=>{f==="edit"&&!(o.JavaScript||o.CSS)?ft({form_id:n},"bitforms_get_custom_code").then(h=>{var v,x;return i({JavaScript:(v=h==null?void 0:h.data)==null?void 0:v.JavaScript,CSS:(x=h==null?void 0:h.data)==null?void 0:x.CSS,isFetched:!0}),h}):f==="new"&&ft({form_id:n,customCodes:o},"bitforms_add_custom_code").then(h=>h)},[]),W.jsxs("div",{children:[W.jsxs("div",{className:k({flx:"between"}),children:[W.jsx("div",{className:k(ye.w10,{flx:"center",my:2,ml:27}),children:W.jsx(ri,{width:300,options:T.map(l=>({label:l})),onChange:l=>E(l),defaultActive:"JavaScript",actionValue:c,wideTab:!0})}),W.jsx("div",{className:k(ye.flxc),children:W.jsxs(Qr,{place:"bottom-end",children:[W.jsx("button",{"data-testid":"titl-mor-opt-btn","data-close":!0,type:"button",className:k(Ve.btn),unselectable:"on",draggable:"false",style:{cursor:"pointer"},title:mt("Snippets"),children:W.jsx(ei,{size:"16"})}),W.jsx(zo,{options:s(),action:P})]})})]}),W.jsx(Zt,{open:c==="JavaScript",children:W.jsxs("div",{className:"pos-rel",children:[!bt&&W.jsx(Qt,{style:{left:0,width:"100%"}}),u==="on"?W.jsx(cn,We(Oe({},r),{onLoad:l=>{var h;(h=l==null?void 0:l.session)!=null&&h.$worker&&l.session.$worker.send("changeOptions",[{asi:!0}])}})):W.jsx("textarea",{className:k(Ve.editor,{h:330}),onChange:l=>M(l.target.value),value:o[c]||"",rows:"18"})]})}),W.jsx(Zt,{open:c==="CSS",children:W.jsxs("div",{className:"pos-rel",children:[!bt&&W.jsx(Qt,{style:{left:0,width:"100%"}}),u==="on"?W.jsx(cn,Oe({},r)):W.jsx("textarea",{className:k(Ve.editor,{h:330}),onChange:l=>M(l.target.value),value:o[c]||"",rows:"18"})]})}),W.jsxs("div",{className:k(ye.flxb,ye.mt1,ye.mb1,{jc:"between"}),children:[W.jsxs("div",{className:k(ye.flxc,ye.w10,Ve.editorBtn),children:[W.jsx(Jt,{className:k(ye.mr2),title:"Editor Mode",checked:u==="on",onChange:S}),u==="on"&&W.jsxs(W.Fragment,{children:[W.jsx(Gr,{onChange:R,value:e,options:b,size:"sm",className:k({w:150})}),W.jsx(Jt,{className:k(ye.ml4),title:"Word Wrap",checked:m.wrap,onChange:()=>_(l=>We(Oe({},l),{wrap:!l.wrap}))})]})]}),W.jsx("button",{onClick:t,type:"button",className:k(ye.btn,Ve.saveBtn),children:"Save"})]})]})}const Ve={editor:{w:"99%"},btn:{b:0,brs:5,curp:1,flx:"center-between"},theme:{dy:"flex",jc:"flex-end"},editorBtn:{fs:12,pr:5},saveBtn:{bc:"var(--b-50)",brs:8,fs:13,fw:800,px:15,py:8,cr:"var(--white-100)",":hover":{bd:"var(--b-36)"}}},Do={autoScrollEditorIntoView:!0,enableBasicAutocompletion:!0,enableLiveAutocompletion:!0,enableSnippets:!0,showLineNumbers:!0,tabSize:2,animatedScroll:!0,showFoldWidgets:!0,displayIndentGuides:!0,enableEmmet:!0,enableMultiselect:!0,highlightSelectedWord:!0,fontSize:15,useSoftTabs:!0,showPrintMargin:!0,showGutter:!0,highlightActiveLine:!0};export{rs as default};
