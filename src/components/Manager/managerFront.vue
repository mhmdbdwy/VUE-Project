<template>
  <div>
    <div id="manager" class="tab-pane fade in active">
      <div class="introDiv">
        <div class="container-fluid p-0">
          <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
              <h4>Hi {{user.first_name}}!</h4>
              <div class="dateSelect">
                <label class="w-100">Select Date Range:</label>

                <div class="calender-Div" @click="calenderBoxShow()">
                  <i class="fa fa-calendar" aria-hidden="true"></i>
                  <span class="managerchangeText">{{ resDateText }}</span>
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                </div>
                <div class="calender-Box">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div class="form-Div">
                          <label>From</label>
                          <div class="from-Calender">
                            <date-picker
                              v-model="time1"
                              valueType="format"
                              width="150px"
                            ></date-picker>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div class="to-Div">
                          <label>To</label>
                          <div class="from-Calender">
                            <date-picker
                              v-model="time2"
                              valueType="format"
                              @change="
                                calenderBoxShow();
                                changeDateText(4);
                              "
                            ></date-picker>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-12">
                        <div
                          class="commonDiv"
                          @click="
                            calenderBoxShow();
                            changeDateText(1);
                          "
                        >
                          <p class="dayText">Today</p>
                        </div>
                        <div
                          class="commonDiv"
                          @click="
                            calenderBoxShow();
                            changeDateText(2);
                          "
                        >
                          <p class="weekText dayText">Week over Week</p>
                        </div>
                        <div
                          class="commonDiv"
                          @click="
                            calenderBoxShow();
                            changeDateText(3);
                          "
                        >
                          <p class="dayText">Month over Month</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- My Focus Area -->
            <div class="img-div">
              <div class="col-lg-8 col-md-8 col-sm-6 col-xs-12">
                <h4 >
                  My Focus Area's:
                  <span class="achieved-text">(Achieved Time)</span>
                </h4>
                <div class="progress-image-div">
                  <div class="row" style="font-size: 10px !important">
                        <div
                          class="col-md-3"
                          v-for="(data, i) in ChartData"
                          :key="i"
                          style="margin: 0 10px;"
                        >
                            <pie-chart
                              :data="[
                                [
                                  'target time ',
                                  getpercentage(data.target_time, data.achieved_time),
                                ],
                                [
                                  'achieved time',
                                  totalpercentage(
                                    data.target_time,
                                    data.achieved_time
                                  ),
                                ],
                              ]"
                              :donut="true"
                              :title="data.activity_name"
                              width="200px"
                              height="200px"
                              :colors="['#2a3a4b', '#01B1B1']"
                              :legend="false"
                            ></pie-chart>
                        </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- End of My Focus Area -->
          </div>
        </div>
      </div>

      <div class="without-change-date">
        <div class="activity-overview">
          <div class="container-fluid p-0">
            <div class="row">
              <div class="col-lg-12">
                <h4>Activity Overview</h4>
              </div>
            </div>
            <!-- Activity Table -->
            <div class="table-div-activity">
              <div class="row">
                <div class="col-lg-12">
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th class="text-center" @click="sortByActivity">
                            Assigned Activity
                            <i class="fa fa-angle-down" v-if="isSortByActivity" aria-hidden="true"></i>
                            <i class="fa fa-angle-up" v-else aria-hidden="true"></i>
                          </th>
                          <th
                            class="text-center"
                            style="width: 200px !important"
                          >
                            Trend
                          </th>
                          <th class="text-center">Average Hrs Per Employee</th>
                          <th class="text-center" @click="sortByEmployee">
                            Employees This Period
                            <i class="fa fa-angle-down" v-if="isSortByEmployee" aria-hidden="true"></i>
                            <i class="fa fa-angle-up" v-else aria-hidden="true"></i>
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
                          <th class="text-center" @click="sortByTotalFocus">
                            High Focus (Time of Day)
                            <i class="fa fa-angle-down" v-if="isSortByAchievedTime" aria-hidden="true"></i>
                            <i class="fa fa-angle-up" v-else aria-hidden="true"></i>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr v-for="(act, k) in ActivityData" :key="k">
                          {{
                            removearray()
                          }}
                          <td class="text-center">
                            <a
                              href="javascript:void(0)"
                              @click="allEmployee()"
                              >{{ act.activity_name }}</a
                            >
                          </td>
                          <td
                            class="text-center"
                            style="width: 200px !important"
                          >
                            <trend
                              :data="toconvertArray(act.trend)"
                              :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                              :padding="8"
                              :radius="18"
                              :stroke-width="8"
                              auto-draw
                              smooth
                            >
                            </trend>
                          </td>
                          <td class="text-center">
                            {{ act.average_employee_hours }} h
                          </td>
                          <td class="text-center">{{ act.total_employes }}</td>
                          <td class="text-center">{{ act.assigned_time }} h</td>
                          <td class="text-center">
                            {{ act.assigned_percentage }}%
                          </td>
                          <td
                            style="text-align: left"
                            :class="{
                              'achrived-target':
                                act.assigned_time == act.achieved_time,
                              'below-target':
                                act.assigned_time > act.achieved_time,
                              'exceed-target':
                                act.assigned_time < act.achieved_time,
                            }"
                          >
                            {{ act.achieved_time }} h
                          </td>
                          <td
                            style="text-align: left"
                            :class="{
                              'achrived-target':
                                act.assigned_time == act.achieved_time,
                              'below-target':
                                act.assigned_time > act.achieved_time,
                              'exceed-target':
                                act.assigned_time < act.achieved_time,
                            }"
                          >
                            {{ act.achieved_percentage }} %
                          </td>
                          <td class="text-center">
                            {{ highfocustime(act.flow) }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <!-- End of Activity Table -->

            <!-- Performance Activity Table -->
            <div class="performance-overview">
              <div class="row">
                <div class="col-lg-12">
                  <h4>Performance Overview</h4>
                </div>
              </div>
              <div class="table-performance-overview">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="table-responsive">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th class="text-center">
                              <select @change="onPerformerChange($event)"
                                class="form-control infoselect select-form no-shadow">
                                <option value="Top Performing">Top Performing</option>
                                <option value="Least Performing">Least Performing</option>
                              </select>
                            </th>
                            <th class="text-center">Collective Focus Time</th>
                            <th class="text-center">High Focus (Duration)</th>
                            <th class="text-center">
                              High Focus (Time of Day)
                            </th>
                          </tr>
                        </thead>
                        <tbody v-if="performerData !== null">
                          <tr v-for="(performer, i) in performerData.employees" :key="i">
                            <td class="text-center">{{performer.first_name + " " + performer.last_name}} </td>
                            <td class="text-center">{{performer.total_focus}}</td>
                            <td class="text-center">{{getHighFocus(performer.flow[0], performer.flow[1])}}</td>
                            <td class="text-center">{{performer.flow[0]}} - {{performer.flow[1]}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- End of Performance Activity Table -->
          </div>
        </div>
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
import Swal from 'sweetalert2'
import { getSession } from '../../assets/js/util.js'
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'

export default {
    components: { 
        DatePicker
    },
  name: "managerhome",
  data() {
    return {
      envurl: process.env.VUE_APP_KUNIN_API_URL,
        chartOptions: {
            chart: {
              type: 'donut',
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
        },
        name: "Sharif khan",
        series: [],
        ActivityData: [],
        time1: null,
        time2: null,
        ChartData: [],
        resDateText: null,
        performerData: null,
        performerList: null,
        myFocusArea: null,
        sortPerformerBy: 'desc', 
        user: JSON.parse(getSession('user')),
        isSortByActivity: false,
        isSortByEmployee: false,
        isSortByAssignedTime: false,
        isSortByAchievedTime: false,
        isSortByTotalFocus: false,
    };
  },

  computed: {
    sortPerformer() {
      alert(this.sortPerformerBy);
      return "hello";
    }
  },

  mounted() {
    let todayDate = new Date();
    let month = todayDate.toUTCString("default", { month: "short" });
    
    let date = month;
    let dateText = "Today" + ", " + moment(date).format('MMM-DD-YYYY');

    if (localStorage.getItem("dateText")) {
      const tempText = localStorage.getItem("dateText");
      this.resDateText = tempText;
    } else {
      localStorage.setItem("dateText", dateText);
      const tempText = localStorage.getItem("dateText");
      this.resDateText = tempText;
    }
    console.log(this.user);
    const endpoint = "http://" + this.envurl + "/api/v1/divisions/" + this.user.division.division_id + "/departments/all/activities/all/myfocus?date=today";
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
          let cdata = res.data.data.my_focus[0];
          let graphics = [];
          // let x = cdata.achieved_time - 1 + 1;
          // let y = cdata.target_time - cdata.achieved_time;
          // this.series.push(x);
          // this.series.push(y);
          
          
        });

  },

  methods: {
    sortByActivity: function() {
      if (this.isSortByActivity){
        this.isSortByActivity = false; 
        this.ActivityData.sort((a, b) => (a.activity_name > b.activity_name) ? -1 : 1);
      }else{
        this.ActivityData.sort((a, b) => (a.activity_name > b.activity_name) ? 1 : -1);
        this.isSortByActivity = true;
        this.isSortByAssignedTime = false;
        this.isSortByTotalFocus = false;
        this.isSortByEmployee = false;
      }
      return this.ActivityData;
    },
    sortByEmployee: function() {
      if (this.isSortByEmployee){
        this.isSortByEmployee = false; 
        this.ActivityData.sort((a, b) => (a.total_employes > b.total_employes) ? -1 : 1);
      }else{
        this.ActivityData.sort((a, b) => (a.total_employes > b.total_employes) ? 1 : -1);
        this.isSortByEmployee = true;
        this.isSortByAssignedTime = false;
        this.isSortByAchievedTime = false;
        this.isSortByTotalFocus = false;
        this.isSortByActivity = false;
      }
      return this.ActivityData;
    },
    sortByAssignedTime: function() {
      if (this.isSortByAssignedTime){
        this.isSortByAssignedTime = false; 
        this.ActivityData.sort((a, b) => (a.assigned_time > b.assigned_time) ? -1 : 1);
      }else{
        this.ActivityData.sort((a, b) => (a.assigned_time > b.assigned_time) ? 1 : -1);
        this.isSortByAssignedTime = true;
        this.isSortByEmployee = false;
        this.isSortByAchievedTime = false;
        this.isSortByTotalFocus = false;
        this.isSortByActivity = false;
      }
      return this.ActivityData;
    },
    sortByAchievedTime: function() {
      if (this.isSortByAchievedTime){
        this.isSortByAchievedTime = false; 
        this.ActivityData.sort((a, b) => (a.achieved_time > b.achieved_time) ? -1 : 1);
      }else{
        this.ActivityData.sort((a, b) => (a.achieved_time > b.achieved_time) ? 1 : -1);
        this.isSortByAchievedTime = true;
        this.isSortByEmployee = false;
        this.isSortByAssignedTime = false;
        this.isSortByTotalFocus = false;
        this.isSortByActivity = false;
      }
      return this.ActivityData;
    },
    sortByTotalFocus: function() {
      if (this.isSortByTotalFocus){
        this.isSortByTotalFocus = false; 
        this.ActivityData.sort((a, b) => (a.flow[0] > b.flow[0]) ? -1 : 1);
      }else{
        this.ActivityData.sort((a, b) => (a.flow[0] > b.flow[0]) ? 1 : -1);
        this.isSortByTotalFocus = true;
        this.isSortByEmployee = false;
        this.isSortByAssignedTime = false;
        this.isSortByAchievedTime = false;
        this.isSortByActivity = false;
      }
      return this.ActivityData;
    },
    changeDateText(d) {
      if (d == 1) {
        let todayDate = new Date();
        let month = todayDate.toUTCString("default", { month: "short" });
        let date = month;
        const dateText = "Today" + ", " + moment(date).format('MMM-DD-YYYY');
        this.resDateText = dateText;
      } else if (d == 2) {
        const dateText = "Week over Week";
        this.resDateText = dateText;
      } else if (d == 3) {
        const dateText = "Month over Month";
        this.resDateText = dateText;
      } else {
	  //fixed it here with a different solution, used the function .toUTCString for the day on date 1 and 2, with adding moment fn too
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

    getpercentage(target_time, achieved_time) {
      let totalpercent = ((target_time - achieved_time) / target_time) * 100;
      return totalpercent.toFixed(2);
    },

    totalpercentage(target_time, achieved_time) {
      var totalinf = (achieved_time / target_time) * 100;
        console.log(totalinf);
      return totalinf.toFixed(2);
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

    tryFun() {
      alert("Fun with Gun");
    },

    getFunctions() {
      if ($(".calender-Box").css("display") === "block") {
        $(".calender-Box").css("display", "none");
      } else {
        $(".calender-Box").css("display", "block");
      }
    },

    getValue() {
      this.$router.push("/weaklydetails");
    },

    

    todayDate() {
      this.$router.push("/mCreditCard");
    },

    allEmployee() {
      this.$router.push("/MAllEmployee");
    },

    getActivitiesdata() {
      const endpoint = "http://" + this.envurl + "/api/v1/divisions/" + this.user.division.division_id + "/departments/all/activities/all/myfocus";
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
          let Collections = res.data.data.activities;
          
          console.log("api response: ", res);
          this.ActivityData = Collections;
        
        })
        .catch((error) => {
          console.log(error);
        });
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

    onPerformerChange(event) {
      if(event.target.value.toLowerCase() === 'top performing') { 
        this.sortPerformerBy = 'desc'; 
      } else {
        this.sortPerformerBy = 'asc'; 
      }
      this.getPerformerList();
    },

    getPerformerList(){
      let division = this.user.division.division_id
      let department = this.user.department.department_id

      const endpoint = 'http://' + this.envurl + '/api/v1/divisions/'+division+'/departments/'+department+'/leaderboard?by=focus&count=3&sort='+this.sortPerformerBy

      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Token "+this.user.access_token
      }

      axios.get(endpoint, {headers: headers}).then((res)=>{        
        this.performerData = res.data.data;
             
      }).catch((err)=>{
        console.log(err.response);
        Swal.fire({title: err.response.data.message, icon: 'error'});
      })
    },

    getHighFocus(t1, t2){
      let a1 = t1.split(":");
      let a2 = t2.split(":");
      let minutes1 = parseInt(a1) * 60 + parseInt(a2);
      let minutes2 = parseInt(a2) * 60 + parseInt(a2);

      let delta = 0;
      if(minutes1 > minutes2) {
        delta = minutes1 - minutes2;
      }else {
        delta = minutes2 - minutes1;
      }

      if(delta === 0) {
        return '0 hr : 0 min';
      } else if (delta > 60) {
        let deltaHr = delta/60;
        let deltaMin = delta%60;        
        return deltaHr + ":" + deltaMin +" hrs";
      }else{
        return "0 hr : "+delta +" Mins";
      }
    },

    getMyFocusArea() {

      let division = this.user.division.division_id
      let department = this.user.department.department_id

      const endpoint = 'http://' + this.envurl + '/api/v1/divisions/'+division+'/departments/'+department+'/myfocus'

      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Token "+this.user.access_token
      }

      axios.get(endpoint, {headers: headers}).then((res)=>{                
        this.ChartData = res.data.data.my_focus;
        console.log("focus data: ", res)
         
      }).catch((err)=>{
        console.log(err.response);
        Swal.fire({title: err.response.data.message, icon: 'error'});
      })
    }
  },

  created() {
    loadProgressBar()
    this.getActivitiesdata();

    this.getPerformerList();
    this.getMyFocusArea();

  },

};
</script>
<style lang="css" scoped>
#manager .calender-Box {
  min-width: 545px !important;
}
.activity-overview .table-div-activity{
  margin-top: 20px !important;
}
.infoselect {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  background-color: #feb4b4;
  /* padding: 20px; */
  border: none;
}
.performance-overview{
  margin-top: 60px;
}
.performance-overview .table-performance-overview{
 margin-top: 20px !important;
}
.table-div-activity {
  overflow: auto;
}
</style>