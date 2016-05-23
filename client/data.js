var users = [
	{
		name: 'AJ Grande',
		sex: 'Male',
		age: 26,
		url: '../images/male.icon.png',
		affiliate: 'Crossfit San Leandro'
	},
	{
		name: 'Draymond Green',
		sex: 'male',
		age: 26,
		url: '../images/male.icon.png',
		affiliate: 'Crossfit San Leandro'
	},
	{
		name: 'Chris Rock',
		sex: 'male',
		age: 35,
		url: '../images/male.icon.png',
		affiliate: 'Crossfit San Leandro'
	},
	{
		name: 'Steve Ballmer',
		sex: 'male',
		age: 53,
		url: '../images/male.icon.png',
		affiliate: 'Crossfit San Leandro'
	},
	{
		name: 'Drake',
		sex: 'male',
		age: 32,
		url: '../images/male.icon.png',
		affiliate: 'Crossfit San Leandro'
	},
	{
		name: 'Wanda Sykes',
		sex: 'female',
		age: 37,
		url: '../images/female.icon.png',
		affiliate: 'Crossfit San Leandro'
	},
	{
		name: 'Ellen Degeneres',
		sex: 'female',
		age: 46,
		url: '../images/female.icon.png',
		affiliate: 'Crossfit San Leandro'
	},
		{
		name: 'Jennifer Aniston',
		sex: 'female',
		age: 42,
		url: '../images/female.icon.png',
		affiliate: 'Crossfit San Leandro'
	},
	{
		name: 'Ronda Rousey',
		sex: 'female',
		age: 30,
		url: '../images/female.icon.png',
		affiliate: 'Crossfit San Leandro'
	},
		{
		name: 'Hilary Clinton',
		sex: 'female',
		age: 60,
		url: '../images/female.icon.png',
		affiliate: 'Crossfit San Leandro'
	}
]

var results = [
	{
		name: 'Draymond Green',
		wod: 'Cindy',
		time: null,
		rounds: '13',
		partial: '15'
	},
	{
		name: 'Drake',
		wod: 'Cindy',
		time: null,
		rounds: '13',
		partial: '15'
	},
	{
		name: 'Chris Rock',
		wod: 'Cindy',
		time: null,
		rounds: '18',
		partial: '6'
	},
	{
		name: 'Steve Ballmer',
		wod: 'Cindy',
		time: null,
		rounds: '8',
		partial: '5'
	},
	{
		name: 'AJ Grande',
		wod: 'Cindy',
		time: null,
		rounds: '15',
		partial: '15'
	}
]

var wods = [
	{
		type: 'benchmark',
		name: 'Cindy',
		description: ['Complete as many rounds as possible in 20 mins of:', '5 Pull-ups', '10 Push-ups', '15 Air Squats']
	},
	{	
		type: 'benchmark',
		name: 'Nicole',
		description: ['Complete as many rounds in 20 minutes as you can of:', 'Run, 400 m', 'max rep Pull-ups']
	},
	{	
		type: 'benchmark',
		name: 'Helen',
		description: ['3 rounds for time of:','Run, 400 m','21 Kettlebell Swings, 1.5/1 pood', '12 Pull-ups']
	},
	{	
		type: 'benchmark',
		name: 'Annie',
		description: ['50-40-30-20-10 reps, for time of:','Double Under', 'AbMat Sit-up']
	},
	{	
		type: 'benchmark',
		name: 'Nancy',
		description: ['5 rounds for time of:', 'Run, 400 m', '15 Overhead Squats, 95/65 lbs']
	},

	{	
		type: 'hero',
		name: 'Murph',
		description: ['For time:','Run, 1 mi','100 Pull-ups','200 Push-ups','300 Air Squats','Run, 1 mi']
	},
	{	
		type: 'hero',
		name: 'DT',
		description: ['5 rounds for time of:','12 Deadlifts, 155/105 lbs','9 Hang Power Cleans, 155/105 lbs','6 Push Jerks, 155/105 lbs']
	},
	{	
		type: 'hero',
		name: 'Nutts',
		description: ['For time:','10 Handstand Push Ups','15 Deadlifts, 250/175 lbs','25 Box Jumps, 30/24 in','50 Pull-ups','100 Wall Balls, 20/14 lbs, 10 ft','200 Double Unders','Run, 45/35# plate, 400 m']
	},
	{	
		type: 'hero',
		name: 'Abbate',
		description: ['For time:','Run, 1 mi', '21 Clean & Jerks, 155 lbs','Run, 800 m','21 Clean & Jerks, 155 lbs','Run, 1 mi']
	},
	{	
		type: 'hero',
		name: 'Whitten',
		description: ['5 rounds for time of:','22 Kettlebell Swings, 2 pood','22 Box Jumps, 24 in','Run, 400 m','22 Burpees','22 Wall Balls, 20 lbs']
	},


	{	
		type: 'open',
		name: 'Open 16.4',
		description: ['As many reps as possible in 13 mins of:','55 Deadlifts, 225/155 lbs','55 Wall Balls, 20/14 lbs, 10/9 ft','55 Row Calories','55 Handstand Push-ups']
	},
	{	
		type: 'open',
		name: 'Open 15.3',
		description: ['Complete as many rounds as possible in 14 mins of:','7 Muscle-ups','50 Wall Balls, 20/14 lbs, 10/9 ft','100 Double Unders']
	},
	{	
		type: 'open',
		name: 'Open 14.4',
		description: ['As many reps in 14 mins as you can of:','60 Row (calories)s','50 Toes-to-bars','40 Wall Balls, 20/14 lbs, 10/9 ft','30 Cleans, 135/95 lbs','20 Muscle-ups']
	},
	{	
		type: 'open',
		name: 'Open 13.1',
		description: ['As many reps in 17 mins as you can of:','40 Burpees','30 Snatches, 75/45 lbs','30 Burpees','30 Snatches, 135/75 lbs','20 Burpees','30 Snatches, 165/100 lbs','10 Burpees','Snatch, 210/120 lbs']
	},
	{	
		type: 'open',
		name: 'Open 12.3',
		description: ['Complete as many rounds as possible in 18 mins of:','15 Box Jumps, 24/20 in','12 Push Press, 115/75 lbs','9 Toes To Bars']
	}
]