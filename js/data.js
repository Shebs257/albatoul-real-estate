/* =========================================================
   Dummy demo data — projects & testimonials (AR + EN)
   Replace with real content / an API when going live.

   `city` drives the project filter: 'nasr' (Nasr City, the
   established portfolio) or 'newcairo' (the upcoming ones).
   ========================================================= */

const SITE = {
  whatsapp: '201270780700',      // digits only, with country code
  phone: '01270780700',
  phoneIntl: '+201270780700',
  email: 'info@albatoul.com',

  // Head office. `maps` is the shareable link (opens the Google Maps app on
  // phones); `lat`/`lng` drive the embedded map, which needs no API key.
  maps: 'https://maps.app.goo.gl/xAknRrb5VtDqPNbs9',
  lat: 30.1039616,
  lng: 31.2901632
};

const PROJECTS = [
  {
    id: 'batoul-tower',
    img: 'assets/img/project-3.jpg',
    city: 'nasr',
    status: 'ready',
    ar: {
      name: 'برج البتول',
      location: 'عباس العقاد، مدينة نصر',
      type: 'شقق ودوبلكس',
      desc: 'برج سكني من 12 طابقاً على شارع عباس العقاد، يضم شققاً ودوبلكس بتشطيب كامل، مع جراج خاص وأمن على مدار الساعة ومصاعد بمواصفات أوروبية.',
      area: '110 - 240 م²',
      units: '96 وحدة',
      delivery: 'تم التسليم'
    },
    en: {
      name: 'Al Batoul Tower',
      location: 'Abbas El Akkad, Nasr City',
      type: 'Apartments & duplexes',
      desc: 'A 12-storey residential tower on Abbas El Akkad, offering fully finished apartments and duplexes with private parking, 24/7 security and European-specification lifts.',
      area: '110 - 240 m²',
      units: '96 units',
      delivery: 'Delivered'
    }
  },
  {
    id: 'batoul-plaza',
    img: 'assets/img/project-8.jpg',
    city: 'nasr',
    status: 'ready',
    ar: {
      name: 'البتول بلازا',
      location: 'مكرم عبيد، مدينة نصر',
      type: 'وحدات إدارية وتجارية',
      desc: 'مبنى إداري وتجاري في قلب مكرم عبيد، بواجهة زجاجية وتقسيمات مرنة للمساحات، ونظام إدارة مبانٍ متكامل مع مولد كهرباء احتياطي وموقف سيارات بالبدروم.',
      area: '55 - 300 م²',
      units: '120 وحدة',
      delivery: 'تم التسليم'
    },
    en: {
      name: 'Al Batoul Plaza',
      location: 'Makram Ebeid, Nasr City',
      type: 'Offices & retail',
      desc: 'An office and retail building in the heart of Makram Ebeid, with a glazed facade, flexible floor plates, integrated building management, a backup generator and basement parking.',
      area: '55 - 300 m²',
      units: '120 units',
      delivery: 'Delivered'
    }
  },
  {
    id: 'batoul-gardens',
    img: 'assets/img/project-6.jpg',
    city: 'nasr',
    status: 'ready',
    ar: {
      name: 'حدائق البتول',
      location: 'زهراء مدينة نصر',
      type: 'شقق بحديقة وبنتهاوس',
      desc: 'مجموعة مبانٍ منخفضة الارتفاع وسط مساحات خضراء مفتوحة في زهراء مدينة نصر، تضم شققاً أرضية بحدائق خاصة وبنتهاوس بروف، مع منطقة ألعاب للأطفال ومسارات مشي.',
      area: '130 - 265 م²',
      units: '84 وحدة',
      delivery: 'تم التسليم'
    },
    en: {
      name: 'Al Batoul Gardens',
      location: 'Zahraa Nasr City',
      type: 'Garden apartments & penthouses',
      desc: 'A cluster of low-rise buildings set in open landscape in Zahraa Nasr City, with ground-floor garden apartments and roof penthouses, a children’s play area and walking paths.',
      area: '130 - 265 m²',
      units: '84 units',
      delivery: 'Delivered'
    }
  },
  {
    id: 'batoul-heights',
    img: 'assets/img/project-5.jpg',
    city: 'nasr',
    status: 'construction',
    ar: {
      name: 'مرتفعات البتول',
      location: 'الحي العاشر، مدينة نصر',
      type: 'شقق سكنية',
      desc: 'مشروع سكني في الحي العاشر بتصميم يراعي التهوية والإضاءة الطبيعية لكل وحدة، مع واجهات حجرية ومدخل رئيسي بتشطيب فاخر وغرفة لخدمات السكان.',
      area: '120 - 210 م²',
      units: '132 وحدة',
      delivery: 'الربع الثاني 2028'
    },
    en: {
      name: 'Al Batoul Heights',
      location: 'Tenth District, Nasr City',
      type: 'Residential apartments',
      desc: 'A residential development in the Tenth District, designed so every unit gets cross-ventilation and natural light, with stone-clad facades, a premium main lobby and a residents’ services room.',
      area: '120 - 210 m²',
      units: '132 units',
      delivery: 'Q2 2028'
    }
  },
  {
    id: 'batoul-mall',
    img: 'assets/img/project-7.jpg',
    city: 'nasr',
    status: 'construction',
    ar: {
      name: 'البتول مول',
      location: 'مصطفى النحاس، مدينة نصر',
      type: 'محلات ومطاعم وعيادات',
      desc: 'مركز تجاري على شارع مصطفى النحاس بكثافة مرورية عالية، يجمع محلات تجارية ومنطقة مطاعم ودوراً كاملاً للعيادات بمدخل ومصعد مستقلين.',
      area: '40 - 180 م²',
      units: '86 وحدة',
      delivery: 'الربع الرابع 2028'
    },
    en: {
      name: 'Al Batoul Mall',
      location: 'Mostafa El Nahas, Nasr City',
      type: 'Retail, dining & clinics',
      desc: 'A retail centre on the high-traffic Mostafa El Nahas street, combining shops, a dining area and a full floor of clinics with their own separate entrance and lift.',
      area: '40 - 180 m²',
      units: '86 units',
      delivery: 'Q4 2028'
    }
  },
  {
    id: 'batoul-residence',
    img: 'assets/img/project-9.jpg',
    city: 'nasr',
    status: 'construction',
    ar: {
      name: 'البتول ريزيدنس',
      location: 'حي السفارات، مدينة نصر',
      type: 'شقق ودوبلكس',
      desc: 'مبنى سكني هادئ في حي السفارات بعدد محدود من الوحدات في كل دور، بتشطيبات داخلية عصرية ومساحات مشتركة مصممة بعناية ومدخل خاص للخدمات.',
      area: '145 - 280 م²',
      units: '48 وحدة',
      delivery: 'الربع الأول 2029'
    },
    en: {
      name: 'Al Batoul Residence',
      location: 'Embassies District, Nasr City',
      type: 'Apartments & duplexes',
      desc: 'A quiet residential building in the Embassies District with only a handful of units per floor, contemporary interior finishes, carefully designed common areas and a separate service entrance.',
      area: '145 - 280 m²',
      units: '48 units',
      delivery: 'Q1 2029'
    }
  },
  {
    id: 'batoul-oasis',
    img: 'assets/img/project-2.jpg',
    city: 'newcairo',
    status: 'launching',
    ar: {
      name: 'واحة البتول',
      location: 'التجمع الخامس، القاهرة الجديدة',
      type: 'فيلات وتاون هاوس',
      desc: 'أول مشروعاتنا في القاهرة الجديدة: مجتمع سكني مغلق تشغل المساحات الخضراء والبحيرات معظم مساحته، مع نادٍ اجتماعي ومسارات للجري والدراجات.',
      area: '210 - 480 م²',
      units: '184 وحدة',
      delivery: 'الربع الثالث 2030'
    },
    en: {
      name: 'Al Batoul Oasis',
      location: 'Fifth Settlement, New Cairo',
      type: 'Villas & townhouses',
      desc: 'Our first development in New Cairo: a gated community given over mostly to green space and lagoons, with a social club and dedicated running and cycling tracks.',
      area: '210 - 480 m²',
      units: '184 units',
      delivery: 'Q3 2030'
    }
  },
  {
    id: 'batoul-business-park',
    img: 'assets/img/project-10.jpg',
    city: 'newcairo',
    status: 'launching',
    ar: {
      name: 'البتول بيزنس بارك',
      location: 'التجمع الأول، القاهرة الجديدة',
      type: 'مقرات إدارية ومساحات عمل',
      desc: 'مجمع أعمال قيد التطوير في التجمع الأول، بمبانٍ إدارية مستقلة ومساحات عمل مشتركة وساحة مفتوحة تضم مقاهي ومطاعم تخدم العاملين بالمجمع.',
      area: '70 - 400 م²',
      units: '96 وحدة',
      delivery: 'الربع الرابع 2030'
    },
    en: {
      name: 'Al Batoul Business Park',
      location: 'First Settlement, New Cairo',
      type: 'Offices & workspaces',
      desc: 'A business campus in development in the First Settlement, with standalone office buildings, shared workspaces and an open plaza of cafés and restaurants serving the people who work there.',
      area: '70 - 400 m²',
      units: '96 units',
      delivery: 'Q4 2030'
    }
  }
];

