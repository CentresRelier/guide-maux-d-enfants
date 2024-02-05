<template>
  <vue-hcaptcha
    id="h-captcha"
    ref="hcaptchaRef"
    :sitekey="siteKey"
    @verify="onVerify"
    @expired="onExpire"
    @challengeExpired="onChallengeExpire"
    @render="onRender"
  ></vue-hcaptcha>
  <q-btn @click="resetHcaptcha"></q-btn>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';

const emit = defineEmits(['captcha']);

const siteKey = ref('2d8a48f2-51ac-4c70-b3a1-b18f93810d5a');
const verified = ref(false);
const token = ref('');
const eKey = ref('');
const expired = ref(false);
const hcaptchaRef = ref(null);
const widgetId = ref(null);

function onVerify(tokenStr, ekey) {
  verified.value = true;
  token.value = tokenStr;
  eKey.value = ekey;
  emit('captcha', { data: verified.value, isValid: true });
}

function onExpire() {
  verified.value = false;
  token.value = null;
  eKey.value = null;
  expired.value = true;
  emit('captcha', { data: verified.value, isValid: false });
}

function onChallengeExpire() {
  verified.value = false;
  token.value = null;
  eKey.value = null;
  expired.value = true;
  emit('captcha', { data: verified.value, isValid: false });
}

function onRender() {
  setTimeout(() => {
    if (hcaptchaRef.value) {
      widgetId.value = hcaptchaRef.value.widgetId;
    }
  }, 1000);
  widgetId.value = hcaptchaRef.value.widgetId;
}

onMounted(() => {
  onRender();
});

const resetHcaptcha = () => {
  verified.value = false;
  token.value = null;
  eKey.value = null;
  expired.value = true;
  if (widgetId.value) {
    hcaptchaRef.value.reset();
  }
};
</script>
