<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header :class="!top ? 'topPage' : ''">
    <Container>
      <nav class="flex justify-between items-center py-2 z-40">
        <!-- Logo  -->

        <RouterLink to="/">
          <div class="flex items-center cursor-pointer">
            <img src="/src/assets/logo.png" alt="" class="w-16 md:w-20" />
            <h1 class="text-primary font-bold text-lg md:text-xl">Elfateh</h1>
          </div>
        </RouterLink>

        <!-- SearchBar -->
        <!-- <div class="md:max-w-xl w-full hidden lg:block">
          <form
            class="shadow-sm focus-within:shadow-md transition-all duration-300 text-foreground flex max-xl:w-full px-2 py-1 rounded-md border items-center bg-muted/30"
            @submit.prevent="SearchFilter()"
          >
            <BaseInput
              v-model="searchQuery"
              class="w-full"
              :value="searchQuery"
              :search_bar="true"
              :placeholder="$t('search_here')"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6 cursor-pointer hover:text-primary transition-all duration-300"
            >
              <path
                fill-rule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </form>
        </div> -->
        <SearchBar class="md:max-w-xl w-full hidden lg:block" />

        <!-- Features Icons -->
        <div class="hidden lg:flex">
          <ToggleTheme />

          <!-- Cart -->

          <RouterLink to="/shopping-cart">
            <Button size="sm" variant="ghost" class="relative w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>

              <span
                class="absolute left-3 -mx-3 top-1 rounded-full bg-primary px-1.5 py-0 text-xs text-muted"
                >{{ CartStore.countCartItems }}</span
              >
            </Button>
          </RouterLink>

          <!-- Account -->
          <Account />

          <!-- LanguageSwitcher -->
          <LanguageSwitcher />
        </div>

        <!-- Mobile -->
        <div class="flex items-center lg:hidden gap-">
          <Sheet v-model:open="isOpen">
            <!-- Account -->
            <Account class="z-[1000000000]" />

            <!-- Cart -->
            <RouterLink to="/shopping-cart">
              <Button size="sm" variant="ghost" class="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>

                <span
                  class="absolute left-3 -mx-3 top-1 rounded-full bg-primary px-1.5 py-0 text-xs text-muted"
                  >{{ CartStore.countCartItems }}</span
                >
              </Button>
            </RouterLink>

            <SheetTrigger as-child>
              <Button size="sm" variant="ghost" @click="isOpen = true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-6"
                >
                  <line x1="21" x2="3" y1="6" y2="6" />
                  <line x1="21" x2="9" y1="12" y2="12" />
                  <line x1="21" x2="7" y1="18" y2="18" />
                </svg>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              class="flex z-[10000000] flex-col justify- bg-card p-4 border-0"
            >
              <div>
                <SheetHeader class="mb-4">
                  <SheetTitle class="flex items-center">
                    <a href="/" class="flex items-center">
                      <img src="/src/assets/logo.png" alt="" class="w-20" />
                      <h1 class="text-primary font-bold text-xl md:text:2xl">Elfateh</h1>
                    </a>
                  </SheetTitle>
                </SheetHeader>

                <!-- SearchBar -->
                <SearchBar class="w-full lg:hidden " />

                <div class="flex flex-col gap-2">
                  <LanguageSwitcher />
                </div>
              </div>

              <SheetFooter class="flex-col sm:flex-col justify-start items-start">
                <!-- <Separator class="mb-2" /> -->

                <ToggleTheme />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </Container>
  </header>
</template>

<script setup>
import Container from '@/layouts/Container.vue'
import ToggleTheme from '@/components/ToggleTheme.vue'
import Account from '@/components/Account.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import { Button } from '@/components/ui/button'
import { onMounted } from 'vue'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { RouterLink, useRoute } from 'vue-router'
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart.js'
import { onBeforeMount } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
const CartStore = useCartStore()
const route = useRoute()
const isOpen = ref(false)
const top = ref(false)

// sticky nav
//  const [stickyClass, setStickyClass] = useState("");

// function stickNavbar() {
//     let windowHeight = window.scrollY;
//     setStickyClass("sticky-nav") ? windowHeight > 500 : setStickyClass("");
// }

// useEffect(() => {
//     window.addEventListener("scroll", stickNavbar);
// }, []);

// detect whether user has scrolled the page down by 10px
const scrollHandler = () => {
  // window.pageYOffset
  window.scrollY > 150 ? (top.value = true) : (top.value = true)
  if (route.path === '/') {
    window.scrollY > 150 ? (top.value = false) : (top.value = true)
  }
}

onBeforeMount(() => {
  window.addEventListener('scroll', () => scrollHandler())
})
onMounted(() => {
  scrollHandler()
})

// useEffect(() => {
//   scrollHandler()
//   window.addEventListener('scroll', scrollHandler)
//   return () => window.removeEventListener('scroll', scrollHandler)
// }, [top])
// $(window).on("scroll", function () {
// 		var scrolling = $(this).scrollTop();
// 		if (scrolling > 200) {
// 			$(".scroll-top").fadeIn();
// 		} else {
// 			$(".scroll-top").fadeOut();
// 		}
// 	});
</script>

<style>
/* Navbar */

header.topPage {
  transition: all 0.5s ease-out;
  @apply bg-card fixed w-full top-0 left-0 z-[100000] shadow-md;
}
</style>
