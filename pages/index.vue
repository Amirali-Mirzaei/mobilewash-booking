<template> 

    <img 
      :src="banner"
        class="banner">

       <h1>
         HOW IT WORKS? 
       </h1>  

        <div class="cards">

          <div class="cards-container">
            <div class="step-number">1</div>
             <div id="one"></div>
          </div>

            <Icon
              class="icons"
              name="lucide:arrow-right"
              size="40"
              />

          <div class="cards-container">
            <div class="step-number">2</div>
             <div id="two"></div>
          </div>

            <Icon
              class="icons"
              name="lucide:arrow-right"
              size="40"
              />

        <div class="cards-container">
            <div class="step-number">3</div>
             <div id="three"></div>
        </div>   
     </div>
    

     <section class="cta-section">
      <div class="cta-content">

       <h2>
         Ready to give your car a premium shine?
       </h2>

       <p>
        Book your mobile car wash today and enjoy a professional cleaning service at your doorstep.
       </p>

       <NuxtLink to="/reservation" class="cta-btn">
         Book Your Wash
          <Icon 
            name="lucide:arrow-right"
            size="22"
           />
       </NuxtLink>
    </div>
 </section>

</template>

<script setup>
import banner from '@/assets/images/Banner.png'
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables" as *;

.banner {
background-size: cover;
width: 100%;
height: auto;
margin-top: 6%;
border-bottom: 2px solid $primary;
}

h1 {
color: $primary;
text-align: center;
margin-top: 5%;
}

.cards {
display: flex;
align-items: center;
gap: 30px;
margin: 5% 0 0 19%;
width: 90%;
}

.cards-container {
position: relative;
height: 35vh;
width: 30vh;
min-width: 220px;
border: 3px solid $primary;
border-radius: 15%;
transition: all .35s;
display: flex;
align-items: center;
justify-content: center;

  &:hover {
    border-color: $primary-hover;
    transform: translateY(-5px);
  }
}

.step-number {
position: absolute;
top: -28px;
left: 50%;
transform: translateX(-50%);
width: 56px;
height: 56px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 50%;
background: $primary;
color: white;
font-size: 26px;
font-weight: bold;
}

.icons {
color: $primary;
}

#one,
#two,
#three {
width: 100%;
height: 100%;
background-repeat: no-repeat;
border-radius: inherit;
}

#one {
background-image: url("@/assets/images/First.png");
background-position: 50% 45%;
background-size: 200%;
}

#two {
background-image: url("@/assets/images/Second.png");
background-position: 50% 40%;
background-size: 150%;
}

#three {
background-image: url("@/assets/images/Third.png");
background-position: 50% 48%;
background-size: 190%;
}

.cta-section {
margin: 10% auto 5%;
width: 80%;
min-height: 280px;
border-radius: 30px;
background: linear-gradient(
    135deg,
    rgba($primary, .15),
    rgba(0,0,0,.9));
border: 2px solid $primary;
display: flex;
align-items: center;
justify-content: center;
text-align: center;
overflow: hidden;
position: relative;

&::before {
    content: "";
    position: absolute;
    width: 300px;
    height: 300px;
    background: $primary;
    filter: blur(120px);
    opacity: .25;
    top: -100px;
    right: -80px;
  }
}

.cta-content {
position: relative;
z-index: 2;
padding: 30px;

  h2 {
    color: white;
    font-size: 38px;
    margin-bottom: 20px;
  }

  p {
   color: #ddd;
   max-width: 650px;
   font-size: 18px;
   line-height: 1.6;
   margin: 0 auto 35px;
  }
}

.cta-btn {
background: $primary;
color: black;
border: none;
padding: 15px 35px;
border-radius: 50px;
font-size: 18px;
font-weight: 700;
cursor: pointer;
display: inline-flex;
align-items: center;
gap: 10px;
transition: .35s;
text-decoration: none;

&:hover {
   background: $primary-hover;
   transform: translateY(-5px);
  }
}

@media (max-width: 600px) {

  .banner {
    margin-top: 15%;
  }

  h1 {
    font-size: 28px;
    margin-top: 8%;
  }

  .cards {
    flex-direction: column;
    gap: 20px;
    margin: 10% auto;
    overflow-x: hidden;
  }

  .cards-container {
    width: 40vw;
    height: 30vh;
    min-width: unset;
    margin-top: 9%;
  }

   .step-number {
    width: 5vh;
    height: 5vh;
   }

  .icons {
    transform: rotate(90deg); 
    font-size: 35px;
  }

  .cta-section {
    width: 90%;
    min-height: 320px;
    margin-top: 15%;
  }

  .cta-content {

    h2 {
      font-size: 28px;
    }

    p {
      font-size: 15px;
    }
  }

  .cta-btn {
    padding: 13px 28px;
    font-size: 16px;
  }
    
  #one {
    background-size: 50vh;
    height: inherit;
  }

  #two {
    background-size: 40vh;
    height: inherit;
  }

  #three {
    background-size: 50vh;
    height: inherit;
  }
}
</style>