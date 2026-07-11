<template>
  <footer class="footer">
    <div class="footer-content">

      <div class="brand">
        <h2>
          AR Mobilewash
        </h2>

        <p>
          Premium mobile car washing service.<br>
          We bring the wash to your doorstep.
        </p>
      </div>


      <div class="links">
        <h3>Quick Links</h3>
         <NuxtLink to="/">Home</NuxtLink><br><br>
          <NuxtLink to="/reservation">Contact</NuxtLink><br><br>
           <NuxtLink to="/contact">Booking</NuxtLink>
      </div>


      <div class="contact">
        <h3>Contact</h3>
        <p>
          <Icon name="lucide:phone" size="18"/> 222-581-6644
        </p>
        
        <p>      
          <Icon name="lucide:map-pin" size="18"/> Available Across Greater Vancouver
        </p>

        <p>      
          <Icon name="lucide:mail" size="18"/> armobilewash2026@gmail.com
        </p>
      </div>
    </div>


   <div class="bottom">
     <p>
      © 2026 AR Mobilewash │ All rights reserved
     </p>

     <p>
        Developed by 
      <a href="https://github.com/Amirali-Mirzaei" target="_blank">
        Amirali Mirzaei
      </a>
     </p>
</div>
  </footer>
</template>


<script setup>
</script>


<style lang="scss" scoped>

@use "@/assets/styles/variables" as *;

.footer {
width: 100%;
padding: 60px 8% 20px;
background: $primary;
color: white;
overflow: hidden;
}

.footer-content {
display: grid;
grid-template-columns: 2fr 1fr 1fr;
gap: 50px;
}

.brand {

  h2 {
    font-size: 32px;
    font-weight: 800;
    color: $text-dark;
  }

  p {
    margin-top: 15px;
    color: $secondry;
    max-width: 350px;
    line-height: 1.7;
    font-weight: 700;
    color: $text-dark;
  }
}

.links,
.contact {
  display: block;
  flex-direction: column;
  gap: 12px;

  h3 {
    margin-bottom: 15px;
    color: $text-dark;
  }

  a,
  p {
    color: $text-dark;
    text-decoration: none;
    transition: .3s;
  }

  a:hover {
    color: $gray-100;
    transform: translateX(5px);
  }
}



.bottom {
margin-top: 50px;
padding-top: 20px;
border-top: 3px solid rgba(255,255,255,.15);
text-align: center;
color: $text-dark;
  
   a {
    color: $text-dark;
    text-decoration: none;
    transition: color .35s;
     &:hover {
       color: $gray-100;
     }
   }
   
}



@media(max-width:768px){

.footer-content {

grid-template-columns: 1fr;

}

}

</style>