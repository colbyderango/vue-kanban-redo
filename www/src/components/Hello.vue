<template>

  <div>
    <div>
      <h3>Your Boards</h3>

      <button v-if="!showBoardForm" @click="triggerBoardForm" class="waves-effect waves-light btn">Add Board</button>
      <div class="container" v-if="showBoardForm">
        <h5>Add a Board </h5>
        <form class="row" @submit.prevent="addBoard">
          <div class="col s12 input-field">
            <input type="text" id="boardName" v-model="boardName" required>
            <label for="boardName">Title</label>
          </div>
          <div class="col s12 input-field">
            <textarea class="materialize-textarea" id="boardDesc" cols="30" rows="10" v-model="boardDesc"></textarea>
            <label for="boardDesc">Description</label>
          </div>
          <button class="waves-effect waves-teal btn" type="submit">Add Board</button>
          <button @click="triggerBoardForm" class="waves-effect waves-teal btn-flat"><i class="fa fa-times"></i></button>
        </form>
      </div>

      <div class="row">
        <div v-for="userboard in userboards" class="col s12 m3">
          <div class="card hoverable orange">
            <router-link :to="'/boards/' + userboard._id" @click="getBoard(userboard._id)">
              <div class="card-content white-text">
                <span class="card-title">{{ userboard.name }}</span>
                <p>{{ userboard.description }}</p>
              </div>
            </router-link>
            <div class="card-action right-align">
              <a><i @click="deleteBoard(userboard)" class="fa fa-trash"></i></a>
            </div>
          </div>
        </div>
      </div>

   
    </div>
  </div>


</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        boardName: '',
        boardDesc: '',
        showBoardForm: false
      }
    },
    computed: {
      userboards() {
        return this.$root.$data.store.state.userBoards
      },
      sharedBoards() {
        return this.$root.$data.store.state.sharedBoards
      }
    },
    methods: {
      getBoard: function (boardId) {
        console.log(boardId)
      },
      deleteBoard: function (board) {
        this.$root.$data.store.actions.removeBoard(board)
      },
      addBoard: function () {
        this.$root.$data.store.actions.createBoard({
          name: this.boardName,
          description: this.boardDesc
        })
        this.showBoardForm = false
        this.boardName = ''
        this.boardDesc = ''
      },
      triggerBoardForm: function () {
        this.showBoardForm = !this.showBoardForm
      }
    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .parallax-container {
    height: 400px;
  }
  


  hr {
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>