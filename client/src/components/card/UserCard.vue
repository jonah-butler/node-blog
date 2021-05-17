<template>
  <div class="container margin-auto">
    <div class="row">
      <div class="offset-small-3"></div>
      <div class="col-xsmall-12 col-small-6 justify-center">
        <div class="card">
          <div
          ref="description"
          class="description">
          <p ref="text"> &#128075; {{ userObj.description}}</p>
          </div>
          <img
          class="profile-pic"
          ref="profilePic"
          :src="require(`../../../public/assets/imgs/${localFilename}`)"
          alt="">
          <div
          class="card-header"
          ref="cardHeader">
            <div
            @click="expandCard()"
            class="expand-container">
              <i class="fas fa-plus"></i>
            </div>
          </div>
          <div class="card-body">
            <div class="row dir-col text-center header-container">
              <h3>{{userObj.name}}</h3>
              <h5>{{userObj.role}}</h5>
              <span>
                <i class="fas fa-map-marker-alt"></i>
                <h5>{{userObj.location}}</h5>
              </span>
            </div>
          </div>
          <div class="card-footer">
            <div class="row justify-center">
              <a target="blank" href="https://github.com/jonah-butler">
                <i class="fab fa-github"></i>
              </a>
              <a target="blank" href="https://www.linkedin.com/in/jonah-butler-42202aa5/">
                <i class="fab fa-linkedin"></i>
              </a>
              <a target="blank" href="https://codepen.io/jonahbutler">
                <i class="fab fa-codepen"></i>
              </a>
              <a target="blank" href="https://www.youtube.com/channel/UCMpUwLVmbqowotfD6OpyHSA">
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="offset-small-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    localFilename: String,
    userObj: Object,
  },
  data() {
    return {
      expanded: false,
    };
  },
  methods: {
    expandCard() {
      this.$refs.profilePic.classList.toggle('expand');
      this.$refs.cardHeader.classList.toggle('expand');
      this.$refs.description.classList.toggle('expand');
      this.$refs.text.classList.toggle('expand');
    },
  },
};
</script>

<style lang="css" scoped>
.card{
  box-shadow: 0px 6px 19px 1px rgb(0 0 0 / 40%);
  border-radius: 5px;
  width: 100%;
  min-width: 350px;
  max-width: 450px;
  position: relative;
  overflow: hidden;
}

.card-header{
  height: 100px;
  background: linear-gradient(to left, #ef7a87, #FA709A );
  border-radius: 5px 5px 0px 0px;
  position: absolute;
  width: 100%;
  transition: all .3s ease;
}

.card-header.expand{
  z-index: 2;
  height: 100%;
  opacity: 0.8;
}

.header-container{
  position: relative;
  top: 160px;
}

.header-container h3, .header-container h5, .header-container span{
  opacity: .8;
  display: inline-block;
  margin: 3px 2px;
}

.expand-container{
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: white;
  z-index: 2;
}

.fa-plus{
  transition: transform .3s cubic-bezier(0.79, -0.02, 0.51, 2.05);
}

.fa-plus:hover{
  cursor: pointer;
  transform: rotate(90deg);
  z-index: 999;
}

.card img {
  max-width: 40%;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0px 6px 19px 1px rgb(0 0 0 / 40%);
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.card-body{
  background: white;
  width: 100%;
  height: 320px;
  margin-top: 40px;
}

.card-footer{
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 55px;
  background-color: #f5f2eb;
}

.card-footer i{
  color: #bdb7ab;
  font-size: 26px;
  padding-top: 7px;
  margin: 0 5px;
  transition: transform .2s ease;
}

.card-footer i:hover{
  transform: translateY(-3px);
}

.profile-pic{
  transition: all .4s ease;
}

.profile-pic.expand{
  /* height: 100%; */
  max-width: 100%;
  border-radius: 0px;
  border: none;
  top: 50%;
}

.description{
  position: absolute;
  top: 53%;
  z-index: 3;
  text-align: center;
  transition: top 1s ease;
  visibility: hidden;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.description.expand{
  visibility: visible;
  top: 50%;
}

.description p.expand{
  opacity: 1;
}

.description p{
  transition: opacity .7s ease;
  font-size: 15px;
  color: rgba(0,0,0,0.9);
  font-weight: 600;
  padding: 5px 5px;
  opacity: 0;
}
</style>
