import _ from 'lodash';
import moment from 'moment-timezone';
import colorSchemes from './colorScheme';

const formatChartData = async(programData, productivityData) => {
    let teamEmails = await getTeamEmails(programData);
    let teamObjects = [];

    teamEmails.map(async(email) => {
        let groupedData = await extractAgentProductivity(email, programData, productivityData);

        let userPayload = {
            email: email,
            productivity: groupedData
        };
        teamObjects.push(userPayload);
    })

    return teamObjects
}

//extracts email array from all team objects
const getTeamEmails = async(programData) => {
    let teamObjects = programData.team;
    return Object.keys(teamObjects).map((teamObjectKey) => {
        return teamObjects[teamObjectKey].email;
    })
}

const extractAgentProductivity = async(email, programData, productivityData) => {
    let goal = programData.settings.goal;
    let days = Object.keys(productivityData);
    let groupedData = [];

    days.map(async(dayKey) => {
        let dayData = productivityData[dayKey];
        let dayObjects = await buildDayObjects(dayKey, dayData, goal, email)
        groupedData.push(dayObjects)
    })
    return groupedData;
}

const buildDayObjects = async(dayKey, dayData, goal, email) => {
    let hours = Object.keys(dayData.byHour);
    let dayObject = await getSeries(dayData.byHour, hours, dayKey, goal, email);
    return dayObject;
}

const getSeries = async(dayData, hours, dayKey, goal, email) => {
    let goalLine = [];
    let productionLine = [];
    let checkedHours = [];

    hours.map(async(hour) => {
        let index = dayData[hour];

        //convert to array
        index = Object.keys(index).map(function(key) { return index[key]; });

        //filter out by user email
        index = _.find(index, function(o) { return o.email === email })

        if (index) {
            let totalHourlyGoal = Number(index.goal);
            let totalHourlyProd = Number(index[goal]);

            goalLine.push(totalHourlyGoal);
            productionLine.push(totalHourlyProd);
            checkedHours.push(hour);
        } else {
            return true;
        }
    })

    return {
        dayKey: dayKey,
        labels: checkedHours,
        email: email,
        series: {
            'Goal': goalLine,
            'Production': productionLine
        },
        datasets: [{
                ...colorSchemes[0],
                label: 'Goal',
                data: goalLine
            },
            {
                ...colorSchemes[1],
                label: 'Production',
                data: productionLine
            }
        ]
    }
}

export default {
    formatChartData: formatChartData
}