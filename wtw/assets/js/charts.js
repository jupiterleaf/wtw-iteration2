
var val_search = document.getElementById("txtNumber").value;
var dom = document.getElementById("inputbarchart");
var myChart = echarts.init(dom, 'shine');

var tem_postcode;
var tem_count;
var tem_suburb;

option = {
    title: {
        text: '',
    },
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        textStyle: {
            align: 'center'
        },
        axisPointer: {            // 
            type: 'shadow'        // 'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['Melbourne', 'Bangholme', 'Botanic Ridge', 'Alfredton', 'Derrimut', 'Yours suburb'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],

    /*
     * dataZoom: [
        {
            show: true,
            start: 0,
            end: 100
        },
        {
            type: 'inside',
            start: 0,
            end: 100
        },
        {
            show: true,
            yAxisIndex: 0,
            filterMode: 'empty',
            width: 30,
            height: '80%',
            showDataShadow: false,
            left: '93%'
        }
    ],
    */
    series: [
        {
            name: 'Accident Counts',
            type: 'bar',
            barWidth: '60%',
            data: [
                {
                    value: 3082

                },
                {
                    value: 2891,

                },
                {
                    value: 1876,

                },
                {
                    value: 1822,

                },
                {
                    value: 1803,

                },
                {
                    value: 0,
                    itemStyle: {
                        normal: {
                            color: 'green',
                            shadowBlur: 400,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ],
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        formatter: "{b} :\n  {c} \n ",
                        position: "top"
                    }
                }
            }
        }
    ]
};
myChart.setOption(option);

var myChart1 = echarts.init(document.getElementById("linechart"), 'shine');

option1 = {
    title: {
        text: 'Melbourne',
        textStyle: {
            color: 'green',
        },
        left: '40%',
        bottom: '30%',
    },
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        data: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [249,279,290,287,273,260,248,265,270,267,201,170,23],
        type: 'line'
    }]
};

myChart1.setOption(option1);

myChart.on('click', function (params) {
    var name = params.name;
    var value = params.value;
    var arraycounts = new Array();

    d3.csv("/assets/data/year-postcode.csv", function (error, data) {
        data.forEach(function (d) {
            if (d.suburb == name) {
                arraycounts.push(d.year2006);
                arraycounts.push(d.year2007);
                arraycounts.push(d.year2008);
                arraycounts.push(d.year2009);
                arraycounts.push(d.year2010);
                arraycounts.push(d.year2011);
                arraycounts.push(d.year2012);
                arraycounts.push(d.year2013);
                arraycounts.push(d.year2014);
                arraycounts.push(d.year2015);
                arraycounts.push(d.year2016);
                arraycounts.push(d.year2017);
                arraycounts.push(d.year2018);

                var myChart1 = echarts.init(document.getElementById("linechart"), 'shine');

                option = {
                    title: {
                        text: name,
                        textStyle: {
                            color: "green",
                            padding: 5,
                            align: 'right',
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            shadowBlur: 10,
                        }
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        data: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [arraycounts[0], arraycounts[1], arraycounts[2], arraycounts[3], arraycounts[4], arraycounts[5], arraycounts[6], arraycounts[7], arraycounts[8], arraycounts[9], arraycounts[10], arraycounts[11], arraycounts[12]],
                        type: 'line'
                    }]
                };

                myChart1.setOption(option);
            }
        });
    });
});

function searchmysuburb() {
    val_search = document.getElementById("txtNumber").value;
    var int_val_search = parseInt(val_search, 10);

    d3.csv("/assets/data/header2.csv", function (error, data) {
        if (error) throw error;

        // format the data
        data.forEach(function (d) {
            if (d.Postcode == val_search) {

                tem_count = d.Count;
                tem_postcode = d.Postcode;
                tem_suburb = d.Suburb;
                //myChart.setOption(option);
                myChart = echarts.init(dom, 'vintage');

                option = {
                    title: {
                        text: '',
                    },
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        textStyle: {
                            align: 'center'
                        },
                        axisPointer: {            // 
                            type: 'shadow'        // 'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['Melbourne', 'Bangholme', 'Botanic Ridge', 'Alfredton', 'Derrimut', tem_suburb],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: 'Accident Counts',
                            type: 'bar',
                            barWidth: '60%',
                            data: [
                                {
                                    value: 3082,

                                },
                                {
                                    value: 2891,

                                },
                                {
                                    value: 1876,

                                },
                                {
                                    value: 1822,

                                },
                                {
                                    value: 1803,

                                },
                                {
                                    value: tem_count,
                                    itemStyle: {
                                        normal: {
                                            color: 'green',
                                            shadowBlur: 100,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ],
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        formatter: "{b} :\n  {c} \n ",
                                        position: "top"
                                    }
                                }
                            }
                        }
                    ]
                };
                myChart.setOption(option);

                return;
            }
        });
    });


    //var name = params.name;
    //var value = params.value;
    var arraycounts = new Array();

    d3.csv("/assets/data/year-postcode.csv", function (error, data) {
        data.forEach(function (d) {
            if (d.postcode == val_search) {
                arraycounts.push(d.year2006);
                arraycounts.push(d.year2007);
                arraycounts.push(d.year2008);
                arraycounts.push(d.year2009);
                arraycounts.push(d.year2010);
                arraycounts.push(d.year2011);
                arraycounts.push(d.year2012);
                arraycounts.push(d.year2013);
                arraycounts.push(d.year2014);
                arraycounts.push(d.year2015);
                arraycounts.push(d.year2016);
                arraycounts.push(d.year2017);
                arraycounts.push(d.year2018);

                //var myChart1 = echarts.init(document.getElementById("linechart"), 'shine');

                option = {
                    title: {
                        text: d.suburb,
                        textStyle: {
                            color: "green",
                            padding: 5,
                            align: 'right',
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            shadowBlur: 10,
                        }
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        data: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [arraycounts[0], arraycounts[1], arraycounts[2], arraycounts[3], arraycounts[4], arraycounts[5], arraycounts[6], arraycounts[7], arraycounts[8], arraycounts[9], arraycounts[10], arraycounts[11], arraycounts[12]],
                        type: 'line'
                    }]
                };

                myChart1.setOption(option);

                return;
            }
        });
    });
}

var input = document.getElementById("txtNumber");
input.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("searchButton").click();
    }
});