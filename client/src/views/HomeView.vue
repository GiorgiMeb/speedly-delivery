<template>
  <div class="landing-page">
    <header class="hero-section text-center text-white">
      <div class="container py-5">
        <h1 class="display-4 fw-bold mb-3">სწრაფი და საიმედო მიტანა თბილისში</h1>
        <p class="lead mb-4 opacity-75">აკონტროლეთ თქვენი ამანათი რეალურ დროში</p>
        
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            <div class="input-group input-group-lg shadow-lg custom-search">
              <input 
                v-model="orderId" 
                class="form-control border-0 px-4" 
                placeholder="შეიყვანეთ Order ID..." 
                @keyup.enter="checkOrder"
              />
              <button @click="trackOrder" class="btn btn-dark px-4 py-2" :disabled="isLoading">
  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
  {{ isLoading ? 'იძებნება...' : 'ძებნა' }}
</button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section v-if="order || error" class="container result-container">
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card border-0 shadow-lg p-4 rounded-4 animate-fade-in position-relative">
        
        <button 
          @click="closeResult" 
          class="btn-close position-absolute top-0 end-0 m-3 shadow-none" 
          aria-label="Close">
        </button>

        <div v-if="order" class="text-center pt-2">
          <span class="badge bg-success mb-3 p-2 px-3">სტატუსი: {{ order.status }}</span>
          <h3 class="text-primary fw-bold mb-4">{{ order.orderId }}</h3>
          <div class="row text-start border-top pt-4">
            <div class="col-sm-6 mb-3">
              <small class="text-muted d-block text-uppercase fw-bold">მიმდინარე ლოკაცია</small>
              <span class="fs-5"><i class="bi bi-geo-alt-fill text-danger"></i> {{ order.currentLocation }}</span>
            </div>
            <div class="col-sm-6 mb-3">
              <small class="text-muted d-block text-uppercase fw-bold">მიტანის თარიღი</small>
              <span class="fs-5"><i class="bi bi-calendar-check text-primary"></i> {{ order.estimatedDelivery }}</span>
            </div>
          </div>
        </div>

        <div v-if="error" class="text-center py-2">
          <div class="alert alert-custom-warning mb-0">
            <i class="bi bi-exclamation-triangle-fill me-2"></i> {{ error }}
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

    <section class="container py-5 mt-5">


      <div class="row g-4 text-center">
        <div class="col-md-4">
          <div class="feature-card p-4 rounded-4 shadow-sm h-100">
            <div class="icon-box bg-primary-soft mb-3">
              <i class="bi bi-lightning-charge fs-2 text-primary"></i>
            </div>
            <h5 class="fw-bold">სწრაფი სერვისი</h5>
            <p class="text-muted mb-0">მიტანა თბილისის მასშტაბით იმავე დღეს, ყოველგვარი შეფერხების გარეშე.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="feature-card p-4 rounded-4 shadow-sm h-100">
            <div class="icon-box bg-primary-soft mb-3">
              <i class="bi bi-shield-check fs-2 text-primary"></i>
            </div>
            <h5 class="fw-bold">დაცული გზავნილი</h5>
            <p class="text-muted mb-0">თქვენი ნივთები ჩვენთან საიმედო ხელშია, დაზღვეული და დაცული.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="feature-card p-4 rounded-4 shadow-sm h-100">
            <div class="icon-box bg-primary-soft mb-3">
              <i class="bi bi-chat-dots fs-2 text-primary"></i>
            </div>
            <h5 class="fw-bold">SMS შეტყობინება</h5>
            <p class="text-muted mb-0">ავტომატური შეტყობინება სტატუსის ყოველი ცვლილების დროს.</p>
          </div>
        </div>
      </div>
    </section>

    <div class="container my-4 px-3">
  <div class="row align-items-center bg-light rounded-4 p-3 p-md-4 shadow-sm mx-0">
    <div class="col-12 col-md-6 text-center text-md-start mb-4 mb-md-0">
      <h2 class="fw-bold h4">სწრაფი და უსაფრთხო მიწოდება</h2>
      <p class="text-muted small">
        ჩვენი ელექტრომობილების პარკი უზრუნველყოფს თქვენი ამანათების ეკოლოგიურ და დროულ ტრანსპორტირებას.
      </p>
    </div>
    <div class="col-12 col-md-6 text-center">
      <img src="../assets/nissan_leaf.png" class="img-fluid rounded-3 car-image" style="max-height: 400px; width: auto;">
    </div>
  </div>
</div>


