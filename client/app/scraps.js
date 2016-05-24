
// handle score submit using dummy data
	handleScoreSubmit(result) {
		console.log('date', new Date());
		var dateObj = new Date();
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		var newDate = '' + month + '/' + day + '/' + year 
		result.date = newDate;
		this.setState({results: [result].concat(this.state.results)});
	}

////implementation of wods in list item view
<WorkoutSelect wods={this.state.wods} setAppState={this.setState.bind(this)}/>

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
///////////////////////////////////////////////////////////////////