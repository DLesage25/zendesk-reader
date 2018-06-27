import data from './chartdata';

const formatChartData = async (chartData) => {
		let formattedData = await processDays(chartData);

		return formattedData;
}

const processDays = async (chartData) => {
	async () => {
		let days = Object.keys(chartData);
		let formattedData = [];

		console.log('teamlinegraph days', days);

		days.map(async (day) => {
			let dayData = chartData[day];
			let formattedDayData = await getGoalLine(dayData)
			formattedData.push(formattedDayData) 
		})

		return formattedDayData;
	}
}

const getGoalLine = async(dayData) => {

		let hours = Object.keys(dayData);
		let goalLine = [];

		console.log('teamlinegraph hours', hours);

		hours.map((hour)=>{
			let index = dayData[hour];

			let totalHourlyGoal = _.sumBy(index, function(o) { return o.goal });

			goalLine.push(totalHourlyGoal);
		})

		return goalLine
}

export default {
	formatChartData: formatChartData
}