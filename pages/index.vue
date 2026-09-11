<template> 

    <img 
      :src="banner"
        class="banner">

         <div class="offer-card">
           <span class="offer-badge">SPECIAL OFFER</span>
            <h2>SAVE $5 BY BOOKING THROUGH THE WEBSITE</h2>

           <div class="offer-price">
             <span class="old-price">$45</span>
              <span class="new-price">$40</span>
           </div>

            <p>
              Professional cleaning at your location. 
              Fast, convenient, and eco-friendly.
            </p>

          <NuxtLink to="/reservation" class="offer-btn">
            Book Now
          <Icon
            name="lucide:arrow-right"
            size="20"/>
          </NuxtLink>
         </div>

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
        Book your mobile car wash today and 
        enjoy a professional cleaning service at your doorstep.
       </p>
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
}

h1 {
color: $primary;
text-align: center;
margin-top: 8%;
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
background: linear-gradient(to right, $primary, $primary-deep);
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
   color: white;
   max-width: 690px;
   font-size: 18px;
   line-height: 1.6;
   margin: 30px auto 35px;
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

.offer-card {
width: min(900px, 90%);
margin: 9% auto 5%;
padding: 40px 30px;
text-align: center;
border-radius: 28px;
position: relative;
overflow: hidden;
border: 2px solid rgba($primary, .8);
background: linear-gradient(
  135deg,
  rgba($primary, .18),
  rgba(0, 0, 0, .95)
);
box-shadow:
  0 0 40px rgba($primary, .18),
  inset 0 0 20px rgba(255,255,255,.04);

  &::before {
    content: "";
    position: absolute;
    width: 280px;
    height: 280px;
    right: -100px;
    top: -120px;
    background: $primary;
    filter: blur(120px);
    opacity: .22;
  }
}

.offer-badge {
display: inline-block;
padding: 8px 18px;
border-radius: 999px;
background: linear-gradient(to right, $primary, $primary-deep);
color: black;
font-size: .90rem;
font-weight: 800;
letter-spacing: 1px;
}

.offer-card h2 {
color: white;
font-size: 2.2rem;
margin: 25px 0;
}

.offer-price {
display: flex;
justify-content: center;
align-items: center;
gap: 18px;
margin-bottom: 25px;
}

.old-price {
color: #9b9b9b;
font-size: 2rem;
text-decoration: line-through;
}

.new-price {
color: $primary;
font-size: 3.6rem;
font-weight: 800;
text-shadow: 0 0 18px rgba($primary,.45);
}

.offer-card p {
max-width: 690px;
margin: auto;
color: white;
font-size: 18px;
line-height: 1.7;
}

.offer-btn {
margin-top: 35px;
display: inline-flex;
align-items: center;
gap: 10px;
padding: 15px 34px;
border-radius: 50px;
background: $primary;
color: black;
font-weight: 700;
text-decoration: none;
transition: .35s;

  &:hover {
    background: $primary-hover;
    transform: translateY(-4px);
  }
}

@media (max-width: 600px) {

  .banner {
    margin-top: 15%;
  }

  h1 {
    font-size: 25px;
    margin-top: 15%;
  }
  
  .cards {
    flex-direction: column;
    gap: 20px;
    margin: 10% auto;
    overflow-x: hidden;
  }

  .cards-container {
    width: 25vh;
    height: 25vh;
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
    background-size: 48vh;
    height: inherit;
  }

  #two {
    background-size: 33vh;
    height: inherit;
  }

  #three {
    background-size: 40vh;
    height: inherit;
  }

  .offer-card {
    margin-top: 18%;
    padding: 30px 20px;
  }

  .offer-card h2 {
    font-size: 1.6rem;
  }

  .old-price {
    font-size: 1.5rem;
  }

  .new-price {
    font-size: 2.8rem;
  }

  .offer-card p {
    font-size: 15px;
  }
}
</style>