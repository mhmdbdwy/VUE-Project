<template>
  <div>
    <div class="mainContent">
      <div id="manager" class="employee">
        <div class="introDiv" style="margin-bottom: 20px">
          <div class="container-fluid p-0">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div class="dateSelect">
                  <label class="w-100">Select Date Range:</label>
                  <div class="calender-Div" @click="calenderBoxShow()">
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                    <span class="managerchangeText">{{resDateText}}</span>
                    <i class="fa fa-caret-down" aria-hidden="true"></i>
                  </div>
                  <div class="calender-Box">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-lg-12 text-center">
                          <label>Select Date</label>
                          <div class="from-Calender">
                            <!-- <i class="fa fa-calendar" aria-hidden="true"></i> -->
                            <!-- <span>06/10/20</span> -->
                            <date-picker
                              v-model="time1"
                              valueType="format"
                              width="150px"
                              @change="calenderBoxShow(); changeDateText(4)"
                            ></date-picker>
                          </div>
                        </div>
                        
                      </div>
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="commonDiv" @click="calenderBoxShow(); changeDateText(1)">
                            <p class="dayText">Today</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div class="dateSelect">
                  <label class="w-100">Activities:</label>
                  <div class="calender-Div">
                    <i class="fa fa-calendar" aria-hidden="true" style="visibility: hidden;"></i>
                    <span class="managerchangeText">All</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="without-change-date">
          <div class="activity-overview">
            <div class="container-fluid p-0">
              

              <div class="table-div-activity">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="table-responsive">
                      <table class="table table-bordered">
                        <thead>
                          <tr class="tooltipRow">
                            <th class="text-center" >
                              Year
                            </th>
                            <th class="text-center" >
                              Month
                            </th>
                            <th>
                              Week
                            </th>
                            <th>
                              Day
                            </th>
                            <th class="text-center" colspan="2" @click="sortByAssignedTime">
                              Assigned Time 
                              <i class="fa fa-angle-down" v-if="isSortByAssignedTime" aria-hidden="true"></i>
                              <i class="fa fa-angle-up" v-else aria-hidden="true"></i>
                            </th>
                            <th class="text-center" colspan="2" @click="sortByAchievedTime">
                              Achieved Time
                              <i class="fa fa-angle-down" v-if="isSortByAchievedTime" aria-hidden="true"></i>
                              <i class="fa fa-angle-up" v-else aria-hidden="true"></i>
                            </th>
                            <th class="text-center tooltipTd">
                              High Focus (Time of Day)
                              <span
                                class="infoIcon"
                                @mouseleave="mouseLeave"
                                @mouseover="mouseOver"
                              >
                                <i class="fa fa-info-circle"></i>
                              </span>
                              <span
                                class="tooltipData"
                                style="font-weight: normal"
                                >Time period that has the highest focus for the activity.  Note if there are multiple times with the same duration the first occurrence is selected.</span
                              >
                            </th>
                            <th class="text-center tooltipTdOne">
                              High Focus (Duration)<span
                                class="infoIcon"
                                @mouseleave="mouseLeaveFirst"
                                @mouseover="mouseOverFirst"
                              >
                                <i class="fa fa-info-circle"></i>
                              </span>
                              <span
                                class="tooltipData"
                                style="font-weight: normal"
                                >The highest continuous period of focus time within the activity.</span
                              >
                            </th>
                            <th class="text-center tooltipTdTwo" @click="sortByTotalFocus">
                              Collective Focus Time 
                              <i class="fa fa-angle-down" v-if="isSortByTotalFocus" aria-hidden="true"></i>
                              <i class="fa fa-angle-up" v-else aria-hidden="true"></i>
                              <span
                                class="infoIcon"
                                @mouseleave="mouseLeaveSecond"
                                @mouseover="mouseOverSecond"
                              >
                                <i class="fa fa-info-circle"></i>
                              </span>
                              <span
                                class="tooltipData"
                                style="font-weight: normal"
                                >The aggregate of all focus time periods with the activity.</span
                              >
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr
                            v-for="(single_data, index) in activitiesData"
                            :key="index"
                            v-show="assigned_time_zero(single_data)"
                          >
                            {{
                              removearray()
                            }}
                            
                            <td class="text-center" colspan="4" @click="goToDetails">31-1-2021</td>
                            
                            <td class="text-center" style="width:100px">
                              {{ setdesignHours(single_data.assigned_time) }}
                            </td>
                            <td class="text-center" style="width:100px">
                              {{ single_data.assigned_percentage }}%
                            </td>
                            <td
                              style="text-align: left; width:100px"
                              :class="{
                                'achrived-target':
                                (
                                  (single_data.achieved_time <= (single_data.assigned_time + (single_data.assigned_time * 0.1) ) )
                                  &&
                                  (single_data.achieved_time >= (single_data.assigned_time - (single_data.assigned_time * 0.1) ) )
                                ),
                                'below-target':
                                (single_data.achieved_time <= (single_data.assigned_time - (single_data.assigned_time * 0.2) ) )
                                ,
                                'exceed-target':  
                                (
                                  (single_data.achieved_time > (single_data.assigned_time + (single_data.assigned_time * 0.1) ) )
                                  ||
                                  (
                                    (single_data.achieved_time < (single_data.assigned_time - (single_data.assigned_time * 0.1) ) )
                                    &&
                                    (single_data.achieved_time > (single_data.assigned_time - (single_data.assigned_time * 0.2) ) )
                                  )
                                )
                              }"
                            >
                              {{ setdesignHours(single_data.achieved_time) }}
                            </td>
                            <td
                              style="text-align: left; width:100px"
                              :class="{
                                  'achrived-target':
                                  (
                                    (single_data.achieved_time <= (single_data.assigned_time + (single_data.assigned_time * 0.1) ) )
                                    &&
                                    (single_data.achieved_time >= (single_data.assigned_time - (single_data.assigned_time * 0.1) ) )
                                  ),
                                  'below-target':
                                  (single_data.achieved_time <= (single_data.assigned_time - (single_data.assigned_time * 0.2) ) )
                                  ,
                                  'exceed-target':  
                                  (
                                    (single_data.achieved_time > (single_data.assigned_time + (single_data.assigned_time * 0.1) ) )
                                    ||
                                    (
                                      (single_data.achieved_time < (single_data.assigned_time - (single_data.assigned_time * 0.1) ) )
                                      &&
                                      (single_data.achieved_time > (single_data.assigned_time - (single_data.assigned_time * 0.2) ) )
                                    )
                                  )
                                }"
                            >
                              {{ single_data.achieved_percentage }}%
                            </td>
                            <td class="text-center">{{ highfocustime(single_data.flow) }}</td>
                            <td class="text-center">
                              {{ highfocustimeDefrence(single_data.flow) }}
                            </td>
                            <td class="text-center">
                              {{ setdesignHours(single_data.total_focus) }}
                            </td>
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
import axios from "axios";
import moment from "moment";
import { getSession } from "../../assets/js/util.js";
import $ from "jquery";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "EmpAllActivity",
  components: { DatePicker },

  data() {
    return {
      envurl: process.env.VUE_APP_KUNIN_API_URL,
      user: JSON.parse(getSession("user")),
      activitiesData: {},
      time1: null,
      definetime: 0,
      forLogArray: [],
      resDateText:null,
      isSortByAssignedTime: false,
      isSortByTotalFocus: false,
      isSortByAchievedTime: false,
    };
  },
  mounted(){
      let todayDate = new Date();
      let month = todayDate.toUTCString('default', { month: 'short'});
      
      let date = month;
      let dateText = 'Today' + ', ' + moment(date).format('MMM-DD-YYYY');
      if(this.user.employee_type !== 'employee'){
        this.$router.push("/");
        alert("you can't access this page with your current employee type");
      }

      if(localStorage.getItem('dateText')){
          const tempText = localStorage.getItem('dateText');
          this.resDateText = tempText;
      }

      else{
          localStorage.setItem('dateText', dateText);
          const tempText = localStorage.getItem('dateText');
          this.resDateText = tempText;            
      }
      this.changeDateText(1);
      let userID = this.user.user_id

    const endpoint = "http://" + this.envurl + "/api/v1/users/"+userID+"/activities?date=thisweek";
    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Token " + this.user.access_token
      };
    axios
      .get(
        endpoint,
        {headers: headers}
      )
      .then((res) => {
        //  console.log('here is bfore',res.data.data)
        const alldata = res.data.data;
        console.log(res);

        this.activitiesData = alldata.activities;
        
      })
      .catch((err) => {
        console.log("erroaar", err);
      });
  },
  
  methods: {
    goToDetails: function(){
      this.$router.push("/emplyedetails");
    },
    sortByAssignedTime: function() {
      if (this.isSortByAssignedTime){
        this.isSortByAssignedTime = false; 
        this.activitiesData.sort((a, b) => (a.assigned_time > b.assigned_time) ? -1 : 1);
      }else{
        this.activitiesData.sort((a, b) => (a.assigned_time > b.assigned_time) ? 1 : -1);
        this.isSortByAssignedTime = true;
        this.isSortByAchievedTime = false;
        this.isSortByTotalFocus = false;
      }
      return this.activitiesData;
    },
    sortByAchievedTime: function() {
      if (this.isSortByAchievedTime){
        this.isSortByAchievedTime = false; 
        this.activitiesData.sort((a, b) => (a.assigned_time > b.assigned_time) ? -1 : 1);
      }else{
        this.activitiesData.sort((a, b) => (a.assigned_time > b.assigned_time) ? 1 : -1);
        this.isSortByAchievedTime = true;
        this.isSortByTotalFocus = false;
        this.isSortByAssignedTime = false;
      }
      return this.activitiesData;
    },
    sortByTotalFocus: function() {
      if (this.isSortByTotalFocus){
        this.isSortByTotalFocus = false; 
        this.activitiesData.sort((a, b) => (a.total_focus > b.total_focus) ? -1 : 1);
      }else{
        this.activitiesData.sort((a, b) => (a.total_focus > b.total_focus) ? 1 : -1);
        this.isSortByTotalFocus = true;
        this.isSortByAchievedTime = false;
        this.isSortByAssignedTime = false;
      }
      return this.activitiesData;
    },
    assigned_time_zero(x){
      return !(x.assigned_time == 0);
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
              this.$router.push("/employee");
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


              const dateText = moment(resDate1).format("MMM DD YYYY");
              this.resDateText = dateText;
          }
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
    toconvertArray(data) {
        let arrayfor = [];
        if (data!=null) {
            var test = JSON.stringify(data);
            var test2 = JSON.parse(test);
            for (var i in test2) {
                var test3 = Object.values(test2[i]);
                arrayfor.push(test3[0]);
            }

            return arrayfor;
        }else{
            return arrayfor;
        }
    },
    removearray() {
      this.forLogArray = [];
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
    calenderBoxShow() {
      if ($(".calender-Box").css("display") === "block") {
        $(".calender-Box").css("display", "none");
      } else {
        $(".calender-Box").css("display", "block");
      }
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
      //  return moment(mins, 'minutes').format('HH:mm');
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
  }
};
</script>