const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('../middleware/auth');

// @route   POST /api/payments/create-checkout-session
// @desc    Create a Stripe Checkout Session
router.post('/create-checkout-session', auth, async (req, res) => {
    try {
        const { items } = req.body;

        // Create line items for Stripe
        const line_items = items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    description: item.desc || 'Artisanal Delight',
                    images: [req.headers.origin + (item.image || '/aesthetic_pastries_1776934841310.png')],
                },
                unit_amount: Math.round(item.price * 100), // Stripe expects amount in cents
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${req.headers.origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/order/cancel`,
            customer_email: req.user.email,
            metadata: {
                userId: req.user.id,
                itemCount: items.length
            }
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error('Stripe Session Error:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
