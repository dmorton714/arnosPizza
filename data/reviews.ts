// Customer reviews shown in the home page slider. Quote reviews word for word.
// To add one: paste the review text between backticks (blank lines between paragraphs are fine),
// plus the source. `name` and `stars` are optional; leave them off if you don't have them.
export interface Review {
  text: string
  name?: string
  stars?: number // 1–5, only if the review actually shows a rating
  source: 'Google' | 'Yelp' | 'Facebook' | 'Grubhub' | 'DoorDash'
}

export const reviews: Review[] = [
  {
    name: 'Lucas',
    source: 'Google',
    stars: 5,
    text: `Small and understated location for some good pizza. No real comparisons besides the big pizza chains nearby but it tasted good and that's what I wanted.

Soft drinks, juices, and water are sold in bottles only but I was offered a pre-made glass with ice in it. Was pleasantly surprised since I'm used to self serve soda fountains. Didn't see any straws but maybe they had them behind the counter.

Other drinks are offered but prices for all drinks are not listed on the menus. I think my bottle of soda was around $2.50?

"Meat Pizza (10" Small)" was plenty for me to eat and could probably have been shared with another person. I saw other sizes of pizzas being brought out to other patrons and they looked good as well.

Nice place all around, I want more food from here immediately.`,
  },
  {
    name: 'Candace Leavens',
    source: 'Google',
    stars: 5,
    text: `ordered from here while visiting my daughter from out of town. The cheese pizza and Tiramisu were both great. If I lived closer, I'd definitely be here every week. Especially for the Tiramisu. I'll definitely come again when I'm visiting Louisville next.`,
  },
  {
    name: 'Emilee Willett',
    source: 'Google',
    stars: 5,
    text: `They weren't busy at all when I was there. I bought a small 10" cheese pizza and it was hot, thin crust, and really good and they brought it out really fast. Highly recommend.`,
  },
  {
    name: 'Cameron Book',
    source: 'Google',
    stars: 5,
    text: `One of the best pizza crusts I’ve had in a long time. Both pizzas were good, service was quick and fair priced. I’ll be back.`,
  },
  {
    name: 'Miss Tee',
    stars: 5,
    source: 'Google',
    text: `Was at Yamma Hairbraiding and decided to try this place Arnos a few doors down. I got The Original ( Turkey only) and a Modello as I waited. Service was quick, Place was quiet , My sub was delicious. 😋 I ate half while sipping before I left. Next time I'll try the Signature pizza.`,
  },
  {
    name: 'Rebecca Rausch',
    stars: 5,
    source: 'Google',
    text: `Super clean restaurant. The pizza was AMAZING! I particularly like the crust - it was so fresh and soft and crispy at the same time. The vegetables were fresh. But don’t leave without getting a latte or espresso. I had the latte and the coffee was super smooth. Everything is extremely reasonably priced.`,
  },
  {
    name: 'August Holden',
    source: 'Google',
    stars: 5,
    text: `The best pizzas and flat bread sandwiches in Louisville. They make the dough from scratch and their veggies are fresh 🥰. Simply the best. 🍕`,
  },
  {
    name: 'Kevin',
    source: 'Google',
    stars: 5,
    text: `First time here. Got the pepperoni pie. Sauce and crust made in house. Hands down, one of the best pies I've had, since I left Jersey years ago. Great foldable, thin crust. Great flavor. I'm going to have to give the cheesesteak a whirl next.

Update: I've been back 3x, different pies and the cheesesteak. Took a coworker, who also really liked the pizza. The cheesesteak is also made fresh, using their flatbread. Definitely one of my new favorite places to eat now.`,
  },
  {
    name: 'Will Clark',
    source: 'Google',
    stars: 5,
    text: `Amazing pizza, fresh flat bread sandwiches and salad. Staff was friendly and attentive. Will definitely be coming back after my first visit to check out the other pizza options. The crust on this pizza was the absolute best!`,
  },
  {
    name: 'Dennis Morton',
    source: 'Google',
    stars: 5,
    text: `Was invited by a friend to have a couple's dinner at Arno's, he had been telling me how good their pizza is. I really enjoy these little know mom and pops type places and this one certainly did not disappoint. My wife and I each got a small pizza with toppings of our choice. EXCELLENT pizza and a nice size for small. I ate every bit of the crust, which for me, is a rarity. This place deserves your patronage as good as the pizza is, and, the staff is friendly. Would like to try some other choices, but their pizza is so darn delicious. I'll definitely be back.`,
  },
]
