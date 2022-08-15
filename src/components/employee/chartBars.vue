<script>
import { Bar } from 'vue-chartjs'

export default {
    name: 'BarChart',
    props: ["data", "options"],
    extends: Bar,
    mounted () {
        this.renderChart(this.data, this.options)
    },
    watch: {
        data: function() {
            //this.renderChart(this.data, this.options);
            this.renderChart(this.data, this.options);
        }
    }
}
</script>