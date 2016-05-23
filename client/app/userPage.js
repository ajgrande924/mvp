var React = require('react');
var ReactDOM = require('react-dom');

 class App extends React.Component {
	
	constructor(props) {
		super(props) 
		this.state = {
			users: props.users,
			user: props.users[0],
			wods: props.wods,
			wod: props.wods[0]
		}
	}

	handleScoreSubmit() {
		console.log('bang');
	}

	render() {
		return ( 
			<div>
				<NavBar users={this.state.users} wods={this.state.wods} setAppState={this.setState.bind(this)}/>
				<UserInfo user={this.state.user} />
				<WodViewer wod={this.state.wod} />
				<EnterResults wod={this.state.wod} user={this.state.user}/> 
				<UserFeed />
			</div>
		);
	}
}

var UserFeed = (props) => (
	<div> 
		<UserFeedPost />
	</div>
)

var UserFeedPost = (props) => (
	<div className="navbar navbar-default">
	  <div className="container">
	    <div className="navbar-header">
	      <a className="navbar-brand" href="#">Message Board</a>
	    </div>
	    <ul className="nav navbar-nav">
	      <li className="active"><a href="/">Home</a></li>
	    </ul>
	    <p className="navbar-text pull-right">logged_in_user@email.com | <a href="log_out_link_here">Log Out</a></p>
	  </div>
	</div>
)

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
                  	<li class="dropdown-header">Benchmark</li>
					{props.wods.filter(wod => wod.type === 'benchmark').map(benchmark => 
						<DropdownBenchmarkWod wod={benchmark} setAppState={props.setAppState}/>
					)}
					<li role="separator" class="divider"></li>
					<li class="dropdown-header">Heroes</li>
					{props.wods.filter(wod => wod.type === 'hero').map(hero => 
						<DropdownHeroWod wod={hero} setAppState={props.setAppState}/>
					)}
					<li role="separator" class="divider"></li>
					<li class="dropdown-header">Past Open</li>
					{props.wods.filter(wod => wod.type === 'open').map(open => 
						<DropdownOpenWod wod={open} setAppState={props.setAppState}/>
					)}
                  </ul>
                </li>
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
	<div className='container-fluid col-xs-6 col-sm-3 '>
		<img className='img-thumbnail' src={props.user.url}></img>
		<p>{props.user.name}</p>
		<p>{props.user.sex} | {props.user.age}</p>
		<p>Affiliate: {props.user.affiliate}</p>
	</div>
)

var WodViewer = (props) => (
	<div className='col-sm-4'>
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
	<div className='col-sm-4'>
		<div className='panel panel-default'>
			<div className='panel-heading'>
				<h2>Results</h2>
			</div>
			<div className='panel-body'>
				<div className='form-group'> 
					<label>What was your time?</label>
					<input id='time' type='text' className='form-control' placeholder='really?'></input>
					<button onClick={() => props.handleScoreSubmit({time: $('#time').val()})} type='submit' className='btn btn-primary'>Submit</button>
				</div> 
				<div className='form-group'>
					<label>How Many Rounds Did You Do?</label>
					<input id='rounds' type='text' className='form-control' placeholder='really?'></input>
					<input id='partial' type='text' className='form-control' placeholder='really?really?'></input>
					<button onClick={() => props.handleScoreSubmit({rounds: $('#rounds').val(), partial: $('#partial').val()})} type='submit' className='btn btn-primary'>Submit</button>
				</div>
			</div>
		</div>
	</div>
)






ReactDOM.render(<App users={users} wods={wods}/>, document.getElementById('app'));



