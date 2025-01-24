<template>
  <Loader v-if="loading" />
  <div
    v-if="!confirmed"
    class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md p-5"
    data-v0-t="card"
  >
    <div class="flex flex-col space-y-1">
      <h3 class="text-2xl font-semibold leading-none tracking-tight">
        {{ $t('rate_product') }}
      </h3>
      <p class="text-sm text-muted-foreground">
        {{ $t('what_you_think') }}
      </p>
    </div>
    <div class="pt-0 mt-5">
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium leading-none" for="rating">
         {{
          $t('your_rating')
         }}
        </label>

        <div class="flex items-center">
          <!-- عرض النجوم -->
          <div
            v-for="star in maxStars"
            :key="star"
            @click="setRating(star)"
            @mouseover="hoverRating(star)"
            @mouseleave="resetRating"
          >
            <svg
              v-if="star <= currentRating"
              class="w-4 h-4 text-yellow-300 ms-1 cursor-pointer hover:scale-115 transition-all"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
              />
            </svg>
            <svg
              v-else
              @mouseover="hoverRating(star)"
              class="w-4 h-4 ms-1 text-border cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
              />
            </svg>
          </div>

          <!-- عرض التقييم الحالي -->
          <p class="ms-2 text-gray-600">
            {{ currentRating + 0.0 }}
            {{ $t('out_of') }} {{ maxStars }}
          </p>
        </div>
      </div>
    </div>
    <div class="items-center pt-0 flex justify-end">
      <Button
        :type="currentRating ? 'button' : 'submit'"
        :disabled="!currentRating"
        size="sm"
        @click="Rating()"
      >

      {{ $t('submit') }}

      </Button>
    </div>
  </div>

  <div v-else-if="confirmed" class="p-6">
    <div class="flex flex-col items-center gap-2 text-">
      <img src="../assets/rating.svg" class="h-24" alt="">
      <h1 class="font-semibold text-xl">

        {{ $t('successful_rating') }}
      </h1>
      <p class="max-w-[600px] text-muted-foreground md:text-lg/tight">
       

        {{ $t('thanks_rating') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader.vue";
import { useAuthStore } from "@/stores/authStore";
import { ProductRate } from "@/services/api";
import { useToast } from "@/components/ui/toast/use-toast";
import { useRouter } from "vue-router";

const props = defineProps({
  id: Number,
});

const { toast } = useToast();
const Router = useRouter();
const authStore = useAuthStore();

const loading = ref(false);
const confirmed = ref(false);

const Rating = () => {
  loading.value = true;
  ProductRate({
    user: authStore.userInfo,
    rate: currentRating.value,
    id: Number(props.id),
  })
    .then((res) => {
      if (res.data.success === true) {
        // Router.go(`/product/${props.id}`)
        toast({
          title: "added_success",
          success: true,
          duration: 3000,
        });
      }
      loading.value = false;
      confirmed.value = true;
    })
    .catch((err) => {
      loading.value = false;
    });
};

// عدد النجوم الكلي
const maxStars = ref(5);

// التقييم الحالي
const currentRating = ref(0);

// التقييم المؤقت عند تمرير الماوس
const tempRating = ref(0);

// تعيين التقييم
const setRating = (star) => {
  currentRating.value = star;
};

// تحديث التقييم عند تمرير الماوس
const hoverRating = (star) => {
  tempRating.value = star;
};

// إعادة تعيين التقييم عند إزالة الماوس
const resetRating = () => {
  tempRating.value = currentRating.value;
};
</script>

<style scoped>
/* إضافة بعض الأنماط الإضافية */
span {
  font-size: 2rem;
}
</style>
