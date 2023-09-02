import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function ResearchGraph({ series, labels }) {

    const [graphLabel, setGraphLabel] = useState([])
    const [graphData, setGraphData] = useState({
        options: {
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val.toFixed() + "%"
                },
                style: {
                    fontSize: '14px',
                    fontFamily: 'Roboto',
                },
                background: {
                    foreColor: '#000',
                    borderColor: '#000',
                },
            },
            tooltip: {
                style: {
                    fontSize: '20px'
                }
            },
            legend: {
                show: true,
                width: 360,
                position: 'bottom',
                fontSize: '12px',
                style: {
                    fontFamily: 'Roboto'
                }
            },
            labels: ["Muito Bom", "Bom", "Nem Ruim, nem bom.", "Ruim", "Muito Ruim"]
        },
        series: [7, 47, 13, 60, 15]
    });


    // useEffect(() => {
    //     const legenda = [];

    //     opt.map((e) => {
    //         legenda.push(e.option);
    //     })
    //     setGraphData({
    //         ...graphData,
    //         options: {
    //             ...graphData.options,
    //             labels: legenda,
    //             series: resps
    //         }
            
    //     }
    //     )
    //     // setGraphData({...graphData, series: [results]}) , , series: seriesT

    // }, []);

    // useEffect(() => {
    //     if(graphData.options.labels === []) return;

    // }, [graphData])


    return (
        <>
            {
                // graphData.series !== [] && graphData.options.labels !== [] ?
                    <div className="donut">
                        <Chart options={graphData.options} series={graphData.series} type="pie" width="360" />
                    </div>
                    // : null

            }
        </>
    );
}

export default ResearchGraph;