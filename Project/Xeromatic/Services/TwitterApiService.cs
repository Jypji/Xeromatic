using System.Collections.Generic;
using System.Linq;
using Tweetinvi;
using Tweetinvi.Core.Credentials;
using Xeromatic.Models;
using Tweetinvi;
using Tweetinvi.Core.Credentials;
using Tweet = Xeromatic.Models.Tweet;
using Xeromatic.Services;


using Tweetinvi.Core.Interfaces;

namespace Xeromatic.Services
{
    public class TwitterApiService : ITwitterService
    {
        // Get keys from: https://apps.twitter.com
        // Wiki for tweetinvi: https://github.com/linvi/tweetinvi/wiki

        readonly TwitterCredentials _creds;

        public TwitterApiService()
        {
            _creds = new TwitterCredentials
            {
				ConsumerKey = "p9UQ4Nx1Bslep1aiHkSHtphcA",
				ConsumerSecret = "NJlVxevUgc4Vyy8Fygi8NYZMqMxqNFRoguHiEIuHCQstgpCtxg",
				AccessToken = "718553868930457600-Wt0fNR1czQdcGgWtnmn5R1MRfn4a2pm",
                AccessTokenSecret = "tPZhvhY9o2ai20o3TYRL0LYNLDsAsAHtksGO1FODYnYsN"
            };
        }

        public IEnumerable<Tweet> GetTweets()
        {
	        var tweets = Auth.ExecuteOperationWithCredentials(_creds, () => Timeline.GetUserTimeline("xero", 10))?.ToList();

	        if (tweets !=  null && tweets.Any())
		        return tweets.Select(t => new Tweet
		        {
			        Id = t.Id,
					Text = t.Text
		        });

	        return new List<Tweet>(); //Returns a list of tweet models
        }

    }
}