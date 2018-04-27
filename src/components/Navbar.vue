<template>

 <nav>
    <div class="nav-wrapper blue">
      <div class="container">
        <router-link to="/" class="brand-logo">Employee Manager</router-link>
       
        <ul class="right">
          <li v-if ="isLoggedIn"><span class="email black-text hide-on-small-only">{{currentUser}}</span></li>
          <li v-if="isLoggedIn"><router-link to="/">Dashboard</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/register">Register</router-link></li>
          <li v-if="isLoggedIn"><button class="btn black btn-small" v-on:click="logout">Logout</button></li>    
          
        </ul>
      </div>
    </div>
  </nav>

  
  
</template>

<script>
//Side Navbar
        const sideNav = document.querySelector('.sidenav');
        M.Sidenav.init(sideNav, {});
  

</script>

<script>
import firebase from 'firebase'
export default {
  name : 'navbar',
  data() {
    return {
      isLoggedIn : false,
      currentUser : false
    }
  },
  created(){
    if(firebase.auth().currentUser){
      this.isLoggedIn = true
      this.currentUser = firebase.auth().currentUser.email
    }
  },
  methods : {
    logout : function(){
      firebase.auth().signOut().then(() => {
        this.$router.go({path : this.$router.path})
      })
    }
  }
}
</script>

<style scoped>
.email {padding-right : 10px}

/*NAVBAR CSS FOR MOBILE VIEW*/
@media(max-width: 980px){
.nav-wrapper{
  height: 80px; 
  
}
.brand-logo{
 padding-bottom: 5px
}
.right{
  margin: 20px;
  padding-top: 10px; 
  font-size: 15px
}
}

@media(max-width: 800px){
.nav-wrapper{
  height: 80px;
  
}
.brand-logo{
  font-size: 20px;
  padding-bottom: 5px
  
  
}
.right{
  margin: 20px;
  padding-top: 10px; 
  font-size: 15px
  
}

.btn{
  font-size: 10px;
}
}

@media(max-width: 350px){
  .brand-logo{
    font-size: 15px
  }
}
</style>

