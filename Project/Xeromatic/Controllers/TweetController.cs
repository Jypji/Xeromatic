using System.Collections;
using System.Collections.Generic;
using System.Web.Http;
using Xeromatic.Models;
using Xeromatic.Services;

namespace Xeromatic.Controllers
{
    public class TweetController : ApiController
    {
        private readonly TweetDbService _tweetDbService;
        private readonly TwitterApiService _twitterApiService;

        public TweetController()
			{
            _tweetDbService = new TweetDbService();
            _twitterApiService = new TwitterApiService();
        }

        // GET: /PinnedTweets
        // Returns the tweets from the database.
        [HttpGet]
        [Route("PinnedTweets")]
        public IEnumerable<Tweet> PinnedTweets()
        {
            var tweets = _tweetDbService.GetTweets();
            return tweets;
        }

	    [HttpGet]
	    [Route("RecentTweets")]
	    public IEnumerable<Tweet> RecentTweets()
	    {
		    var tweets = _twitterApiService.GetTweets();
		    return tweets;
	    }

		//POST: /PinTweet
		//Saves a tweet to the database
	    [HttpPost]
	    [Route("PinTweet")]
	    public void PinTweet(Tweet tweet)
	    {
			_tweetDbService.InsertTweet(tweet);
	    }
    }
}
