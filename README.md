# 🎥 YouTube Clone

A modern, responsive YouTube clone built with Next.js and React, featuring mobile-first design and YouTube Shorts functionality.

*Modern, responsive YouTube klonu - Next.js ve React ile geliştirilmiş, mobil öncelikli tasarım ve YouTube Shorts özelliği ile.*

## ✨ Features / Özellikler

### 🇺🇸 English
- **📱 Mobile-First Design**: Fully responsive design optimized for all devices
- **🎬 YouTube Shorts Player**: Vertical video player with touch controls
- **🔍 Smart Search**: Real-time search suggestions with autocomplete
- **🎨 Modern UI**: Clean, modern interface inspired by YouTube's design
- **🌙 Dark Mode Support**: Built-in dark/light theme switching
- **📺 Video Streaming**: Integrated video player with ReactPlayer
- **🎯 Responsive Navigation**: Adaptive sidebar and mobile-friendly navigation
- **⚡ Performance Optimized**: Server-side rendering with Next.js
- **🎭 Smooth Animations**: Framer Motion powered animations
- **🔄 Dynamic Routing**: Next.js dynamic routing for video pages

### 🇹🇷 Türkçe
- **📱 Mobil Öncelikli Tasarım**: Tüm cihazlar için optimize edilmiş tam responsive tasarım
- **🎬 YouTube Shorts Oynatıcı**: Dokunmatik kontrollerle dikey video oynatıcı
- **🔍 Akıllı Arama**: Otomatik tamamlama ile gerçek zamanlı arama önerileri
- **🎨 Modern Arayüz**: YouTube'dan ilham alınmış temiz, modern arayüz
- **🌙 Karanlık Mod Desteği**: Yerleşik karanlık/açık tema değiştirme
- **📺 Video Akışı**: ReactPlayer ile entegre video oynatıcı
- **🎯 Responsive Navigasyon**: Uyarlanabilir kenar çubuğu ve mobil dostu navigasyon
- **⚡ Performans Optimizasyonu**: Next.js ile sunucu tarafı rendering
- **🎭 Akıcı Animasyonlar**: Framer Motion destekli animasyonlar
- **🔄 Dinamik Yönlendirme**: Video sayfaları için Next.js dinamik yönlendirme

## 🛠️ Technologies Used / Kullanılan Teknolojiler

