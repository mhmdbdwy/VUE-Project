import Vue from 'vue'
import App from './App.vue'
import router from './router';
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import moment from 'moment'
Vue.use(moment);
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
Vue.use(Chartkick.use(Chart));
import Trend from "vuetrend"
 
Vue.use(Trend);
// import jQuery from "jquery-slim";
// import "bootstrap";
// import "./assets/app.scss";
// import jQuery from "jquery";
// window.$ = window.jQuery = jQuery;
// import "bootstrap";
// import { SparklinePlugin } from '@syncfusion/ej2-vue-charts';

// Vue.use(SparklinePlugin);

// import "./assets/app.scss";
import "./assets/custom.scss";
// import "bootstrap";
// import "popper.js";
import VPopover from 'vue-js-popover'
Vue.use(VPopover, { tooltip: true })

import "typeface-muli"
import Datepicker from 'vue2-datepicker';


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
