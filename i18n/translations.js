/**
 * Oil Rigs Now — i18n Translation Engine
 * Covers: ES, FR, AR, PT, RU, ZH
 *
 * Strategy:
 *  1. Nav links targeted by href (works on every page with no HTML changes)
 *  2. Elements with data-i18n="key" attributes get text replaced
 *  3. Placeholders: data-i18n-placeholder="key"
 *  4. Arabic activates RTL on <html dir="rtl">
 */

(function () {
  'use strict';

  /* ── Translations ────────────────────────────────────────────────────── */
  var T = {
    en: {
      /* nav */
      'nav.home':            'Home',
      'nav.land':            'Land Rigs',
      'nav.mobile':          'Mobile & Workover',
      'nav.offshore':        'Offshore',
      'nav.equipment':       'Equipment',
      'nav.about':           'About',
      'nav.quote':           'Quote / RFQ',
      'nav.contact':         'Contact Us',
      'nav.translate':       'Translate',
      /* CTAs */
      'cta.browse':          'Browse All Rigs',
      'cta.quote':           'Request a Quote',
      'cta.get_quote':       'Get a Quote',
      'cta.view_details':    'View Details →',
      'cta.call':            'Call 713-565-0747',
      /* homepage hero */
      'hero.eyebrow':        'HOUSTON, TX · WORLDWIDE COVERAGE',
      'hero.h1':             'Source the World\'s Best Drilling Rigs',
      'hero.sub':            'Oil Rigs Now connects buyers and sellers of land rigs, offshore rigs, and oilfield equipment across 6 continents.',
      'hero.stat1.n':        '119+',
      'hero.stat1.l':        'Active Listings',
      'hero.stat2.n':        '350–3,600',
      'hero.stat2.l':        'HP Range',
      'hero.stat3.n':        '6',
      'hero.stat3.l':        'Continents',
      /* sections */
      'section.featured':    'Featured Equipment',
      'section.categories':  'Equipment Categories',
      'section.about_title': 'Trusted Consultants Since 2011',
      /* category cards */
      'cat.land':            'Land Drilling Rigs',
      'cat.workover':        'Workover & Mobile',
      'cat.offshore':        'Offshore Rigs',
      'cat.barge':           'Barge Rigs',
      'cat.equip':           'Oilfield Equipment',
      /* browse page */
      'browse.title':        'Drilling Rigs & Equipment',
      'browse.sub':          'Browse our global inventory of land drilling rigs, offshore rigs, workover units, and oilfield equipment.',
      'browse.search':       'Search rigs...',
      'browse.cat_label':    'Category',
      'browse.all_cat':      'All Categories',
      'browse.hp_label':     'HP Range',
      'browse.sort_label':   'Sort by',
      'browse.sort_hp_d':    'HP: High → Low',
      'browse.sort_hp_a':    'HP: Low → High',
      'browse.sort_az':      'Name A → Z',
      'browse.clear':        'Clear Filters',
      /* status */
      'status.available':    'Available',
      'status.sold':         'Sold',
      /* footer */
      'footer.equipment':    'Equipment',
      'footer.legal':        'Legal',
      'footer.privacy':      'Privacy Policy',
      'footer.terms':        'Terms of Service',
      'footer.cookies':      'Cookie Policy',
      'footer.disclaimer':   'Disclaimer',
      'footer.access':       'Accessibility',
      'footer.ai_chat':      'AI Chat Terms',
      'footer.compliance':   'Compliance',
      'footer.copy':         '© 2026 Oil Rigs Now, LLC. All rights reserved.',
      /* cookie */
      'cookie.msg':          'This website uses cookies to enhance your experience.',
      'cookie.accept':       'Accept',
      'cookie.decline':      'Decline',
    },

    es: {
      'nav.home':            'Inicio',
      'nav.land':            'Torres Terrestres',
      'nav.mobile':          'Unidades Móviles',
      'nav.offshore':        'Plataformas Marinas',
      'nav.equipment':       'Equipos',
      'nav.about':           'Acerca de',
      'nav.quote':           'Cotización / RFQ',
      'nav.contact':         'Contáctenos',
      'nav.translate':       'Traducir',
      'cta.browse':          'Ver Todos los Equipos',
      'cta.quote':           'Solicitar Cotización',
      'cta.get_quote':       'Obtener Cotización',
      'cta.view_details':    'Ver Detalles →',
      'cta.call':            'Llamar 713-565-0747',
      'hero.eyebrow':        'HOUSTON, TX · COBERTURA MUNDIAL',
      'hero.h1':             'El Mejor Origen de Equipos de Perforación',
      'hero.sub':            'Oil Rigs Now conecta compradores y vendedores de torres terrestres, plataformas marinas y equipos de perforación en 6 continentes.',
      'hero.stat1.n':        '119+',
      'hero.stat1.l':        'Listados Activos',
      'hero.stat2.n':        '350–3,600',
      'hero.stat2.l':        'Rango de HP',
      'hero.stat3.n':        '6',
      'hero.stat3.l':        'Continentes',
      'section.featured':    'Equipos Destacados',
      'section.categories':  'Categorías de Equipos',
      'section.about_title': 'Consultores de Confianza desde 2011',
      'cat.land':            'Torres de Perforación Terrestres',
      'cat.workover':        'Unidades Móviles y Workover',
      'cat.offshore':        'Plataformas Marinas',
      'cat.barge':           'Torres en Barcaza',
      'cat.equip':           'Equipos de Campo Petrolero',
      'browse.title':        'Torres y Equipos de Perforación',
      'browse.sub':          'Consulte nuestro inventario global de torres terrestres, plataformas marinas y equipos de workover.',
      'browse.search':       'Buscar equipos...',
      'browse.cat_label':    'Categoría',
      'browse.all_cat':      'Todas las Categorías',
      'browse.hp_label':     'Rango de HP',
      'browse.sort_label':   'Ordenar por',
      'browse.sort_hp_d':    'HP: Mayor → Menor',
      'browse.sort_hp_a':    'HP: Menor → Mayor',
      'browse.sort_az':      'Nombre A → Z',
      'browse.clear':        'Limpiar Filtros',
      'status.available':    'Disponible',
      'status.sold':         'Vendido',
      'footer.equipment':    'Equipos',
      'footer.legal':        'Legal',
      'footer.privacy':      'Política de Privacidad',
      'footer.terms':        'Términos de Servicio',
      'footer.cookies':      'Política de Cookies',
      'footer.disclaimer':   'Aviso Legal',
      'footer.access':       'Accesibilidad',
      'footer.ai_chat':      'Términos del Chat IA',
      'footer.compliance':   'Cumplimiento',
      'footer.copy':         '© 2026 Oil Rigs Now, LLC. Todos los derechos reservados.',
      'cookie.msg':          'Este sitio web utiliza cookies para mejorar su experiencia.',
      'cookie.accept':       'Aceptar',
      'cookie.decline':      'Rechazar',
    },

    fr: {
      'nav.home':            'Accueil',
      'nav.land':            'Derricks Terrestres',
      'nav.mobile':          'Unités Mobiles',
      'nav.offshore':        'Offshore',
      'nav.equipment':       'Équipements',
      'nav.about':           'À propos',
      'nav.quote':           'Devis / RFQ',
      'nav.contact':         'Nous contacter',
      'nav.translate':       'Traduire',
      'cta.browse':          'Voir tous les équipements',
      'cta.quote':           'Demander un devis',
      'cta.get_quote':       'Obtenir un devis',
      'cta.view_details':    'Voir les détails →',
      'cta.call':            'Appeler 713-565-0747',
      'hero.eyebrow':        'HOUSTON, TX · COUVERTURE MONDIALE',
      'hero.h1':             'La meilleure source d\'équipements de forage',
      'hero.sub':            'Oil Rigs Now met en relation acheteurs et vendeurs de derricks terrestres, plateformes offshore et équipements pétroliers sur 6 continents.',
      'hero.stat1.n':        '119+',
      'hero.stat1.l':        'Annonces actives',
      'hero.stat2.n':        '350–3 600',
      'hero.stat2.l':        'Plage HP',
      'hero.stat3.n':        '6',
      'hero.stat3.l':        'Continents',
      'section.featured':    'Équipements en vedette',
      'section.categories':  'Catégories d\'équipements',
      'section.about_title': 'Consultants de confiance depuis 2011',
      'cat.land':            'Derricks de forage terrestres',
      'cat.workover':        'Unités mobiles et workover',
      'cat.offshore':        'Plateformes offshore',
      'cat.barge':           'Derricks sur barge',
      'cat.equip':           'Équipements pétroliers',
      'browse.title':        'Derricks et équipements de forage',
      'browse.sub':          'Parcourez notre inventaire mondial de derricks terrestres, plateformes offshore et unités de workover.',
      'browse.search':       'Rechercher des équipements...',
      'browse.cat_label':    'Catégorie',
      'browse.all_cat':      'Toutes les catégories',
      'browse.hp_label':     'Plage HP',
      'browse.sort_label':   'Trier par',
      'browse.sort_hp_d':    'HP : Élevé → Faible',
      'browse.sort_hp_a':    'HP : Faible → Élevé',
      'browse.sort_az':      'Nom A → Z',
      'browse.clear':        'Effacer les filtres',
      'status.available':    'Disponible',
      'status.sold':         'Vendu',
      'footer.equipment':    'Équipements',
      'footer.legal':        'Mentions légales',
      'footer.privacy':      'Politique de confidentialité',
      'footer.terms':        'Conditions d\'utilisation',
      'footer.cookies':      'Politique des cookies',
      'footer.disclaimer':   'Avertissement',
      'footer.access':       'Accessibilité',
      'footer.ai_chat':      'Conditions du chat IA',
      'footer.compliance':   'Conformité',
      'footer.copy':         '© 2026 Oil Rigs Now, LLC. Tous droits réservés.',
      'cookie.msg':          'Ce site utilise des cookies pour améliorer votre expérience.',
      'cookie.accept':       'Accepter',
      'cookie.decline':      'Refuser',
    },

    ar: {
      'nav.home':            'الرئيسية',
      'nav.land':            'منصات الحفر البرية',
      'nav.mobile':          'وحدات متنقلة',
      'nav.offshore':        'منصات بحرية',
      'nav.equipment':       'المعدات',
      'nav.about':           'عن الشركة',
      'nav.quote':           'طلب عرض سعر',
      'nav.contact':         'اتصل بنا',
      'nav.translate':       'ترجمة',
      'cta.browse':          'تصفح جميع المعدات',
      'cta.quote':           'طلب عرض سعر',
      'cta.get_quote':       'الحصول على عرض سعر',
      'cta.view_details':    'عرض التفاصيل →',
      'cta.call':            'اتصل بنا 713-565-0747',
      'hero.eyebrow':        'هيوستن، تكساس · تغطية عالمية',
      'hero.h1':             'مصدرك الأول لأفضل معدات الحفر في العالم',
      'hero.sub':            'تربط شركة Oil Rigs Now المشترين والبائعين لمنصات الحفر البرية والبحرية والمعدات النفطية عبر 6 قارات.',
      'hero.stat1.n':        '+119',
      'hero.stat1.l':        'إعلانات نشطة',
      'hero.stat2.n':        '350–3,600',
      'hero.stat2.l':        'نطاق القوة الحصانية',
      'hero.stat3.n':        '6',
      'hero.stat3.l':        'قارات',
      'section.featured':    'المعدات المميزة',
      'section.categories':  'فئات المعدات',
      'section.about_title': 'مستشارون موثوقون منذ 2011',
      'cat.land':            'منصات الحفر البرية',
      'cat.workover':        'وحدات الإصلاح المتنقلة',
      'cat.offshore':        'منصات الحفر البحرية',
      'cat.barge':           'منصات على البارجة',
      'cat.equip':           'معدات حقول النفط',
      'browse.title':        'منصات الحفر والمعدات',
      'browse.sub':          'تصفح مخزوننا العالمي من منصات الحفر البرية والبحرية ووحدات الإصلاح.',
      'browse.search':       'البحث عن معدات...',
      'browse.cat_label':    'الفئة',
      'browse.all_cat':      'جميع الفئات',
      'browse.hp_label':     'نطاق القوة',
      'browse.sort_label':   'ترتيب حسب',
      'browse.sort_hp_d':    'القوة: من الأعلى',
      'browse.sort_hp_a':    'القوة: من الأدنى',
      'browse.sort_az':      'الاسم أ → ي',
      'browse.clear':        'مسح الفلاتر',
      'status.available':    'متاح',
      'status.sold':         'مُباع',
      'footer.equipment':    'المعدات',
      'footer.legal':        'قانوني',
      'footer.privacy':      'سياسة الخصوصية',
      'footer.terms':        'شروط الخدمة',
      'footer.cookies':      'سياسة الكوكيز',
      'footer.disclaimer':   'إخلاء المسؤولية',
      'footer.access':       'إمكانية الوصول',
      'footer.ai_chat':      'شروط الدردشة الذكية',
      'footer.compliance':   'الامتثال',
      'footer.copy':         '© 2026 Oil Rigs Now, LLC. جميع الحقوق محفوظة.',
      'cookie.msg':          'يستخدم هذا الموقع ملفات تعريف الارتباط لتحسين تجربتك.',
      'cookie.accept':       'قبول',
      'cookie.decline':      'رفض',
    },

    pt: {
      'nav.home':            'Início',
      'nav.land':            'Sondas Terrestres',
      'nav.mobile':          'Unidades Móveis',
      'nav.offshore':        'Offshore',
      'nav.equipment':       'Equipamentos',
      'nav.about':           'Sobre',
      'nav.quote':           'Orçamento / RFQ',
      'nav.contact':         'Contate-nos',
      'nav.translate':       'Traduzir',
      'cta.browse':          'Ver Todos os Equipamentos',
      'cta.quote':           'Solicitar Orçamento',
      'cta.get_quote':       'Obter Orçamento',
      'cta.view_details':    'Ver Detalhes →',
      'cta.call':            'Ligar 713-565-0747',
      'hero.eyebrow':        'HOUSTON, TX · COBERTURA MUNDIAL',
      'hero.h1':             'A Melhor Fonte de Equipamentos de Perfuração',
      'hero.sub':            'A Oil Rigs Now conecta compradores e vendedores de sondas terrestres, plataformas offshore e equipamentos de campo em 6 continentes.',
      'hero.stat1.n':        '119+',
      'hero.stat1.l':        'Anúncios Ativos',
      'hero.stat2.n':        '350–3.600',
      'hero.stat2.l':        'Faixa de HP',
      'hero.stat3.n':        '6',
      'hero.stat3.l':        'Continentes',
      'section.featured':    'Equipamentos em Destaque',
      'section.categories':  'Categorias de Equipamentos',
      'section.about_title': 'Consultores de Confiança desde 2011',
      'cat.land':            'Sondas de Perfuração Terrestres',
      'cat.workover':        'Unidades Móveis e Workover',
      'cat.offshore':        'Plataformas Offshore',
      'cat.barge':           'Sondas em Balsa',
      'cat.equip':           'Equipamentos de Campo',
      'browse.title':        'Sondas e Equipamentos de Perfuração',
      'browse.sub':          'Consulte nosso inventário global de sondas terrestres, plataformas offshore e unidades de workover.',
      'browse.search':       'Buscar equipamentos...',
      'browse.cat_label':    'Categoria',
      'browse.all_cat':      'Todas as Categorias',
      'browse.hp_label':     'Faixa de HP',
      'browse.sort_label':   'Ordenar por',
      'browse.sort_hp_d':    'HP: Maior → Menor',
      'browse.sort_hp_a':    'HP: Menor → Maior',
      'browse.sort_az':      'Nome A → Z',
      'browse.clear':        'Limpar Filtros',
      'status.available':    'Disponível',
      'status.sold':         'Vendido',
      'footer.equipment':    'Equipamentos',
      'footer.legal':        'Legal',
      'footer.privacy':      'Política de Privacidade',
      'footer.terms':        'Termos de Serviço',
      'footer.cookies':      'Política de Cookies',
      'footer.disclaimer':   'Aviso Legal',
      'footer.access':       'Acessibilidade',
      'footer.ai_chat':      'Termos do Chat IA',
      'footer.compliance':   'Conformidade',
      'footer.copy':         '© 2026 Oil Rigs Now, LLC. Todos os direitos reservados.',
      'cookie.msg':          'Este site usa cookies para melhorar sua experiência.',
      'cookie.accept':       'Aceitar',
      'cookie.decline':      'Recusar',
    },

    ru: {
      'nav.home':            'Главная',
      'nav.land':            'Наземные буровые установки',
      'nav.mobile':          'Мобильные установки',
      'nav.offshore':        'Морские платформы',
      'nav.equipment':       'Оборудование',
      'nav.about':           'О компании',
      'nav.quote':           'Запрос цены',
      'nav.contact':         'Связаться',
      'nav.translate':       'Перевод',
      'cta.browse':          'Смотреть все установки',
      'cta.quote':           'Запросить цену',
      'cta.get_quote':       'Получить цену',
      'cta.view_details':    'Подробнее →',
      'cta.call':            'Позвонить 713-565-0747',
      'hero.eyebrow':        'ХЬЮСТОН, ТЕХАС · ГЛОБАЛЬНОЕ ПОКРЫТИЕ',
      'hero.h1':             'Лучшие буровые установки мира',
      'hero.sub':            'Oil Rigs Now связывает покупателей и продавцов наземных буровых установок, морских платформ и нефтепромыслового оборудования на 6 континентах.',
      'hero.stat1.n':        '119+',
      'hero.stat1.l':        'Активных объявлений',
      'hero.stat2.n':        '350–3 600',
      'hero.stat2.l':        'Мощность, л.с.',
      'hero.stat3.n':        '6',
      'hero.stat3.l':        'Континентов',
      'section.featured':    'Избранное оборудование',
      'section.categories':  'Категории оборудования',
      'section.about_title': 'Надёжные консультанты с 2011 года',
      'cat.land':            'Наземные буровые установки',
      'cat.workover':        'Мобильные и ремонтные установки',
      'cat.offshore':        'Морские буровые платформы',
      'cat.barge':           'Буровые на баржах',
      'cat.equip':           'Нефтепромысловое оборудование',
      'browse.title':        'Буровые установки и оборудование',
      'browse.sub':          'Просмотрите наш глобальный инвентарь наземных буровых, морских платформ и оборудования для ремонта.',
      'browse.search':       'Поиск установок...',
      'browse.cat_label':    'Категория',
      'browse.all_cat':      'Все категории',
      'browse.hp_label':     'Мощность (л.с.)',
      'browse.sort_label':   'Сортировать',
      'browse.sort_hp_d':    'Мощность: По убыванию',
      'browse.sort_hp_a':    'Мощность: По возрастанию',
      'browse.sort_az':      'Название А → Я',
      'browse.clear':        'Сбросить фильтры',
      'status.available':    'Доступно',
      'status.sold':         'Продано',
      'footer.equipment':    'Оборудование',
      'footer.legal':        'Правовая информация',
      'footer.privacy':      'Политика конфиденциальности',
      'footer.terms':        'Условия обслуживания',
      'footer.cookies':      'Политика cookies',
      'footer.disclaimer':   'Отказ от ответственности',
      'footer.access':       'Доступность',
      'footer.ai_chat':      'Условия ИИ-чата',
      'footer.compliance':   'Соответствие требованиям',
      'footer.copy':         '© 2026 Oil Rigs Now, LLC. Все права защищены.',
      'cookie.msg':          'Этот сайт использует файлы cookie для улучшения вашего опыта.',
      'cookie.accept':       'Принять',
      'cookie.decline':      'Отклонить',
    },

    zh: {
      'nav.home':            '首页',
      'nav.land':            '陆地钻机',
      'nav.mobile':          '移动修井机',
      'nav.offshore':        '海上钻井平台',
      'nav.equipment':       '钻井设备',
      'nav.about':           '关于我们',
      'nav.quote':           '询价 / RFQ',
      'nav.contact':         '联系我们',
      'nav.translate':       '翻译',
      'cta.browse':          '浏览所有钻机',
      'cta.quote':           '申请报价',
      'cta.get_quote':       '获取报价',
      'cta.view_details':    '查看详情 →',
      'cta.call':            '拨打 713-565-0747',
      'hero.eyebrow':        '休斯顿，德克萨斯州 · 全球覆盖',
      'hero.h1':             '全球最优质钻探设备的首选来源',
      'hero.sub':            'Oil Rigs Now 连接全球6大洲陆地钻机、海上钻井平台及油田设备的买卖双方。',
      'hero.stat1.n':        '119+',
      'hero.stat1.l':        '活跃列表',
      'hero.stat2.n':        '350–3,600',
      'hero.stat2.l':        '马力范围',
      'hero.stat3.n':        '6',
      'hero.stat3.l':        '大洲',
      'section.featured':    '精选设备',
      'section.categories':  '设备类别',
      'section.about_title': '2011年以来值得信赖的顾问',
      'cat.land':            '陆地钻机',
      'cat.workover':        '移动修井机',
      'cat.offshore':        '海上钻井平台',
      'cat.barge':           '驳船钻井平台',
      'cat.equip':           '油田设备',
      'browse.title':        '钻机与钻井设备',
      'browse.sub':          '浏览我们的全球陆地钻机、海上平台和修井机库存。',
      'browse.search':       '搜索钻机...',
      'browse.cat_label':    '类别',
      'browse.all_cat':      '所有类别',
      'browse.hp_label':     '马力范围',
      'browse.sort_label':   '排序方式',
      'browse.sort_hp_d':    '马力：从高到低',
      'browse.sort_hp_a':    '马力：从低到高',
      'browse.sort_az':      '名称 A → Z',
      'browse.clear':        '清除筛选',
      'status.available':    '可售',
      'status.sold':         '已售',
      'footer.equipment':    '设备',
      'footer.legal':        '法律信息',
      'footer.privacy':      '隐私政策',
      'footer.terms':        '服务条款',
      'footer.cookies':      'Cookie 政策',
      'footer.disclaimer':   '免责声明',
      'footer.access':       '无障碍',
      'footer.ai_chat':      'AI 聊天条款',
      'footer.compliance':   '合规',
      'footer.copy':         '© 2026 Oil Rigs Now, LLC. 版权所有。',
      'cookie.msg':          '本网站使用 Cookie 来改善您的体验。',
      'cookie.accept':       '接受',
      'cookie.decline':      '拒绝',
    }
  };

  /* ── Nav href → translation key mapping ────────────────────────────── */
  var NAV_MAP = {
    '/':                        'nav.home',
    '/land-drilling-rigs/':     'nav.land',
    '/mobile-workover-rigs/':   'nav.mobile',
    '/offshore-rigs/':          'nav.offshore',
    '/oilfield-equipment/':     'nav.equipment',
    '/about/':                  'nav.about',
    '/quote/':                  'nav.quote',
    '/contact/':                'nav.contact',
  };

  /* ── Apply translations ──────────────────────────────────────────────── */
  function applyLang(lang) {
    var d = T[lang] || T['en'];

    // 1. RTL for Arabic
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.removeAttribute('dir');
      document.documentElement.setAttribute('lang', lang || 'en');
    }

    // 2. Nav links by href
    document.querySelectorAll('a[href]').forEach(function (el) {
      var href = el.getAttribute('href');
      var key = NAV_MAP[href];
      if (key && d[key]) {
        // Only replace if the element contains just text (not an img or other tag)
        if (!el.querySelector('img') && el.children.length === 0) {
          el.textContent = d[key];
        }
      }
    });

    // 3. data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (d[key] !== undefined) {
        el.textContent = d[key];
      }
    });

    // 4. data-i18n-placeholder (for inputs)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (d[key] !== undefined) {
        el.setAttribute('placeholder', d[key]);
      }
    });

    // 5. data-i18n-aria (for aria-label)
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (d[key] !== undefined) {
        el.setAttribute('aria-label', d[key]);
      }
    });

    // 6. Language bar label
    var lbl = document.querySelector('.lang-bar__label');
    if (lbl && d['nav.translate']) lbl.textContent = d['nav.translate'];
  }

  /* ── Language bar buttons ────────────────────────────────────────────── */
  function initLangBar() {
    var btns = document.querySelectorAll('.lang-bar__btn');
    if (!btns.length) return;

    var saved = localStorage.getItem('orn_lang') || 'en';

    // Apply saved language on page load
    applyLang(saved);

    // Mark active button
    btns.forEach(function (btn) {
      if (btn.dataset.lang === saved) {
        btn.classList.add('active');
        btn.setAttribute('aria-current', 'true');
      }
      btn.addEventListener('click', function () {
        btns.forEach(function (b) {
          b.classList.remove('active');
          b.removeAttribute('aria-current');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-current', 'true');
        var lang = btn.dataset.lang;
        document.documentElement.setAttribute('data-lang', lang);
        localStorage.setItem('orn_lang', lang);
        applyLang(lang);
      });
    });
  }

  /* ── Init ────────────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLangBar);
  } else {
    initLangBar();
  }

})();
