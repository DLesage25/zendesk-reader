import _ from 'lodash';
import moment from 'moment-timezone';
import colorSchemes from './linegraphColorScheme';

const formatChartData = async(programData) => {
    let groupedData = await groupAllData(programData);
    let formattedData = await formatAllData(groupedData);
    return formattedData;
}

const groupAllData = async(programData) => {
    let teamEmails = await getTeamEmails(programData);
    let groupedData = await processAllDays(programData);

    let teamObjects = teamEmails.map(async(email)=>{

    })
    return groupedData;
}

//extracts email array from all team objects
const getTeamEmails = async(programData) => {
    let teamObjects = programData.settings.team;
    return Object.keys(teamObjects).map((teamObjectKey)=>{
        return teamObjects[teamObjectKey].email;
    })
}

/* 
    this is how to userobjects should look
    {email:'email', productivity: [{day:'', series:[prod, goal]},{}]}
*/

const extractAgentProductivity = async(email, programData) => {
    let productivity =      ata.productivity;
    let goal = programData.settings.goal;   
    let days = Object.keys(productivity);
    let groupedData = [];

    days.map(async(dayKey) => {
        let dayData = productivity[dayKey];
        let formattedDayData = await buildDayObject(dayKey, dayData, goal, email)
        groupedData.push(formattedDayData)
    })
    return groupedData;
}

const buildDayObject = async(dayKey, dayData, goal, email) => {
    let hours = Object.keys(dayData);
    let dayObject = await getSeries(dayData, hours, dayKey, settings);
    return dayObject;
}M

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

export default {
    formatChartData: formatChartData
}