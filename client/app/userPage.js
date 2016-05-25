var React = require('react');
var ReactDOM = require('react-dom');

 class App extends React.Component {
	
	constructor(props) {
		super(props) 
		this.state = {
			users: [],
			user: props.users[0],
			wods: [],
			wod: props.wods[0],
			results: [],
			quotes: [],
			quote: props.quotes[0]
		}
	}

	componentDidMount() {
		this.loadUsers();
		this.loadResults();
		this.loadWods();
		this.loadQuotes();
	}

	loadUsers() {
		var context = this;
		$.ajax('/users').done(function(users) {
			console.log('users', users);
			context.setState({ users: users });
			context.setState({ user: users[0] });
		})
	}

	loadResults() {
		var context = this;
		$.ajax('/results').done(function(results) {
			console.log('results', results);
			context.setState({ results: results });
		})
	}

	loadWods() {
		var context = this;
		$.ajax('/wods').done(function(wods) {
			console.log('wods', wods);
			context.setState({ wods: wods });
			context.setState({ wod: wods[0] });
		})
	}

	loadQuotes() {
		var context = this;
		$.ajax('/quotes').done(function(quotes) {
			console.log('quotes', quotes);
			context.setState({ quotes: quotes });
			context.setState({ quote: quotes[0] });
		})
	}

	randomQuote() {
		console.log('sdafasf', this.state.quotes);
		var index = Math.floor(Math.random() * this.state.quotes.length);
		this.setState({ quote: this.state.quotes[index]});
	} 

	handleQuoteSubmit(quote) {
		// context for ajax post
		var context = this;
		this.setState({ quotes: this.state.results.concat([quote])});
	}

	handleNewUserSubmit(user) {
		//context for ajax post
		var context = this;
		this.setState({ users: this.state.users.concat([user])});
	}

	handleScoreSubmit(result) {
		var context = this;
		var dateObj = new Date();
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		var newDate = '' + month + '/' + day + '/' + year 
		result.date = newDate;
		this.setState({results: [result].concat(this.state.results)});
		// $.ajax({
	 //      type: 'POST', 
	 //      url: '/results', 
	 //      contentType: 'application/json',
	 //      cache: false,
	 //      data: JSON.stringify(result),
	 //      success: function(data) {
	 //      	console.log('added successfully');
	 //      }.bind(this),
	 //      error: function(xhr, status, err) {
	 //        console.log("Error adding result:", err);
	 //      }.bind(this)
	    // });
	}

	render() {
		return ( 
			<div>
				<NavBar users={this.state.users} wods={this.state.wods} setAppState={this.setState.bind(this)}/>
				<UserInfo user={this.state.user} />
				<WodViewer wod={this.state.wod} />
				<EnterResults wod={this.state.wod} user={this.state.user} handleScoreSubmit={this.handleScoreSubmit.bind(this)}/> 
				<MotivateMe quote={this.state.quote} randomQuote={this.randomQuote.bind(this)} handleQuoteSubmit={this.handleQuoteSubmit.bind(this)}/>
				<UserFeed results={this.state.results} users={this.state.users} />
				<NewUserModal handleNewUserSubmit={this.handleNewUserSubmit.bind(this)}/>
			</div>
		);
	}
}

var MotivateMe = (props) => (
	<div className='col-md-6 motivateMe'>
		<div className='panel panel-success'>
			<div className='panel-heading'>
				<h2>Motivate Me</h2>
			</div>
			<div className='panel-body motivateStuff'>
				<Quote quote={props.quote} />
				<button className="btn btn-success" onClick={() => props.randomQuote()}>Motivate Me Again</button>
			</div>
		</div>
		<div className="panel panel-default" id="panel1">
		    <div className="panel-heading">
		    	<h4 className="panel-title"><a data-toggle="collapse" data-target="#collapseOne" href="#collapseOne">Have a Quote?</a></h4>
		    </div>
		    <div id="collapseOne" className="panel-collapse collapse">
		        <div className="panel-body">
			        <div className='form-group'>
			        	<label className='mylabel'>Enter a Quote</label>
			        	<input id='quote' type='text' className='form-control' placeholder='Quote Me'></input>
			        	<label className='mylabel'>Enter an Author</label>
			        	<input id='author' type='text' className='form-control' placeholder='Author Me'></input>
			        	<br></br>
			        	<button onClick={() => props.handleQuoteSubmit({ quote: $('#quote').val(), author: $('#author').val() })} type='submit' className='btn btn-primary'>Submit</button>
			        </div>
		        </div>
		    </div>
		</div>
	</div>
)

