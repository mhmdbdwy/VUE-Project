
// export default {
//     name: 'BarChart',
//     extends: Bar,
//     props:['data','options'],
//     computed: {
//         newData: function() {
//             return this.data;
//         }
//     },
//     methods: {
//         reloadData: function() {
//             this.renderChart({
//                 labels: [0, 1, 2, 3, 4, 5, 6, 7],
//                 datasets: [
//                     {
//                         label: 'Commits on GitHub',
//                         backgroundColor: '#01B1B1',
//                         data: this.newData
//                     }
//                 ]
//             }, {responsive: true, maintainAspectRatio: false})
//             console.log(this.newData);
//         }
//     },
//     mounted() {
//         this.reloadData();
//     }
// }