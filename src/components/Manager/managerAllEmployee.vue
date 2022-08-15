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
                    @click="setActivity()"
                    class="backIcon"
                    style="display: block"
                  >
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
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
                          <option>All Employees</option>
                          <option>Activity</option>
                        </select>
                      </div>
                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label class="w-100">Select Date Range:</label>
                        <div class="calender-Div m-all-employee-calender" @click="calenderBoxShow()">
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
                                  <date-picker
                                    v-model="time1"
                                    valueType="format"
                                    width="150px"
                                  ></date-picker>
                                  <!-- <i class="fa fa-calendar" aria-hidden="true"></i>
                                          <span>06/10/20</span> -->
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
                                    class="weekText dayText"
                                  >
                                    Week over Week
                                  </p>
                                </div>
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
                <div class="employee-Table" style="display: block">
                  <div class="table-card-div">
                  <div class="table-div employeeDetailTable">
                  
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="table-responsive">
                          <div class="footer"></div>
                          <table class="table table-bordered">
                            <thead>
                              <tr class="tooltipRow">
                                <th class="text-center" style="background-color:#fff;"></th>
                                <th class="text-center">All Employees</th>
                                <th class="text-center">Trend</th>
                                <th class="text-center" colspan="2">Assigned Time</th>
                                <th class="text-center" colspan="2">Achieved Time</th>
                                <th class="text-center tooltipTd">
                                  High Focus (Time of Day)
                                  <span
                                    class="infoIcon"
                                    @mouseleave="mouseLeave"
                                    @mouseover="mouseOver"
                                  >
                                    <i class="fa fa-info-circle"></i>
                                  </span>
                                  <span class="tooltipData"
                                    >Time period that has the highest focus for the activity.  Note if there are multiple times with the same duration the first occurrence is selected.</span
                                  >
                                </th>
                                <th class="text-center tooltipTdOne">
                                  High Focus (Duration)
                                  <span
                                    class="infoIcon"
                                    @mouseleave="mouseLeaveFirst"
                                    @mouseover="mouseOverFirst"
                                  >
                                    <i class="fa fa-info-circle"></i>
                                  </span>
                                  <span class="tooltipData"
                                    >The highest continuous period of focus time within the activity.</span
                                  >
                                </th>
                                <th class="text-center tooltipTdTwo">
                                  Collective Focus Time
                                  <span
                                    class="infoIcon"
                                    @mouseleave="mouseLeaveSecond"
                                    @mouseover="mouseOverSecond"
                                  >
                                    <i class="fa fa-info-circle"></i>
                                  </span>
                                  <span class="tooltipData"
                                    >The aggregate of all focus time periods with the activity.
                                  </span
                                  >
                                </th>
                                <th class="text-center">07:00</th>
                                <th class="text-center">08:00</th>
                                <th class="text-center">09:00</th>
                                <th class="text-center">10:00</th>
                                <th class="text-center">11:00</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(data, i) in empData" :key="i">
                                <td class="text-center">
                                  &nbsp;
                                </td>
                                <td class="text-center"
                                  @click="employeTable(i)"
                                  style=""
                                >
                                  <div
                                    :class="{ triangle: data.has_notes == true }"
                                  ></div>
                                  {{ data.first_name }} {{ data.last_name }}
                                </td>
                                <td class="text-center">
                                  <trend
                                    :data="toconvertArray(data.trends)"
                                    :gradient="[
                                      '#6fa8dc',
                                      '#42b983',
                                      '#2c3e50',
                                    ]"
                                    :padding="8"
                                    :radius="18"
                                    :stroke-width="8"
                                    auto-draw
                                    smooth
                                  >
                                  </trend>
                                </td>
                                <td class="text-center" style="width:100px;">{{ data.assigned_time }} h</td>
                                <td class="text-center" style="width:100px;">{{ data.assigned_percentage }}%</td>
                                <td style="width:100px; text-align:left;"
                                  :class="{
                                    'achrived-target':
                                      data.assigned_time == data.achieved_time,
                                    'below-target':
                                      data.assigned_time > data.achieved_time,
                                    'exceed-target':
                                      data.assigned_time < data.achieved_time,
                                  }"
                                >
                                  {{ data.achieved_time }} h
                                </td>
                                <td style="width:100px; text-align: left;"
                                  :class="{
                                    'achrived-target':
                                      data.assigned_time == data.achieved_time,
                                    'below-target':
                                      data.assigned_time > data.achieved_time,
                                    'exceed-target':
                                      data.assigned_time < data.achieved_time,
                                  }"
                                >
                                  {{ data.achieved_percentage }}%
                                </td>
                                <td class="text-center">{{ highfocustime(data.flow) }}</td>
                                <td class="text-center">
                                  {{ highfocustimeDefrence(data.flow) }}
                                </td>
                                <td class="text-center">
                                  {{ setdesignHours(data.total_focus) }}
                                </td>
                                <td class="">
                                  <div v-if="data.periods[7]">
                                    <div
                                      class="focusBar"
                                      :style="{
                                        width: Setdesign(
                                          data.periods[7].working
                                        ),
                                        marginLeft: mrgin,
                                      }"
                                    ></div>
                                    <div
                                      class="workingColor"
                                      :style="{
                                        width: Setdesign(data.periods[7].focus),
                                        marginLeft: mrgin,
                                      }"
                                    ></div>
                                  </div>
                                </td>
                                <td class="">
                                  <div v-if="data.periods[8]">
                                    <div
                                      class="focusBar"
                                      :style="{
                                        width: Setdesign(
                                          data.periods[8].working
                                        ),
                                        marginLeft: mrgin,
                                      }"
                                    ></div>
                                    <div
                                      class="workingColor"
                                      :style="{
                                        width: Setdesign(data.periods[8].focus),
                                        marginLeft: mrgin,
                                      }"
                                    ></div>
                                  </div>
                                </td>
                                <td class="">
                                  <div v-if="data.periods[9]">
                                    <div
                                      class="focusBar"
                                      :style="{
                                        width: Setdesign(
                                          data.periods[9].working
                                        ),
                                        marginLeft: mrgin,
                                      }"
                                    ></div>
                                    <div
                                      class="workingColor"
                                      :style="{
                                        width: Setdesign(data.periods[9].focus),
                                        marginLeft: mrgin,
                                      }"
                                    ></div>
                                  </div>
                                </td>
                                <td>
                                  <div v-if="data.periods[10]">
                                    <div
                                      class="focusBar"
                                      :style="{
                                        width: Setdesign(
                                          data.periods[10].working
                                        ),
                                        marginLeft: mrgin,
                                      }"
                                    ></div>
                                    <div
                                      class="workingColor"
                                      :style="{
                                        width: Setdesign(
                                          data.periods[10].focus
                                        ),
                                        marginLeft: mrgin,
                                      }"
                                    ></div>
                                  </div>
                                </td>
                                <td>
                                  <div v-if="data.periods[11]">
                                    <div
                                      class="focusBar"
                                      :style="{
                                        width: Setdesign(
                                          data.periods[11].working
                                        ),
                                        marginLeft: mrgin,
                                      }"
                                    ></div>
                                    <div
                                      class="workingColor"
                                      :style="{
                                        width: Setdesign(
                                          data.periods[11].focus
                                        ),
                                        marginLeft: mrgin,
                                      }"
                                    ></div>
                                  </div>
                                </td>
                              </tr>
                              <div class="open-box col-md-4">
                                <div class="info-Box">
                                  <i
                                    class="fa fa-user-circle-o"
                                    aria-hidden="true"
                                  ></i>
                                  <div class="name-Box">
                                    <h4>Harold james</h4>                                    
                                    <p>{{getCurrentDateTime}}</p>
                                  </div>
                                </div>
                                <div class="detail-Box">
                                  <p>
                                    <strong>Activity:</strong> Application
                                    Processing
                                  </p>
                                  <p>
                                    <strong>Employee:</strong> {{getEmployeeName}}
                                  </p>
                                </div>
                                <div class="note-Box">
                                  <p>Note</p>
                                  <p>
                                    <textarea id="notes-box" rows="3" cols="50" />                  
                                  </p>
                                </div>
                                <div class="btn-Box">
                                  <a @click="addNotes()">Add Note</a>
                                  <a @click="closeNotesBox()">Cancel</a>
                                </div>
                              </div>
                            </tbody>
                            <tfoot>
                              <tr>
                                <td></td>
                                <td class="text-center" colspan="2">Totals (Aggregate)</td>
                                <td class="text-center">22 h</td>
                                <td class="text-center"></td>
                                <td class="text-center">17 h</td>
                                <td class="text-center" colspan="2"></td>
                                <td class="text-center">5 h</td>
                                <td class="text-center">14 h</td>
                                <td class="text-center" colspan="7"></td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div> 

                <!-- Activity Table Ends -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";
