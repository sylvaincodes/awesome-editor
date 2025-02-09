'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var ReactMarkdown = require('react-markdown');
var remarkGfm = require('remark-gfm');
var marked = require('marked');
var Prism$1 = require('prismjs');
require('prismjs/themes/prism.css');
var diff = require('diff');
var ai = require('ai');
var openai = require('@ai-sdk/openai');
var reactHookForm = require('react-hook-form');
var zod = require('@hookform/resolvers/zod');
var z = require('zod');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var ReactMarkdown__default = /*#__PURE__*/_interopDefaultLegacy(ReactMarkdown);
var remarkGfm__default = /*#__PURE__*/_interopDefaultLegacy(remarkGfm);
var Prism__default = /*#__PURE__*/_interopDefaultLegacy(Prism$1);
var z__namespace = /*#__PURE__*/_interopNamespace(z);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

Prism.languages.markup = {
	'comment': {
		pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
		greedy: true
	},
	'prolog': {
		pattern: /<\?[\s\S]+?\?>/,
		greedy: true
	},
	'doctype': {
		// https://www.w3.org/TR/xml/#NT-doctypedecl
		pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
		greedy: true,
		inside: {
			'internal-subset': {
				pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
				lookbehind: true,
				greedy: true,
				inside: null // see below
			},
			'string': {
				pattern: /"[^"]*"|'[^']*'/,
				greedy: true
			},
			'punctuation': /^<!|>$|[[\]]/,
			'doctype-tag': /^DOCTYPE/i,
			'name': /[^\s<>'"]+/
		}
	},
	'cdata': {
		pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
		greedy: true
	},
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
		greedy: true,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'special-attr': [],
			'attr-value': {
				pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
				inside: {
					'punctuation': [
						{
							pattern: /^=/,
							alias: 'attr-equals'
						},
						{
							pattern: /^(\s*)["']|["']$/,
							lookbehind: true
						}
					]
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': [
		{
			pattern: /&[\da-z]{1,8};/i,
			alias: 'named-entity'
		},
		/&#x?[\da-f]{1,8};/i
	]
};

Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
	Prism.languages.markup['entity'];
Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function (env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
	/**
	 * Adds an inlined language to markup.
	 *
	 * An example of an inlined language is CSS with `<style>` tags.
	 *
	 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addInlined('style', 'css');
	 */
	value: function addInlined(tagName, lang) {
		var includedCdataInside = {};
		includedCdataInside['language-' + lang] = {
			pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
			lookbehind: true,
			inside: Prism.languages[lang]
		};
		includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

		var inside = {
			'included-cdata': {
				pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
				inside: includedCdataInside
			}
		};
		inside['language-' + lang] = {
			pattern: /[\s\S]+/,
			inside: Prism.languages[lang]
		};

		var def = {};
		def[tagName] = {
			pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return tagName; }), 'i'),
			lookbehind: true,
			greedy: true,
			inside: inside
		};

		Prism.languages.insertBefore('markup', 'cdata', def);
	}
});
Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
	/**
	 * Adds an pattern to highlight languages embedded in HTML attributes.
	 *
	 * An example of an inlined language is CSS with `style` attributes.
	 *
	 * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addAttribute('style', 'css');
	 */
	value: function (attrName, lang) {
		Prism.languages.markup.tag.inside['special-attr'].push({
			pattern: RegExp(
				/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
				'i'
			),
			lookbehind: true,
			inside: {
				'attr-name': /^[^\s=]+/,
				'attr-value': {
					pattern: /=[\s\S]+/,
					inside: {
						'value': {
							pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
							lookbehind: true,
							alias: [lang, 'language-' + lang],
							inside: Prism.languages[lang]
						},
						'punctuation': [
							{
								pattern: /^=/,
								alias: 'attr-equals'
							},
							/"|'/
						]
					}
				}
			}
		});
	}
});

Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

