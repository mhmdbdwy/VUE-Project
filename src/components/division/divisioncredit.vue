<template>
  <div>
    <div id="cerdit-card" class="">
      <div class="common-main-div">
        <label>Departments</label>
        <label class="w-100 cerdit-card-select"
          ><span>Credit Card</span>
          <span
            ><i
              @click="creditDropDown()"
              class="fa fa-caret-down"
              aria-hidden="true"
            ></i></span
        ></label>
        <div class="credit-card-drop-down">
          <!-- <ul>
                <li>Loan</li>
            </ul> -->
        </div>
        <div class="multiple-select">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <label class="w-100">Display:</label>
              <div class="icondiv">
                <select class="display-view-by" v-on:change="setActivity()">
                  <option>Activity</option>
                  <option>All Employee</option>

                  <!-- <option>All Employee</option> -->
                </select>

                <i class="fa fa-caret-down" aria-hidden="true"></i>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <label class="w-100">Select Date Range:</label>
              <div class="calender-Div" @click="calenderBoxShow()">
                <i class="fa fa-calendar" aria-hidden="true"></i>
                <span class="changeText">{{ resDateText }}</span>
                <i class="fa fa-caret-down" aria-hidden="true"></i>
              </div>
              <div class="calender-Box">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-lg-6">
                      <label>From</label>
                      <div class="from-Calender">
                        <!-- <i class="fa fa-calendar" aria-hidden="true"></i> -->
                        <!-- <span>06/10/20</span> -->
                        <date-picker
                          v-model="time1"
                          valueType="format"
                          ref="datePicker"
                          input-class="form-control"
                        ></date-picker>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <label>To</label>
                      <div class="from-Calender">
                        <!-- <i for="#date-input" class="fa fa-calendar" aria-hidden="true"></i> -->
                        <!-- <span>06/10/20</span> -->
                        <date-picker
                          v-model="time2"
                          valueType="format"
                          width="150px"
                          @change="
                            calenderBoxShow();
                            changeDateText(4);
                          "
                        ></date-picker>

                        <!-- <input style="display: none;" id="date-input" type="date" name="to-date"> -->
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

      <div class="activity-Table">
        <chart-file></chart-file>
        <div class="table-card-div divisionCredit">
          <div class="row">
            <div
              class="col-md-6"
              v-for="(data, i) in depart"
              :key="i"
              style="margin: 15px"
            >
              <h3>
                Manager: {{ data.manager.first_name }}
                {{ data.manager.last_name }}
              </h3>
            </div>

            <div class="col-lg-12">
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th class="text-center">
                        <span class="downArrow"
                          ><i
                            class="fa fa-caret-down"
                            aria-hidden="true"
                          ></i></span
                        >Activity
                        <i class="fa fa-angle-down" aria-hidden="true"></i>
                      </th>
                      <th class="text-center">Trend</th>
                      <th class="text-center">Average hrs per Employees</th>
                      <th class="text-center">Employees this Period</th>
                      <th class="text-center" colspan="2">Assigned Time</th>
                      <th class="text-center" colspan="2">Achieved Time</th>
                      <th class="text-center tooltipTdTwo">
                        High Focus (Time of Day)
                        <span
                          class="infoIcon"
                          @mouseleave="mouseLeaveSecond"
                          @mouseover="mouseOverSecond"
                        >
                          <i class="fa fa-info-circle"></i>
                        </span>
                        <span class="tooltipData"
                          >Descriptor of what the column. The description will
                          be available upon hover.</span
                        >
                      </th>
                      <th class="text-center">07:00</th>
                      <th class="text-center">08:00</th>
                      <th class="text-center">09:00</th>
                      <th class="text-center">10:00</th>
                      <th class="text-center">11:00</th>
                      <th class="text-center">12:00</th>
                      <th class="text-center">13:00</th>
                      <th class="text-center">14:00</th>
                      <th class="text-center">15:00</th>
                      <th class="text-center">16:00</th>
                      <th class="text-center">17:00</th>
                      <th class="text-center">18:00</th>
                      <th class="text-center">19:00</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- {{trandsData}} -->
                    <tr v-for="(item, i) in activitiesData" :key="i">
                      {{
                        removearray()
                      }}

                      <td class="text-center">
                        <div :class="{ triangle: item.notes == true }"></div>
                        {{ item.activity_name }}
                      </td>
                      <td class="text-center">
                        <trend
                          :data="toconvertArray(item.trend)"
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
                        {{ item.average_employee_hours }}
                      </td>
                      <td class="text-center">{{ item.total_employes }}</td>
                      <td style="text-align: left; width: 100px">
                        {{ item.assigned_time }} h
                      </td>
                      <td style="text-align: left; width: 100px">
                        {{ item.assigned_percentage }} %
                      </td>
                      <td
                        style="text-align: left; width: 100px"
                        :class="{
                          'achrived-target':
                            item.assigned_time == item.achieved_time,
                          'below-target':
                            item.assigned_time > item.achieved_time,
                          'exceed-target':
                            item.assigned_time < item.achieved_time,
                        }"
                      >
                        {{ item.achieved_time }} h
                      </td>
                      <td
                        style="text-align: left; width: 100px"
                        :class="{
                          'achrived-target':
                            item.assigned_time == item.achieved_time,
                          'below-target':
                            item.assigned_time > item.achieved_time,
                          'exceed-target':
                            item.assigned_time < item.achieved_time,
                        }"
                      >
                        {{ item.achieved_percentage }}%
                      </td>
                      <td class="text-center">
                        {{ highfocustime(item.flow) }}
                      </td>
                      <td class="text-center">
                        <div v-if="item.periods[7]">
                          <div
                            class="focusBar"
                            :style="{
                              width: Setdesign(item.periods[7].working),
                              marginLeft: mrgin,
                            }"
                          ></div>
                          <div
                            class="workingColor"
                            :style="{
                              width: Setdesign(item.periods[7].focus),
                              marginLeft: mrgin,
                            }"
                          ></div>
                        </div>
                      </td>
                      <td class="text-center">
                        <div v-if="item.periods[8]">
                          <div
                            class="focusBar"
                            :style="{
                              width: Setdesign(item.periods[8].working),
                              marginLeft: mrgin,
                            }"
                          ></div>
                          <div
                            class="workingColor"
                            :style="{
                              width: Setdesign(item.periods[8].focus),
                              marginLeft: mrgin,
                            }"
                          ></div>
                        </div>
                      </td>
                      <td class="text-center">
                        <div v-if="item.periods[9]">
                          <div
                            class="focusBar"
                            :style="{
                              width: Setdesign(item.periods[9].working),
                              marginLeft: mrgin,
                            }"
                          ></div>
                          <div
                            class="workingColor"
                            :style="{
                              width: Setdesign(item.periods[9].focus),
                              marginLeft: mrgin,
                            }"
                          ></div>
                        </div>
                      </td>
                      <td class="text-center">
                        <div v-if="item.periods[10]">
                          <div
                            class="focusBar"
                            :style="{
                              width: Setdesign(item.periods[10].working),
                              marginLeft: mrgin,
                            }"
                          ></div>
                          <div
                            class="workingColor"
                            :style="{
                              width: Setdesign(item.periods[10].focus),
                              marginLeft: mrgin,
                            }"
                          ></div>
                        </div>
                      </td>
                      <td class="text-center">
                        <div v-if="item.periods[11]">
                          <div
                            class="focusBar"
                            :style="{
                              width: Setdesign(item.periods[11].working),
                              marginLeft: mrgin,
                            }"
                          ></div>
                          <div
                            class="workingColor"
                            :style="{
                              width: Setdesign(item.periods[11].focus),
                              marginLeft: mrgin,
                            }"
                          ></div>
                        </div>
                      </td>
                      <td class="text-center">
                        <div v-if="item.periods[12]">
                          <div
                            class="focusBar"
                            :style="{
                              width: Setdesign(item.periods[12].working),
                              marginLeft: mrgin,
                            }"
                          ></div>
                          <div
                            class="workingColor"
                            :style="{
                              width: Setdesign(item.periods[12].focus),
                              marginLeft: mrgin,
                            }"
                          ></div>
                        </div>
                      </td>
                      <td class="text-center">
                        <div v-if="item.periods[13]">
                          <div
                            class="focusBar"
                            :style="{
                              width: Setdesign(item.periods[13].working),
                              marginLeft: mrgin,
                            }"
                          ></div>
                          <div
                            class="workingColor"
                            :style="{
                              width: Setdesign(item.periods[13].focus),
                              marginLeft: mrgin,
                            }"
                          ></div>
                        </div>
                      </td>
                      <td class="text-center">
                        <div v-if="item.periods[14]">
                          <div
                            class="focusBar"
                            :style="{
                              width: Setdesign(item.periods[14].working),
                              marginLeft: mrgin,
                            }"
                          ></div>
                          <div
                            class="workingColor"
                            :style="{
                              width: Setdesign(item.periods[14].focus),
                              marginLeft: mrgin,
                            }"
                          ></div>
                        </div>
                      </td>
                      <td class="text-center">
                        <div v-if="item.periods[15]">
                          <div
                            class="focusBar"
                            :style="{
                              width: Setdesign(item.periods[15].working),
                              marginLeft: mrgin,
                            }"
                          ></div>
                          <div
                            class="workingColor"
                            :style="{
                              width: Setdesign(item.periods[15].focus),
                              marginLeft: mrgin,
                            }"
                          ></div>
                        </div>
                      </td>
                      <td class="text-center">
                        <div v-if="item.periods[16]">
                          <div
                            class="focusBar"
                            :style="{
                              width: Setdesign(item.periods[16].working),
                              marginLeft: mrgin,
                            }"
                          ></div>
                          <div
                            class="workingColor"
                            :style="{
                              width: Setdesign(item.periods[16].focus),
                              marginLeft: mrgin,
                            }"
                          ></div>
                        </div>
                      </td>
                      <td class="text-center">
                        <div v-if="item.periods[17]">
                          <div
                            class="focusBar"
                            :style="{
                              width: Setdesign(item.periods[17].working),
                              marginLeft: mrgin,
                            }"
                          ></div>
                          <div
                            class="workingColor"
                            :style="{
                              width: Setdesign(item.periods[17].focus),
                              marginLeft: mrgin,
                            }"
                          ></div>
                        </div>
                      </td>
                      <td class="text-center">
                        <div v-if="item.periods[18]">
                          <div
                            class="focusBar"
                            :style="{
                              width: Setdesign(item.periods[18].working),
                              marginLeft: mrgin,
                            }"
                          ></div>
                          <div
                            class="workingColor"
                            :style="{
                              width: Setdesign(item.periods[18].focus),
                              marginLeft: mrgin,
                            }"
                          ></div>
                        </div>
                      </td>
                      <td class="text-center">
                        <div v-if="item.periods[19]">
                          <div
                            class="focusBar"
                            :style="{
                              width: Setdesign(item.periods[19].working),
                              marginLeft: mrgin,
                            }"
                          ></div>
                          <div
                            class="workingColor"
                            :style="{
                              width: Setdesign(item.periods[19].focus),
                              marginLeft: mrgin,
                            }"
                          ></div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <!-- <div class="footer"> -->
                  <tfoot>
                    <tr>
                      <td class="text-center" colspan="3">
                        Totals (Aggregate)
                      </td>
                      <td class="text-center text-center">227</td>
                      <td class="text-center text-center">652</td>
                      <td class="text-center"></td>
                      <td class="text-center">4,007 h</td>
                      <td class="text-center" colspan="15"></td>
                    </tr>
                  </tfoot>
                  <!-- </div> -->
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="container">
            {{activitiesData}}
            <hr/>
            {{depart}}
        </div> -->
  </div>
