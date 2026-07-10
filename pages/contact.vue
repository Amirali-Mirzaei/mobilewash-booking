<template>
  <section class="contact">
    <div class="glow glow-left"></div>
    <div class="glow glow-right"></div>

    <div class="container">

      <div class="heading">
        <span class="subtitle">REACH OUT TO US ANYTIME</span>
      </div>

      <div class="cards">
        <div class="card">
          <div class="icon-wrapper">
            <Icon
              name="lucide:phone"
              size="50"
             />
          </div>

          <h2>Phone Number</h2>

          <a href="tel:222-581-6644">
            222-581-6644
          </a>
        </div>

        <div class="card">
          <div class="icon-wrapper">
            <Icon
             name="lucide:mail"
             size="50"
            />
          </div>

          <h2>Email Address</h2>

          <a href="mailto:info@armobilewash.com">
            armobilewash2026@gmail.com
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.contact {
  min-height: 100vh;
  background: $secondry;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
}

.container {
  width: 100%;
  max-width: 1150px;
  position: relative;
  z-index: 2;
}

.heading {
  text-align: center;
  margin-bottom: 70px;

  .subtitle {
    color: $primary;
    font-size: 3vh;
    letter-spacing: 6px;
    font-weight: 900;
  }

  h1 {
    color: white;
    font-size: clamp(3rem, 5vw, 4.5rem);
    margin: 18px 0;
    font-weight: 800;
  }

  p {
    max-width: 650px;
    margin: auto;
    color: #bdbdbd;
    line-height: 1.9;
    font-size: 1.05rem;
  }
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 35px;
}

.card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(212, 175, 55, 0.18);
  backdrop-filter: blur(18px);
  border-radius: 26px;
  padding: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: .4s ease;

  &:hover {
    transform: translateY(-12px);
    border-color: $primary;
    box-shadow:
      0 20px 60px rgba(212, 175, 55, .18);
  }

  h2 {
    color: white;
    margin-bottom: 12px;
    font-size: 1.5rem;
  }

  a {
    color: $primary-light;
    text-decoration: none;
    font-size: 1.05rem;
    transition: .3s;
    &:hover {
      color: $gray-100;
    }
  }
}

.icon-wrapper {
  width: 90px;
  height: 90px;
  border-radius: 25px;
  background: linear-gradient(
    135deg,
    $primary,
    $primary-light
  );

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  transition: .4s ease;

  svg {
    width: 42px;
    height: 42px;
    color: $secondry;
    stroke-width: 2.2;
    transition: .4s ease;
  }
}

.card:hover .icon-wrapper {
  transform: rotate(-8deg) scale(1.08);

  box-shadow: 0 0 35px rgba(212, 175, 55, .45);
}

.card:hover svg {
  transform: scale(1.15);
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: .22;
}

.glow-left {
  width: 420px;
  height: 420px;
  background: $primary;
  left: -140px;
  top: -140px;
}

.glow-right {
  width: 420px;
  height: 420px;
  background: $primary-light;
  right: -140px;
  bottom: -140px;
}

@media (max-width: 768px) {
  .heading {
    margin-bottom: 50px;
  }

  .card {
    padding: 35px 25px;
  }

  .icon-wrapper {
    width: 80px;
    height: 80px;

    svg {
      width: 36px;
      height: 36px;
    }
  }
}
</style>