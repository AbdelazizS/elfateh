<template>
  <Loader v-if="loading" />
  <Navbar />
  <div class="py-8 md:py-12 border-t">
    <Container>
      <vee-form
        v-if="!confirmed"
        :validation-schema="schema[[stepIndex - 1]]"
        class="space-y-6"
        v-slot="{ meta, values, validate }"
        @submit="onSubmit"
        as=""
        keep-values
      >
        <Stepper
          v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }"
          v-model="stepIndex"
          class="block w-full"
        >
          <form
            autocomplete="off"
            @submit="
              (e) => {
                e.preventDefault();
                validate();


                if (stepIndex === steps.length && meta.valid) {
                  onSubmit(values);
                }
              }
            "
          >
            <div class="flex w-full flex-start gap-2">
              <StepperItem
                v-for="step in steps"
                :key="step.step"
                v-slot="{ state }"
                class="relative flex w-full flex-col items-center justify-center"
                :step="step.step"
              >
                <StepperSeparator
                  v-if="step.step !== steps[steps.length - 1].step"
                  class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                />

                <StepperTrigger as-child>
                  <Button
                    :variant="
                      state === 'completed' || state === 'active'
                        ? 'default'
                        : 'outline'
                    "
                    size="icon"
                    class="z-10 rounded-full shrink-0"
                    :class="[
                      state === 'active' &&
                        'ring-2 ring-ring ring-offset-2 ring-offset-background',
                    ]"
                    :disabled="state !== 'completed' && !meta.valid"
                  >
                    <Check v-if="state === 'completed'" class="size-5" />
                    <Circle v-if="state === 'active'" />
                    <Dot v-if="state === 'inactive'" />
                  </Button>
                </StepperTrigger>
              </StepperItem>
            </div>

            <div>
              <ol
                class="mt-8 grid grid-cols-1 divide-x divide-gray-100 overflow-hidden rounded-lg border border-border text-sm text-gray-500 sm:grid-cols-4"
              >
                <li
                  v-for="step in steps"
                  :class="stepIndex === step.step && `bg-muted `"
                  class="relative flex items-center justify-center gap-2 - py-4"
                >
                  <component :is="step.icon" class="size-7" />

                  <div class="leading-none">
                    <h4
                      :class="[
                        stepIndex === step.step
                          ? 'text-primary'
                          : 'text-foreground',
                      ]"
                      class="text-sm font-semibold transition lg:text-base"
                    >
                      {{ $t(step.title) }}
                    </h4>
                    <p
                      :class="[
                        stepIndex === step.step
                          ? 'text-foreground'
                          : 'text-muted-foreground',
                      ]"
                      class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
                    >
                      {{ $t(step.description) }}
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div class="flex flex-col mt-4 max-w-x">
              <template v-if="stepIndex === 1">
                <div class="space-y-4">
                  <FormField
                    v-slot="{ componentField }"
                    name="state"
                    v-model="form.state"
                  >
                    <FormItem>
                      <FormLabel>
                        {{ $t("order_complete.state") }}
                      </FormLabel>
                      <Select v-bind="componentField">
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              :placeholder="
                                $t('order_complete.state_placeholder')
                              "
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <div
                              v-if="!states?.length"
                              v-for="item in 4"
                              :key="item"
                            >
                              <Skeleton class="h-12 w-full rounded-none" />
                            </div>
                            <SelectItem
                              v-else
                              v-for="item in states"
                              :key="item.id"
                              :item="item"
                              :value="item.state_name"
                            >
                              {{ item.state_name }}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  </FormField>

                  <!-- v-if="form.state" -->
                  <FormField
                    v-slot="{ componentField }"
                    name="locality"
                    v-model="form.locality"
                  >
                    <FormItem>
                      <FormLabel>
                        {{ $t("order_complete.locality") }}
                      </FormLabel>
                      <Select v-bind="componentField">
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              :placeholder="
                                $t('order_complete.locality_placeholder')
                              "
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <div
                              v-if="!localities?.length"
                              v-for="item in 4"
                              :key="item"
                            >
                              <Skeleton class="h-12 w-full rounded-none" />
                            </div>
                            <SelectItem
                              v-else
                              v-for="item in localities"
                              :key="item.id"
                              :item="item"
                              :value="item.locality_name"
                            >
                              {{ item.locality_name }}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  </FormField>

                  <FormField
                    v-slot="{ componentField }"
                    name="unit"
                    v-model="form.unit"
                  >
                    <FormItem>
                      <FormLabel>
                        {{ $t("order_complete.unit") }}
                      </FormLabel>
                      <Select v-bind="componentField">
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              :placeholder="
                                $t('order_complete.unit_placeholder')
                              "
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <div
                              v-if="!localities?.length"
                              v-for="item in 4"
                              :key="item"
                            >
                              <Skeleton class="h-12 w-full rounded-none" />
                            </div>
                            <SelectItem
                              v-else
                              v-for="item in units"
                              :key="item.id"
                              :item="item"
                              :value="item.administrative_unit_name"
                            >
                              {{ item.administrative_unit_name }}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  </FormField>

                  <FormField
                    v-slot="{ componentField }"
                    name="street"
                    v-model="form.street"
                  >
                    <FormItem>
                      <FormLabel>
                        {{ $t("order_complete.street") }}
                      </FormLabel>
                      <Input
                        name="street"
                        :placeholder="$t('order_complete.street_placeholder')"
                        v-bind="componentField"
                      />
                    </FormItem>
                  </FormField>
                </div>
              </template>

              <template v-if="stepIndex === 2">
                <h4 class="text-xl font-medium mb-1">
                  {{ $t("order_complete.shipping_method") }}
                </h4>
                <p class="text-muted-foreground mb-4">
                  {{ $t("order_complete.add_shipping_method") }}
                </p>
                <FormField
                  v-model="form.shipping"
                  v-slot="{ componentField }"
                  type="radio"
                  name="shipping"
                >
                  <FormItem class="space-y-3">
                    <FormControl>
                      <RadioGroup
                        class="grid  md:grid-cols-2 gap-4 -4"
                        v-bind="componentField"
                      >
                        <FormItem class="">
                          <div>
                            <FormLabel
                              class="flex cursor-pointer -center justify-between gap-4 rounded-lg border bg-card p-4 text-sm font-medium shadow-sm hover:border-muted-foreground/25 has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary"
                            >
                              <div class="flex items-center gap-2">
                                <img
                                  src="../assets/logo.png"
                                  class="h-14 w-14"
                                />
                                <div class="">
                                  <p class="text-muted-foreground">
                                    Free Delivery
                                  </p>
                                  <p class="mt-1 text-foreground">
                                    Delivery : 2-4 Days
                                  </p>
                                </div>
                              </div>

                              <FormControl>
                                <RadioGroupItem :value="12" />
                              </FormControl>
                            </FormLabel>
                          </div>
                        </FormItem>
                        <FormItem class="">
                          <div>
                            <FormLabel
                              class="flex cursor-pointer -center justify-between gap-4 rounded-lg border bg-card p-4 text-sm font-medium shadow-sm hover:border-muted-foreground/25 has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary"
                            >
                              <div class="flex items-center gap-2">
                                <img
                                  src="../assets/logo.png"
                                  class="h-14 w-14"
                                />
                                <div class="">
                                  <p class="text-muted-foreground">Fast</p>
                                  <p class="mt-1 text-foreground">
                                    Delivery : 24 Hours
                                  </p>
                                </div>
                              </div>
                              <FormControl>
                                <RadioGroupItem :value="20" />
                              </FormControl>
                            </FormLabel>
                          </div>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <!-- <FormMessage /> -->
                  </FormItem>
                </FormField>
              </template>

              <template v-if="stepIndex === 3">
                <h4 class="text-xl font-medium mb-1">
                  {{ $t("order_complete.payment_details") }}
                </h4>
                <p class="text-muted-foreground">
                  {{ $t("order_complete.providing_payment_details") }}
                </p>

                <div class="grid md:grid-cols-2 gap-4 mt-4">
                  <FormField
                    v-slot="{ componentField }"
                    name="email"
                    v-model="form.email"
                  >
                    <FormItem>
                      <FormLabel>
                        {{ $t("auth.email") }}
                      </FormLabel>
                      <FormControl class="relative mt-4">
                        <div class="flex items-center gap-2">
                          <!-- <div class="relative flex-shrink-0"> -->
                          <Input
                            name="email"
                            placeholder="your.email@gmail.com"
                            v-bind="componentField"
                            class="w-full ps-9 shadow-sm focus:z-10"
                          />
                          <div
                            class="pointer-events-none absolute inset-y-0 start-0 inline-flex items-center px-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-4 w-4 text-muted-foreground/50"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                              />
                            </svg>

                            <!-- </div> -->
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  </FormField>

                  <FormField
                    v-slot="{ componentField }"
                    name="card_holder"
                    v-model="form.card_holder"
                  >
                    <FormItem>
                      <FormLabel>
                        {{ $t("order_complete.card_holder") }}
                      </FormLabel>
                      <FormControl class="relative mt-4">
                        <div class="flex items-center gap-2">
                          <!-- <div class="relative flex-shrink-0"> -->
                          <Input
                            :placeholder="
                              $t(`order_complete.card_holder_placeholder`)
                            "
                            name="card_holder"
                            v-bind="componentField"
                            autocomplete="false"
                            class="w-full ps-9 shadow-sm focus:z-10"
                          />
                          <div
                            class="pointer-events-none absolute inset-y-0 start-0 inline-flex items-center px-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-4 w-4 text-muted-foreground/50"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                              />
                            </svg>

                            <!-- </div> -->
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  </FormField>

                  <FormField
                    v-slot="{ componentField, meta }"
                    name="card_no"
                    v-model="form.card_no"
                  >
                    <FormItem>
                      <FormLabel>
                        {{ $t("order_complete.card_details") }}
                      </FormLabel>
                      <FormControl class="relative mt-4">
                        <div class="flex items-center gap-2">
                          <!-- <div class="relative flex-shrink-0"> -->
                          <Input
                            autocomplete="new-password"
                            type="password"
                            :class="meta.valid && `border border-green-500`"
                            name="card-no"
                            v-bind="componentField"
                            placeholder="xxxx-xxxx-xxxx-xxxx"
                            class="w-full ps-9 shadow-sm focus:z-10"
                          />
                          <div
                            class="pointer-events-none absolute inset-y-0 start-0 inline-flex items-center px-3"
                          >
                            <svg
                              class="h-4 w-4 text-muted-foreground/50"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z"
                              />
                              <path
                                d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z"
                              />
                            </svg>
                            <!-- </div> -->
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  </FormField>

                  <div class="grid md:grid-cols-4 gap-4 items-end">
                    <FormField
                      v-slot="{ componentField, meta }"
                      name="credit_expiry"
                      v-model="form.credit_expiry"
                    >
                      <FormItem>
                        <!-- <FormLabel>expiry</FormLabel> -->
                        <Input
                          type="password"
                          :class="meta.valid && `border border-green-500`"
                          name="credit_expiry"
                          placeholder="MM/YY"
                          v-bind="componentField"
                        />
                      </FormItem>
                    </FormField>
                    <FormField
                      v-slot="{ componentField, meta }"
                      name="credit_cvc"
                      v-model="form.credit_cvc"
                    >
                      <FormItem>
                        <!-- <FormLabel>cvc</FormLabel> -->
                        <Input
                          type="password"
                          :class="meta.valid && `border border-green-500`"
                          name="credit_cvc"
                          placeholder="CVC"
                          v-bind="componentField"
                        />
                      </FormItem>
                    </FormField>
                  </div>
                </div>
              </template>
              <template v-if="stepIndex === 4">
                <div class="grid md:grid-cols-2 gap-4">
                  <div
                    class="bg-card border w-full max-w- rounded-lg shadow-md p-6 space-y-4"
                  >
                    <!-- Shipping Address -->
                    <div
                      class="p-4 border rounded-lg flex justify-between items-center"
                    >
                      <div class="flex items-start gap-1.5">
                        <!-- Location Icon -->
                        <MapPin class="size-6" />
                        <div>
                          <h3 class="text-sm font-semibold">
                            {{ $t("order_complete.shipping_address") }}
                          </h3>
                          <p class="text-sm text-muted-foreground">
                            {{ form.state }}<br />
                            {{ form.locality }} <br />
                            {{ form.unit }}<br />
                            {{ form.street }}
                          </p>
                        </div>
                      </div>
                      <Button
                        @click="stepIndex = 1"
                        :variant="'outline'"
                        class="text-blue-600 text-sm hover:underline"
                      >
                        {{ $t("edit") }}
                      </Button>
                    </div>

                    <!-- Shipping Method -->
                    <div
                      class="p-4 border rounded-lg flex justify-between items-center"
                    >
                      <div class="flex items-start gap-1.5">
                        <!-- Truck Icon -->

                        <Truck class="size-6" />
                        <div>
                          <h3 class="text-sm font-semibold">
                            {{ $t("order_complete.shipping_method") }}
                          </h3>
                          <p class="text-sm text-gray-600">
                            Free, 2-4 working days
                          </p>
                        </div>
                      </div>
                      <Button
                        @click="stepIndex = 2"
                        :variant="'outline'"
                        class="text-blue-600 text-sm hover:underline"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>

                  <!-- md:max-w-lg md:mx-auto -->
                  <div
                    class="fade-up mt-6 flex-1 space-y-6 lg:mt-0 lg:w-full lg:sticky lg:top-4"
                  >
                    <div
                      class="space-y-4 rounded-lg border bg-card p-4 shadow-sm :border-gray-700 :bg-gray-800 sm:p-6"
                    >
                      <p class="text-xl font-semibold text-foreground">
                        {{ $t("shopping_cart.order_summary") }}
                      </p>

                      <div class="space-y-4">
                        <div class="space-y-2">
                          <dl class="flex items-center justify-between gap-4">
                            <dt
                              class="text-base font-normal text-foreground/60 :text-gray-400"
                            >
                              {{ $t("shopping_cart.original_price") }}
                            </dt>
                            <dd class="text-base font-medium text-foreground">
                              <span> ${{ CartStore.totalAmount }} </span>
                            </dd>
                          </dl>

                          <dl class="flex items-center justify-between gap-4">
                            <dt
                              class="text-base font-normal text-foreground/60 :text-gray-400"
                            >
                              {{ $t("shopping_cart.shipping") }}
                            </dt>
                            <dd
                              class="text-base font-medium text-text-foreground"
                            >
                              {{ `$` + form.shipping }}
                            </dd>
                          </dl>
                        </div>

                        <dl
                          class="flex items-center justify-between gap-4 border-t pt-2 :border-gray-700"
                        >
                          <dt class="text-base font-bold text-foreground">
                            {{ $t("shopping_cart.total") }}
                          </dt>

                          <dd class="text-base font-medium text-foreground">
                            <span>
                              ${{ CartStore.totalAmount + form.shipping }}
                            </span>
                          </dd>
                        </dl>
                      </div>
                      <Button variant="default" class="w-full">{{
                        $t("order_complete.checkout")
                      }}</Button>
                    </div>
                  </div>
                </div>
              </template>
            </div>

            <div class="flex items-center justify-between mt-4 max-wxl">
              <Button
                :disabled="isPrevDisabled"
                variant="outline"
                @click="prevStep()"
              >
                {{ $t("back") }}
              </Button>
              <div class="flex items-center gap-3">
                <Button
                  v-if="stepIndex !== 4"
                  :type="meta.valid ? 'button' : 'submit'"
                  :disabled="isNextDisabled"
                  @click="meta.valid && nextStep()"
                >
                  {{ $t("next") }}
                </Button>
                <!-- <Button v-if="stepIndex === 4" size="sm" type="submit">
                  Submit
                </Button> -->
              </div>
            </div>
          </form>
        </Stepper>
      </vee-form>

      <div v-else class="grid md:grid-cols-2 gap-4 md:gap-8 items-center">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col items-center gap-2 text-">
            <CheckCircle2 class="text-green-500 h-10 w-10" />
            <h1 class="font-semibold text-3xl">
              {{ $t("order_complete.payment_successful") }}
            </h1>
            <p class="max-w-[600px] text-muted-foreground md:text-xl/tight">
              {{ $t("order_complete.order_ready") }}
            </p>
          </div>
          <div
            class="rounded-lg border bg-card text-card-foreground shadow-sm w-full p-0"
            data-v0-t="card"
          >
            <div class="p-4 md:p-6">
              <div class="grid gap-1 text-sm">
                <!-- <div class="flex items-center gap-2">
                  <div class="font-medium">
                    {{ $t("order_complete.order_id") }}:
                  </div>
                  <div>#123456</div>
                </div> -->
                <div class="flex items-center gap-2">
                  <!-- <div class="font-medium">
                    {{ $t("order_complete.order_time") }}
                    :
                  </div>
                  <div>
                    {{ `${Date.getYear()}` }}
                  </div> -->
                </div>
              </div>
              <!-- <div
                data-orientation="horizontal"
                role="none"
                class="shrink-0 bg-border h-[1px] w-full my-4"
              ></div> -->
              <div class="grid gap-1 text-sm">
                <div class="flex items-center gap-2">
                  <div class="font-medium">
                    {{$t("auth.email")}}:</div>
                  <div>
                    {{form.email}}
                  </div>
                </div>

            </div>
            <div class="items-center flex w-full py-4 md:py-6">
              <Button
              >
              {{ $t("order_complete.view") }}
            </Button>
            </div>
          </div>
          </div>
          
        </div>

        <img src="../assets/order.svg" class="h-5/6" alt="" />
      </div>
    </Container>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import BaseInput from "@/components/BaseInput.vue";
