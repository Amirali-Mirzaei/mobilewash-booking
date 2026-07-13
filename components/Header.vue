<template>
  <header class="header">
    <div class="header-bg">
     </div>

      <div class="container">
       <div class="logo">
         <div class="logo-text">

          <h1>
           <span>AR</span> Mobilewash
          </h1>

          <p>
            <i>
            WE BRING THE SHINE TO YOU
           </i>
         </p>

        </div>

      </div>


      <nav class="nav">

        <NuxtLink to="/" :class="['nav-item', { active: isActive('/') }]">
          <Icon
            name="lucide:house"
            size="20"
          />
          <span>Home</span>
        </NuxtLink>

        <NuxtLink to="/contact" :class="['nav-item', { active: isActive('/contact') }]">
          <Icon
            name="lucide:phone"
            size="20"
          />
          <span>Contact</span>
        </NuxtLink>

      </nav>

      <div class="right-side">

        <NuxtLink to="/reservation" class="booking-btn">
          <Icon
            name="lucide:calendar-days"
            size="20"
          />
          <span>Quick Booking</span>
          <Icon
            name="lucide:arrow-right"
            size="20"
          />
          <div class="shine"></div>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()

const isActive = (path: string) => route.path === path
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables" as *;

*,
*::before,
*::after {
margin:0;
padding:0;
box-sizing:border-box;
}

.header {
position: fixed;
inset: 0 0 auto 0;
width: 100%;
height: 95px;
z-index: 9999;
overflow: hidden;
background: $secondry;
border-bottom: $primary;
}

.header-bg {
position: absolute;
inset:0;
overflow: hidden;
pointer-events: none;
}

.container {
position: relative;
z-index: 10;
max-width: 1450px;
height: 100%;
margin-left: 3%;
padding: 0 45px;
display: flex;
justify-content:space-between;
align-items: center;
}

p {
font-weight: 900;
}

.logo {
display: flex;
align-items: center;
gap: 18px;
text-decoration: none;
user-select: none;
}

.logo-text {
display:flex;
flex-direction:column;
}

.logo-text h1 {
font-size: 5vh;
line-height: 1;
font-weight: 800;
letter-spacing: .5px;
color:white;
}

.logo-text h1 span {
color: $primary;
}

.logo-text p {
margin-top: 6px;
color:#9f9f9f;
font-size: .72rem;
letter-spacing:4px;
}

.nav {
display: flex;
align-items: center;
gap: 18px;
}

.nav-item {
width: 105px;
height: 82px;
position: relative;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 5px;
text-decoration: none;
color: #b7b7b7;
transition: .35s;
}

.nav-item.active {
color: $primary;
}

.nav-item:hover {
color: white;
transform:translateY(-2px);
}

.right-side{
display:flex;
align-items:center;
gap:18px;
}

.booking-btn{
text-decoration: none;
position: relative;
overflow: hidden;
display: flex;
align-items: center;
gap: 12px;
height: 58px;
padding: 0 28px;
border: none;
border-radius: 999px;
color: $secondry;
font-weight:700;
letter-spacing:.5px;   
cursor:pointer;
background:
    linear-gradient(
        135deg,
        $primary-light 0%,
        $primary 35%,
        $primary 100%
    );
transition:.35s;
box-shadow:
0 12px 30px rgba(255,196,0,.35);
}

.booking-btn span {
white-space:nowrap;
}

.booking-btn:hover {
transform:
translateY(-3px)
scale(1.02);
box-shadow:
  0 0 25px rgba(255,208,0,.55),
    0 20px 60px rgba(255,208,0,.35);
}

.shine {
position:absolute;
top:0;
left:-80px;
width:55px;
height:100%;
transform:skewX(-25deg);
background:
 linear-gradient(
      to right,
      transparent,
      rgba(255,255,255,.75),
      transparent
  );
}

.booking-btn:hover .shine {
animation: shine 1.1s ease;
}

@keyframes shine {

    from {
        left:-70px;
    }

    to {
        left:130%;
    }

}

.booking-btn svg {
transition: .35s;
}

.booking-btn:hover svg:last-child {
transform:
translateX(6px);
}

.header::before { 
content: "";
position: absolute;
inset: 0;
border-bottom:
1px solid rgba(255,210,0,.15);
pointer-events:none;
}

.header::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -25px;
    transform: translateX(-50%);
    width: 500px;
    height: 80px;
    background:
    radial-gradient(
        ellipse,
        rgba(255,200,0,.22),
        transparent 70%
    );

    filter:blur(40px);
    pointer-events:none;
}

.header{
    animation:headerAppear .8s ease;
}

@keyframes headerAppear{
    from{
        opacity:0;
        transform:translateY(-35px);
    }
    to{
        opacity:1;
        transform:translateY(0);
    }

}

.nav-item{
    overflow:hidden;
}

@keyframes goldGlow{

0% {
opacity:.4;
}

50% {
opacity:1;
box-shadow:
   0 0 20px $primary,
   0 0 60px $primary;
}

100% {
  opacity:.4;
}

}

.logo{
  transition:.4s;
}

.nav-item {
  transition:
  transform .3s,
  color .3s;
}

.nav-item:hover{
  transform:
     translateY(-3px)
     scale(1.05);
}

.booking-btn:active{
   transform :scale(.96);
}

@media(max-width:1150px){

  .container {
    padding: 0 25px;
    margin-left: 0;
  }

  .logo-text h1{
    font-size: 2.5rem;
  }

  .nav{
    display:flex;
    gap:5px;
  }

  .nav-item{
    width:75px;
    height:70px;
  }

  .booking-btn{
    height:50px;
    padding:0 18px;
    gap:8px;
  }

  .booking-btn span{
    display:block;
    font-size:.85rem;
  }

}

@media(max-width:600px){

  .header{
    height:80px;
  }

  .container{
    padding:0 15px;
    gap:10px;
  }

  .logo-text h1{
    font-size:1.1rem;
  }

   .logo-text p {
    font-size: 0.3rem;
   }

  .nav{
    gap:0;
  }

  .nav-item{
    width:55px;
    height:60px;
    font-size:.7rem;
  }

  .nav-item svg{
    width:18px;
  }

  .booking-btn{
    width: 130px;
    height:40px;
    padding:0 12px;
  }

  .booking-btn svg:last-child{
    display:none;
  }

}
</style>