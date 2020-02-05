import axios from 'axios'

/* eslint-disable camelcase */
export default async ({ store }) => {
  const baseUrl = process.env.baseUrl

  if (store.state.products.products.length === 0) {
    let { data: contact } = await axios.get(`${baseUrl}/kontakt`)
    contact = contact.map(
      ({
        Naglowek_PL,
        Naglowek_EN,
        Tekst_PL,
        Tekst_EN,
        Telefon,
        Telefon2,
        Mail,
        Adres,
        Facebook,
        Instagram
      }) => ({
        titlePl: Naglowek_PL,
        titleEn: Naglowek_EN,
        txtPl: Tekst_PL,
        txtEn: Tekst_EN,
        tel: Telefon,
        tel2: Telefon2,
        mail: Mail,
        address: Adres.replace(/\n/g, '<br/>'),
        facebook: Facebook,
        instagram: Instagram
      })
    )

    let { data: products } = await axios.get(`${baseUrl}/produkty?_sort=Order`)
    products = products.map(
      ({
        id,
        Nazwa_PL,
        Nazwa_EN,
        Slug_PL,
        Slug_EN,
        Opis_PL,
        Opis_EN,
        Rocznik,
        WNajnowszych,
        EtykietaNajnowsza,
        Dostepna,
        Pojemnosci_,
        Cechy,
        Miniatura,
        nagrody
      }) => ({
        id,
        namePl: Nazwa_PL,
        nameEn: Nazwa_EN,
        slugPl: Slug_PL,
        slugEn: Slug_EN,
        descPl: Opis_PL,
        descEn: Opis_EN,
        year: Rocznik,
        isRecent: WNajnowszych,
        recentLabel: EtykietaNajnowsza,
        available: Dostepna,
        volumes: Pojemnosci_
          ? Pojemnosci_.map(({ id, Wartosc, Zdjecie }) => ({
              id,
              value: Wartosc,
              photo: baseUrl + Zdjecie.url
            }))
          : [],
        features: Cechy
          ? Cechy.map(({ id, Nazwa_PL, Nazwa_EN }) => ({
              id,
              namePl: Nazwa_PL,
              nameEn: Nazwa_EN
            }))
          : [],
        thumb: baseUrl + Miniatura.url,
        awards: nagrody
          ? nagrody.map(({ id, Nazwa, Logo }) => ({
              id,
              name: Nazwa,
              logo: baseUrl + Logo.url
            }))
          : []
      })
    )

    store.commit('contact/fill', contact[0])
    store.commit('products/fill', products)
  }
}
/* eslint-enable camelcase */