const TESTIMONIALS = [
  {
    initials: 'أم',
    ar: { name: 'أحمد مصطفى', role: 'مالك وحدة — برج البتول، عباس العقاد', text: 'استلمت شقتي في برج البتول في الموعد المتفق عليه بالضبط وبنفس المواصفات المكتوبة في العقد. أهم ما يميز المكان أنه على عباس العقاد ومع ذلك المبنى هادئ تماماً من الداخل بفضل العزل والواجهة.' },
    en: { name: 'Ahmed Mostafa', role: 'Owner — Al Batoul Tower, Abbas El Akkad', text: 'My apartment in Al Batoul Tower was handed over exactly on the agreed date and to the specification written into the contract. The best part is that it sits on Abbas El Akkad yet stays completely quiet inside, thanks to the insulation and the facade.' }
  },
  {
    initials: 'من',
    ar: { name: 'منى نبيل', role: 'مالكة وحدة — حدائق البتول، زهراء مدينة نصر', text: 'اخترت حدائق البتول عشان الحديقة الخاصة بالدور الأرضي، وكانت أفضل قرار لأولادي. تنسيق المساحات الخضراء لسه متحافظ عليه بعد سنتين من السكن، وفريق الصيانة بيرد في نفس اليوم.' },
    en: { name: 'Mona Nabil', role: 'Owner — Al Batoul Gardens, Zahraa Nasr City', text: 'I chose Al Batoul Gardens for the private ground-floor garden, and it turned out to be the best decision for my children. The landscaping is still well kept two years after moving in, and the maintenance team responds the same day.' }
  },
  {
    initials: 'خع',
    ar: { name: 'خالد عبد الله', role: 'صاحب مكتب — البتول بلازا، مكرم عبيد', text: 'نقلت مكتبي إلى البتول بلازا من سنتين. الموقع على مكرم عبيد سهّل على عملائي الوصول، وإدارة المبنى منظمة بشكل واضح — نظافة ومصاعد ومولد كهرباء، ولا مرة توقف العمل عندنا.' },
    en: { name: 'Khaled Abdullah', role: 'Office owner — Al Batoul Plaza, Makram Ebeid', text: 'I moved my office to Al Batoul Plaza two years ago. Being on Makram Ebeid makes it easy for clients to reach us, and the building is visibly well run — cleaning, lifts, a backup generator. Our work has never stopped once.' }
  },
  {
    initials: 'سح',
    ar: { name: 'سارة حسن', role: 'مالكة وحدة — مرتفعات البتول، الحي العاشر', text: 'الوحدة لسه تحت الإنشاء، ومع ذلك بيوصلني تحديث بصور كل شهر عن مراحل التنفيذ. الفريق شرح لي كل بند في العقد بصبر قبل التوقيع، وده اللي طمّني إني أكمل معاهم.' },
    en: { name: 'Sara Hassan', role: 'Owner — Al Batoul Heights, Tenth District', text: 'My unit is still under construction, yet I get a photo update on the build stages every month. The team walked me patiently through every clause of the contract before signing, and that is what reassured me to go ahead with them.' }
  }
];
