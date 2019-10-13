# stripe-chimes
Stripe Chime - Webhook based chime/sound player for stripe.

A simple node.js app that listens for charge.succeeded webhooks from Stripe to play a sound.

To set up on heroku:
http://devcenter.heroku.com/articles/node-js

Dependencies:
npm install .

Run:
node server.js

Open in browser:
http://localhost:8080

Add your stripe api key to your env:
heroku config:add STRIPE_SECRET_KEY=<YOUR KEY>

Stripe webhooks configuration:
https://manage.stripe.com/#account/webhooks

to http://{YOUR_SERVER}/stripe-webhook