Prism.languages.xml = Prism.languages.extend('markup', {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;

(function (Prism) {

	var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;

	Prism.languages.css = {
		'comment': /\/\*[\s\S]*?\*\//,
		'atrule': {
			pattern: RegExp('@[\\w-](?:' + /[^;{\s"']|\s+(?!\s)/.source + '|' + string.source + ')*?' + /(?:;|(?=\s*\{))/.source),
			inside: {
				'rule': /^@[\w-]+/,
				'selector-function-argument': {
					pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
					lookbehind: true,
					alias: 'selector'
				},
				'keyword': {
					pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
					lookbehind: true
				}
				// See rest below
			}
		},
		'url': {
			// https://drafts.csswg.org/css-values-3/#urls
			pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
			greedy: true,
			inside: {
				'function': /^url/i,
				'punctuation': /^\(|\)$/,
				'string': {
					pattern: RegExp('^' + string.source + '$'),
					alias: 'url'
				}
			}
		},
		'selector': {
			pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
			lookbehind: true
		},
		'string': {
			pattern: string,
			greedy: true
		},
		'property': {
			pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
			lookbehind: true
		},
		'important': /!important\b/i,
		'function': {
			pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
			lookbehind: true
		},
		'punctuation': /[(){};:,]/
	};

	Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

	var markup = Prism.languages.markup;
	if (markup) {
		markup.tag.addInlined('style', 'css');
		markup.tag.addAttribute('style', 'css');
	}

}(Prism));

Prism.languages.javascript = Prism.languages.extend('clike', {
	'class-name': [
		Prism.languages.clike['class-name'],
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
			lookbehind: true
		}
	],
	'keyword': [
		{
			pattern: /((?:^|\})\s*)catch\b/,
			lookbehind: true
		},
		{
			pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
			lookbehind: true
		},
	],
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
	'number': {
		pattern: RegExp(
			/(^|[^\w$])/.source +
			'(?:' +
			(
				// constant
				/NaN|Infinity/.source +
				'|' +
				// binary integer
				/0[bB][01]+(?:_[01]+)*n?/.source +
				'|' +
				// octal integer
				/0[oO][0-7]+(?:_[0-7]+)*n?/.source +
				'|' +
				// hexadecimal integer
				/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
				'|' +
				// decimal bigint
				/\d+(?:_\d+)*n/.source +
				'|' +
				// decimal number (integer or float) but no bigint
				/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source
			) +
			')' +
			/(?![\w$])/.source
		),
		lookbehind: true
	},
	'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});

Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: RegExp(
			// lookbehind
			// eslint-disable-next-line regexp/no-dupe-characters-character-class
			/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
			// Regex pattern:
			// There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
			// classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
			// with the only syntax, so we have to define 2 different regex patterns.
			/\//.source +
			'(?:' +
			/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source +
			'|' +
			// `v` flag syntax. This supports 3 levels of nested character classes.
			/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source +
			')' +
			// lookahead
			/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
		),
		lookbehind: true,
		greedy: true,
		inside: {
			'regex-source': {
				pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
				lookbehind: true,
				alias: 'language-regex',
				inside: Prism.languages.regex
			},
			'regex-delimiter': /^\/|\/$/,
			'regex-flags': /^[a-z]+$/,
		}
	},
	// This must be declared before keyword because we use "function" inside the look-forward
	'function-variable': {
		pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
		alias: 'function'
	},
	'parameter': [
		{
			pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		}
	],
	'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});

Prism.languages.insertBefore('javascript', 'string', {
	'hashbang': {
		pattern: /^#!.*/,
		greedy: true,
		alias: 'comment'
	},
	'template-string': {
		pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
		greedy: true,
		inside: {
			'template-punctuation': {
				pattern: /^`|`$/,
				alias: 'string'
			},
			'interpolation': {
				pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
				lookbehind: true,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	},
	'string-property': {
		pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
		lookbehind: true,
		greedy: true,
		alias: 'property'
	}
});

Prism.languages.insertBefore('javascript', 'operator', {
	'literal-property': {
		pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
		lookbehind: true,
		alias: 'property'
	},
});

if (Prism.languages.markup) {
	Prism.languages.markup.tag.addInlined('script', 'javascript');

	// add attribute support for all DOM events.
	// https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
	Prism.languages.markup.tag.addAttribute(
		/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
		'javascript'
	);
}

Prism.languages.js = Prism.languages.javascript;

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ":root {\n  --primary-color: #4a90e2;\n  --secondary-color: #f5f7fa;\n  --text-color: #333;\n  --border-color: #e0e0e0;\n  --hover-color: #3a7bd5;\n  --active-color: #2c5282;\n  --shadow-color: rgba(0, 0, 0, 0.1);\n}\n\n.awesome-editor {\n  border: 1px solid var(--border-color);\n  border-radius: 8px;\n  overflow: hidden;\n  font-family: \"Segoe UI\", Tahoma, Geneva, Verdana, sans-serif;\n  position: relative;\n  resize: both;\n  overflow: auto;\n  min-width: 300px;\n  min-height: 200px;\n  background-color: #ffffff;\n  box-shadow: 0 4px 6px var(--shadow-color);\n  transition: box-shadow 0.3s ease;\n}\n\n.awesome-editor:hover {\n  box-shadow: 0 6px 8px var(--shadow-color);\n}\n\n.menu-bar {\n  display: flex;\n  background-color: var(--secondary-color);\n  border-bottom: 1px solid var(--border-color);\n  padding: 8px 0;\n  flex-wrap: wrap;\n}\n\n.menu-item {\n  position: relative;\n  padding: 8px 16px;\n  cursor: pointer;\n  user-select: none;\n  color: var(--text-color);\n  font-weight: 500;\n  transition: background-color 0.2s ease;\n}\n\n.menu-item:hover {\n  background-color: rgba(74, 144, 226, 0.1);\n}\n\n.menu-item.active {\n  background-color: var(--primary-color);\n  color: #ffffff;\n}\n\n.menu-dropdown {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  background-color: #ffffff;\n  border: 1px solid var(--border-color);\n  border-radius: 4px;\n  box-shadow: 0 2px 10px var(--shadow-color);\n  z-index: 1000;\n  min-width: 180px;\n  opacity: 0;\n  transform: translateY(-10px);\n  transition: opacity 0.2s ease, transform 0.2s ease;\n  pointer-events: none;\n}\n\n.menu-item.active .menu-dropdown {\n  opacity: 1;\n  transform: translateY(0);\n  pointer-events: auto;\n}\n\n.menu-dropdown button,\n.menu-dropdown select,\n.menu-dropdown label {\n  display: block;\n  width: 100%;\n  padding: 8px 16px;\n  text-align: left;\n  border: none;\n  background: none;\n  cursor: pointer;\n  color: var(--text-color);\n  transition: background-color 0.2s ease;\n}\n\n.menu-dropdown button:hover,\n.menu-dropdown select:hover {\n  background-color: var(--secondary-color);\n}\n\n.menu-dropdown label {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.menu-dropdown label input[type=\"checkbox\"] {\n  margin: 0;\n}\n\n.toolbar {\n  background-color: #ffffff;\n  padding: 12px;\n  border-bottom: 1px solid var(--border-color);\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  align-items: center;\n}\n\n.toolbar button,\n.toolbar select {\n  padding: 6px 10px;\n  background-color: #ffffff;\n  border: 1px solid var(--border-color);\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  min-width: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n  color: var(--text-color);\n}\n\n.toolbar button:hover,\n.toolbar select:hover {\n  background-color: var(--secondary-color);\n  border-color: var(--primary-color);\n}\n\n.toolbar button:active,\n.toolbar select:active {\n  background-color: var(--primary-color);\n  color: #ffffff;\n}\n\n.toolbar button svg {\n  width: 18px;\n  height: 18px;\n  fill: var(--text-color);\n  transition: all 0.2s ease;\n}\n\n.toolbar button:hover svg,\n.toolbar button:active svg {\n  fill: var(--primary-color);\n}\n\n.toolbar button[title=\"Toggle Case\"] svg {\n  transform: rotate(90deg);\n}\n\n.toolbar label {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 14px;\n}\n\n.toolbar input[type=\"color\"] {\n  width: 30px;\n  height: 30px;\n  padding: 0;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\n\n.editor-content {\n  padding: 20px;\n  min-height: 200px;\n  height: calc(100% - 120px);\n  outline: none;\n  font-size: 16px;\n  line-height: 1.6;\n  overflow-y: auto;\n  color: var(--text-color);\n}\n\n.editor-content img {\n  max-width: 100%;\n  height: auto;\n  border-radius: 4px;\n  box-shadow: 0 2px 4px var(--shadow-color);\n}\n\n.markdown-content {\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\n\n.markdown-content pre {\n  background-color: var(--secondary-color);\n  padding: 16px;\n  border-radius: 4px;\n  overflow-x: auto;\n  font-family: \"Courier New\", Courier, monospace;\n  font-size: 14px;\n  line-height: 1.4;\n}\n\n.markdown-content code {\n  font-family: \"Courier New\", Courier, monospace;\n  background-color: var(--secondary-color);\n  padding: 2px 4px;\n  border-radius: 2px;\n}\n\n.markdown-content table {\n  border-collapse: collapse;\n  width: 100%;\n  margin-bottom: 16px;\n}\n\n.markdown-content th,\n.markdown-content td {\n  border: 1px solid var(--border-color);\n  padding: 8px;\n  text-align: left;\n}\n\n.markdown-content th {\n  background-color: var(--secondary-color);\n  font-weight: bold;\n}\n\n.toolbar select[title=\"Font\"],\n.toolbar select[title=\"Font Size\"],\n.toolbar select[title=\"Line Height\"] {\n  min-width: 120px;\n}\n\n.paste-options {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  background-color: var(--secondary-color);\n  padding: 8px 12px;\n  border-radius: 4px;\n}\n\n.paste-preview {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: #ffffff;\n  border: 1px solid var(--border-color);\n  border-radius: 8px;\n  padding: 24px;\n  max-width: 80%;\n  max-height: 80%;\n  overflow: auto;\n  box-shadow: 0 4px 20px var(--shadow-color);\n}\n\n.preview-content {\n  display: flex;\n  gap: 24px;\n}\n\n.preview-content > div {\n  flex: 1;\n}\n\n.preview-actions {\n  margin-top: 24px;\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n}\n\n.custom-rules-modal,\n.table-modal {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: #ffffff;\n  border: 1px solid var(--border-color);\n  border-radius: 8px;\n  padding: 24px;\n  max-width: 80%;\n  max-height: 80%;\n  overflow: auto;\n  box-shadow: 0 4px 20px var(--shadow-color);\n}\n\n.custom-rules-list {\n  margin-bottom: 24px;\n}\n\n.custom-rule {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n  background-color: var(--secondary-color);\n  padding: 8px 12px;\n  border-radius: 4px;\n}\n\n.add-custom-rule {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 24px;\n}\n\n.add-custom-rule input {\n  flex: 1;\n  padding: 8px 12px;\n  border: 1px solid var(--border-color);\n  border-radius: 4px;\n  font-size: 14px;\n}\n\n.table-modal {\n  max-width: 400px;\n  width: 100%;\n}\n\n.table-modal h3 {\n  margin-top: 0;\n  margin-bottom: 24px;\n  font-size: 20px;\n  color: var(--primary-color);\n}\n\n.table-modal div {\n  margin-bottom: 16px;\n}\n\n.table-modal label {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 14px;\n}\n\n.table-modal input[type=\"number\"] {\n  width: 80px;\n  padding: 6px 10px;\n  border: 1px solid var(--border-color);\n  border-radius: 4px;\n  font-size: 14px;\n}\n\n.table-modal button {\n  margin-right: 12px;\n}\n\n.ai-content-modal {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: #ffffff;\n  border: 1px solid var(--border-color);\n  border-radius: 8px;\n  padding: 24px;\n  max-width: 80%;\n  width: 500px;\n  z-index: 1000;\n  box-shadow: 0 4px 20px var(--shadow-color);\n}\n\n.ai-content-modal h3 {\n  margin-top: 0;\n  margin-bottom: 24px;\n  font-size: 20px;\n  color: var(--primary-color);\n}\n\n.ai-content-modal textarea {\n  width: 100%;\n  margin-bottom: 24px;\n  padding: 12px;\n  border: 1px solid var(--border-color);\n  border-radius: 4px;\n  resize: vertical;\n  font-size: 14px;\n  min-height: 120px;\n}\n\n.modal-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n}\n\n.modal-actions button {\n  padding: 8px 16px;\n  background-color: var(--primary-color);\n  color: #ffffff;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: background-color 0.2s ease;\n}\n\n.modal-actions button:hover {\n  background-color: var(--hover-color);\n}\n\n.resize-handle {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  width: 16px;\n  height: 16px;\n  background-color: var(--primary-color);\n  cursor: se-resize;\n  border-top-left-radius: 4px;\n}\n\n@media (max-width: 1200px) {\n  .toolbar button,\n  .toolbar select {\n    padding: 4px 8px;\n    font-size: 12px;\n    min-width: 30px;\n  }\n\n  .toolbar button svg {\n    width: 14px;\n    height: 14px;\n  }\n}\n\n@media (max-width: 992px) {\n  .toolbar button,\n  .toolbar select {\n    padding: 3px 6px;\n    font-size: 11px;\n    min-width: 28px;\n  }\n\n  .toolbar button svg {\n    width: 12px;\n    height: 12px;\n  }\n}\n\n@media (max-width: 768px) {\n  .toolbar {\n    flex-wrap: wrap;\n    justify-content: center;\n  }\n\n  .toolbar button,\n  .toolbar select {\n    padding: 4px 8px;\n    font-size: 12px;\n    min-width: 30px;\n  }\n\n  .toolbar button svg {\n    width: 14px;\n    height: 14px;\n  }\n\n  .menu-bar {\n    flex-wrap: wrap;\n  }\n\n  .menu-item {\n    padding: 6px 12px;\n    font-size: 14px;\n  }\n\n  .editor-content {\n    padding: 16px;\n    font-size: 14px;\n  }\n\n  .paste-preview,\n  .custom-rules-modal,\n  .table-modal,\n  .ai-content-modal {\n    width: 90%;\n    max-width: none;\n  }\n}\n\n@media (max-width: 480px) {\n  .toolbar button,\n  .toolbar select {\n    padding: 2px 4px;\n    font-size: 10px;\n    min-width: 24px;\n  }\n\n  .toolbar button svg {\n    width: 12px;\n    height: 12px;\n  }\n\n  .menu-item {\n    padding: 4px 8px;\n    font-size: 12px;\n  }\n\n  .editor-content {\n    padding: 12px;\n    font-size: 12px;\n  }\n}\n\n/* Animations */\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes slideIn {\n  from {\n    transform: translateY(-10px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n\n.menu-dropdown {\n  animation: fadeIn 0.2s ease, slideIn 0.2s ease;\n}\n\n.paste-preview,\n.custom-rules-modal,\n.table-modal,\n.ai-content-modal {\n  animation: fadeIn 0.3s ease;\n}\n\n/* Transitions */\n.toolbar button,\n.toolbar select,\n.menu-item,\n.menu-dropdown button,\n.menu-dropdown select,\n.modal-actions button {\n  transition: all 0.2s ease;\n}\n\n/* Focus styles */\n.toolbar button:focus,\n.toolbar select:focus,\n.menu-item:focus,\n.menu-dropdown button:focus,\n.menu-dropdown select:focus,\n.modal-actions button:focus {\n  outline: 2px solid var(--primary-color);\n  outline-offset: 2px;\n}\n\n/* Accessibility improvements */\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n/* Custom scrollbar */\n.editor-content::-webkit-scrollbar {\n  width: 8px;\n}\n\n.editor-content::-webkit-scrollbar-track {\n  background: var(--secondary-color);\n}\n\n.editor-content::-webkit-scrollbar-thumb {\n  background-color: var(--primary-color);\n  border-radius: 4px;\n}\n\n/* Improved button and input styles */\nbutton,\ninput[type=\"text\"],\ninput[type=\"number\"],\nselect,\ntextarea {\n  font-family: inherit;\n}\n\n/* Add a subtle hover effect to the editor */\n.awesome-editor:hover {\n  box-shadow: 0 6px 12px var(--shadow-color);\n}\n\n/* Improve readability of code blocks */\n.markdown-content pre {\n  border-left: 4px solid var(--primary-color);\n}\n\n/* Add a subtle animation to the resize handle */\n.resize-handle:hover {\n  transform: scale(1.1);\n  transition: transform 0.2s ease;\n}\n\n";
styleInject(css_248z);

var AIContentModal = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, onGenerate = _a.onGenerate;
    var _b = react.useState(""), prompt = _b[0], setPrompt = _b[1];
    if (!isOpen)
        return null;
    var handleSubmit = function () {
        onGenerate(prompt);
        setPrompt("");
    };
    return (jsxRuntime.jsxs("div", __assign({ className: "ai-content-modal" }, { children: [jsxRuntime.jsx("h3", { children: "Generate AI Content" }), jsxRuntime.jsxs("div", { children: [jsxRuntime.jsx("textarea", { value: prompt, onChange: function (e) { return setPrompt(e.target.value); }, placeholder: "Enter a prompt for AI content generation...", rows: 4 }), jsxRuntime.jsxs("div", __assign({ className: "modal-actions" }, { children: [jsxRuntime.jsx("button", __assign({ type: "button", onClick: handleSubmit }, { children: "Generate" })), jsxRuntime.jsx("button", __assign({ type: "button", onClick: onClose }, { children: "Cancel" }))] }))] })] })));
};

var fonts = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier",
    "Verdana",
    "Georgia",
    "Palatino",
    "Garamond",
    "Bookman",
    "Comic Sans MS",
    "Trebuchet MS",
    "Arial Black",
    "Impact",
];
var fontSizes = [
    "8px",
    "9px",
    "10px",
    "11px",
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "22px",
    "24px",
    "26px",
    "28px",
    "36px",
    "48px",
    "72px",
];
var lineHeights = ["1", "1.15", "1.5", "2", "2.5", "3"];
var colors = [
    "#000000",
    "#FFFFFF",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#808080",
    "#800000",
    "#808000",
    "#008000",
    "#800080",
    "#008080",
    "#000080", // Navy
];
var AwesomeEditor = react.forwardRef(function (_a, ref) {
    var _b = _a.value, value = _b === void 0 ? "" : _b, onChange = _a.onChange, className = _a.className;
    var _c = react.useState(value), content = _c[0], setContent = _c[1];
    var _d = react.useState("wysiwyg"), mode = _d[0], setMode = _d[1];
    var _e = react.useState(true), cleanPasteEnabled = _e[0], setCleanPasteEnabled = _e[1];
    var _f = react.useState(true), showPastePreview = _f[0], setShowPastePreview = _f[1];
    var _g = react.useState([]), customRules = _g[0], setCustomRules = _g[1];
    var _h = react.useState(false), isCustomRulesModalOpen = _h[0], setIsCustomRulesModalOpen = _h[1];
    var _j = react.useState({
        find: "",
        replace: "",
    }), newRule = _j[0], setNewRule = _j[1];
    var _k = react.useState(null), pastePreviewData = _k[0], setPastePreviewData = _k[1];
    var _l = react.useState([
        { content: value, selectionStart: 0, selectionEnd: 0 },
    ]), history = _l[0], setHistory = _l[1];
    var _m = react.useState(0), historyIndex = _m[0], setHistoryIndex = _m[1];
    var _o = react.useState(false), isInlineDiffEnabled = _o[0], setIsInlineDiffEnabled = _o[1];
    var editorRef = react.useRef(null);
    var _p = react.useState(false), isTableModalOpen = _p[0], setIsTableModalOpen = _p[1];
    var _q = react.useState(2), tableRows = _q[0], setTableRows = _q[1];
    var _r = react.useState(2), tableColumns = _r[0], setTableColumns = _r[1];
    var _s = react.useState(true), tableHeaders = _s[0], setTableHeaders = _s[1];
    var _t = react.useState(null), activeMenu = _t[0], setActiveMenu = _t[1];
    var _u = react.useState(false), isAIContentModalOpen = _u[0], setIsAIContentModalOpen = _u[1];
    var _v = react.useState(false), isResizing = _v[0], setIsResizing = _v[1];
    var resizeRef = react.useRef(null);
    var _w = react.useState(0), editorWidth = _w[0], setEditorWidth = _w[1];
    var fileInputRef = react.useRef(null);
    react.useEffect(function () {
        if (editorRef.current && content !== editorRef.current.innerHTML) {
            editorRef.current.innerHTML = content;
            setTimeout(function () {
                setCaretToEnd();
            }, 0);
        }
    }, [content]);
    react.useEffect(function () {
        if (mode === "markdown") {
            Prism__default["default"].highlightAll();
        }
    }, [mode]);
    react.useImperativeHandle(ref, function () { return ({
        getContent: function () { return content; },
        setContent: function (newContent) { return setContent(newContent); },
    }); });
    var getTextOffset = react.useCallback(function (root, node, offset) {
        var totalOffset = 0;
        var traverse = function (currentNode) {
            if (currentNode === node) {
                totalOffset += offset;
                return true;
            }
            if (currentNode.nodeType === Node.TEXT_NODE &&
                currentNode.textContent) {
                totalOffset += currentNode.textContent.length;
            }
            else if (currentNode.childNodes) {
                for (var i = 0; i < currentNode.childNodes.length; i++) {
                    if (traverse(currentNode.childNodes[i])) {
                        return true;
                    }
                }
            }
            return false;
        };
        traverse(root);
        return totalOffset;
    }, []);
    var setCaretToEnd = react.useCallback(function () {
        if (editorRef.current) {
            var range = document.createRange();
            var selection = window.getSelection();
            range.selectNodeContents(editorRef.current);
            range.collapse(false);
            selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
            selection === null || selection === void 0 ? void 0 : selection.addRange(range);
            editorRef.current.focus();
            // Scroll to the end of the content
            editorRef.current.scrollTop = editorRef.current.scrollHeight;
        }
    }, []);
    var addToHistory = react.useCallback(function (newContent) {
        var _a;
        var selection = window.getSelection();
        var newEntry = {
            content: newContent,
            selectionStart: 0,
            selectionEnd: 0,
        };
        if (selection && selection.rangeCount > 0) {
            var range = selection.getRangeAt(0);
            newEntry = {
                content: newContent,
                selectionStart: range
                    ? getTextOffset(editorRef.current, range.startContainer, range.startOffset)
                    : 0,
                selectionEnd: range
                    ? getTextOffset(editorRef.current, range.endContainer, range.endOffset)
                    : 0,
            };
        }
        // Only add to history if the content has changed
        if (((_a = history[historyIndex]) === null || _a === void 0 ? void 0 : _a.content) !== newContent) {
            setHistory(function (prevHistory) { return __spreadArray(__spreadArray([], prevHistory.slice(0, historyIndex + 1), true), [
                newEntry,
            ], false); });
            setHistoryIndex(function (prevIndex) { return prevIndex + 1; });
        }
    }, [history, historyIndex, getTextOffset]);
    var handleInput = react.useCallback(function () {
        var _a;
        var newContent = ((_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.innerHTML) || "";
        if (content !== newContent) {
            setContent(newContent);
            onChange === null || onChange === void 0 ? void 0 : onChange(newContent);
            addToHistory(newContent);
            // Use setTimeout to ensure the cursor is set after the content update
            setTimeout(function () {
                setCaretToEnd();
            }, 0);
        }
    }, [content, onChange, addToHistory, setCaretToEnd]);
    var execCommand = react.useCallback(function (command, value) {
        var _a;
        if (value === void 0) { value = undefined; }
        if (command === "insertOrderedList" ||
            command === "insertUnorderedList") {
            var selection = window.getSelection();
            var range = selection === null || selection === void 0 ? void 0 : selection.getRangeAt(0);
            if (range) {
                var listElement = document.createElement(command === "insertOrderedList" ? "ol" : "ul");
                var listItem = document.createElement("li");
                listItem.appendChild(range.extractContents());
                listElement.appendChild(listItem);
                range.insertNode(listElement);
                range.selectNodeContents(listItem);
                selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
                selection === null || selection === void 0 ? void 0 : selection.addRange(range);
            }
        }
        else {
            document.execCommand(command, false, value);
        }
        (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        handleInput();
    }, [handleInput]);
    var handleColorChange = function (event, command) {
        execCommand(command, event.target.value);
    };
    var handleFontChange = function (event) {
        execCommand("fontName", event.target.value);
    };
    var handleLinkInsert = function () {
        var url = prompt("Enter the URL:");
        if (url) {
            execCommand("createLink", url);
        }
    };
    var handleImageInsert = function () {
        var url = prompt("Enter the image URL:");
        if (url) {
            execCommand("insertImage", url);
        }
    };
    var handleTableInsert = function () {
        setIsTableModalOpen(true);
    };
    var insertTable = function () {
        var table = '<table style="border-collapse: collapse; width: 100%;">';
        if (tableHeaders) {
            table += "<thead><tr>";
            for (var j = 0; j < tableColumns; j++) {
                table +=
                    '<th style="border: 1px solid black; padding: 8px;">Header</th>';
            }
            table += "</tr></thead>";
        }
        table += "<tbody>";
        for (var i = 0; i < tableRows; i++) {
            table += "<tr>";
            for (var j = 0; j < tableColumns; j++) {
                table +=
                    '<td style="border: 1px solid black; padding: 8px;">Cell</td>';
            }
            table += "</tr>";
        }
        table += "</tbody></table>";
        execCommand("insertHTML", table);
        setIsTableModalOpen(false);
    };
    var handleCodeBlock = function () {
        var language = prompt("Enter the programming language:");
        if (language) {
            var code = "<pre><code class=\"language-".concat(language, "\">\n// Your code here\n</code></pre>");
            execCommand("insertHTML", code);
        }
    };
    var toggleMode = function () {
        if (mode === "wysiwyg") {
            setMode("markdown");
            setContent(marked.marked(content));
        }
        else {
            setMode("wysiwyg");
            setContent(content);
        }
    };
    var cleanPastedHTML = function (html) {
        // Remove all attributes except 'href' for links and 'src' for images
        html = html.replace(/<([a-z][a-z0-9]*)[^>]*?(href="[^"]*"|src="[^"]*")?[^>]*>/gi, "<$1 $2>");
        // Remove comments
        html = html.replace(/<!--[\s\S]*?-->/g, "");
        // Remove specific MS Office and Google Docs classes
        html = html.replace(/class="(Mso[^"]*|gmail[^"]*|Apple-[^"]*|v:[^"]*|o:[^"]*)"/gi, "");
        // Remove empty tags
        html = html.replace(/<([a-z][a-z0-9]*)[^>]*>(\s*|&nbsp;)<\/\1>/gi, "");
        // Remove specific MS Office and Google Docs spans
        html = html.replace(/<span\s+style="[^"]*mso-[^"]*"[^>]*>(\s*)<\/span>/gi, "$1");
        html = html.replace(/<span\s+style="[^"]*font-family:[^"]*"[^>]*>(\s*)<\/span>/gi, "$1");
        // Convert <b> to <strong> and <i> to <em>
        html = html.replace(/<b\b[^>]*>(.*?)<\/b>/gi, "<strong>$1</strong>");
        html = html.replace(/<i\b[^>]*>(.*?)<\/i>/gi, "<em>$1</em>");
        // Apply custom rules
        customRules.forEach(function (rule) {
            var regex = new RegExp(rule.find, "g");
            html = html.replace(regex, rule.replace);
        });
        return html.trim();
    };
    var handlePaste = function (e) {
        e.preventDefault();
        var clipboardData = e.clipboardData;
        var pastedData;
        if (clipboardData.types.includes("text/html")) {
            pastedData = clipboardData.getData("text/html");
        }
        else if (clipboardData.types.includes("text/plain")) {
            pastedData = clipboardData.getData("text/plain");
        }
        else if (clipboardData.files.length > 0) {
            handleFilePaste(clipboardData.files);
            return;
        }
        else {
            return;
        }
        if (cleanPasteEnabled) {
            var cleanedHtml = cleanPastedHTML(pastedData);
            if (showPastePreview) {
                setPastePreviewData({ original: pastedData, cleaned: cleanedHtml });
            }
            else {
                insertContent(cleanedHtml);
            }
        }
        else {
            insertContent(pastedData);
        }
    };
    var handleFilePaste = function (files) {
        Array.from(files).forEach(function (file) {
            if (file.type.startsWith("image/")) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var _a;
                    var img = document.createElement("img");
                    img.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                    img.style.maxWidth = "100%";
                    insertContent(img.outerHTML);
                };
                reader.readAsDataURL(file);
            }
            else {
                console.warn("Unsupported file type:", file.type);
            }
        });
    };
    var insertContent = react.useCallback(function (content) {
        var selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            var range = selection.getRangeAt(0);
            range.deleteContents();
            var fragment = range.createContextualFragment(content);
            range.insertNode(fragment);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
        else if (editorRef.current) {
            // If there's no selection, append the content to the end of the editor
            var range = document.createRange();
            range.selectNodeContents(editorRef.current);
            range.collapse(false);
            var fragment = range.createContextualFragment(content);
            range.insertNode(fragment);
            range.collapse(false);
            selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
            selection === null || selection === void 0 ? void 0 : selection.addRange(range);
        }
        handleInput();
    }, [handleInput]);
    var handlePasteFromPreview = function (content) {
        insertContent(content);
        setPastePreviewData(null);
    };
    var addCustomRule = function () {
        if (newRule.find && newRule.replace) {
            setCustomRules(__spreadArray(__spreadArray([], customRules, true), [newRule], false));
            setNewRule({ find: "", replace: "" });
        }
    };
    var removeCustomRule = function (index) {
        var updatedRules = customRules.filter(function (_, i) { return i !== index; });
        setCustomRules(updatedRules);
    };
    var undo = function () {
        if (historyIndex > 0) {
            var prevIndex = historyIndex - 1;
            var prevEntry = history[prevIndex];
            if (prevEntry) {
                setHistoryIndex(prevIndex);
                setContent(prevEntry.content);
                restoreSelection(prevEntry);
            }
        }
    };
    var redo = function () {
        if (historyIndex < history.length - 1) {
            var nextIndex = historyIndex + 1;
            var nextEntry = history[nextIndex];
            if (nextEntry) {
                setHistoryIndex(nextIndex);
                setContent(nextEntry.content);
                restoreSelection(nextEntry);
            }
        }
    };
    var restoreSelection = function (entry) {
        var _a, _b;
        if (editorRef.current) {
            var range = document.createRange();
            var selection = window.getSelection();
            var startNode = editorRef.current;
            var endNode = editorRef.current;
            var startOffset = entry.selectionStart;
            var endOffset = entry.selectionEnd;
            // Traverse the DOM tree to find the correct text node and offset
            var traverse_1 = function (node, offset) {
                var _a, _b;
                if (node.nodeType === Node.TEXT_NODE) {
                    if (offset <= (((_a = node.textContent) === null || _a === void 0 ? void 0 : _a.length) || 0)) {
                        return [node, offset];
                    }
                    else {
                        offset -= ((_b = node.textContent) === null || _b === void 0 ? void 0 : _b.length) || 0;
                    }
                }
                else {
                    for (var i = 0; i < node.childNodes.length; i++) {
                        var _c = traverse_1(node.childNodes[i], offset), foundNode = _c[0], remainingOffset = _c[1];
                        if (foundNode) {
                            return [foundNode, remainingOffset];
                        }
                    }
                }
                return [null, offset];
            };
            _a = traverse_1(editorRef.current, entry.selectionStart), startNode = _a[0], startOffset = _a[1];
            _b = traverse_1(editorRef.current, entry.selectionEnd), endNode = _b[0], endOffset = _b[1];
            if (startNode && endNode) {
                range.setStart(startNode, startOffset);
                range.setEnd(endNode, endOffset);
                selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
                selection === null || selection === void 0 ? void 0 : selection.addRange(range);
            }
        }
    };
    var saveRuleSet = function () {
        var ruleSetName = prompt("Enter a name for this rule set:");
        if (ruleSetName) {
            var ruleSet = JSON.stringify(customRules);
            localStorage.setItem("ruleSet_".concat(ruleSetName), ruleSet);
            alert("Rule set saved successfully!");
        }
    };
    var loadRuleSet = function () {
        var ruleSetName = prompt("Enter the name of the rule set to load:");
        if (ruleSetName) {
            var ruleSet = localStorage.getItem("ruleSet_".concat(ruleSetName));
            if (ruleSet) {
                setCustomRules(JSON.parse(ruleSet));
                alert("Rule set loaded successfully!");
            }
            else {
                alert("Rule set not found!");
            }
        }
    };
    var renderInlineDiff = function (original, cleaned) {
        var diff$1 = diff.diffChars(original, cleaned);
        return diff$1.map(function (part, index) {
            var color = part.added ? "green" : part.removed ? "red" : "grey";
            return (jsxRuntime.jsx("span", __assign({ style: { color: color } }, { children: part.value }), index));
        });
    };
    var handleKeyDown = react.useCallback(function (e) {
        var _a, _b;
        if (e.key === "Enter") {
            var selection = window.getSelection();
            var range = selection === null || selection === void 0 ? void 0 : selection.getRangeAt(0);
            var currentNode = range === null || range === void 0 ? void 0 : range.startContainer;
            var listItem = currentNode === null || currentNode === void 0 ? void 0 : currentNode.parentElement;
            if ((listItem === null || listItem === void 0 ? void 0 : listItem.tagName) === "LI") {
                e.preventDefault();
                if (((_a = listItem.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === "") {
                    var list = listItem.parentElement;
                    if (list) {
                        list.removeChild(listItem);
                        if (list.childNodes.length === 0) {
                            (_b = list.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(list);
                        }
                    }
                    execCommand("insertParagraph");
                }
                else {
                    var newListItem = document.createElement("li");
                    var list = listItem.parentElement;
                    list === null || list === void 0 ? void 0 : list.insertBefore(newListItem, listItem.nextSibling);
                    var newRange = document.createRange();
                    newRange.setStart(newListItem, 0);
                    newRange.setEnd(newListItem, 0);
                    selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
                    selection === null || selection === void 0 ? void 0 : selection.addRange(newRange);
                }
                handleInput();
            }
        }
    }, [execCommand, handleInput]);
    react.useCallback(function () {
        if (editorRef.current) {
            var listElements = editorRef.current.querySelectorAll("ul, ol");
            listElements.forEach(function (list) {
                var parent = list.parentElement;
                if (parent &&
                    parent.tagName !== "LI" &&
                    parent !== editorRef.current) {
                    var wrapper = document.createElement("li");
                    parent.insertBefore(wrapper, list);
                    wrapper.appendChild(list);
                }
            });
        }
    }, []);
    var updateCursorPosition = react.useCallback(function () {
        if (editorRef.current) {
            var selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                var range = selection.getRangeAt(0);
                var rect = range.getBoundingClientRect();
                var editorRect = editorRef.current.getBoundingClientRect();
                if (rect.bottom > editorRect.bottom) {
                    editorRef.current.scrollTop =
                        editorRef.current.scrollTop +
                            (rect.bottom - editorRect.bottom) +
                            5;
                }
                else if (rect.top < editorRect.top) {
                    editorRef.current.scrollTop =
                        editorRef.current.scrollTop - (editorRect.top - rect.top) - 5;
                }
                if (rect.right > editorRect.right) {
                    editorRef.current.scrollLeft =
                        editorRef.current.scrollLeft +
                            (rect.right - editorRect.right) +
                            5;
                }
                else if (rect.left < editorRect.left) {
                    editorRef.current.scrollLeft =
                        editorRef.current.scrollLeft - (editorRect.left - rect.left) - 5;
                }
            }
        }
    }, []);
    var handleTextDirection = react.useCallback(function () {
        var selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            var range = selection.getRangeAt(0);
            var element = range.startContainer.parentElement;
            if (element) {
                var currentDir = element.getAttribute("dir") || "ltr";
                var newDir = currentDir === "ltr" ? "rtl" : "ltr";
                element.setAttribute("dir", newDir);
                handleInput();
            }
        }
    }, [handleInput]);
    react.useEffect(function () {
        var handleSelectionChange = function () {
            updateCursorPosition();
        };
        document.addEventListener("selectionchange", handleSelectionChange);
        return function () {
            document.removeEventListener("selectionchange", handleSelectionChange);
        };
    }, [updateCursorPosition]);
    var toggleCase = react.useCallback(function () {
        var selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            var range = selection.getRangeAt(0);
            var text = range.toString();
            var newText = void 0;
            if (text === text.toUpperCase()) {
                newText = text.toLowerCase();
            }
            else if (text === text.toLowerCase()) {
                newText = text.replace(/\w\S*/g, function (word) {
                    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
                });
            }
            else {
                newText = text.toUpperCase();
            }
            range.deleteContents();
            range.insertNode(document.createTextNode(newText));
            handleInput();
        }
    }, [handleInput]);
    var handleMenuClick = function (menu) {
        setActiveMenu(function (prevMenu) { return (prevMenu === menu ? null : menu); });
    };
    var handleMenuAction = function (action) {
        action();
        setActiveMenu(null);
    };
    var renderMenus = function () {
        return (jsxRuntime.jsx("div", __assign({ className: "menu-bar" }, { children: ["file", "edit", "insert", "format", "tools"].map(function (menu) { return (jsxRuntime.jsxs("div", __assign({ className: "menu-item ".concat(activeMenu === menu ? "active" : ""), onClick: function () { return handleMenuClick(menu); } }, { children: [menu.charAt(0).toUpperCase() + menu.slice(1), activeMenu === menu && (jsxRuntime.jsxs("div", __assign({ className: "menu-dropdown" }, { children: [menu === "file" && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("button", __assign({ onClick: function () {
                                            return handleMenuAction(function () {
                                                setContent("");
                                                onChange === null || onChange === void 0 ? void 0 : onChange("");
                                            });
                                        } }, { children: "New" })), jsxRuntime.jsx("button", __assign({ onClick: function () {
                                            return handleMenuAction(function () {
                                                var fileInput = document.createElement("input");
                                                fileInput.type = "file";
                                                fileInput.accept = ".txt,.html,.md";
                                                fileInput.onchange = function (e) {
                                                    var _a;
                                                    var file = (_a = e.target
                                                        .files) === null || _a === void 0 ? void 0 : _a[0];
                                                    if (file) {
                                                        var reader = new FileReader();
                                                        reader.onload = function (e) {
                                                            var _a;
                                                            var content = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                                                            setContent(content);
                                                            onChange === null || onChange === void 0 ? void 0 : onChange(content);
                                                        };
                                                        reader.readAsText(file);
                                                    }
                                                };
                                                fileInput.click();
                                            });
                                        } }, { children: "Open" })), jsxRuntime.jsx("button", __assign({ onClick: function () {
                                            return handleMenuAction(function () {
                                                var blob = new Blob([content], {
                                                    type: "text/plain",
                                                });
                                                var url = URL.createObjectURL(blob);
                                                var a = document.createElement("a");
                                                a.href = url;
                                                a.download = "document.txt";
                                                a.click();
                                                URL.revokeObjectURL(url);
                                            });
                                        } }, { children: "Save" })), jsxRuntime.jsx("button", __assign({ onClick: function () {
                                            return handleMenuAction(function () {
                                                console.log("Export as PDF functionality to be implemented");
                                            });
                                        } }, { children: "Export as PDF" }))] })), menu === "edit" && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(undo); } }, { children: "Undo" })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(redo); } }, { children: "Redo" })), jsxRuntime.jsx("button", __assign({ onClick: function () {
                                            return handleMenuAction(function () { return document.execCommand("cut"); });
                                        } }, { children: "Cut" })), jsxRuntime.jsx("button", __assign({ onClick: function () {
                                            return handleMenuAction(function () { return document.execCommand("copy"); });
                                        } }, { children: "Copy" })), jsxRuntime.jsx("button", __assign({ onClick: function () {
                                            return handleMenuAction(function () { return document.execCommand("paste"); });
                                        } }, { children: "Paste" })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(toggleCase); } }, { children: "Toggle Case" }))] })), menu === "insert" && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(handleImageInsert); } }, { children: "Image" })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(handleLinkInsert); } }, { children: "Link" })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(handleTableInsert); } }, { children: "Table" })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(handleCodeBlock); } }, { children: "Code Block" })), jsxRuntime.jsx("button", __assign({ onClick: function () {
                                            return handleMenuAction(function () { return setIsAIContentModalOpen(true); });
                                        } }, { children: "AI Content" })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(handleLocalFileImport); } }, { children: "Import Local File" }))] })), menu === "format" && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("button", __assign({ onClick: function () {
                                            return handleMenuAction(function () { return execCommand("bold"); });
                                        } }, { children: "Bold" })), jsxRuntime.jsx("button", __assign({ onClick: function () {
                                            return handleMenuAction(function () { return execCommand("italic"); });
                                        } }, { children: "Italic" })), jsxRuntime.jsx("button", __assign({ onClick: function () {
                                            return handleMenuAction(function () { return execCommand("underline"); });
                                        } }, { children: "Underline" })), jsxRuntime.jsx("button", __assign({ onClick: function () {
                                            return handleMenuAction(function () { return execCommand("strikeThrough"); });
                                        } }, { children: "Strikethrough" })), jsxRuntime.jsxs("select", __assign({ onChange: function (e) {
                                            return handleMenuAction(function () { return handleFontChange(e); });
                                        } }, { children: [jsxRuntime.jsx("option", __assign({ value: "" }, { children: "Font" })), fonts.map(function (font) { return (jsxRuntime.jsx("option", __assign({ value: font }, { children: font }), font)); })] })), jsxRuntime.jsxs("select", __assign({ onChange: function (e) {
                                            return handleMenuAction(function () {
                                                return execCommand("fontSize", e.target.value);
                                            });
                                        } }, { children: [jsxRuntime.jsx("option", __assign({ value: "" }, { children: "Font Size" })), fontSizes.map(function (size) { return (jsxRuntime.jsx("option", __assign({ value: size }, { children: size }), size)); })] })), jsxRuntime.jsxs("select", __assign({ onChange: function (e) {
                                            return handleMenuAction(function () {
                                                return execCommand("lineHeight", e.target.value);
                                            });
                                        } }, { children: [jsxRuntime.jsx("option", __assign({ value: "" }, { children: "Line Height" })), lineHeights.map(function (height) { return (jsxRuntime.jsx("option", __assign({ value: height }, { children: height }), height)); })] })), jsxRuntime.jsxs("select", __assign({ onChange: function (e) {
                                            return handleMenuAction(function () {
                                                return handleColorChange(e, "foreColor");
                                            });
                                        } }, { children: [jsxRuntime.jsx("option", __assign({ value: "" }, { children: "Text Color" })), colors.map(function (color) { return (jsxRuntime.jsx("option", __assign({ value: color, style: { backgroundColor: color } }, { children: color }), color)); })] })), jsxRuntime.jsxs("select", __assign({ onChange: function (e) {
                                            return handleMenuAction(function () {
                                                return handleColorChange(e, "hiliteColor");
                                            });
                                        } }, { children: [jsxRuntime.jsx("option", __assign({ value: "" }, { children: "Highlight Color" })), colors.map(function (color) { return (jsxRuntime.jsx("option", __assign({ value: color, style: { backgroundColor: color } }, { children: color }), color)); })] })), jsxRuntime.jsx("button", __assign({ onClick: function () {
                                            return handleMenuAction(function () { return execCommand("justifyLeft"); });
                                        } }, { children: "Align Left" })), jsxRuntime.jsx("button", __assign({ onClick: function () {
                                            return handleMenuAction(function () { return execCommand("justifyCenter"); });
                                        } }, { children: "Align Center" })), jsxRuntime.jsx("button", __assign({ onClick: function () {
                                            return handleMenuAction(function () { return execCommand("justifyRight"); });
                                        } }, { children: "Align Right" })), jsxRuntime.jsx("button", __assign({ onClick: function () {
                                            return handleMenuAction(function () { return execCommand("justifyFull"); });
                                        } }, { children: "Justify" })), jsxRuntime.jsx("button", __assign({ onClick: function () {
                                            return handleMenuAction(function () {
                                                return execCommand("insertOrderedList");
                                            });
                                        } }, { children: "Ordered List" })), jsxRuntime.jsx("button", __assign({ onClick: function () {
                                            return handleMenuAction(function () {
                                                return execCommand("insertUnorderedList");
                                            });
                                        } }, { children: "Unordered List" })), jsxRuntime.jsx("button", __assign({ onClick: function () {
                                            return handleMenuAction(function () { return execCommand("indent"); });
                                        } }, { children: "Indent" })), jsxRuntime.jsx("button", __assign({ onClick: function () {
                                            return handleMenuAction(function () { return execCommand("outdent"); });
                                        } }, { children: "Outdent" })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(handleTextDirection); } }, { children: "Toggle Text Direction" }))] })), menu === "tools" && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("button", __assign({ onClick: function () {
                                            return handleMenuAction(function () {
                                                return setIsCustomRulesModalOpen(true);
                                            });
                                        } }, { children: "Custom Paste Rules" })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(saveRuleSet); } }, { children: "Save Rule Set" })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(loadRuleSet); } }, { children: "Load Rule Set" })), jsxRuntime.jsxs("label", { children: [jsxRuntime.jsx("input", { type: "checkbox", checked: cleanPasteEnabled, onChange: function (e) {
                                                    return setCleanPasteEnabled(e.target.checked);
                                                } }), "Clean Paste"] }), jsxRuntime.jsxs("label", { children: [jsxRuntime.jsx("input", { type: "checkbox", checked: showPastePreview, onChange: function (e) {
                                                    return setShowPastePreview(e.target.checked);
                                                } }), "Show Paste Preview"] })] }))] })))] }), menu)); }) })));
    };
    react.useEffect(function () {
        var handleClickOutside = function (event) {
            if (activeMenu && !event.target.closest(".menu-item")) {
                setActiveMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [activeMenu]);
    var handleAIContentGeneration = function (prompt) { return __awaiter(void 0, void 0, void 0, function () {
        var apiKey, text, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    apiKey = process.env.OPENAI_API_KEY;
                    if (!apiKey) {
                        throw new Error("OpenAI API key not found");
                    }
                    return [4 /*yield*/, ai.generateText({
                            model: openai.openai("gpt-4o"),
                            prompt: prompt,
                        })];
                case 1:
                    text = (_a.sent()).text;
                    insertContent(text);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error generating AI content:", error_1);
                    alert("An error occurred while generating AI content. Please check your API key and try again.");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react.useEffect(function () {
        var handleResize = function () {
            if (resizeRef.current) {
                setEditorWidth(resizeRef.current.offsetWidth);
            }
        };
        var resizeObserver = new ResizeObserver(handleResize);
        if (resizeRef.current) {
            resizeObserver.observe(resizeRef.current);
        }
        return function () {
            resizeObserver.disconnect();
        };
    }, []);
    react.useEffect(function () {
        var handleMouseMove = function (e) {
            if (!isResizing)
                return;
            var editor = resizeRef.current;
            if (editor) {
                var newWidth = e.clientX - editor.getBoundingClientRect().left;
                var newHeight = e.clientY - editor.getBoundingClientRect().top;
                editor.style.width = "".concat(newWidth, "px");
                editor.style.height = "".concat(newHeight, "px");
                setEditorWidth(newWidth);
            }
        };
        var handleMouseUp = function () {
            setIsResizing(false);
        };
        if (isResizing) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }
        return function () {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isResizing]);
    var handleLocalFileImport = function () {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    var handleFileChange = function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file)
            return;
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var result = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            if (typeof result === "string") {
                var content_1 = "";
                if (file.type.startsWith("image/")) {
                    content_1 = "<img src=\"".concat(result, "\" alt=\"").concat(file.name, "\" style=\"max-width: 100%;\">");
                }
                else if (file.type.startsWith("audio/")) {
                    content_1 = "<audio controls><source src=\"".concat(result, "\" type=\"").concat(file.type, "\">Your browser does not support the audio element.</audio>");
                }
                else if (file.type.startsWith("video/")) {
                    content_1 = "<video controls style=\"max-width: 100%;\"><source src=\"".concat(result, "\" type=\"").concat(file.type, "\">Your browser does not support the video element.</video>");
                }
                else {
                    content_1 = "<a href=\"".concat(result, "\" download=\"").concat(file.name, "\">").concat(file.name, "</a>");
                }
                // Ensure the editor has focus before inserting content
                if (editorRef.current) {
                    editorRef.current.focus();
                    var selection = window.getSelection();
                    if (selection && selection.rangeCount === 0) {
                        var range = document.createRange();
                        range.selectNodeContents(editorRef.current);
                        range.collapse(false);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                }
                insertContent(content_1);
            }
        };
        reader.readAsDataURL(file);
    };
    return (jsxRuntime.jsxs("div", __assign({ className: "awesome-editor ".concat(className || ""), ref: resizeRef }, { children: [renderMenus(), jsxRuntime.jsxs("div", __assign({ className: "toolbar", style: {
                    fontSize: "".concat(Math.max(10, Math.min(14, editorWidth / 50)), "px"),
                } }, { children: [jsxRuntime.jsxs("select", __assign({ onChange: function (e) { return handleMenuAction(function () { return handleFontChange(e); }); }, title: "Font" }, { children: [jsxRuntime.jsx("option", __assign({ value: "" }, { children: "Font" })), fonts.map(function (font) { return (jsxRuntime.jsx("option", __assign({ value: font }, { children: font }), font)); })] })), jsxRuntime.jsxs("select", __assign({ onChange: function (e) {
                            return handleMenuAction(function () { return execCommand("fontSize", e.target.value); });
                        }, title: "Font Size" }, { children: [jsxRuntime.jsx("option", __assign({ value: "" }, { children: "Size" })), fontSizes.map(function (size) { return (jsxRuntime.jsx("option", __assign({ value: size }, { children: size }), size)); })] })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(function () { return execCommand("bold"); }); }, title: "Bold" }, { children: jsxRuntime.jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24" }, { children: jsxRuntime.jsx("path", { d: "M6 4v13h4.54c1.37 0 2.46-.33 3.26-1 .8-.66 1.2-1.58 1.2-2.77 0-.84-.17-1.51-.51-2.01s-.9-.85-1.67-1.03v-.09c.57-.1 1.02-.4 1.36-.9s.51-1.13.51-1.91c0-1.14-.39-1.98-1.17-2.5C12.75 4.26 11.5 4 9.78 4H6zm2.57 5.15V6.26h1.36c.73 0 1.27.11 1.61.32.34.22.51.58.51 1.07 0 .54-.16.92-.47 1.15s-.82.35-1.51.35h-1.5zm0 2.19h1.61c1.67 0 2.51.65 2.51 1.96 0 .66-.16 1.15-.48 1.48-.32.32-.82.48-1.51.48h-2.13V11.34z" }) })) })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(function () { return execCommand("italic"); }); }, title: "Italic" }, { children: jsxRuntime.jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24" }, { children: jsxRuntime.jsx("path", { d: "M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" }) })) })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(function () { return execCommand("underline"); }); }, title: "Underline" }, { children: jsxRuntime.jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24" }, { children: jsxRuntime.jsx("path", { d: "M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z" }) })) })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(function () { return execCommand("strikeThrough"); }); }, title: "Strike Through" }, { children: jsxRuntime.jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24" }, { children: jsxRuntime.jsx("path", { d: "M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z" }) })) })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(function () { return execCommand("justifyLeft"); }); }, title: "Align Left" }, { children: jsxRuntime.jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24" }, { children: jsxRuntime.jsx("path", { d: "M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z" }) })) })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(function () { return execCommand("justifyCenter"); }); }, title: "Align Center" }, { children: jsxRuntime.jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24" }, { children: jsxRuntime.jsx("path", { d: "M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z" }) })) })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(function () { return execCommand("justifyRight"); }); }, title: "Align Right" }, { children: jsxRuntime.jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24" }, { children: jsxRuntime.jsx("path", { d: "M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z" }) })) })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(function () { return execCommand("justifyFull"); }); }, title: "Justify" }, { children: jsxRuntime.jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24" }, { children: jsxRuntime.jsx("path", { d: "M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z" }) })) })), jsxRuntime.jsx("button", __assign({ onClick: function () {
                            return handleMenuAction(function () { return execCommand("insertOrderedList"); });
                        }, title: "Ordered List" }, { children: jsxRuntime.jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24" }, { children: jsxRuntime.jsx("path", { d: "M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z" }) })) })), jsxRuntime.jsx("button", __assign({ onClick: function () {
                            return handleMenuAction(function () { return execCommand("insertUnorderedList"); });
                        }, title: "Unordered List" }, { children: jsxRuntime.jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24" }, { children: jsxRuntime.jsx("path", { d: "M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" }) })) })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(handleLinkInsert); }, title: "Insert Link" }, { children: jsxRuntime.jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24" }, { children: jsxRuntime.jsx("path", { d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" }) })) })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(handleImageInsert); }, title: "Insert Image" }, { children: jsxRuntime.jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24" }, { children: jsxRuntime.jsx("path", { d: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" }) })) })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(handleTableInsert); }, title: "Insert Table" }, { children: jsxRuntime.jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24" }, { children: jsxRuntime.jsx("path", { d: "M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z" }) })) })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(handleCodeBlock); }, title: "Insert Code Block" }, { children: jsxRuntime.jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24" }, { children: jsxRuntime.jsx("path", { d: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" }) })) })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(toggleMode); }, title: "Toggle Markdown Mode" }, { children: mode === "wysiwyg" ? "MD" : "WYSIWYG" })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(undo); }, title: "Undo" }, { children: jsxRuntime.jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24" }, { children: jsxRuntime.jsx("path", { d: "M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" }) })) })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(redo); }, title: "Redo" }, { children: jsxRuntime.jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24" }, { children: jsxRuntime.jsx("path", { d: "M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" }) })) })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(handleTextDirection); }, title: "Toggle Text Direction" }, { children: jsxRuntime.jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24" }, { children: jsxRuntime.jsx("path", { d: "M9 10v5h2V4h2v11h2V4h2V2H9C6.79 2 5 3.79 5 6s1.79 4 4 4zm12 8l-4-4v3H5v2h12v3l4-4z" }) })) })), jsxRuntime.jsxs("div", __assign({ className: "paste-options" }, { children: [jsxRuntime.jsxs("label", { children: [jsxRuntime.jsx("input", { type: "checkbox", checked: cleanPasteEnabled, onChange: function (e) { return setCleanPasteEnabled(e.target.checked); } }), "Clean Paste"] }), jsxRuntime.jsxs("label", { children: [jsxRuntime.jsx("input", { type: "checkbox", checked: showPastePreview, onChange: function (e) { return setShowPastePreview(e.target.checked); } }), "Show Paste Preview"] }), jsxRuntime.jsxs("label", { children: [jsxRuntime.jsx("input", { type: "checkbox", checked: isInlineDiffEnabled, onChange: function (e) { return setIsInlineDiffEnabled(e.target.checked); } }), "Inline Diff View"] }), jsxRuntime.jsx("button", __assign({ onClick: function () {
                                    return handleMenuAction(function () { return setIsCustomRulesModalOpen(true); });
                                } }, { children: "Custom Rules" })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(saveRuleSet); } }, { children: "Save Rule Set" })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(loadRuleSet); } }, { children: "Load Rule Set" }))] })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handleMenuAction(toggleCase); }, title: "Toggle Case" }, { children: jsxRuntime.jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24" }, { children: jsxRuntime.jsx("path", { d: "M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z" }) })) }))] })), mode === "wysiwyg" ? (jsxRuntime.jsx("div", { ref: editorRef, className: "editor-content", contentEditable: true, onInput: handleInput, onKeyDown: handleKeyDown, onPaste: handlePaste, dangerouslySetInnerHTML: { __html: content } })) : (jsxRuntime.jsx("div", __assign({ className: "editor-content markdown-content" }, { children: jsxRuntime.jsx(ReactMarkdown__default["default"], __assign({ remarkPlugins: [remarkGfm__default["default"]] }, { children: content })) }))), pastePreviewData && (jsxRuntime.jsxs("div", __assign({ className: "paste-preview" }, { children: [jsxRuntime.jsx("h3", { children: "Paste Preview" }), jsxRuntime.jsxs("div", __assign({ className: "preview-content" }, { children: [jsxRuntime.jsxs("div", { children: [jsxRuntime.jsx("h4", { children: "Original" }), isInlineDiffEnabled ? (jsxRuntime.jsx("div", { children: renderInlineDiff(pastePreviewData.original, pastePreviewData.cleaned) })) : (jsxRuntime.jsx("div", { dangerouslySetInnerHTML: {
                                            __html: pastePreviewData.original,
                                        } }))] }), !isInlineDiffEnabled && (jsxRuntime.jsxs("div", { children: [jsxRuntime.jsx("h4", { children: "Cleaned" }), jsxRuntime.jsx("div", { dangerouslySetInnerHTML: {
                                            __html: pastePreviewData.cleaned,
                                        } })] }))] })), jsxRuntime.jsxs("div", __assign({ className: "preview-actions" }, { children: [jsxRuntime.jsx("button", __assign({ onClick: function () {
                                    return handlePasteFromPreview(pastePreviewData.original);
                                } }, { children: "Use Original" })), jsxRuntime.jsx("button", __assign({ onClick: function () { return handlePasteFromPreview(pastePreviewData.cleaned); } }, { children: "Use Cleaned" })), jsxRuntime.jsx("button", __assign({ onClick: function () { return setPastePreviewData(null); } }, { children: "Cancel" }))] }))] }))), isCustomRulesModalOpen && (jsxRuntime.jsxs("div", __assign({ className: "custom-rules-modal" }, { children: [jsxRuntime.jsx("h3", { children: "Custom Paste Rules" }), jsxRuntime.jsx("div", __assign({ className: "custom-rules-list" }, { children: customRules.map(function (rule, index) { return (jsxRuntime.jsxs("div", __assign({ className: "custom-rule" }, { children: [jsxRuntime.jsxs("span", { children: ["Find: ", rule.find] }), jsxRuntime.jsxs("span", { children: ["Replace: ", rule.replace] }), jsxRuntime.jsx("button", __assign({ onClick: function () { return removeCustomRule(index); } }, { children: "Remove" }))] }), index)); }) })), jsxRuntime.jsxs("div", __assign({ className: "add-custom-rule" }, { children: [jsxRuntime.jsx("input", { type: "text", placeholder: "Find", value: newRule.find, onChange: function (e) {
                                    return setNewRule(__assign(__assign({}, newRule), { find: e.target.value }));
                                } }), jsxRuntime.jsx("input", { type: "text", placeholder: "Replace", value: newRule.replace, onChange: function (e) {
                                    return setNewRule(__assign(__assign({}, newRule), { replace: e.target.value }));
                                } }), jsxRuntime.jsx("button", __assign({ onClick: addCustomRule }, { children: "Add Rule" }))] })), jsxRuntime.jsx("button", __assign({ onClick: function () { return setIsCustomRulesModalOpen(false); } }, { children: "Close" }))] }))), isTableModalOpen && (jsxRuntime.jsxs("div", __assign({ className: "table-modal" }, { children: [jsxRuntime.jsx("h3", { children: "Insert Table" }), jsxRuntime.jsx("div", { children: jsxRuntime.jsxs("label", { children: ["Rows:", jsxRuntime.jsx("input", { type: "number", min: "1", value: tableRows, onChange: function (e) {
                                        return setTableRows(Number.parseInt(e.target.value));
                                    } })] }) }), jsxRuntime.jsx("div", { children: jsxRuntime.jsxs("label", { children: ["Columns:", jsxRuntime.jsx("input", { type: "number", min: "1", value: tableColumns, onChange: function (e) {
                                        return setTableColumns(Number.parseInt(e.target.value));
                                    } })] }) }), jsxRuntime.jsx("div", { children: jsxRuntime.jsxs("label", { children: [jsxRuntime.jsx("input", { type: "checkbox", checked: tableHeaders, onChange: function (e) { return setTableHeaders(e.target.checked); } }), "Include headers"] }) }), jsxRuntime.jsxs("div", { children: [jsxRuntime.jsx("button", __assign({ onClick: insertTable }, { children: "Insert" })), jsxRuntime.jsx("button", __assign({ onClick: function () { return setIsTableModalOpen(false); } }, { children: "Cancel" }))] })] }))), jsxRuntime.jsx(AIContentModal, { isOpen: isAIContentModalOpen, onClose: function () { return setIsAIContentModalOpen(false); }, onGenerate: function (prompt) {
                    handleAIContentGeneration(prompt);
                    setIsAIContentModalOpen(false);
                } }), jsxRuntime.jsx("input", { type: "file", ref: fileInputRef, style: { display: "none" }, onChange: handleFileChange, accept: "image/*,audio/*,video/*" }), jsxRuntime.jsx("div", { className: "resize-handle", onMouseDown: function () { return setIsResizing(true); } })] })));
});
AwesomeEditor.displayName = "AwesomeEditor";

