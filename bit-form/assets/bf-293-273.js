import{br as re,bo as ut,r as dt}from"./main-411.js";import{a as Xe}from"./bf-559-181.js";var fr={exports:{}};(function(M,b){ace.define("ace/mode/css_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(r,l,T){var e=r("../lib/oop");r("../lib/lang");var a=r("./text_highlight_rules").TextHighlightRules,h=l.supportType="align-content|align-items|align-self|all|animation|animation-delay|animation-direction|animation-duration|animation-fill-mode|animation-iteration-count|animation-name|animation-play-state|animation-timing-function|backface-visibility|background|background-attachment|background-blend-mode|background-clip|background-color|background-image|background-origin|background-position|background-repeat|background-size|border|border-bottom|border-bottom-color|border-bottom-left-radius|border-bottom-right-radius|border-bottom-style|border-bottom-width|border-collapse|border-color|border-image|border-image-outset|border-image-repeat|border-image-slice|border-image-source|border-image-width|border-left|border-left-color|border-left-style|border-left-width|border-radius|border-right|border-right-color|border-right-style|border-right-width|border-spacing|border-style|border-top|border-top-color|border-top-left-radius|border-top-right-radius|border-top-style|border-top-width|border-width|bottom|box-shadow|box-sizing|caption-side|clear|clip|color|column-count|column-fill|column-gap|column-rule|column-rule-color|column-rule-style|column-rule-width|column-span|column-width|columns|content|counter-increment|counter-reset|cursor|direction|display|empty-cells|filter|flex|flex-basis|flex-direction|flex-flow|flex-grow|flex-shrink|flex-wrap|float|font|font-family|font-size|font-size-adjust|font-stretch|font-style|font-variant|font-weight|hanging-punctuation|height|justify-content|left|letter-spacing|line-height|list-style|list-style-image|list-style-position|list-style-type|margin|margin-bottom|margin-left|margin-right|margin-top|max-height|max-width|max-zoom|min-height|min-width|min-zoom|nav-down|nav-index|nav-left|nav-right|nav-up|opacity|order|outline|outline-color|outline-offset|outline-style|outline-width|overflow|overflow-x|overflow-y|padding|padding-bottom|padding-left|padding-right|padding-top|page-break-after|page-break-before|page-break-inside|perspective|perspective-origin|position|quotes|resize|right|tab-size|table-layout|text-align|text-align-last|text-decoration|text-decoration-color|text-decoration-line|text-decoration-style|text-indent|text-justify|text-overflow|text-shadow|text-transform|top|transform|transform-origin|transform-style|transition|transition-delay|transition-duration|transition-property|transition-timing-function|unicode-bidi|user-select|user-zoom|vertical-align|visibility|white-space|width|word-break|word-spacing|word-wrap|z-index",g=l.supportFunction="rgb|rgba|url|attr|counter|counters",c=l.supportConstant="absolute|after-edge|after|all-scroll|all|alphabetic|always|antialiased|armenian|auto|avoid-column|avoid-page|avoid|balance|baseline|before-edge|before|below|bidi-override|block-line-height|block|bold|bolder|border-box|both|bottom|box|break-all|break-word|capitalize|caps-height|caption|center|central|char|circle|cjk-ideographic|clone|close-quote|col-resize|collapse|column|consider-shifts|contain|content-box|cover|crosshair|cubic-bezier|dashed|decimal-leading-zero|decimal|default|disabled|disc|disregard-shifts|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ease-in|ease-in-out|ease-out|ease|ellipsis|end|exclude-ruby|flex-end|flex-start|fill|fixed|georgian|glyphs|grid-height|groove|hand|hanging|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|icon|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|ideographic|inactive|include-ruby|inherit|initial|inline-block|inline-box|inline-line-height|inline-table|inline|inset|inside|inter-ideograph|inter-word|invert|italic|justify|katakana-iroha|katakana|keep-all|last|left|lighter|line-edge|line-through|line|linear|list-item|local|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|mathematical|max-height|max-size|medium|menu|message-box|middle|move|n-resize|ne-resize|newspaper|no-change|no-close-quote|no-drop|no-open-quote|no-repeat|none|normal|not-allowed|nowrap|nw-resize|oblique|open-quote|outset|outside|overline|padding-box|page|pointer|pre-line|pre-wrap|pre|preserve-3d|progress|relative|repeat-x|repeat-y|repeat|replaced|reset-size|ridge|right|round|row-resize|rtl|s-resize|scroll|se-resize|separate|slice|small-caps|small-caption|solid|space|square|start|static|status-bar|step-end|step-start|steps|stretch|strict|sub|super|sw-resize|table-caption|table-cell|table-column-group|table-column|table-footer-group|table-header-group|table-row-group|table-row|table|tb-rl|text-after-edge|text-before-edge|text-bottom|text-size|text-top|text|thick|thin|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|use-script|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|z-index|zero|zoom",s=l.supportConstantColor="aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen",o=l.supportConstantFonts="arial|century|comic|courier|cursive|fantasy|garamond|georgia|helvetica|impact|lucida|symbol|system|tahoma|times|trebuchet|utopia|verdana|webdings|sans-serif|serif|monospace",d=l.numRe="\\-?(?:(?:[0-9]+(?:\\.[0-9]+)?)|(?:\\.[0-9]+))",f=l.pseudoElements="(\\:+)\\b(after|before|first-letter|first-line|moz-selection|selection)\\b",S=l.pseudoClasses="(:)\\b(active|checked|disabled|empty|enabled|first-child|first-of-type|focus|hover|indeterminate|invalid|last-child|last-of-type|link|not|nth-child|nth-last-child|nth-last-of-type|nth-of-type|only-child|only-of-type|required|root|target|valid|visited)\\b",E=function(){var m=this.createKeywordMapper({"support.function":g,"support.constant":c,"support.type":h,"support.constant.color":s,"support.constant.fonts":o},"text",!0);this.$rules={start:[{include:["strings","url","comments"]},{token:"paren.lparen",regex:"\\{",next:"ruleset"},{token:"paren.rparen",regex:"\\}"},{token:"string",regex:"@(?!viewport)",next:"media"},{token:"keyword",regex:"#[a-z0-9-_]+"},{token:"keyword",regex:"%"},{token:"variable",regex:"\\.[a-z0-9-_]+"},{token:"string",regex:":[a-z0-9-_]+"},{token:"constant.numeric",regex:d},{token:"constant",regex:"[a-z0-9-_]+"},{caseInsensitive:!0}],media:[{include:["strings","url","comments"]},{token:"paren.lparen",regex:"\\{",next:"start"},{token:"paren.rparen",regex:"\\}",next:"start"},{token:"string",regex:";",next:"start"},{token:"keyword",regex:"(?:media|supports|document|charset|import|namespace|media|supports|document|page|font|keyframes|viewport|counter-style|font-feature-values|swash|ornaments|annotation|stylistic|styleset|character-variant)"}],comments:[{token:"comment",regex:"\\/\\*",push:[{token:"comment",regex:"\\*\\/",next:"pop"},{defaultToken:"comment"}]}],ruleset:[{regex:"-(webkit|ms|moz|o)-",token:"text"},{token:"punctuation.operator",regex:"[:;]"},{token:"paren.rparen",regex:"\\}",next:"start"},{include:["strings","url","comments"]},{token:["constant.numeric","keyword"],regex:"("+d+")(ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vmax|vmin|vm|vw|%)"},{token:"constant.numeric",regex:d},{token:"constant.numeric",regex:"#[a-f0-9]{6}"},{token:"constant.numeric",regex:"#[a-f0-9]{3}"},{token:["punctuation","entity.other.attribute-name.pseudo-element.css"],regex:f},{token:["punctuation","entity.other.attribute-name.pseudo-class.css"],regex:S},{include:"url"},{token:m,regex:"\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"},{token:"paren.lparen",regex:"\\{"},{caseInsensitive:!0}],url:[{token:"support.function",regex:"(?:url(:?-prefix)?|domain|regexp)\\(",push:[{token:"support.function",regex:"\\)",next:"pop"},{defaultToken:"string"}]}],strings:[{token:"string.start",regex:"'",push:[{token:"string.end",regex:"'|$",next:"pop"},{include:"escapes"},{token:"constant.language.escape",regex:/\\$/,consumeLineEnd:!0},{defaultToken:"string"}]},{token:"string.start",regex:'"',push:[{token:"string.end",regex:'"|$',next:"pop"},{include:"escapes"},{token:"constant.language.escape",regex:/\\$/,consumeLineEnd:!0},{defaultToken:"string"}]}],escapes:[{token:"constant.language.escape",regex:/\\([a-fA-F\d]{1,6}|[^a-fA-F\d])/}]},this.normalizeRules()};e.inherits(E,a),l.CssHighlightRules=E}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(r,l,T){var e=r("../range").Range,a=function(){};(function(){this.checkOutdent=function(h,g){return/^\s+$/.test(h)?/^\s*\}/.test(g):!1},this.autoOutdent=function(h,g){var c=h.getLine(g),s=c.match(/^(\s*\})/);if(!s)return 0;var o=s[1].length,d=h.findMatchingBracket({row:g,column:o});if(!d||d.row==g)return 0;var f=this.$getIndent(h.getLine(d.row));h.replace(new e(g,0,g,o-1),f)},this.$getIndent=function(h){return h.match(/^\s*/)[0]}}).call(a.prototype),l.MatchingBraceOutdent=a}),ace.define("ace/mode/css_completions",["require","exports","module"],function(r,l,T){var e={background:{"#$0":1},"background-color":{"#$0":1,transparent:1,fixed:1},"background-image":{"url('/$0')":1},"background-repeat":{repeat:1,"repeat-x":1,"repeat-y":1,"no-repeat":1,inherit:1},"background-position":{bottom:2,center:2,left:2,right:2,top:2,inherit:2},"background-attachment":{scroll:1,fixed:1},"background-size":{cover:1,contain:1},"background-clip":{"border-box":1,"padding-box":1,"content-box":1},"background-origin":{"border-box":1,"padding-box":1,"content-box":1},border:{"solid $0":1,"dashed $0":1,"dotted $0":1,"#$0":1},"border-color":{"#$0":1},"border-style":{solid:2,dashed:2,dotted:2,double:2,groove:2,hidden:2,inherit:2,inset:2,none:2,outset:2,ridged:2},"border-collapse":{collapse:1,separate:1},bottom:{px:1,em:1,"%":1},clear:{left:1,right:1,both:1,none:1},color:{"#$0":1,"rgb(#$00,0,0)":1},cursor:{default:1,pointer:1,move:1,text:1,wait:1,help:1,progress:1,"n-resize":1,"ne-resize":1,"e-resize":1,"se-resize":1,"s-resize":1,"sw-resize":1,"w-resize":1,"nw-resize":1},display:{none:1,block:1,inline:1,"inline-block":1,"table-cell":1},"empty-cells":{show:1,hide:1},float:{left:1,right:1,none:1},"font-family":{Arial:2,"Comic Sans MS":2,Consolas:2,"Courier New":2,Courier:2,Georgia:2,Monospace:2,"Sans-Serif":2,"Segoe UI":2,Tahoma:2,"Times New Roman":2,"Trebuchet MS":2,Verdana:1},"font-size":{px:1,em:1,"%":1},"font-weight":{bold:1,normal:1},"font-style":{italic:1,normal:1},"font-variant":{normal:1,"small-caps":1},height:{px:1,em:1,"%":1},left:{px:1,em:1,"%":1},"letter-spacing":{normal:1},"line-height":{normal:1},"list-style-type":{none:1,disc:1,circle:1,square:1,decimal:1,"decimal-leading-zero":1,"lower-roman":1,"upper-roman":1,"lower-greek":1,"lower-latin":1,"upper-latin":1,georgian:1,"lower-alpha":1,"upper-alpha":1},margin:{px:1,em:1,"%":1},"margin-right":{px:1,em:1,"%":1},"margin-left":{px:1,em:1,"%":1},"margin-top":{px:1,em:1,"%":1},"margin-bottom":{px:1,em:1,"%":1},"max-height":{px:1,em:1,"%":1},"max-width":{px:1,em:1,"%":1},"min-height":{px:1,em:1,"%":1},"min-width":{px:1,em:1,"%":1},overflow:{hidden:1,visible:1,auto:1,scroll:1},"overflow-x":{hidden:1,visible:1,auto:1,scroll:1},"overflow-y":{hidden:1,visible:1,auto:1,scroll:1},padding:{px:1,em:1,"%":1},"padding-top":{px:1,em:1,"%":1},"padding-right":{px:1,em:1,"%":1},"padding-bottom":{px:1,em:1,"%":1},"padding-left":{px:1,em:1,"%":1},"page-break-after":{auto:1,always:1,avoid:1,left:1,right:1},"page-break-before":{auto:1,always:1,avoid:1,left:1,right:1},position:{absolute:1,relative:1,fixed:1,static:1},right:{px:1,em:1,"%":1},"table-layout":{fixed:1,auto:1},"text-decoration":{none:1,underline:1,"line-through":1,blink:1},"text-align":{left:1,right:1,center:1,justify:1},"text-transform":{capitalize:1,uppercase:1,lowercase:1,none:1},top:{px:1,em:1,"%":1},"vertical-align":{top:1,bottom:1},visibility:{hidden:1,visible:1},"white-space":{nowrap:1,normal:1,pre:1,"pre-line":1,"pre-wrap":1},width:{px:1,em:1,"%":1},"word-spacing":{normal:1},filter:{"alpha(opacity=$0100)":1},"text-shadow":{"$02px 2px 2px #777":1},"text-overflow":{"ellipsis-word":1,clip:1,ellipsis:1},"-moz-border-radius":1,"-moz-border-radius-topright":1,"-moz-border-radius-bottomright":1,"-moz-border-radius-topleft":1,"-moz-border-radius-bottomleft":1,"-webkit-border-radius":1,"-webkit-border-top-right-radius":1,"-webkit-border-top-left-radius":1,"-webkit-border-bottom-right-radius":1,"-webkit-border-bottom-left-radius":1,"-moz-box-shadow":1,"-webkit-box-shadow":1,transform:{"rotate($00deg)":1,"skew($00deg)":1},"-moz-transform":{"rotate($00deg)":1,"skew($00deg)":1},"-webkit-transform":{"rotate($00deg)":1,"skew($00deg)":1}},a=function(){};(function(){this.completionsDefined=!1,this.defineCompletions=function(){if(document){var h=document.createElement("c").style;for(var g in h)if(typeof h[g]=="string"){var c=g.replace(/[A-Z]/g,function(s){return"-"+s.toLowerCase()});e.hasOwnProperty(c)||(e[c]=1)}}this.completionsDefined=!0},this.getCompletions=function(h,g,c,s){if(this.completionsDefined||this.defineCompletions(),h==="ruleset"||g.$mode.$id=="ace/mode/scss"){var o=g.getLine(c.row).substr(0,c.column),d=/\([^)]*$/.test(o);return d&&(o=o.substr(o.lastIndexOf("(")+1)),/:[^;]+$/.test(o)?this.getPropertyValueCompletions(h,g,c,s):this.getPropertyCompletions(h,g,c,s,d)}return[]},this.getPropertyCompletions=function(h,g,c,s,o){o=o||!1;var d=Object.keys(e);return d.map(function(f){return{caption:f,snippet:f+": $0"+(o?"":";"),meta:"property",score:1e6}})},this.getPropertyValueCompletions=function(h,g,c,s){var o=g.getLine(c.row).substr(0,c.column),d=(/([\w\-]+):[^:]*$/.exec(o)||{})[1];if(!d)return[];var f=[];return d in e&&typeof e[d]=="object"&&(f=Object.keys(e[d])),f.map(function(S){return{caption:S,snippet:S,meta:"property value",score:1e6}})}}).call(a.prototype),l.CssCompletions=a}),ace.define("ace/mode/behaviour/css",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/mode/behaviour/cstyle","ace/token_iterator"],function(r,l,T){var e=r("../../lib/oop");r("../behaviour").Behaviour;var a=r("./cstyle").CstyleBehaviour,h=r("../../token_iterator").TokenIterator,g=function(){this.inherit(a),this.add("colon","insertion",function(c,s,o,d,f){if(f===":"&&o.selection.isEmpty()){var S=o.getCursorPosition(),E=new h(d,S.row,S.column),m=E.getCurrentToken();if(m&&m.value.match(/\s+/)&&(m=E.stepBackward()),m&&m.type==="support.type"){var v=d.doc.getLine(S.row),A=v.substring(S.column,S.column+1);if(A===":")return{text:"",selection:[1,1]};if(/^(\s+[^;]|\s*$)/.test(v.substring(S.column)))return{text:":;",selection:[1,1]}}}}),this.add("colon","deletion",function(c,s,o,d,f){var S=d.doc.getTextRange(f);if(!f.isMultiLine()&&S===":"){var E=o.getCursorPosition(),m=new h(d,E.row,E.column),v=m.getCurrentToken();if(v&&v.value.match(/\s+/)&&(v=m.stepBackward()),v&&v.type==="support.type"){var A=d.doc.getLine(f.start.row),P=A.substring(f.end.column,f.end.column+1);if(P===";")return f.end.column++,f}}}),this.add("semicolon","insertion",function(c,s,o,d,f){if(f===";"&&o.selection.isEmpty()){var S=o.getCursorPosition(),E=d.doc.getLine(S.row),m=E.substring(S.column,S.column+1);if(m===";")return{text:"",selection:[1,1]}}}),this.add("!important","insertion",function(c,s,o,d,f){if(f==="!"&&o.selection.isEmpty()){var S=o.getCursorPosition(),E=d.doc.getLine(S.row);if(/^\s*(;|}|$)/.test(E.substring(S.column)))return{text:"!important",selection:[10,10]}}})};e.inherits(g,a),l.CssBehaviour=g}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(r,l,T){var e=r("../../lib/oop"),a=r("../../range").Range,h=r("./fold_mode").FoldMode,g=l.FoldMode=function(c){c&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+c.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+c.end)))};e.inherits(g,h),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(c,s,o){var d=c.getLine(o);if(this.singleLineBlockCommentRe.test(d)&&!this.startRegionRe.test(d)&&!this.tripleStarBlockCommentRe.test(d))return"";var f=this._getFoldWidgetBase(c,s,o);return!f&&this.startRegionRe.test(d)?"start":f},this.getFoldWidgetRange=function(c,s,o,d){var f=c.getLine(o);if(this.startRegionRe.test(f))return this.getCommentRegionBlock(c,f,o);var m=f.match(this.foldingStartMarker);if(m){var S=m.index;if(m[1])return this.openingBracketBlock(c,m[1],o,S);var E=c.getCommentFoldRange(o,S+m[0].length,1);return E&&!E.isMultiLine()&&(d?E=this.getSectionRange(c,o):s!="all"&&(E=null)),E}if(s!=="markbegin"){var m=f.match(this.foldingStopMarker);if(m){var S=m.index+m[0].length;return m[1]?this.closingBracketBlock(c,m[1],o,S):c.getCommentFoldRange(o,S,-1)}}},this.getSectionRange=function(c,s){var o=c.getLine(s),d=o.search(/\S/),f=s,S=o.length;s+=1;for(var E=s,m=c.getLength();++s<m;){o=c.getLine(s);var v=o.search(/\S/);if(v!==-1){if(d>v)break;var A=this.getFoldWidgetRange(c,"all",s);if(A){if(A.start.row<=f)break;if(A.isMultiLine())s=A.end.row;else if(d==v)break}E=s}}return new a(f,S,E,c.getLine(E).length)},this.getCommentRegionBlock=function(c,s,o){for(var d=s.search(/\s*$/),f=c.getLength(),S=o,E=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,m=1;++o<f;){s=c.getLine(o);var v=E.exec(s);if(v&&(v[1]?m--:m++,!m))break}var A=o;if(A>S)return new a(S,d,A,s.length)}}.call(g.prototype)}),ace.define("ace/mode/css",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/css_highlight_rules","ace/mode/matching_brace_outdent","ace/worker/worker_client","ace/mode/css_completions","ace/mode/behaviour/css","ace/mode/folding/cstyle"],function(r,l,T){var e=r("../lib/oop"),a=r("./text").Mode,h=r("./css_highlight_rules").CssHighlightRules,g=r("./matching_brace_outdent").MatchingBraceOutdent,c=r("../worker/worker_client").WorkerClient,s=r("./css_completions").CssCompletions,o=r("./behaviour/css").CssBehaviour,d=r("./folding/cstyle").FoldMode,f=function(){this.HighlightRules=h,this.$outdent=new g,this.$behaviour=new o,this.$completer=new s,this.foldingRules=new d};e.inherits(f,a),function(){this.foldingRules="cStyle",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(S,E,m){var v=this.$getIndent(E),A=this.getTokenizer().getLineTokens(E,S).tokens;if(A.length&&A[A.length-1].type=="comment")return v;var P=E.match(/^.*\{\s*$/);return P&&(v+=m),v},this.checkOutdent=function(S,E,m){return this.$outdent.checkOutdent(E,m)},this.autoOutdent=function(S,E,m){this.$outdent.autoOutdent(E,m)},this.getCompletions=function(S,E,m,v){return this.$completer.getCompletions(S,E,m,v)},this.createWorker=function(S){var E=new c(["ace"],"ace/mode/css_worker","Worker");return E.attachToDocument(S.getDocument()),E.on("annotate",function(m){S.setAnnotations(m.data)}),E.on("terminate",function(){S.clearAnnotations()}),E},this.$id="ace/mode/css",this.snippetFileId="ace/snippets/css"}.call(f.prototype),l.Mode=f}),function(){ace.require(["ace/mode/css"],function(r){M&&(M.exports=r)})}()})(fr);var mr={exports:{}};(function(M,b){ace.define("ace/mode/jsdoc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(r,l,T){var e=r("../lib/oop"),a=r("./text_highlight_rules").TextHighlightRules,h=function(){this.$rules={start:[{token:["comment.doc.tag","comment.doc.text","lparen.doc"],regex:"(@(?:param|member|typedef|property|namespace|var|const|callback))(\\s*)({)",push:[{token:"lparen.doc",regex:"{",push:[{include:"doc-syntax"},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"}]},{token:["rparen.doc","text.doc","variable.parameter.doc","lparen.doc","variable.parameter.doc","rparen.doc"],regex:/(})(\s*)(?:([\w=:\/\.]+)|(?:(\[)([\w=:\/\.\-\'\" ]+)(\])))/,next:"pop"},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"},{include:"doc-syntax"},{defaultToken:"text.doc"}]},{token:["comment.doc.tag","text.doc","lparen.doc"],regex:"(@(?:returns?|yields|type|this|suppress|public|protected|private|package|modifies|implements|external|exception|throws|enum|define|extends))(\\s*)({)",push:[{token:"lparen.doc",regex:"{",push:[{include:"doc-syntax"},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"}]},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"},{include:"doc-syntax"},{defaultToken:"text.doc"}]},{token:["comment.doc.tag","text.doc","variable.parameter.doc"],regex:'(@(?:alias|memberof|instance|module|name|lends|namespace|external|this|template|requires|param|implements|function|extends|typedef|mixes|constructor|var|memberof\\!|event|listens|exports|class|constructs|interface|emits|fires|throws|const|callback|borrows|augments))(\\s+)(\\w[\\w#.:/~"\\-]*)?'},{token:["comment.doc.tag","text.doc","variable.parameter.doc"],regex:"(@method)(\\s+)(\\w[\\w.\\(\\)]*)"},{token:"comment.doc.tag",regex:"@access\\s+(?:private|public|protected)"},{token:"comment.doc.tag",regex:"@kind\\s+(?:class|constant|event|external|file|function|member|mixin|module|namespace|typedef)"},{token:"comment.doc.tag",regex:"@\\w+(?=\\s|$)"},h.getTagRule(),{defaultToken:"comment.doc.body",caseInsensitive:!0}],"doc-syntax":[{token:"operator.doc",regex:/[|:]/},{token:"paren.doc",regex:/[\[\]]/}]},this.normalizeRules()};e.inherits(h,a),h.getTagRule=function(g){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},h.getStartRule=function(g){return{token:"comment.doc",regex:/\/\*\*(?!\/)/,next:g}},h.getEndRule=function(g){return{token:"comment.doc",regex:"\\*\\/",next:g}},l.JsDocCommentHighlightRules=h}),ace.define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/jsdoc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(r,l,T){function e(){var d=s.replace("\\d","\\d\\-"),f={onMatch:function(E,m,v){var A=E.charAt(1)=="/"?2:1;return A==1?(m!=this.nextState?v.unshift(this.next,this.nextState,0):v.unshift(this.next),v[2]++):A==2&&m==this.nextState&&(v[1]--,(!v[1]||v[1]<0)&&(v.shift(),v.shift())),[{type:"meta.tag.punctuation."+(A==1?"":"end-")+"tag-open.xml",value:E.slice(0,A)},{type:"meta.tag.tag-name.xml",value:E.substr(A)}]},regex:"</?(?:"+d+"|(?=>))",next:"jsxAttributes",nextState:"jsx"};this.$rules.start.unshift(f);var S={regex:"{",token:"paren.quasi.start",push:"start"};this.$rules.jsx=[S,f,{include:"reference"},{defaultToken:"string.xml"}],this.$rules.jsxAttributes=[{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",onMatch:function(E,m,v){return m==v[0]&&v.shift(),E.length==2&&(v[0]==this.nextState&&v[1]--,(!v[1]||v[1]<0)&&v.splice(0,2)),this.next=v[0]||"start",[{type:this.token,value:E}]},nextState:"jsx"},S,a("jsxAttributes"),{token:"entity.other.attribute-name.xml",regex:d},{token:"keyword.operator.attribute-equals.xml",regex:"="},{token:"text.tag-whitespace.xml",regex:"\\s+"},{token:"string.attribute-value.xml",regex:"'",stateName:"jsx_attr_q",push:[{token:"string.attribute-value.xml",regex:"'",next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},{token:"string.attribute-value.xml",regex:'"',stateName:"jsx_attr_qq",push:[{token:"string.attribute-value.xml",regex:'"',next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},f],this.$rules.reference=[{token:"constant.language.escape.reference.xml",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}]}function a(d){return[{token:"comment",regex:/\/\*/,next:[g.getTagRule(),{token:"comment",regex:"\\*\\/",next:d||"pop"},{defaultToken:"comment",caseInsensitive:!0}]},{token:"comment",regex:"\\/\\/",next:[g.getTagRule(),{token:"comment",regex:"$|^",next:d||"pop"},{defaultToken:"comment",caseInsensitive:!0}]}]}var h=r("../lib/oop"),g=r("./jsdoc_comment_highlight_rules").JsDocCommentHighlightRules,c=r("./text_highlight_rules").TextHighlightRules,s="[a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*",o=function(d){var f={"variable.language":"Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Symbol|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document",keyword:"const|yield|import|get|set|async|await|break|case|catch|continue|default|delete|do|else|finally|for|if|in|of|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static|constructor","storage.type":"const|let|var|function","constant.language":"null|Infinity|NaN|undefined","support.function":"alert","constant.language.boolean":"true|false"},S=this.createKeywordMapper(f,"identifier"),E="case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void",m="\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|u{[0-9a-fA-F]{1,6}}|[0-2][0-7]{0,2}|3[0-7][0-7]?|[4-7][0-7]?|.)",v="(function)(\\s*)(\\*?)",A={token:["identifier","text","paren.lparen"],regex:"(\\b(?!"+Object.values(f).join("|")+"\\b)"+s+")(\\s*)(\\()"};this.$rules={no_regex:[g.getStartRule("doc-start"),a("no_regex"),A,{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/},{token:"constant.numeric",regex:/(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/},{token:["entity.name.function","text","keyword.operator","text","storage.type","text","storage.type","text","paren.lparen"],regex:"("+s+")(\\s*)(=)(\\s*)"+v+"(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","storage.type","text","text","entity.name.function","text","paren.lparen"],regex:"(function)(?:(?:(\\s*)(\\*)(\\s*))|(\\s+))("+s+")(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","punctuation.operator","text","storage.type","text","storage.type","text","paren.lparen"],regex:"("+s+")(\\s*)(:)(\\s*)"+v+"(\\s*)(\\()",next:"function_arguments"},{token:["text","text","storage.type","text","storage.type","text","paren.lparen"],regex:"(:)(\\s*)"+v+"(\\s*)(\\()",next:"function_arguments"},{token:"keyword",regex:`from(?=\\s*('|"))`},{token:"keyword",regex:"(?:"+E+")\\b",next:"start"},{token:"support.constant",regex:/that\b/},{token:["storage.type","punctuation.operator","support.function.firebug"],regex:/(console)(\.)(warn|info|log|error|debug|time|trace|timeEnd|assert)\b/},{token:S,regex:s},{token:"punctuation.operator",regex:/[.](?![.])/,next:"property"},{token:"storage.type",regex:/=>/,next:"start"},{token:"keyword.operator",regex:/--|\+\+|\.{3}|===|==|=|!=|!==|<+=?|>+=?|!|&&|\|\||\?:|[!$%&*+\-~\/^]=?/,next:"start"},{token:"punctuation.operator",regex:/[?:,;.]/,next:"start"},{token:"paren.lparen",regex:/[\[({]/,next:"start"},{token:"paren.rparen",regex:/[\])}]/},{token:"comment",regex:/^#!.*$/}],property:[{token:"text",regex:"\\s+"},{token:"keyword.operator",regex:/=/},{token:["storage.type","text","storage.type","text","paren.lparen"],regex:v+"(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","storage.type","text","text","entity.name.function","text","paren.lparen"],regex:"(function)(?:(?:(\\s*)(\\*)(\\s*))|(\\s+))(\\w+)(\\s*)(\\()",next:"function_arguments"},{token:"punctuation.operator",regex:/[.](?![.])/},{token:"support.function",regex:"prototype"},{token:"support.function",regex:/(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|lter|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward|rEach)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/},{token:"support.function.dom",regex:/(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/},{token:"support.constant",regex:/(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/},{token:"identifier",regex:s},{regex:"",token:"empty",next:"no_regex"}],start:[g.getStartRule("doc-start"),a("start"),{token:"string.regexp",regex:"\\/",next:"regex"},{token:"text",regex:"\\s+|^$",next:"start"},{token:"empty",regex:"",next:"no_regex"}],regex:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp",regex:"/[sxngimy]*",next:"no_regex"},{token:"invalid",regex:/\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/},{token:"constant.language.escape",regex:/\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/},{token:"constant.language.delimiter",regex:/\|/},{token:"constant.language.escape",regex:/\[\^?/,next:"regex_character_class"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp"}],regex_character_class:[{token:"regexp.charclass.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"constant.language.escape",regex:"]",next:"regex"},{token:"constant.language.escape",regex:"-"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp.charachterclass"}],default_parameter:[{token:"string",regex:"'(?=.)",push:[{token:"string",regex:"'|$",next:"pop"},{include:"qstring"}]},{token:"string",regex:'"(?=.)',push:[{token:"string",regex:'"|$',next:"pop"},{include:"qqstring"}]},{token:"constant.language",regex:"null|Infinity|NaN|undefined"},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/},{token:"constant.numeric",regex:/(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/},{token:"punctuation.operator",regex:",",next:"function_arguments"},{token:"text",regex:"\\s+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],function_arguments:[a("function_arguments"),{token:"variable.parameter",regex:s},{token:"punctuation.operator",regex:","},{token:"text",regex:"\\s+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],qqstring:[{token:"constant.language.escape",regex:m},{token:"string",regex:"\\\\$",consumeLineEnd:!0},{token:"string",regex:'"|$',next:"no_regex"},{defaultToken:"string"}],qstring:[{token:"constant.language.escape",regex:m},{token:"string",regex:"\\\\$",consumeLineEnd:!0},{token:"string",regex:"'|$",next:"no_regex"},{defaultToken:"string"}]},(!d||!d.noES6)&&(this.$rules.no_regex.unshift({regex:"[{}]",onMatch:function(P,R,k){if(this.next=P=="{"?this.nextState:"",P=="{"&&k.length)k.unshift("start",R);else if(P=="}"&&k.length&&(k.shift(),this.next=k.shift(),this.next.indexOf("string")!=-1||this.next.indexOf("jsx")!=-1))return"paren.quasi.end";return P=="{"?"paren.lparen":"paren.rparen"},nextState:"start"},{token:"string.quasi.start",regex:/`/,push:[{token:"constant.language.escape",regex:m},{token:"paren.quasi.start",regex:/\${/,push:"start"},{token:"string.quasi.end",regex:/`/,next:"pop"},{defaultToken:"string.quasi"}]},{token:["variable.parameter","text"],regex:"("+s+")(\\s*)(?=\\=>)"},{token:"paren.lparen",regex:"(\\()(?=[^\\(]+\\s*=>)",next:"function_arguments"},{token:"variable.language",regex:"(?:(?:(?:Weak)?(?:Set|Map))|Promise)\\b"}),this.$rules.function_arguments.unshift({token:"keyword.operator",regex:"=",next:"default_parameter"},{token:"keyword.operator",regex:"\\.{3}"}),this.$rules.property.unshift({token:"support.function",regex:"(findIndex|repeat|startsWith|endsWith|includes|isSafeInteger|trunc|cbrt|log2|log10|sign|then|catch|finally|resolve|reject|race|any|all|allSettled|keys|entries|isInteger)\\b(?=\\()"},{token:"constant.language",regex:"(?:MAX_SAFE_INTEGER|MIN_SAFE_INTEGER|EPSILON)\\b"}),(!d||d.jsx!=0)&&e.call(this)),this.embedRules(g,"doc-",[g.getEndRule("no_regex")]),this.normalizeRules()};h.inherits(o,c),l.JavaScriptHighlightRules=o}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(r,l,T){var e=r("../range").Range,a=function(){};(function(){this.checkOutdent=function(h,g){return/^\s+$/.test(h)?/^\s*\}/.test(g):!1},this.autoOutdent=function(h,g){var c=h.getLine(g),s=c.match(/^(\s*\})/);if(!s)return 0;var o=s[1].length,d=h.findMatchingBracket({row:g,column:o});if(!d||d.row==g)return 0;var f=this.$getIndent(h.getLine(d.row));h.replace(new e(g,0,g,o-1),f)},this.$getIndent=function(h){return h.match(/^\s*/)[0]}}).call(a.prototype),l.MatchingBraceOutdent=a}),ace.define("ace/mode/behaviour/xml",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator"],function(r,l,T){function e(s,o){return s&&s.type.lastIndexOf(o+".xml")>-1}var a=r("../../lib/oop"),h=r("../behaviour").Behaviour,g=r("../../token_iterator").TokenIterator,c=function(){this.add("string_dquotes","insertion",function(s,o,d,f,S){if(S=='"'||S=="'"){var E=S,m=f.doc.getTextRange(d.getSelectionRange());if(m!==""&&m!=="'"&&m!='"'&&d.getWrapBehavioursEnabled())return{text:E+m+E,selection:!1};var v=d.getCursorPosition(),A=f.doc.getLine(v.row),P=A.substring(v.column,v.column+1),R=new g(f,v.row,v.column),k=R.getCurrentToken();if(P==E&&(e(k,"attribute-value")||e(k,"string")))return{text:"",selection:[1,1]};if(k||(k=R.stepBackward()),!k)return;for(;e(k,"tag-whitespace")||e(k,"whitespace");)k=R.stepBackward();var t=!P||P.match(/\s/);if(e(k,"attribute-equals")&&(t||P==">")||e(k,"decl-attribute-equals")&&(t||P=="?"))return{text:E+E,selection:[1,1]}}}),this.add("string_dquotes","deletion",function(s,o,d,f,S){var E=f.doc.getTextRange(S);if(!S.isMultiLine()&&(E=='"'||E=="'")){var m=f.doc.getLine(S.start.row),v=m.substring(S.start.column+1,S.start.column+2);if(v==E)return S.end.column++,S}}),this.add("autoclosing","insertion",function(s,o,d,f,S){if(S==">"){var E=d.getSelectionRange().start,m=new g(f,E.row,E.column),v=m.getCurrentToken()||m.stepBackward();if(!v||!(e(v,"tag-name")||e(v,"tag-whitespace")||e(v,"attribute-name")||e(v,"attribute-equals")||e(v,"attribute-value"))||e(v,"reference.attribute-value"))return;if(e(v,"attribute-value")){var A=m.getCurrentTokenColumn()+v.value.length;if(E.column<A)return;if(E.column==A){var P=m.stepForward();if(P&&e(P,"attribute-value"))return;m.stepBackward()}}if(/^\s*>/.test(f.getLine(E.row).slice(E.column)))return;for(;!e(v,"tag-name");)if(v=m.stepBackward(),v.value=="<"){v=m.stepForward();break}var R=m.getCurrentTokenRow(),k=m.getCurrentTokenColumn();if(e(m.stepBackward(),"end-tag-open"))return;var t=v.value;return R==E.row&&(t=t.substring(0,E.column-k)),this.voidElements&&this.voidElements.hasOwnProperty(t.toLowerCase())?void 0:{text:"></"+t+">",selection:[1,1]}}}),this.add("autoindent","insertion",function(s,o,d,f,S){if(S==`
`){var E=d.getCursorPosition(),m=f.getLine(E.row),v=new g(f,E.row,E.column),A=v.getCurrentToken();if(e(A,"")&&A.type.indexOf("tag-close")!==-1){if(A.value=="/>")return;for(;A&&A.type.indexOf("tag-name")===-1;)A=v.stepBackward();if(!A)return;var P=A.value,R=v.getCurrentTokenRow();if(A=v.stepBackward(),!A||A.type.indexOf("end-tag")!==-1)return;if(this.voidElements&&!this.voidElements[P]||!this.voidElements){var k=f.getTokenAt(E.row,E.column+1),m=f.getLine(R),t=this.$getIndent(m),i=t+f.getTabString();return k&&k.value==="</"?{text:`
`+i+`
`+t,selection:[1,i.length,1,i.length]}:{text:`
`+i}}}}})};a.inherits(c,h),l.XmlBehaviour=c}),ace.define("ace/mode/behaviour/javascript",["require","exports","module","ace/lib/oop","ace/token_iterator","ace/mode/behaviour/cstyle","ace/mode/behaviour/xml"],function(r,l,T){var e=r("../../lib/oop"),a=r("../../token_iterator").TokenIterator,h=r("../behaviour/cstyle").CstyleBehaviour,g=r("../behaviour/xml").XmlBehaviour,c=function(){var s=new g({closeCurlyBraces:!0}).getBehaviours();this.addBehaviours(s),this.inherit(h),this.add("autoclosing-fragment","insertion",function(o,d,f,S,E){if(E==">"){var m=f.getSelectionRange().start,v=new a(S,m.row,m.column),A=v.getCurrentToken()||v.stepBackward();if(!A)return;if(A.value=="<")return{text:"></>",selection:[1,1]}}})};e.inherits(c,h),l.JavaScriptBehaviour=c}),ace.define("ace/mode/folding/xml",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(r,l,T){function e(o,d){return o&&o.type&&o.type.lastIndexOf(d+".xml")>-1}var a=r("../../lib/oop"),h=r("../../range").Range,g=r("./fold_mode").FoldMode,c=l.FoldMode=function(o,d){g.call(this),this.voidElements=o||{},this.optionalEndTags=a.mixin({},this.voidElements),d&&a.mixin(this.optionalEndTags,d)};a.inherits(c,g);var s=function(){this.tagName="",this.closing=!1,this.selfClosing=!1,this.start={row:0,column:0},this.end={row:0,column:0}};(function(){this.getFoldWidget=function(o,d,f){var S=this._getFirstTagInLine(o,f);return S?S.closing||!S.tagName&&S.selfClosing?d==="markbeginend"?"end":"":!S.tagName||S.selfClosing||this.voidElements.hasOwnProperty(S.tagName.toLowerCase())||this._findEndTagInLine(o,f,S.tagName,S.end.column)?"":"start":this.getCommentFoldWidget(o,f)},this.getCommentFoldWidget=function(o,d){return/comment/.test(o.getState(d))&&/<!-/.test(o.getLine(d))?"start":""},this._getFirstTagInLine=function(o,d){for(var f=o.getTokens(d),S=new s,E=0;E<f.length;E++){var m=f[E];if(e(m,"tag-open")){if(S.end.column=S.start.column+m.value.length,S.closing=e(m,"end-tag-open"),m=f[++E],!m)return null;if(S.tagName=m.value,m.value===""){if(m=f[++E],!m)return null;S.tagName=m.value}for(S.end.column+=m.value.length,E++;E<f.length;E++)if(m=f[E],S.end.column+=m.value.length,e(m,"tag-close")){S.selfClosing=m.value=="/>";break}return S}if(e(m,"tag-close"))return S.selfClosing=m.value=="/>",S;S.start.column+=m.value.length}return null},this._findEndTagInLine=function(o,d,f,S){for(var E=o.getTokens(d),m=0,v=0;v<E.length;v++){var A=E[v];if(m+=A.value.length,!(m<S-1)&&e(A,"end-tag-open")&&(A=E[v+1],e(A,"tag-name")&&A.value===""&&(A=E[v+2]),A&&A.value==f))return!0}return!1},this.getFoldWidgetRange=function(o,d,f){var S=this._getFirstTagInLine(o,f);if(!S)return this.getCommentFoldWidget(o,f)&&o.getCommentFoldRange(f,o.getLine(f).length);var E=o.getMatchingTags({row:f,column:0});if(E)return new h(E.openTag.end.row,E.openTag.end.column,E.closeTag.start.row,E.closeTag.start.column)}}).call(c.prototype)}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(r,l,T){var e=r("../../lib/oop"),a=r("../../range").Range,h=r("./fold_mode").FoldMode,g=l.FoldMode=function(c){c&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+c.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+c.end)))};e.inherits(g,h),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(c,s,o){var d=c.getLine(o);if(this.singleLineBlockCommentRe.test(d)&&!this.startRegionRe.test(d)&&!this.tripleStarBlockCommentRe.test(d))return"";var f=this._getFoldWidgetBase(c,s,o);return!f&&this.startRegionRe.test(d)?"start":f},this.getFoldWidgetRange=function(c,s,o,d){var f=c.getLine(o);if(this.startRegionRe.test(f))return this.getCommentRegionBlock(c,f,o);var m=f.match(this.foldingStartMarker);if(m){var S=m.index;if(m[1])return this.openingBracketBlock(c,m[1],o,S);var E=c.getCommentFoldRange(o,S+m[0].length,1);return E&&!E.isMultiLine()&&(d?E=this.getSectionRange(c,o):s!="all"&&(E=null)),E}if(s!=="markbegin"){var m=f.match(this.foldingStopMarker);if(m){var S=m.index+m[0].length;return m[1]?this.closingBracketBlock(c,m[1],o,S):c.getCommentFoldRange(o,S,-1)}}},this.getSectionRange=function(c,s){var o=c.getLine(s),d=o.search(/\S/),f=s,S=o.length;s+=1;for(var E=s,m=c.getLength();++s<m;){o=c.getLine(s);var v=o.search(/\S/);if(v!==-1){if(d>v)break;var A=this.getFoldWidgetRange(c,"all",s);if(A){if(A.start.row<=f)break;if(A.isMultiLine())s=A.end.row;else if(d==v)break}E=s}}return new a(f,S,E,c.getLine(E).length)},this.getCommentRegionBlock=function(c,s,o){for(var d=s.search(/\s*$/),f=c.getLength(),S=o,E=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,m=1;++o<f;){s=c.getLine(o);var v=E.exec(s);if(v&&(v[1]?m--:m++,!m))break}var A=o;if(A>S)return new a(S,d,A,s.length)}}.call(g.prototype)}),ace.define("ace/mode/folding/javascript",["require","exports","module","ace/lib/oop","ace/mode/folding/xml","ace/mode/folding/cstyle"],function(r,l,T){var e=r("../../lib/oop"),a=r("./xml").FoldMode,h=r("./cstyle").FoldMode,g=l.FoldMode=function(c){c&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+c.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+c.end))),this.xmlFoldMode=new a};e.inherits(g,h),function(){this.getFoldWidgetRangeBase=this.getFoldWidgetRange,this.getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(c,s,o){var d=this.getFoldWidgetBase(c,s,o);return d||this.xmlFoldMode.getFoldWidget(c,s,o)},this.getFoldWidgetRange=function(c,s,o,d){var f=this.getFoldWidgetRangeBase(c,s,o,d);return f||this.xmlFoldMode.getFoldWidgetRange(c,s,o)}}.call(g.prototype)}),ace.define("ace/mode/javascript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/worker/worker_client","ace/mode/behaviour/javascript","ace/mode/folding/javascript"],function(r,l,T){var e=r("../lib/oop"),a=r("./text").Mode,h=r("./javascript_highlight_rules").JavaScriptHighlightRules,g=r("./matching_brace_outdent").MatchingBraceOutdent,c=r("../worker/worker_client").WorkerClient,s=r("./behaviour/javascript").JavaScriptBehaviour,o=r("./folding/javascript").FoldMode,d=function(){this.HighlightRules=h,this.$outdent=new g,this.$behaviour=new s,this.foldingRules=new o};e.inherits(d,a),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.$quotes={'"':'"',"'":"'","`":"`"},this.$pairQuotesAfter={"`":/\w/},this.getNextLineIndent=function(f,S,E){var m=this.$getIndent(S),v=this.getTokenizer().getLineTokens(S,f),A=v.tokens,P=v.state;if(A.length&&A[A.length-1].type=="comment")return m;if(f=="start"||f=="no_regex"){var R=S.match(/^.*(?:\bcase\b.*:|[\{\(\[])\s*$/);R&&(m+=E)}else if(f=="doc-start"&&(P=="start"||P=="no_regex"))return"";return m},this.checkOutdent=function(f,S,E){return this.$outdent.checkOutdent(S,E)},this.autoOutdent=function(f,S,E){this.$outdent.autoOutdent(S,E)},this.createWorker=function(f){var S=new c(["ace"],"ace/mode/javascript_worker","JavaScriptWorker");return S.attachToDocument(f.getDocument()),S.on("annotate",function(E){f.setAnnotations(E.data)}),S.on("terminate",function(){f.clearAnnotations()}),S},this.$id="ace/mode/javascript",this.snippetFileId="ace/snippets/javascript"}.call(d.prototype),l.Mode=d}),function(){ace.require(["ace/mode/javascript"],function(r){M&&(M.exports=r)})}()})(mr);var br={exports:{}};(function(M,b){ace.define("ace/snippets/css.snippets",["require","exports","module"],function(r,l,T){T.exports=`snippet .
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
`}),ace.define("ace/snippets/css",["require","exports","module","ace/snippets/css.snippets"],function(r,l,T){l.snippetText=r("./css.snippets"),l.scope="css"}),function(){ace.require(["ace/snippets/css"],function(r){M&&(M.exports=r)})}()})(br);var vr={exports:{}};(function(M,b){ace.define("ace/snippets/javascript.snippets",["require","exports","module"],function(r,l,T){T.exports=`# Prototype
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
`}),ace.define("ace/snippets/javascript",["require","exports","module","ace/snippets/javascript.snippets"],function(r,l,T){l.snippetText=r("./javascript.snippets"),l.scope="javascript"}),function(){ace.require(["ace/snippets/javascript"],function(r){M&&(M.exports=r)})}()})(vr);var yr={exports:{}};(function(M,b){ace.define("ace/theme/tomorrow-css",["require","exports","module"],function(r,l,T){T.exports=`.ace-tomorrow .ace_gutter {
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
`}),ace.define("ace/theme/tomorrow",["require","exports","module","ace/theme/tomorrow-css","ace/lib/dom"],function(r,l,T){l.isDark=!1,l.cssClass="ace-tomorrow",l.cssText=r("./tomorrow-css");var e=r("../lib/dom");e.importCssString(l.cssText,l.cssClass,!1)}),function(){ace.require(["ace/theme/tomorrow"],function(r){M&&(M.exports=r)})}()})(yr);var xr={exports:{}};(function(M,b){ace.define("ace/theme/twilight-css",["require","exports","module"],function(r,l,T){T.exports=`.ace-twilight .ace_gutter {
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
`}),ace.define("ace/theme/twilight",["require","exports","module","ace/theme/twilight-css","ace/lib/dom"],function(r,l,T){l.isDark=!0,l.cssClass="ace-twilight",l.cssText=r("./twilight-css");var e=r("../lib/dom");e.importCssString(l.cssText,l.cssClass,!1)}),function(){ace.require(["ace/theme/twilight"],function(r){M&&(M.exports=r)})}()})(xr);var wr={exports:{}};(function(M,b){ace.define("ace/snippets",["require","exports","module","ace/lib/dom","ace/lib/oop","ace/lib/event_emitter","ace/lib/lang","ace/range","ace/range_list","ace/keyboard/hash_handler","ace/tokenizer","ace/clipboard","ace/editor"],function(r,l,T){function e(t){var i=new Date().toLocaleString("en-us",t);return i.length==1?"0"+i:i}var a=r("./lib/dom"),h=r("./lib/oop"),g=r("./lib/event_emitter").EventEmitter,c=r("./lib/lang"),s=r("./range").Range,o=r("./range_list").RangeList,d=r("./keyboard/hash_handler").HashHandler,f=r("./tokenizer").Tokenizer,S=r("./clipboard"),E={CURRENT_WORD:function(t){return t.session.getTextRange(t.session.getWordRange())},SELECTION:function(t,i,n){var p=t.session.getTextRange();return n?p.replace(/\n\r?([ \t]*\S)/g,`
`+n+"$1"):p},CURRENT_LINE:function(t){return t.session.getLine(t.getCursorPosition().row)},PREV_LINE:function(t){return t.session.getLine(t.getCursorPosition().row-1)},LINE_INDEX:function(t){return t.getCursorPosition().row},LINE_NUMBER:function(t){return t.getCursorPosition().row+1},SOFT_TABS:function(t){return t.session.getUseSoftTabs()?"YES":"NO"},TAB_SIZE:function(t){return t.session.getTabSize()},CLIPBOARD:function(t){return S.getText&&S.getText()},FILENAME:function(t){return/[^/\\]*$/.exec(this.FILEPATH(t))[0]},FILENAME_BASE:function(t){return/[^/\\]*$/.exec(this.FILEPATH(t))[0].replace(/\.[^.]*$/,"")},DIRECTORY:function(t){return this.FILEPATH(t).replace(/[^/\\]*$/,"")},FILEPATH:function(t){return"/not implemented.txt"},WORKSPACE_NAME:function(){return"Unknown"},FULLNAME:function(){return"Unknown"},BLOCK_COMMENT_START:function(t){var i=t.session.$mode||{};return i.blockComment&&i.blockComment.start||""},BLOCK_COMMENT_END:function(t){var i=t.session.$mode||{};return i.blockComment&&i.blockComment.end||""},LINE_COMMENT:function(t){var i=t.session.$mode||{};return i.lineCommentStart||""},CURRENT_YEAR:e.bind(null,{year:"numeric"}),CURRENT_YEAR_SHORT:e.bind(null,{year:"2-digit"}),CURRENT_MONTH:e.bind(null,{month:"numeric"}),CURRENT_MONTH_NAME:e.bind(null,{month:"long"}),CURRENT_MONTH_NAME_SHORT:e.bind(null,{month:"short"}),CURRENT_DATE:e.bind(null,{day:"2-digit"}),CURRENT_DAY_NAME:e.bind(null,{weekday:"long"}),CURRENT_DAY_NAME_SHORT:e.bind(null,{weekday:"short"}),CURRENT_HOUR:e.bind(null,{hour:"2-digit",hour12:!1}),CURRENT_MINUTE:e.bind(null,{minute:"2-digit"}),CURRENT_SECOND:e.bind(null,{second:"2-digit"})};E.SELECTED_TEXT=E.SELECTION;var m=function(){function t(){this.snippetMap={},this.snippetNameMap={},this.variables=E}return t.prototype.getTokenizer=function(){return t.$tokenizer||this.createTokenizer()},t.prototype.createTokenizer=function(){function i(u){return u=u.substr(1),/^\d+$/.test(u)?[{tabstopId:parseInt(u,10)}]:[{text:u}]}function n(u){return"(?:[^\\\\"+u+"]|\\\\.)"}var p={regex:"/("+n("/")+"+)/",onMatch:function(u,x,w){var _=w[0];return _.fmtString=!0,_.guard=u.slice(1,-1),_.flag="",""},next:"formatString"};return t.$tokenizer=new f({start:[{regex:/\\./,onMatch:function(u,x,w){var _=u[1];return(_=="}"&&w.length||"`$\\".indexOf(_)!=-1)&&(u=_),[u]}},{regex:/}/,onMatch:function(u,x,w){return[w.length?w.shift():u]}},{regex:/\$(?:\d+|\w+)/,onMatch:i},{regex:/\$\{[\dA-Z_a-z]+/,onMatch:function(u,x,w){var _=i(u.substr(1));return w.unshift(_[0]),_},next:"snippetVar"},{regex:/\n/,token:"newline",merge:!1}],snippetVar:[{regex:"\\|"+n("\\|")+"*\\|",onMatch:function(u,x,w){var _=u.slice(1,-1).replace(/\\[,|\\]|,/g,function($){return $.length==2?$[1]:"\0"}).split("\0").map(function($){return{value:$}});return w[0].choices=_,[_[0]]},next:"start"},p,{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"start"}],formatString:[{regex:/:/,onMatch:function(u,x,w){return w.length&&w[0].expectElse?(w[0].expectElse=!1,w[0].ifEnd={elseEnd:w[0]},[w[0].ifEnd]):":"}},{regex:/\\./,onMatch:function(u,x,w){var _=u[1];return _=="}"&&w.length||"`$\\".indexOf(_)!=-1?u=_:_=="n"?u=`
`:_=="t"?u="	":"ulULE".indexOf(_)!=-1&&(u={changeCase:_,local:_>"a"}),[u]}},{regex:"/\\w*}",onMatch:function(u,x,w){var _=w.shift();return _&&(_.flag=u.slice(1,-1)),this.next=_&&_.tabstopId?"start":"",[_||u]},next:"start"},{regex:/\$(?:\d+|\w+)/,onMatch:function(u,x,w){return[{text:u.slice(1)}]}},{regex:/\${\w+/,onMatch:function(u,x,w){var _={text:u.slice(2)};return w.unshift(_),[_]},next:"formatStringVar"},{regex:/\n/,token:"newline",merge:!1},{regex:/}/,onMatch:function(u,x,w){var _=w.shift();return this.next=_&&_.tabstopId?"start":"",[_||u]},next:"start"}],formatStringVar:[{regex:/:\/\w+}/,onMatch:function(u,x,w){var _=w[0];return _.formatFunction=u.slice(2,-1),[w.shift()]},next:"formatString"},p,{regex:/:[\?\-+]?/,onMatch:function(u,x,w){u[1]=="+"&&(w[0].ifEnd=w[0]),u[1]=="?"&&(w[0].expectElse=!0)},next:"formatString"},{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"formatString"}]}),t.$tokenizer},t.prototype.tokenizeTmSnippet=function(i,n){return this.getTokenizer().getLineTokens(i,n).tokens.map(function(p){return p.value||p})},t.prototype.getVariableValue=function(i,n,p){if(/^\d+$/.test(n))return(this.variables.__||{})[n]||"";if(/^[A-Z]\d+$/.test(n))return(this.variables[n[0]+"__"]||{})[n.substr(1)]||"";if(n=n.replace(/^TM_/,""),!this.variables.hasOwnProperty(n))return"";var u=this.variables[n];return typeof u=="function"&&(u=this.variables[n](i,n,p)),u==null?"":u},t.prototype.tmStrFormat=function(i,n,p){if(!n.fmt)return i;var u=n.flag||"",x=n.guard;x=new RegExp(x,u.replace(/[^gim]/g,""));var w=typeof n.fmt=="string"?this.tokenizeTmSnippet(n.fmt,"formatString"):n.fmt,_=this,$=i.replace(x,function(){var C=_.variables.__;_.variables.__=[].slice.call(arguments);for(var I=_.resolveVariables(w,p),N="E",L=0;L<I.length;L++){var z=I[L];if(typeof z=="object")if(I[L]="",z.changeCase&&z.local){var B=I[L+1];B&&typeof B=="string"&&(z.changeCase=="u"?I[L]=B[0].toUpperCase():I[L]=B[0].toLowerCase(),I[L+1]=B.substr(1))}else z.changeCase&&(N=z.changeCase);else N=="U"?I[L]=z.toUpperCase():N=="L"&&(I[L]=z.toLowerCase())}return _.variables.__=C,I.join("")});return $},t.prototype.tmFormatFunction=function(i,n,p){return n.formatFunction=="upcase"?i.toUpperCase():n.formatFunction=="downcase"?i.toLowerCase():i},t.prototype.resolveVariables=function(i,n){function p(N){var L=i.indexOf(N,_+1);L!=-1&&(_=L)}for(var u=[],x="",w=!0,_=0;_<i.length;_++){var $=i[_];if(typeof $=="string"){u.push($),$==`
`?(w=!0,x=""):w&&(x=/^\t*/.exec($)[0],w=/\S/.test($));continue}if($){if(w=!1,$.fmtString){var C=i.indexOf($,_+1);C==-1&&(C=i.length),$.fmt=i.slice(_+1,C),_=C}if($.text){var I=this.getVariableValue(n,$.text,x)+"";$.fmtString&&(I=this.tmStrFormat(I,$,n)),$.formatFunction&&(I=this.tmFormatFunction(I,$,n)),I&&!$.ifEnd?(u.push(I),p($)):!I&&$.ifEnd&&p($.ifEnd)}else $.elseEnd?p($.elseEnd):($.tabstopId!=null||$.changeCase!=null)&&u.push($)}}return u},t.prototype.getDisplayTextForSnippet=function(i,n){var p=v.call(this,i,n);return p.text},t.prototype.insertSnippetForSelection=function(i,n,p){p===void 0&&(p={});var u=v.call(this,i,n,p),x=i.getSelectionRange(),w=i.session.replace(x,u.text),_=new A(i),$=i.inVirtualSelectionMode&&i.selection.index;_.addTabstops(u.tabstops,x.start,w,$)},t.prototype.insertSnippet=function(i,n,p){p===void 0&&(p={});var u=this;if(i.inVirtualSelectionMode)return u.insertSnippetForSelection(i,n,p);i.forEachSelection(function(){u.insertSnippetForSelection(i,n,p)},null,{keepOrder:!0}),i.tabstopManager&&i.tabstopManager.tabNext()},t.prototype.$getScope=function(i){var n=i.session.$mode.$id||"";if(n=n.split("/").pop(),n==="html"||n==="php"){n==="php"&&!i.session.$mode.inlinePhp&&(n="html");var p=i.getCursorPosition(),u=i.session.getState(p.row);typeof u=="object"&&(u=u[0]),u.substring&&(u.substring(0,3)=="js-"?n="javascript":u.substring(0,4)=="css-"?n="css":u.substring(0,4)=="php-"&&(n="php"))}return n},t.prototype.getActiveScopes=function(i){var n=this.$getScope(i),p=[n],u=this.snippetMap;return u[n]&&u[n].includeScopes&&p.push.apply(p,u[n].includeScopes),p.push("_"),p},t.prototype.expandWithTab=function(i,n){var p=this,u=i.forEachSelection(function(){return p.expandSnippetForSelection(i,n)},null,{keepOrder:!0});return u&&i.tabstopManager&&i.tabstopManager.tabNext(),u},t.prototype.expandSnippetForSelection=function(i,n){var p=i.getCursorPosition(),u=i.session.getLine(p.row),x=u.substring(0,p.column),w=u.substr(p.column),_=this.snippetMap,$;return this.getActiveScopes(i).some(function(C){var I=_[C];return I&&($=this.findMatchingSnippet(I,x,w)),!!$},this),$?(n&&n.dryRun||(i.session.doc.removeInLine(p.row,p.column-$.replaceBefore.length,p.column+$.replaceAfter.length),this.variables.M__=$.matchBefore,this.variables.T__=$.matchAfter,this.insertSnippetForSelection(i,$.content),this.variables.M__=this.variables.T__=null),!0):!1},t.prototype.findMatchingSnippet=function(i,n,p){for(var u=i.length;u--;){var x=i[u];if(!(x.startRe&&!x.startRe.test(n))&&!(x.endRe&&!x.endRe.test(p))&&!(!x.startRe&&!x.endRe))return x.matchBefore=x.startRe?x.startRe.exec(n):[""],x.matchAfter=x.endRe?x.endRe.exec(p):[""],x.replaceBefore=x.triggerRe?x.triggerRe.exec(n)[0]:"",x.replaceAfter=x.endTriggerRe?x.endTriggerRe.exec(p)[0]:"",x}},t.prototype.register=function(i,n){function p(C){return C&&!/^\^?\(.*\)\$?$|^\\b$/.test(C)&&(C="(?:"+C+")"),C||""}function u(C,I,N){return C=p(C),I=p(I),N?(C=I+C,C&&C[C.length-1]!="$"&&(C+="$")):(C+=I,C&&C[0]!="^"&&(C="^"+C)),new RegExp(C)}function x(C){C.scope||(C.scope=n||"_"),n=C.scope,w[n]||(w[n]=[],_[n]={});var I=_[n];if(C.name){var N=I[C.name];N&&$.unregister(N),I[C.name]=C}w[n].push(C),C.prefix&&(C.tabTrigger=C.prefix),!C.content&&C.body&&(C.content=Array.isArray(C.body)?C.body.join(`
`):C.body),C.tabTrigger&&!C.trigger&&(!C.guard&&/^\w/.test(C.tabTrigger)&&(C.guard="\\b"),C.trigger=c.escapeRegExp(C.tabTrigger)),!(!C.trigger&&!C.guard&&!C.endTrigger&&!C.endGuard)&&(C.startRe=u(C.trigger,C.guard,!0),C.triggerRe=new RegExp(C.trigger),C.endRe=u(C.endTrigger,C.endGuard,!0),C.endTriggerRe=new RegExp(C.endTrigger))}var w=this.snippetMap,_=this.snippetNameMap,$=this;i||(i=[]),Array.isArray(i)?i.forEach(x):Object.keys(i).forEach(function(C){x(i[C])}),this._signal("registerSnippets",{scope:n})},t.prototype.unregister=function(i,n){function p(w){var _=x[w.scope||n];if(_&&_[w.name]){delete _[w.name];var $=u[w.scope||n],C=$&&$.indexOf(w);C>=0&&$.splice(C,1)}}var u=this.snippetMap,x=this.snippetNameMap;i.content?p(i):Array.isArray(i)&&i.forEach(p)},t.prototype.parseSnippetFile=function(i){i=i.replace(/\r/g,"");for(var n=[],p={},u=/^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm,x;x=u.exec(i);){if(x[1])try{p=JSON.parse(x[1]),n.push(p)}catch(C){}if(x[4])p.content=x[4].replace(/^\t/gm,""),n.push(p),p={};else{var w=x[2],_=x[3];if(w=="regex"){var $=/\/((?:[^\/\\]|\\.)*)|$/g;p.guard=$.exec(_)[1],p.trigger=$.exec(_)[1],p.endTrigger=$.exec(_)[1],p.endGuard=$.exec(_)[1]}else w=="snippet"?(p.tabTrigger=_.match(/^\S*/)[0],p.name||(p.name=_)):w&&(p[w]=_)}}return n},t.prototype.getSnippetByName=function(i,n){var p=this.snippetNameMap,u;return this.getActiveScopes(n).some(function(x){var w=p[x];return w&&(u=w[i]),!!u},this),u},t}();h.implement(m.prototype,g);var v=function(t,i,n){function p(D){for(var X=[],K=0;K<D.length;K++){var q=D[K];if(typeof q=="object"){if(I[q.tabstopId])continue;var ce=D.lastIndexOf(q,K-1);q=X[ce]||{tabstopId:q.tabstopId}}X[K]=q}return X}n===void 0&&(n={});var u=t.getCursorPosition(),x=t.session.getLine(u.row),w=t.session.getTabString(),_=x.match(/^\s*/)[0];u.column<_.length&&(_=_.slice(0,u.column)),i=i.replace(/\r/g,"");var $=this.tokenizeTmSnippet(i);$=this.resolveVariables($,t),$=$.map(function(D){return D==`
`&&!n.excludeExtraIndent?D+_:typeof D=="string"?D.replace(/\t/g,w):D});var C=[];$.forEach(function(D,X){if(typeof D=="object"){var K=D.tabstopId,q=C[K];if(q||(q=C[K]=[],q.index=K,q.value="",q.parents={}),q.indexOf(D)===-1){D.choices&&!q.choices&&(q.choices=D.choices),q.push(D);var ce=$.indexOf(D,X+1);if(ce!==-1){var le=$.slice(X+1,ce),we=le.some(function(Me){return typeof Me=="object"});we&&!q.value?q.value=le:le.length&&(!q.value||typeof q.value!="string")&&(q.value=le.join(""))}}}}),C.forEach(function(D){D.length=0});for(var I={},N=0;N<$.length;N++){var L=$[N];if(typeof L=="object"){var z=L.tabstopId,B=C[z],W=$.indexOf(L,N+1);if(I[z]){I[z]===L&&(delete I[z],Object.keys(I).forEach(function(D){B.parents[D]=!0}));continue}I[z]=L;var Q=B.value;typeof Q!="string"?Q=p(Q):L.fmt&&(Q=this.tmStrFormat(Q,L,t)),$.splice.apply($,[N+1,Math.max(0,W-N)].concat(Q,L)),B.indexOf(L)===-1&&B.push(L)}}var ne=0,J=0,G="";return $.forEach(function(D){if(typeof D=="string"){var X=D.split(`
`);X.length>1?(J=X[X.length-1].length,ne+=X.length-1):J+=D.length,G+=D}else D&&(D.start?D.end={row:ne,column:J}:D.start={row:ne,column:J})}),{text:G,tabstops:C,tokens:$}},A=function(){function t(i){if(this.index=0,this.ranges=[],this.tabstops=[],i.tabstopManager)return i.tabstopManager;i.tabstopManager=this,this.$onChange=this.onChange.bind(this),this.$onChangeSelection=c.delayedCall(this.onChangeSelection.bind(this)).schedule,this.$onChangeSession=this.onChangeSession.bind(this),this.$onAfterExec=this.onAfterExec.bind(this),this.attach(i)}return t.prototype.attach=function(i){this.$openTabstops=null,this.selectedTabstop=null,this.editor=i,this.session=i.session,this.editor.on("change",this.$onChange),this.editor.on("changeSelection",this.$onChangeSelection),this.editor.on("changeSession",this.$onChangeSession),this.editor.commands.on("afterExec",this.$onAfterExec),this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)},t.prototype.detach=function(){this.tabstops.forEach(this.removeTabstopMarkers,this),this.ranges.length=0,this.tabstops.length=0,this.selectedTabstop=null,this.editor.off("change",this.$onChange),this.editor.off("changeSelection",this.$onChangeSelection),this.editor.off("changeSession",this.$onChangeSession),this.editor.commands.off("afterExec",this.$onAfterExec),this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.tabstopManager=null,this.session=null,this.editor=null},t.prototype.onChange=function(i){for(var n=i.action[0]=="r",p=this.selectedTabstop||{},u=p.parents||{},x=this.tabstops.slice(),w=0;w<x.length;w++){var _=x[w],$=_==p||u[_.index];if(_.rangeList.$bias=$?0:1,i.action=="remove"&&_!==p){var C=_.parents&&_.parents[p.index],I=_.rangeList.pointIndex(i.start,C);I=I<0?-I-1:I+1;var N=_.rangeList.pointIndex(i.end,C);N=N<0?-N-1:N-1;for(var L=_.rangeList.ranges.slice(I,N),z=0;z<L.length;z++)this.removeRange(L[z])}_.rangeList.$onChange(i)}var B=this.session;!this.$inChange&&n&&B.getLength()==1&&!B.getValue()&&this.detach()},t.prototype.updateLinkedFields=function(){var i=this.selectedTabstop;if(!(!i||!i.hasLinkedRanges||!i.firstNonLinked)){this.$inChange=!0;for(var n=this.session,p=n.getTextRange(i.firstNonLinked),u=0;u<i.length;u++){var x=i[u];if(x.linked){var w=x.original,_=l.snippetManager.tmStrFormat(p,w,this.editor);n.replace(x,_)}}this.$inChange=!1}},t.prototype.onAfterExec=function(i){i.command&&!i.command.readOnly&&this.updateLinkedFields()},t.prototype.onChangeSelection=function(){if(this.editor){for(var i=this.editor.selection.lead,n=this.editor.selection.anchor,p=this.editor.selection.isEmpty(),u=0;u<this.ranges.length;u++)if(!this.ranges[u].linked){var x=this.ranges[u].contains(i.row,i.column),w=p||this.ranges[u].contains(n.row,n.column);if(x&&w)return}this.detach()}},t.prototype.onChangeSession=function(){this.detach()},t.prototype.tabNext=function(i){var n=this.tabstops.length,p=this.index+(i||1);p=Math.min(Math.max(p,1),n),p==n&&(p=0),this.selectTabstop(p),this.updateTabstopMarkers(),p===0&&this.detach()},t.prototype.selectTabstop=function(i){this.$openTabstops=null;var n=this.tabstops[this.index];if(n&&this.addTabstopMarkers(n),this.index=i,n=this.tabstops[this.index],!(!n||!n.length)){this.selectedTabstop=n;var p=n.firstNonLinked||n;if(n.choices&&(p.cursor=p.start),this.editor.inVirtualSelectionMode)this.editor.selection.fromOrientedRange(p);else{var u=this.editor.multiSelect;u.toSingleRange(p);for(var x=0;x<n.length;x++)n.hasLinkedRanges&&n[x].linked||u.addRange(n[x].clone(),!0)}this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler),this.selectedTabstop&&this.selectedTabstop.choices&&this.editor.execCommand("startAutocomplete",{matches:this.selectedTabstop.choices})}},t.prototype.addTabstops=function(i,n,p){var u=this.useLink||!this.editor.getOption("enableMultiselect");if(this.$openTabstops||(this.$openTabstops=[]),!i[0]){var x=s.fromPoints(p,p);R(x.start,n),R(x.end,n),i[0]=[x],i[0].index=0}var w=this.index,_=[w+1,0],$=this.ranges,C=this.snippetId=(this.snippetId||0)+1;i.forEach(function(I,N){var L=this.$openTabstops[N]||I;L.snippetId=C;for(var z=0;z<I.length;z++){var B=I[z],W=s.fromPoints(B.start,B.end||B.start);P(W.start,n),P(W.end,n),W.original=B,W.tabstop=L,$.push(W),L!=I?L.unshift(W):L[z]=W,B.fmtString||L.firstNonLinked&&u?(W.linked=!0,L.hasLinkedRanges=!0):L.firstNonLinked||(L.firstNonLinked=W)}L.firstNonLinked||(L.hasLinkedRanges=!1),L===I&&(_.push(L),this.$openTabstops[N]=L),this.addTabstopMarkers(L),L.rangeList=L.rangeList||new o,L.rangeList.$bias=0,L.rangeList.addList(L)},this),_.length>2&&(this.tabstops.length&&_.push(_.splice(2,1)[0]),this.tabstops.splice.apply(this.tabstops,_))},t.prototype.addTabstopMarkers=function(i){var n=this.session;i.forEach(function(p){p.markerId||(p.markerId=n.addMarker(p,"ace_snippet-marker","text"))})},t.prototype.removeTabstopMarkers=function(i){var n=this.session;i.forEach(function(p){n.removeMarker(p.markerId),p.markerId=null})},t.prototype.updateTabstopMarkers=function(){if(this.selectedTabstop){var i=this.selectedTabstop.snippetId;this.selectedTabstop.index===0&&i--,this.tabstops.forEach(function(n){n.snippetId===i?this.addTabstopMarkers(n):this.removeTabstopMarkers(n)},this)}},t.prototype.removeRange=function(i){var n=i.tabstop.indexOf(i);n!=-1&&i.tabstop.splice(n,1),n=this.ranges.indexOf(i),n!=-1&&this.ranges.splice(n,1),n=i.tabstop.rangeList.ranges.indexOf(i),n!=-1&&i.tabstop.splice(n,1),this.session.removeMarker(i.markerId),i.tabstop.length||(n=this.tabstops.indexOf(i.tabstop),n!=-1&&this.tabstops.splice(n,1),this.tabstops.length||this.detach())},t}();A.prototype.keyboardHandler=new d,A.prototype.keyboardHandler.bindKeys({Tab:function(t){l.snippetManager&&l.snippetManager.expandWithTab(t)||(t.tabstopManager.tabNext(1),t.renderer.scrollCursorIntoView())},"Shift-Tab":function(t){t.tabstopManager.tabNext(-1),t.renderer.scrollCursorIntoView()},Esc:function(t){t.tabstopManager.detach()}});var P=function(t,i){t.row==0&&(t.column+=i.column),t.row+=i.row},R=function(t,i){t.row==i.row&&(t.column-=i.column),t.row-=i.row};a.importCssString(`
.ace_snippet-marker {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: rgba(194, 193, 208, 0.09);
    border: 1px dotted rgba(211, 208, 235, 0.62);
    position: absolute;
}`,"snippets.css",!1),l.snippetManager=new m;var k=r("./editor").Editor;(function(){this.insertSnippet=function(t,i){return l.snippetManager.insertSnippet(this,t,i)},this.expandSnippet=function(t){return l.snippetManager.expandWithTab(this,t)}}).call(k.prototype)}),ace.define("ace/ext/emmet",["require","exports","module","ace/keyboard/hash_handler","ace/editor","ace/snippets","ace/range","ace/config","resources","resources","tabStops","resources","utils","actions"],function(r,l,T){var e=r("../keyboard/hash_handler").HashHandler,a=r("../editor").Editor,h=r("../snippets").snippetManager,g=r("../range").Range,c=r("../config"),s,o,d=function(){function v(){}return v.prototype.setupContext=function(A){this.ace=A,this.indentation=A.session.getTabString(),s||(s=window.emmet);var P=s.resources||s.require("resources");P.setVariable("indentation",this.indentation),this.$syntax=null,this.$syntax=this.getSyntax()},v.prototype.getSelectionRange=function(){var A=this.ace.getSelectionRange(),P=this.ace.session.doc;return{start:P.positionToIndex(A.start),end:P.positionToIndex(A.end)}},v.prototype.createSelection=function(A,P){var R=this.ace.session.doc;this.ace.selection.setRange({start:R.indexToPosition(A),end:R.indexToPosition(P)})},v.prototype.getCurrentLineRange=function(){var A=this.ace,P=A.getCursorPosition().row,R=A.session.getLine(P).length,k=A.session.doc.positionToIndex({row:P,column:0});return{start:k,end:k+R}},v.prototype.getCaretPos=function(){var A=this.ace.getCursorPosition();return this.ace.session.doc.positionToIndex(A)},v.prototype.setCaretPos=function(A){var P=this.ace.session.doc.indexToPosition(A);this.ace.selection.moveToPosition(P)},v.prototype.getCurrentLine=function(){var A=this.ace.getCursorPosition().row;return this.ace.session.getLine(A)},v.prototype.replaceContent=function(A,P,R,k){R==null&&(R=P==null?this.getContent().length:P),P==null&&(P=0);var t=this.ace,i=t.session.doc,n=g.fromPoints(i.indexToPosition(P),i.indexToPosition(R));t.session.remove(n),n.end=n.start,A=this.$updateTabstops(A),h.insertSnippet(t,A)},v.prototype.getContent=function(){return this.ace.getValue()},v.prototype.getSyntax=function(){if(this.$syntax)return this.$syntax;var A=this.ace.session.$modeId.split("/").pop();if(A=="html"||A=="php"){var P=this.ace.getCursorPosition(),R=this.ace.session.getState(P.row);typeof R!="string"&&(R=R[0]),R&&(R=R.split("-"),R.length>1?A=R[0]:A=="php"&&(A="html"))}return A},v.prototype.getProfileName=function(){var A=s.resources||s.require("resources");switch(this.getSyntax()){case"css":return"css";case"xml":case"xsl":return"xml";case"html":var P=A.getVariable("profile");return P||(P=this.ace.session.getLines(0,2).join("").search(/<!DOCTYPE[^>]+XHTML/i)!=-1?"xhtml":"html"),P;default:var R=this.ace.session.$mode;return R.emmetConfig&&R.emmetConfig.profile||"xhtml"}},v.prototype.prompt=function(A){return prompt(A)},v.prototype.getSelection=function(){return this.ace.session.getTextRange()},v.prototype.getFilePath=function(){return""},v.prototype.$updateTabstops=function(A){var P=1e3,R=0,k=null,t=s.tabStops||s.require("tabStops"),i=s.resources||s.require("resources"),n=i.getVocabulary("user"),p={tabstop:function(x){var w=parseInt(x.group,10),_=w===0;_?w=++R:w+=P;var $=x.placeholder;$&&($=t.processText($,p));var C="${"+w+($?":"+$:"")+"}";return _&&(k=[x.start,C]),C},escape:function(x){return x=="$"?"\\$":x=="\\"?"\\\\":x}};if(A=t.processText(A,p),n.variables.insert_final_tabstop&&!/\$\{0\}$/.test(A))A+="${0}";else if(k){var u=s.utils?s.utils.common:s.require("utils");A=u.replaceSubstring(A,"${0}",k[0],k[1])}return A},v}(),f={expand_abbreviation:{mac:"ctrl+alt+e",win:"alt+e"},match_pair_outward:{mac:"ctrl+d",win:"ctrl+,"},match_pair_inward:{mac:"ctrl+j",win:"ctrl+shift+0"},matching_pair:{mac:"ctrl+alt+j",win:"alt+j"},next_edit_point:"alt+right",prev_edit_point:"alt+left",toggle_comment:{mac:"command+/",win:"ctrl+/"},split_join_tag:{mac:"shift+command+'",win:"shift+ctrl+`"},remove_tag:{mac:"command+'",win:"shift+ctrl+;"},evaluate_math_expression:{mac:"shift+command+y",win:"shift+ctrl+y"},increment_number_by_1:"ctrl+up",decrement_number_by_1:"ctrl+down",increment_number_by_01:"alt+up",decrement_number_by_01:"alt+down",increment_number_by_10:{mac:"alt+command+up",win:"shift+alt+up"},decrement_number_by_10:{mac:"alt+command+down",win:"shift+alt+down"},select_next_item:{mac:"shift+command+.",win:"shift+ctrl+."},select_previous_item:{mac:"shift+command+,",win:"shift+ctrl+,"},reflect_css_value:{mac:"shift+command+r",win:"shift+ctrl+r"},encode_decode_data_url:{mac:"shift+ctrl+d",win:"ctrl+'"},expand_abbreviation_with_tab:"Tab",wrap_with_abbreviation:{mac:"shift+ctrl+a",win:"shift+ctrl+a"}},S=new d;l.commands=new e,l.runEmmetCommand=function v(A){if(this.action=="expand_abbreviation_with_tab"){if(!A.selection.isEmpty())return!1;var P=A.selection.lead,R=A.session.getTokenAt(P.row,P.column);if(R&&/\btag\b/.test(R.type))return!1}try{S.setupContext(A);var k=s.actions||s.require("actions");if(this.action=="wrap_with_abbreviation")return setTimeout(function(){k.run("wrap_with_abbreviation",S)},0);var t=k.run(this.action,S)}catch(n){if(!s){var i=l.load(v.bind(this,A));return this.action=="expand_abbreviation_with_tab"?!1:i}A._signal("changeStatus",typeof n=="string"?n:n.message),c.warn(n),t=!1}return t};for(var E in f)l.commands.addCommand({name:"emmet:"+E,action:E,bindKey:f[E],exec:l.runEmmetCommand,multiSelectAction:"forEach"});l.updateCommands=function(v,A){A?v.keyBinding.addKeyboardHandler(l.commands):v.keyBinding.removeKeyboardHandler(l.commands)},l.isSupportedMode=function(v){if(!v)return!1;if(v.emmetConfig)return!0;var A=v.$id||v;return/css|less|scss|sass|stylus|html|php|twig|ejs|handlebars/.test(A)},l.isAvailable=function(v,A){if(/(evaluate_math_expression|expand_abbreviation)$/.test(A))return!0;var P=v.session.$mode,R=l.isSupportedMode(P);if(R&&P.$modes)try{S.setupContext(v),/js|php/.test(S.getSyntax())&&(R=!1)}catch(k){}return R};var m=function(v,A){var P=A;if(P){var R=l.isSupportedMode(P.session.$mode);v.enableEmmet===!1&&(R=!1),R&&l.load(),l.updateCommands(P,R)}};l.load=function(v){return typeof o!="string"?(c.warn("script for emmet-core is not loaded"),!1):(c.loadModule(o,function(){o=null,v&&v()}),!0)},l.AceEmmetEditor=d,c.defineOptions(a.prototype,"editor",{enableEmmet:{set:function(v){this[v?"on":"removeListener"]("changeMode",m),m({enableEmmet:!!v},this)},value:!0}}),l.setCore=function(v){typeof v=="string"?o=v:s=v}}),function(){ace.require(["ace/ext/emmet"],function(r){M&&(M.exports=r)})}()})(wr);var _r={exports:{}};(function(M,b){ace.define("ace/snippets",["require","exports","module","ace/lib/dom","ace/lib/oop","ace/lib/event_emitter","ace/lib/lang","ace/range","ace/range_list","ace/keyboard/hash_handler","ace/tokenizer","ace/clipboard","ace/editor"],function(r,l,T){function e(t){var i=new Date().toLocaleString("en-us",t);return i.length==1?"0"+i:i}var a=r("./lib/dom"),h=r("./lib/oop"),g=r("./lib/event_emitter").EventEmitter,c=r("./lib/lang"),s=r("./range").Range,o=r("./range_list").RangeList,d=r("./keyboard/hash_handler").HashHandler,f=r("./tokenizer").Tokenizer,S=r("./clipboard"),E={CURRENT_WORD:function(t){return t.session.getTextRange(t.session.getWordRange())},SELECTION:function(t,i,n){var p=t.session.getTextRange();return n?p.replace(/\n\r?([ \t]*\S)/g,`
`+n+"$1"):p},CURRENT_LINE:function(t){return t.session.getLine(t.getCursorPosition().row)},PREV_LINE:function(t){return t.session.getLine(t.getCursorPosition().row-1)},LINE_INDEX:function(t){return t.getCursorPosition().row},LINE_NUMBER:function(t){return t.getCursorPosition().row+1},SOFT_TABS:function(t){return t.session.getUseSoftTabs()?"YES":"NO"},TAB_SIZE:function(t){return t.session.getTabSize()},CLIPBOARD:function(t){return S.getText&&S.getText()},FILENAME:function(t){return/[^/\\]*$/.exec(this.FILEPATH(t))[0]},FILENAME_BASE:function(t){return/[^/\\]*$/.exec(this.FILEPATH(t))[0].replace(/\.[^.]*$/,"")},DIRECTORY:function(t){return this.FILEPATH(t).replace(/[^/\\]*$/,"")},FILEPATH:function(t){return"/not implemented.txt"},WORKSPACE_NAME:function(){return"Unknown"},FULLNAME:function(){return"Unknown"},BLOCK_COMMENT_START:function(t){var i=t.session.$mode||{};return i.blockComment&&i.blockComment.start||""},BLOCK_COMMENT_END:function(t){var i=t.session.$mode||{};return i.blockComment&&i.blockComment.end||""},LINE_COMMENT:function(t){var i=t.session.$mode||{};return i.lineCommentStart||""},CURRENT_YEAR:e.bind(null,{year:"numeric"}),CURRENT_YEAR_SHORT:e.bind(null,{year:"2-digit"}),CURRENT_MONTH:e.bind(null,{month:"numeric"}),CURRENT_MONTH_NAME:e.bind(null,{month:"long"}),CURRENT_MONTH_NAME_SHORT:e.bind(null,{month:"short"}),CURRENT_DATE:e.bind(null,{day:"2-digit"}),CURRENT_DAY_NAME:e.bind(null,{weekday:"long"}),CURRENT_DAY_NAME_SHORT:e.bind(null,{weekday:"short"}),CURRENT_HOUR:e.bind(null,{hour:"2-digit",hour12:!1}),CURRENT_MINUTE:e.bind(null,{minute:"2-digit"}),CURRENT_SECOND:e.bind(null,{second:"2-digit"})};E.SELECTED_TEXT=E.SELECTION;var m=function(){function t(){this.snippetMap={},this.snippetNameMap={},this.variables=E}return t.prototype.getTokenizer=function(){return t.$tokenizer||this.createTokenizer()},t.prototype.createTokenizer=function(){function i(u){return u=u.substr(1),/^\d+$/.test(u)?[{tabstopId:parseInt(u,10)}]:[{text:u}]}function n(u){return"(?:[^\\\\"+u+"]|\\\\.)"}var p={regex:"/("+n("/")+"+)/",onMatch:function(u,x,w){var _=w[0];return _.fmtString=!0,_.guard=u.slice(1,-1),_.flag="",""},next:"formatString"};return t.$tokenizer=new f({start:[{regex:/\\./,onMatch:function(u,x,w){var _=u[1];return(_=="}"&&w.length||"`$\\".indexOf(_)!=-1)&&(u=_),[u]}},{regex:/}/,onMatch:function(u,x,w){return[w.length?w.shift():u]}},{regex:/\$(?:\d+|\w+)/,onMatch:i},{regex:/\$\{[\dA-Z_a-z]+/,onMatch:function(u,x,w){var _=i(u.substr(1));return w.unshift(_[0]),_},next:"snippetVar"},{regex:/\n/,token:"newline",merge:!1}],snippetVar:[{regex:"\\|"+n("\\|")+"*\\|",onMatch:function(u,x,w){var _=u.slice(1,-1).replace(/\\[,|\\]|,/g,function($){return $.length==2?$[1]:"\0"}).split("\0").map(function($){return{value:$}});return w[0].choices=_,[_[0]]},next:"start"},p,{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"start"}],formatString:[{regex:/:/,onMatch:function(u,x,w){return w.length&&w[0].expectElse?(w[0].expectElse=!1,w[0].ifEnd={elseEnd:w[0]},[w[0].ifEnd]):":"}},{regex:/\\./,onMatch:function(u,x,w){var _=u[1];return _=="}"&&w.length||"`$\\".indexOf(_)!=-1?u=_:_=="n"?u=`
`:_=="t"?u="	":"ulULE".indexOf(_)!=-1&&(u={changeCase:_,local:_>"a"}),[u]}},{regex:"/\\w*}",onMatch:function(u,x,w){var _=w.shift();return _&&(_.flag=u.slice(1,-1)),this.next=_&&_.tabstopId?"start":"",[_||u]},next:"start"},{regex:/\$(?:\d+|\w+)/,onMatch:function(u,x,w){return[{text:u.slice(1)}]}},{regex:/\${\w+/,onMatch:function(u,x,w){var _={text:u.slice(2)};return w.unshift(_),[_]},next:"formatStringVar"},{regex:/\n/,token:"newline",merge:!1},{regex:/}/,onMatch:function(u,x,w){var _=w.shift();return this.next=_&&_.tabstopId?"start":"",[_||u]},next:"start"}],formatStringVar:[{regex:/:\/\w+}/,onMatch:function(u,x,w){var _=w[0];return _.formatFunction=u.slice(2,-1),[w.shift()]},next:"formatString"},p,{regex:/:[\?\-+]?/,onMatch:function(u,x,w){u[1]=="+"&&(w[0].ifEnd=w[0]),u[1]=="?"&&(w[0].expectElse=!0)},next:"formatString"},{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"formatString"}]}),t.$tokenizer},t.prototype.tokenizeTmSnippet=function(i,n){return this.getTokenizer().getLineTokens(i,n).tokens.map(function(p){return p.value||p})},t.prototype.getVariableValue=function(i,n,p){if(/^\d+$/.test(n))return(this.variables.__||{})[n]||"";if(/^[A-Z]\d+$/.test(n))return(this.variables[n[0]+"__"]||{})[n.substr(1)]||"";if(n=n.replace(/^TM_/,""),!this.variables.hasOwnProperty(n))return"";var u=this.variables[n];return typeof u=="function"&&(u=this.variables[n](i,n,p)),u==null?"":u},t.prototype.tmStrFormat=function(i,n,p){if(!n.fmt)return i;var u=n.flag||"",x=n.guard;x=new RegExp(x,u.replace(/[^gim]/g,""));var w=typeof n.fmt=="string"?this.tokenizeTmSnippet(n.fmt,"formatString"):n.fmt,_=this,$=i.replace(x,function(){var C=_.variables.__;_.variables.__=[].slice.call(arguments);for(var I=_.resolveVariables(w,p),N="E",L=0;L<I.length;L++){var z=I[L];if(typeof z=="object")if(I[L]="",z.changeCase&&z.local){var B=I[L+1];B&&typeof B=="string"&&(z.changeCase=="u"?I[L]=B[0].toUpperCase():I[L]=B[0].toLowerCase(),I[L+1]=B.substr(1))}else z.changeCase&&(N=z.changeCase);else N=="U"?I[L]=z.toUpperCase():N=="L"&&(I[L]=z.toLowerCase())}return _.variables.__=C,I.join("")});return $},t.prototype.tmFormatFunction=function(i,n,p){return n.formatFunction=="upcase"?i.toUpperCase():n.formatFunction=="downcase"?i.toLowerCase():i},t.prototype.resolveVariables=function(i,n){function p(N){var L=i.indexOf(N,_+1);L!=-1&&(_=L)}for(var u=[],x="",w=!0,_=0;_<i.length;_++){var $=i[_];if(typeof $=="string"){u.push($),$==`
`?(w=!0,x=""):w&&(x=/^\t*/.exec($)[0],w=/\S/.test($));continue}if($){if(w=!1,$.fmtString){var C=i.indexOf($,_+1);C==-1&&(C=i.length),$.fmt=i.slice(_+1,C),_=C}if($.text){var I=this.getVariableValue(n,$.text,x)+"";$.fmtString&&(I=this.tmStrFormat(I,$,n)),$.formatFunction&&(I=this.tmFormatFunction(I,$,n)),I&&!$.ifEnd?(u.push(I),p($)):!I&&$.ifEnd&&p($.ifEnd)}else $.elseEnd?p($.elseEnd):($.tabstopId!=null||$.changeCase!=null)&&u.push($)}}return u},t.prototype.getDisplayTextForSnippet=function(i,n){var p=v.call(this,i,n);return p.text},t.prototype.insertSnippetForSelection=function(i,n,p){p===void 0&&(p={});var u=v.call(this,i,n,p),x=i.getSelectionRange(),w=i.session.replace(x,u.text),_=new A(i),$=i.inVirtualSelectionMode&&i.selection.index;_.addTabstops(u.tabstops,x.start,w,$)},t.prototype.insertSnippet=function(i,n,p){p===void 0&&(p={});var u=this;if(i.inVirtualSelectionMode)return u.insertSnippetForSelection(i,n,p);i.forEachSelection(function(){u.insertSnippetForSelection(i,n,p)},null,{keepOrder:!0}),i.tabstopManager&&i.tabstopManager.tabNext()},t.prototype.$getScope=function(i){var n=i.session.$mode.$id||"";if(n=n.split("/").pop(),n==="html"||n==="php"){n==="php"&&!i.session.$mode.inlinePhp&&(n="html");var p=i.getCursorPosition(),u=i.session.getState(p.row);typeof u=="object"&&(u=u[0]),u.substring&&(u.substring(0,3)=="js-"?n="javascript":u.substring(0,4)=="css-"?n="css":u.substring(0,4)=="php-"&&(n="php"))}return n},t.prototype.getActiveScopes=function(i){var n=this.$getScope(i),p=[n],u=this.snippetMap;return u[n]&&u[n].includeScopes&&p.push.apply(p,u[n].includeScopes),p.push("_"),p},t.prototype.expandWithTab=function(i,n){var p=this,u=i.forEachSelection(function(){return p.expandSnippetForSelection(i,n)},null,{keepOrder:!0});return u&&i.tabstopManager&&i.tabstopManager.tabNext(),u},t.prototype.expandSnippetForSelection=function(i,n){var p=i.getCursorPosition(),u=i.session.getLine(p.row),x=u.substring(0,p.column),w=u.substr(p.column),_=this.snippetMap,$;return this.getActiveScopes(i).some(function(C){var I=_[C];return I&&($=this.findMatchingSnippet(I,x,w)),!!$},this),$?(n&&n.dryRun||(i.session.doc.removeInLine(p.row,p.column-$.replaceBefore.length,p.column+$.replaceAfter.length),this.variables.M__=$.matchBefore,this.variables.T__=$.matchAfter,this.insertSnippetForSelection(i,$.content),this.variables.M__=this.variables.T__=null),!0):!1},t.prototype.findMatchingSnippet=function(i,n,p){for(var u=i.length;u--;){var x=i[u];if(!(x.startRe&&!x.startRe.test(n))&&!(x.endRe&&!x.endRe.test(p))&&!(!x.startRe&&!x.endRe))return x.matchBefore=x.startRe?x.startRe.exec(n):[""],x.matchAfter=x.endRe?x.endRe.exec(p):[""],x.replaceBefore=x.triggerRe?x.triggerRe.exec(n)[0]:"",x.replaceAfter=x.endTriggerRe?x.endTriggerRe.exec(p)[0]:"",x}},t.prototype.register=function(i,n){function p(C){return C&&!/^\^?\(.*\)\$?$|^\\b$/.test(C)&&(C="(?:"+C+")"),C||""}function u(C,I,N){return C=p(C),I=p(I),N?(C=I+C,C&&C[C.length-1]!="$"&&(C+="$")):(C+=I,C&&C[0]!="^"&&(C="^"+C)),new RegExp(C)}function x(C){C.scope||(C.scope=n||"_"),n=C.scope,w[n]||(w[n]=[],_[n]={});var I=_[n];if(C.name){var N=I[C.name];N&&$.unregister(N),I[C.name]=C}w[n].push(C),C.prefix&&(C.tabTrigger=C.prefix),!C.content&&C.body&&(C.content=Array.isArray(C.body)?C.body.join(`
`):C.body),C.tabTrigger&&!C.trigger&&(!C.guard&&/^\w/.test(C.tabTrigger)&&(C.guard="\\b"),C.trigger=c.escapeRegExp(C.tabTrigger)),!(!C.trigger&&!C.guard&&!C.endTrigger&&!C.endGuard)&&(C.startRe=u(C.trigger,C.guard,!0),C.triggerRe=new RegExp(C.trigger),C.endRe=u(C.endTrigger,C.endGuard,!0),C.endTriggerRe=new RegExp(C.endTrigger))}var w=this.snippetMap,_=this.snippetNameMap,$=this;i||(i=[]),Array.isArray(i)?i.forEach(x):Object.keys(i).forEach(function(C){x(i[C])}),this._signal("registerSnippets",{scope:n})},t.prototype.unregister=function(i,n){function p(w){var _=x[w.scope||n];if(_&&_[w.name]){delete _[w.name];var $=u[w.scope||n],C=$&&$.indexOf(w);C>=0&&$.splice(C,1)}}var u=this.snippetMap,x=this.snippetNameMap;i.content?p(i):Array.isArray(i)&&i.forEach(p)},t.prototype.parseSnippetFile=function(i){i=i.replace(/\r/g,"");for(var n=[],p={},u=/^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm,x;x=u.exec(i);){if(x[1])try{p=JSON.parse(x[1]),n.push(p)}catch(C){}if(x[4])p.content=x[4].replace(/^\t/gm,""),n.push(p),p={};else{var w=x[2],_=x[3];if(w=="regex"){var $=/\/((?:[^\/\\]|\\.)*)|$/g;p.guard=$.exec(_)[1],p.trigger=$.exec(_)[1],p.endTrigger=$.exec(_)[1],p.endGuard=$.exec(_)[1]}else w=="snippet"?(p.tabTrigger=_.match(/^\S*/)[0],p.name||(p.name=_)):w&&(p[w]=_)}}return n},t.prototype.getSnippetByName=function(i,n){var p=this.snippetNameMap,u;return this.getActiveScopes(n).some(function(x){var w=p[x];return w&&(u=w[i]),!!u},this),u},t}();h.implement(m.prototype,g);var v=function(t,i,n){function p(D){for(var X=[],K=0;K<D.length;K++){var q=D[K];if(typeof q=="object"){if(I[q.tabstopId])continue;var ce=D.lastIndexOf(q,K-1);q=X[ce]||{tabstopId:q.tabstopId}}X[K]=q}return X}n===void 0&&(n={});var u=t.getCursorPosition(),x=t.session.getLine(u.row),w=t.session.getTabString(),_=x.match(/^\s*/)[0];u.column<_.length&&(_=_.slice(0,u.column)),i=i.replace(/\r/g,"");var $=this.tokenizeTmSnippet(i);$=this.resolveVariables($,t),$=$.map(function(D){return D==`
`&&!n.excludeExtraIndent?D+_:typeof D=="string"?D.replace(/\t/g,w):D});var C=[];$.forEach(function(D,X){if(typeof D=="object"){var K=D.tabstopId,q=C[K];if(q||(q=C[K]=[],q.index=K,q.value="",q.parents={}),q.indexOf(D)===-1){D.choices&&!q.choices&&(q.choices=D.choices),q.push(D);var ce=$.indexOf(D,X+1);if(ce!==-1){var le=$.slice(X+1,ce),we=le.some(function(Me){return typeof Me=="object"});we&&!q.value?q.value=le:le.length&&(!q.value||typeof q.value!="string")&&(q.value=le.join(""))}}}}),C.forEach(function(D){D.length=0});for(var I={},N=0;N<$.length;N++){var L=$[N];if(typeof L=="object"){var z=L.tabstopId,B=C[z],W=$.indexOf(L,N+1);if(I[z]){I[z]===L&&(delete I[z],Object.keys(I).forEach(function(D){B.parents[D]=!0}));continue}I[z]=L;var Q=B.value;typeof Q!="string"?Q=p(Q):L.fmt&&(Q=this.tmStrFormat(Q,L,t)),$.splice.apply($,[N+1,Math.max(0,W-N)].concat(Q,L)),B.indexOf(L)===-1&&B.push(L)}}var ne=0,J=0,G="";return $.forEach(function(D){if(typeof D=="string"){var X=D.split(`
`);X.length>1?(J=X[X.length-1].length,ne+=X.length-1):J+=D.length,G+=D}else D&&(D.start?D.end={row:ne,column:J}:D.start={row:ne,column:J})}),{text:G,tabstops:C,tokens:$}},A=function(){function t(i){if(this.index=0,this.ranges=[],this.tabstops=[],i.tabstopManager)return i.tabstopManager;i.tabstopManager=this,this.$onChange=this.onChange.bind(this),this.$onChangeSelection=c.delayedCall(this.onChangeSelection.bind(this)).schedule,this.$onChangeSession=this.onChangeSession.bind(this),this.$onAfterExec=this.onAfterExec.bind(this),this.attach(i)}return t.prototype.attach=function(i){this.$openTabstops=null,this.selectedTabstop=null,this.editor=i,this.session=i.session,this.editor.on("change",this.$onChange),this.editor.on("changeSelection",this.$onChangeSelection),this.editor.on("changeSession",this.$onChangeSession),this.editor.commands.on("afterExec",this.$onAfterExec),this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)},t.prototype.detach=function(){this.tabstops.forEach(this.removeTabstopMarkers,this),this.ranges.length=0,this.tabstops.length=0,this.selectedTabstop=null,this.editor.off("change",this.$onChange),this.editor.off("changeSelection",this.$onChangeSelection),this.editor.off("changeSession",this.$onChangeSession),this.editor.commands.off("afterExec",this.$onAfterExec),this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.tabstopManager=null,this.session=null,this.editor=null},t.prototype.onChange=function(i){for(var n=i.action[0]=="r",p=this.selectedTabstop||{},u=p.parents||{},x=this.tabstops.slice(),w=0;w<x.length;w++){var _=x[w],$=_==p||u[_.index];if(_.rangeList.$bias=$?0:1,i.action=="remove"&&_!==p){var C=_.parents&&_.parents[p.index],I=_.rangeList.pointIndex(i.start,C);I=I<0?-I-1:I+1;var N=_.rangeList.pointIndex(i.end,C);N=N<0?-N-1:N-1;for(var L=_.rangeList.ranges.slice(I,N),z=0;z<L.length;z++)this.removeRange(L[z])}_.rangeList.$onChange(i)}var B=this.session;!this.$inChange&&n&&B.getLength()==1&&!B.getValue()&&this.detach()},t.prototype.updateLinkedFields=function(){var i=this.selectedTabstop;if(!(!i||!i.hasLinkedRanges||!i.firstNonLinked)){this.$inChange=!0;for(var n=this.session,p=n.getTextRange(i.firstNonLinked),u=0;u<i.length;u++){var x=i[u];if(x.linked){var w=x.original,_=l.snippetManager.tmStrFormat(p,w,this.editor);n.replace(x,_)}}this.$inChange=!1}},t.prototype.onAfterExec=function(i){i.command&&!i.command.readOnly&&this.updateLinkedFields()},t.prototype.onChangeSelection=function(){if(this.editor){for(var i=this.editor.selection.lead,n=this.editor.selection.anchor,p=this.editor.selection.isEmpty(),u=0;u<this.ranges.length;u++)if(!this.ranges[u].linked){var x=this.ranges[u].contains(i.row,i.column),w=p||this.ranges[u].contains(n.row,n.column);if(x&&w)return}this.detach()}},t.prototype.onChangeSession=function(){this.detach()},t.prototype.tabNext=function(i){var n=this.tabstops.length,p=this.index+(i||1);p=Math.min(Math.max(p,1),n),p==n&&(p=0),this.selectTabstop(p),this.updateTabstopMarkers(),p===0&&this.detach()},t.prototype.selectTabstop=function(i){this.$openTabstops=null;var n=this.tabstops[this.index];if(n&&this.addTabstopMarkers(n),this.index=i,n=this.tabstops[this.index],!(!n||!n.length)){this.selectedTabstop=n;var p=n.firstNonLinked||n;if(n.choices&&(p.cursor=p.start),this.editor.inVirtualSelectionMode)this.editor.selection.fromOrientedRange(p);else{var u=this.editor.multiSelect;u.toSingleRange(p);for(var x=0;x<n.length;x++)n.hasLinkedRanges&&n[x].linked||u.addRange(n[x].clone(),!0)}this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler),this.selectedTabstop&&this.selectedTabstop.choices&&this.editor.execCommand("startAutocomplete",{matches:this.selectedTabstop.choices})}},t.prototype.addTabstops=function(i,n,p){var u=this.useLink||!this.editor.getOption("enableMultiselect");if(this.$openTabstops||(this.$openTabstops=[]),!i[0]){var x=s.fromPoints(p,p);R(x.start,n),R(x.end,n),i[0]=[x],i[0].index=0}var w=this.index,_=[w+1,0],$=this.ranges,C=this.snippetId=(this.snippetId||0)+1;i.forEach(function(I,N){var L=this.$openTabstops[N]||I;L.snippetId=C;for(var z=0;z<I.length;z++){var B=I[z],W=s.fromPoints(B.start,B.end||B.start);P(W.start,n),P(W.end,n),W.original=B,W.tabstop=L,$.push(W),L!=I?L.unshift(W):L[z]=W,B.fmtString||L.firstNonLinked&&u?(W.linked=!0,L.hasLinkedRanges=!0):L.firstNonLinked||(L.firstNonLinked=W)}L.firstNonLinked||(L.hasLinkedRanges=!1),L===I&&(_.push(L),this.$openTabstops[N]=L),this.addTabstopMarkers(L),L.rangeList=L.rangeList||new o,L.rangeList.$bias=0,L.rangeList.addList(L)},this),_.length>2&&(this.tabstops.length&&_.push(_.splice(2,1)[0]),this.tabstops.splice.apply(this.tabstops,_))},t.prototype.addTabstopMarkers=function(i){var n=this.session;i.forEach(function(p){p.markerId||(p.markerId=n.addMarker(p,"ace_snippet-marker","text"))})},t.prototype.removeTabstopMarkers=function(i){var n=this.session;i.forEach(function(p){n.removeMarker(p.markerId),p.markerId=null})},t.prototype.updateTabstopMarkers=function(){if(this.selectedTabstop){var i=this.selectedTabstop.snippetId;this.selectedTabstop.index===0&&i--,this.tabstops.forEach(function(n){n.snippetId===i?this.addTabstopMarkers(n):this.removeTabstopMarkers(n)},this)}},t.prototype.removeRange=function(i){var n=i.tabstop.indexOf(i);n!=-1&&i.tabstop.splice(n,1),n=this.ranges.indexOf(i),n!=-1&&this.ranges.splice(n,1),n=i.tabstop.rangeList.ranges.indexOf(i),n!=-1&&i.tabstop.splice(n,1),this.session.removeMarker(i.markerId),i.tabstop.length||(n=this.tabstops.indexOf(i.tabstop),n!=-1&&this.tabstops.splice(n,1),this.tabstops.length||this.detach())},t}();A.prototype.keyboardHandler=new d,A.prototype.keyboardHandler.bindKeys({Tab:function(t){l.snippetManager&&l.snippetManager.expandWithTab(t)||(t.tabstopManager.tabNext(1),t.renderer.scrollCursorIntoView())},"Shift-Tab":function(t){t.tabstopManager.tabNext(-1),t.renderer.scrollCursorIntoView()},Esc:function(t){t.tabstopManager.detach()}});var P=function(t,i){t.row==0&&(t.column+=i.column),t.row+=i.row},R=function(t,i){t.row==i.row&&(t.column-=i.column),t.row-=i.row};a.importCssString(`
.ace_snippet-marker {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: rgba(194, 193, 208, 0.09);
    border: 1px dotted rgba(211, 208, 235, 0.62);
    position: absolute;
}`,"snippets.css",!1),l.snippetManager=new m;var k=r("./editor").Editor;(function(){this.insertSnippet=function(t,i){return l.snippetManager.insertSnippet(this,t,i)},this.expandSnippet=function(t){return l.snippetManager.expandWithTab(this,t)}}).call(k.prototype)}),ace.define("ace/autocomplete/popup",["require","exports","module","ace/virtual_renderer","ace/editor","ace/range","ace/lib/event","ace/lib/lang","ace/lib/dom","ace/config","ace/lib/useragent"],function(r,l,T){var e=r("../virtual_renderer").VirtualRenderer,a=r("../editor").Editor,h=r("../range").Range,g=r("../lib/event"),c=r("../lib/lang"),s=r("../lib/dom"),o=r("../config").nls,d=r("./../lib/useragent"),f=function(P){return"suggest-aria-id:".concat(P)},S=d.isSafari?"menu":"listbox",E=d.isSafari?"menuitem":"option",m=d.isSafari?"aria-current":"aria-selected",v=function(P){var R=new e(P);R.$maxLines=4;var k=new a(R);return k.setHighlightActiveLine(!1),k.setShowPrintMargin(!1),k.renderer.setShowGutter(!1),k.renderer.setHighlightGutterLine(!1),k.$mouseHandler.$focusTimeout=0,k.$highlightTagPending=!0,k},A=function(){function P(R){var k=s.createElement("div"),t=v(k);R&&R.appendChild(k),k.style.display="none",t.renderer.content.style.cursor="default",t.renderer.setStyle("ace_autocomplete"),t.renderer.$textLayer.element.setAttribute("role",S),t.renderer.$textLayer.element.setAttribute("aria-roledescription",o("autocomplete.popup.aria-roledescription","Autocomplete suggestions")),t.renderer.$textLayer.element.setAttribute("aria-label",o("autocomplete.popup.aria-label","Autocomplete suggestions")),t.renderer.textarea.setAttribute("aria-hidden","true"),t.setOption("displayIndentGuides",!1),t.setOption("dragDelay",150);var i=function(){};t.focus=i,t.$isFocused=!0,t.renderer.$cursorLayer.restartTimer=i,t.renderer.$cursorLayer.element.style.opacity="0",t.renderer.$maxLines=8,t.renderer.$keepTextAreaAtCursor=!1,t.setHighlightActiveLine(!1),t.session.highlight(""),t.session.$searchHighlight.clazz="ace_highlight-marker",t.on("mousedown",function($){var C=$.getDocumentPosition();t.selection.moveToPosition(C),u.start.row=u.end.row=C.row,$.stop()});var n,p=new h(-1,0,-1,1/0),u=new h(-1,0,-1,1/0);u.id=t.session.addMarker(u,"ace_active-line","fullLine"),t.setSelectOnHover=function($){$?p.id&&(t.session.removeMarker(p.id),p.id=null):p.id=t.session.addMarker(p,"ace_line-hover","fullLine")},t.setSelectOnHover(!1),t.on("mousemove",function($){if(!n){n=$;return}if(!(n.x==$.x&&n.y==$.y)){n=$,n.scrollTop=t.renderer.scrollTop,t.isMouseOver=!0;var C=n.getDocumentPosition().row;p.start.row!=C&&(p.id||t.setRow(C),w(C))}}),t.renderer.on("beforeRender",function(){if(n&&p.start.row!=-1){n.$pos=null;var $=n.getDocumentPosition().row;p.id||t.setRow($),w($,!0)}}),t.renderer.on("afterRender",function(){for(var $=t.renderer.$textLayer,C=$.config.firstRow,I=$.config.lastRow;C<=I;C++){var N=$.element.childNodes[C-$.config.firstRow];N.setAttribute("role",E),N.setAttribute("aria-roledescription",o("autocomplete.popup.item.aria-roledescription","item")),N.setAttribute("aria-setsize",t.data.length),N.setAttribute("aria-describedby","doc-tooltip"),N.setAttribute("aria-posinset",C+1);var L=t.getData(C);if(L){var z="".concat(L.caption||L.value).concat(L.meta?", ".concat(L.meta):"");N.setAttribute("aria-label",z)}var B=N.querySelectorAll(".ace_completion-highlight");B.forEach(function(W){W.setAttribute("role","mark")})}}),t.renderer.on("afterRender",function(){var $=t.getRow(),C=t.renderer.$textLayer,I=C.element.childNodes[$-C.config.firstRow],N=document.activeElement;if(I!==t.selectedNode&&t.selectedNode&&(s.removeCssClass(t.selectedNode,"ace_selected"),t.selectedNode.removeAttribute(m),t.selectedNode.removeAttribute("id")),N.removeAttribute("aria-activedescendant"),t.selectedNode=I,I){var L=f($);s.addCssClass(I,"ace_selected"),I.id=L,C.element.setAttribute("aria-activedescendant",L),N.setAttribute("aria-activedescendant",L),I.setAttribute(m,"true")}});var x=function(){w(-1)},w=function($,C){$!==p.start.row&&(p.start.row=p.end.row=$,C||t.session._emit("changeBackMarker"),t._emit("changeHoverMarker"))};t.getHoveredRow=function(){return p.start.row},g.addListener(t.container,"mouseout",function(){t.isMouseOver=!1,x()}),t.on("hide",x),t.on("changeSelection",x),t.session.doc.getLength=function(){return t.data.length},t.session.doc.getLine=function($){var C=t.data[$];return typeof C=="string"?C:C&&C.value||""};var _=t.session.bgTokenizer;return _.$tokenizeRow=function($){function C(D,X){D&&N.push({type:(I.className||"")+(X||""),value:D})}var I=t.data[$],N=[];if(!I)return N;typeof I=="string"&&(I={value:I});for(var L=I.caption||I.value||I.name,z=L.toLowerCase(),B=(t.filterText||"").toLowerCase(),W=0,Q=0,ne=0;ne<=B.length;ne++)if(ne!=Q&&(I.matchMask&1<<ne||ne==B.length)){var J=B.slice(Q,ne);Q=ne;var G=z.indexOf(J,W);if(G==-1)continue;C(L.slice(W,G),""),W=G+J.length,C(L.slice(G,W),"completion-highlight")}return C(L.slice(W,L.length),""),N.push({type:"completion-spacer",value:" "}),I.meta&&N.push({type:"completion-meta",value:I.meta}),I.message&&N.push({type:"completion-message",value:I.message}),N},_.$updateOnChange=i,_.start=i,t.session.$computeWidth=function(){return this.screenWidth=0},t.isOpen=!1,t.isTopdown=!1,t.autoSelect=!0,t.filterText="",t.isMouseOver=!1,t.data=[],t.setData=function($,C){t.filterText=C||"",t.setValue(c.stringRepeat(`
`,$.length),-1),t.data=$||[],t.setRow(0)},t.getData=function($){return t.data[$]},t.getRow=function(){return u.start.row},t.setRow=function($){$=Math.max(this.autoSelect?0:-1,Math.min(this.data.length-1,$)),u.start.row!=$&&(t.selection.clearSelection(),u.start.row=u.end.row=$||0,t.session._emit("changeBackMarker"),t.moveCursorTo($||0,0),t.isOpen&&t._signal("select"))},t.on("changeSelection",function(){t.isOpen&&t.setRow(t.selection.lead.row),t.renderer.scrollCursorIntoView()}),t.hide=function(){this.container.style.display="none",t.anchorPos=null,t.anchor=null,t.isOpen&&(t.isOpen=!1,this._signal("hide"))},t.tryShow=function($,C,I,N){if(!N&&t.isOpen&&t.anchorPos&&t.anchor&&t.anchorPos.top===$.top&&t.anchorPos.left===$.left&&t.anchor===I)return!0;var L=this.container,z=this.renderer.scrollBar.width||10,B=window.innerHeight-z,W=window.innerWidth-z,Q=this.renderer,ne=Q.$maxLines*C*1.4,J={top:0,bottom:0,left:0},G=B-$.top-3*this.$borderSize-C,D=$.top-3*this.$borderSize;I||(D<=G||G>=ne?I="bottom":I="top"),I==="top"?(J.bottom=$.top-this.$borderSize,J.top=J.bottom-ne):I==="bottom"&&(J.top=$.top+C+this.$borderSize,J.bottom=J.top+ne);var X=J.top>=0&&J.bottom<=B;if(!N&&!X)return!1;X?Q.$maxPixelHeight=null:I==="top"?Q.$maxPixelHeight=D:Q.$maxPixelHeight=G,I==="top"?(L.style.top="",L.style.bottom=B+z-J.bottom+"px",t.isTopdown=!1):(L.style.top=J.top+"px",L.style.bottom="",t.isTopdown=!0),L.style.display="";var K=$.left;return K+L.offsetWidth>W&&(K=W-L.offsetWidth),L.style.left=K+"px",L.style.right="",t.isOpen||(t.isOpen=!0,this._signal("show"),n=null),t.anchorPos=$,t.anchor=I,!0},t.show=function($,C,I){this.tryShow($,C,I?"bottom":void 0,!0)},t.goTo=function($){var C=this.getRow(),I=this.session.getLength()-1;switch($){case"up":C=C<=0?I:C-1;break;case"down":C=C>=I?-1:C+1;break;case"start":C=0;break;case"end":C=I}this.setRow(C)},t.getTextLeftOffset=function(){return this.$borderSize+this.renderer.$padding+this.$imageSize},t.$imageSize=0,t.$borderSize=1,t}return P}();s.importCssString(`
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
`,"autocompletion.css",!1),l.AcePopup=A,l.$singleLineEditor=v,l.getAriaId=f}),ace.define("ace/autocomplete/inline_screenreader",["require","exports","module"],function(r,l,T){var e=function(){function a(h){this.editor=h,this.screenReaderDiv=document.createElement("div"),this.screenReaderDiv.classList.add("ace_screenreader-only"),this.editor.container.appendChild(this.screenReaderDiv)}return a.prototype.setScreenReaderContent=function(h){for(!this.popup&&this.editor.completer&&this.editor.completer.popup&&(this.popup=this.editor.completer.popup,this.popup.renderer.on("afterRender",function(){var c=this.popup.getRow(),s=this.popup.renderer.$textLayer,o=s.element.childNodes[c-s.config.firstRow];if(o){for(var d="doc-tooltip ",f=0;f<this._lines.length;f++)d+="ace-inline-screenreader-line-".concat(f," ");o.setAttribute("aria-describedby",d)}}.bind(this)));this.screenReaderDiv.firstChild;)this.screenReaderDiv.removeChild(this.screenReaderDiv.firstChild);this._lines=h.split(/\r\n|\r|\n/);var g=this.createCodeBlock();this.screenReaderDiv.appendChild(g)},a.prototype.destroy=function(){this.screenReaderDiv.remove()},a.prototype.createCodeBlock=function(){var h=document.createElement("pre");h.setAttribute("id","ace-inline-screenreader");for(var g=0;g<this._lines.length;g++){var c=document.createElement("code");c.setAttribute("id","ace-inline-screenreader-line-".concat(g));var s=document.createTextNode(this._lines[g]);c.appendChild(s),h.appendChild(c)}return h},a}();l.AceInlineScreenReader=e}),ace.define("ace/autocomplete/inline",["require","exports","module","ace/snippets","ace/autocomplete/inline_screenreader"],function(r,l,T){var e=r("../snippets").snippetManager,a=r("./inline_screenreader").AceInlineScreenReader,h=function(){function g(){this.editor=null}return g.prototype.show=function(c,s,o){if(o=o||"",c&&this.editor&&this.editor!==c&&(this.hide(),this.editor=null,this.inlineScreenReader=null),!c||!s)return!1;this.inlineScreenReader||(this.inlineScreenReader=new a(c));var d=s.snippet?e.getDisplayTextForSnippet(c,s.snippet):s.value;return s.hideInlinePreview||!d||!d.startsWith(o)?!1:(this.editor=c,this.inlineScreenReader.setScreenReaderContent(d),d=d.slice(o.length),d===""?c.removeGhostText():c.setGhostText(d),!0)},g.prototype.isOpen=function(){return this.editor?!!this.editor.renderer.$ghostText:!1},g.prototype.hide=function(){return this.editor?(this.editor.removeGhostText(),!0):!1},g.prototype.destroy=function(){this.hide(),this.editor=null,this.inlineScreenReader&&(this.inlineScreenReader.destroy(),this.inlineScreenReader=null)},g}();l.AceInline=h}),ace.define("ace/autocomplete/util",["require","exports","module"],function(r,l,T){l.parForEach=function(a,h,g){var c=0,s=a.length;s===0&&g();for(var o=0;o<s;o++)h(a[o],function(d,f){c++,c===s&&g(d,f)})};var e=/[a-zA-Z_0-9\$\-\u00A2-\u2000\u2070-\uFFFF]/;l.retrievePrecedingIdentifier=function(a,h,g){g=g||e;for(var c=[],s=h-1;s>=0&&g.test(a[s]);s--)c.push(a[s]);return c.reverse().join("")},l.retrieveFollowingIdentifier=function(a,h,g){g=g||e;for(var c=[],s=h;s<a.length&&g.test(a[s]);s++)c.push(a[s]);return c},l.getCompletionPrefix=function(a){var h=a.getCursorPosition(),g=a.session.getLine(h.row),c;return a.completers.forEach(function(s){s.identifierRegexps&&s.identifierRegexps.forEach(function(o){!c&&o&&(c=this.retrievePrecedingIdentifier(g,h.column,o))}.bind(this))}.bind(this)),c||this.retrievePrecedingIdentifier(g,h.column)},l.triggerAutocomplete=function(a,g){var g=g==null?a.session.getPrecedingCharacter():g;return a.completers.some(function(c){if(c.triggerCharacters&&Array.isArray(c.triggerCharacters))return c.triggerCharacters.includes(g)})}}),ace.define("ace/autocomplete",["require","exports","module","ace/keyboard/hash_handler","ace/autocomplete/popup","ace/autocomplete/inline","ace/autocomplete/popup","ace/autocomplete/util","ace/lib/lang","ace/lib/dom","ace/snippets","ace/config","ace/lib/event","ace/lib/scroll"],function(r,l,T){var e=r("./keyboard/hash_handler").HashHandler,a=r("./autocomplete/popup").AcePopup,h=r("./autocomplete/inline").AceInline,g=r("./autocomplete/popup").getAriaId,c=r("./autocomplete/util"),s=r("./lib/lang"),o=r("./lib/dom"),d=r("./snippets").snippetManager,f=r("./config"),S=r("./lib/event"),E=r("./lib/scroll").preventParentScroll,m=function(R,k){k.completer&&k.completer.destroy()},v=function(){function R(){this.autoInsert=!1,this.autoSelect=!0,this.autoShown=!1,this.exactMatch=!1,this.inlineEnabled=!1,this.keyboardHandler=new e,this.keyboardHandler.bindKeys(this.commands),this.parentNode=null,this.setSelectOnHover=!1,this.hasSeen=new Set,this.showLoadingState=!1,this.stickySelectionDelay=500,this.blurListener=this.blurListener.bind(this),this.changeListener=this.changeListener.bind(this),this.mousedownListener=this.mousedownListener.bind(this),this.mousewheelListener=this.mousewheelListener.bind(this),this.onLayoutChange=this.onLayoutChange.bind(this),this.changeTimer=s.delayedCall(function(){this.updateCompletions(!0)}.bind(this)),this.tooltipTimer=s.delayedCall(this.updateDocTooltip.bind(this),50),this.popupTimer=s.delayedCall(this.$updatePopupPosition.bind(this),50),this.stickySelectionTimer=s.delayedCall(function(){this.stickySelection=!0}.bind(this),this.stickySelectionDelay),this.$firstOpenTimer=s.delayedCall(function(){var k=this.completionProvider&&this.completionProvider.initialPosition;this.autoShown||this.popup&&this.popup.isOpen||!k||this.editor.completers.length===0||(this.completions=new P(R.completionsForLoading),this.openPopup(this.editor,k.prefix,!1),this.popup.renderer.setStyle("ace_loading",!0))}.bind(this),this.stickySelectionDelay)}return Object.defineProperty(R,"completionsForLoading",{get:function(){return[{caption:f.nls("autocomplete.loading","Loading..."),value:""}]},enumerable:!1,configurable:!0}),R.prototype.$init=function(){return this.popup=new a(this.parentNode||document.body||document.documentElement),this.popup.on("click",function(k){this.insertMatch(),k.stop()}.bind(this)),this.popup.focus=this.editor.focus.bind(this.editor),this.popup.on("show",this.$onPopupShow.bind(this)),this.popup.on("hide",this.$onHidePopup.bind(this)),this.popup.on("select",this.$onPopupChange.bind(this)),S.addListener(this.popup.container,"mouseout",this.mouseOutListener.bind(this)),this.popup.on("changeHoverMarker",this.tooltipTimer.bind(null,null)),this.popup.renderer.on("afterRender",this.$onPopupRender.bind(this)),this.popup},R.prototype.$initInline=function(){if(!(!this.inlineEnabled||this.inlineRenderer))return this.inlineRenderer=new h,this.inlineRenderer},R.prototype.getPopup=function(){return this.popup||this.$init()},R.prototype.$onHidePopup=function(){this.inlineRenderer&&this.inlineRenderer.hide(),this.hideDocTooltip(),this.stickySelectionTimer.cancel(),this.popupTimer.cancel(),this.stickySelection=!1},R.prototype.$seen=function(k){!this.hasSeen.has(k)&&k&&k.completer&&k.completer.onSeen&&typeof k.completer.onSeen=="function"&&(k.completer.onSeen(this.editor,k),this.hasSeen.add(k))},R.prototype.$onPopupChange=function(k){if(this.inlineRenderer&&this.inlineEnabled){var t=k?null:this.popup.getData(this.popup.getRow());if(this.$updateGhostText(t),this.popup.isMouseOver&&this.setSelectOnHover){this.tooltipTimer.call(null,null);return}this.popupTimer.schedule(),this.tooltipTimer.schedule()}else this.popupTimer.call(null,null),this.tooltipTimer.call(null,null)},R.prototype.$updateGhostText=function(k){var t=this.base.row,i=this.base.column,n=this.editor.getCursorPosition().column,p=this.editor.session.getLine(t).slice(i,n);this.inlineRenderer.show(this.editor,k,p)?this.$seen(k):this.inlineRenderer.hide()},R.prototype.$onPopupRender=function(){var k=this.inlineRenderer&&this.inlineEnabled;if(this.completions&&this.completions.filtered&&this.completions.filtered.length>0)for(var t=this.popup.getFirstVisibleRow();t<=this.popup.getLastVisibleRow();t++){var i=this.popup.getData(t);i&&(!k||i.hideInlinePreview)&&this.$seen(i)}},R.prototype.$onPopupShow=function(k){this.$onPopupChange(k),this.stickySelection=!1,this.stickySelectionDelay>=0&&this.stickySelectionTimer.schedule(this.stickySelectionDelay)},R.prototype.observeLayoutChanges=function(){if(!(this.$elements||!this.editor)){window.addEventListener("resize",this.onLayoutChange,{passive:!0}),window.addEventListener("wheel",this.mousewheelListener);for(var k=this.editor.container.parentNode,t=[];k;)t.push(k),k.addEventListener("scroll",this.onLayoutChange,{passive:!0}),k=k.parentNode;this.$elements=t}},R.prototype.unObserveLayoutChanges=function(){var k=this;window.removeEventListener("resize",this.onLayoutChange,{passive:!0}),window.removeEventListener("wheel",this.mousewheelListener),this.$elements&&this.$elements.forEach(function(t){t.removeEventListener("scroll",k.onLayoutChange,{passive:!0})}),this.$elements=null},R.prototype.onLayoutChange=function(){if(!this.popup.isOpen)return this.unObserveLayoutChanges();this.$updatePopupPosition(),this.updateDocTooltip()},R.prototype.$updatePopupPosition=function(){var k=this.editor,t=k.renderer,i=t.layerConfig.lineHeight,n=t.$cursorLayer.getPixelPosition(this.base,!0);n.left-=this.popup.getTextLeftOffset();var p=k.container.getBoundingClientRect();n.top+=p.top-t.layerConfig.offset,n.left+=p.left-k.renderer.scrollLeft,n.left+=t.gutterWidth;var u={top:n.top,left:n.left};t.$ghostText&&t.$ghostTextWidget&&this.base.row===t.$ghostText.position.row&&(u.top+=t.$ghostTextWidget.el.offsetHeight);var x=k.container.getBoundingClientRect().bottom-i,w=x<u.top?{top:x,left:u.left}:u;this.popup.tryShow(w,i,"bottom")||this.popup.tryShow(n,i,"top")||this.popup.show(n,i)},R.prototype.openPopup=function(k,t,i){this.$firstOpenTimer.cancel(),this.popup||this.$init(),this.inlineEnabled&&!this.inlineRenderer&&this.$initInline(),this.popup.autoSelect=this.autoSelect,this.popup.setSelectOnHover(this.setSelectOnHover);var n=this.popup.getRow(),p=this.popup.data[n];this.popup.setData(this.completions.filtered,this.completions.filterText),this.editor.textInput.setAriaOptions&&this.editor.textInput.setAriaOptions({activeDescendant:g(this.popup.getRow()),inline:this.inlineEnabled}),k.keyBinding.addKeyboardHandler(this.keyboardHandler);var u;this.stickySelection&&(u=this.popup.data.indexOf(p)),(!u||u===-1)&&(u=0),this.popup.setRow(this.autoSelect?u:-1),u===n&&p!==this.completions.filtered[u]&&this.$onPopupChange();var x=this.inlineRenderer&&this.inlineEnabled;if(u===n&&x){var w=this.popup.getData(this.popup.getRow());this.$updateGhostText(w)}i||(this.popup.setTheme(k.getTheme()),this.popup.setFontSize(k.getFontSize()),this.$updatePopupPosition(),this.tooltipNode&&this.updateDocTooltip()),this.changeTimer.cancel(),this.observeLayoutChanges()},R.prototype.detach=function(){this.editor&&(this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.off("changeSelection",this.changeListener),this.editor.off("blur",this.blurListener),this.editor.off("mousedown",this.mousedownListener),this.editor.off("mousewheel",this.mousewheelListener)),this.$firstOpenTimer.cancel(),this.changeTimer.cancel(),this.hideDocTooltip(),this.completionProvider&&this.completionProvider.detach(),this.popup&&this.popup.isOpen&&this.popup.hide(),this.popup&&this.popup.renderer&&this.popup.renderer.off("afterRender",this.$onPopupRender),this.base&&this.base.detach(),this.activated=!1,this.completionProvider=this.completions=this.base=null,this.unObserveLayoutChanges()},R.prototype.changeListener=function(k){var t=this.editor.selection.lead;(t.row!=this.base.row||t.column<this.base.column)&&this.detach(),this.activated?this.changeTimer.schedule():this.detach()},R.prototype.blurListener=function(k){var t=document.activeElement,i=this.editor.textInput.getElement(),n=k.relatedTarget&&this.tooltipNode&&this.tooltipNode.contains(k.relatedTarget),p=this.popup&&this.popup.container;t!=i&&t.parentNode!=p&&!n&&t!=this.tooltipNode&&k.relatedTarget!=i&&this.detach()},R.prototype.mousedownListener=function(k){this.detach()},R.prototype.mousewheelListener=function(k){this.popup&&!this.popup.isMouseOver&&this.detach()},R.prototype.mouseOutListener=function(k){this.popup.isOpen&&this.$updatePopupPosition()},R.prototype.goTo=function(k){this.popup.goTo(k)},R.prototype.insertMatch=function(k,t){if(k||(k=this.popup.getData(this.popup.getRow())),!k)return!1;if(k.value==="")return this.detach();var i=this.completions,n=this.getCompletionProvider().insertMatch(this.editor,k,i.filterText,t);return this.completions==i&&this.detach(),n},R.prototype.showPopup=function(k,t){this.editor&&this.detach(),this.activated=!0,this.editor=k,k.completer!=this&&(k.completer&&k.completer.detach(),k.completer=this),k.on("changeSelection",this.changeListener),k.on("blur",this.blurListener),k.on("mousedown",this.mousedownListener),k.on("mousewheel",this.mousewheelListener),this.updateCompletions(!1,t)},R.prototype.getCompletionProvider=function(k){return this.completionProvider||(this.completionProvider=new A(k)),this.completionProvider},R.prototype.gatherCompletions=function(k,t){return this.getCompletionProvider().gatherCompletions(k,t)},R.prototype.updateCompletions=function(k,t){if(k&&this.base&&this.completions){var n=this.editor.getCursorPosition(),p=this.editor.session.getTextRange({start:this.base,end:n});if(p==this.completions.filterText)return;if(this.completions.setFilter(p),!this.completions.filtered.length)return this.detach();if(this.completions.filtered.length==1&&this.completions.filtered[0].value==p&&!this.completions.filtered[0].snippet)return this.detach();this.openPopup(this.editor,p,k);return}if(t&&t.matches){var n=this.editor.getSelectionRange().start;return this.base=this.editor.session.doc.createAnchor(n.row,n.column),this.base.$insertRight=!0,this.completions=new P(t.matches),this.getCompletionProvider().completions=this.completions,this.openPopup(this.editor,"",k)}var i=this.editor.getSession(),n=this.editor.getCursorPosition(),p=c.getCompletionPrefix(this.editor);this.base=i.doc.createAnchor(n.row,n.column-p.length),this.base.$insertRight=!0;var u={exactMatch:this.exactMatch,ignoreCaption:this.ignoreCaption};this.getCompletionProvider({prefix:p,pos:n}).provideCompletions(this.editor,u,function(x,w,_){var $=w.filtered,C=c.getCompletionPrefix(this.editor);if(this.$firstOpenTimer.cancel(),_){if(!$.length){var I=!this.autoShown&&this.emptyMessage;if(typeof I=="function"&&(I=this.emptyMessage(C)),I){var N=[{caption:I,value:""}];this.completions=new P(N),this.openPopup(this.editor,C,k),this.popup.renderer.setStyle("ace_loading",!1),this.popup.renderer.setStyle("ace_empty-message",!0);return}return this.detach()}if($.length==1&&$[0].value==C&&!$[0].snippet)return this.detach();if(this.autoInsert&&!this.autoShown&&$.length==1)return this.insertMatch($[0])}this.completions=!_&&this.showLoadingState?new P(R.completionsForLoading.concat($),w.filterText):w,this.openPopup(this.editor,C,k),this.popup.renderer.setStyle("ace_empty-message",!1),this.popup.renderer.setStyle("ace_loading",!_)}.bind(this)),this.showLoadingState&&!this.autoShown&&(!this.popup||!this.popup.isOpen)&&this.$firstOpenTimer.delay(this.stickySelectionDelay/2)},R.prototype.cancelContextMenu=function(){this.editor.$mouseHandler.cancelContextMenu()},R.prototype.updateDocTooltip=function(){var k=this.popup,t=this.completions&&this.completions.filtered,i=t&&(t[k.getHoveredRow()]||t[k.getRow()]),n=null;if(!i||!this.editor||!this.popup.isOpen)return this.hideDocTooltip();for(var p=this.editor.completers.length,u=0;u<p;u++){var x=this.editor.completers[u];if(x.getDocTooltip&&i.completerId===x.id){n=x.getDocTooltip(i);break}}if(!n&&typeof i!="string"&&(n=i),typeof n=="string"&&(n={docText:n}),!n||!n.docHTML&&!n.docText)return this.hideDocTooltip();this.showDocTooltip(n)},R.prototype.showDocTooltip=function(k){this.tooltipNode||(this.tooltipNode=o.createElement("div"),this.tooltipNode.style.margin="0",this.tooltipNode.style.pointerEvents="auto",this.tooltipNode.style.overscrollBehavior="contain",this.tooltipNode.tabIndex=-1,this.tooltipNode.onblur=this.blurListener.bind(this),this.tooltipNode.onclick=this.onTooltipClick.bind(this),this.tooltipNode.id="doc-tooltip",this.tooltipNode.setAttribute("role","tooltip"),this.tooltipNode.addEventListener("wheel",E));var t=this.editor.renderer.theme;this.tooltipNode.className="ace_tooltip ace_doc-tooltip "+(t.isDark?"ace_dark ":"")+(t.cssClass||"");var i=this.tooltipNode;k.docHTML?i.innerHTML=k.docHTML:k.docText&&(i.textContent=k.docText),i.parentNode||this.popup.container.appendChild(this.tooltipNode);var n=this.popup,p=n.container.getBoundingClientRect(),u=400,x=300,w=n.renderer.scrollBar.width||10,_=p.left,$=window.innerWidth-p.right-w,C=n.isTopdown?p.top:window.innerHeight-w-p.bottom,I=[Math.min($/u,1),Math.min(_/u,1),Math.min(C/x*.9)],N=Math.max.apply(Math,I),L=i.style;L.display="block",N==I[0]?(L.left=p.right+1+"px",L.right="",L.maxWidth=u*N+"px",L.top=p.top+"px",L.bottom="",L.maxHeight=Math.min(window.innerHeight-w-p.top,x)+"px"):N==I[1]?(L.right=window.innerWidth-p.left+"px",L.left="",L.maxWidth=u*N+"px",L.top=p.top+"px",L.bottom="",L.maxHeight=Math.min(window.innerHeight-w-p.top,x)+"px"):N==I[2]&&(L.left=window.innerWidth-p.left+"px",L.maxWidth=Math.min(u,window.innerWidth)+"px",n.isTopdown?(L.top=p.bottom+"px",L.left=p.left+"px",L.right="",L.bottom="",L.maxHeight=Math.min(window.innerHeight-w-p.bottom,x)+"px"):(L.top=n.container.offsetTop-i.offsetHeight+"px",L.left=p.left+"px",L.right="",L.bottom="",L.maxHeight=Math.min(n.container.offsetTop,x)+"px"))},R.prototype.hideDocTooltip=function(){if(this.tooltipTimer.cancel(),!!this.tooltipNode){var k=this.tooltipNode;!this.editor.isFocused()&&document.activeElement==k&&this.editor.focus(),this.tooltipNode=null,k.parentNode&&k.parentNode.removeChild(k)}},R.prototype.onTooltipClick=function(k){for(var t=k.target;t&&t!=this.tooltipNode;){if(t.nodeName=="A"&&t.href){t.rel="noreferrer",t.target="_blank";break}t=t.parentNode}},R.prototype.destroy=function(){if(this.detach(),this.popup){this.popup.destroy();var k=this.popup.container;k&&k.parentNode&&k.parentNode.removeChild(k)}this.editor&&this.editor.completer==this&&(this.editor.off("destroy",m),this.editor.completer=null),this.inlineRenderer=this.popup=this.editor=null},R.for=function(k){return k.completer instanceof R||(k.completer&&(k.completer.destroy(),k.completer=null),f.get("sharedPopups")?(R.$sharedInstance||(R.$sharedInstance=new R),k.completer=R.$sharedInstance):(k.completer=new R,k.once("destroy",m))),k.completer},R}();v.prototype.commands={Up:function(R){R.completer.goTo("up")},Down:function(R){R.completer.goTo("down")},"Ctrl-Up|Ctrl-Home":function(R){R.completer.goTo("start")},"Ctrl-Down|Ctrl-End":function(R){R.completer.goTo("end")},Esc:function(R){R.completer.detach()},Return:function(R){return R.completer.insertMatch()},"Shift-Return":function(R){R.completer.insertMatch(null,{deleteSuffix:!0})},Tab:function(R){var k=R.completer.insertMatch();if(k||R.tabstopManager)return k;R.completer.goTo("down")},Backspace:function(R){R.execCommand("backspace");var k=c.getCompletionPrefix(R);!k&&R.completer&&R.completer.detach()},PageUp:function(R){R.completer.popup.gotoPageUp()},PageDown:function(R){R.completer.popup.gotoPageDown()}},v.startCommand={name:"startAutocomplete",exec:function(R,k){var t=v.for(R);t.autoInsert=!1,t.autoSelect=!0,t.autoShown=!1,t.showPopup(R,k),t.cancelContextMenu()},bindKey:"Ctrl-Space|Ctrl-Shift-Space|Alt-Space"};var A=function(){function R(k){this.initialPosition=k,this.active=!0}return R.prototype.insertByIndex=function(k,t,i){return!this.completions||!this.completions.filtered?!1:this.insertMatch(k,this.completions.filtered[t],i)},R.prototype.insertMatch=function(k,t,i){if(!t)return!1;if(k.startOperation({command:{name:"insertMatch"}}),t.completer&&t.completer.insertMatch)t.completer.insertMatch(k,t);else{if(!this.completions)return!1;var n=this.completions.filterText.length,p=0;if(t.range&&t.range.start.row===t.range.end.row&&(n-=this.initialPosition.prefix.length,n+=this.initialPosition.pos.column-t.range.start.column,p+=t.range.end.column-this.initialPosition.pos.column),n||p){var u;k.selection.getAllRanges?u=k.selection.getAllRanges():u=[k.getSelectionRange()];for(var x=0,w;w=u[x];x++)w.start.column-=n,w.end.column+=p,k.session.remove(w)}t.snippet?d.insertSnippet(k,t.snippet):this.$insertString(k,t),t.completer&&t.completer.onInsert&&typeof t.completer.onInsert=="function"&&t.completer.onInsert(k,t),t.command&&t.command==="startAutocomplete"&&k.execCommand(t.command)}return k.endOperation(),!0},R.prototype.$insertString=function(k,t){var i=t.value||t;k.execCommand("insertstring",i)},R.prototype.gatherCompletions=function(k,t){var i=k.getSession(),n=k.getCursorPosition(),p=c.getCompletionPrefix(k),u=[];this.completers=k.completers;var x=k.completers.length;return k.completers.forEach(function(w,_){w.getCompletions(k,i,n,p,function($,C){w.hideInlinePreview&&(C=C.map(function(I){return Object.assign(I,{hideInlinePreview:w.hideInlinePreview})})),!$&&C&&(u=u.concat(C)),t(null,{prefix:c.getCompletionPrefix(k),matches:u,finished:--x===0})})}),!0},R.prototype.provideCompletions=function(k,t,i){var n=function(w){var _=w.prefix,$=w.matches;this.completions=new P($),t.exactMatch&&(this.completions.exactMatch=!0),t.ignoreCaption&&(this.completions.ignoreCaption=!0),this.completions.setFilter(_),(w.finished||this.completions.filtered.length)&&i(null,this.completions,w.finished)}.bind(this),p=!0,u=null;if(this.gatherCompletions(k,function(w,_){if(this.active){w&&(i(w,[],!0),this.detach());var $=_.prefix;if($.indexOf(_.prefix)===0){if(p){u=_;return}n(_)}}}.bind(this)),p=!1,u){var x=u;u=null,n(x)}},R.prototype.detach=function(){this.active=!1,this.completers&&this.completers.forEach(function(k){typeof k.cancel=="function"&&k.cancel()})},R}(),P=function(){function R(k,t){this.all=k,this.filtered=k,this.filterText=t||"",this.exactMatch=!1,this.ignoreCaption=!1}return R.prototype.setFilter=function(k){if(k.length>this.filterText&&k.lastIndexOf(this.filterText,0)===0)var t=this.filtered;else var t=this.all;this.filterText=k,t=this.filterCompletions(t,this.filterText),t=t.sort(function(n,p){return p.exactMatch-n.exactMatch||p.$score-n.$score||(n.caption||n.value).localeCompare(p.caption||p.value)});var i=null;t=t.filter(function(n){var p=n.snippet||n.caption||n.value;return p===i?!1:(i=p,!0)}),this.filtered=t},R.prototype.filterCompletions=function(k,t){var i=[],n=t.toUpperCase(),p=t.toLowerCase();e:for(var u=0,x;x=k[u];u++){if(x.skipFilter){x.$score=x.score,i.push(x);continue}var w=!this.ignoreCaption&&x.caption||x.value||x.snippet;if(w){var _=-1,$=0,C=0,I,N;if(this.exactMatch){if(t!==w.substr(0,t.length))continue e}else{var L=w.toLowerCase().indexOf(p);if(L>-1)C=L;else for(var z=0;z<t.length;z++){var B=w.indexOf(p[z],_+1),W=w.indexOf(n[z],_+1);if(I=B>=0&&(W<0||B<W)?B:W,I<0)continue e;N=I-_-1,N>0&&(_===-1&&(C+=10),C+=N,$|=1<<z),_=I}}x.matchMask=$,x.exactMatch=C?0:1,x.$score=(x.score||0)-C,i.push(x)}}return i},R}();l.Autocomplete=v,l.CompletionProvider=A,l.FilteredList=P}),ace.define("ace/autocomplete/text_completer",["require","exports","module","ace/range"],function(r,l,T){function e(c,s){var o=c.getTextRange(h.fromPoints({row:0,column:0},s));return o.split(g).length-1}function a(c,s){var o=e(c,s),d=c.getValue().split(g),f=Object.create(null),S=d[o];return d.forEach(function(E,m){if(!(!E||E===S)){var v=Math.abs(o-m),A=d.length-v;f[E]?f[E]=Math.max(A,f[E]):f[E]=A}}),f}var h=r("../range").Range,g=/[^a-zA-Z_0-9\$\-\u00C0-\u1FFF\u2C00-\uD7FF\w]+/;l.getCompletions=function(c,s,o,d,f){var S=a(s,o),E=Object.keys(S);f(null,E.map(function(m){return{caption:m,value:m,score:S[m],meta:"local"}}))}}),ace.define("ace/ext/language_tools",["require","exports","module","ace/snippets","ace/autocomplete","ace/config","ace/lib/lang","ace/autocomplete/util","ace/autocomplete/text_completer","ace/editor","ace/config"],function(r,l,T){var e=r("../snippets").snippetManager,a=r("../autocomplete").Autocomplete,h=r("../config"),g=r("../lib/lang"),c=r("../autocomplete/util"),s=r("../autocomplete/text_completer"),o={getCompletions:function(n,p,u,x,w){if(p.$mode.completer)return p.$mode.completer.getCompletions(n,p,u,x,w);var _=n.session.getState(u.row),$=p.$mode.getCompletions(_,p,u,x);$=$.map(function(C){return C.completerId=o.id,C}),w(null,$)},id:"keywordCompleter"},d=function(n){var p={};return n.replace(/\${(\d+)(:(.*?))?}/g,function(u,x,w,_){return p[x]=_||""}).replace(/\$(\d+?)/g,function(u,x){return p[x]})},f={getCompletions:function(n,p,u,x,w){var _=[],$=p.getTokenAt(u.row,u.column);$&&$.type.match(/(tag-name|tag-open|tag-whitespace|attribute-name|attribute-value)\.xml$/)?_.push("html-tag"):_=e.getActiveScopes(n);var C=e.snippetMap,I=[];_.forEach(function(N){for(var L=C[N]||[],z=L.length;z--;){var B=L[z],W=B.name||B.tabTrigger;W&&I.push({caption:W,snippet:B.content,meta:B.tabTrigger&&!B.name?B.tabTrigger+"⇥ ":"snippet",completerId:f.id})}},this),w(null,I)},getDocTooltip:function(n){n.snippet&&!n.docHTML&&(n.docHTML=["<b>",g.escapeHTML(n.caption),"</b>","<hr></hr>",g.escapeHTML(d(n.snippet))].join(""))},id:"snippetCompleter"},S=[f,s,o];l.setCompleters=function(n){S.length=0,n&&S.push.apply(S,n)},l.addCompleter=function(n){S.push(n)},l.textCompleter=s,l.keyWordCompleter=o,l.snippetCompleter=f;var E={name:"expandSnippet",exec:function(n){return e.expandWithTab(n)},bindKey:"Tab"},m=function(n,p){v(p.session.$mode)},v=function(n){typeof n=="string"&&(n=h.$modes[n]),n&&(e.files||(e.files={}),A(n.$id,n.snippetFileId),n.modes&&n.modes.forEach(v))},A=function(n,p){!p||!n||e.files[n]||(e.files[n]={},h.loadModule(p,function(u){u&&(e.files[n]=u,!u.snippets&&u.snippetText&&(u.snippets=e.parseSnippetFile(u.snippetText)),e.register(u.snippets||[],u.scope),u.includeScopes&&(e.snippetMap[u.scope].includeScopes=u.includeScopes,u.includeScopes.forEach(function(x){v("ace/mode/"+x)})))}))},P=function(n){var p=n.editor,u=p.completer&&p.completer.activated;if(n.command.name==="backspace")u&&!c.getCompletionPrefix(p)&&p.completer.detach();else if(n.command.name==="insertstring"&&!u){R=n;var x=n.editor.$liveAutocompletionDelay;x?k.delay(x):t(n)}},R,k=g.delayedCall(function(){t(R)},0),t=function(n){var p=n.editor,u=c.getCompletionPrefix(p),x=n.args,w=c.triggerAutocomplete(p,x);if(u&&u.length>=p.$liveAutocompletionThreshold||w){var _=a.for(p);_.autoShown=!0,_.showPopup(p)}},i=r("../editor").Editor;r("../config").defineOptions(i.prototype,"editor",{enableBasicAutocompletion:{set:function(n){n?(this.completers||(this.completers=Array.isArray(n)?n:S),this.commands.addCommand(a.startCommand)):this.commands.removeCommand(a.startCommand)},value:!1},enableLiveAutocompletion:{set:function(n){n?(this.completers||(this.completers=Array.isArray(n)?n:S),this.commands.on("afterExec",P)):this.commands.off("afterExec",P)},value:!1},liveAutocompletionDelay:{initialValue:0},liveAutocompletionThreshold:{initialValue:0},enableSnippets:{set:function(n){n?(this.commands.addCommand(E),this.on("changeMode",m),m(null,this)):(this.commands.removeCommand(E),this.off("changeMode",m))},value:!1}})}),function(){ace.require(["ace/ext/language_tools"],function(r){M&&(M.exports=r)})}()})(_r);var kr={exports:{}};(function(M,b){ace.define("ace/ext/searchbox-css",["require","exports","module"],function(r,l,T){T.exports=`

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
}`}),ace.define("ace/ext/searchbox",["require","exports","module","ace/lib/dom","ace/lib/lang","ace/lib/event","ace/ext/searchbox-css","ace/keyboard/hash_handler","ace/lib/keys","ace/config"],function(r,l,T){var e=r("../lib/dom"),a=r("../lib/lang"),h=r("../lib/event"),g=r("./searchbox-css"),c=r("../keyboard/hash_handler").HashHandler,s=r("../lib/keys"),o=r("../config").nls,d=999;e.importCssString(g,"ace_searchbox",!1);var f=function(){function m(v,A,P){this.activeInput,this.element=e.buildDom(["div",{class:"ace_search right"},["span",{action:"hide",class:"ace_searchbtn_close"}],["div",{class:"ace_search_form"},["input",{class:"ace_search_field",placeholder:o("search-box.find.placeholder","Search for"),spellcheck:"false"}],["span",{action:"findPrev",class:"ace_searchbtn prev"},"​"],["span",{action:"findNext",class:"ace_searchbtn next"},"​"],["span",{action:"findAll",class:"ace_searchbtn",title:"Alt-Enter"},o("search-box.find-all.text","All")]],["div",{class:"ace_replace_form"},["input",{class:"ace_search_field",placeholder:o("search-box.replace.placeholder","Replace with"),spellcheck:"false"}],["span",{action:"replaceAndFindNext",class:"ace_searchbtn"},o("search-box.replace-next.text","Replace")],["span",{action:"replaceAll",class:"ace_searchbtn"},o("search-box.replace-all.text","All")]],["div",{class:"ace_search_options"},["span",{action:"toggleReplace",class:"ace_button",title:o("search-box.toggle-replace.title","Toggle Replace mode"),style:"float:left;margin-top:-2px;padding:0 5px;"},"+"],["span",{class:"ace_search_counter"}],["span",{action:"toggleRegexpMode",class:"ace_button",title:o("search-box.toggle-regexp.title","RegExp Search")},".*"],["span",{action:"toggleCaseSensitive",class:"ace_button",title:o("search-box.toggle-case.title","CaseSensitive Search")},"Aa"],["span",{action:"toggleWholeWords",class:"ace_button",title:o("search-box.toggle-whole-word.title","Whole Word Search")},"\\b"],["span",{action:"searchInSelection",class:"ace_button",title:o("search-box.toggle-in-selection.title","Search In Selection")},"S"]]]),this.setSession=this.setSession.bind(this),this.$onEditorInput=this.onEditorInput.bind(this),this.$init(),this.setEditor(v),e.importCssString(g,"ace_searchbox",v.container),h.addListener(this.element,"touchstart",function(R){R.stopPropagation()},v)}return m.prototype.setEditor=function(v){v.searchBox=this,v.renderer.scroller.appendChild(this.element),this.editor=v},m.prototype.setSession=function(v){this.searchRange=null,this.$syncOptions(!0)},m.prototype.onEditorInput=function(){this.find(!1,!1,!0)},m.prototype.$initElements=function(v){this.searchBox=v.querySelector(".ace_search_form"),this.replaceBox=v.querySelector(".ace_replace_form"),this.searchOption=v.querySelector("[action=searchInSelection]"),this.replaceOption=v.querySelector("[action=toggleReplace]"),this.regExpOption=v.querySelector("[action=toggleRegexpMode]"),this.caseSensitiveOption=v.querySelector("[action=toggleCaseSensitive]"),this.wholeWordOption=v.querySelector("[action=toggleWholeWords]"),this.searchInput=this.searchBox.querySelector(".ace_search_field"),this.replaceInput=this.replaceBox.querySelector(".ace_search_field"),this.searchCounter=v.querySelector(".ace_search_counter")},m.prototype.$init=function(){var v=this.element;this.$initElements(v);var A=this;h.addListener(v,"mousedown",function(P){setTimeout(function(){A.activeInput.focus()},0),h.stopPropagation(P)}),h.addListener(v,"click",function(P){var R=P.target||P.srcElement,k=R.getAttribute("action");k&&A[k]?A[k]():A.$searchBarKb.commands[k]&&A.$searchBarKb.commands[k].exec(A),h.stopPropagation(P)}),h.addCommandKeyListener(v,function(P,R,k){var t=s.keyCodeToString(k),i=A.$searchBarKb.findKeyCommand(R,t);i&&i.exec&&(i.exec(A),h.stopEvent(P))}),this.$onChange=a.delayedCall(function(){A.find(!1,!1)}),h.addListener(this.searchInput,"input",function(){A.$onChange.schedule(20)}),h.addListener(this.searchInput,"focus",function(){A.activeInput=A.searchInput,A.searchInput.value&&A.highlight()}),h.addListener(this.replaceInput,"focus",function(){A.activeInput=A.replaceInput,A.searchInput.value&&A.highlight()})},m.prototype.setSearchRange=function(v){this.searchRange=v,v?this.searchRangeMarker=this.editor.session.addMarker(v,"ace_active-line"):this.searchRangeMarker&&(this.editor.session.removeMarker(this.searchRangeMarker),this.searchRangeMarker=null)},m.prototype.$syncOptions=function(v){e.setCssClass(this.replaceOption,"checked",this.searchRange),e.setCssClass(this.searchOption,"checked",this.searchOption.checked),this.replaceOption.textContent=this.replaceOption.checked?"-":"+",e.setCssClass(this.regExpOption,"checked",this.regExpOption.checked),e.setCssClass(this.wholeWordOption,"checked",this.wholeWordOption.checked),e.setCssClass(this.caseSensitiveOption,"checked",this.caseSensitiveOption.checked);var A=this.editor.getReadOnly();this.replaceOption.style.display=A?"none":"",this.replaceBox.style.display=this.replaceOption.checked&&!A?"":"none",this.find(!1,!1,v)},m.prototype.highlight=function(v){this.editor.session.highlight(v||this.editor.$search.$options.re),this.editor.renderer.updateBackMarkers()},m.prototype.find=function(v,A,P){var R=this.editor.find(this.searchInput.value,{skipCurrent:v,backwards:A,wrap:!0,regExp:this.regExpOption.checked,caseSensitive:this.caseSensitiveOption.checked,wholeWord:this.wholeWordOption.checked,preventScroll:P,range:this.searchRange}),k=!R&&this.searchInput.value;e.setCssClass(this.searchBox,"ace_nomatch",k),this.editor._emit("findSearchBox",{match:!k}),this.highlight(),this.updateCounter()},m.prototype.updateCounter=function(){var v=this.editor,A=v.$search.$options.re,P=A.unicode,R=0,k=0;if(A){var t=this.searchRange?v.session.getTextRange(this.searchRange):v.getValue();v.$search.$isMultilineSearch(v.getLastSearchOptions())&&(t=t.replace(/\r\n|\r|\n/g,`
`),v.session.doc.$autoNewLine=`
`);var i=v.session.doc.positionToIndex(v.selection.anchor);this.searchRange&&(i-=v.session.doc.positionToIndex(this.searchRange.start));for(var n=A.lastIndex=0,p;(p=A.exec(t))&&(R++,n=p.index,n<=i&&k++,!(R>d||!p[0]&&(A.lastIndex=n+=a.skipEmptyMatch(t,n,P),n>=t.length))););}this.searchCounter.textContent=o("search-box.search-counter","$0 of $1",[k,R>d?d+"+":R])},m.prototype.findNext=function(){this.find(!0,!1)},m.prototype.findPrev=function(){this.find(!0,!0)},m.prototype.findAll=function(){var v=this.editor.findAll(this.searchInput.value,{regExp:this.regExpOption.checked,caseSensitive:this.caseSensitiveOption.checked,wholeWord:this.wholeWordOption.checked}),A=!v&&this.searchInput.value;e.setCssClass(this.searchBox,"ace_nomatch",A),this.editor._emit("findSearchBox",{match:!A}),this.highlight(),this.hide()},m.prototype.replace=function(){this.editor.getReadOnly()||this.editor.replace(this.replaceInput.value)},m.prototype.replaceAndFindNext=function(){this.editor.getReadOnly()||(this.editor.replace(this.replaceInput.value),this.findNext())},m.prototype.replaceAll=function(){this.editor.getReadOnly()||this.editor.replaceAll(this.replaceInput.value)},m.prototype.hide=function(){this.active=!1,this.setSearchRange(null),this.editor.off("changeSession",this.setSession),this.editor.off("input",this.$onEditorInput),this.element.style.display="none",this.editor.keyBinding.removeKeyboardHandler(this.$closeSearchBarKb),this.editor.focus()},m.prototype.show=function(v,A){this.active=!0,this.editor.on("changeSession",this.setSession),this.editor.on("input",this.$onEditorInput),this.element.style.display="",this.replaceOption.checked=A,this.editor.$search.$options.regExp&&(v=a.escapeRegExp(v)),v&&(this.searchInput.value=v),this.searchInput.focus(),this.searchInput.select(),this.editor.keyBinding.addKeyboardHandler(this.$closeSearchBarKb),this.$syncOptions(!0)},m.prototype.isFocused=function(){var v=document.activeElement;return v==this.searchInput||v==this.replaceInput},m}(),S=new c;S.bindKeys({"Ctrl-f|Command-f":function(m){var v=m.isReplace=!m.isReplace;m.replaceBox.style.display=v?"":"none",m.replaceOption.checked=!1,m.$syncOptions(),m.searchInput.focus()},"Ctrl-H|Command-Option-F":function(m){m.editor.getReadOnly()||(m.replaceOption.checked=!0,m.$syncOptions(),m.replaceInput.focus())},"Ctrl-G|Command-G":function(m){m.findNext()},"Ctrl-Shift-G|Command-Shift-G":function(m){m.findPrev()},esc:function(m){setTimeout(function(){m.hide()})},Return:function(m){m.activeInput==m.replaceInput&&m.replace(),m.findNext()},"Shift-Return":function(m){m.activeInput==m.replaceInput&&m.replace(),m.findPrev()},"Alt-Return":function(m){m.activeInput==m.replaceInput&&m.replaceAll(),m.findAll()},Tab:function(m){(m.activeInput==m.replaceInput?m.searchInput:m.replaceInput).focus()}}),S.addCommands([{name:"toggleRegexpMode",bindKey:{win:"Alt-R|Alt-/",mac:"Ctrl-Alt-R|Ctrl-Alt-/"},exec:function(m){m.regExpOption.checked=!m.regExpOption.checked,m.$syncOptions()}},{name:"toggleCaseSensitive",bindKey:{win:"Alt-C|Alt-I",mac:"Ctrl-Alt-R|Ctrl-Alt-I"},exec:function(m){m.caseSensitiveOption.checked=!m.caseSensitiveOption.checked,m.$syncOptions()}},{name:"toggleWholeWords",bindKey:{win:"Alt-B|Alt-W",mac:"Ctrl-Alt-B|Ctrl-Alt-W"},exec:function(m){m.wholeWordOption.checked=!m.wholeWordOption.checked,m.$syncOptions()}},{name:"toggleReplace",exec:function(m){m.replaceOption.checked=!m.replaceOption.checked,m.$syncOptions()}},{name:"searchInSelection",exec:function(m){m.searchOption.checked=!m.searchRange,m.setSearchRange(m.searchOption.checked&&m.editor.getSelectionRange()),m.$syncOptions()}}]);var E=new c([{bindKey:"Esc",name:"closeSearchBar",exec:function(m){m.searchBox.hide()}}]);f.prototype.$searchBarKb=S,f.prototype.$closeSearchBarKb=E,l.SearchBox=f,l.Search=function(m,v){var A=m.searchBox||new f(m);A.show(m.session.getTextRange(),v)}}),function(){ace.require(["ace/ext/searchbox"],function(r){M&&(M.exports=r)})}()})(kr);var Le={},gt={},Ye={exports:{}};Ye.exports;(function(M,b){var r=200,l="__lodash_hash_undefined__",T=1,e=2,a=9007199254740991,h="[object Arguments]",g="[object Array]",c="[object AsyncFunction]",s="[object Boolean]",o="[object Date]",d="[object Error]",f="[object Function]",S="[object GeneratorFunction]",E="[object Map]",m="[object Number]",v="[object Null]",A="[object Object]",P="[object Promise]",R="[object Proxy]",k="[object RegExp]",t="[object Set]",i="[object String]",n="[object Symbol]",p="[object Undefined]",u="[object WeakMap]",x="[object ArrayBuffer]",w="[object DataView]",_="[object Float32Array]",$="[object Float64Array]",C="[object Int8Array]",I="[object Int16Array]",N="[object Int32Array]",L="[object Uint8Array]",z="[object Uint8ClampedArray]",B="[object Uint16Array]",W="[object Uint32Array]",Q=/[\\^$.*+?()[\]{}|]/g,ne=/^\[object .+?Constructor\]$/,J=/^(?:0|[1-9]\d*)$/,G={};G[_]=G[$]=G[C]=G[I]=G[N]=G[L]=G[z]=G[B]=G[W]=!0,G[h]=G[g]=G[x]=G[s]=G[w]=G[o]=G[d]=G[f]=G[E]=G[m]=G[A]=G[k]=G[t]=G[i]=G[u]=!1;var D=typeof re=="object"&&re&&re.Object===Object&&re,X=typeof self=="object"&&self&&self.Object===Object&&self,K=D||X||Function("return this")(),q=b&&!b.nodeType&&b,ce=q&&!0&&M&&!M.nodeType&&M,le=ce&&ce.exports===q,we=le&&D.process,Me=function(){try{return we&&we.binding&&we.binding("util")}catch(y){}}(),xt=Me&&Me.isTypedArray;function on(y,O){for(var F=-1,j=y==null?0:y.length,Z=0,V=[];++F<j;){var te=y[F];O(te,F,y)&&(V[Z++]=te)}return V}function sn(y,O){for(var F=-1,j=O.length,Z=y.length;++F<j;)y[Z+F]=O[F];return y}function an(y,O){for(var F=-1,j=y==null?0:y.length;++F<j;)if(O(y[F],F,y))return!0;return!1}function cn(y,O){for(var F=-1,j=Array(y);++F<y;)j[F]=O(F);return j}function ln(y){return function(O){return y(O)}}function pn(y,O){return y.has(O)}function hn(y,O){return y==null?void 0:y[O]}function un(y){var O=-1,F=Array(y.size);return y.forEach(function(j,Z){F[++O]=[Z,j]}),F}function dn(y,O){return function(F){return y(O(F))}}function gn(y){var O=-1,F=Array(y.size);return y.forEach(function(j){F[++O]=j}),F}var fn=Array.prototype,mn=Function.prototype,Be=Object.prototype,et=K["__core-js_shared__"],wt=mn.toString,ge=Be.hasOwnProperty,_t=function(){var y=/[^.]+$/.exec(et&&et.keys&&et.keys.IE_PROTO||"");return y?"Symbol(src)_1."+y:""}(),kt=Be.toString,bn=RegExp("^"+wt.call(ge).replace(Q,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),$t=le?K.Buffer:void 0,je=K.Symbol,St=K.Uint8Array,Ct=Be.propertyIsEnumerable,vn=fn.splice,_e=je?je.toStringTag:void 0,Tt=Object.getOwnPropertySymbols,yn=$t?$t.isBuffer:void 0,xn=dn(Object.keys,Object),tt=Re(K,"DataView"),Pe=Re(K,"Map"),nt=Re(K,"Promise"),rt=Re(K,"Set"),it=Re(K,"WeakMap"),Fe=Re(Object,"create"),wn=Se(tt),_n=Se(Pe),kn=Se(nt),$n=Se(rt),Sn=Se(it),Et=je?je.prototype:void 0,ot=Et?Et.valueOf:void 0;function ke(y){var O=-1,F=y==null?0:y.length;for(this.clear();++O<F;){var j=y[O];this.set(j[0],j[1])}}function Cn(){this.__data__=Fe?Fe(null):{},this.size=0}function Tn(y){var O=this.has(y)&&delete this.__data__[y];return this.size-=O?1:0,O}function En(y){var O=this.__data__;if(Fe){var F=O[y];return F===l?void 0:F}return ge.call(O,y)?O[y]:void 0}function An(y){var O=this.__data__;return Fe?O[y]!==void 0:ge.call(O,y)}function Mn(y,O){var F=this.__data__;return this.size+=this.has(y)?0:1,F[y]=Fe&&O===void 0?l:O,this}ke.prototype.clear=Cn,ke.prototype.delete=Tn,ke.prototype.get=En,ke.prototype.has=An,ke.prototype.set=Mn;function fe(y){var O=-1,F=y==null?0:y.length;for(this.clear();++O<F;){var j=y[O];this.set(j[0],j[1])}}function Rn(){this.__data__=[],this.size=0}function On(y){var O=this.__data__,F=Ue(O,y);if(F<0)return!1;var j=O.length-1;return F==j?O.pop():vn.call(O,F,1),--this.size,!0}function Ln(y){var O=this.__data__,F=Ue(O,y);return F<0?void 0:O[F][1]}function In(y){return Ue(this.__data__,y)>-1}function Pn(y,O){var F=this.__data__,j=Ue(F,y);return j<0?(++this.size,F.push([y,O])):F[j][1]=O,this}fe.prototype.clear=Rn,fe.prototype.delete=On,fe.prototype.get=Ln,fe.prototype.has=In,fe.prototype.set=Pn;function $e(y){var O=-1,F=y==null?0:y.length;for(this.clear();++O<F;){var j=y[O];this.set(j[0],j[1])}}function Fn(){this.size=0,this.__data__={hash:new ke,map:new(Pe||fe),string:new ke}}function Nn(y){var O=qe(this,y).delete(y);return this.size-=O?1:0,O}function zn(y){return qe(this,y).get(y)}function Dn(y){return qe(this,y).has(y)}function Bn(y,O){var F=qe(this,y),j=F.size;return F.set(y,O),this.size+=F.size==j?0:1,this}$e.prototype.clear=Fn,$e.prototype.delete=Nn,$e.prototype.get=zn,$e.prototype.has=Dn,$e.prototype.set=Bn;function He(y){var O=-1,F=y==null?0:y.length;for(this.__data__=new $e;++O<F;)this.add(y[O])}function jn(y){return this.__data__.set(y,l),this}function Hn(y){return this.__data__.has(y)}He.prototype.add=He.prototype.push=jn,He.prototype.has=Hn;function ve(y){var O=this.__data__=new fe(y);this.size=O.size}function Un(){this.__data__=new fe,this.size=0}function qn(y){var O=this.__data__,F=O.delete(y);return this.size=O.size,F}function Wn(y){return this.__data__.get(y)}function Vn(y){return this.__data__.has(y)}function Gn(y,O){var F=this.__data__;if(F instanceof fe){var j=F.__data__;if(!Pe||j.length<r-1)return j.push([y,O]),this.size=++F.size,this;F=this.__data__=new $e(j)}return F.set(y,O),this.size=F.size,this}ve.prototype.clear=Un,ve.prototype.delete=qn,ve.prototype.get=Wn,ve.prototype.has=Vn,ve.prototype.set=Gn;function Kn(y,O){var F=We(y),j=!F&&lr(y),Z=!F&&!j&&st(y),V=!F&&!j&&!Z&&Nt(y),te=F||j||Z||V,ie=te?cn(y.length,String):[],oe=ie.length;for(var ee in y)(O||ge.call(y,ee))&&!(te&&(ee=="length"||Z&&(ee=="offset"||ee=="parent")||V&&(ee=="buffer"||ee=="byteLength"||ee=="byteOffset")||ir(ee,oe)))&&ie.push(ee);return ie}function Ue(y,O){for(var F=y.length;F--;)if(Lt(y[F][0],O))return F;return-1}function Xn(y,O,F){var j=O(y);return We(y)?j:sn(j,F(y))}function Ne(y){return y==null?y===void 0?p:v:_e&&_e in Object(y)?nr(y):cr(y)}function At(y){return ze(y)&&Ne(y)==h}function Mt(y,O,F,j,Z){return y===O?!0:y==null||O==null||!ze(y)&&!ze(O)?y!==y&&O!==O:Yn(y,O,F,j,Mt,Z)}function Yn(y,O,F,j,Z,V){var te=We(y),ie=We(O),oe=te?g:ye(y),ee=ie?g:ye(O);oe=oe==h?A:oe,ee=ee==h?A:ee;var ae=oe==A,ue=ee==A,se=oe==ee;if(se&&st(y)){if(!st(O))return!1;te=!0,ae=!1}if(se&&!ae)return V||(V=new ve),te||Nt(y)?Rt(y,O,F,j,Z,V):er(y,O,oe,F,j,Z,V);if(!(F&T)){var pe=ae&&ge.call(y,"__wrapped__"),he=ue&&ge.call(O,"__wrapped__");if(pe||he){var xe=pe?y.value():y,me=he?O.value():O;return V||(V=new ve),Z(xe,me,F,j,V)}}return se?(V||(V=new ve),tr(y,O,F,j,Z,V)):!1}function Jn(y){if(!Ft(y)||sr(y))return!1;var O=It(y)?bn:ne;return O.test(Se(y))}function Zn(y){return ze(y)&&Pt(y.length)&&!!G[Ne(y)]}function Qn(y){if(!ar(y))return xn(y);var O=[];for(var F in Object(y))ge.call(y,F)&&F!="constructor"&&O.push(F);return O}function Rt(y,O,F,j,Z,V){var te=F&T,ie=y.length,oe=O.length;if(ie!=oe&&!(te&&oe>ie))return!1;var ee=V.get(y);if(ee&&V.get(O))return ee==O;var ae=-1,ue=!0,se=F&e?new He:void 0;for(V.set(y,O),V.set(O,y);++ae<ie;){var pe=y[ae],he=O[ae];if(j)var xe=te?j(he,pe,ae,O,y,V):j(pe,he,ae,y,O,V);if(xe!==void 0){if(xe)continue;ue=!1;break}if(se){if(!an(O,function(me,Ce){if(!pn(se,Ce)&&(pe===me||Z(pe,me,F,j,V)))return se.push(Ce)})){ue=!1;break}}else if(!(pe===he||Z(pe,he,F,j,V))){ue=!1;break}}return V.delete(y),V.delete(O),ue}function er(y,O,F,j,Z,V,te){switch(F){case w:if(y.byteLength!=O.byteLength||y.byteOffset!=O.byteOffset)return!1;y=y.buffer,O=O.buffer;case x:return!(y.byteLength!=O.byteLength||!V(new St(y),new St(O)));case s:case o:case m:return Lt(+y,+O);case d:return y.name==O.name&&y.message==O.message;case k:case i:return y==O+"";case E:var ie=un;case t:var oe=j&T;if(ie||(ie=gn),y.size!=O.size&&!oe)return!1;var ee=te.get(y);if(ee)return ee==O;j|=e,te.set(y,O);var ae=Rt(ie(y),ie(O),j,Z,V,te);return te.delete(y),ae;case n:if(ot)return ot.call(y)==ot.call(O)}return!1}function tr(y,O,F,j,Z,V){var te=F&T,ie=Ot(y),oe=ie.length,ee=Ot(O),ae=ee.length;if(oe!=ae&&!te)return!1;for(var ue=oe;ue--;){var se=ie[ue];if(!(te?se in O:ge.call(O,se)))return!1}var pe=V.get(y);if(pe&&V.get(O))return pe==O;var he=!0;V.set(y,O),V.set(O,y);for(var xe=te;++ue<oe;){se=ie[ue];var me=y[se],Ce=O[se];if(j)var zt=te?j(Ce,me,se,O,y,V):j(me,Ce,se,y,O,V);if(!(zt===void 0?me===Ce||Z(me,Ce,F,j,V):zt)){he=!1;break}xe||(xe=se=="constructor")}if(he&&!xe){var Ve=y.constructor,Ge=O.constructor;Ve!=Ge&&"constructor"in y&&"constructor"in O&&!(typeof Ve=="function"&&Ve instanceof Ve&&typeof Ge=="function"&&Ge instanceof Ge)&&(he=!1)}return V.delete(y),V.delete(O),he}function Ot(y){return Xn(y,ur,rr)}function qe(y,O){var F=y.__data__;return or(O)?F[typeof O=="string"?"string":"hash"]:F.map}function Re(y,O){var F=hn(y,O);return Jn(F)?F:void 0}function nr(y){var O=ge.call(y,_e),F=y[_e];try{y[_e]=void 0;var j=!0}catch(V){}var Z=kt.call(y);return j&&(O?y[_e]=F:delete y[_e]),Z}var rr=Tt?function(y){return y==null?[]:(y=Object(y),on(Tt(y),function(O){return Ct.call(y,O)}))}:dr,ye=Ne;(tt&&ye(new tt(new ArrayBuffer(1)))!=w||Pe&&ye(new Pe)!=E||nt&&ye(nt.resolve())!=P||rt&&ye(new rt)!=t||it&&ye(new it)!=u)&&(ye=function(y){var O=Ne(y),F=O==A?y.constructor:void 0,j=F?Se(F):"";if(j)switch(j){case wn:return w;case _n:return E;case kn:return P;case $n:return t;case Sn:return u}return O});function ir(y,O){return O=O==null?a:O,!!O&&(typeof y=="number"||J.test(y))&&y>-1&&y%1==0&&y<O}function or(y){var O=typeof y;return O=="string"||O=="number"||O=="symbol"||O=="boolean"?y!=="__proto__":y===null}function sr(y){return!!_t&&_t in y}function ar(y){var O=y&&y.constructor,F=typeof O=="function"&&O.prototype||Be;return y===F}function cr(y){return kt.call(y)}function Se(y){if(y!=null){try{return wt.call(y)}catch(O){}try{return y+""}catch(O){}}return""}function Lt(y,O){return y===O||y!==y&&O!==O}var lr=At(function(){return arguments}())?At:function(y){return ze(y)&&ge.call(y,"callee")&&!Ct.call(y,"callee")},We=Array.isArray;function pr(y){return y!=null&&Pt(y.length)&&!It(y)}var st=yn||gr;function hr(y,O){return Mt(y,O)}function It(y){if(!Ft(y))return!1;var O=Ne(y);return O==f||O==S||O==c||O==R}function Pt(y){return typeof y=="number"&&y>-1&&y%1==0&&y<=a}function Ft(y){var O=typeof y;return y!=null&&(O=="object"||O=="function")}function ze(y){return y!=null&&typeof y=="object"}var Nt=xt?ln(xt):Zn;function ur(y){return pr(y)?Kn(y):Qn(y)}function dr(){return[]}function gr(){return!1}M.exports=hr})(Ye,Ye.exports);var Gt=Ye.exports,de={};Object.defineProperty(de,"__esModule",{value:!0});de.getAceInstance=de.debounce=de.editorEvents=de.editorOptions=void 0;var $r=["minLines","maxLines","readOnly","highlightActiveLine","tabSize","enableBasicAutocompletion","enableLiveAutocompletion","enableSnippets"];de.editorOptions=$r;var Sr=["onChange","onFocus","onInput","onBlur","onCopy","onPaste","onSelectionChange","onCursorChange","onScroll","handleOptions","updateRef"];de.editorEvents=Sr;var Cr=function(){var M;return typeof window=="undefined"?(re.window={},M=Xe,delete re.window):window.ace?(M=window.ace,M.acequire=window.ace.require||window.ace.acequire):M=Xe,M};de.getAceInstance=Cr;var Tr=function(M,b){var r=null;return function(){var l=this,T=arguments;clearTimeout(r),r=setTimeout(function(){M.apply(l,T)},b)}};de.debounce=Tr;var Er=re&&re.__extends||function(){var M=function(b,r){return M=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(l,T){l.__proto__=T}||function(l,T){for(var e in T)Object.prototype.hasOwnProperty.call(T,e)&&(l[e]=T[e])},M(b,r)};return function(b,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");M(b,r);function l(){this.constructor=b}b.prototype=r===null?Object.create(r):(l.prototype=r.prototype,new l)}}(),pt=re&&re.__assign||function(){return pt=Object.assign||function(M){for(var b,r=1,l=arguments.length;r<l;r++){b=arguments[r];for(var T in b)Object.prototype.hasOwnProperty.call(b,T)&&(M[T]=b[T])}return M},pt.apply(this,arguments)};Object.defineProperty(gt,"__esModule",{value:!0});var Ar=Xe,H=ut,Dt=dt,Ke=Gt,Oe=de,Bt=(0,Oe.getAceInstance)(),Mr=function(M){Er(b,M);function b(r){var l=M.call(this,r)||this;return Oe.editorEvents.forEach(function(T){l[T]=l[T].bind(l)}),l.debounce=Oe.debounce,l}return b.prototype.isInShadow=function(r){for(var l=r&&r.parentNode;l;){if(l.toString()==="[object ShadowRoot]")return!0;l=l.parentNode}return!1},b.prototype.componentDidMount=function(){var r=this,l=this.props,T=l.className,e=l.onBeforeLoad,a=l.onValidate,h=l.mode,g=l.focus,c=l.theme,s=l.fontSize,o=l.value,d=l.defaultValue,f=l.showGutter,S=l.wrapEnabled,E=l.showPrintMargin,m=l.scrollMargin,v=m===void 0?[0,0,0,0]:m,A=l.keyboardHandler,P=l.onLoad,R=l.commands,k=l.annotations,t=l.markers,i=l.placeholder;this.editor=Bt.edit(this.refEditor),e&&e(Bt);for(var n=Object.keys(this.props.editorProps),p=0;p<n.length;p++)this.editor[n[p]]=this.props.editorProps[n[p]];this.props.debounceChangePeriod&&(this.onChange=this.debounce(this.onChange,this.props.debounceChangePeriod)),this.editor.renderer.setScrollMargin(v[0],v[1],v[2],v[3]),this.isInShadow(this.refEditor)&&this.editor.renderer.attachToShadowRoot(),this.editor.getSession().setMode(typeof h=="string"?"ace/mode/".concat(h):h),c&&c!==""&&this.editor.setTheme("ace/theme/".concat(c)),this.editor.setFontSize(typeof s=="number"?"".concat(s,"px"):s),this.editor.getSession().setValue(d||o||""),this.props.navigateToFileEnd&&this.editor.navigateFileEnd(),this.editor.renderer.setShowGutter(f),this.editor.getSession().setUseWrapMode(S),this.editor.setShowPrintMargin(E),this.editor.on("focus",this.onFocus),this.editor.on("blur",this.onBlur),this.editor.on("copy",this.onCopy),this.editor.on("paste",this.onPaste),this.editor.on("change",this.onChange),this.editor.on("input",this.onInput),i&&this.updatePlaceholder(),this.editor.getSession().selection.on("changeSelection",this.onSelectionChange),this.editor.getSession().selection.on("changeCursor",this.onCursorChange),a&&this.editor.getSession().on("changeAnnotation",function(){var x=r.editor.getSession().getAnnotations();r.props.onValidate(x)}),this.editor.session.on("changeScrollTop",this.onScroll),this.editor.getSession().setAnnotations(k||[]),t&&t.length>0&&this.handleMarkers(t);var u=this.editor.$options;Oe.editorOptions.forEach(function(x){u.hasOwnProperty(x)?r.editor.setOption(x,r.props[x]):r.props[x]}),this.handleOptions(this.props),Array.isArray(R)&&R.forEach(function(x){typeof x.exec=="string"?r.editor.commands.bindKey(x.bindKey,x.exec):r.editor.commands.addCommand(x)}),A&&this.editor.setKeyboardHandler("ace/keyboard/"+A),T&&(this.refEditor.className+=" "+T),P&&P(this.editor),this.editor.resize(),g&&this.editor.focus()},b.prototype.componentDidUpdate=function(r){for(var l=r,T=this.props,e=0;e<Oe.editorOptions.length;e++){var a=Oe.editorOptions[e];T[a]!==l[a]&&this.editor.setOption(a,T[a])}if(T.className!==l.className){var h=this.refEditor.className,g=h.trim().split(" "),c=l.className.trim().split(" ");c.forEach(function(d){var f=g.indexOf(d);g.splice(f,1)}),this.refEditor.className=" "+T.className+" "+g.join(" ")}var s=this.editor&&T.value!=null&&this.editor.getValue()!==T.value;if(s){this.silent=!0;var o=this.editor.session.selection.toJSON();this.editor.setValue(T.value,T.cursorStart),this.editor.session.selection.fromJSON(o),this.silent=!1}T.placeholder!==l.placeholder&&this.updatePlaceholder(),T.mode!==l.mode&&this.editor.getSession().setMode(typeof T.mode=="string"?"ace/mode/".concat(T.mode):T.mode),T.theme!==l.theme&&this.editor.setTheme("ace/theme/"+T.theme),T.keyboardHandler!==l.keyboardHandler&&(T.keyboardHandler?this.editor.setKeyboardHandler("ace/keyboard/"+T.keyboardHandler):this.editor.setKeyboardHandler(null)),T.fontSize!==l.fontSize&&this.editor.setFontSize(typeof T.fontSize=="number"?"".concat(T.fontSize,"px"):T.fontSize),T.wrapEnabled!==l.wrapEnabled&&this.editor.getSession().setUseWrapMode(T.wrapEnabled),T.showPrintMargin!==l.showPrintMargin&&this.editor.setShowPrintMargin(T.showPrintMargin),T.showGutter!==l.showGutter&&this.editor.renderer.setShowGutter(T.showGutter),Ke(T.setOptions,l.setOptions)||this.handleOptions(T),(s||!Ke(T.annotations,l.annotations))&&this.editor.getSession().setAnnotations(T.annotations||[]),!Ke(T.markers,l.markers)&&Array.isArray(T.markers)&&this.handleMarkers(T.markers),Ke(T.scrollMargin,l.scrollMargin)||this.handleScrollMargins(T.scrollMargin),(r.height!==this.props.height||r.width!==this.props.width)&&this.editor.resize(),this.props.focus&&!r.focus&&this.editor.focus()},b.prototype.handleScrollMargins=function(r){r===void 0&&(r=[0,0,0,0]),this.editor.renderer.setScrollMargin(r[0],r[1],r[2],r[3])},b.prototype.componentWillUnmount=function(){this.editor&&(this.editor.destroy(),this.editor=null)},b.prototype.onChange=function(r){if(this.props.onChange&&!this.silent){var l=this.editor.getValue();this.props.onChange(l,r)}},b.prototype.onSelectionChange=function(r){if(this.props.onSelectionChange){var l=this.editor.getSelection();this.props.onSelectionChange(l,r)}},b.prototype.onCursorChange=function(r){if(this.props.onCursorChange){var l=this.editor.getSelection();this.props.onCursorChange(l,r)}},b.prototype.onInput=function(r){this.props.onInput&&this.props.onInput(r),this.props.placeholder&&this.updatePlaceholder()},b.prototype.onFocus=function(r){this.props.onFocus&&this.props.onFocus(r,this.editor)},b.prototype.onBlur=function(r){this.props.onBlur&&this.props.onBlur(r,this.editor)},b.prototype.onCopy=function(r){var l=r.text;this.props.onCopy&&this.props.onCopy(l)},b.prototype.onPaste=function(r){var l=r.text;this.props.onPaste&&this.props.onPaste(l)},b.prototype.onScroll=function(){this.props.onScroll&&this.props.onScroll(this.editor)},b.prototype.handleOptions=function(r){for(var l=Object.keys(r.setOptions),T=0;T<l.length;T++)this.editor.setOption(l[T],r.setOptions[l[T]])},b.prototype.handleMarkers=function(r){var l=this,T=this.editor.getSession().getMarkers(!0);for(var e in T)T.hasOwnProperty(e)&&this.editor.getSession().removeMarker(T[e].id);T=this.editor.getSession().getMarkers(!1);for(var e in T)T.hasOwnProperty(e)&&T[e].clazz!=="ace_active-line"&&T[e].clazz!=="ace_selected-word"&&this.editor.getSession().removeMarker(T[e].id);r.forEach(function(a){var h=a.startRow,g=a.startCol,c=a.endRow,s=a.endCol,o=a.className,d=a.type,f=a.inFront,S=f===void 0?!1:f,E=new Ar.Range(h,g,c,s);l.editor.getSession().addMarker(E,o,d,S)})},b.prototype.updatePlaceholder=function(){var r=this.editor,l=this.props.placeholder,T=!r.session.getValue().length,e=r.renderer.placeholderNode;!T&&e?(r.renderer.scroller.removeChild(r.renderer.placeholderNode),r.renderer.placeholderNode=null):T&&!e?(e=r.renderer.placeholderNode=document.createElement("div"),e.textContent=l||"",e.className="ace_comment ace_placeholder",e.style.padding="0 9px",e.style.position="absolute",e.style.zIndex="3",r.renderer.scroller.appendChild(e)):T&&e&&(e.textContent=l)},b.prototype.updateRef=function(r){this.refEditor=r},b.prototype.render=function(){var r=this.props,l=r.name,T=r.width,e=r.height,a=r.style,h=pt({width:T,height:e},a);return Dt.createElement("div",{ref:this.updateRef,id:l,style:h})},b.propTypes={mode:H.oneOfType([H.string,H.object]),focus:H.bool,theme:H.string,name:H.string,className:H.string,height:H.string,width:H.string,fontSize:H.oneOfType([H.number,H.string]),showGutter:H.bool,onChange:H.func,onCopy:H.func,onPaste:H.func,onFocus:H.func,onInput:H.func,onBlur:H.func,onScroll:H.func,value:H.string,defaultValue:H.string,onLoad:H.func,onSelectionChange:H.func,onCursorChange:H.func,onBeforeLoad:H.func,onValidate:H.func,minLines:H.number,maxLines:H.number,readOnly:H.bool,highlightActiveLine:H.bool,tabSize:H.number,showPrintMargin:H.bool,cursorStart:H.number,debounceChangePeriod:H.number,editorProps:H.object,setOptions:H.object,style:H.object,scrollMargin:H.array,annotations:H.array,markers:H.array,keyboardHandler:H.string,wrapEnabled:H.bool,enableSnippets:H.bool,enableBasicAutocompletion:H.oneOfType([H.bool,H.array]),enableLiveAutocompletion:H.oneOfType([H.bool,H.array]),navigateToFileEnd:H.bool,commands:H.array,placeholder:H.string},b.defaultProps={name:"ace-editor",focus:!1,mode:"",theme:"",height:"500px",width:"500px",fontSize:12,enableSnippets:!1,showGutter:!0,onChange:null,onPaste:null,onLoad:null,onScroll:null,minLines:null,maxLines:null,readOnly:!1,highlightActiveLine:!0,showPrintMargin:!0,tabSize:4,cursorStart:1,editorProps:{},style:{},scrollMargin:[0,0,0,0],setOptions:{},wrapEnabled:!1,enableBasicAutocompletion:!1,enableLiveAutocompletion:!1,placeholder:null,navigateToFileEnd:!0},b}(Dt.Component);gt.default=Mr;var ft={},Je={},Kt={exports:{}};(function(M,b){ace.define("ace/split",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/lib/event_emitter","ace/editor","ace/virtual_renderer","ace/edit_session"],function(r,l,T){var e=r("./lib/oop");r("./lib/lang");var a=r("./lib/event_emitter").EventEmitter,h=r("./editor").Editor,g=r("./virtual_renderer").VirtualRenderer,c=r("./edit_session").EditSession,s;s=function(o,d,f){this.BELOW=1,this.BESIDE=0,this.$container=o,this.$theme=d,this.$splits=0,this.$editorCSS="",this.$editors=[],this.$orientation=this.BESIDE,this.setSplits(f||1),this.$cEditor=this.$editors[0],this.on("focus",function(S){this.$cEditor=S}.bind(this))},function(){e.implement(this,a),this.$createEditor=function(){var o=document.createElement("div");o.className=this.$editorCSS,o.style.cssText="position: absolute; top:0px; bottom:0px",this.$container.appendChild(o);var d=new h(new g(o,this.$theme));return d.on("focus",function(){this._emit("focus",d)}.bind(this)),this.$editors.push(d),d.setFontSize(this.$fontSize),d},this.setSplits=function(o){var d;if(o<1)throw"The number of splits have to be > 0!";if(o!=this.$splits){if(o>this.$splits){for(;this.$splits<this.$editors.length&&this.$splits<o;)d=this.$editors[this.$splits],this.$container.appendChild(d.container),d.setFontSize(this.$fontSize),this.$splits++;for(;this.$splits<o;)this.$createEditor(),this.$splits++}else for(;this.$splits>o;)d=this.$editors[this.$splits-1],this.$container.removeChild(d.container),this.$splits--;this.resize()}},this.getSplits=function(){return this.$splits},this.getEditor=function(o){return this.$editors[o]},this.getCurrentEditor=function(){return this.$cEditor},this.focus=function(){this.$cEditor.focus()},this.blur=function(){this.$cEditor.blur()},this.setTheme=function(o){this.$editors.forEach(function(d){d.setTheme(o)})},this.setKeyboardHandler=function(o){this.$editors.forEach(function(d){d.setKeyboardHandler(o)})},this.forEach=function(o,d){this.$editors.forEach(o,d)},this.$fontSize="",this.setFontSize=function(o){this.$fontSize=o,this.forEach(function(d){d.setFontSize(o)})},this.$cloneSession=function(o){var d=new c(o.getDocument(),o.getMode()),f=o.getUndoManager();return d.setUndoManager(f),d.setTabSize(o.getTabSize()),d.setUseSoftTabs(o.getUseSoftTabs()),d.setOverwrite(o.getOverwrite()),d.setBreakpoints(o.getBreakpoints()),d.setUseWrapMode(o.getUseWrapMode()),d.setUseWorker(o.getUseWorker()),d.setWrapLimitRange(o.$wrapLimitRange.min,o.$wrapLimitRange.max),d.$foldData=o.$cloneFoldData(),d},this.setSession=function(o,d){var f;d==null?f=this.$cEditor:f=this.$editors[d];var S=this.$editors.some(function(E){return E.session===o});return S&&(o=this.$cloneSession(o)),f.setSession(o),o},this.getOrientation=function(){return this.$orientation},this.setOrientation=function(o){this.$orientation!=o&&(this.$orientation=o,this.resize())},this.resize=function(){var o=this.$container.clientWidth,d=this.$container.clientHeight,f;if(this.$orientation==this.BESIDE)for(var S=o/this.$splits,E=0;E<this.$splits;E++)f=this.$editors[E],f.container.style.width=S+"px",f.container.style.top="0px",f.container.style.left=E*S+"px",f.container.style.height=d+"px",f.resize();else for(var m=d/this.$splits,E=0;E<this.$splits;E++)f=this.$editors[E],f.container.style.width=o+"px",f.container.style.top=E*m+"px",f.container.style.left="0px",f.container.style.height=m+"px",f.resize()}}.call(s.prototype),l.Split=s}),ace.define("ace/ext/split",["require","exports","module","ace/split"],function(r,l,T){T.exports=r("../split")}),function(){ace.require(["ace/ext/split"],function(r){M&&(M.exports=r)})}()})(Kt);var Rr=Kt.exports,Or="Expected a function",Xt="__lodash_hash_undefined__",Yt=1/0,Lr="[object Function]",Ir="[object GeneratorFunction]",Pr="[object Symbol]",Fr=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Nr=/^\w*$/,zr=/^\./,Dr=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Br=/[\\^$.*+?()[\]{}|]/g,jr=/\\(\\)?/g,Hr=/^\[object .+?Constructor\]$/,Ur=typeof re=="object"&&re&&re.Object===Object&&re,qr=typeof self=="object"&&self&&self.Object===Object&&self,mt=Ur||qr||Function("return this")();function Wr(M,b){return M==null?void 0:M[b]}function Vr(M){var b=!1;if(M!=null&&typeof M.toString!="function")try{b=!!(M+"")}catch(r){}return b}var Gr=Array.prototype,Kr=Function.prototype,Jt=Object.prototype,at=mt["__core-js_shared__"],jt=function(){var M=/[^.]+$/.exec(at&&at.keys&&at.keys.IE_PROTO||"");return M?"Symbol(src)_1."+M:""}(),Zt=Kr.toString,bt=Jt.hasOwnProperty,Qt=Jt.toString,Xr=RegExp("^"+Zt.call(bt).replace(Br,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Ht=mt.Symbol,Yr=Gr.splice,Jr=en(mt,"Map"),De=en(Object,"create"),Ut=Ht?Ht.prototype:void 0,qt=Ut?Ut.toString:void 0;function Ee(M){var b=-1,r=M?M.length:0;for(this.clear();++b<r;){var l=M[b];this.set(l[0],l[1])}}function Zr(){this.__data__=De?De(null):{}}function Qr(M){return this.has(M)&&delete this.__data__[M]}function ei(M){var b=this.__data__;if(De){var r=b[M];return r===Xt?void 0:r}return bt.call(b,M)?b[M]:void 0}function ti(M){var b=this.__data__;return De?b[M]!==void 0:bt.call(b,M)}function ni(M,b){var r=this.__data__;return r[M]=De&&b===void 0?Xt:b,this}Ee.prototype.clear=Zr;Ee.prototype.delete=Qr;Ee.prototype.get=ei;Ee.prototype.has=ti;Ee.prototype.set=ni;function Ie(M){var b=-1,r=M?M.length:0;for(this.clear();++b<r;){var l=M[b];this.set(l[0],l[1])}}function ri(){this.__data__=[]}function ii(M){var b=this.__data__,r=Ze(b,M);if(r<0)return!1;var l=b.length-1;return r==l?b.pop():Yr.call(b,r,1),!0}function oi(M){var b=this.__data__,r=Ze(b,M);return r<0?void 0:b[r][1]}function si(M){return Ze(this.__data__,M)>-1}function ai(M,b){var r=this.__data__,l=Ze(r,M);return l<0?r.push([M,b]):r[l][1]=b,this}Ie.prototype.clear=ri;Ie.prototype.delete=ii;Ie.prototype.get=oi;Ie.prototype.has=si;Ie.prototype.set=ai;function Ae(M){var b=-1,r=M?M.length:0;for(this.clear();++b<r;){var l=M[b];this.set(l[0],l[1])}}function ci(){this.__data__={hash:new Ee,map:new(Jr||Ie),string:new Ee}}function li(M){return Qe(this,M).delete(M)}function pi(M){return Qe(this,M).get(M)}function hi(M){return Qe(this,M).has(M)}function ui(M,b){return Qe(this,M).set(M,b),this}Ae.prototype.clear=ci;Ae.prototype.delete=li;Ae.prototype.get=pi;Ae.prototype.has=hi;Ae.prototype.set=ui;function Ze(M,b){for(var r=M.length;r--;)if(ki(M[r][0],b))return r;return-1}function di(M,b){b=bi(b,M)?[b]:mi(b);for(var r=0,l=b.length;M!=null&&r<l;)M=M[wi(b[r++])];return r&&r==l?M:void 0}function gi(M){if(!nn(M)||yi(M))return!1;var b=$i(M)||Vr(M)?Xr:Hr;return b.test(_i(M))}function fi(M){if(typeof M=="string")return M;if(yt(M))return qt?qt.call(M):"";var b=M+"";return b=="0"&&1/M==-Yt?"-0":b}function mi(M){return tn(M)?M:xi(M)}function Qe(M,b){var r=M.__data__;return vi(b)?r[typeof b=="string"?"string":"hash"]:r.map}function en(M,b){var r=Wr(M,b);return gi(r)?r:void 0}function bi(M,b){if(tn(M))return!1;var r=typeof M;return r=="number"||r=="symbol"||r=="boolean"||M==null||yt(M)?!0:Nr.test(M)||!Fr.test(M)||b!=null&&M in Object(b)}function vi(M){var b=typeof M;return b=="string"||b=="number"||b=="symbol"||b=="boolean"?M!=="__proto__":M===null}function yi(M){return!!jt&&jt in M}var xi=vt(function(M){M=Ci(M);var b=[];return zr.test(M)&&b.push(""),M.replace(Dr,function(r,l,T,e){b.push(T?e.replace(jr,"$1"):l||r)}),b});function wi(M){if(typeof M=="string"||yt(M))return M;var b=M+"";return b=="0"&&1/M==-Yt?"-0":b}function _i(M){if(M!=null){try{return Zt.call(M)}catch(b){}try{return M+""}catch(b){}}return""}function vt(M,b){if(typeof M!="function"||b&&typeof b!="function")throw new TypeError(Or);var r=function(){var l=arguments,T=b?b.apply(this,l):l[0],e=r.cache;if(e.has(T))return e.get(T);var a=M.apply(this,l);return r.cache=e.set(T,a),a};return r.cache=new(vt.Cache||Ae),r}vt.Cache=Ae;function ki(M,b){return M===b||M!==M&&b!==b}var tn=Array.isArray;function $i(M){var b=nn(M)?Qt.call(M):"";return b==Lr||b==Ir}function nn(M){var b=typeof M;return!!M&&(b=="object"||b=="function")}function Si(M){return!!M&&typeof M=="object"}function yt(M){return typeof M=="symbol"||Si(M)&&Qt.call(M)==Pr}function Ci(M){return M==null?"":fi(M)}function Ti(M,b,r){var l=M==null?void 0:di(M,b);return l===void 0?r:l}var Ei=Ti,Ai=re&&re.__extends||function(){var M=function(b,r){return M=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(l,T){l.__proto__=T}||function(l,T){for(var e in T)Object.prototype.hasOwnProperty.call(T,e)&&(l[e]=T[e])},M(b,r)};return function(b,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");M(b,r);function l(){this.constructor=b}b.prototype=r===null?Object.create(r):(l.prototype=r.prototype,new l)}}(),ht=re&&re.__assign||function(){return ht=Object.assign||function(M){for(var b,r=1,l=arguments.length;r<l;r++){b=arguments[r];for(var T in b)Object.prototype.hasOwnProperty.call(b,T)&&(M[T]=b[T])}return M},ht.apply(this,arguments)};Object.defineProperty(Je,"__esModule",{value:!0});var Te=de,ct=(0,Te.getAceInstance)(),Mi=Xe,Ri=Rr,U=ut,Wt=dt,lt=Gt,be=Ei,Oi=function(M){Ai(b,M);function b(r){var l=M.call(this,r)||this;return Te.editorEvents.forEach(function(T){l[T]=l[T].bind(l)}),l.debounce=Te.debounce,l}return b.prototype.isInShadow=function(r){for(var l=r&&r.parentNode;l;){if(l.toString()==="[object ShadowRoot]")return!0;l=l.parentNode}return!1},b.prototype.componentDidMount=function(){var r=this,l=this.props,T=l.className,e=l.onBeforeLoad,a=l.mode,h=l.focus,g=l.theme,c=l.fontSize,s=l.value,o=l.defaultValue,d=l.cursorStart,f=l.showGutter,S=l.wrapEnabled,E=l.showPrintMargin,m=l.scrollMargin,v=m===void 0?[0,0,0,0]:m,A=l.keyboardHandler,P=l.onLoad,R=l.commands,k=l.annotations,t=l.markers,i=l.splits;this.editor=ct.edit(this.refEditor),this.isInShadow(this.refEditor)&&this.editor.renderer.attachToShadowRoot(),this.editor.setTheme("ace/theme/".concat(g)),e&&e(ct);var n=Object.keys(this.props.editorProps),p=new Ri.Split(this.editor.container,"ace/theme/".concat(g),i);this.editor.env.split=p,this.splitEditor=p.getEditor(0),this.split=p,this.editor.setShowPrintMargin(!1),this.editor.renderer.setShowGutter(!1);var u=this.splitEditor.$options;this.props.debounceChangePeriod&&(this.onChange=this.debounce(this.onChange,this.props.debounceChangePeriod)),p.forEach(function(w,_){for(var $=0;$<n.length;$++)w[n[$]]=r.props.editorProps[n[$]];var C=be(o,_),I=be(s,_,"");w.session.setUndoManager(new ct.UndoManager),w.setTheme("ace/theme/".concat(g)),w.renderer.setScrollMargin(v[0],v[1],v[2],v[3]),w.getSession().setMode("ace/mode/".concat(a)),w.setFontSize(c),w.renderer.setShowGutter(f),w.getSession().setUseWrapMode(S),w.setShowPrintMargin(E),w.on("focus",r.onFocus),w.on("blur",r.onBlur),w.on("input",r.onInput),w.on("copy",r.onCopy),w.on("paste",r.onPaste),w.on("change",r.onChange),w.getSession().selection.on("changeSelection",r.onSelectionChange),w.getSession().selection.on("changeCursor",r.onCursorChange),w.session.on("changeScrollTop",r.onScroll),w.setValue(C===void 0?I:C,d);var N=be(k,_,[]),L=be(t,_,[]);w.getSession().setAnnotations(N),L&&L.length>0&&r.handleMarkers(L,w);for(var $=0;$<Te.editorOptions.length;$++){var z=Te.editorOptions[$];u.hasOwnProperty(z)?w.setOption(z,r.props[z]):r.props[z]}r.handleOptions(r.props,w),Array.isArray(R)&&R.forEach(function(B){typeof B.exec=="string"?w.commands.bindKey(B.bindKey,B.exec):w.commands.addCommand(B)}),A&&w.setKeyboardHandler("ace/keyboard/"+A)}),T&&(this.refEditor.className+=" "+T),h&&this.splitEditor.focus();var x=this.editor.env.split;x.setOrientation(this.props.orientation==="below"?x.BELOW:x.BESIDE),x.resize(!0),P&&P(x)},b.prototype.componentDidUpdate=function(r){var l=this,T=r,e=this.props,a=this.editor.env.split;if(e.splits!==T.splits&&a.setSplits(e.splits),e.orientation!==T.orientation&&a.setOrientation(e.orientation==="below"?a.BELOW:a.BESIDE),a.forEach(function(s,o){e.mode!==T.mode&&s.getSession().setMode("ace/mode/"+e.mode),e.keyboardHandler!==T.keyboardHandler&&(e.keyboardHandler?s.setKeyboardHandler("ace/keyboard/"+e.keyboardHandler):s.setKeyboardHandler(null)),e.fontSize!==T.fontSize&&s.setFontSize(e.fontSize),e.wrapEnabled!==T.wrapEnabled&&s.getSession().setUseWrapMode(e.wrapEnabled),e.showPrintMargin!==T.showPrintMargin&&s.setShowPrintMargin(e.showPrintMargin),e.showGutter!==T.showGutter&&s.renderer.setShowGutter(e.showGutter);for(var d=0;d<Te.editorOptions.length;d++){var f=Te.editorOptions[d];e[f]!==T[f]&&s.setOption(f,e[f])}lt(e.setOptions,T.setOptions)||l.handleOptions(e,s);var S=be(e.value,o,"");if(s.getValue()!==S){l.silent=!0;var E=s.session.selection.toJSON();s.setValue(S,e.cursorStart),s.session.selection.fromJSON(E),l.silent=!1}var m=be(e.annotations,o,[]),v=be(T.annotations,o,[]);lt(m,v)||s.getSession().setAnnotations(m);var A=be(e.markers,o,[]),P=be(T.markers,o,[]);!lt(A,P)&&Array.isArray(A)&&l.handleMarkers(A,s)}),e.className!==T.className){var h=this.refEditor.className,g=h.trim().split(" "),c=T.className.trim().split(" ");c.forEach(function(s){var o=g.indexOf(s);g.splice(o,1)}),this.refEditor.className=" "+e.className+" "+g.join(" ")}e.theme!==T.theme&&a.setTheme("ace/theme/"+e.theme),e.focus&&!T.focus&&this.splitEditor.focus(),(e.height!==this.props.height||e.width!==this.props.width)&&this.editor.resize()},b.prototype.componentWillUnmount=function(){this.editor.destroy(),this.editor=null},b.prototype.onChange=function(r){if(this.props.onChange&&!this.silent){var l=[];this.editor.env.split.forEach(function(T){l.push(T.getValue())}),this.props.onChange(l,r)}},b.prototype.onSelectionChange=function(r){if(this.props.onSelectionChange){var l=[];this.editor.env.split.forEach(function(T){l.push(T.getSelection())}),this.props.onSelectionChange(l,r)}},b.prototype.onCursorChange=function(r){if(this.props.onCursorChange){var l=[];this.editor.env.split.forEach(function(T){l.push(T.getSelection())}),this.props.onCursorChange(l,r)}},b.prototype.onFocus=function(r){this.props.onFocus&&this.props.onFocus(r)},b.prototype.onInput=function(r){this.props.onInput&&this.props.onInput(r)},b.prototype.onBlur=function(r){this.props.onBlur&&this.props.onBlur(r)},b.prototype.onCopy=function(r){this.props.onCopy&&this.props.onCopy(r)},b.prototype.onPaste=function(r){this.props.onPaste&&this.props.onPaste(r)},b.prototype.onScroll=function(){this.props.onScroll&&this.props.onScroll(this.editor)},b.prototype.handleOptions=function(r,l){for(var T=Object.keys(r.setOptions),e=0;e<T.length;e++)l.setOption(T[e],r.setOptions[T[e]])},b.prototype.handleMarkers=function(r,l){var T=l.getSession().getMarkers(!0);for(var e in T)T.hasOwnProperty(e)&&l.getSession().removeMarker(T[e].id);T=l.getSession().getMarkers(!1);for(var e in T)T.hasOwnProperty(e)&&l.getSession().removeMarker(T[e].id);r.forEach(function(a){var h=a.startRow,g=a.startCol,c=a.endRow,s=a.endCol,o=a.className,d=a.type,f=a.inFront,S=f===void 0?!1:f,E=new Mi.Range(h,g,c,s);l.getSession().addMarker(E,o,d,S)})},b.prototype.updateRef=function(r){this.refEditor=r},b.prototype.render=function(){var r=this.props,l=r.name,T=r.width,e=r.height,a=r.style,h=ht({width:T,height:e},a);return Wt.createElement("div",{ref:this.updateRef,id:l,style:h})},b.propTypes={className:U.string,debounceChangePeriod:U.number,defaultValue:U.arrayOf(U.string),focus:U.bool,fontSize:U.oneOfType([U.number,U.string]),height:U.string,mode:U.string,name:U.string,onBlur:U.func,onChange:U.func,onCopy:U.func,onFocus:U.func,onInput:U.func,onLoad:U.func,onPaste:U.func,onScroll:U.func,orientation:U.string,showGutter:U.bool,splits:U.number,theme:U.string,value:U.arrayOf(U.string),width:U.string,onSelectionChange:U.func,onCursorChange:U.func,onBeforeLoad:U.func,minLines:U.number,maxLines:U.number,readOnly:U.bool,highlightActiveLine:U.bool,tabSize:U.number,showPrintMargin:U.bool,cursorStart:U.number,editorProps:U.object,setOptions:U.object,style:U.object,scrollMargin:U.array,annotations:U.array,markers:U.array,keyboardHandler:U.string,wrapEnabled:U.bool,enableBasicAutocompletion:U.oneOfType([U.bool,U.array]),enableLiveAutocompletion:U.oneOfType([U.bool,U.array]),commands:U.array},b.defaultProps={name:"ace-editor",focus:!1,orientation:"beside",splits:2,mode:"",theme:"",height:"500px",width:"500px",value:[],fontSize:12,showGutter:!0,onChange:null,onPaste:null,onLoad:null,onScroll:null,minLines:null,maxLines:null,readOnly:!1,highlightActiveLine:!0,showPrintMargin:!0,tabSize:4,cursorStart:1,editorProps:{},style:{},scrollMargin:[0,0,0,0],setOptions:{},wrapEnabled:!1,enableBasicAutocompletion:!1,enableLiveAutocompletion:!1},b}(Wt.Component);Je.default=Oi;var rn={exports:{}};(function(M){var b=function(){this.Diff_Timeout=1,this.Diff_EditCost=4,this.Match_Threshold=.5,this.Match_Distance=1e3,this.Patch_DeleteThreshold=.5,this.Patch_Margin=4,this.Match_MaxBits=32},r=-1,l=1,T=0;b.Diff=function(e,a){return[e,a]},b.prototype.diff_main=function(e,a,h,g){typeof g=="undefined"&&(this.Diff_Timeout<=0?g=Number.MAX_VALUE:g=new Date().getTime()+this.Diff_Timeout*1e3);var c=g;if(e==null||a==null)throw new Error("Null input. (diff_main)");if(e==a)return e?[new b.Diff(T,e)]:[];typeof h=="undefined"&&(h=!0);var s=h,o=this.diff_commonPrefix(e,a),d=e.substring(0,o);e=e.substring(o),a=a.substring(o),o=this.diff_commonSuffix(e,a);var f=e.substring(e.length-o);e=e.substring(0,e.length-o),a=a.substring(0,a.length-o);var S=this.diff_compute_(e,a,s,c);return d&&S.unshift(new b.Diff(T,d)),f&&S.push(new b.Diff(T,f)),this.diff_cleanupMerge(S),S},b.prototype.diff_compute_=function(e,a,h,g){var c;if(!e)return[new b.Diff(l,a)];if(!a)return[new b.Diff(r,e)];var s=e.length>a.length?e:a,o=e.length>a.length?a:e,d=s.indexOf(o);if(d!=-1)return c=[new b.Diff(l,s.substring(0,d)),new b.Diff(T,o),new b.Diff(l,s.substring(d+o.length))],e.length>a.length&&(c[0][0]=c[2][0]=r),c;if(o.length==1)return[new b.Diff(r,e),new b.Diff(l,a)];var f=this.diff_halfMatch_(e,a);if(f){var S=f[0],E=f[1],m=f[2],v=f[3],A=f[4],P=this.diff_main(S,m,h,g),R=this.diff_main(E,v,h,g);return P.concat([new b.Diff(T,A)],R)}return h&&e.length>100&&a.length>100?this.diff_lineMode_(e,a,g):this.diff_bisect_(e,a,g)},b.prototype.diff_lineMode_=function(e,a,h){var g=this.diff_linesToChars_(e,a);e=g.chars1,a=g.chars2;var c=g.lineArray,s=this.diff_main(e,a,!1,h);this.diff_charsToLines_(s,c),this.diff_cleanupSemantic(s),s.push(new b.Diff(T,""));for(var o=0,d=0,f=0,S="",E="";o<s.length;){switch(s[o][0]){case l:f++,E+=s[o][1];break;case r:d++,S+=s[o][1];break;case T:if(d>=1&&f>=1){s.splice(o-d-f,d+f),o=o-d-f;for(var m=this.diff_main(S,E,!1,h),v=m.length-1;v>=0;v--)s.splice(o,0,m[v]);o=o+m.length}f=0,d=0,S="",E="";break}o++}return s.pop(),s},b.prototype.diff_bisect_=function(e,a,h){for(var g=e.length,c=a.length,s=Math.ceil((g+c)/2),o=s,d=2*s,f=new Array(d),S=new Array(d),E=0;E<d;E++)f[E]=-1,S[E]=-1;f[o+1]=0,S[o+1]=0;for(var m=g-c,v=m%2!=0,A=0,P=0,R=0,k=0,t=0;t<s&&!(new Date().getTime()>h);t++){for(var i=-t+A;i<=t-P;i+=2){var n=o+i,p;i==-t||i!=t&&f[n-1]<f[n+1]?p=f[n+1]:p=f[n-1]+1;for(var u=p-i;p<g&&u<c&&e.charAt(p)==a.charAt(u);)p++,u++;if(f[n]=p,p>g)P+=2;else if(u>c)A+=2;else if(v){var x=o+m-i;if(x>=0&&x<d&&S[x]!=-1){var w=g-S[x];if(p>=w)return this.diff_bisectSplit_(e,a,p,u,h)}}}for(var _=-t+R;_<=t-k;_+=2){var x=o+_,w;_==-t||_!=t&&S[x-1]<S[x+1]?w=S[x+1]:w=S[x-1]+1;for(var $=w-_;w<g&&$<c&&e.charAt(g-w-1)==a.charAt(c-$-1);)w++,$++;if(S[x]=w,w>g)k+=2;else if($>c)R+=2;else if(!v){var n=o+m-_;if(n>=0&&n<d&&f[n]!=-1){var p=f[n],u=o+p-n;if(w=g-w,p>=w)return this.diff_bisectSplit_(e,a,p,u,h)}}}}return[new b.Diff(r,e),new b.Diff(l,a)]},b.prototype.diff_bisectSplit_=function(e,a,h,g,c){var s=e.substring(0,h),o=a.substring(0,g),d=e.substring(h),f=a.substring(g),S=this.diff_main(s,o,!1,c),E=this.diff_main(d,f,!1,c);return S.concat(E)},b.prototype.diff_linesToChars_=function(e,a){var h=[],g={};h[0]="";function c(f){for(var S="",E=0,m=-1,v=h.length;m<f.length-1;){m=f.indexOf(`
`,E),m==-1&&(m=f.length-1);var A=f.substring(E,m+1);(g.hasOwnProperty?g.hasOwnProperty(A):g[A]!==void 0)?S+=String.fromCharCode(g[A]):(v==s&&(A=f.substring(E),m=f.length),S+=String.fromCharCode(v),g[A]=v,h[v++]=A),E=m+1}return S}var s=4e4,o=c(e);s=65535;var d=c(a);return{chars1:o,chars2:d,lineArray:h}},b.prototype.diff_charsToLines_=function(e,a){for(var h=0;h<e.length;h++){for(var g=e[h][1],c=[],s=0;s<g.length;s++)c[s]=a[g.charCodeAt(s)];e[h][1]=c.join("")}},b.prototype.diff_commonPrefix=function(e,a){if(!e||!a||e.charAt(0)!=a.charAt(0))return 0;for(var h=0,g=Math.min(e.length,a.length),c=g,s=0;h<c;)e.substring(s,c)==a.substring(s,c)?(h=c,s=h):g=c,c=Math.floor((g-h)/2+h);return c},b.prototype.diff_commonSuffix=function(e,a){if(!e||!a||e.charAt(e.length-1)!=a.charAt(a.length-1))return 0;for(var h=0,g=Math.min(e.length,a.length),c=g,s=0;h<c;)e.substring(e.length-c,e.length-s)==a.substring(a.length-c,a.length-s)?(h=c,s=h):g=c,c=Math.floor((g-h)/2+h);return c},b.prototype.diff_commonOverlap_=function(e,a){var h=e.length,g=a.length;if(h==0||g==0)return 0;h>g?e=e.substring(h-g):h<g&&(a=a.substring(0,h));var c=Math.min(h,g);if(e==a)return c;for(var s=0,o=1;;){var d=e.substring(c-o),f=a.indexOf(d);if(f==-1)return s;o+=f,(f==0||e.substring(c-o)==a.substring(0,o))&&(s=o,o++)}},b.prototype.diff_halfMatch_=function(e,a){if(this.Diff_Timeout<=0)return null;var h=e.length>a.length?e:a,g=e.length>a.length?a:e;if(h.length<4||g.length*2<h.length)return null;var c=this;function s(P,R,k){for(var t=P.substring(k,k+Math.floor(P.length/4)),i=-1,n="",p,u,x,w;(i=R.indexOf(t,i+1))!=-1;){var _=c.diff_commonPrefix(P.substring(k),R.substring(i)),$=c.diff_commonSuffix(P.substring(0,k),R.substring(0,i));n.length<$+_&&(n=R.substring(i-$,i)+R.substring(i,i+_),p=P.substring(0,k-$),u=P.substring(k+_),x=R.substring(0,i-$),w=R.substring(i+_))}return n.length*2>=P.length?[p,u,x,w,n]:null}var o=s(h,g,Math.ceil(h.length/4)),d=s(h,g,Math.ceil(h.length/2)),f;if(!o&&!d)return null;d?o?f=o[4].length>d[4].length?o:d:f=d:f=o;var S,E,m,v;e.length>a.length?(S=f[0],E=f[1],m=f[2],v=f[3]):(m=f[0],v=f[1],S=f[2],E=f[3]);var A=f[4];return[S,E,m,v,A]},b.prototype.diff_cleanupSemantic=function(e){for(var a=!1,h=[],g=0,c=null,s=0,o=0,d=0,f=0,S=0;s<e.length;)e[s][0]==T?(h[g++]=s,o=f,d=S,f=0,S=0,c=e[s][1]):(e[s][0]==l?f+=e[s][1].length:S+=e[s][1].length,c&&c.length<=Math.max(o,d)&&c.length<=Math.max(f,S)&&(e.splice(h[g-1],0,new b.Diff(r,c)),e[h[g-1]+1][0]=l,g--,g--,s=g>0?h[g-1]:-1,o=0,d=0,f=0,S=0,c=null,a=!0)),s++;for(a&&this.diff_cleanupMerge(e),this.diff_cleanupSemanticLossless(e),s=1;s<e.length;){if(e[s-1][0]==r&&e[s][0]==l){var E=e[s-1][1],m=e[s][1],v=this.diff_commonOverlap_(E,m),A=this.diff_commonOverlap_(m,E);v>=A?(v>=E.length/2||v>=m.length/2)&&(e.splice(s,0,new b.Diff(T,m.substring(0,v))),e[s-1][1]=E.substring(0,E.length-v),e[s+1][1]=m.substring(v),s++):(A>=E.length/2||A>=m.length/2)&&(e.splice(s,0,new b.Diff(T,E.substring(0,A))),e[s-1][0]=l,e[s-1][1]=m.substring(0,m.length-A),e[s+1][0]=r,e[s+1][1]=E.substring(A),s++),s++}s++}},b.prototype.diff_cleanupSemanticLossless=function(e){function a(A,P){if(!A||!P)return 6;var R=A.charAt(A.length-1),k=P.charAt(0),t=R.match(b.nonAlphaNumericRegex_),i=k.match(b.nonAlphaNumericRegex_),n=t&&R.match(b.whitespaceRegex_),p=i&&k.match(b.whitespaceRegex_),u=n&&R.match(b.linebreakRegex_),x=p&&k.match(b.linebreakRegex_),w=u&&A.match(b.blanklineEndRegex_),_=x&&P.match(b.blanklineStartRegex_);return w||_?5:u||x?4:t&&!n&&p?3:n||p?2:t||i?1:0}for(var h=1;h<e.length-1;){if(e[h-1][0]==T&&e[h+1][0]==T){var g=e[h-1][1],c=e[h][1],s=e[h+1][1],o=this.diff_commonSuffix(g,c);if(o){var d=c.substring(c.length-o);g=g.substring(0,g.length-o),c=d+c.substring(0,c.length-o),s=d+s}for(var f=g,S=c,E=s,m=a(g,c)+a(c,s);c.charAt(0)===s.charAt(0);){g+=c.charAt(0),c=c.substring(1)+s.charAt(0),s=s.substring(1);var v=a(g,c)+a(c,s);v>=m&&(m=v,f=g,S=c,E=s)}e[h-1][1]!=f&&(f?e[h-1][1]=f:(e.splice(h-1,1),h--),e[h][1]=S,E?e[h+1][1]=E:(e.splice(h+1,1),h--))}h++}},b.nonAlphaNumericRegex_=/[^a-zA-Z0-9]/,b.whitespaceRegex_=/\s/,b.linebreakRegex_=/[\r\n]/,b.blanklineEndRegex_=/\n\r?\n$/,b.blanklineStartRegex_=/^\r?\n\r?\n/,b.prototype.diff_cleanupEfficiency=function(e){for(var a=!1,h=[],g=0,c=null,s=0,o=!1,d=!1,f=!1,S=!1;s<e.length;)e[s][0]==T?(e[s][1].length<this.Diff_EditCost&&(f||S)?(h[g++]=s,o=f,d=S,c=e[s][1]):(g=0,c=null),f=S=!1):(e[s][0]==r?S=!0:f=!0,c&&(o&&d&&f&&S||c.length<this.Diff_EditCost/2&&o+d+f+S==3)&&(e.splice(h[g-1],0,new b.Diff(r,c)),e[h[g-1]+1][0]=l,g--,c=null,o&&d?(f=S=!0,g=0):(g--,s=g>0?h[g-1]:-1,f=S=!1),a=!0)),s++;a&&this.diff_cleanupMerge(e)},b.prototype.diff_cleanupMerge=function(e){e.push(new b.Diff(T,""));for(var a=0,h=0,g=0,c="",s="",o;a<e.length;)switch(e[a][0]){case l:g++,s+=e[a][1],a++;break;case r:h++,c+=e[a][1],a++;break;case T:h+g>1?(h!==0&&g!==0&&(o=this.diff_commonPrefix(s,c),o!==0&&(a-h-g>0&&e[a-h-g-1][0]==T?e[a-h-g-1][1]+=s.substring(0,o):(e.splice(0,0,new b.Diff(T,s.substring(0,o))),a++),s=s.substring(o),c=c.substring(o)),o=this.diff_commonSuffix(s,c),o!==0&&(e[a][1]=s.substring(s.length-o)+e[a][1],s=s.substring(0,s.length-o),c=c.substring(0,c.length-o))),a-=h+g,e.splice(a,h+g),c.length&&(e.splice(a,0,new b.Diff(r,c)),a++),s.length&&(e.splice(a,0,new b.Diff(l,s)),a++),a++):a!==0&&e[a-1][0]==T?(e[a-1][1]+=e[a][1],e.splice(a,1)):a++,g=0,h=0,c="",s="";break}e[e.length-1][1]===""&&e.pop();var d=!1;for(a=1;a<e.length-1;)e[a-1][0]==T&&e[a+1][0]==T&&(e[a][1].substring(e[a][1].length-e[a-1][1].length)==e[a-1][1]?(e[a][1]=e[a-1][1]+e[a][1].substring(0,e[a][1].length-e[a-1][1].length),e[a+1][1]=e[a-1][1]+e[a+1][1],e.splice(a-1,1),d=!0):e[a][1].substring(0,e[a+1][1].length)==e[a+1][1]&&(e[a-1][1]+=e[a+1][1],e[a][1]=e[a][1].substring(e[a+1][1].length)+e[a+1][1],e.splice(a+1,1),d=!0)),a++;d&&this.diff_cleanupMerge(e)},b.prototype.diff_xIndex=function(e,a){var h=0,g=0,c=0,s=0,o;for(o=0;o<e.length&&(e[o][0]!==l&&(h+=e[o][1].length),e[o][0]!==r&&(g+=e[o][1].length),!(h>a));o++)c=h,s=g;return e.length!=o&&e[o][0]===r?s:s+(a-c)},b.prototype.diff_prettyHtml=function(e){for(var a=[],h=/&/g,g=/</g,c=/>/g,s=/\n/g,o=0;o<e.length;o++){var d=e[o][0],f=e[o][1],S=f.replace(h,"&amp;").replace(g,"&lt;").replace(c,"&gt;").replace(s,"&para;<br>");switch(d){case l:a[o]='<ins style="background:#e6ffe6;">'+S+"</ins>";break;case r:a[o]='<del style="background:#ffe6e6;">'+S+"</del>";break;case T:a[o]="<span>"+S+"</span>";break}}return a.join("")},b.prototype.diff_text1=function(e){for(var a=[],h=0;h<e.length;h++)e[h][0]!==l&&(a[h]=e[h][1]);return a.join("")},b.prototype.diff_text2=function(e){for(var a=[],h=0;h<e.length;h++)e[h][0]!==r&&(a[h]=e[h][1]);return a.join("")},b.prototype.diff_levenshtein=function(e){for(var a=0,h=0,g=0,c=0;c<e.length;c++){var s=e[c][0],o=e[c][1];switch(s){case l:h+=o.length;break;case r:g+=o.length;break;case T:a+=Math.max(h,g),h=0,g=0;break}}return a+=Math.max(h,g),a},b.prototype.diff_toDelta=function(e){for(var a=[],h=0;h<e.length;h++)switch(e[h][0]){case l:a[h]="+"+encodeURI(e[h][1]);break;case r:a[h]="-"+e[h][1].length;break;case T:a[h]="="+e[h][1].length;break}return a.join("	").replace(/%20/g," ")},b.prototype.diff_fromDelta=function(e,a){for(var h=[],g=0,c=0,s=a.split(/\t/g),o=0;o<s.length;o++){var d=s[o].substring(1);switch(s[o].charAt(0)){case"+":try{h[g++]=new b.Diff(l,decodeURI(d))}catch(E){throw new Error("Illegal escape in diff_fromDelta: "+d)}break;case"-":case"=":var f=parseInt(d,10);if(isNaN(f)||f<0)throw new Error("Invalid number in diff_fromDelta: "+d);var S=e.substring(c,c+=f);s[o].charAt(0)=="="?h[g++]=new b.Diff(T,S):h[g++]=new b.Diff(r,S);break;default:if(s[o])throw new Error("Invalid diff operation in diff_fromDelta: "+s[o])}}if(c!=e.length)throw new Error("Delta length ("+c+") does not equal source text length ("+e.length+").");return h},b.prototype.match_main=function(e,a,h){if(e==null||a==null||h==null)throw new Error("Null input. (match_main)");return h=Math.max(0,Math.min(h,e.length)),e==a?0:e.length?e.substring(h,h+a.length)==a?h:this.match_bitap_(e,a,h):-1},b.prototype.match_bitap_=function(e,a,h){if(a.length>this.Match_MaxBits)throw new Error("Pattern too long for this browser.");var g=this.match_alphabet_(a),c=this;function s(p,u){var x=p/a.length,w=Math.abs(h-u);return c.Match_Distance?x+w/c.Match_Distance:w?1:x}var o=this.Match_Threshold,d=e.indexOf(a,h);d!=-1&&(o=Math.min(s(0,d),o),d=e.lastIndexOf(a,h+a.length),d!=-1&&(o=Math.min(s(0,d),o)));var f=1<<a.length-1;d=-1;for(var S,E,m=a.length+e.length,v,A=0;A<a.length;A++){for(S=0,E=m;S<E;)s(A,h+E)<=o?S=E:m=E,E=Math.floor((m-S)/2+S);m=E;var P=Math.max(1,h-E+1),R=Math.min(h+E,e.length)+a.length,k=Array(R+2);k[R+1]=(1<<A)-1;for(var t=R;t>=P;t--){var i=g[e.charAt(t-1)];if(A===0?k[t]=(k[t+1]<<1|1)&i:k[t]=(k[t+1]<<1|1)&i|((v[t+1]|v[t])<<1|1)|v[t+1],k[t]&f){var n=s(A,t-1);if(n<=o)if(o=n,d=t-1,d>h)P=Math.max(1,2*h-d);else break}}if(s(A+1,h)>o)break;v=k}return d},b.prototype.match_alphabet_=function(e){for(var a={},h=0;h<e.length;h++)a[e.charAt(h)]=0;for(var h=0;h<e.length;h++)a[e.charAt(h)]|=1<<e.length-h-1;return a},b.prototype.patch_addContext_=function(e,a){if(a.length!=0){if(e.start2===null)throw Error("patch not initialized");for(var h=a.substring(e.start2,e.start2+e.length1),g=0;a.indexOf(h)!=a.lastIndexOf(h)&&h.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin;)g+=this.Patch_Margin,h=a.substring(e.start2-g,e.start2+e.length1+g);g+=this.Patch_Margin;var c=a.substring(e.start2-g,e.start2);c&&e.diffs.unshift(new b.Diff(T,c));var s=a.substring(e.start2+e.length1,e.start2+e.length1+g);s&&e.diffs.push(new b.Diff(T,s)),e.start1-=c.length,e.start2-=c.length,e.length1+=c.length+s.length,e.length2+=c.length+s.length}},b.prototype.patch_make=function(e,a,h){var g,c;if(typeof e=="string"&&typeof a=="string"&&typeof h=="undefined")g=e,c=this.diff_main(g,a,!0),c.length>2&&(this.diff_cleanupSemantic(c),this.diff_cleanupEfficiency(c));else if(e&&typeof e=="object"&&typeof a=="undefined"&&typeof h=="undefined")c=e,g=this.diff_text1(c);else if(typeof e=="string"&&a&&typeof a=="object"&&typeof h=="undefined")g=e,c=a;else if(typeof e=="string"&&typeof a=="string"&&h&&typeof h=="object")g=e,c=h;else throw new Error("Unknown call format to patch_make.");if(c.length===0)return[];for(var s=[],o=new b.patch_obj,d=0,f=0,S=0,E=g,m=g,v=0;v<c.length;v++){var A=c[v][0],P=c[v][1];switch(!d&&A!==T&&(o.start1=f,o.start2=S),A){case l:o.diffs[d++]=c[v],o.length2+=P.length,m=m.substring(0,S)+P+m.substring(S);break;case r:o.length1+=P.length,o.diffs[d++]=c[v],m=m.substring(0,S)+m.substring(S+P.length);break;case T:P.length<=2*this.Patch_Margin&&d&&c.length!=v+1?(o.diffs[d++]=c[v],o.length1+=P.length,o.length2+=P.length):P.length>=2*this.Patch_Margin&&d&&(this.patch_addContext_(o,E),s.push(o),o=new b.patch_obj,d=0,E=m,f=S);break}A!==l&&(f+=P.length),A!==r&&(S+=P.length)}return d&&(this.patch_addContext_(o,E),s.push(o)),s},b.prototype.patch_deepCopy=function(e){for(var a=[],h=0;h<e.length;h++){var g=e[h],c=new b.patch_obj;c.diffs=[];for(var s=0;s<g.diffs.length;s++)c.diffs[s]=new b.Diff(g.diffs[s][0],g.diffs[s][1]);c.start1=g.start1,c.start2=g.start2,c.length1=g.length1,c.length2=g.length2,a[h]=c}return a},b.prototype.patch_apply=function(e,a){if(e.length==0)return[a,[]];e=this.patch_deepCopy(e);var h=this.patch_addPadding(e);a=h+a+h,this.patch_splitMax(e);for(var g=0,c=[],s=0;s<e.length;s++){var o=e[s].start2+g,d=this.diff_text1(e[s].diffs),f,S=-1;if(d.length>this.Match_MaxBits?(f=this.match_main(a,d.substring(0,this.Match_MaxBits),o),f!=-1&&(S=this.match_main(a,d.substring(d.length-this.Match_MaxBits),o+d.length-this.Match_MaxBits),(S==-1||f>=S)&&(f=-1))):f=this.match_main(a,d,o),f==-1)c[s]=!1,g-=e[s].length2-e[s].length1;else{c[s]=!0,g=f-o;var E;if(S==-1?E=a.substring(f,f+d.length):E=a.substring(f,S+this.Match_MaxBits),d==E)a=a.substring(0,f)+this.diff_text2(e[s].diffs)+a.substring(f+d.length);else{var m=this.diff_main(d,E,!1);if(d.length>this.Match_MaxBits&&this.diff_levenshtein(m)/d.length>this.Patch_DeleteThreshold)c[s]=!1;else{this.diff_cleanupSemanticLossless(m);for(var v=0,A,P=0;P<e[s].diffs.length;P++){var R=e[s].diffs[P];R[0]!==T&&(A=this.diff_xIndex(m,v)),R[0]===l?a=a.substring(0,f+A)+R[1]+a.substring(f+A):R[0]===r&&(a=a.substring(0,f+A)+a.substring(f+this.diff_xIndex(m,v+R[1].length))),R[0]!==r&&(v+=R[1].length)}}}}}return a=a.substring(h.length,a.length-h.length),[a,c]},b.prototype.patch_addPadding=function(e){for(var a=this.Patch_Margin,h="",g=1;g<=a;g++)h+=String.fromCharCode(g);for(var g=0;g<e.length;g++)e[g].start1+=a,e[g].start2+=a;var c=e[0],s=c.diffs;if(s.length==0||s[0][0]!=T)s.unshift(new b.Diff(T,h)),c.start1-=a,c.start2-=a,c.length1+=a,c.length2+=a;else if(a>s[0][1].length){var o=a-s[0][1].length;s[0][1]=h.substring(s[0][1].length)+s[0][1],c.start1-=o,c.start2-=o,c.length1+=o,c.length2+=o}if(c=e[e.length-1],s=c.diffs,s.length==0||s[s.length-1][0]!=T)s.push(new b.Diff(T,h)),c.length1+=a,c.length2+=a;else if(a>s[s.length-1][1].length){var o=a-s[s.length-1][1].length;s[s.length-1][1]+=h.substring(0,o),c.length1+=o,c.length2+=o}return h},b.prototype.patch_splitMax=function(e){for(var a=this.Match_MaxBits,h=0;h<e.length;h++)if(!(e[h].length1<=a)){var g=e[h];e.splice(h--,1);for(var c=g.start1,s=g.start2,o="";g.diffs.length!==0;){var d=new b.patch_obj,f=!0;for(d.start1=c-o.length,d.start2=s-o.length,o!==""&&(d.length1=d.length2=o.length,d.diffs.push(new b.Diff(T,o)));g.diffs.length!==0&&d.length1<a-this.Patch_Margin;){var S=g.diffs[0][0],E=g.diffs[0][1];S===l?(d.length2+=E.length,s+=E.length,d.diffs.push(g.diffs.shift()),f=!1):S===r&&d.diffs.length==1&&d.diffs[0][0]==T&&E.length>2*a?(d.length1+=E.length,c+=E.length,f=!1,d.diffs.push(new b.Diff(S,E)),g.diffs.shift()):(E=E.substring(0,a-d.length1-this.Patch_Margin),d.length1+=E.length,c+=E.length,S===T?(d.length2+=E.length,s+=E.length):f=!1,d.diffs.push(new b.Diff(S,E)),E==g.diffs[0][1]?g.diffs.shift():g.diffs[0][1]=g.diffs[0][1].substring(E.length))}o=this.diff_text2(d.diffs),o=o.substring(o.length-this.Patch_Margin);var m=this.diff_text1(g.diffs).substring(0,this.Patch_Margin);m!==""&&(d.length1+=m.length,d.length2+=m.length,d.diffs.length!==0&&d.diffs[d.diffs.length-1][0]===T?d.diffs[d.diffs.length-1][1]+=m:d.diffs.push(new b.Diff(T,m))),f||e.splice(++h,0,d)}}},b.prototype.patch_toText=function(e){for(var a=[],h=0;h<e.length;h++)a[h]=e[h];return a.join("")},b.prototype.patch_fromText=function(e){var a=[];if(!e)return a;for(var h=e.split(`
`),g=0,c=/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;g<h.length;){var s=h[g].match(c);if(!s)throw new Error("Invalid patch string: "+h[g]);var o=new b.patch_obj;for(a.push(o),o.start1=parseInt(s[1],10),s[2]===""?(o.start1--,o.length1=1):s[2]=="0"?o.length1=0:(o.start1--,o.length1=parseInt(s[2],10)),o.start2=parseInt(s[3],10),s[4]===""?(o.start2--,o.length2=1):s[4]=="0"?o.length2=0:(o.start2--,o.length2=parseInt(s[4],10)),g++;g<h.length;){var d=h[g].charAt(0);try{var f=decodeURI(h[g].substring(1))}catch(S){throw new Error("Illegal escape in patch_fromText: "+f)}if(d=="-")o.diffs.push(new b.Diff(r,f));else if(d=="+")o.diffs.push(new b.Diff(l,f));else if(d==" ")o.diffs.push(new b.Diff(T,f));else{if(d=="@")break;if(d!=="")throw new Error('Invalid patch mode "'+d+'" in: '+f)}g++}}return a},b.patch_obj=function(){this.diffs=[],this.start1=null,this.start2=null,this.length1=0,this.length2=0},b.patch_obj.prototype.toString=function(){var e,a;this.length1===0?e=this.start1+",0":this.length1==1?e=this.start1+1:e=this.start1+1+","+this.length1,this.length2===0?a=this.start2+",0":this.length2==1?a=this.start2+1:a=this.start2+1+","+this.length2;for(var h=["@@ -"+e+" +"+a+` @@
`],g,c=0;c<this.diffs.length;c++){switch(this.diffs[c][0]){case l:g="+";break;case r:g="-";break;case T:g=" ";break}h[c+1]=g+encodeURI(this.diffs[c][1])+`
`}return h.join("").replace(/%20/g," ")},M.exports=b,M.exports.diff_match_patch=b,M.exports.DIFF_DELETE=r,M.exports.DIFF_INSERT=l,M.exports.DIFF_EQUAL=T})(rn);var Li=rn.exports,Ii=re&&re.__extends||function(){var M=function(b,r){return M=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(l,T){l.__proto__=T}||function(l,T){for(var e in T)Object.prototype.hasOwnProperty.call(T,e)&&(l[e]=T[e])},M(b,r)};return function(b,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");M(b,r);function l(){this.constructor=b}b.prototype=r===null?Object.create(r):(l.prototype=r.prototype,new l)}}();Object.defineProperty(ft,"__esModule",{value:!0});var Y=ut,Vt=dt,Pi=Je,Fi=Li,Ni=function(M){Ii(b,M);function b(r){var l=M.call(this,r)||this;return l.state={value:l.props.value},l.onChange=l.onChange.bind(l),l.diff=l.diff.bind(l),l}return b.prototype.componentDidUpdate=function(){var r=this.props.value;r!==this.state.value&&this.setState({value:r})},b.prototype.onChange=function(r){this.setState({value:r}),this.props.onChange&&this.props.onChange(r)},b.prototype.diff=function(){var r=new Fi,l=this.state.value[0],T=this.state.value[1];if(l.length===0&&T.length===0)return[];var e=r.diff_main(l,T);r.diff_cleanupSemantic(e);var a=this.generateDiffedLines(e),h=this.setCodeMarkers(a);return h},b.prototype.generateDiffedLines=function(r){var l={DIFF_EQUAL:0,DIFF_DELETE:-1,DIFF_INSERT:1},T={left:[],right:[]},e={left:1,right:1};return r.forEach(function(a){var h=a[0],g=a[1],c=g.split(`
`).length-1;if(g.length!==0){var s=g[0],o=g[g.length-1],d=0;switch(h){case l.DIFF_EQUAL:e.left+=c,e.right+=c;break;case l.DIFF_DELETE:s===`
`&&(e.left++,c--),d=c,d===0&&T.right.push({startLine:e.right,endLine:e.right}),o===`
`&&(d-=1),T.left.push({startLine:e.left,endLine:e.left+d}),e.left+=c;break;case l.DIFF_INSERT:s===`
`&&(e.right++,c--),d=c,d===0&&T.left.push({startLine:e.left,endLine:e.left}),o===`
`&&(d-=1),T.right.push({startLine:e.right,endLine:e.right+d}),e.right+=c;break;default:throw new Error("Diff type was not defined.")}}}),T},b.prototype.setCodeMarkers=function(r){r===void 0&&(r={left:[],right:[]});for(var l=[],T={left:[],right:[]},e=0;e<r.left.length;e++){var a={startRow:r.left[e].startLine-1,endRow:r.left[e].endLine,type:"text",className:"codeMarker"};T.left.push(a)}for(var e=0;e<r.right.length;e++){var a={startRow:r.right[e].startLine-1,endRow:r.right[e].endLine,type:"text",className:"codeMarker"};T.right.push(a)}return l[0]=T.left,l[1]=T.right,l},b.prototype.render=function(){var r=this.diff();return Vt.createElement(Pi.default,{name:this.props.name,className:this.props.className,focus:this.props.focus,orientation:this.props.orientation,splits:this.props.splits,mode:this.props.mode,theme:this.props.theme,height:this.props.height,width:this.props.width,fontSize:this.props.fontSize,showGutter:this.props.showGutter,onChange:this.onChange,onPaste:this.props.onPaste,onLoad:this.props.onLoad,onScroll:this.props.onScroll,minLines:this.props.minLines,maxLines:this.props.maxLines,readOnly:this.props.readOnly,highlightActiveLine:this.props.highlightActiveLine,showPrintMargin:this.props.showPrintMargin,tabSize:this.props.tabSize,cursorStart:this.props.cursorStart,editorProps:this.props.editorProps,style:this.props.style,scrollMargin:this.props.scrollMargin,setOptions:this.props.setOptions,wrapEnabled:this.props.wrapEnabled,enableBasicAutocompletion:this.props.enableBasicAutocompletion,enableLiveAutocompletion:this.props.enableLiveAutocompletion,value:this.state.value,markers:r})},b.propTypes={cursorStart:Y.number,editorProps:Y.object,enableBasicAutocompletion:Y.bool,enableLiveAutocompletion:Y.bool,focus:Y.bool,fontSize:Y.number,height:Y.string,highlightActiveLine:Y.bool,maxLines:Y.number,minLines:Y.number,mode:Y.string,name:Y.string,className:Y.string,onLoad:Y.func,onPaste:Y.func,onScroll:Y.func,onChange:Y.func,orientation:Y.string,readOnly:Y.bool,scrollMargin:Y.array,setOptions:Y.object,showGutter:Y.bool,showPrintMargin:Y.bool,splits:Y.number,style:Y.object,tabSize:Y.number,theme:Y.string,value:Y.array,width:Y.string,wrapEnabled:Y.bool},b.defaultProps={cursorStart:1,editorProps:{},enableBasicAutocompletion:!1,enableLiveAutocompletion:!1,focus:!1,fontSize:12,height:"500px",highlightActiveLine:!0,maxLines:null,minLines:null,mode:"",name:"ace-editor",onLoad:null,onScroll:null,onPaste:null,onChange:null,orientation:"beside",readOnly:!1,scrollMargin:[0,0,0,0],setOptions:{},showGutter:!0,showPrintMargin:!0,splits:2,style:{},tabSize:4,theme:"github",value:["",""],width:"500px",wrapEnabled:!0},b}(Vt.Component);ft.default=Ni;Object.defineProperty(Le,"__esModule",{value:!0});Le.diff=Le.split=void 0;var zi=gt,Di=ft;Le.diff=Di.default;var Bi=Je;Le.split=Bi.default;var Ui=Le.default=zi.default;export{Ui as _};
