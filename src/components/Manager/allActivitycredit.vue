<template>
  <div>
    <section id="main">
      <div class="container-fluid">
        <div class="row">
          <div class="maincontent employeecontent col-lg-9">
            <div class="tab-content mainContent">
              <div id="cerdit-card" class="tab-pane fade in active">
                <div class="common-main-div">
                  <p
                    class="backIcon"
                    style="display: block"
                    @click="backMainScreen()">
                    <i aria-hidden="true" class="fa fa-angle-left"></i>
                  </p>

                  <label>Department</label>
                  <h4>Credit Card</h4>
                  <div class="multiple-select">
                    <div class="row">
                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label class="w-100">Display View By:</label>
                        <select
                          class="display-view-by"
                          v-on:change="setActivity()"
                        >
                          <option value="Activity">Activity</option>
                          <option value="All Employee">All Employees</option>
                        </select>
                      </div>
                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label class="w-100">Select Date Range:</label>
                        <div class="calender-Div credit-calender" @click="calenderBoxShow()">
                          <i class="fa fa-calendar" aria-hidden="true"></i>
                          <span class="changeText">{{resDateText}}</span>
                          <i class="fa fa-caret-down" aria-hidden="true"></i>
                        </div>
                        <div class="calender-Box">
                          <div class="container-fluid">
                            <div class="row">
                              <div class="col-lg-6">
                                <label>From</label>
                                <div class="from-Calender">
                                  <!-- <i class="fa fa-calendar" aria-hidden="true"></i>
                                          <span>06/10/20</span> -->
                                  <date-picker
                                    v-model="time1"
                                    valueType="format"
                                    width="150px"
                                  ></date-picker>
                                </div>
                              </div>
                              <div class="col-lg-6">
                                <label>To</label>
                                <div class="from-Calender">
                                  <date-picker
                                    v-model="time2"
                                    valueType="format"
                                    width="150px"
                                    @change="calenderBoxShow(); changeDateText(4)"
                                  ></date-picker>
                                  <!-- <i for="#date-input" class="fa fa-calendar" aria-hidden="true"></i>
                                          <span>06/10/20</span>
                                          <input style="display: none;" id="date-input" type="date" name="to-date"> -->
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-lg-12">
                                <div
                                  class="commonDiv"
                                  @click="calenderBoxShow(); changeDateText(1)"
                                >
                                  <p class="dayText">Today</p>
                                </div>
                                <div class="commonDiv"
                                 @click="calenderBoxShow(); changeDateText(2)"
                                 >
                                 <!----<p
                                    class="weekText dayText"
                                    @click="getValue()"
                                  >-->
                                    <p
                                    class="weekText dayText">
                                    Week over Week
                                  </p>
                                </div>
                                <!----<div
                                  class="commonDiv"
                                  @click="monthovermonth()"
                                >-->
                                 <div
                                  class="commonDiv"
                                   @click="calenderBoxShow(); changeDateText(3)"
                                >
                                  <p class="dayText">Month over Month</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="selectMonth">
                        <div class="col-lg-6 m-t-20">
                          <label class="w-100">Select Month:</label>
                          <select class="display-view-by">
                            <option>June 2020</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Activity Table Starts -->
                
                <ActivityComponent name="all-activity-credit" type="activity-only" v-bind:activitiesData="ActivityData" ></ActivityComponent>
                <!-- End Activity Table Starts -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import $ from "jquery";
import axios from "axios";
import moment from "moment";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import ActivityComponent from "../ActivityComponent.vue";
import { getSession } from '../../assets/js/util.js'

