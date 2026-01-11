const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// CORS კონფიგურაცია
app.use(cors({ origin: "*" })); 
app.use(express.json());

// პაროლი - ყოველთვის ტექსტის ფორმატში
const ADMIN_PASSWORD = "zdarovabratuxa404@!"; 

// MongoDB კავშირი
// ყურადღება: როცა ინტერნეტში გაუშვებ, 127.0.0.1 უნდა შეიცვალოს MongoDB Atlas-ის ლინკით
mongoose.connect('mongodb+srv://admin:giorgi2026@nodetuts.rvecn.mongodb.net/delivery?retryWrites=true&w=majority&appName=Nodetuts')
    .then(() => console.log('✅ Atlas Connected!'))
    .catch(err => console.log('❌ Error:', err));

const OrderSchema = new mongoose.Schema({
  orderId: String,
  phone: String,
  status: String,
  currentLocation: String,
  estimatedDelivery: String
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

// 1. ლოგინის რეისი
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (String(password) === String(ADMIN_PASSWORD)) {
    res.json({ success: true, message: "ავტორიზაცია წარმატებულია" });
  } else {
    res.status(401).json({ success: false, message: "პაროლი არასწორია" });
  }
});

// 2. ერთი ამანათის ძებნა
app.get('/api/orders/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'სერვერის შეცდომა' });
  }
});

// 3. ყველა ამანათი
app.get('/api/all-orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'მონაცემების წამოღება ვერ მოხერხდა' });
  }
});

// 4. დამატება
app.post('/api/orders', async (req, res) => {
  try {
    const count = await Order.countDocuments();
    const orderId = `GEO-TB-2025-${String(count + 1).padStart(5, '0')}`;

    const newOrder = new Order({
      orderId,
      phone: req.body.phone,
      status: req.body.status,
      currentLocation: req.body.currentLocation,
      estimatedDelivery: req.body.estimatedDelivery
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: 'შენახვა ვერ მოხერხდა' });
  }
});

// 5. წაშლა
app.delete('/api/orders/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'წარმატებით წაიშალა' });
  } catch (err) {
    res.status(500).json({ error: 'წაშლისას მოხდა შეცდომა' });
  }
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on PORT ${PORT}`);
});