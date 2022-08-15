<template>
    <div>
        <div class="mainContent">
            <div id="manager" class="employee1">
                <div class="introDiv">
                    <div class="container-fluid p-0">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <h4>Today's Date: {{date}}</h4>
                                <h4 style="margin: 10px 0">Hello {{ user.first_name }}, Your WEEK At A Glance</h4>
                            </div>
                            <div class="col-lg-2 ml-auto text-center month-button">
                                <div class="commonDiv" @click="changeDateText(3)">
                                    <p class="dayText">Monthly View</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--chart area-->
                <div class="without-change-date">
                    <div class="activity-overview">
                        <div class="container-fluid p-0">
                            <div class="row">
                                <div class="col-lg-6">
                                    Your Most Productive Day:
                                    <li></li>
                                </div>
                                <div class="col-lg-6">
                                    Your Best Time to Focus is:
                                    <li></li>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-4" @click="goToAllActivities" style="margin-top: 15px"><div class="chart-container">
                                    <bar-chart
                                    
                                        :data="datacollection"
                                        :options="options"
                                    ></bar-chart>
                                    </div>
                                    <h4 class="text-center">Productive Desktop Activity</h4>
                                </div>
                                <div class="col-lg-4"  style="margin-top: 15px"><div class="chart-container">
                                    <bar-chart
                                    
                                        :data="datacollection"
                                        :options="options"
                                    ></bar-chart>
                                    </div>
                                    <h4 class="text-center">Unproductive Desktop Activity</h4>
                                </div>
                                <div class="col-lg-4"  style="margin-top: 15px"><div class="chart-container">
                                    <bar-chart
                                    
                                        :data="datacollection"
                                        :options="options"
                                    ></bar-chart>
                                    </div>
                                    <h4 class="text-center">Desktop Hours Per Day</h4>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4"  style="margin-top: 15px"><div class="chart-container">
                                    <bar-chart
                                    
                                        :data="datacollection"
                                        :options="options"
                                    ></bar-chart>
                                    </div>
                                    <h4 class="text-center">Focus Time</h4>
                                </div>
                                <div class="col-lg-4"  style="margin-top: 15px"><div class="chart-container">
                                    <bar-chart
                                    
                                        :data="datacollection"
                                        :options="options"
                                    ></bar-chart>
                                    </div>
                                    <h4 class="text-center">Uncategorized Desktop Activity</h4>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                    <div class="note-Box" style="
                        width: 400px;
                        position: fixed;
                        bottom: 200px;
                        right: 200px;
                        background-color: #eee;
                        display: none;
                        z-index: 9999
                    ">
                        <p>the action</p>
                        <textarea id="notes-box" class="form-control" @keyup.enter="changeAction"></textarea>
                        <!-- <p>Rule: When employee click on this "Add note icon" - this box shows up are they directly insert a note. </p> -->
                    </div>
                <!-- table -->
                <div class="without-change-date">
                    <div class="activity-overview">
                        <div class="container-fluid p-0">
                            <div class="table-div-activity">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="table-responsive">
                                            <table class="table table-bordered" style="table-layout: fixed; margin-top: 15px">
                                                <thead>
                                                    <tr class="tooltipRow">
                                                        <th class="text-center" >
                                                            Notifications and Insights
                                                        </th>
                                                        <th class="text-center" style="width: 80px">
                                                            Read
                                                        </th>
                                                        <th class="text-center" style="width: 80px">
                                                            Actioned
                                                        </th>
                                                        <th>
                                                            Action
                                                        </th>
                                                        <th class="text-center" style="width: 80px">
                                                            Delete
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    <tr>
                                                        <td>Account Maintenance</td>
                                                        <td class="text-center" width="80"><input type="checkbox" /></td>
                                                        <td class="text-center" width="80"><input type="checkbox" /></td>
                                                        <td @click="showNotes(1)" style="cursor: pointer;">{{ action1 }}</td>
                                                        <td @click="deleteNotification"><i class="fa fa-trash"></i></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Customer Service</td>
                                                        <td class="text-center"><input type="checkbox" /></td>
                                                        <td class="text-center"><input type="checkbox" /></td>
                                                        <td @click="showNotes(2)" style="cursor: pointer;">{{ action2 }}</td>
                                                        <td @click="deleteNotification"><i class="fa fa-trash"></i></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Customer Service</td>
                                                        <td class="text-center"><input type="checkbox" /></td>
                                                        <td class="text-center"><input type="checkbox" /></td>
                                                        <td @click="showNotes(3)" style="cursor: pointer;">{{ action3 }}</td>
                                                        <td @click="deleteNotification"><i class="fa fa-trash"></i></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import { getSession } from "../../assets/js/util.js";
