import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_BG = "https://cdn.poehali.dev/projects/40ed7097-41e0-42ca-8d1c-55dbe3ee837a/files/1fc40790-4f50-4ab0-b710-02a9483ce780.jpg";
const INTERIOR_IMG = "https://cdn.poehali.dev/projects/40ed7097-41e0-42ca-8d1c-55dbe3ee837a/files/aa22c843-38d4-4f85-893f-abd6ee3c8216.jpg";
const FABERGE_IMG = "https://cdn.poehali.dev/projects/40ed7097-41e0-42ca-8d1c-55dbe3ee837a/files/29610ab8-c1c8-4782-b28c-453e0ff09a8e.jpg";

const timelineItems = [
  { year: "862", event: "Основание Руси", desc: "Призвание варягов. Рюрик становится первым князем Новгорода, закладывая основу государственности." },
  { year: "988", event: "Крещение Руси", desc: "Великий князь Владимир принимает православие. Началась новая эпоха духовности и культурного расцвета." },
  { year: "1147", event: "Основание Москвы", desc: "Юрий Долгорукий основывает город, которому суждено стать сердцем великой державы." },
  { year: "1613", event: "Дом Романовых", desc: "Михаил Фёдорович венчается на царство. Три столетия династии, изменившей облик мира." },
  { year: "1703", event: "Рождение Петербурга", desc: "Пётр Великий закладывает новую столицу — «окно в Европу», жемчужину на берегах Невы." },
  { year: "1812", event: "Отечественная война", desc: "Россия выстояла против армии Наполеона. Народный подвиг, воспетый в бессмертных произведениях." },
];

const palaces = [
  { name: "Зимний дворец", city: "Санкт-Петербург", year: "1762", desc: "Главная резиденция российских императоров. 1 057 залов и комнат, 1 945 окон, 117 парадных лестниц.", icon: "Crown" },
  { name: "Екатерининский дворец", city: "Царское Село", year: "1756", desc: "Шедевр Растрелли с легендарной Янтарной комнатой — восьмым чудом света.", icon: "Gem" },
  { name: "Петергоф", city: "Петродворец", year: "1723", desc: "«Русский Версаль». 64 фонтана образуют уникальный ансамбль без единого насоса.", icon: "Waves" },
  { name: "Большой Кремлёвский дворец", city: "Москва", year: "1849", desc: "Парадная резиденция главы государства. Символ непрерывности российской государственности.", icon: "Building" },
];

const artworks = [
  { title: "Иконопись", period: "XI–XVII вв.", desc: "Сакральное искусство, соединившее Византию с русским духом" },
  { title: "Ювелирное дело", period: "XVII–XIX вв.", desc: "Мастера Фаберже создавали шедевры, покорившие весь мир" },
  { title: "Живопись", period: "XVIII–XIX вв.", desc: "Репин, Айвазовский, Шишкин — галерея русской души" },
  { title: "Архитектура", period: "XVIII–XIX вв.", desc: "Барокко, классицизм и ампир на берегах Невы и Москвы-реки" },
  { title: "Литература", period: "XIX–XX вв.", desc: "Пушкин, Толстой, Достоевский — совесть человечества" },
  { title: "Балет", period: "XIX–XX вв.", desc: "Чайковский и Дягилев подарили миру невиданную красоту танца" },
];

const stats = [
  { value: "300+", label: "лет династии Романовых" },
  { value: "17,1 млн", label: "км² — площадь России" },
  { value: "1000+", label: "лет письменной истории" },
  { value: "40+", label: "объектов ЮНЕСКО" },
];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function OrnamentLine() {
  return (
    <div className="ornament-divider my-2">
      <span className="text-gold text-lg">✦</span>
    </div>
  );
}