var Quote = (props) => (
	<div>
		<h3 className='quote'><i>{props.quote.quote}</i></h3>
		<p><i>{props.quote.author}</i></p>
	</div>
)

var UserFeed = (props) => (
	<div className='list-group col-md-6 userFeed'> 
		{props.results.map(result => 
			<UserFeedPost result={result} users={props.users}/>
		)}
	</div>
)

var UserFeedPost = (props) => (
	<a className="list-group-item">
	  	<div>
		  <span className="label label-default label-pill pull-xs-right">{props.result.date}</span>
	  	</div>
	  	<div>
		  	<div className='userFeed'>
		  		<img className='img-thumbnail userFeedImage' src={props.result.url}></img>
			</div>
			<div className='userFeedText'>
			  <h4 className="list-group-item-heading">{props.result.name}</h4>
			  <p className="list-group-item-text">{props.result.name} finished {props.result.wod} in {props.result.time}!</p>
			  <p className="list-group-item-text">{props.result.name} finished {props.result.wod} with {props.result.rounds} + {props.result.partial} rounds!</p>
			</div>  
		</div>
		<div>  
		  <button className="btn btn-xs btn-success">Like</button>
		  <button className="btn btn-xs btn-danger">Dislike</button>
		</div>
	</a>
)

// var UserLike = (props) => (
// 	<p className="list-group-item-text">{props.result.name} is glad that you lost!</p>
// )

// var UserDislike = (props) => (
// 	<p className="list-group-item-text">{props.result.name} has a bad taste in his mouth after that loss!</p>
// )

var NavBar = (props) => (
	<div>
		<nav className="navbar navbar-default navbar-static-top">
		  <div className="container">
		    <div className="navbar-header">
		      <a className="navbar-brand">Beyond The Whiteboard</a>
		    </div>
		    <div id="navbar" className="navbar-collapse collapse">
		      <ul className="nav navbar-nav">
		        <li className="active"><a>Home</a></li>
		        <li><a>About</a></li>
		        <li><a>Contact</a></li>
		        <li className="dropdown">
		          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Users<span className="caret"></span></a>
		          <ul className="dropdown-menu">
		            {props.users.map(user => 
						<DropdownUser user={user} setAppState={props.setAppState}/>
		            )}
		          </ul>
		        </li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">WODs<span className="caret"></span></a>
                  <ul className="dropdown-menu">
                  	<li className="dropdown-header">Benchmark</li>
					{props.wods.filter(wod => wod.type === 'benchmark').map(benchmark => 
						<DropdownBenchmarkWod wod={benchmark} setAppState={props.setAppState}/>
					)}
					<li role="separator" className="divider"></li>
					<li className="dropdown-header">Heroes</li>
					{props.wods.filter(wod => wod.type === 'hero').map(hero => 
						<DropdownHeroWod wod={hero} setAppState={props.setAppState}/>
					)}
					<li role="separator" className="divider"></li>
					<li className="dropdown-header">Past Open</li>
					{props.wods.filter(wod => wod.type === 'open').map(open => 
						<DropdownOpenWod wod={open} setAppState={props.setAppState}/>
					)}
                  </ul>
                </li>
		      </ul>
		      <ul className='nav navbar-nav navbar-right'>
		      	 <li><a type="button" data-toggle="modal" data-target="#myModal">Signup</a></li>
		      	 <li><a>Logout</a></li>
		      </ul>
		    </div>
		  </div>
		</nav>
	</div>
)

