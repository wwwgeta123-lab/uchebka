// Тексты и статические данные сайта. Залы приходят из API и базы SQLite.

export const CLUB = {
  name: "NEXUS",
  tagline: "киберспорт-клуб",
  phone: "+7 (495) 120-24-07",
  phoneHref: "tel:+74951202407",
  email: "hello@nexus-club.ru",
  address: "Москва, ул. Профсоюзная, 24, 2 этаж",
  addressNote: "м. Профсоюзная, 4 минуты пешком",
  hours: "Ежедневно, 10:00–02:00",
  hoursNote: "ночной тариф — с 23:00 до 08:00",
};

export const NAV = [
  { to: "/", label: "Главная", end: true },
  { to: "/catalog", label: "Залы и цены" },
  { to: "/about", label: "О клубе" },
  { to: "/contacts", label: "Контакты" },
];

export const SOCIALS = [
  { label: "VK", href: "#" },
  { label: "TG", href: "#" },
  { label: "YT", href: "#" },
  { label: "DS", href: "#" },
];

export const HERO_STATS = [
  { value: "64", label: "игровых места" },
  { value: "5", label: "залов" },
  { value: "12", label: "лет на рынке" },
  { value: "9 000+", label: "гостей" },
];

export const FEATURES = [
  {
    icon: "monitor",
    title: "Железо 2024–2025",
    text: "RTX 4080 и мониторы до 360 Гц. Каждое место держит 240+ FPS в CS2 и Dota 2.",
  },
  {
    icon: "wifi",
    title: "Пинг до 4 мс",
    text: "Оптика до 1 Гбит/с, резервный канал и локальные серверы для тренировок.",
  },
  {
    icon: "moon",
    title: "Ночной тариф",
    text: "С 23:00 до 08:00 — фиксированная цена за всю ночь, кофе в подарок.",
  },
  {
    icon: "trophy",
    title: "Турниры каждый месяц",
    text: "Внутренние сетки по CS2 и FC, призовой фонд и отдельный зал для финалов.",
  },
];

export const HARDWARE = {
  eyebrow: "Железо",
  title: "Одинаково сильные места",
  text: "Мы не делим компьютеры на «хорошие» и «слабые»: в каждом зале своя сборка, но все машины внутри зала идентичны. Поэтому результат зависит только от вас.",
  bullets: [
    ["Единая сборка:", " все места в зале используют одинаковые комплектующие — нет «слабых» компьютеров."],
    ["Периферия на выбор:", " мыши, клавиатуры и наушники можно поменять у администратора."],
    ["Обслуживание раз в две недели:", " чистка, обновление драйверов и проверка температур."],
  ],
  panelTitle: "Флагманская сборка VIP",
  panelNote: "8 машин",
  panel: [
    { label: "Процессор", value: "Intel Core i7-14700K" },
    { label: "Видеокарта", value: "GeForce RTX 4080 Super 16 ГБ" },
    { label: "Оперативная память", value: "32 ГБ DDR5 6400 МГц" },
    { label: "Накопитель", value: "SSD 2 ТБ NVMe" },
    { label: "Монитор", value: "32\" IPS, 360 Гц" },
    { label: "Клавиатура", value: "Wooting 60HE" },
    { label: "Мышь", value: "G Pro X Superlight 2" },
    { label: "Интернет", value: "1 Гбит/с, пинг 4 мс" },
  ],
};

export const GAMES = [
  { title: "Counter-Strike 2", meta: "Шутер, 5×5", image: "/images/game-cs2.svg" },
  { title: "Dota 2", meta: "MOBA, 5×5", image: "/images/game-dota.svg" },
  { title: "Valorant", meta: "Шутер, 5×5", image: "/images/game-valorant.svg" },
  { title: "GTA V", meta: "Экшен, онлайн", image: "/images/game-gta.svg" },
  { title: "Fortnite", meta: "Battle Royale", image: "/images/game-fortnite.svg" },
  { title: "Apex Legends", meta: "Battle Royale", image: "/images/game-apex.svg" },
  { title: "EA Sports FC 25", meta: "Спорт, 1×1", image: "/images/game-fc.svg" },
  { title: "Minecraft", meta: "Песочница", image: "/images/game-minecraft.svg" },
];

