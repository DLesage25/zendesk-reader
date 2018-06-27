import _ from 'lodash';
import data from './chartdata';

const formatChartData = async (chartData) => {
		let formattedData = await processAllDays(chartData);
		return formattedData;
}

const processAllDays = async (chartData) => {
		let days = Object.keys(chartData);
		let formattedData = [];

		days.map(async (dayKey) => {
			let dayData = chartData[dayKey];
			let formattedDayData = await buildDayObject(dayKey, dayData)
			formattedData.push({[dayKey]:formattedDayData}) 
		})
		return formattedData;
}

const buildDayObject = async (dayKey, dayData) => {	
	let hours = Object.keys(dayData);
	let dayObject = await getSeries(dayData, hours);
	return dayObject;
}

const getSeries = async (dayData, hours) => {
		let goalLine = [];
		let productionLine = [];

		hours.map((hour)=>{
			let index = dayData[hour];

			//convert to array
			index = Object.keys(index).map(function (key) { return index[key]; });
			//filter out queue load
			index = _.filter(index, function(o){ return o.email })

			let totalHourlyGoal = _.sumBy(index, function(o) { return Number(o.goal) });
			let totalHourlyProd = _.sumBy(index, function(o) { return Number(o.touches) });

			goalLine.push(totalHourlyGoal);
			productionLine.push(totalHourlyProd);
		})

		return {goalLine: goalLine, productionLine: productionLine, hourLine: hours}
}

export default {
	formatChartData: formatChartData
}