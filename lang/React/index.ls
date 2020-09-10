import 'react' as R
import 'lodash/fp' as fp



tags = [
    'a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside',
    'audio', 'b', 'base', 'basefont', 'bdi', 'bdo', 'bgsound', 'big', 'blink',
    'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite',
    'code', 'col', 'colgroup', 'command', 'content', 'data', 'datalist', 'dd',
    'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em',
    'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form',
    'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header',
    'hgroup', 'hr', 'html', 'i', 'iframe', 'image', 'img', 'input', 'ins',
    'isindex', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'listing',
    'main', 'map', 'mark', 'marquee', 'math', 'menu', 'menuitem', 'meta',
    'meter', 'multicol', 'nav', 'nextid', 'nobr', 'noembed', 'noframes',
    'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param',
    'picture', 'plaintext', 'pre', 'progress', 'q', 'rb', 'rbc', 'rp', 'rt',
    'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'shadow', 'slot',
    'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub',
    'summary', 'sup', 'svg', 'table', 'tbody', 'td', 'template', 'textarea',
    'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt', 'u', 'ul',
    'var', 'video', 'wbr', 'xmp'
]


html = fp.map ( props children ->  R.createElement props ...children ) tags



myComp = props -> html.div { onClick: console.log } [ props.title ]


other = props -> myComp { title: 'hello world' }




render = other {} []