var formSchema = z__namespace.object({
    content: z__namespace.string().min(10, {
        message: "Content must be at least 10 characters.",
    }),
});
var blogExampleContent = "\n<h1>The Future of Artificial Intelligence: Transforming Industries</h1>\n\n<img src=\"/placeholder.svg?height=400&width=800\" alt=\"AI concept illustration\" style=\"max-width: 100%; height: auto;\">\n\n<h2>Listen to the Audio Summary</h2>\n<audio controls>\n  <source src=\"/path-to-audio-file.mp3\" type=\"audio/mpeg\">\n  Your browser does not support the audio element.\n</audio>\n\n<h2>Watch Our AI Expert Interview</h2>\n<video controls style=\"max-width: 100%;\">\n  <source src=\"/path-to-video-file.mp4\" type=\"video/mp4\">\n  Your browser does not support the video tag.\n</video>\n\n<h2>Introduction</h2>\n<p>Artificial Intelligence (AI) is rapidly evolving and transforming various industries. From healthcare to finance, AI is revolutionizing the way we work, live, and interact with technology. In this blog post, we'll explore the current state of AI and its potential future impacts.</p>\n\n<h2>Key Features of Modern AI</h2>\n<div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 20px;\">\n  <div>\n    <h3>Machine Learning</h3>\n    <ul>\n      <li>Deep Learning</li>\n      <li>Neural Networks</li>\n      <li>Reinforcement Learning</li>\n    </ul>\n  </div>\n  <div>\n    <h3>Natural Language Processing</h3>\n    <ul>\n      <li>Sentiment Analysis</li>\n      <li>Language Translation</li>\n      <li>Chatbots and Virtual Assistants</li>\n    </ul>\n  </div>\n</div>\n\n<h2>Industries Being Transformed</h2>\n<div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 20px;\">\n  <div>\n    <h3>Healthcare</h3>\n    <p>AI is improving diagnostics, drug discovery, and personalized treatment plans.</p>\n  </div>\n  <div>\n    <h3>Finance</h3>\n    <p>AI-powered algorithms are enhancing fraud detection and automated trading.</p>\n  </div>\n</div>\n\n<h2>Conclusion</h2>\n<p>As AI continues to advance, we can expect to see even more innovative applications across various sectors. The future of AI is bright, and its potential to improve our lives and solve complex problems is immense.</p>\n";
function AwesomeEditorForm() {
    var form = reactHookForm.useForm({
        resolver: zod.zodResolver(formSchema),
        defaultValues: {
            content: blogExampleContent,
        },
    });
    function onSubmit(values) {
        console.log(values);
    }
    return (jsxRuntime.jsxs("form", __assign({ onSubmit: form.handleSubmit(onSubmit), className: "space-y-8" }, { children: [jsxRuntime.jsxs("div", { children: [jsxRuntime.jsx(reactHookForm.Controller, { name: "content", control: form.control, render: function (_a) {
                            var field = _a.field;
                            return (jsxRuntime.jsx(AwesomeEditor, { value: field.value, onChange: field.onChange, className: "min-h-[400px] border-2 border-gray-300 rounded-md" }));
                        } }), form.formState.errors.content && jsxRuntime.jsx("p", { children: form.formState.errors.content.message })] }), jsxRuntime.jsx("button", __assign({ type: "submit", className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors" }, { children: "Submit" }))] })));
}

exports.AwesomeEditor = AwesomeEditor;
exports.AwesomeEditorForm = AwesomeEditorForm;
