import React, { useState } from "react";
import Chart from "react-apexcharts";

function AverageGraph() {
    const [graphData, setGraphData] = useState({
        options: {
            chart: {
                id: "basic-bar",
                toolbar: {
                    "show": true,
                    "tools": {
                      "download": false,
                      "selection": true,
                      "zoom": true,
                      "zoomin": true,
                      "zoomout": true,
                      "pan": true,
                      "reset": true
                    },
                    autoSelected: "zoom",
                }
            },
            xaxis: {
                categories: ["Nota"],
                labels: {
                    style: {
                        colors: [],
                        fontSize: '1vw',
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        cssClass: 'apexcharts-xaxis-label',
                    }
                }
            },
            yaxis: {
                min: 0,
                max: 5,
                tickAmount: 6,
                forceNiceScale: true,
                labels: {
                    style: {
                        colors: [],
                        fontSize: '1vw',
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        cssClass: 'apexcharts-xaxis-label',
                        position:'fixed'
                    }
                }
            },
            dataLabels: {
                style:{
                    fontSize: '2vw',
                    fontWeight: 'bold'
                },
            },
            colors: ["#002146"],
            responsive: [{
                breakpoint: undefined,
                options: {},
            }]
        },
        series: [
            {
                name: "series-1",
                data: [3.5]
            }
        ]
    });
    return (
        <>
            <div className="row">
                <div className="mixed-chart">
                    <Chart
                        options={graphData.options}
                        series={graphData.series}
                        type="bar"
                        width="150"
                        height="150"
                    />
                </div>
            </div>
        </>
    );
}

export default AverageGraph;