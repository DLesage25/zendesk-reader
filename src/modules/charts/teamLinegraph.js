import _ from 'lodash';
import data from './chartdata';

const formatChartData = async (chartData) => {
		let formattedData = await processDays(chartData);
		return formattedData;
}

const processDays = async (chartData) => {
		let days = Object.keys(chartData);
		let formattedData = [];

		days.map(async (day) => {
			let dayData = chartData[day];
			let formattedDayData = await getGoalLine(dayData)
			formattedData.push(formattedDayData) 
		})

		return formattedData;
}

const getGoalLine = async (dayData) => {
		let hours = Object.keys(dayData);
		let goalLine = [];

		hours.map((hour)=>{
			let index = dayData[hour];

			//convert to array
			index = Object.keys(index).map(function (key) { return index[key]; });
			//filter out queue load
			index = _.filter(index, function(o){ return o.email })

			let totalHourlyGoal = _.sumBy(index, function(o) { return Number(o.goal) });

			goalLine.push(totalHourlyGoal);
		})

		return goalLine
}

export default {
	formatChartData: formatChartData
}