import Loader from "@/components/Loader.vue";
import PasswordInput from "@/components/PasswordInput.vue";
import BottomNav from "@/components/BottomNav.vue";
import { Button } from "@/components/ui/button";
import Container from "@/layouts/Container.vue";
import Footer from "@/components/Footer.vue";
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { required, email, min, max, numeric } from "@vee-validate/rules";
import { defineRule } from "vee-validate";
import { onMounted } from "vue";
import { getStates, getLocalities, getUnits, addOrder } from "@/services/api";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";

import {
  BookUser,
  Check,
  CreditCard,
  Truck,
  Dot,
  MapPin,
  PackageCheck,
  CheckCircle2,
} from "lucide-vue-next";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/toast/use-toast";
import { useCartStore } from "@/stores/cart.js";
import { Input } from "@/components/ui/input";
import Skeleton from "@/components/ui/skeleton/Skeleton.vue";
import { watch } from "vue";
import { useAuthStore } from "@/stores/authStore";
defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("numeric", numeric);

const loading = ref(false);
const confirmed = ref(false);

const authStore = useAuthStore();
const CartStore = useCartStore();
const router = useRouter();

const steps = [
  {
    step: 1,
    title: "order_complete.address",
    description: "order_complete.add_address",
    icon: MapPin,
  },
  {
    step: 2,
    title: "order_complete.shipping",
    description: "order_complete.add_shipping_method",
    icon: Truck,
  },
  {
    step: 3,
    title: "order_complete.payment",
    description: "order_complete.add_payment_info",
    icon: CreditCard,
  },
  {
    step: 4,
    title: "order_complete.checkout",
    description: "order_complete.confirm_order",
    icon: PackageCheck,
  },
];

