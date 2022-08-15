<template>
  <div>
    <section id="main">
      <div class="container-fluid">
        <div class="row">
          <div class="maincontent employeecontent col-lg-9">
            <div class="tab-content mainContent">
              <div id="cerdit-card" class="tab-pane fade in active">
                <div class="row-click-employee-data">
                  <p class="backIconText" @click="$router.go(-1)">
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                  </p>
                  <label>Employee</label>
                  <h4>{{getEmployeeName}}</h4>
                  <div class="multiple-select">
                    <div class="row">
                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label class="w-100">Display View By:</label>
                        <select class="display-view-by">
                          <option>Focus Area</option>
                        </select>
                      </div>
                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label class="w-100">Select Date Range:</label>
                        <div class="calender-Div">
                          <i class="fa fa-calendar" aria-hidden="true"></i>
                          <span class="managerchangeText">Today, June 28</span>
                          <i
                            @click="calenderBoxShow()"
                            class="fa fa-caret-down"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <!-- <div class="calender-Box">
                                  <div class="container-fluid">
                                    <div class="row">
                                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-Div">
                                          <label>From</label>
                                          <div class="from-Calender">
                                            <i class="fa fa-calendar" aria-hidden="true"></i>
                                            <span>06/10/20</span>
                                          </div>
                                        </div>
                                      </div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                          <div class="to-Div">
                                            <label>To</label>
                                            <div class="from-Calender">
                                              <i for="#date-input" class="fa fa-calendar" aria-hidden="true"></i>
                                              <span>06/10/20</span>
                                              <input style="display: none;" id="date-input" type="date" name="to-date">
                                            </div>
                                          </div>
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="col-lg-12">
                                        <div class="commonDiv">
                                          <p>Today</p>
                                        </div>
                                        <div class="commonDiv">
                                          <p class="weekText" @click="getValue()">Week over Week</p>
                                        </div>
                                        <div class="commonDiv">
                                          <p>Month over Month</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>      
                                </div> -->
                      </div>
                    </div>
                  </div>
                  <!-- Activity Starts -->
                  <!-- <div class="table-card-div">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="table-responsive">
                          <table class="table table-bordered">
                            <thead>
                              <tr>
                                <th class="text-center"></th>
                                <th class="text-center">Activity</th>
                                <th class="text-center">Trend</th>
                                <th class="text-center" colspan="2">
                                  Assigned Time
                                </th>
                                <th class="text-center" colspan="2">
                                  Achieved Time
                                </th>
                                <th
                                  class="text-center"
                                  style="position: relative"
                                >
                                  High Focus (Time of Day)
                                  <span class="infoIcon"
                                    ><i
                                      class="fa fa-info-circle"
                                      aria-hidden="true"
                                    ></i
                                  ></span>
                                </th>
                                <th
                                  class="text-center"
                                  style="position: relative"
                                >
                                  High Focus (Duration)
                                  <span class="infoIcon"
                                    ><i
                                      class="fa fa-info-circle"
                                      aria-hidden="true"
                                    ></i
                                  ></span>
                                </th>
                                <th
                                  class="text-center"
                                  style="position: relative"
                                >
                                  Collective Focus Time
                                  <span class="infoIcon"
                                    ><i
                                      class="fa fa-info-circle"
                                      aria-hidden="true"
                                    ></i
                                  ></span>
                                </th>
                                <th class="text-center">07:00</th>
                                <th class="text-center">08:00</th>
                                <th class="text-center">09:00</th>
                                <th class="text-center">10:00</th>
                                <th class="text-center">11:00</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(data, i) in activities" :key="i">
                                <td class="text-center">
                                  <i class="fa fa-file-text-o" aria-hidden="true" @click="openBox(i)"></i>
                                </td>
                                <td class="text-center" style="position: relative">
                                  <div :class="{ triangle: data.notes == true }" @mouseover="showLatestNotes(data.activity)" title=""></div>
                                  {{data.activity_name}}
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
                                <td class="text-center">{{data.assigned_time}}</td>
                                <td class="text-center">{{data.assigned_time_percent}}</td>
                                <td class="text-center achrived-target">{{data.achieved_time}}</td>
                                <td class="text-center achrived-target">
                                  {{data.achieved_percentage}}
                                </td>
                                <td class="text-center">{{data.high_focus_time_of_day}}</td>
                                <td class="text-center">{{data.high_focus_duration}}</td>
                                <td class="text-center">{{data.collective_focus_time}}</td>
                                <td class="text-center">
                                  <div class="bar">
                                    <div class="parent-bar"></div>
                                    <div class="child-bar"></div>
                                  </div>
                                </td>
                                <td class="text-center"></td>
                                <td class="text-center"></td>
                                <td class="text-center">
                                  <div class="child-bar bar-65-left-50"></div>
                                </td>
                                <td class="text-center"></td>
                              </tr>                                

                            </tbody>
                            
                            <tfoot>
                              <tr>
                                <td class="text-center"></td>
                                <td class="text-center" colspan="2">
                                  Totals (Aggregate)
                                </td>
                                <td class="text-center">7h</td>
                                <td class="text-center"></td>
                                <td class="text-center">6 h</td>
                                <td class="text-center" colspan="2"></td>
                                <td class="text-center">5h 30m</td>
                                <td class="text-center">3h 30m</td>
                                <td class="text-center" colspan="7"></td>
                              </tr>
                            </tfoot>
                          
                          </table>
                          
                          <div class="open-box col-md-4">
                            <div class="info-Box">
                                <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                                <div class="name-Box">
                                    <h4>Harold james</h4>                                    
                                    <p>{{getCurrentDateTime}}</p>
                                </div>
                            </div>
                            
                            <div class="detail-Box">
                                <p>
                                    <strong>Activity:</strong> {{getActivityName}}
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
                          
                        </div>
                      </div>
                    </div>
                  </div> -->
                  
                  <ActivityComponent name="single-employee-details" type="activity-with-notes" v-bind:activitiesData="activities" ></ActivityComponent>
                  
                  <!-- Activity Ends -->
                  <!-- <div class="all-notes-div">
                    <h4>All Notes</h4>
                    <div class="container-fluid p-0">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="table-div">
                            <div class="table-responsive">
                              <table class="table table-bordered">
                                <thead>
                                  <tr>
                                    <th class="text-center">Date Submitted</th>
                                    <th class="text-center">Focus Area</th>
                                    <th class="text-center">Note</th>
                                    <th class="text-center">Submitted By</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(data, i) in notesData" :key="i">
                                    <td class="text-center">{{data.date_submitted}}</td>
                                    <td class="text-center">{{data.focus_area}}</td>
                                    <td class="text-center">{{data.user_notes}}</td>
                                    <td class="text-center">{{data.submitted_by}}</td>
                                  </tr>
                                  
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> -->

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>

