<template>
  <div class="logo">
    Nalewki staropolskie
  </div>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style lang="scss">
.logo {
  content: '';
  text-indent: -99999px;
  overflow: hidden;
  width: 90px;
  height: 90px;
  mask: url('../assets/logo.svg') no-repeat center;
  mask-size: contain;
  background: $golden;
  transition: transform 0.4s ease-in, background 0.4s ease-in;
}

@media (max-width: $brMobile) {
  .logo {
    mask: url('../assets/logo-mobile.svg') no-repeat center;
    width: 144px;
    height: 50px;
  }
}
</style>
