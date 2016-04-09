using System;
using System.Collections.Generic;
using Xeromatic.Models;
using System.Linq;
using System.Web;

namespace Xeromatic.Services
{
	public interface ITwitterService
	{
		IEnumerable<Tweet> GetTweets();
	}
}