function NavDot({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full transition-all duration-300 ${active ? "bg-gold w-6 h-2" : "bg-gold/30 hover:bg-gold/60 w-2 h-2"}`}
    />
  );
}

export default function Index() {
  useReveal();
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.4 }
    );
    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (idx: number) => sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bg-dark-bg text-ivory font-golos overflow-x-hidden">
      {/* Nav dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <NavDot key={i} active={activeSection === i} onClick={() => scrollTo(i)} />
        ))}
      </div>

      {/* ══════════ HERO ══════════ */}
      <section ref={(el) => (sectionRefs.current[0] = el)} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(${HERO_BG})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/70 via-dark-bg/50 to-dark-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy-dark/40 via-transparent to-burgundy-dark/20" />

        <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-gold/60" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-gold/60" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-gold/60" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-gold/60" />

        <div className="relative z-10 text-center max-w-5xl px-8">
          <p className="text-gold/80 font-cormorant text-lg tracking-[0.4em] uppercase mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Торжественная презентация
          </p>
          <h1 className="font-cormorant text-7xl md:text-9xl font-light leading-none mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <span className="gold-shimmer">Императорское</span>
          </h1>
          <h1 className="font-cormorant text-7xl md:text-9xl font-light leading-none mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            Наследие России
          </h1>
          <OrnamentLine />
          <p className="font-cormorant italic text-ivory/70 text-xl md:text-2xl mt-6 max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: "1.2s" }}>
            «Россия — страна, которая соединила в себе Восток и Запад, создав уникальную цивилизацию»
          </p>
          <button
            onClick={() => scrollTo(1)}
            className="mt-12 opacity-0 animate-fade-in inline-flex items-center gap-3 border border-gold/50 text-gold hover:bg-gold/10 transition-all duration-300 px-8 py-3 tracking-widest text-sm uppercase"
            style={{ animationDelay: "1.5s" }}
          >
            <Icon name="ChevronDown" size={16} />
            Открыть историю
          </button>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent animate-pulse opacity-50" />
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <div className="bg-burgundy/30 border-y border-gold/20 py-8">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center reveal">
              <div className="font-cormorant text-3xl md:text-4xl text-gold font-light">{s.value}</div>
              <div className="text-ivory/50 text-xs uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ HISTORY ══════════ */}
      <section ref={(el) => (sectionRefs.current[1] = el)} className="min-h-screen py-24 px-8 max-w-6xl mx-auto">
        <div className="reveal text-center mb-16">
          <p className="text-gold/60 tracking-[0.3em] uppercase text-sm mb-3">Хронология</p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-ivory font-light">
            Страницы <span className="gold-shimmer">Великой истории</span>
          </h2>
          <OrnamentLine />
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent hidden md:block" />
          <div className="space-y-10">
            {timelineItems.map((item, i) => (
              <div key={i} className={`reveal flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="bg-dark-card border border-gold/20 hover:border-gold/50 transition-all duration-300 p-6 hover:bg-burgundy/20">
                    <div className="font-cormorant text-gold text-4xl font-light mb-2">{item.year}</div>
                    <div className="font-cormorant text-ivory text-xl font-semibold mb-3">{item.event}</div>
                    <p className="text-ivory/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <div className="hidden md:flex w-4 h-4 rounded-full bg-gold border-2 border-dark-bg ring-2 ring-gold/30 flex-shrink-0 z-10" />
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PALACES ══════════ */}
      <section ref={(el) => (sectionRefs.current[2] = el)} className="relative min-h-screen py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url(${INTERIOR_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-bg/95 to-dark-bg" />
        <div className="relative z-10 max-w-6xl mx-auto px-8">
          <div className="reveal text-center mb-16">
            <p className="text-gold/60 tracking-[0.3em] uppercase text-sm mb-3">Архитектура</p>
            <h2 className="font-cormorant text-5xl md:text-6xl text-ivory font-light">
              Дворцы <span className="gold-shimmer">Империи</span>
            </h2>
            <OrnamentLine />
            <p className="text-ivory/50 mt-4 max-w-xl mx-auto font-cormorant italic text-lg">
              Каменные симфонии, воспевающие величие и красоту российской державы
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {palaces.map((palace, i) => (
              <div key={i} className="reveal group bg-dark-card border border-gold/20 hover:border-gold/60 transition-all duration-500 p-8 hover:bg-burgundy/25 cursor-default" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 border border-gold/40 group-hover:border-gold flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-gold/10">
                    <Icon name={palace.icon} fallback="Building" size={20} className="text-gold" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-1">
                      <h3 className="font-cormorant text-2xl text-ivory group-hover:text-gold transition-colors duration-300">{palace.name}</h3>
                      <span className="text-gold/50 text-xs tracking-widest">{palace.year}</span>
                    </div>
                    <p className="text-gold/60 text-xs uppercase tracking-widest mb-3">{palace.city}</p>
                    <p className="text-ivory/60 text-sm leading-relaxed">{palace.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ ART ══════════ */}
      <section ref={(el) => (sectionRefs.current[3] = el)} className="min-h-screen py-24 px-8 max-w-6xl mx-auto">
        <div className="reveal text-center mb-16">
          <p className="text-gold/60 tracking-[0.3em] uppercase text-sm mb-3">Культура</p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-ivory font-light">
            Искусство <span className="gold-shimmer">и Дух</span>
          </h2>
          <OrnamentLine />
        </div>
        <div className="grid md:grid-cols-3 gap-1">
          {artworks.map((art, i) => (
            <div key={i} className="reveal group relative overflow-hidden border border-gold/10 hover:border-gold/50 bg-dark-card hover:bg-burgundy/20 transition-all duration-500 p-8 cursor-default" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-500" />
              <div className="font-cormorant text-gold/20 text-6xl font-light absolute top-4 right-4 group-hover:text-gold/40 transition-colors duration-300">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="relative z-10">
                <h3 className="font-cormorant text-2xl text-ivory mb-1 group-hover:text-gold transition-colors duration-300">{art.title}</h3>
                <p className="text-gold/50 text-xs uppercase tracking-widest mb-4">{art.period}</p>
                <p className="text-ivory/55 text-sm leading-relaxed">{art.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ GALLERY ══════════ */}
      <section ref={(el) => (sectionRefs.current[4] = el)} className="min-h-screen py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center mb-16">
            <p className="text-gold/60 tracking-[0.3em] uppercase text-sm mb-3">Галерея</p>
            <h2 className="font-cormorant text-5xl md:text-6xl text-ivory font-light">
              Образы <span className="gold-shimmer">Величия</span>
            </h2>
            <OrnamentLine />
          </div>

          <div className="grid md:grid-cols-3 gap-4 reveal">
            <div className="md:col-span-2 overflow-hidden group relative h-80">
              <img src={INTERIOR_IMG} alt="Императорский интерьер" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-cormorant text-gold text-xl">Парадный зал</p>
                <p className="text-ivory/60 text-sm">Императорский дворец</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="overflow-hidden group relative flex-1 h-36">
                <img src={HERO_BG} alt="Зимний дворец" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/70 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="font-cormorant text-gold text-lg">Зимний дворец</p>
                </div>
              </div>
              <div className="overflow-hidden group relative flex-1 h-36">
                <img src={FABERGE_IMG} alt="Яйцо Фаберже" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/70 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="font-cormorant text-gold text-lg">Яйцо Фаберже</p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal mt-16 text-center border-y border-gold/20 py-12">
            <div className="font-cormorant text-gold text-6xl leading-none mb-4">"</div>
            <blockquote className="font-cormorant italic text-2xl md:text-3xl text-ivory/80 max-w-3xl mx-auto leading-relaxed">
              Россия не просто страна — это целый мир, где каждый камень помнит историю, а каждый закат освещает будущее.
            </blockquote>
            <div className="mt-6 text-gold/50 text-sm tracking-widest uppercase">— Из дневников путешественников</div>
          </div>
        </div>
      </section>

      {/* ══════════ CONTACT ══════════ */}
      <section ref={(el) => (sectionRefs.current[5] = el)} className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/40 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <div className="w-96 h-96 border border-gold rounded-full absolute" />
          <div className="w-72 h-72 border border-gold rounded-full absolute" />
          <div className="w-48 h-48 border border-gold rounded-full absolute" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-8 text-center reveal">
          <p className="text-gold/60 tracking-[0.3em] uppercase text-sm mb-6">Связаться с нами</p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-ivory font-light mb-4">
            Присоединяйтесь к <span className="gold-shimmer">Истории</span>
          </h2>
          <OrnamentLine />
          <p className="text-ivory/60 mt-6 mb-12 font-cormorant italic text-xl leading-relaxed">
            Приглашаем вас стать частью этого культурного путешествия. Узнайте больше о программах, экскурсиях и специальных мероприятиях.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-10 py-4 bg-gold hover:bg-gold-light text-dark-bg font-golos font-semibold tracking-widest text-sm uppercase transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 inline-flex items-center gap-2 justify-center">
              <Icon name="Mail" size={16} />
              Написать нам
            </button>
            <button className="px-10 py-4 border border-gold/50 hover:border-gold text-gold hover:bg-gold/10 tracking-widest text-sm uppercase transition-all duration-300 inline-flex items-center gap-2 justify-center">
              <Icon name="Phone" size={16} />
              Позвонить
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-gold/20 pt-12">
            {[
              { icon: "MapPin", text: "Санкт-Петербург, Дворцовая площадь, 2" },
              { icon: "Phone", text: "+7 (812) 000-00-00" },
              { icon: "Globe", text: "imperial-russia.ru" },
            ].map((c, i) => (
              <div key={i} className="flex flex-col items-center gap-2 text-ivory/50 hover:text-gold/70 transition-colors duration-300 cursor-default">
                <Icon name={c.icon} fallback="MapPin" size={18} className="text-gold/60" />
                <span className="text-xs text-center leading-relaxed">{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="border-t border-gold/20 py-8 text-center">
        <div className="font-cormorant text-gold/60 text-lg italic">Императорское наследие России</div>
        <div className="text-ivory/20 text-xs mt-2 tracking-widest uppercase">Основано в 862 году · Продолжается по сей день</div>
      </footer>
    </div>
  );
}