<template>
  <div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['formattedQuery']);

const query = ref('');

const finalAddressObject = ref({
  ville: '',
  department: '',
  departmentPostalCode: '',
  region: '',
  label: '',
});

// Function to get user latitude and longitude
const getUserLocation = async () => {
  if ('geolocation' in navigator) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting user location:', error.message);
      return null;
    }
  } else {
    console.error('Geolocation is not supported');
    return null;
  }
};

function formatAddress(address) {
  const stringToBeConverted = address.properties.context;
  const arr = stringToBeConverted.split(',').map((item) => item.trim());
  const [departmentPostalCode, department, region] = arr;

  finalAddressObject.value.ville = address.properties.city;
  finalAddressObject.value.departmentPostalCode = departmentPostalCode;
  finalAddressObject.value.department = department;
  finalAddressObject.value.region = region;
  finalAddressObject.value.label = address.properties.label;
}

// Search address with user latitude and longitude
const getAddressFromCoordinates = async (latitude, longitude) => {
  try {
    const response = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`);
    if (response.ok) {
      const data = await response.json();
      const address = data.features[0];
      query.value = address.properties.label;
      formatAddress(address);
    }
    return null;
  } catch (error) {
    console.error('Error fetching address:', error);
    return null;
  }
};

onMounted(async () => {
  const location = await getUserLocation();
  if (location) {
    await getAddressFromCoordinates(location.latitude, location.longitude);
    emit('formattedQuery', finalAddressObject.value);
  }
});
</script>