</template>
<script>
import $ from "jquery";
import axios from "axios";
import moment from "moment";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { getSession } from "../..//assets/js/util.js";

$(".credit-card-drop-down ul li").on("click", function () {
  var val = $(this).text();
  $(".cerdit-card-select span:nth-child(1)").text(val);
  $(".credit-card-drop-down").css("display", "none");
});
$(".credit-card-drop-down ul li").on("click", function () {
  var val = $(this).text();
  $(".cerdit-card-select span:nth-child(1)").text(val);
  $(".credit-card-drop-down").css("display", "none");
});

export default {
  components: { DatePicker },
  name: "divsioncredit",
  data() {
    return {
      envurl: process.env.VUE_APP_KUNIN_API_URL,
      CreditData: [],
      width: 10,
      depart: [],
      time1: null,
      time2: null,
      activitiesData: [],
      departmentinformation: [],
      trandsData: [],
      ChartData: [],
      graphfrom: [],
      resDateText: null,
      user: JSON.parse(getSession("user")),
    };
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
  },
  methods: {
    changeDateText(d) {
      console.log(d);
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
    mouseLeaveSecond() {
      $(".tooltipData").css("display", "none");
    },
    mouseOverSecond() {
      $(".tooltipData").css("display", "block");
    },
    creditDropDown() {
      if ($(".credit-card-drop-down").css("display") === "block") {
        $(".credit-card-drop-down").css("display", "none");
      } else {
        $(".credit-card-drop-down").css("display", "block");
      }
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

    parsJsonFunction(data) {
      //  var newdata= JSON.parse(data)
      // var datatoreturn={};
      // console.log(data)
      // data.forEach(el => {
      //     datatoreturn=el;
      // });

      var obj = data;
      // console.log(obj);
      var result2 = [];
      var result = Object.keys(obj).map((key) => [Number(key), obj[key]]);

      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {
          // for (var key in result[i]) {
          //alert(result[i]);
          result2 = result2.concat(result[j][1]);
        }
        return result2;
      }
      //  return "'"+result[0][0]+"' :"+result[0][1];
      // return result;
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
    getData() {
      const endpoint = "http://" + this.envurl + "/api/v1/divisions/" + this.user.division.division_id + "/departments/6aa1a220-c142-11ea-b3de-0242ac130004/activities";
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Token "+this.user.access_token
      };
      axios
        .get(
          endpoint,
          {headers: headers}
        )
        .then((res) => {
          this.CreditData = res.data.data;
          let alldata = res.data.data;
          let alldepartment = [];
          let actvnames = [];

          alldata.forEach((element) => {
            alldepartment = element.departments;
          });
          this.depart = alldepartment;
          alldepartment.forEach((data) => {
            this.activitiesData = data.activities;
            actvnames = data.activities;

            // console.log(data.activities);
          });
          actvnames.forEach((trend) => {
            this.trandsData = trend.trend;
          });
        })
        .catch((error) => {
          console.log(error);
        });
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
    convertToTime(inf) {
      let startTime = inf[0];
      let endtime = inf[1];
      let starthours;
      let endhours;
      let m = 0;
      starthours = moment.utc().hours(startTime).minutes(m).format("HH:mm");
      endhours = moment.utc().hours(endtime).minutes(m).format("HH:mm");

      return starthours + "-" + endhours;
      //   return moment.utc().startOf('day').add(minutes, 'minutes').format('hh:mm')
    },
    getDepartments() {
      console.log("department api");
      //   axios.get("http://devapi.kunin.io:45000/api/v1/v0/divisions/9da53e80-c141-11ea-b3de-0242ac130004/departments").then((res)=>{
      //       let dept=res.data.data;
      //       let closeData=[];
      //       dept.forEach(element => {
      //           if(element.division_name=="Credit and Lending"){
      //               closeData=element.departments;
      //           console.log(element.departments)
      //           }

      //       });
      //       this.departmentinformation=closeData;
      //       console.log(closeData);

      //   })
    },

    setActivity() {
      this.$router.push("/dallemployee");
    },
  },
  created() {
    this.getData();
    this.getDepartments();
  },
};
</script>
<style lang="css" scoped>
#cerdit-card .calender-Box {
  top: 63%;
  left: 90%;
  min-width: 515px;
}
.activity-Table {
  overflow: auto;
}
</style>