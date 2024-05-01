<script setup>
</script>

<template>
  <!--
  <RouterView v-slot="{ Component }" >
    <Transition name="fade">
      <component :is="Component" />
    </Transition>
  </RouterView>
  -->
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  background-color: aqua;
}

header .wrapper {
  display: flex;
  place-items: center;
  justify-content: space-between;
  padding: 0 var(--section-gap);
}

.logo {
  display: block;
  margin: 0;
}

nav {
  width: 100%;
  font-size: 1rem;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

/*
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
*/
</style>
