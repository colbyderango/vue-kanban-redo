<template>
    <div class="spacer">

        <h3 class="text-center"> Register</h3>
        <div class="container">
            <div class="row">
                <form @submit.prevent="registerUser" class="col s12">
                    <div class="row">
                        <div class="input-field col s6">
                            <input type="text" id="name" v-model="name" required>
                            <label for="name">Name</label>
                        </div>
                        <div class="input-field col s6">
                            <input type="email" id="email" v-model="email" required>
                            <label for="email">Email</label>
                        </div>
                        <div class="col s6">
                            <div class="col s11 input-field">
                                <input v-if="!showPass" type="password" id="password" v-model="password" required>
                                <input v-if="showPass" type="text" id="password" v-model="password" required>
                                <label for="password">Password</label>
                            </div>
                            <div class="col s1 input-field">

                            </div>
                        </div>
                        <div class="col s6">
                            <div class="col s11 input-field">
                                <input v-if="!showPass" type="password" id="confirmPassword" v-model="confirmPassword" required>
                                <input v-if="showPass" type="text" id="confirmPassword" v-model="confirmPassword" required>
                                <label for="confirmPassword">Repeat Password</label>
                            </div>
                        </div>
                        <div class="col s12 center">
                            <button type="submit" class="waves-effect waves-light btn">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>

</template>


<script>
    import userboardService from '../services/userboard-service'


    export default {
        name: 'register',
        data() {
            return {
              
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                showPass: false

            }
        },
        methods: {
           
            registerUser: function () {
                if (this.password == this.confirmPassword) {
                    this.$root.$data.store.actions.register(this.email, this.name, this.password);
                    this.email = '';
                    this.password = '';
                    this.name = '';
                    this.confirmPassword = '';
                    this.$router.push({path: '/'})
                } else {
                    this.password = '';
                    this.confirmPassword = '';
                    Materialize.toast('Your passwords don\'t match.', 2000);
                }
            },
         

        },

    }

</script>


<styles>


</styles>