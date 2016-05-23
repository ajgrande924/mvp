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