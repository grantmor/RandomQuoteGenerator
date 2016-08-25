// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

var quotes = [
  {
    quote: 'Whenever you find yourself on the side of the majority, it is time to pause and reflect.',
    source: 'Mark Twain'
  },
  {
    quote: 'Be who you are and say what you feel, because those who mind don\'t matter and those who matter don\'t mind.',
    source: 'Theodore Seuss Giesel'
  },
  {
    quote: 'To find yourself, think for yourself.',
    source: 'Socrates'
  },
  {
    quote: 'Power tends to corrupt, and absolute power corrupts absolutely. Great men are almost always bad men.',
    source: 'John Dalberg-Acton'
  },
  {
    quote: 'Always listen to experts. They\'ll tell you what can\'t be done, and why. Then do it.',
    source: "Robert A. Heinlein"
  },
  {
    quote: 'Progress isn\'t made by early risers. It\'s made by lazy men trying to find easier ways to do something.',
    source: "Robert A. Heinlein"
  }
];

// returns a random integer from lower to upper (inclusive)
function randomInteger(lower,upper) {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

//returns a random quote object from the quotes array
function getRandomQuote() {
  return quotes[randomInteger(0, quotes.length - 1)];
}

//converts a tag name (e.g. 'p' or 'img' to an opening tag)
function buildOpenTag(elm, classText) {
  var openTag = '<' + elm + ' class="' + classText + '">';
  return openTag;
}

//converts a tag name (e.g. 'p' or 'img' to an closing tag)
function buildCloseTag(elm) {
  var closeTag = '</' + elm + '>';
  return closeTag;
}

//returns a full html element complete with class and inner html
function buildElement(elm, classText, elmText) {
  var html = '';
  html = buildOpenTag(elm, classText) + elmText + buildCloseTag(elm);
  return html;
}

// constructs a string from the quote object and attaches it to the DOM
function printQuote() {
  var quote = getRandomQuote();
  var quoteBox = document.getElementById('quote-box');
  var elmType = '';
  var html = '';

  for (var key in quote) {
    if (key === 'quote' || key === 'source') {
      elmType = 'p';
    } else {
      elmType = 'span';
    }

    html += buildElement(elmType, key, quote[key]);
    quoteBox.innerHTML = html;
  }
}
