<template>
  <div>
    <div id="manager">
      <div class="introDiv">
        <div class="container-fluid p-0">
          <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <h4>Hi Alex,</h4>
              <div class="dateSelect">
                <label class="w-100">Select Date Range:</label>
                <div class="calender-Div" @click="calenderBoxShow()">
                  <i class="fa fa-calendar" aria-hidden="true"></i>
                  <span class="managerchangeText">{{ resDateText }}</span>
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                </div>
                <div class="calender-Box calender-Box-modified">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-lg-6">
                        <label>From</label>
                        <div class="from-Calender">
                          <date-picker
                            v-model="time1"
                            valueType="format"
                          ></date-picker>
                        </div>
                      </div>
                      <div class="col-lg-6">
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

                          <!-- style="display: none;" -->
                          <!-- <input  id="date-input" type="date" name="to-date"> -->
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

            <div class="img-div">
              <div class="col-lg-8 col-md-8 col-sm-6 col-xs-12">
                <h4>
                  My Focus Area's:
                  <span class="achieved-text">(Achieved Time)</span>
                </h4>
                <div class="progress-image-div">
                  <div class="row" style="font-size: 10px !important">
                    <div
                      class="col-md-3"
                      v-for="(data, i) in ChartData"
                      :key="i"
                    >
                      <!-- {{data.target_time}},{{data.achieved_time}} -->
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

                  <span> </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="without-change-date">
        <div class="activity-overview">
          <div class="container-fluid p-0">
            <div class="row">
              <div
                class="col-lg-6"
                v-for="(items, i) in alldepartment"
                :key="i"
              >
                <div class="row">
                  <div class="col-lg-12">
                    <h4>{{ items.department_name }}</h4>
                  </div>
                </div>
                <div class="managerLabelText">
                  <div class="row m-t-10">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                      <label
                        >Manager: {{ items.manager.first_name }}
                        {{ items.manager.last_name }}</label
                      >
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right">
                      <label class="viewAllText" @click="gotoManager()"
                        >View All</label
                      >
                    </div>
                  </div>
                </div>
                <div class="table-div-activity table-div-credit-card">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="table-responsive">
                        <table class="table table-bordered">
                          <thead>
                            <tr>
                              <th class="text-center">Top Activities</th>
                              
                              <th class="text-center">
                                Average Hours Per Employees
                              </th>
                              <th class="text-center">Employees this Period</th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr
                              v-for="(act, index) in items.activities"
                              :key="index"
                            >
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
                              
                              <td class="text-center">
                                {{ act.average_employee_hours }} h
                              </td>
                              <td class="text-center">
                                {{ act.total_employes }}
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
  </div>
</template>
<script>
import axios from "axios";
import $ from "jquery";
import DatePicker from "vue2-datepicker";
import Chartkick from 'vue-chartkick';
import { getSession } from "../../assets/js/util.js";
import "vue2-datepicker/index.css";

export default {
  components: { DatePicker, Chartkick },
  name: "DivisionFirstpage",
  data() {
    return {
      envurl: process.env.VUE_APP_KUNIN_API_URL,
      divisions_data: [],
      alldepartment: [],
      credit_cards: [],
      loans_dept: [],
      time1: null,
      time2: null,
      mortgages: [],
      Delinquencies: [],
      ChartData: [],
      resDateText: null,
      user: JSON.parse(getSession('user')),
    };
  },

  mounted() {
    let todayDate = new Date();
    let month = todayDate.toLocaleString("default", { month: "short" });
    let day = todayDate.toLocaleString("default", { day: "2-digit" });
    let year = todayDate.toLocaleString("default", { year: "numeric" });
    let date = month + "-" + day + "-" + year;
    let dateText = "Today" + ", " + date;

    if (localStorage.getItem("dateText")) {
      const tempText = localStorage.getItem("dateText");
      this.resDateText = tempText;
    } else {
      localStorage.setItem("dateText", dateText);
      const tempText = localStorage.getItem("dateText");
      this.resDateText = tempText;
    }
  },

  methods: {
    changeDateText(d) {
      if (d == 1) {
        let todayDate = new Date();
        let month = todayDate.toLocaleString("default", { month: "short" });
        let day = todayDate.toLocaleString("default", { day: "2-digit" });
        let year = todayDate.toLocaleString("default", { year: "numeric" });
        let date = month + "-" + day + "-" + year;
        const dateText = "Today" + ", " + date;
        this.resDateText = dateText;
      } else if (d == 2) {
        const dateText = "Week over Week";
        this.resDateText = dateText;
      } else if (d == 3) {
        const dateText = "Month over Month";
        this.resDateText = dateText;
      } else {
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
    getpercentage(target_time, achieved_time) {
      let totalpercent = ((target_time - achieved_time) / target_time) * 100;
      return totalpercent.toFixed(2);
    },
    totalpercentage(target_time, achieved_time) {
      var totalinf = (achieved_time / target_time) * 100;

      return totalinf.toFixed(2);
    },
    
    removearray() {
      this.forLogArray = [];
    },
    calenderBoxShow() {
      if ($(".calender-Box").css("display") === "block") {
        $(".calender-Box").css("display", "none");
      } else {
        $(".calender-Box").css("display", "block");
      }
    },
    gotoManager() {
      this.$router.push("/mCreditCard");
    },
    allEmployee() {
      this.$router.push("/MAllEmployee");
    },
    getChartData() {
      const endpoint = "http://" + this.envurl + "/api/v1/divisions/" + this.user.division.division_id + "/myfocus";
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
          console.log(res);
          let cdata = res.data.data.my_focus;
          
          this.ChartData = cdata;
        });
    },
    dataforactive() {
      const endpoint = "http://" + this.envurl + "/api/v1/divisions/" + this.user.division.division_id + "/departments/all/activities";
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Token " + this.user.access_token
      };
      console.log("user: ", this.user)
      axios
        .get(
          endpoint,
          {headers: headers}
        )
        .then((res) => {
          this.divisions_data = res.data;
          console.log("all data: ",res)
          let rawdata = res.data.data.departments;
          
          this.alldepartment = rawdata;
          console.log("departments: ", rawdata);

          // console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.dataforactive();
    this.getChartData();
  },
};
</script>
<style lang="css" scoped>
.table-div-activity {
  overflow: auto;
}
</style>