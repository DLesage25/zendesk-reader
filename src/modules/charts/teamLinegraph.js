import _ from 'lodash';
import moment from 'moment-timezone';
import colorSchemes from './linegraphColorScheme';

const formatChartData = async(chartData) => {
    let groupedData = await groupAllData(chartData);
    let formattedData = await formatAllData(groupedData);
    return formattedData;
}

const groupAllData = async(chartData) => {
    let groupedData = await processAllDays(chartData);
    return groupedData;
}

const formatAllData = async(groupedData) => {
    return groupedData.map((dayIndex, dayKey) => {
        var series = dayIndex.series;
        var seriesKeys = Object.keys(series);
        var data = {
            dayKey: dayIndex.dayKey,
            labels: dayIndex.hourLine,
            datasets: [{
                    ...colorSchemes[0],
                    label: seriesKeys[0],
                    data: series[seriesKeys[0]]
                },
                {
                    ...colorSchemes[1],
                    label: seriesKeys[1],
                    data: series[seriesKeys[1]]
                }
            ]
        };
        return data;
    })
}

const processAllDays = async(chartData) => {
    let days = Object.keys(chartData);
    let groupedData = [];

    days.map(async(dayKey) => {
        let dayData = chartData[dayKey];
        let formattedDayData = await buildDayObject(dayKey, dayData)
        groupedData.push(formattedDayData)
    })
    return groupedData;
}

const buildDayObject = async(dayKey, dayData) => {
    let hours = Object.keys(dayData);
    let dayObject = await getSeries(dayData, hours, dayKey);
    return dayObject;
}

const getSeries = async(dayData, hours, dayKey) => {
    let goalLine = [];
    let productionLine = [];

    hours.map((hour) => {
        let index = dayData[hour];

        //convert to array
        index = Object.keys(index).map(function(key) { return index[key]; });
        //filter out queue load
        index = _.filter(index, function(o) { return o.email })

        let totalHourlyGoal = _.sumBy(index, function(o) { return Number(o.goal) });
        let totalHourlyProd = _.sumBy(index, function(o) { return Number(o.touches) });

        goalLine.push(totalHourlyGoal);
        productionLine.push(totalHourlyProd);
    })

    return {
        dayKey: dayKey,
        hourLine: hours,
        series: {
            'Goal': goalLine,
            'Production': productionLine
        }
    }
}

export default {
    formatChartData: formatChartData
}