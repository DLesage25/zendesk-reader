import _ from 'lodash';
import moment from 'moment-timezone';

const formatDrilldownData = async(productivityData) => {
    let groupedData = await groupAllData(productivityData);
    let formattedData = await formatAllData(groupedData);
    return formattedData;
}

const groupAllData = async(productivityData) => {
    let groupedData = await processAllDays(productivityData);
    return groupedData;
}

// const formatAllData = async(groupedData) => {
//     return groupedData.map((dayIndex, dayKey) => {
//         var series = dayIndex.series;
//         var seriesKeys = Object.keys(series);
//         var data = {
//             dayKey: dayIndex.dayKey,
//             labels: dayIndex.hourLine,
//             datasets: [{
//                     ...colorSchemes[0],
//                     label: seriesKeys[0],
//                     data: series[seriesKeys[0]]
//                 },
//                 {
//                     ...colorSchemes[1],
//                     label: seriesKeys[1],
//                     data: series[seriesKeys[1]]
//                 }
//             ]
//         };
//         return data;
//     })
// }

const processAllDays = async(productivityData) => {
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

let payload = [{
    name: 'Tanner Linsley',
    loggedTime: '01:13:00',
    production: {
        publicComments: 5,
        goal: {
            type: 'publicComments',
            value: 10
        },
        solved: 23,
        pending: 15,
        open: 0
    }
}, {
    name: 'John Doe',
    loggedTime: '02:25:00',
    production: {
        publicComments: 21,
        goal: {
            type: 'publicComments',
            value: 23
        },
        solved: 31,
        pending: 6,
        open: 3
    }
}];

const getSeries = async(dayData, hours, dayKey, goal) => {
    let dayObject = {
        hour: '7:00 AM',
        name: 'Tanner Linsley',
        publicComments: 5,
        goal: 10,
        goalType: 'publicComments',
        solved: 23,
        pending: 15,
        open: 0
    }

    hours.map((hour) => {
        let index = dayData[hour];

        //convert to array
        index = Object.keys(index).map(function(key) { return index[key]; });
        //filter out queue load
        index = _.filter(index, function(o) { return o.email && o.objectType === 'userHourlyStatus' });

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