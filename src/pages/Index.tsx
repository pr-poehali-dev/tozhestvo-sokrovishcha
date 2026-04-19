import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const IMG_ESTATE = "https://cdn.poehali.dev/projects/40ed7097-41e0-42ca-8d1c-55dbe3ee837a/files/be576a7b-b128-42f4-8c46-c99695d122aa.jpg";
const IMG_PUSHKIN = "https://cdn.poehali.dev/projects/40ed7097-41e0-42ca-8d1c-55dbe3ee837a/files/de687406-0e98-4982-b439-47a9c5f37fa7.jpg";
const IMG_MUSEUM = "https://cdn.poehali.dev/projects/40ed7097-41e0-42ca-8d1c-55dbe3ee837a/files/16874f6e-ebcc-4b80-9e13-4d35a30afca9.jpg";
const IMG_PARK = "https://cdn.poehali.dev/projects/40ed7097-41e0-42ca-8d1c-55dbe3ee837a/files/533ef528-d3b8-421e-802a-67fbf4af487a.jpg";

const wonders = [
  {
    num: "1",
    icon: "BookOpen",
    title: "Пушкин",
    subtitle: "Великий поэт здесь останавливался",
    img: IMG_PUSHKIN,
    text: "В старинном особняке нам показали комнату, где останавливался Александр Сергеевич Пушкин. На столе стоит его стакан и гусиное перо. Я стояла на том же месте, где стоял великий поэт, — у меня побежали мурашки!",
    fact: "Пушкин бывал здесь неоднократно — это дом семьи его жены Натальи Гончаровой",
  },
  {
    num: "2",
    icon: "Layers",
    title: "Музей «Бузеон»",
    subtitle: "Единственный музей бумаги в России",
    img: IMG_MUSEUM,
    text: "Название получилось из слов «БУмага» и «музеон». Там можно увидеть водяную мельницу XVIII века, японскую комнату и даже указы Петра Первого. А ещё я своими руками сделала лист бумаги — это волшебство!",
    fact: "«Бузеон» — единственный в России музей истории бумаги",
  },
  {
    num: "3",
    icon: "Trees",
    title: "Парк с прудами",
    subtitle: "Где гуляли князья и поэты",
    img: IMG_PARK,
    text: "Мы гуляли по тенистым аллеям, где когда-то гуляли князья и поэты. Вода в прудах тёмная и спокойная, как в сказке. А старинная беседка «Храм воздуха» открывает вид на всю усадьбу.",
    fact: "Усадьбе более 300 лет — она основана в начале XVIII века",
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function OrnamentLine() {
  return (
    <div className="ornament-divider my-3">
      <span className="text-gold text-base">✦</span>
    </div>
  );
}

function Slide({ children, id, bgClass = "" }: { children: React.ReactNode; id: string; bgClass?: string }) {
  return (
    <section id={id} className={`min-h-screen flex flex-col justify-center relative overflow-hidden ${bgClass}`}>
      {children}
    </section>
  );
}

export default function Index() {
  useReveal();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const i = refs.current.indexOf(e.target as HTMLElement);
          if (i !== -1) setActive(i);
        }
      }),
      { threshold: 0.4 }
    );
    refs.current.forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (i: number) => refs.current[i]?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bg-[#1C1108] text-ivory font-golos overflow-x-hidden">

      {/* Nav dots */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {[0,1,2,3,4,5,6].map((i) => (
          <button key={i} onClick={() => scrollTo(i)}
            className={`rounded-full transition-all duration-300 ${active === i ? "w-6 h-2 bg-gold" : "w-2 h-2 bg-gold/30 hover:bg-gold/60"}`}
          />
        ))}
      </div>

      {/* ══ 1. ТИТУЛ ══ */}
      <section ref={(el) => (refs.current[0] = el)} className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMG_ESTATE})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1108]/80 via-[#1C1108]/60 to-[#1C1108]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1108]/90 via-transparent to-transparent" />

        {/* Угловые рамки */}
        <div className="absolute top-8 left-8 w-14 h-14 border-t-2 border-l-2 border-gold/50" />
        <div className="absolute top-8 right-8 w-14 h-14 border-t-2 border-r-2 border-gold/50" />
        <div className="absolute bottom-8 left-8 w-14 h-14 border-b-2 border-l-2 border-gold/50" />
        <div className="absolute bottom-8 right-8 w-14 h-14 border-b-2 border-r-2 border-gold/50" />

        <div className="relative z-10 text-center max-w-4xl px-8">
          <p className="text-gold/70 tracking-[0.35em] uppercase text-xs mb-3 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Проект по окружающему миру · 3 «А» класс
          </p>
          <p className="text-ivory/50 tracking-widest text-xs mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            МБОУ «Первая школа» поселка Товарково, Калужской области
          </p>

          <h1 className="font-cormorant font-light leading-tight opacity-0 animate-fade-in-up" style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", animationDelay: "0.5s" }}>
            <span className="text-ivory/80">Необычное достояние</span><br />
            <span className="text-ivory/80">моей малой родины —</span>
          </h1>
          <h1 className="font-cormorant font-semibold leading-tight mb-8 opacity-0 animate-fade-in-up" style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)", animationDelay: "0.8s" }}>
            <span className="gold-shimmer">Усадьба Полотняный Завод</span>
          </h1>

          <OrnamentLine />

          <div className="mt-6 opacity-0 animate-fade-in" style={{ animationDelay: "1.1s" }}>
            <p className="font-cormorant italic text-ivory/60 text-xl">Выполнила: Ксения Свитцова</p>
          </div>

          <button onClick={() => scrollTo(1)}
            className="mt-10 opacity-0 animate-fade-in inline-flex items-center gap-2 border border-gold/40 text-gold hover:bg-gold/10 px-7 py-3 text-sm tracking-widest uppercase transition-all duration-300"
            style={{ animationDelay: "1.3s" }}
          >
            <Icon name="ChevronDown" size={15} />
            Начать
          </button>
        </div>
      </section>

      {/* ══ 2. ПОЧЕМУ Я ВЫБРАЛА ЭТУ ТЕМУ ══ */}
      <section ref={(el) => (refs.current[1] = el)} className="min-h-screen flex flex-col justify-center py-20 px-8">
        <div className="max-w-5xl mx-auto w-full">
          <div className="reveal text-center mb-14">
            <p className="text-gold/60 tracking-[0.3em] uppercase text-xs mb-3">Введение</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-ivory">
              Почему я выбрала <span className="gold-shimmer">эту тему?</span>
            </h2>
            <OrnamentLine />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="reveal">
              <div className="relative overflow-hidden">
                <img src={IMG_ESTATE} alt="Усадьба Полотняный Завод" className="w-full h-72 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1108]/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="font-cormorant text-gold text-lg">Усадьба Полотняный Завод</p>
                  <p className="text-ivory/50 text-xs">Калужская область</p>
                </div>
              </div>
            </div>

            <div className="reveal space-y-5" style={{ transitionDelay: "0.15s" }}>
              <div className="border-l-2 border-gold/50 pl-5">
                <p className="font-cormorant italic text-ivory/70 text-lg leading-relaxed">
                  «Когда нам задали проект о достоянии России, все подумали про Кремль или Байкал. А я вспомнила слова учительницы:»
                </p>
              </div>
              <div className="bg-burgundy/25 border border-gold/20 p-5">
                <p className="font-cormorant text-gold text-2xl italic text-center">
                  «Россия — это там,<br />где вы живёте»
                </p>
              </div>
              <p className="text-ivory/65 text-sm leading-relaxed">
                Я живу в посёлке Товарково, и мы с родителями ездили в музей «Полотняный Завод». Это место — <strong className="text-gold">настоящее сокровище!</strong>
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                {[
                  { icon: "Target", text: "Цель: доказать, что история рядом с нами" },
                  { icon: "ListChecks", text: "Узнать, кем прославлена усадьба" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-ivory/50 text-xs">
                    <Icon name={item.icon} fallback="Circle" size={14} className="text-gold/60 flex-shrink-0" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. ТРИ ЧУДА — заголовок ══ */}
      <section ref={(el) => (refs.current[2] = el)} className="min-h-[50vh] flex flex-col justify-center items-center py-16 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-burgundy/20 border-y border-gold/15" />
        <div className="relative z-10 text-center reveal max-w-3xl">
          <p className="text-gold/60 tracking-[0.3em] uppercase text-xs mb-3">Главное открытие</p>
          <h2 className="font-cormorant text-5xl md:text-7xl font-light text-ivory">
            Три чуда<br /><span className="gold-shimmer">Полотняного Завода</span>
          </h2>
          <OrnamentLine />
          <p className="font-cormorant italic text-ivory/55 text-xl mt-4">
            Каждое из них — особое, живое и настоящее
          </p>
        </div>
      </section>

      {/* ══ 4–6. ЧУДЕСА ══ */}
      {wonders.map((w, i) => (
        <section key={i} ref={(el) => (refs.current[3 + i] = el)} className="min-h-screen flex flex-col justify-center py-20 px-8">
          <div className="max-w-5xl mx-auto w-full">
            <div className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
              {/* Фото */}
              <div className="reveal">
                <div className="relative overflow-hidden group">
                  <img src={w.img} alt={w.title} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1108]/70 to-transparent" />
                  <div className="absolute top-4 left-4 w-10 h-10 border border-gold/50 flex items-center justify-center bg-[#1C1108]/50">
                    <span className="font-cormorant text-gold text-xl font-light">{w.num}</span>
                  </div>
                </div>
              </div>

              {/* Текст */}
              <div className="reveal space-y-5" style={{ transitionDelay: "0.12s" }}>
                <div>
                  <p className="text-gold/60 tracking-[0.3em] uppercase text-xs mb-2">Чудо {w.num}</p>
                  <h3 className="font-cormorant text-4xl md:text-5xl font-light text-ivory mb-1">
                    {w.title}
                  </h3>
                  <p className="text-gold/60 text-sm italic font-cormorant">{w.subtitle}</p>
                </div>
                <OrnamentLine />
                <p className="text-ivory/70 text-base leading-relaxed">
                  {w.text}
                </p>
                <div className="bg-[#2A1A08]/80 border border-gold/20 p-4 flex gap-3 items-start">
                  <Icon name="Star" fallback="Info" size={15} className="text-gold mt-0.5 flex-shrink-0" />
                  <p className="text-ivory/50 text-xs leading-relaxed italic">{w.fact}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ══ 7. ВЫВОД ══ */}
      <section ref={(el) => (refs.current[6] = el)} className="min-h-screen flex flex-col justify-center py-20 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${IMG_PARK})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1108] via-[#1C1108]/95 to-[#1C1108]" />

        <div className="relative z-10 max-w-3xl mx-auto w-full">
          <div className="reveal text-center mb-12">
            <p className="text-gold/60 tracking-[0.3em] uppercase text-xs mb-3">Заключение</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-ivory">
              <span className="gold-shimmer">Вывод</span>
            </h2>
            <OrnamentLine />
          </div>

          <div className="reveal space-y-6">
            <div className="border border-gold/25 bg-[#2A1208]/60 p-8">
              <p className="font-cormorant text-xl text-ivory/80 leading-relaxed text-center italic">
                «Я поняла, что достояние России — это каждый уголок нашей страны, где помнят историю.»
              </p>
            </div>

            <p className="text-ivory/65 text-base leading-relaxed text-center">
              Усадьба Полотняный Завод и музей «Бузеон» находятся в часе езды от моего посёлка Товарково, но они <strong className="text-gold">известны на всю страну!</strong>
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { num: "~1 час", label: "езды от Товарково" },
                { num: "XVIII век", label: "основана усадьба" },
                { num: "1 в России", label: "музей бумаги" },
              ].map((s, i) => (
                <div key={i} className="text-center border border-gold/20 p-4 bg-[#1C1108]/60 reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="font-cormorant text-gold text-2xl font-light">{s.num}</div>
                  <div className="text-ivory/40 text-xs uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="text-center pt-6 border-t border-gold/20 reveal">
              <p className="font-cormorant italic text-ivory/50 text-lg">
                «Я горжусь, что живу в Калужской области. Россия держится на таких маленьких, но очень важных местах.»
              </p>
              <div className="mt-6">
                <p className="text-gold/60 text-sm tracking-widest uppercase">Ксения Свитцова</p>
                <p className="text-ivory/30 text-xs mt-1">3 «А» класс · МБОУ «Первая школа» · п. Товарково</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="relative z-10 mt-16 text-center border-t border-gold/15 pt-6">
          <div className="font-cormorant text-gold/40 text-sm italic">Усадьба Полотняный Завод · Калужская область</div>
        </footer>
      </section>
    </div>
  );
}
