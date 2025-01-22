<script setup>
const props = defineProps({
  order: Object,
});

const {id , total_price,active ,created_at} = props.order;
</script>

<template>
  <div class="bg-card shadow-md border max-w-lg relative rounded-md">
    <div class="flex items-center justify-between px-4 py-4 border-b">
      <div class="data">
        <p class="font-semibold text-lg leading-7 text-foreground">
          {{ $t("orders.order_id") }} :
          <span class="text-primary font-medium">
            {{ id }}
          </span>
        </p>
      </div>
      <!-- <Button class="" variant="destructive">Cancel Your Order</Button> -->
    </div>

    <div class="px-4 py-4 md:py-6">
      <div class="space-y-4">
        <div class="flex gap-4 items-baseline">
          <h2 class="text-base font-semibold text-foreground">
            {{ $t("total") }} :
          </h2>
          <div class="flex items-center text-muted-foreground">
            <p class="text-sm">{{ total_price}} $</p>
          </div>
        </div>
        <div class="flex gap-4 items-baseline">
          <h2 class="text-base font-bold text-foreground">
            {{ $t("orders.status") }}
          </h2>
          <div class="flex items-center text-muted-foreground">
            <!-- Success -->
            <span
            v-if="!active"
              class="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700 dark:bg-emerald-700 dark:text-emerald-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="-ms-1 me-1.5 h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <p class="whitespace-nowrap text-sm">
                {{ $t("orders.confirmed") }}
              </p>
            </span>
          </div>
        </div>
        <!-- <div class="flex gap-4 items-baseline">
          <h2 class="text-base font-bold text-foreground">
            {{ $t("orders.products") }} :
          </h2>
          <div class="flex items-center text-muted-foreground">6</div>
        </div> -->
        <div class="flex gap-4 items-baseline">
          <h2 class="text-base font-bold text-foreground">
            {{ $t("date") }} :
          </h2>
          <div class="flex items-center text-muted-foreground">
            {{ new Date(created_at).toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long", hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'})}}
          </div>
        </div>

        <RouterLink :to="`/profile/order/${id}`">
          <p
            class="mt-4 cursor-pointer text-primary text-center text- font-medium transition-all duration-300 underline hover:font-semibold"
          >
            {{ $t("orders.order_details") }}
          </p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
