const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

/* Show new quote */
function newQuote(){
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
    quoteText.textContent = quote.text;
}

/* Get quotes from API */
async function getQuotes(){
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

/* On load */
getQuotes();