<div class="container my-5 py-5">
  <div class="text-center mb-5">
    <h2 class="fw-bold">მიწოდების ტარიფები</h2>
    <p class="text-muted">მიწოდება კურიერის მეშვეობით თბილისის მასშტაბით</p>
  </div>

</div>
<div class="row justify-content-center mx-0"> <div class="col-12 col-md-8 px-2"> <div class="pricing-card shadow-sm rounded-4 overflow-hidden border-0">
      <div class="table-responsive" style="overflow-x: hidden;"> <table class="table table-hover align-middle mb-0 custom-table">
          <thead>
            <tr>
              <th class="ps-4 py-3 bg-primary text-white border-0">წონა</th>
              <th class="text-end pe-4 py-3 bg-primary text-white border-0">ფასი (GEL)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="ps-4 py-3">1 კგ-მდე</td>
              <td class="text-end pe-4 fw-bold color-speedly">6 GEL</td>
            </tr>
            <tr class="bg-light-row">
              <td class="ps-4 py-3">3 კგ-მდე</td>
              <td class="text-end pe-4 fw-bold color-speedly">6 GEL</td>
            </tr>
            <tr>
              <td class="ps-4 py-3">5 კგ-მდე</td>
              <td class="text-end pe-4 fw-bold color-speedly">7 GEL</td>
            </tr>
            <tr class="bg-light-row">
              <td class="ps-4 py-3">10 კგ-მდე</td>
              <td class="text-end pe-4 fw-bold color-speedly">10 GEL</td>
            </tr>
            <tr>
              <td class="ps-4 py-3">20 კგ-მდე</td>
              <td class="text-end pe-4 fw-bold color-speedly">14 GEL</td>
            </tr>
            <tr class="bg-light-row">
              <td class="ps-4 py-3">30 კგ-მდე</td>
              <td class="text-end pe-4 fw-bold color-speedly">18 GEL</td>
            </tr>
            <tr>
              <td class="ps-4 py-3 fw-bold">50 კგ-მდე</td>
              <td class="text-end pe-4 fw-bold text-danger">35 GEL</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p class="small text-muted mt-3 text-center text-md-start">
      * ფასები მოცემულია ერთი მიმართულებით. 50 კგ-ზე ზევით ტარიფი ინდივიდუალურია.
    </p>
  </div>
</div>


  </div>

  <footer class="bg-dark text-white pt-5 pb-4 mt-5">
  <div class="container">
    <div class="row text-center text-md-start">
      
      <div class="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3">
        <h5 class="text-uppercase mb-4 fw-bold text-primary">Speedly</h5>
        <p>ჩვენ ვართ ამანათების სწრაფი და საიმედო საკურიერო სერვისი. ჩვენი პრიორიტეტი თქვენი გზავნილების უსაფრთხოება და დროული მიწოდებაა.</p>
      </div>

      <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
        <h5 class="text-uppercase mb-4 fw-bold text-primary">სამუშაო საათები</h5>
        <p><i class="bi bi-clock me-2"></i>ორშ - პარ: 09:00 - 20:00</p>
        <p><i class="bi bi-clock me-2"></i>შაბათი: 10:00 - 18:00</p>
        <p><i class="bi bi-clock me-2"></i>კვირა: დასვენება</p>
      </div>

      <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
        <h5 class="text-uppercase mb-4 fw-bold text-primary">კონტაქტი</h5>
        <p><i class="bi bi-geo-alt-fill me-2"></i> თბილისი, საქართველო</p>
        <p><i class="bi bi-envelope-fill me-2"></i> info@speedly.ge</p>
        <p><i class="bi bi-telephone-fill me-2"></i> +995 5XX XX XX XX</p>
      </div>

    </div>

    <hr class="mb-4">

    <div class="row align-items-center">
      <div class="col-md-7 col-lg-8">
        <p>© 2024 ყველა უფლება დაცულია: <strong class="text-primary">Speedly.ge</strong></p>
      </div>
      <div class="col-md-5 col-lg-4">
        <div class="text-center text-md-end">
          <ul class="list-unstyled list-inline">
            <li class="list-inline-item">
              <a href="#" class="btn-floating btn-sm text-white" style="font-size: 23px;"><i class="bi bi-facebook"></i></a>
            </li>
            <li class="list-inline-item">
              <a href="#" class="btn-floating btn-sm text-white" style="font-size: 23px;"><i class="bi bi-instagram"></i></a>
            </li>
            <li class="list-inline-item">
              <a href="#" class="btn-floating btn-sm text-white" style="font-size: 23px;"><i class="bi bi-tiktok"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</footer>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const orderId = ref('')
const order = ref(null)
const error = ref('')
const isLoading = ref(false) // ეს ხაზი აკლია

