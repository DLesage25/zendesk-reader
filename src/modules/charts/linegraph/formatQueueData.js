import _ from 'lodash';
import colorSchemes from './colorScheme';

const formatChartData = async(globalProgram, productivityData) => {
    let groupedData = await groupAllData(globalProgram, productivityData);
    let formattedData = await formatAllData(groupedData);
    return formattedData;
}

const groupAllData = async(globalProgram, productivityData) => {
    let groupedData = await processAllDays(productivityData);
    return groupedData;
}

const formatAllData = async(groupedData) => {
    return groupedData.map((dayIndex, dayKey) => {
        var series = dayIndex.series;
        var seriesKeys = Object.keys(series);
        var data = {
            dayKey: dayIndex.dayKey,
            labels: dayIndex.hourLine,
            datasets: seriesKeys.map((seriesKey, arrayKey) => {
                return {
                    ...colorSchemes[arrayKey],
                    label: seriesKey,
                    data: series[seriesKey]
                }
            })
        };
        return data;
    })
}

const processAllDays = async(productivityData) => {
    let days = Object.keys(productivityData);
    let groupedData = [];

    days.map(async(dayKey) => {
        let dayData = productivityData[dayKey];
        let formattedDayData = await buildDayObject(dayKey, dayData)
        groupedData.push(formattedDayData)
    })
    return groupedData;
}

const buildDayObject = async(dayKey, dayData) => {
    let hours = Object.keys(dayData.byHour);
    let dayObject = await getSeries(dayData.byHour, hours, dayKey);
    return dayObject;
}

const getSeries = async(dayData, hours, dayKey, goal) => {
    let queueLoads = {};

    hours.map((hour) => {
        let index = dayData[hour];

        //convert to array
        index = Object.keys(index).map(function(key) { return index[key]; });

        //filter out queue load
        index = _.find(index, function(o) { return o.type === 'queueLoad' });

        if (!index) return true;

        let queueNames = Object.keys(index);

        queueNames.map((queueName) => {
            if(queueName === 'type') return true;
            let queueLoad = index[queueName];

            if (queueLoad === 'NaN') queueLoad = null;

            if(!queueLoads[queueName]) queueLoads[queueName] = [];
            queueLoads[queueName].push(queueLoad)
        })
    })

    return {
        dayKey: dayKey,
        hourLine: hours,
        series: {
            ...queueLoads
        }
    }
}

export default {
    formatChartData: formatChartData
}