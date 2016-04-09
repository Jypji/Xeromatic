//React component that takes in some text as a property and displays it
var Tweet = React.createClass({
	render: function() {
		return (
			<li className="clearfix list-group-item">
			{this.props.text}
			{this.props.children}
		</li>
			
		)
	}
});

var Button = React.createClass({ //React components start with capital letter (Easier to identify)
	render: function() {
		return <button onClick= {this.props.link} className="btn btn-info pull-right"> {this.props.label}</button>
	}
});

//React component that makes a call to the API in the HomeController. If more than one tweet is returned, it displays a Tweet component for each.
var App = React.createClass({
	//React function that sets the initial state of the app (where changeable data is stored)
	getInitialState: function() {
		return {
			recentTweets: [],
			pinnedTweets: []
		}; 
	},

	//React function that runs after the app first loads
	componentDidMount: function() {
		var self = this; //self to refer to whole component
		var recentFetch = fetch('/recentTweets', {method: 'get'})
			.then(function(response) {
				return response.json();
			})

		var pinnedFetch = fetch('/pinnedTweets', {method: 'get'})
			.then(function(response) {
				return response.json();
			})

			Promise.all([recentFetch, pinnedFetch]) //Run both until they returned 
			.then(function(data) {
				self.setState({recentTweets: data[0], pinnedTweets: data[1]}); //data coming in as an array
			})
			.catch(function(error) {
				console.error('Error', error);
			});
	},

	//Database
	pin: function(tweet) {
		//Print tweet to console when PIN button has been pressed
		//console.log("Hi JI :) ", tweet);

		var self = this;

		fetch('/pinTweet', {
			method: 'post',
			headers: new Headers({
				'Content-Type' : 'application/json'
			}),
			body: JSON.stringify(tweet)
		})
		.then(function(response) {
			var data = self.state.pinnedTweets;
			data.push(tweet);
				self.setState({ pinnedTweets: data });
		})

		.catch(function(error) {
				console.error('Error',error);
		})

	},

	//React function that runs on first load and whenever the state is changed
	render: function() {
		var self = this;

		var pinnedTweets = (this.state.pinnedTweets.length > 0) ? this.state.pinnedTweets.map(function(tweet) { //Runs function on each element
			return <Tweet key={tweet.Id} text={tweet.Text} />
			})
			: null;

		var recentTweets = (this.state.recentTweets.length > 0) ? this.state.recentTweets.map(function(tweet) { //Runs function on each element
			//Surrounding the button with the tweet

			
			return (  
				<Tweet key={tweet.Id} text={tweet.Text}>
				<Button link= {function() {self.pin(tweet)}} label ="Pin" /> //HTML entity 
				</Tweet> 
				)
			})
			: null;

		return (
			<div className="container">
				<h2>Welcome to the Xeromatic!</h2>
				<img src="http://sci.utq.edu.iq/images/lnew/2.png" alt="Jiiiii"/>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Pinned Tweets (: hehehehehe</h3>
						<h3 classNmae="panel-title"> Hello </h3>
					</div>
					<ul className="list-group">{pinnedTweets}</ul>
				</div>

				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Recent Tweets :)</h3>
					</div>
					<ul className="list-group">{recentTweets}</ul>
				</div>

				<div className="panel panel-default">
					<div className="panel-heading">
						<h1 className="panel-title">Jiiiii</h1>
					</div>
				</div>

					
				

			</div>
		);
	}
});

//This function will render our App to the page
ReactDOM.render(<App />, document.getElementById('app'));