export default {
  components: { DatePicker, ActivityComponent },
  name: "managerAllactivity",
  data() {
    return {
      envurl: process.env.VUE_APP_KUNIN_API_URL,
      ActivityData: [],
      totalEmployee: 0,
      totalAssignTime: 0,
      achivedTime: 0,
      time1: null,
      time2: null,
      resDateText:null,
      user: JSON.parse(getSession('user'))
    };
  },
    mounted(){
        let todayDate = new Date();
        let month = todayDate.toUTCString('default', { month: 'short'});
        
        let date = month;
        let dateText = 'Today' + ', ' + moment(date).format('MMM-DD-YYYY');

        if(localStorage.getItem('dateText')){
            const tempText = localStorage.getItem('dateText');
            this.resDateText = tempText;
        }

        else{
            localStorage.setItem('dateText', dateText);
            const tempText = localStorage.getItem('dateText');
            this.resDateText = tempText;            
        }
    },
  methods: {
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
      }

      else if(d==3){
          const dateText = "Month over Month";
          this.resDateText = dateText;
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
    
    // toconvertArray(data) {
    //   var test = JSON.stringify(data);
    //   let arrayfor = [];
    //   var test2 = JSON.parse(test);
    //   for (var i in test2) {
    //     var test3 = Object.values(test2[i]);
    //     arrayfor.push(test3[0]);
    //   }
    //   return arrayfor;
    // },

    // removearray(data) {
    //   this.forLogArray = [];
    // },

    // mouseOver() {
    //   $(".tooltipTd .tooltipData").css("display", "block");
    // },

    // mouseLeave() {
    //   $(".tooltipTd .tooltipData").css("display", "none");
    // },

    // mouseLeaveSecond() {
    //   $(".tooltipTdTwo .tooltipData").css("display", "none");
    // },

    // mouseOverSecond() {
    //   $(".tooltipTdTwo .tooltipData").css("display", "block");
    // },

    // highfocustime(data) {
    //   if (data.length < 1) {
    //     return "0";
    //   }
    //   var returnstart = 0;
    //   var returnenddate = 0;
    //   var starttime = data[0];
    //   var endtime = data[1];

    //   var startreturn = moment(starttime, "H:mm").format("H:mm");
    //   var returnEndrtime = moment(endtime, "H:mm").format("H:mm");
    //   return startreturn + " - " + returnEndrtime;
    // },

    // highFocus(data) {
    //   var x = data[0];
    //   var y = data[1];

    //   var now = "04/09/2013 " + y;
    //   var then = "04/09/2013 " + x;
    //   var ms = moment(now, "DD/MM/YYYY HH:mm").diff(
    //     moment(then, "DD/MM/YYYY HH:mm")
    //   );
    //   var d = moment.duration(ms);
    //   // var s = d.format("hh:mm");

    //   return moment
    //     .utc(
    //       moment(now, "DD/MM/YYYY HH:mm").diff(moment(then, "DD/MM/YYYY HH:mm"))
    //     )
    //     .format("HH:mm");      
    // },

    // backMainScreen() {
    //   this.$router.push("/division");
    // },

    // allEmployee() {
    //   this.$router.push("/MAllEmployee");
    // },

    getValue() {      
      this.$router.push("/weaklydetails");
    },

    calenderBoxShow() {
      if ($(".calender-Box").css("display") === "block") {
        $(".calender-Box").css("display", "none");
      } else {
        $(".calender-Box").css("display", "block");
      }
    },

    monthovermonth() {
      this.$router.push("/monthovermonth");
    },

    applicationTable() {
      this.$router.push("/Approcess");      
    },

    // employeeTable() {
    //   if ($(".row-click-employee-data").css("display") === "block") {
    //     $(".row-click-employee-data").css("display", "none");
    //     $(".common-main-div").css("display", "block");
    //     $(".employee-Table").css("display", "block");
    //   } else {
    //     $(".row-click-employee-data").css("display", "block");
    //     $(".common-main-div").css("display", "none");
    //     $(".employee-Table").css("display", "none");
    //   }
    // },

    openBox() {
      if ($(".open-box").css("display") == "block") {
        $(".open-box").css("display", "none");
      } else {
        $(".open-box").css("display", "block");
      }
    },

    displayViewBy(event) {
      console.log(event);
      var end = event.target.value;
      if (end == "Activity") {
        $(".activity-Table").css("display", "block");
        $(".employee-Table").css("display", "none");
      } else if (end == "All Employee") {
        $(".backIcon").css("display", "block");
        $(".activity-Table").css("display", "none");
        $(".employee-Table").css("display", "block");
      }
    },

    GetCalenderBox() {
      $("#manager .calender-Box .weekText").click(function () {
        var val = $("#manager .commonDiv .weekText").text();
        $("#manager .managerchangeText").text(val);
        $(".without-change-date").css("display", "none");
        $(".change-date-div").css("display", "block");
        $(".img-div").css("text-align", "center");
        $(".img-div").css("padding-left", "57%");
        $(".img-div h4").css("display", "flex");
        $(".img-div h4").css("justify-content", "center");
        $(".achieved-text").css("display", "block");
        $(".change-activity-overview").css("display", "block");
        $(".without-activity-overview").css("display", "none");
        $(".table-performance-overview").css("max-width", "41%");
        $(".table-performance-overview .table>thead>tr>th").css("width", "35%");
        $(".table-performance-overview .table>thead>tr>th").css(
          "padding",
          "0px !important"
        );
        $(".table-performance-overview .table>thead>tr>th:nth-child(2)").css(
          "width",
          "21%"
        );
        $(".table-performance-overview .table>thead>tr>th:nth-child(3)").css(
          "width",
          "21%"
        );
        $(".table-performance-overview .table>thead>tr>th").css(
          "vertical-align",
          "middle"
        );
      });
    },

    setActivity() {
      this.$router.push("/MAllEmployee");      
    },

    Setdesign(design) {
      if (design == "" || design == null) {
        return 0 + "%";
      }

      let compare;
      let setmrgin;
      let x;
      let y;
      x = design[0] + 1;
      y = design[1];
      compare = ((y - x) / 60) * 100;
      if (x > 0) {
        setmrgin = (x / 60) * 100;
        this.mrgin = setmrgin + "%";
      } else {
        this.mrgin = x;
      }

      return compare.toFixed(1) + "%";
    },

    getActivitiesdata() {
      
      let division = this.user.division.division_id
      let department = this.user.department.department_id

      //const endpoint = "http://www.amock.io/api/kunin-io/v0/users/7b270cba-c161-11ea-b3de-0242ac130004/activities/f32a41f8-c145-11ea-b3de-0242ac130004?format=hourly&date=today"

      // const endpoint = "http://devapi.kunin.io:45000/api/v1/v0/divisions/9da53e80-c141-11ea-b3de-0242ac130004/departments/6aa1a220-c142-11ea-b3de-0242ac130004/activities?format=hourly&date=today"

      const endpoint = "http://" + this.envurl + "/api/v1/divisions/"+division+"/departments/"+department+"/activities?format=hourly&date=today"
console.log("end point", endpoint);

      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Token "+this.user.access_token
      }

      axios
      .get(endpoint, {headers: headers} )
      .then((res) => {
        let Collections = res.data.data;

        // Collections.forEach((Single) => {
        //   setCollections = Single.departments;
        // });

        // setCollections.forEach((element) => {
        //   Activities = element.activities;
        // });

        // Activities.forEach((emp) => {
        //   CountTotalEmp += emp.total_employes;
        //   totalAchiev += emp.achieved_time;
        //   totalAssignedTime += emp.assigned_time;
        // });
        console.log("heloooooooo");
        this.ActivityData = Collections.activities;
        // this.totalEmployee = CountTotalEmp;
        // this.totalAssignTime = totalAchiev;
        // this.achivedTime = totalAssignedTime;

        console.log("All Activity Credit >> ", this.ActivityData);

      })
      .catch((error) => {
        console.log(error);
      });
    },
  },

  created() {
    this.getActivitiesdata();
  },
};
</script>
<style lang="css" scoped>
#cerdit-card .calender-Box {
  top: 63%;
  left: 90%;
  min-width: 522px !important;
}

.activity-Table{
  overflow: auto;
}

</style>