var DropdownUser = (props) => (
	<li><a onClick={() => props.setAppState({ user: props.user })}>{props.user.name}</a></li>
)
var DropdownBenchmarkWod = (props) => (
	<li><a onClick={() => props.setAppState({ wod: props.wod })}>{props.wod.name}</a></li>
)

var DropdownHeroWod = (props) => (
	<li><a onClick={() => props.setAppState({ wod: props.wod })}>{props.wod.name}</a></li>
)

var DropdownOpenWod = (props) => (
	<li><a onClick={() => props.setAppState({ wod: props.wod })}>{props.wod.name}</a></li>
)

var UserInfo = (props) => (
	<div className='container-fluid col-xs-6 col-sm-3 userInfo'>
		<img className='img-thumbnail userInfoImage' src={props.user.url}></img>
		<h3>{props.user.name}</h3>
		<p>{props.user.sex} | {props.user.age}</p>
		<p>Affiliate: {props.user.affiliate}</p>
	</div>
)

var WodViewer = (props) => (
	<div className='col-sm-4 wodViewer'>
		<div className='panel panel-default'>
			<div className='panel-heading'>
				<h2>{props.wod.name}</h2>
			</div>
			<div className='panel-body'>
				{props.wod.description.map(line =>
					<p>{line}</p>
				)}
			</div>
		</div>
	</div>
)

var EnterResults = (props) => (
	<div className='col-sm-4 enterResults'>
		<div className='panel panel-default'>
			<div className='panel-heading'>
				<h2>Results</h2>
			</div>
			<div className='panel-body'>
				<div className='form-group'> 
					<label className='mylabel'>What was your time?</label>
					<input id='time' type='text' className='form-control' placeholder='Enter your time'></input>
					<button onClick={() => props.handleScoreSubmit({ name: props.user.name, wod: props.wod.name, time: $('#time').val(), date: '', url: props.user.url})} type='submit' className='btn btn-primary'>Submit</button>
				</div> 
				<div className='form-group'>
					<label className='mylabel'>How Many Rounds Did You Do?</label>
					<input id='rounds' type='text' className='form-control' placeholder='Enter your rounds'></input>
					<input id='partial' type='text' className='form-control' placeholder='Enter your partial'></input>
					<button onClick={() => props.handleScoreSubmit({name: props.user.name, wod: props.wod.name, rounds: $('#rounds').val(), partial: $('#partial').val(), date: '', url: props.user.url})} type='submit' className='btn btn-primary'>Submit</button>
				</div>
			</div>
		</div>
	</div>
)
var NewUserModal = (props) => (
	<div id="myModal" className="modal fade" role="dialog">
	  <div className="modal-dialog">
	    <div className="modal-content">
	      <div className="modal-header">
	        <button type="button" className="close" data-dismiss="modal">&times;</button>
	        <h4 className="modal-title">Signup As a New User</h4>
	      </div>
	      <div className="modal-body">
	        <label>Name</label>
	        <input id='userName' type='text' className='form-control' placeholder='Enter your Name'></input>
			<label>Male or Female?</label>
			<input id='userSex' type='text' className='form-control' placeholder='Male or Female?'></input>
			<label>Age</label>
			<input id='userAge' type='text' className='form-control' placeholder='Enter your Age'></input>
			<label>Profile Picture Link</label>
			<input id='userUrl' type='text' className='form-control' placeholder='Enter a profile picture link'></input>
			<label>Affiliate</label>
			<input id='userAffiliate' type='text' className='form-control' placeholder='Enter your affiliate/box'></input>
	      </div>
	      <div className="modal-footer">
	        <button onClick={() => props.handleNewUserSubmit({ name: $('#userName').val(), sex: $('#userSex').val(), age: $('#userAge').val(), url: $('#userUrl').val(), affiliate: $('#userAffiliate').val()})} type="button" className="btn btn-primary" data-dismiss="modal">Submit</button>
	      </div>
	    </div>
	  </div>
	</div>
) 

ReactDOM.render(<App users={users} wods={wods} results={results} quotes={quotes}/>, document.getElementById('app'));



