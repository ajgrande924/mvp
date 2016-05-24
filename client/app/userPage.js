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
			results: []
		}
	}

	componentDidMount() {
		this.loadUsers();
		this.loadResults();
		this.loadWods();
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
				<Buffer results={this.state.results}/>
				<UserFeed results={this.state.results} users={this.state.users} />
			</div>
		);
	}
}

var Buffer = (props) => (
	<div className='list-group col-md-6'> 
		{props.results.map(result => 
			<a className="list-group-item">
			  <h4 className="list-group-item-heading">Buffer</h4>
			  <p className="list-group-item-text">Buffer</p>
			  <p className="list-group-item-text">buffer</p>
			</a>
		)}
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

ReactDOM.render(<App users={users} wods={wods} results={results}/>, document.getElementById('app'));