import $ from "jquery";
import moment from "moment";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { getSession } from '../../assets/js/util.js'
import Swal from 'sweetalert2'
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'

//$(".tooltipTd .infoIcon").hover(function () {});

// $("body").on("click", ".dayText", function () {
//   if ($(this).text() == "Today") {
//     let todayDate = new Date();

//     let month = todayDate.toLocaleString("default", { month: "short" });
//     let day = todayDate.toLocaleString("default", { day: "2-digit" });
//     let year = todayDate.toLocaleString("default", { year: "numeric" });
//     let date = month + "-" + day + "-" + year;

//     $(".dateText").text($(this).text() + ", " + date);
//   } else {
//     $(".dateText").text($(this).text());
//   }
// });

// $(document).click(function (event) {
//   var $target = $(event.target);
//   if (
//     !$target.closest(".tooltipTd").length &&
//     !$target.closest(".tooltipTdOne").length &&
//     !$target.closest(".tooltipTdTwo").length
//   ) {
//     if (
//       $(".tooltipTd .tooltipData").css("display") == "block" ||
//       $(".tooltipTdTwo .tooltipData").css("display") == "block" ||
//       $(".tooltipTdOne .tooltipData").css("display") == "block"
//     ) {
//       $(".tooltipTd .tooltipData").css("display", "none");
//       $(".tooltipTdTwo .tooltipData").css("display", "none");
//       $(".tooltipTdOne .tooltipData").css("display", "none");
//     }
//   }
// });

