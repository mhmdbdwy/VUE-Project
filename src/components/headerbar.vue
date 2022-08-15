<template>
    <section id="main">
      <div class="container-fluid">
        <div class="row">
          <div class="maincontent col-lg-9">
            <div class="main_header">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-lg-8 col-md-8 col-sm-6 col-xs-12">
                    <p>{{title}}</p>
                  </div>
                  <div class="user-profile-name">
                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-4">
                      <p class="loginText">
                        <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                        {{username}} 
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>

export default {
   name:"HeaderBar",
   props:['title', 'username'],
   data() {
       return {           
           user: null
       }
   }, 
   methods: {
       
   },
   created() {
       
   }

}
</script>