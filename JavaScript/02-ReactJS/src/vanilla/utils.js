export function isTweetFr(tweet) {
    // return "fr" === tweet.lang;
    return tweet.lang && tweet.lang.startsWith('fr');
}


function orderTweet(tweet) { 
        return new Date(b.created_at) - new Date(a.created_at);
 }