const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

/* Show loading */
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

/* Hide loading */
function removeLoadingSpinner(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

/* Show new quote */
function newQuote(){
    showLoadingSpinner();
    /* Pick a random quote from apiQuotes array */
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    /* If author empty */
    if(!quote.author){
        authorText.textContent = "unknown";
    } else {
        authorText.textContent = quote.author;
    }

    /* if quote too long */
    if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    /* Set quote, hide loader */
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

/* Get quotes from API */
async function getQuotes(){
    showLoadingSpinner();
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        /* Catch error here */

    }
}

/* Tweet quote */
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank'); 
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

/* On load */
getQuotes();