// $(document).click(function (event) {
//   var $target = $(event.target);
//   if (
//     !$target.closest(".tooltipTd").length &&
//     !$target.closest(".tooltipTdOne").length &&
//     !$target.closest(".tooltipTdTwo").length
//   ) {
//     if (
//       $(".tooltipTd .tooltipData").css("display") == "block" ||
//       $(".tooltipTdTwo .tooltipData").css("display") == "block" ||
//       $(".tooltipTdOne .tooltipData").css("display") == "block"
//     ) {
//       $(".tooltipTd .tooltipData").css("display", "none");
//       $(".tooltipTdTwo .tooltipData").css("display", "none");
//       $(".tooltipTdOne .tooltipData").css("display", "none");
//     }
//   }
// });

export default {
  components: { DatePicker },

  name: "managerallEmployee",
  data() {
    return {     
      envurl: process.env.VUE_APP_KUNIN_API_URL, 
      empData: [],
      time1: null,
      time2: null,
      selectedNotesIndex: 0,
      selectedNotesEmpData: null,
      resDateText:null,
      mrgin:0,
      user: JSON.parse(getSession('user')),
      departmentID: null,
      departmentName: null,
      divisionID: null,
      divisionName: null,
      activitiesData: []
    };
  },
  
  computed: {
    getCurrentDateTime: function(){
      return moment().format("HH:mm - MMM, D YYYY");      
    },
    getEmployeeName: function(){
      if (this.selectedNotesEmpData != null) {
        return this.selectedNotesEmpData.first_name + " " + this.selectedNotesEmpData.last_name
      } else {
        return "";
      }
    }
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
    changeDateText(d) {
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

    popInfodiv1() {
      if (
        $(".tooltipTd .tooltipData").css("display") == "block" ||
        $(".tooltipTdTwo .tooltipData").css("display") == "block"
      ) {
        $(".tooltipTd .tooltipData").css("display", "none");
        $(".tooltipTdTwo .tooltipData").css("display", "none");
        $(".tooltipTdOne .tooltipData").css("display", "block");
      } else if ($(".tooltipTdOne .tooltipData").css("display") == "block") {
        $(".tooltipTdOne .tooltipData").css("display", "none");
      } else {
        $(".tooltipTdOne .tooltipData").css("display", "block");
      }
    },

    popInfodiv() {
      if (
        $(".tooltipTdOne .tooltipData").css("display") == "block" ||
        $(".tooltipTdTwo .tooltipData").css("display") == "block"
      ) {
        $(".tooltipTdOne .tooltipData").css("display", "none");
        $(".tooltipTdTwo .tooltipData").css("display", "none");
        $(".tooltipTd .tooltipData").css("display", "block");
      } else if ($(".tooltipTd .tooltipData").css("display") == "block") {
        $(".tooltipTd .tooltipData").css("display", "none");
      } else {
        $(".tooltipTd .tooltipData").css("display", "block");
      }
    },
    
    popInfodiv2() {
      if (
        $(".tooltipTdOne .tooltipData").css("display") == "block" ||
        $(".tooltipTd .tooltipData").css("display") == "block"
      ) {
        $(".tooltipTdOne .tooltipData").css("display", "none");
        $(".tooltipTd .tooltipData").css("display", "none");
        $(".tooltipTdTwo .tooltipData").css("display", "block");
      } else if ($(".tooltipTdTwo .tooltipData").css("display") == "block") {
        $(".tooltipTdTwo .tooltipData").css("display", "none");
      } else {
        $(".tooltipTdTwo .tooltipData").css("display", "block");
      }
    },
    
    toconvertArray(data) {
      var test = JSON.stringify(data);
      let arrayfor = [];
      var test2 = JSON.parse(test);
      for (var i in test2) {
        var test3 = Object.values(test2[i]);
        arrayfor.push(test3[0]);
      }
      return arrayfor;
    },

    removearray() {
      this.forLogArray = [];
    },

    setdesignHours(mins) {
      if (mins < 1) {
        return mins + " h";
      }
      if (mins / 60 < 1) {
        return mins + " m";
      }
      var h = (mins / 60) | 0,
        m = mins % 60 | 0;
      if (m > 0) {
        return h + " h " + m + "m";
      } else {
        return h + " h";
      }
      // moment.utc().hours(h).minutes(m).format("hh:mm");
      //  return moment(mins, x'minutes').format('HH:mm');
    },
    
    mouseOver() {
      $(".tooltipTd .tooltipData").css("display", "block");
    },
    mouseLeave() {
      $(".tooltipTd .tooltipData").css("display", "none");
    },
    mouseOverFirst() {
      $(".tooltipTdOne .tooltipData").css("display", "block");
    },
    mouseLeaveFirst() {
      $(".tooltipTdOne .tooltipData").css("display", "none");
    },
    mouseOverSecond() {
      $(".tooltipTdTwo .tooltipData").css("display", "block");
    },
    mouseLeaveSecond() {
      $(".tooltipTdTwo .tooltipData").css("display", "none");
    },
    gettime(data) {
      let x = data[0];
      let y = data[1];
      var h = (x / 60) | 0,
        m = x % 60 | 0;
      let startTime = moment.utc().hours(h).minutes(m).format("hh:mm");
      var hou = (y / 60) | 0,
        mo = y % 60 | 0;
      let endtime = moment.utc().hours(hou).minutes(mo).format("hh:mm");
      return startTime + " " + endtime;
    },

    getEmpData() {
      let division = this.user.division.division_id
      let department = this.user.department.department_id

      const endpoint = "http://" + this.envurl + "/api/v1/divisions/"+ division +"/departments/"+department+"/activities/all?format=aggregate+hourly&date=today&by=employee"
      console.log(endpoint);
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Token "+this.user.access_token
      }

      axios
        .get(
          endpoint, {headers: headers}
        )
        .then((res) => {
          let EmData = res.data.data;
          let EmployeeData = [];

          // EmData.forEach((ele) => {
          //   EmpDepartment = ele.departments;
          // });
          this.divisionID = EmData.division_id;
          this.divisionName = EmData.division_name;
          this.departmentID = EmData.department_id;
          this.departmentName = EmData.department_name;

          this.activitiesData = EmData.activities;

          EmData.activities.forEach((element) => {
            EmployeeData = element.employees;
          });

          console.log("EmData >", EmData);

          this.empData = EmployeeData
          console.log(this.empData);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    employeTable(index) {
      // this.$router.push("/empDetail");
      this.selectedNotesIndex = index;
      if(this.empData.length > 0) {
        this.selectedNotesEmpData = this.empData[this.selectedNotesIndex];
      }
      this.$router.push({name: 'SingleEmployee', params:{ empData: this.selectedNotesEmpData}});
    },

    setActivity() {
      this.$router.push("/mCreditCard");
    },
    getValue() {
      this.$router.push("/weaklydetails");
    },
    
    highfocustimeDefrence(data) {
      if (data.length < 1) {
        return "0";
      }
      var x = data[0];
      var y = data[1];

      var now = "04/09/2013 " + y;
      var then = "04/09/2013 " + x;

      //    return d;
      var timedurations = moment
        .utc(
          moment(now, "DD/MM/YYYY H:mm").diff(moment(then, "DD/MM/YYYY H:mm"))
        )
        .format("H:mm");
      var beforsp = timedurations.split(":");
      var hrs = beforsp[0];
      var mint = beforsp[1];
      var retunmint = 0;
      var returnhrs = 0;
      if (mint == 0) {
        retunmint = "";
      } else {
        retunmint = mint + " m";
      }
      if (hrs == 0) {
        returnhrs = "";
      } else {
        returnhrs = hrs + " h ";
      }
      return returnhrs + retunmint;
    },

    highfocustime(data) {
      if (data.length < 1) {
        return "0";
      }
      var starttime = data[0];
      var endtime = data[1];

      var startreturn = moment(starttime, "H:mm").format("H:mm");
      var returnEndrtime = moment(endtime, "H:mm").format("H:mm");
      return startreturn + " - " + returnEndrtime;
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
    
    calenderBoxShow() {
      if ($(".calender-Box").css("display") === "block") {
        $(".calender-Box").css("display", "none");
      } else {
        $(".calender-Box").css("display", "block");
      }
    },

    getHourse(mins) {
      if (mins / 60 < 1) {
        return mins + "m";
      }
      var h = (mins / 60) | 0,
        m = mins % 60 | 0;
      return moment.utc().hours(h).minutes(m).format("hh:mm");
      //   return moment.utc().startOf('day').add(minutes, 'minutes').format('hh:mm')
    },

    openBox(index) {
      this.selectedNotesIndex = index;
      $("#notes-box").val('');
      if(this.empData.length > 0){
        this.selectedNotesEmpData = this.empData[this.selectedNotesIndex];
        if ($(".open-box").css("display") == "block") {
          $(".open-box").css("display", "none");
        } else {
          $(".open-box").css("display", "block");
        }
      }      
    },

    addNotes() {
      let notes = $("#notes-box").val().trim();
      if(notes.length > 0){

        let division = this.user.division.division_id
        let department = this.user.department.department_id
        let activityID = '7ffffffe010a4c2185416c97821d40f2'

        const endpoint = "http://" + this.envurl + "/api/v1/divisions/"+division+"/departments/"+department+"/activities/"+activityID+"/notes"

        const headers = {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          "Authorization": "Token "+this.user.access_token
        }

        let note = {'note': {'note': notes}}

        axios
        .post(endpoint, note, {headers: headers} )
        .then((res) => {                  
          console.log("Save Notes > ",res);
          if(this.selectedNotesEmpData != null){
            this.selectedNotesEmpData.notes = true;
            this.empData[this.selectedNotesIndex].notes = true;
            $(".open-box").css("display", "none");
          }
          Swal.fire({title: 'Notes has been added successfully', icon: 'success'});
        })
        .catch((err) => {
          console.log("saveNotes: error : ", err);
        });
        
      }else{
        alert("Please enter the notes.");
      }
    },

    closeNotesBox(){
      $(".open-box").css("display", "none");
    }

  },
  created() {
    this.getEmpData();
    loadProgressBar();
  },
};
</script>
<style lang="css" scoped>
#cerdit-card .calender-Box {
  top: 63%;
  left: 90%;
  /* max-width: 100%; */
  min-width: 509px !important;
}

</style>