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
				<NavBar users={this.state.users} setAppState={this.setState.bind(this)}/>
				<UserInfo user={this.state.user} />
				<WodViewer wod={this.state.wod} />
				<EnterResults wod={this.state.wod} user={this.state.user}/> 
				<WorkoutSelect wods={this.state.wods} setAppState={this.setState.bind(this)}/>

			</div>
		);
	}
}

var EnterResults = (props) => (
	<div className='col-sm-4'>
		<div className='panel panel-default'>
			<div className='panel-heading'>
				<h2>Results</h2>
			</div>
			<div className='panel-body'>
				<div className='form-group'> 
					<label>What was your time?</label>
				</div>
				<div className='form-group'> 
					<input id='time' type='text' className='form-control' placeholder='really?'></input>
					<button onClick={() => props.handleScoreSubmit({time: $('#time').val()})} type='submit' className='btn btn-primary'>Submit</button>
				</div>
				<div className='form-group'>
					<label>How Many Rounds Did You Do?</label>
				</div>
				<div className='form-group'>
					<input id='rounds' type='text' className='form-control' placeholder='really?'></input>
					<input id='partial' type='text' className='form-control' placeholder='really?really?'></input>
					<button onClick={() => props.handleScoreSubmit({rounds: $('#rounds').val(), partial: $('#partial').val()})} type='submit' className='btn btn-primary'>Submit</button>
				</div>
			</div>
		</div>
	</div>
)
var WorkoutSelect = (props) => (
	<div>
		<div className='col-sm-4'>
			<h3>Benchmark</h3>
			<div className='list-group'>
				{props.wods.filter(wod => wod.type === 'benchmark').map(benchmark => 
					<BenchmarkWod wod={benchmark} setAppState={props.setAppState}/>
				)}
			</div>
		</div>
		<div className='col-sm-4'>
			<h3>Heroes</h3>
			<div className='list-group'>
				{props.wods.filter(wod => wod.type === 'hero').map(hero => 
					<HeroWod wod={hero} setAppState={props.setAppState}/>
				)}
			</div>
		</div>
		<div className='col-sm-4'>
			<h3>Past Open</h3>
			<div className='list-group'>
				{props.wods.filter(wod => wod.type === 'open').map(open => 
					<OpenWod wod={open} setAppState={props.setAppState}/>
				)}
			</div>
		</div>
	</div>

)
var BenchmarkWod = (props) => (
	<a className='list-group-item' onClick={() => props.setAppState({ wod: props.wod })}>{props.wod.name}</a>
)

var HeroWod = (props) => (
	<a className='list-group-item' onClick={() => props.setAppState({ wod: props.wod })}>{props.wod.name}</a>
)

var OpenWod = (props) => (
	<a className='list-group-item' onClick={() => props.setAppState({ wod: props.wod })}>{props.wod.name}</a>
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
		          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
		          <ul className="dropdown-menu">
		            {props.users.map(user => 
						<DropdownUser user={user} setAppState={props.setAppState}/>
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

var UserInfo = (props) => (
	<div className='container-fluid col-md-6'>
		<img className='img-thumbnail' src={props.user.url}></img>
		<p>{props.user.name}</p>
		<p>{props.user.sex} | {props.user.age}</p>
		<p>Affiliate: {props.user.affiliate}</p>
	</div>
)

ReactDOM.render(<App users={users} wods={wods}/>, document.getElementById('app'));



