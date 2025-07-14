<template>
    <form @submit.prevent="handleSubmit" class="coming-soon-form">
        <div class="form-group name-group">
          <div class="name">
            <label for="firstName">First Name<span class="required-asterix">*</span></label>
            <Field name="firstName" type="text" class="form-control" />
            <ErrorMessage name="firstName" class="error-message" />
          </div>

          <div class="name">
            <label for="lastName">Last Name</label>
            <Field name="lastName" type="text" class="form-control" />
            <ErrorMessage name="lastName" class="error-message" />
          </div>
        </div>

        <div class="form-group">
            <label for="company">Company<span class="required-asterix">*</span></label>
            <Field name="company" type="text" class="form-control" />
            <ErrorMessage name="company" class="error-message" />
        </div>

        <div class="form-group">
            <label for="email">Email<span class="required-asterix">*</span></label>
            <Field name="email" type="email" class="form-control" />
            <ErrorMessage name="email" class="error-message" />
        </div>

        <div class="form-group">
            <label for="message">Message<span class="required-asterix">*</span></label>
            <Field name="message" type="textarea" class="form-control" rows="4" />
            <ErrorMessage name="message" class="error-message" />
        </div>

        <div style="position: absolute; left: -9999px;">
          <label for="hiddenField">Hidden Field</label>
          <Field name="hiddenField" type="hidden" class="form-control" v-model="honeypot" />
        </div>

        <RecaptchaV2
          v-model="recaptchaToken"
          siteKey=import.meta.env.VITE_SML_RECAPTCHA_SITE_KEY
          class="recaptcha"
        />

        <button type="submit" :disabled="isSubmitting" class="submit-btn">{{ isSubmitting ? 'Submitting...' : 'Submit' }}</button>

        <div v-if="submitSuccess" class="success-message">
          Thank you! We'll be in touch soon.
        </div>
        <div v-if="submitError" class="error-message">
          Error: {{ submitError }}
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { Field, ErrorMessage, useForm } from 'vee-validate'
import { formSchema } from '../utils/formSchema';
import emailjs from '@emailjs/browser';
import { RecaptchaV2 } from 'vue3-recaptcha-v2';

const recaptchaToken = ref('');
const lastSubmissionTime = ref(null);
const honeypot = ref('');
const isSubmitting = ref(false);
const submitSuccess = ref(false);
const submitError = ref('');

const { handleSubmit: veeHandleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    message: ''
  }
});

const serviceID = import.meta.env.VITE_SML_EMAILJS_SERVICE_ID;
const templateID = import.meta.env.VITE_SML_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_SML_EMAILJS_PUBLIC_KEY;

const handleSubmit = veeHandleSubmit(async (values) => {
  try {
    if (isSubmitting.value) return;

    const now = Date.now();
    if (lastSubmissionTime.value && now - lastSubmissionTime.value < 30000) {
      submitError.value = 'You can only submit the form once every 30 seconds.';
      return;
    }

    if (!recaptchaToken.value) {
      submitError.value = 'Please complete the reCAPTCHA.';
      return;
    }

    if (honeypot.value) {
      return;
    }


    isSubmitting.value = true;
    submitSuccess.value = false;
    submitError.value = '';


    const submissionData = {
      ...values,
      recaptchaToken: recaptchaToken.value
    }

    await emailjs.send(serviceID, templateID, submissionData, publicKey);

    submitSuccess.value = true;
    lastSubmissionTime.value = now;

    resetForm();

    recaptchaToken.value = '';

    setTimeout(() => {
      submitSuccess.value = false;
    }, 5000);
 
  } catch (error) {

    console.error('Email sending failed: ', error);
    submitError.value = 'Failed to send message. Please try again later.';

  } finally {

    isSubmitting.value = false;

  }
})


</script>