import axios from "axios"
import $ from "jquery"
import moment from "moment"
import { getSession } from '../../assets/js/util.js'
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'
import ActivityComponent from "../ActivityComponent.vue";

export default {
  name: "SingleEmployee",
  components: { ActivityComponent },

  data() {
    return {
      envurl: process.env.VUE_APP_KUNIN_API_URL,
      empData: null,
      activities: [],
      selectedNotesIndex: 0,
      selectedNotesActivityData: null,
      notesData: [{
        date_submitted: '06/07/2020',
        focus_area: 'Application Processing',
        user_notes: 'Was below target as I was asked to support Customer Service',
        submitted_by: 'Anna Thompson'
      }],
      user: JSON.parse(getSession('user')),

    };
  },
  
  computed: {
    getCurrentDateTime: function(){
      return moment().format("HH:mm - MMM, D YYYY");      
    },
    
    getEmployeeName: function(){
     if(this.empData != null) {
       return this.empData.first_name + " " + this.empData.last_name;
     }else {
       return "";
     }
    },

    

    getNotes: function() {
      return this.notesData;
    },

    getActivityName: function() {
      if(this.selectedNotesActivityData != null){
        return this.selectedNotesActivityData.activity;
      }else{
          return false
      }
    }
    

  },
  
  methods: {
    getActivities: function() {
      
      let userID = this.empData.user_id

      const endpoint = "http://" + this.envurl + "/api/v1/users/"+userID+"/activities?format=daily&date=today"

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
          console.log("Single emp > ", res);
          this.activities = res.data.data.activities;
        })
        .catch((err) => {
          console.log(err);
        });

        return this.activities;
      // return [{
      //     activity: 'Application Processing',
      //     trend: null,
      //     assigned_time: '192h',
      //     assigned_time_percent: '86%',
      //     achieved_time: '2h',
      //     achieved_time_percent: '100%',
      //     high_focus_time_of_day: '10:00 - 12:00',
      //     high_focus_duration: '1h',
      //     collective_focus_time: '2h',
      //     a07: 0,
      //     a08: 0,
      //     a09: 0,
      //     a10: 0,
      //     a11: 0,
      //     notes: true,
      //     notesData: [{
      //       date_submitted: '06/07/2020',
      //       focus_area: 'Application Processing',
      //       user_notes: 'Was below target as I was asked to support Customer Service',
      //       submitted_by: 'Anna Thompson'
      //     }],
      // },
      // {
      //     activity: 'Customer Service',
      //     trend: null,
      //     assigned_time: '240h',
      //     assigned_time_percent: '86%',
      //     achieved_time: '0h',
      //     achieved_time_percent: '0%',
      //     high_focus_time_of_day: '09:00 - 10:00',
      //     high_focus_duration: '0',
      //     collective_focus_time: '0',
      //     a07: 0,
      //     a08: 0,
      //     a09: 0,
      //     a10: 0,
      //     a11: 0,
      //     notes: false,
      //     notesData: [],
      // },
      // {
      //     activity: 'Last and Stolen Cards',
      //     trend: null,
      //     assigned_time: '120h',
      //     assigned_time_percent: '71%',
      //     achieved_time: '30 m',
      //     achieved_time_percent: '25%',
      //     high_focus_time_of_day: '10:00 - 12:00',
      //     high_focus_duration: '30m',
      //     collective_focus_time: '30m',
      //     a07: 0,
      //     a08: 0,
      //     a09: 0,
      //     a10: 0,
      //     a11: 0,
      //     notes: false,
      //     notesData: [],
      // },
      // {
      //     activity: 'Account Maintance',
      //     trend: null,
      //     assigned_time: '60h',
      //     assigned_time_percent: '57%',
      //     achieved_time: '3h 32m',
      //     achieved_time_percent: '17%',
      //     high_focus_time_of_day: '10:00 - 12:00',
      //     high_focus_duration: '2h',
      //     collective_focus_time: '3h',
      //     a07: 0,
      //     a08: 0,
      //     a09: 0,
      //     a10: 0,
      //     a11: 0,
      //     notes: false,
      //     notesData: [],
      // },
      // {
      //     activity: 'Fraud',
      //     trend: null,
      //     assigned_time: '40h',
      //     assigned_time_percent: '71%',
      //     achieved_time: '0',
      //     achieved_time_percent: '0',
      //     high_focus_time_of_day: '10:00 - 12:00',
      //     high_focus_duration: '0',
      //     collective_focus_time: '0',
      //     a07: 0,
      //     a08: 0,
      //     a09: 0,
      //     a10: 0,
      //     a11: 0,
      //     notes: false,
      //     notesData: [],
      // }];  
    },
    getParamsData() {
      this.empData = this.$route.params.empData;
      console.log(">>>>>", this.empData);
    },

    openBox(index) {
      this.selectedNotesIndex = index;
      $("#notes-box").val('');
      if(this.activities.length > 0){
        this.selectedNotesActivityData = this.activities[this.selectedNotesIndex];
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
        if(this.selectedNotesActivityData != null){      
          let notesObj = {
            date_submitted: moment().format("MM/D/YYYY"),
            focus_area: this.selectedNotesActivityData.activity,
            user_notes: notes,
            submitted_by: this.getEmployeeName
          };
          this.notesData.push(notesObj);
          this.selectedNotesActivityData.notes = true;
          this.activities[this.selectedNotesIndex].notes = true;
          $(".open-box").css("display", "none");
        }
      }else{
        alert("Please enter the notes.");
      }
    },

    closeNotesBox(){
      $(".open-box").css("display", "none");
    },

    showLatestNotes(_activity) {
      let notesByActivity = this.notesData.filter(function(value){
        if(value.focus_area.trim().toLowerCase() === _activity.trim().toLowerCase()){
          return value;
        }
      });
      let notesByActivityDesc = notesByActivity.sort((a, b) => {
        let da = new Date(a.date_submitted),
        db = new Date(b.date_submitted);
        return da - db;
      });
      console.log(notesByActivityDesc);
      // $("#last-notes").text(notesByActivityDesc[0].user_notes);
      // $("#menuShow").show();
      $(".triangle").attr('title', notesByActivityDesc[notesByActivityDesc.length-1].user_notes);
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

  },
  
  created() {
    this.getParamsData(); 
    this.activities = this.getActivities();
    loadProgressBar();

  },
};
</script>
<style lang="css" scoped>
.table-card-div {
  overflow: auto;
}
</style>