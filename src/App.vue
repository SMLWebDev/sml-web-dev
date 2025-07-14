<script setup>
import ContactForm from './components/ContactForm.vue';
</script>

<template>
  <div class="app-container">
    <div class="logo-container">
      <img src="./assets/sml-logo.svg" alt="SML Logo">
    </div>

    <div class="content">
      <h1>Welcome to <span class="highlight">SML Web Development</span></h1>
      <p>We are currently working on our website. Stay tuned for updates<span class="highlight">!</span></p>
      <p>In the meantime, feel free to reach out to us through the contact form below.</p>
    </div>
  </div>


  <ContactForm />
</template>