const form = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`❌ Error saving data to Local Storage:`, error);
  }
};

const getFromLocalStorage = (key) => {
  const defaultValue = {};
  try {
    return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
  } catch (error) {
    console.error(`❌ Error retrieving data from Local Storage:`, error);
    return defaultValue;
  }
};

let formData = getFromLocalStorage(LOCAL_STORAGE_KEY);

const checkLocalStorage = () => {
  if (formData.length === 0) return;

  form.elements.email.value = formData.email || '';
  form.elements.message.value = formData.message || '';
};


checkLocalStorage();

form.addEventListener('input', ({ target: { name, value } }) => {
  formData[name] = value.trim();
  saveToLocalStorage(LOCAL_STORAGE_KEY, formData);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('⚠️ Fill please all fields');
    return;
  }

  console.log('✅ Form Data Submitted:', formData);

  form.reset();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  formData = {};
});
