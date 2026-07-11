export const SITE_URL = 'https://www.leporge-ecoledesurf.com'

const isHighSeason = () => {
  const month = new Date().getMonth()
  return month === 6 || month === 7
}

export const CONTACT = {
  get phonePrimary() {
    return isHighSeason() ? '+33650523475' : '+33670608426'
  },
  phoneSecondary: '+33650523475',
  get phonePrimaryDisplay() {
    return isHighSeason() ? '+33 6 50 52 34 75' : '+33 6 70 60 84 26'
  },
  phoneSecondaryDisplay: '+33 6 50 52 34 75',
  whatsappNumber: '33670608426',
}

export const SOCIAL = {
  facebook: 'https://www.facebook.com/skeepskool/',
  instagram: 'https://www.instagram.com/skeepskool/',
}

export const MAPS = {
  addressSearch:
    'https://www.google.com/maps/search/?api=1&query=Skeepskool+Ecole+de+Surf+Plage+Centrale+du+Porge',
}

export const SEO_IMAGES = {
  defaultOg: `${SITE_URL}/og-skeepskool.jpg`,
}