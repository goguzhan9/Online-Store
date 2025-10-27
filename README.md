# Online Store

Modern React tabanlı bir e-ticaret arayüzü. Üye girişi, kayıt, ürün listeleme ve sepet yönetimi gibi temel mağaza akışlarını Bootstrap temelli bir tasarımla simüle eder.

## Öne Çıkanlar
- React Router ile çok sayfalı deneyim
- Mock auth servisi ve `localStorage` temelli oturum yönetimi
- Context API ile sepet durumu, ürün ekleme/çıkarma ve toplam tutar hesaplama
- Bootstrap 5 ve özel CSS ile responsive arayüz
- Unsplash görselleriyle zenginleştirilmiş dummy ürün kataloğu

## Kurulum
```bash
npm install
```

## Geliştirme
```bash
npm start
```
`http://localhost:3000/` adresinde uygulama çalışır. Port doluysa mevcut süreci sonlandırmanız gerekir.

## Test
```bash
npm test -- --watchAll=false
```

## Üretim için Derleme
```bash
npm run build
```
`build/` klasörü optimize edilmiş çıktı içerir.

## Mimari Notlar
- `src/pages/` sekmeler (Home, Products, Login, Signup, Cart)
- `src/components/` ortak bileşenler (Navbar, Footer, ProductCard, ProtectedRoute)
- `src/context/` yetkilendirme ve sepet için Context sağlayıcıları
- `src/services/` mock auth ve ürün servisleri
- `src/assets/products.json` dummy ürün verileri

Backend entegrasyonu bulunmadığından form submitleri mock servisler üzerinden çalışır; gelişmiş senaryolar için gerçek API uçları eklenmelidir.
