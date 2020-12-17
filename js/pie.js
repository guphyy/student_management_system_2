(function () {
    var pie = {
        init() {
            this.getData();
            this.option = {
                title: {
                    text: '',
                    subtext:'纯属虚构',
                    left:'center'
                },
                legend: {
                    data: [],
                    orient:'vertical',
                    left:'left'
                },
                series: {
                    name: '',
                    type: 'pie',
                    radius:'55%',
                    center:['50%','60%'],
                    data: [],
                    itemStyle:{
                        emphasis:{
                            shadowBlur:10,
                            shadowColor:'rgba(255,0,0,0.5)'
                        }
                    }
                }
            }
        },
        getData() {
            var This = this;
            $.ajax({
                url: 'http://api.duyiedu.com/api/student/findAll?appkey=kaivon_1574822824764',
                success: function (data) {
                    var list = JSON.parse(data).data;

                    if (list.length) {
                        This.areaChart(list);
                        This.sexChart(list);
                    } else {
                        alert('亲，没有数据哦~');
                    }
                }
            });
        },
        areaChart(data) {
            var myChart = echarts.init(document.querySelector('.areaChart'));
            var legendData = [];
            var seriesData = [];

            /*
                {"address":"北京","appkey":"kaivon_1574822824764","birth":2002,"ctime":1601301328,"email":"123@qq.com","id":64100,"name":"33","phone":"13656785463","sNo":"11111111","sex":1,"utime":1602761232},
                {"address":"北京","appkey":"kaivon_1574822824764","birth":2002,"ctime":1601301328,"email":"123@qq.com","id":64100,"name":"33","phone":"13656785463","sNo":"11111111","sex":1,"utime":1602761232} 

                legendData=['北京','上海','广州','深圳']
                seriesData=[
                    { value: 3, name: '北京' },
                    { value: 2, name: '上海' },
                    ....
                ]
             */

            var newData = {
                /* '北京': 2,
                '上海': 3 */
            };
            data.forEach(function (item) {
                if (!newData[item.address]) {
                    newData[item.address] = 1;
                    legendData.push(item.address);
                } else {
                    newData[item.address]++;
                }
            });

            for (var prop in newData) {
                seriesData.push({
                    name: prop,
                    value: newData[prop]
                });
            }

            this.option.title.text='学生地区分布统计';
            this.option.legend.data=legendData;
            this.option.series.name='地区分布';
            this.option.series.data=seriesData;
            myChart.setOption(this.option);
        },
        sexChart(data) {
            var myChart = echarts.init(document.querySelector('.sexChart'));
            var legendData = ['男','女'];

            var newData = {
            };
            data.forEach(function (item) {
                if (!newData[item.sex]) {
                    newData[item.sex] = 1;
                } else {
                    newData[item.sex]++;
                }
            });

            var seriesData=[
                { value: newData[0], name: '男' },
                { value: newData[1], name: '女' }
            ]

            this.option.title.text='学生性别分布统计';
            this.option.legend.data=legendData;
            this.option.series.name='性别分布';
            this.option.series.data=seriesData;
            myChart.setOption(this.option);
        }
    }

    pie.init();

    /* 
        自增放在前面跟后面的区别：使用谁（变量本身，表达式结果）
            1、要用变量，放在前面跟后面没区别，都+1
            2、用表达结果，看谁在前面，符号在前面，结果+1，变量在前面，结果不变
     */
    var a=1;
    var b=a++;
    console.log(b); //1

})();