const localities = ref();
const states = ref();
const units = ref();
const { toast } = useToast();

const stepIndex = ref(1);
const form = ref({
  //1
  state: "",
  state_id: "",
  locality: "",
  locality_id: "",
  unit: "",
  street: "",
  // 2
  shipping: "",
  // 3
  email: "",
  card_holder: "",
  card_no: "",
  credit_cvc: "",
  credit_expiry: "",
});
const schema = [
  {
    state: { required: true },
    locality: { required: true },
    unit: { required: true },
    street: { required: true },
  },
  {
    shipping: { required: true },
  },
  {
    email: { required: true, email: true },
    card_holder: { required: true },
    card_no: { required: true, max: 16, min: 16, numeric: true },
    credit_cvc: { required: true, max: 4, min: 4, numeric: true },
    credit_expiry: { required: true, max: 4, min: 4, numeric: true },
  },
];

const onSubmit = (values) => {

  loading.value = true;

  setTimeout(() => {
    loading.value = false;
    confirmed.value = true;
  }, 1000);
  addOrder({
    ...values,
    state_id: form.value.state_id,
    locality_id: form.value.locality_id,
    user: authStore.userInfo,
    totalAmount: CartStore.totalAmount,
  })
    .then((res) => {
      
      if (res.data.success) {
          loading.value = false;
          toast({
            title: "orders.order_added",
            success: true,
            duration: 3000,
          });

          CartStore.getItems(authStore.userInfo)
        }
    })
    .catch((err) => {
      if (!err.response) {
        toast({
          title: "network_error",
          error: true,
          duration: 3000,
        });
      }
    });
};

onMounted(() => {

  getStates()
    .then((res) => {
      states.value = res.data.data.states;
    })
    .catch((err) => {
    });
});



watch(
  () => form.value.state,
  (state) => {
    form.value.locality = "";
    form.value.unit = "";
    form.value.street = "";
    const Item = states.value.find((x) => x.state_name === state);
    form.value.state_id = Item.state_id;

    getLocalities(Item.state_id)
      .then((res) => {
        localities.value = res.data.data.locality;
      })
      .catch((err) => {
      });
  }
);

watch(
  () => form.value.locality,
  (locality) => {
    form.value.unit = "";
    form.value.street = "";
    if (form.value.locality !== "") {
      const Item = localities.value.find((x) => x.locality_name === locality);
      form.value.locality_id = Item.locality_id;
      getUnits(Item.locality_id)
        .then((res) => {
          units.value = res.data.data.locality;
        })
        .catch((err) => {
        });
    }
  }
);
</script>