import BarChart from './chartBars.vue';
import moment from "moment";
import Swal from 'sweetalert2'
export default {
    components: {BarChart},
    name: "EmpAllActivityByWeek",
    data (){
        return {
            action1: 'what they did',
            action2: 'what they did',
            action3: 'what they did',
            correntAction: 0,
            user: JSON.parse(getSession("user")),
            date: moment().format('dddd MMMM Do YYYY'),
            options: {
                responsive: true,
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                    label: function(tooltipItem) {
                            return tooltipItem.yLabel;
                    }
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                            drawBorder: false,
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                            drawBorder: false,
                        }   
                    }]
                }
            },
            datacollection:  {
               labels: [0, 1, 2, 3, 4, 5, 6],
               datasets: [
                    {
                        label: "Data One",
                        backgroundColor: "#01B1B1",
                        data: [0, 0, 0, 0, 0, 0, 0]
                    }
                ]
            },
            chartData: [13, 52, 49, 27, 34, 40, 19]
        }
    },
    methods: {
        goToAllActivities(){
            this.$router.push("/empAllActivitydetails");
        },
        deleteNotification(){
            Swal.fire({
                title: 'Are you sure you want to delete this Notes?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(result => {
                console.log(result);
            })
        },
        changeAction(e){
            console.log(e.target.value);
            if(this.correntAction == 1){
                this.action1 = e.target.value;
            }else if(this.correntAction == 2){
                this.action2 = e.target.value;
            }else if(this.correntAction == 3){
                this.action3 = e.target.value;
            }
            $(".note-Box").css("display", "none");
            this.correntAction = 0;
        },
        showNotes(i) {
            console.log(i);
            if ($(".note-Box").css("display") == "block") {
                $(".note-Box").css("display", "none");
                this.correntAction = 0;
            } else {
                this.correntAction = i;
                $(".note-Box").css("display", "block");
            }
        },
        changeDateText(d){
          if(d==1){
              let todayDate = new Date();
              let month = todayDate.toUTCString('default', { month: 'short'});
              
              let date = month;
              const dateText = 'Today' + ', ' + moment(date).format('MMM-DD-YYYY');
              this.resDateText = dateText;

          } else if(d==2){
              const dateText = "Week over Week";
              this.resDateText = dateText;
              this.$router.push("/empAllActivityByWeek");
          }

          else if(d==3){
              const dateText = "Month over Month";
              this.resDateText = dateText;
              this.$router.push("/empAllActivityByMonth");
          }

          else{
              let date1 = new Date(this.time1);
            const month1 = date1.toLocaleString('default', { month: 'short'});
            let day1 = date1.toUTCString('default', { day: '2-digit'});
            let year1 = date1.toLocaleString('default', { year: 'numeric'});
            let resDate1 = month1 + '-' + day1 + '-' + year1;

            let date2 = new Date(this.time2);
            const month2 = date2.toLocaleString('default', { month: 'short'});
            let day2 = date2.toUTCString('default', { day: '2-digit'});
            let year2 = date2.toLocaleString('default', { year: 'numeric'});
            
            let resDate2 = month2 + '-' + day2 + '-' + year2;

            const dateText = moment(resDate1).format('MMM-DD-YYYY') + " to " + moment(resDate2).format('MMM-DD-YYYY');
            this.resDateText = dateText;
          }
      },
       getData() {
           this.datacollection = {
               labels: [0, 1, 2, 3, 4, 5, 6],
               datasets: [
                    {
                        backgroundColor: "#01B1B1",
                        data: this.chartData
                    }
                ]
           }
           console.log(this.datacollection);
       }
    },
    mounted() {
        this.getData();
    }
}
</script>

<style>
body{
    color: #2A3A4B;
}
#manager.employee1 .container-fluid{
    color: #2A3A4B;
    font-size: 16px !important;
}
#manager.employee1 .container-fluid table td{
    font-size: 16px !important;
}
#manager.employee1 .container-fluid li{
    list-style: none;
    height: 35px;
    width: 200px;
    background: #FFFFFF;
    border: 1px solid #01B1B1 !important;
    box-sizing: border-box;
    top: 10px;
    position: relative;
    display: inline-block;
}
#manager.employee1 .container-fluid input{
    height: auto;
}
.month-button.col-lg-2.text-center{
    padding: 20px 10px;
    background-color: #2A3A4B;
    color: #fff;
    float: right;
}
.chart-container{
    width: 40%;
    margin: 0 auto;
    overflow: hidden;
}
</style>