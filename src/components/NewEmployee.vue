<template>
    <div id="new-employee">
        <h3>New Employee</h3>
        <div class="row">
            <form @submit.prevent="saveEmployee" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="emp_id" required>
                        <label>Employee Id#</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                        <label>Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="dept" required>
                        <label>Department</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="position" required>
                        <label>Position</label>
                    </div>
                </div>
                <button type="submit" class="btn green darken-1">Submit</button>
                <router-link to="/" class="btn grey">Cancle</router-link>
            </form>
        </div>
    </div>
</template>

<script>
import db from './firebaseinit'
export default {
  name: 'new-employee',
  data(){
      return{
          emp_id : null,
          name : null,
          dept : null,
          positon : null
        
      }
  },
  methods: {
      saveEmployee(){
          db.collection('employees').add({
              emp_id : this.emp_id,
              name : this.name,
              dept : this.dept,
              position: this.position
          })
          .then(docRef => this.$router.push('/'))
          .catch(error => console.log(err))
      }
  }
}
</script>
