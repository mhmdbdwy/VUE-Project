<template>
    <div>
        <td class="text-center" 
        v-for="(period, x) in single_data.periods"
        :key="x"
        >
            <div v-if="period">
                <div
                    class="focusBar"
                    :style="{
                    width: Setdesign(period, 'focus'),
                    marginLeft: mrgin,
                    }"
                ></div>
                <div
                    class="workingColor"
                    :style="{
                    width: Setdesign(period, 'working'),
                    marginLeft: mrgin,
                    }"
                ></div>
            </div>
        </td>
    </div>
</template>

<script>
export default {
    methods: {
        Setdesign(design, type) {
            var getObject;
            for (var key in design){
                getObject = design[key];
            }
            if (getObject == "" || getObject == null) {
                return 0 + "%";
            } else {
                let compare;
                let x;
                let y;
                if(type == "focus"){
                var xNum = getObject.focus[0].split(":");
                var yNum = getObject.focus[1].split(":");
                var xNumMin = xNum[0] * 60 + xNum[1];
                var yNumMin = yNum[0] * 60 + yNum[1];
                x = xNumMin + 1;
                y = yNumMin;
                }else{
                var xNum = getObject.working[0].split(":");
                var yNum = getObject.working[1].split(":");
                var xNumMin = xNum[0] * 60 + xNum[1];
                var yNumMin = yNum[0] * 60 + yNum[1];
                x = xNumMin;
                y = yNumMin;
                }
                //  console.log('this is x',x);
                compare = ((y - x) / 3600) * 100;
                if (x > 1) {
                // console.log(setmrgin);
                //   this.mrgin=setmrgin;
                } else {
                //       this.mrgin=x;
                }
                //  return compare+'%';
                return compare.toFixed(1) + "%";
            }
        },
    }
}
</script>