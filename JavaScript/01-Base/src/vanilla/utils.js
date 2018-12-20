export function isTweetFr(tweet) {
    // return "fr" === tweet.lang;
    return tweet.lang && tweet.lang.startsWith('fr');
}