<template>
  <div class="container mt-5 pt-4">
    <div v-if="!isAuthenticated" class="row justify-content-center my-5">
      <div class="col-12 col-md-4">
        <div class="card shadow-lg border-0 p-4 rounded-4 text-center">
          <div class="mb-3">
            <i class="bi bi-lock-fill text-primary" style="font-size: 3rem;"></i>
          </div>
          <h4 class="fw-bold mb-3">Admin Login</h4>
          <input 
            v-model="passInput" 
            type="password" 
            class="form-control mb-3 text-center" 
            placeholder="შეიყვანეთ პაროლი"
            @keyup.enter="handleLogin"
          >
          <button @click="handleLogin" class="btn btn-primary w-100 shadow-sm py-2">
            შესვლა
          </button>
          <p v-if="loginError" class="text-danger small mt-2">{{ loginError }}</p>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold m-0"><i class="bi bi-speedometer2 me-2"></i>ადმინ პანელი</h2>
        <button @click="logout" class="btn btn-outline-danger btn-sm rounded-pill px-3">
          <i class="bi bi-box-arrow-right me-1"></i> გამოსვლა
        </button>
      </div>

      <div class="card shadow-sm border-0 p-4 mb-5 bg-light rounded-4">
        <h5 class="mb-3 fw-bold">ახალი ამანათის რეგისტრაცია</h5>
        <form @submit.prevent="addOrder" class="row g-3">
          <div class="col-md-3">
            <input v-model="form.phone" type="text" class="form-control shadow-sm" placeholder="ტელეფონის ნომერი" required>
          </div>
          <div class="col-md-3">
            <input v-model="form.location" type="text" class="form-control shadow-sm" placeholder="მიმდინარე ლოკაცია" required>
          </div>
          <div class="col-md-3">
            <select v-model="form.status" class="form-select shadow-sm" required>
              <option value="" disabled>სტატუსი</option>
              <option value="საწყობშია">საწყობშია</option>
              <option value="გზაშია">გზაშია</option>
              <option value="მიტანილია">მიტანილია</option>
            </select>
          </div>
          <div class="col-md-3">
            <input v-model="form.deliveryDate" type="date" class="form-control shadow-sm" required>
          </div>
          <div class="col-12 mt-3">
            <button type="submit" class="btn btn-primary px-4 shadow-sm fw-bold">
              <i class="bi bi-plus-circle me-2"></i>დამატება
            </button>
          </div>
        </form>
      </div>

      <div class="card shadow-sm border-0 rounded-4 overflow-hidden">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="table-primary">
                <tr>
                  <th class="ps-4">Order ID</th>
                  <th>ტელეფონი</th>
                  <th>სტატუსი</th>
                  <th>ლოკაცია</th>
                  <th>თარიღი</th>
                  <th class="text-center">მოქმედება</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in allOrders" :key="order._id" class="align-middle">
                  <td class="ps-4 fw-bold text-primary" @click="copyToClipboard(order.orderId)" style="cursor: pointer;">
                    {{ order.orderId }} <i class="bi bi-copy ms-1 small text-muted"></i>
                  </td>
                  <td>{{ order.phone }}</td>
                  <td>
                    <span :class="getStatusClass(order.status)" class="badge rounded-pill px-3">
                      {{ order.status }}
                    </span>
                  </td>
                  <td>{{ order.currentLocation }}</td>
                  <td>{{ order.estimatedDelivery }}</td>
                  <td class="text-center">
                    <button @click="deleteOrder(order._id)" class="btn btn-outline-danger btn-sm border-0">
                      <i class="bi bi-trash3-fill"></i>
                    </button>
                  </td>
                </tr>
                <tr v-if="allOrders.length === 0">
                  <td colspan="6" class="text-center py-5 text-muted">ამანათები არ მოიძებნა</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// შენი ახალი ბექენდის მისამართი
const API_BASE_URL = 'https://speedly-backend-0wmc.onrender.com/api'

// ავტორიზაციის ცვლადები
const isAuthenticated = ref(false)
const passInput = ref('')
const loginError = ref('')

const form = ref({ phone: '', status: '', location: '', deliveryDate: '' })
const allOrders = ref([])

// 1. ავტორიზაციის ფუნქცია
const handleLogin = async () => {
  try {
    // ჩანაცვლებულია ახალი ლინკით
    const res = await axios.post(`${API_BASE_URL}/login`, {
      password: passInput.value
    })
    
    if (res.data.success) {
      isAuthenticated.value = true
      localStorage.setItem('isAdmin', 'true')
      loginError.value = ''
      await fetchOrders()
    }
  } catch (err) {
    loginError.value = "არასწორი პაროლი!"
  }
}

// 2. გამოსვლის ფუნქცია
const logout = () => {
  isAuthenticated.value = false
  localStorage.removeItem('isAdmin')
  passInput.value = ''
}

const fetchOrders = async () => {
  try {
    // ჩანაცვლებულია ახალი ლინკით
    const res = await axios.get(`${API_BASE_URL}/all-orders`)
    allOrders.value = res.data
  } catch (err) {
    console.error("მონაცემების წამოღება ვერ მოხერხდა", err)
  }
}

const addOrder = async () => {
  try {
    // ჩანაცვლებულია ახალი ლინკით
    await axios.post(`${API_BASE_URL}/orders`, {
      phone: form.value.phone,
      status: form.value.status,
      currentLocation: form.value.location,
      estimatedDelivery: form.value.deliveryDate
    })
    form.value = { 
      phone: '', 
      status: '', 
      location: '', 
      deliveryDate: new Date().toISOString().split('T')[0] 
    }
    await fetchOrders()
    alert('ამანათი წარმატებით დაემატა!')
  } catch (err) {
    alert('დამატებისას მოხდა შეცდომა')
  }
}

const deleteOrder = async (id) => {
  if (confirm('ნამდვილად გსურთ ამ ჩანაწერის წაშლა?')) {
    try {
      // ჩანაცვლებულია ახალი ლინკით
      await axios.delete(`${API_BASE_URL}/orders/${id}`)
      await fetchOrders()
    } catch (err) {
      alert('წაშლისას მოხდა შეცდომა')
    }
  }
}

const getStatusClass = (status) => {
  if (status === 'მიტანილია') return 'bg-success'
  if (status === 'გზაშია') return 'bg-primary'
  return 'bg-warning text-dark'
}

const copyToClipboard = (id) => {
  navigator.clipboard.writeText(id)
  alert('Order ID დაკოპირებულია!')
}

onMounted(() => {
  if (localStorage.getItem('isAdmin') === 'true') {
    isAuthenticated.value = true
    fetchOrders()
  }
  form.value.deliveryDate = new Date().toISOString().split('T')[0]
})
</script>