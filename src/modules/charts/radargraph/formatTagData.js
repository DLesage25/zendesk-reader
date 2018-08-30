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
        var counts = dayIndex.series.counts;
        var labels = dayIndex.series.labels;
        var hourKeys = Object.keys(counts);
        var data = {
            dayKey: dayIndex.dayKey,
            labels: labels,
            datasets: hourKeys.map((hour, index) => {
                let colorScheme = colorSchemes[index] || colorSchemes[index - colorSchemes.length]
                return {
                    ...colorScheme,
                    label: hour,
                    data: counts[hour]
                }
            })
        }
        return data;
    })
}

const processAllDays = async(globalProgram, productivityData) => {
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
    let dayObject = await getDailyCount(dayData.byHour, hours, dayKey);
    return dayObject;
}

//every hourly count array should be of equal length than the main tag array 
const fixObjectLengths = (hours, tagCounts) => {
    hours.map((hour)=>{
        tagCounts.counts[hour].length = tagCounts.labels.length;
    })
    return tagCounts
}

const getDailyCount = async(dayData, hours, dayKey) => {
    let tagCounts = {
        labels: [],
        counts: {}
    }
    //only getting tags for the last 3 hours
    hours = hours.slice(hours.length - 3);
    //iterate through hours
    hours.map((hour) => {
        let index = dayData[hour];
        //filter out for tag obj only
        index = _.filter(index, function(o) { return o.type === 'tags' })[0];
        //remove type key
        delete index['type'];
        //sort from highest to lowest
        let tagKeys = Object.keys(index).sort((a, b) => { return index[b] - index[a] });
        //sample top 10 items
        tagKeys = tagKeys.slice(0, 5);
        tagKeys.map((tag) => {
            let count = index[tag];
            //if not tag count, init array
            !tagCounts.counts[hour] ? tagCounts.counts[hour] = [] : tagCounts.counts[hour];
            //if inexistent tag, push to array
            if (tagCounts.labels.indexOf(tag) === -1) tagCounts.labels.push(tag);
            //find position in array and set count
            tagCounts.counts[hour][tagCounts.labels.indexOf(tag)] = count;
        })
    })

    return {
        dayKey: dayKey,
        series: fixObjectLengths(hours, tagCounts)
    }
}

export default {
    formatChartData: formatChartData
}