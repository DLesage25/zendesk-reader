let dataTypes = {}

dataTypes.linegraph1 = {
    labels: ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"],
    datasets: [{
            label: "New teacher tickets",
            fillColor: "rgba(144, 198, 149, 0.2)",
            strokeColor: "rgba(144, 198, 149, 1)",
            pointColor: "rgba(144, 198, 149, 1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(144, 198, 149, 1)",
            data: [65, null, 80, null, 56, 55, 40, 0, 14, 12]
        },
        {
            label: "New instructor tickets",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90, 70, 52, 55]
        },
        {
            label: "New student ticktes",
            fillColor: "rgb(106,168,148, 0.2)",
            strokeColor: "#05583e",
            pointColor: "#05583e",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [0, 55, 23, 28, 35, 36, 31, 25, 22, 17]
        }
    ]
};

dataTypes.linegraph3 = {
    labels: ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"],
    datasets: [{
            label: "Goal",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [5, null, null, null, null, null, null, null, null, null]
        },
        {
            label: "Production",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [3, null, null, null, null, null, null, null, null, null]
        }
    ]
};

dataTypes.linegraph2 = {
    labels: ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"],
    datasets: [{
            label: "Goal",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [5, 10, 15, 20, 25, 32, 35, 42, 45, 52]
        },
        {
            label: "Production",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [3, 5, 12, 15, 28, 33, 37, 38, 44, 49]
        }
    ]
};

dataTypes.bargraph1 = {
    labels: ["daniel lesage", "eunice rodriguez", "carlos iglesias", "jose canales", "raul rodriguez"],
    datasets: [{
            label: "Incoming",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [5, 10, 15, 20, 25, 32, 35, 42, 45, 52]
        },
        {
            label: "Processed",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [3, 5, 12, 15, 28, 33, 37, 38, 44, 49]
        }
    ]
};

module.exports = dataTypes;