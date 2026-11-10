// Photos live in /public. type: 'image' | 'video' (gif works as 'image').
export interface Slide {
  type: 'image' | 'video'
  src: string
  alt: string
  poster?: string
}

export const heroSlides: Slide[] = [
  { type: 'image', src: '/pizza1.jpg', alt: 'Pizza topped with banana peppers and olives on a serving tray' },
  { type: 'image', src: '/cheese.jpg', alt: 'Large cheese pizza in a takeout box' },
  { type: 'image', src: '/outsideRestraunt.jpg', alt: 'Arno Pizza storefront on Bardstown Road' },
]

export const pizzaSlides: Slide[] = [
  { type: 'image', src: '/pizza1.jpg', alt: 'Pizza topped with banana peppers and olives' },
  { type: 'image', src: '/cheese.jpg', alt: 'Cheese pizza fresh out of the oven' },
]

export const subSlides: Slide[] = [
  { type: 'image', src: '/calzone.jpg', alt: 'Calzone cut in half, filled with meat, cheese and lettuce' },
]

export const sideSlides: Slide[] = [
  { type: 'image', src: '/breadsticks.jpg', alt: 'Oven baked bread sticks with marinara sauce' },
  { type: 'image', src: '/salad.jpg', alt: 'Greek salad with feta, tomato, cucumber and kalamata olives' },
]

export const placeSlides: Slide[] = [
  { type: 'image', src: '/outsideRestraunt.jpg', alt: 'Arno Pizza storefront with yellow sign' },
  { type: 'image', src: '/insideBar.jpg', alt: 'Order counter inside Arno Pizza with the pick-up window' },
]