const checkOrder = async () => {
  if (!orderId.value) return
  try {
    error.value = ''
    // დაემატა / ნიშანი api/orders-ის შემდეგ
    const res = await axios.get(`https://speedly-backend-0wmc.onrender.com/api/orders/${orderId.value.trim()}`)
    order.value = res.data
  } catch {
    error.value = 'ამანათი მოცემული ID-ით ვერ მოიძებნა'
    order.value = null
  }
}

const trackOrder = async () => {
  if (!orderId.value) return

  isLoading.value = true // აქ ჩაირთვება ანიმაცია
  error.value = ''
  order.value = null

  try {
    // აუცილებლად დაამატე / ნიშანი orders-ის შემდეგ
    const res = await axios.get(`https://speedly-backend-0wmc.onrender.com/api/orders/${orderId.value.trim()}`)
    order.value = res.data
  } catch (err) {
    error.value = 'ამანათი ამ ნომრით ვერ მოიძებნა'
  } finally {
    isLoading.value = false // აქ გამოირთვება ანიმაცია
  }
}

const closeResult = () => {
  order.value = null
  error.value = ''
  orderId.value = '' // სურვილისამებრ, ასუფთავებს ჩაწერილ ID-საც
}
</script>

<style scoped>
.landing-page { background-color: #fcfdfe; min-height: 100vh; }
.hero-section {
  background: linear-gradient(135deg, #0d6efd 0%, #004dc7 100%);
  padding-bottom: 100px;
}
.result-container { margin-top: -60px; position: relative; z-index: 10; }
.custom-search { border-radius: 12px; overflow: hidden; }
.feature-card { background: white; transition: 0.3s; border: 1px solid #eee; }
.feature-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.05) !important; }
.icon-box {
  width: 60px; height: 60px; line-height: 60px;
  margin: 0 auto; border-radius: 15px;
}
.bg-primary-soft { background-color: rgba(13, 110, 253, 0.1); }
.alert-custom-warning { background-color: #fff3cd; color: #856404; border-radius: 12px; }
.animate-fade-in { animation: fadeIn 0.5s ease-in; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.car-image {
  /* სურათზე ოდნავ ჩრდილი და "ამოწევის" ეფექტი */
  transition: transform 0.3s ease;
  filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));
}

.car-image:hover {
  transform: translateY(-5px);
}

.bg-light {
  background-color: #f8f9fa !important;
  border: 1px solid #eee;
}


footer {
  font-size: 0.9rem;
}

footer a {
  text-decoration: none;
  transition: 0.3s;
}

footer a:hover {
  color: #0d6efd !important; /* ლურჯი ფერი ჰოვერზე */
}

footer .bi {
  vertical-align: middle;
}

/* სოციალური ხატულების დაშორება */
.list-inline-item {
  margin-right: 15px;
}

/* ცხრილი ფასების  */
.table {
  background: white;
  border-collapse: separate;
  border-spacing: 0;
}

.table thead th {
  font-weight: 600;
  letter-spacing: 0.5px;
}

.table tbody tr {
  transition: all 0.2s ease;
}

.table tbody tr:hover {
  background-color: #f8f9ff !important;
  transform: scale(1.01);
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  z-index: 1;
}

.table td {
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}
@media (max-width: 768px) {
  .table {
    font-size: 14px; /* უფრო პატარა შრიფტი მობილურზე */
  }
  
  h2 {
    font-size: 1.5rem !important; /* სათაურის ზომის შემცირება */
  }

  .container {
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
}


/* ცხრილის მთავარი კონტეინერი */
.pricing-card {
  background: #ffffff;
  border: 1px solid #eef2f7;
}

/* Speedly-ს ლურჯი ფერი ტექსტისთვის */
.color-speedly {
  color: #0056b3;
}

/* მწკრივების მონაცვლეობითი ფერი უკეთესი კითხვადობისთვის */
.bg-light-row {
  background-color: #f8fbff;
}

/* ცხრილის სვეტების ავტომატური ზომა */
.custom-table {
  width: 100% !important;
  table-layout: fixed; /* აიძულებს ტექსტს ჩაეტიოს ეკრანზე */
}

/* მობილურის ოპტიმიზაცია */
@media (max-width: 576px) {
  .pricing-card {
    border-radius: 12px !important;
  }
  
  .custom-table td, .custom-table th {
    font-size: 14px; /* მობილურზე ოდნავ პატარა შრიფტი */
    padding-left: 15px !important;
    padding-right: 15px !important;
  }
}

.bg-primary {
  background-color: #0056b3 !important; /* Speedly-ს ბრენდის ლურჯი */
}
</style>