### Frontend
- **[Next.js 13+](https://nextjs.org/)** - React framework with SSR
- **[React 18](https://reactjs.org/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[React Player](https://github.com/cookpete/react-player)** - Video player component
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library
- **[Axios](https://axios-http.com/)** - HTTP client

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Autoprefixer](https://autoprefixer.github.io/)** - CSS vendor prefixes

## 🚀 Getting Started / Başlangıç

### Prerequisites / Gereksinimler
- Node.js 16.8 or later
- npm or yarn package manager

### Installation / Kurulum

```bash
# Clone the repository / Repoyu klonlayın
git clone https://github.com/sw3do/youtube-clone.git

# Navigate to project directory / Proje dizinine gidin
cd youtube-clone

# Install dependencies / Bağımlılıkları yükleyin
npm install
# or / veya
yarn install

# Run development server / Geliştirme sunucusunu başlatın
npm run dev
# or / veya
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

*Sonucu görmek için tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.*

## 📱 Mobile Features / Mobil Özellikler

### 🇺🇸 English
- **Touch Controls**: Tap to show/hide video controls
- **Vertical Video Player**: Optimized for mobile viewing
- **Swipe Navigation**: Smooth navigation between videos
- **Mobile Search**: Full-screen search experience
- **Responsive Sidebar**: Overlay navigation on mobile
- **Touch-Friendly Buttons**: Large, accessible touch targets

### 🇹🇷 Türkçe
- **Dokunmatik Kontroller**: Video kontrollerini göstermek/gizlemek için dokunun
- **Dikey Video Oynatıcı**: Mobil görüntüleme için optimize edilmiş
- **Kaydırma Navigasyonu**: Videolar arası akıcı navigasyon
- **Mobil Arama**: Tam ekran arama deneyimi
- **Responsive Kenar Çubuğu**: Mobilde overlay navigasyon
- **Dokunma Dostu Butonlar**: Büyük, erişilebilir dokunma alanları

## 🎨 Design System / Tasarım Sistemi

### Color Palette / Renk Paleti
- **Primary**: Red (#DC2626) - YouTube brand color
- **Background**: White/Black - Light/Dark mode
- **Text**: Gray scale for hierarchy
- **Accent**: Blue (#2563EB) for verification badges

### Typography / Tipografi
- **Font Family**: System fonts for optimal performance
- **Responsive Sizes**: Adaptive text sizing for all devices

## 📂 Project Structure / Proje Yapısı

```
src/
├── components/          # Reusable UI components / Yeniden kullanılabilir UI bileşenleri
│   ├── Layout.tsx      # Main layout wrapper / Ana layout sarmalayıcı
│   └── ...
├── pages/              # Next.js pages / Next.js sayfaları
│   ├── index.tsx       # Homepage / Ana sayfa
│   ├── shorts/         # Shorts pages / Shorts sayfaları
│   │   └── [shortId].tsx
│   └── ...
├── utils/              # Utility functions / Yardımcı fonksiyonlar
│   └── videoUtils.ts   # Video processing utilities
└── styles/             # Global styles / Global stiller
    └── globals.css
```

## 🔧 Configuration / Yapılandırma

### Tailwind CSS
Custom breakpoints for mobile optimization:
```javascript
screens: {
  'xs': '475px',  // Extra small devices
}
```

### Next.js
- Dynamic imports for performance
- Image optimization
- API routes for backend functionality

## 🌟 Key Components / Ana Bileşenler

### Layout Component
- Responsive header with search
- Adaptive sidebar navigation
- Mobile-first design approach

### Shorts Player
- Full-screen vertical video player
- Touch-based controls
- Related videos sidebar
- Mobile overlay for related content

## 📱 Responsive Breakpoints / Responsive Kesme Noktaları

- **xs**: 475px+ (Extra small phones)
- **sm**: 640px+ (Small phones)
- **md**: 768px+ (Tablets)
- **lg**: 1024px+ (Laptops)
- **xl**: 1280px+ (Desktops)

## 🚀 Performance Features / Performans Özellikleri

- **Server-Side Rendering**: Fast initial page loads
- **Dynamic Imports**: Code splitting for better performance
- **Image Optimization**: Next.js automatic image optimization
- **Lazy Loading**: Components loaded on demand

## 🤝 Contributing / Katkıda Bulunma

### 🇺🇸 English
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 🇹🇷 Türkçe
1. Projeyi fork edin
2. Özellik dalınızı oluşturun (`git checkout -b feature/HarikaBirOzellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Harika bir özellik ekle'`)
4. Dalınıza push yapın (`git push origin feature/HarikaBirOzellik`)
5. Pull Request açın

## 🐛 Bug Reports & Issues / Hata Raporları & Sorunlar

### 🇺🇸 English
Found a bug or have a suggestion? We'd love to hear from you!

**Before submitting an issue:**
- Check if the issue already exists in our [Issues](https://github.com/sw3do/youtube-clone/issues) page
- Make sure you're using the latest version
- Try to reproduce the issue in a clean environment

**When reporting a bug, please include:**
- **Device/Browser**: What device and browser you're using
- **Steps to Reproduce**: Clear steps to reproduce the issue
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Screenshots**: If applicable, add screenshots to help explain
- **Console Errors**: Any error messages from browser console

**For feature requests:**
- Describe the feature you'd like to see
- Explain why it would be useful
- Provide examples or mockups if possible

[**🐛 Report a Bug**](https://github.com/sw3do/youtube-clone/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D)

[**✨ Request a Feature**](https://github.com/sw3do/youtube-clone/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFEATURE%5D)

### 🇹🇷 Türkçe
Bir hata buldunuz veya öneriniz mi var? Sizden haber almak isteriz!

**Issue göndermeden önce:**
- [Issues](https://github.com/sw3do/youtube-clone/issues) sayfasında sorunun zaten mevcut olup olmadığını kontrol edin
- En son sürümü kullandığınızdan emin olun
- Sorunu temiz bir ortamda yeniden oluşturmaya çalışın

**Hata bildirirken lütfen şunları ekleyin:**
- **Cihaz/Tarayıcı**: Hangi cihaz ve tarayıcı kullandığınız
- **Yeniden Oluşturma Adımları**: Sorunu yeniden oluşturmak için net adımlar
- **Beklenen Davranış**: Ne olmasını beklediğiniz
- **Gerçek Davranış**: Gerçekte ne olduğu
- **Ekran Görüntüleri**: Varsa, açıklamaya yardımcı olacak ekran görüntüleri
- **Konsol Hataları**: Tarayıcı konsolundan gelen hata mesajları

**Özellik istekleri için:**
- Görmek istediğiniz özelliği açıklayın
- Neden yararlı olacağını açıklayın
- Mümkünse örnekler veya mockup'lar sağlayın

[**🐛 Hata Bildir**](https://github.com/sw3do/youtube-clone/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BHATA%5D)

[**✨ Özellik İste**](https://github.com/sw3do/youtube-clone/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BOZELLIK%5D)

## 📄 License / Lisans

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

*Bu proje MIT Lisansı altında lisanslanmıştır - detaylar için [LICENSE](LICENSE) dosyasına bakın.*

## 🙏 Acknowledgments / Teşekkürler

- YouTube for design inspiration
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations

---

**Made with ❤️ by sw3do**

*❤️ ile sw3do tarafından yapıldı*
