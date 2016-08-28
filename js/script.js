// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

var refreshInterval = 5;
var usedQuotes = [];
var quotes = [
  {
    quote: 'Whenever you find yourself on the side of the majority, it is time to pause and reflect.',
    source: 'Mark Twain',
    year: '',
    citation: '',
    meta: ['politics', 'introspection']
  },
  {
    quote: 'Every man has a right to his own opinion, but no man has a right to be wrong in his facts.',
    source: 'Bernard Baruch',
    year: '1950',
    citation: 'Yale Book of Modern Proverbs',
    meta: ['reason', 'objectivity']
  },
  {
    quote: 'To find yourself, think for yourself.',
    source: 'Socrates',
    year: '',
    citation: 'The Apology',
    meta: ['individualism', 'philisophy']
  },
  {
    quote: 'Power tends to corrupt, and absolute power corrupts absolutely. Great men are almost always bad men.',
    source: 'John Dalberg-Acton',
    year: '1887',
    citation: 'Letter to Archbishop Mandell Creighton',
    meta: ['politics', 'government']
  },
  {
    quote: 'Always listen to experts. They\'ll tell you what can\'t be done, and why. Then do it.',
    source: 'Robert A. Heinlein',
    year: '1973',
    citation: 'Time Enough For Love',
    meta: ['motivation', 'individualism', 'innovation']
  },
  {
    quote: 'Progress isn\'t made by early risers. It\'s made by lazy men trying to find easier ways to do something.',
    source: 'Robert A. Heinlein',
    year: '1973',
    citation: 'Time Enough For Love',
    meta: ['laziness', 'innovation']
  }
];

// returns a random integer from lower to upper (inclusive)
function randomInteger(lower,upper) {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

// returns a random quote object from the quotes array
function getRandomQuote() {
  var curQuote = 0;
  // loop generates a random number (from 0 to length of quotes array) (initialized here to 0)
  var rand = 0;

  // then checks to see if it exists in the usedQuotes array
  while(curQuote !== -1) {
    // if it's found it generates another random number
    rand = randomInteger(0, quotes.length -1);
    curQuote = usedQuotes.indexOf(rand);
    // if not, it returns that quote and pushes its index to the usedQuotes array
    if (curQuote === -1) {
      usedQuotes.push(rand);
      if (usedQuotes.length === quotes.length) {
        usedQuotes = [];
      }
      return quotes[rand];
    }
  }
}

// converts a tag name (e.g. 'p' or 'img' string) to an opening tag
function buildOpenTag(elm, classText) {
  var openTag = '<' + elm + ' class="' + classText + '">';
  return openTag;
}

// converts a tag name (e.g. 'p' or 'img' string) to n closing tag
function buildCloseTag(elm) {
  var closeTag = '</' + elm + '>';
  return closeTag;
}

// returns a full html element complete with class and inner html
function buildElement(elm, classText, elmText, closeTag) {
  var html = '';
  html = buildOpenTag(elm, classText) + elmText;
  if (closeTag === true) {
    html += buildCloseTag(elm);
 }
  return html;
}

//if the hex color string had its leading zero truncated, this function adds it back
function padHexString(hexString) {
  if (hexString.length < 6) {
    hexString = '0' + hexString;
  }
  return hexString;
}

// returns hex html color string
function randomHexColor() {
  var colorMax = 0xffffff;
  var rgb = randomInteger(0, colorMax);
  var hexString = rgb.toString(16);
  hexString = padHexString(hexString);
  return  '#' + hexString;
}

// constructs a string from the quote object and attaches it to the DOM
function printQuote() {
  var quote = getRandomQuote();
  var quoteBox = document.getElementById('quote-box');
  var bg = document.getElementsByTagName('body')[0];
  var elmType = '';
  var html = '';
  var closeTag = true;

  // create an element for each property of the quote object
  for (var key in quote) {
    // don't display meta tags or blank properties
    if (key !== 'meta' && quote[key] !== '') {
      // quote & source properties get a <p> and others are <span>s
      if (key === 'quote' || key === 'source') {
        elmType = 'p';
      } else {
        elmType = 'span';
      }
      // don't add a </p> tag until after the source properties are printed
      if (elmType === 'p' && quote[key] !== quote.length) {
        closeTag = false;
      } else {
        closeTag = true;
      }
      html += buildElement(elmType, key, quote[key], closeTag);
      bg.style.backgroundColor = randomHexColor();
      quoteBox.innerHTML = html;
    }
  }
}

var milliseconds = refreshInterval * 1000;
window.setInterval(printQuote, milliseconds);
