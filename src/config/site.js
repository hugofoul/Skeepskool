export const SITE_URL = 'https://www.leporge-ecoledesurf.com'

// En juillet et août, le numéro mis en avant est celui de la plage.
export const isHighSeason = (date = new Date()) => {
  const month = date.getMonth()
  return month === 6 || month === 7
}

export const PHONES = {
  default: { tel: '+33670608426', display: '+33 6 70 60 84 26' },
  highSeason: { tel: '+33650523475', display: '+33 6 50 52 34 75' },
}

export const CONTACT = {
  phoneSecondary: '+33650523475',
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