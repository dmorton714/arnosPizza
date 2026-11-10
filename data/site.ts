// Business details used in the header, footer, Visit page and Google's structured data.
export const site = {
  name: 'Arno Pizza',
  phone: '(502) 384-8131',
  phoneHref: 'tel:+15023848131',
  street: '3912 Bardstown Road',
  city: 'Louisville',
  region: 'KY',
  zip: '40218', // CHECK
}

export const fullAddress = `${site.street}, ${site.city}, ${site.region} ${site.zip}`
export const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${fullAddress}`)}`

// `opens`/`closes` are 24-hour times for Google; leave them off for closed days.
export const hours = [
  { days: 'Monday – Saturday', time: '11 a.m. – 9 p.m.', schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '11:00', closes: '21:00' },
  { days: 'Sunday', time: 'Closed', schemaDays: ['Sunday'] },
]
