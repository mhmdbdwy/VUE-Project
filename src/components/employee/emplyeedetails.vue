<template>
  <div>    
    <div class="mainContent">
      <div id="cerdit-card" class="">
        <div class="common-main-div">
          <p class="backIcon">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
          </p>
          <div class="multiple-select w-m-20 m-t-0">
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <label class="w-100">Date Range:</label>
                <div class="calender-Div emp-details-cal" @click="calenderBoxShow()" style="margin-bottom: 20px">
                  <i class="fa fa-calendar" aria-hidden="true"></i>
                  <span class="changeText">{{resDateText}}</span>
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                </div>
                <div class="calender-Box" >
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-lg-12 text-center">
                        <label>Select Date</label>
                        <div class="from-Calender">
                          <!-- <i for="#date-input" class="fa fa-calendar" aria-hidden="true"></i> -->
                          <date-picker
                            v-model="time1"
                            valueType="format"
                            width="150"
                            @change="calenderBoxShow(); changeDateText(4)"
                          ></date-picker>

                          <!-- style="display: none;" -->
                          <!-- <input  id="date-input" type="date" name="to-date"> -->
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
        <!-- Fixed Column Table -->
        
        <!-- Activity Table Original -->
        <ActivityComponent name="employee-details" type="activity-with-notes" v-bind:focusHoursMarginArray="focusHoursMarginArray" v-bind:slotHaveBarArray="slotHaveBarArray" v-bind:focusHoursArray="focusHoursArray" v-bind:workingHoursArray="workingHoursArray" v-bind:activitiesData="activitiesData" :notesData="notesData"></ActivityComponent>
        <!-- End of activity table -->
        
      </div>
    </div>
    
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
  components: { ActivityComponent, DatePicker },

  name: "EmployeeDetails",

    data() {
      return {
        envurl: process.env.VUE_APP_KUNIN_API_URL,
        activitiesData: {},
        slotHaveBarArray: [],
        workingHoursArray: [],
        focusHoursArray: [],
        focusHoursMarginArray: [],
        width: null,
        time1: null,
        resDateText:null,
        selectedNotesActivityData: null,
        notesData: [],
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
    } else{
        localStorage.setItem('dateText', dateText);
        const tempText = localStorage.getItem('dateText');
        this.resDateText = tempText;            
    }
    
    this.allActivities();
    this.changeDateText(1);
  },

  computed: {
    getCurrentDateTime: function(){
      return moment().format("HH:mm - MMM, D YYYY");      
    },
    
    // getEmployeeName: function(){
    //  return "Anna Thompson";
    // },

    // getActivityName: function() {
    //   if(this.selectedNotesActivityData != null){
    //     return this.selectedNotesActivityData.activity_name;
    //   }
    // }
  },  

  methods: {
    haveBar: function(){
      let resultArray = [];
      for(let x = 0; x < this.activitiesData.length; x++){
        let currentActivityPeriods = this.activitiesData[x].periods;
        let keys = [];
        let row = [];
        let currentProp = 0;
        for(let y = 0; y < currentActivityPeriods.length; y++){
          let thisPeriod = currentActivityPeriods[y];
          for(let theKey in thisPeriod){
            keys.push(theKey)
          }
        }
        for(let z = 0; z < 24; z++){
          if(keys[currentProp] == z){
            row.push(true);
            currentProp++;
          }else{
            row.push(false);
          }
        }
        resultArray.push(row);
      }
      this.slotHaveBarArray = resultArray;
    },
    working: function(){
      let workingHours = [];
      for(let x = 0; x < this.activitiesData.length; x++){
        let periods = this.activitiesData[x].periods;
        let keys = [];
        let values = [];
        let row = [];
        let currentProp = 0;
        for(let y = 0; y < periods.length; y++){
          let periodWorking = periods[y];
          for(var periodKey in periodWorking){
            let workingArray = periodWorking[periodKey].working;
            let num1 = workingArray[0].split(":");
            let num2 = workingArray[1].split(":");
            let result;
            if (num1[0] == num2[0] && num1[1] != num2[1]){
              result = num2[1] - num1[1];
            }else if(num1[0] < num2[0] && num1[1] == num2[1]){
              result = (num2[0] * 60) - (num1[0] * 60);
            }else {
              result = (num2[0] * 60) - (num1[0] * 60) - num1[1] + (2 * num2[1]) - num2[1];
            }
            keys.push(periodKey);
            values.push((result / 60) * 100);
            
          }
        }
        for(let z = 0; z < 24; z++){
          if(keys[currentProp] == z){
            row.push(values[currentProp]);
            currentProp++;
          }else{
            row.push(0);
          }
        }
        workingHours.push(row);
      }
      this.workingHoursArray = workingHours;
    },
    focus: function(){
      let focusHours = [];
      for(let x = 0; x < this.activitiesData.length; x++){
        let periods = this.activitiesData[x].periods;
        let keys = [];
        let values = [];
        let row = [];
        let currentProp = 0;
        for(let y = 0; y < periods.length; y++){
          let periodWorking = periods[y];
          for(var periodKey in periodWorking){
            let workingArray = periodWorking[periodKey].focus;
            let num1 = workingArray[0].split(":");
            let num2 = workingArray[1].split(":");
            let result;
            if (num1[0] == num2[0] && num1[1] != num2[1]){
              result = num2[1] - num1[1];
            }else if(num1[0] < num2[0] && num1[1] == num2[1]){
              result = (num2[0] * 60) - (num1[0] * 60);
            }else {
              result = (num2[0] * 60) - (num1[0] * 60) - num1[1] + (2 * num2[1]) - num2[1];
            }
            keys.push(periodKey);
            values.push((result / 60) * 100);
            
          }
        }
        for(let z = 0; z < 24; z++){
          if(keys[currentProp] == z){
            row.push(values[currentProp]);
            currentProp++;
          }else{
            row.push(0);
          }
        }
        focusHours.push(row);
      }
      this.focusHoursArray = focusHours;
      // let focusHours = [];
      // let periods;
      // for(let x = 0; x < this.activitiesData.length; x++){
      //   periods = this.activitiesData[x].periods;
      //   for(let y = 0; y < periods.length; y++){
      //     let periodFocus = periods[y];
      //     for(var periodKey in periodFocus){
      //       let workingArray = periodFocus[periodKey].focus;
      //       let num1 = workingArray[0].split(":");
      //       let num2 = workingArray[1].split(":");
      //       let result;
      //       result = (num2[0] * 60) - (num1[0] * 60) - num1[1] + (2 * num2[1]) - num2[1];
      //       focusHours.push((result / 60) * 100);
      //     }
      //   }
      // }
      // this.focusHoursArray = focusHours;
    },
    focusLeftMargin: function(){
      let focusHours = [];
      for(let x = 0; x < this.activitiesData.length; x++){
        let periods = this.activitiesData[x].periods;
        let keys = [];
        let values = [];
        let row = [];
        let currentProp = 0;
        for(let y = 0; y < periods.length; y++){
          let periodWorking = periods[y];
          for(var periodKey in periodWorking){
            let workingArray = periodWorking[periodKey].focus;
            let num1 = workingArray[0].split(":");
            let result;
            if(num1[1] == 0){
              result = 0;
            }else if(num1[1] == 15){
              result = 25;
            }else if(num1[1] == 30){
              result = 50;
            }else if(num1[1] == 45){
              result = 75;
            }
            keys.push(periodKey);
            values.push(result);
            
          }
        }
        for(let z = 0; z < 24; z++){
          if(keys[currentProp] == z){
            row.push(values[currentProp]);
            currentProp++;
          }else{
            row.push(0);
          }
        }
        focusHours.push(row);
      }
      this.focusHoursMarginArray = focusHours;
      // let focusHours = [];
      // let periods;
      // for(let x = 0; x < this.activitiesData.length; x++){
      //   periods = this.activitiesData[x].periods;
      //   for(let y = 0; y < periods.length; y++){
      //     let periodFocus = periods[y];
      //     for(var periodKey in periodFocus){
      //       let workingArray = periodFocus[periodKey].focus;
      //       let num1 = workingArray[0].split(":");
      //       let num2 = workingArray[1].split(":");
      //       let result;
      //       result = (num2[0] * 60) - (num1[0] * 60) - num1[1] + (2 * num2[1]) - num2[1];
      //       focusHours.push((result / 60) * 100);
      //     }
      //   }
      // }
      // this.focusHoursArray = focusHours;
    },
    getAllNotes() {
      this.notesData = [];
      for (let x = 0; x < this.activitiesData.length; x++){
        if (this.activitiesData[x].has_notes){
          let userDivisonId = this.user.division.division_id;
          let activityId = this.activitiesData[x].activity_id;
          const endpoint = "http://" + this.envurl + "/api/v1/divisions/"+userDivisonId+"/activities/"+activityId+"/notes";
          const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Token "+this.user.access_token
          }
          axios
            .get(endpoint , {headers: headers})
            .then((res) => {
              let activityNotes = res.data.data.notes;
              for (let i = 0; i < activityNotes.length; i++){
                let obj = {
                  activity_id: activityNotes[i].activity_id,
                  activity_name: this.activitiesData[x].activity_name,
                  submitted_by:
                    activityNotes[i].submitter.first_name +
                    " " +
                    activityNotes[i].submitter.last_name,
                  note: activityNotes[i].note,
                  note_id: activityNotes[i].id,
                  date_submitted: moment(activityNotes[i].date).format("MM/D/YYYY"),
                };
                //console.log("the notes: ", activityNotes)
                this.notesData.push(obj);
              }
            })
            .catch((err) => {
              console.log(err)
            });
        }
      }
      console.log('notes: ', this.notesData);
    },
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


          const dateText = moment(resDate1).format("MMM DD YYYY");
          this.resDateText = dateText;
      }
    },

    calenderBoxShow() {
      if ($(".calender-Box").css("display") === "block") {
        $(".calender-Box").css("display", "none");
      } else {
        $(".calender-Box").css("display", "block");
      }
    },

    allActivities() {
      let userID = this.user.user_id

      const endpoint = 'http://' + this.envurl + '/api/v1/users/'+userID+'/activities?format=daily&date=today'
      
      //const endpoint = "http://devapi.kunin.io:25000/api/v1/divisions/"+division+"/departments/"+department+"/activities"

      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Token "+this.user.access_token
      }

      //const endpoint = "http://www.amock.io/api/kunin-io/v0/users/7b270cba-c161-11ea-b3de-0242ac130004/activities/f32a41f8-c145-11ea-b3de-0242ac130004?format=hourly&date=today"

      axios
      .get(endpoint, {headers: headers} )
      .then((res) => {                  
        this.activitiesData = res.data.data.activities;
        //console.log("badawy",this.activitiesData);
        this.getAllNotes();
        this.working();
        this.focus();
        this.haveBar();
        this.focusLeftMargin();
      })
      .catch((err) => {
        console.log("error", err);
      });
    },
  },

};
</script>
<style lang="css" scoped>
#cerdit-card .multiple-select{
  margin-top: 30px !important;
}
.calender-Box {
  top: 63%;
  left: 90%;
  min-width: 510px !important ;
}
#manager .table-performance-overview,

.employeecontent #cerdit-card .table-performance-overview {
  width: 100%;
  margin-left: 20px;
  max-width: 80% !important;
}
.scroll-table {
  overflow: auto;
}

</style>