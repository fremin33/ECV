export function isTweetFr(tweet) {
    // return "fr" === tweet.lang;
    return tweet.lang && tweet.lang.startsWith('fr');
}


export function tweetsByAuthor(tweets, author) {
    return tweets.filter(tweet => tweet.user.screen_name == author)
}
export function tweetsByHashtag(tweets, hashtagSend) {
    let newTweets = [];
    tweets.forEach(function (tweet) {
        tweet.entities.hashtags.map(hashtag => {
             if (hashtag.text === hashtagSend) {
                 newTweets.push(tweet);
             };
        })
    });
    return newTweets;
}


export function getHashtags(tweets) {
    let hashtags = [];
    tweets.forEach(function (tweet) {
        tweet.entities.hashtags.map(hashtag => {
            return hashtag.text
        }).forEach(function (hashtagText) {
            if (!hashtags.includes(hashtagText))
                hashtags.push(hashtagText);
        });
    });
    return hashtags;
}