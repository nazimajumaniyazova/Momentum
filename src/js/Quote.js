import { defaultUserLang } from './utils';
export class Quote {
  constructor() {
    this.defaultUserLang = defaultUserLang;
    this.quote = document.querySelector('.quote');
    this.author = document.querySelector('.author');
    this.getQuote();
  }
  static isDisplayQuote(displayQuote) {
    const quoteContainer = document.querySelector('.quote-container');
    if (displayQuote) {
      quoteContainer.style.display = 'block';
    } else {
      quoteContainer.style.display = 'none';
    }
  }
  async getQuote() {
    const quotesURL = `https://api.api-ninjas.com/v1/quotes?category=success`;
    const response = await fetch(quotesURL, {
      headers: { 'X-Api-Key': 'm4X8MXFaSqn6FuoXmzlm5w==2TXG8RfnHfRI5R43' },
      contentType: 'application/json',
    });
    const quote = await response.json();
    if (this.defaultUserLang === 'en') {
      this.displayQuote(quote[0]);
      return;
    }
    const translatedQuote = await this.translateQuote(quote[0].quote);
    quote[0].quote = translatedQuote;
    this.displayQuote(quote[0]);
  }
  displayQuote({ quote, author }) {
    this.quote.innerHTML = `" ${quote} "`;
    this.author.innerHTML = `${author}`;
  }
  async translateQuote(quote) {
    var sourceText = quote;
    var sourceLang = 'en';
    var targetLang = 'ru';
    var url =
      'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' +
      sourceLang +
      '&tl=' +
      targetLang +
      '&dt=t&q=' +
      encodeURI(sourceText);
    const res = await fetch(url);
    const data = await res.json();
    return data[0][0][0];
  }
  changeQuoteLang(lang) {
    this.defaultUserLang = lang;
    this.getQuote();
  }
}
