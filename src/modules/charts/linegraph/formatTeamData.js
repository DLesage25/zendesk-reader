import _ from 'lodash';
import moment from 'moment-timezone';
import colorSchemes from './colorScheme';

const formatChartData = async(globalProgram, productivityData) => {
    let groupedData = await groupAllData(globalProgram, productivityData);
    let formattedData = await formatAllData(groupedData);
    return formattedData;
}

const groupAllData = async(globalProgram, productivityData) => {
    let groupedData = await processAllDays(globalProgram, productivityData);
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

const processAllDays = async(globalProgram, productivityData) => {
    let goal = globalProgram.settings.goal;   
    let days = Object.keys(productivityData);
    let groupedData = [];

    days.map(async(dayKey) => {
        let dayData = productivityData[dayKey];
        let formattedDayData = await buildDayObject(dayKey, dayData, goal)
        groupedData.push(formattedDayData)
    })
    return groupedData;
}

const buildDayObject = async(dayKey, dayData, goal) => {
    let hours = Object.keys(dayData.byHour);
    let dayObject = await getSeries(dayData.byHour, hours, dayKey, goal);
    return dayObject;
}

const getSeries = async(dayData, hours, dayKey, goal) => {
    let goalLine = [];
    let productionLine = [];

    hours.map((hour) => {
        let index = dayData[hour];

        //convert to array
        index = Object.keys(index).map(function(key) { return index[key]; });
        //filter out queue load
        index = _.filter(index, function(o) { return o.email && o.objectType === 'userHourlyStatus' })

        let totalHourlyGoal = _.sumBy(index, function(o) { return Number(o.goal) });
        let totalHourlyProd = _.sumBy(index, function(o) { return Number(o[goal]) });

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