export const PROMOS = [
  {
    label: "Ночной тариф",
    title: "Вся ночь за 900 ₽",
    text: "С 23:00 до 08:00 в зале «Стандарт». Кофе и энергетик — в подарок.",
    value: "900 ₽",
    small: "/ ночь",
  },
  {
    label: "Счастливые часы",
    title: "Будни, 10:00–15:00",
    text: "Скидка на свободную игру во всех залах. Бронировать заранее не обязательно.",
    value: "−30%",
  },
  {
    label: "День рождения",
    title: "Час игры в подарок",
    text: "За три дня до и после праздника — час бесплатно и скидка 15% на буткемп.",
    value: "+1 час",
  },
];

export const REVIEWS = [
  {
    text: "Собираемся здесь на тренировки три раза в неделю. Железо одинаковое, пинг ровный, а буткемп можно закрыть целиком — это очень помогает перед турнирами.",
    name: "Кирилл",
    role: "капитан NEXUS Academy",
    initials: "К",
  },
  {
    text: "Приходим с братом на PlayStation: диваны, FC 25 и большой телевизор. Администраторы всегда помогают подключить геймпады и выбрать игру.",
    name: "Алина",
    role: "гостья клуба",
    initials: "А",
  },
  {
    text: "Беру ночной тариф перед сессией: тихо, кофе не заканчивается, к утру успеваю и поиграть, и позаниматься. По будням днём вообще пусто.",
    name: "Тимур",
    role: "студент МИРЭА",
    initials: "Т",
  },
];

export const ABOUT_NUMBERS = [
  { value: "2013", label: "год открытия первого зала" },
  { value: "64", span: " ПК", label: "и пять залов в одном клубе" },
  { value: "120", label: "турниров провели с 2018 года" },
  { value: "24/7", label: "поддержка в чате и по телефону" },
];

export const STORY = {
  eyebrow: "О клубе",
  title: "Клуб, который вырос из одной комнаты",
  paragraphs: [
    "NEXUS открылся в 2013 году как небольшая комната на восемь компьютеров в подвале на Профсоюзной. Тогда это была компания друзей, которые устали играть дома по очереди.",
    "Сейчас это 64 места в пяти залах, буткемп для команд и консольная зона. Но принцип остался прежним: одинаковое железо для всех, честные цены и администратор, который реально помогает, а не сидит за стойкой.",
    "Мы проводим внутренние турниры по CS2, Dota 2 и FC 25, бесплатно пускаем школьные команды на утренние тренировки и держим ночной тариф, чтобы можно было играть без спешки.",
  ],
  caption: "Зал «Стандарт», 24 места",
  image: "/images/about-1.svg",
};

export const TEAM = [
  {
    name: "Артём Соколов",
    role: "Управляющий",
    text: "Открыл клуб в 2013 году. Отвечает за закупки железа и турнирную сетку.",
    image: "/images/team-1.svg",
  },
  {
    name: "Мария Ким",
    role: "Старший администратор",
    text: "Ведёт брони, встречает гостей и разбирается с любым вопросом по залам.",
    image: "/images/team-2.svg",
  },
  {
    name: "Данил Ершов",
    role: "Технический специалист",
    text: "Собирает и обслуживает машины, следит за пингом и обновлениями.",
    image: "/images/team-3.svg",
  },
  {
    name: "Илья Ветров",
    role: "Тренер по CS2",
    text: "Проводит разборы демок и командные тренировки в буткемпе.",
    image: "/images/team-4.svg",
  },
];

export const CONTACTS = [
  {
    icon: "pin",
    label: "Адрес",
    value: CLUB.address,
    note: CLUB.addressNote,
  },
  {
    icon: "clock",
    label: "Режим работы",
    value: CLUB.hours,
    note: CLUB.hoursNote,
  },
  {
    icon: "phone",
    label: "Телефон",
    value: CLUB.phone,
    href: CLUB.phoneHref,
    note: "звоните с 10:00 до 02:00",
  },
  {
    icon: "mail",
    label: "Почта",
    value: CLUB.email,
    href: `mailto:${CLUB.email}`,
    note: "ответим в течение рабочего дня",
  },
];

export const GALLERY = [
  "/images/about-1.svg",
  "/images/about-2.svg",
  "/images/about-3.svg",
];
