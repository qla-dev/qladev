import React from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  CarFront,
  Clock3,
  MapPin,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Ticket,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { amenities, programs } from '../data';
import { CrossSellPanel } from '../shared/CrossSellPanel';
import { SectionHeader } from '../shared/SectionHeader';
import { TechnoparkHeroSection } from '../shared/TechnoparkHeroSection';
import { TechnoparkPageShell } from '../shared/TechnoparkPageShell';
import { TechnoparkStatCard } from '../shared/TechnoparkStatCard';
import type { TechnoparkPageProps } from '../types';

type SpaceTabId = 'location' | 'layout' | 'rhythm';

interface SpaceTabCard {
  title: string;
  text: string;
}

interface SpaceTab {
  id: SpaceTabId;
  label: string;
  icon: LucideIcon;
  description: string;
  cards: SpaceTabCard[];
}

export const TechnoparkLandingPage: React.FC<TechnoparkPageProps> = ({ lang, onNavigate }) => {
  const isBs = lang === 'bs';
  const [activeSpaceTab, setActiveSpaceTab] = React.useState<SpaceTabId>('location');

  const labels = {
    badge: 'qla.dev technopark',
    title: isBs ? 'TECHNOPARK ZA NOVU DIGITALNU GENERACIJU' : 'TECHNOPARK FOR THE NEXT DIGITAL GENERATION',
    subtitle: isBs
      ? 'Open space radi od 08:00 do 16:00, programi krecu od 17:00, a cijeli prostor je slozen za djecu i mlade koji zele spojiti produktivan rad, ucenje i chill.'
      : 'Open space runs from 08:00 to 16:00, programs start from 17:00, and the entire space is built for children and youth who want to combine productive work, learning, and chill time.',
    heroStats: {
      membership: isBs ? 'Open-space clanstvo' : 'Open-space membership',
      instructions: isBs ? 'Mentorski programi' : 'Mentor-led instruction',
      seats: isBs ? 'Mjesta u prostoru i grupi' : 'Places in the room and group',
      under18: isBs ? 'Samo za djecu i mlade' : 'For children and youth',
    },
    amenitiesTitle: isBs ? 'AMBIJENT + SADRZAJ' : 'AMBIENT + AMENITIES',
    amenitiesSubtitle: isBs
      ? '15-place coding + chill lounge, PS5, VR, 3D printer, rooftop lokacija i sve ostalo sto Technopark cini mjestom u koje se ulazi da se napravi nesto dobro.'
      : 'A 15-place coding + chill lounge, PS5, VR, 3D printer, rooftop location, and everything else that makes Technopark a space you enter to build something meaningful.',
    spaceTitle: isBs ? 'PROSTOR + LOKACIJA' : 'SPACE + LOCATION',
    spaceSubtitle: isBs
      ? 'Tri pogleda na isti prostor: gdje smo, kako je slozen i zasto dnevni ritam ostaje siguran i jasan za djecu, mlade i roditelje.'
      : 'Three ways to read the same space: where it is, how it is laid out, and why the daytime rhythm stays safe and clear for kids, youth, and parents.',
    flowEyebrow: isBs ? 'DNEVNI FLOW' : 'DAILY FLOW',
    flowCards: [
      {
        value: '08:00 - 16:00',
        label: isBs ? 'Open space membership' : 'Open space membership',
        text: isBs ? 'Dolazak, rad, chill i rezervacije po 2h.' : 'Arrival, work, chill, and reservations in 2h slots.',
      },
      {
        value: '17:00 +',
        label: isBs ? 'Instrukcije i programi' : 'Programs and instruction',
        text: isBs ? 'Mentorski rad u manjim grupama do 15 ljudi.' : 'Mentor-led work in groups of up to 15 people.',
      },
      {
        value: '15',
        label: isBs ? 'Maksimalan kapacitet' : 'Maximum capacity',
        text: isBs ? 'Isti limit vazi i za open space i za svaki kurs.' : 'The same limit applies to open space and every course.',
      },
      {
        value: 'U18',
        label: isBs ? 'Djeca i mladi' : 'Children and youth',
        text: isBs ? 'Dnevni ritam je slozen za sigurnije i fokusiranije koristenje prostora.' : 'The daytime rhythm is built for a safer, more focused use of the space.',
      },
    ],
    routesTitle: isBs ? 'ODABERI SVOJ ULAZ' : 'CHOOSE YOUR WAY IN',
    routesSubtitle: isBs
      ? 'Technopark ima dva jasna ulaza: dnevni open space membership i vecernje programe od 17:00.'
      : 'Technopark has two clear entry points: daytime open-space membership and evening programs from 17:00 onward.',
    pricingTitle: isBs ? 'CJENOVNIK' : 'PRICING',
    pricingSubtitle: isBs
      ? 'Sve cijene su po mjesecu. Early-bird cijene su aktivne do 1. maja, a membership i programi mogu se kombinovati kroz dodatne bundle pogodnosti.'
      : 'All prices are per month. Early-bird prices stay active until May 1, and membership and programs can be combined through extra bundle benefits.',
    extrasTitle: isBs ? 'DODATNE POGODNOSTI' : 'EXTRA BENEFITS',
    extrasSubtitle: isBs
      ? 'Ovo nije dio cjenovnika nego vrijednost samog prostora: limit, rooftop osjecaj, parking i dodatni membership + program bundle.'
      : 'This is not part of pricing, but part of the space itself: the cap, rooftop feel, parking, and the extra membership + program bundle.',
    membershipCard: {
      eyebrow: isBs ? 'MJESECNI MEMBERSHIP' : 'MONTHLY MEMBERSHIP',
      title: isBs ? 'Otvoren prostor od 08:00 do 16:00' : 'Open space from 08:00 to 16:00',
      text: isBs
        ? 'Rezervacije idu u 2h slotovima, maksimalno 4h dnevno, uz limit od 15 ljudi po terminu.'
        : 'Reservations run in 2-hour slots, with a 4-hour daily maximum and a 15-person cap per slot.',
      cta: isBs ? 'OTVORI CLANSTVO' : 'OPEN MEMBERSHIP',
      heroCta: isBs ? 'CLANSTVO' : 'MEMBERSHIP',
    },
    programsCard: {
      eyebrow: isBs ? 'PROGRAMI OD 17:00' : 'PROGRAMS FROM 17:00',
      title: isBs ? 'Osam programa sa Beginner i Advanced putem' : 'Eight programs with Beginner and Advanced paths',
      text: isBs
        ? 'Web, app, AI, dizajn, 3D, game dev, Roblox i video editing u grupama do 15 polaznika.'
        : 'Web, app, AI, design, 3D, game dev, Roblox, and video editing in groups of up to 15 participants.',
      cta: isBs ? 'OTVORI PROGRAME' : 'OPEN PROGRAMS',
      heroCta: isBs ? 'INSTRUKCIJE' : 'INSTRUCTIONS',
    },
    pricingCards: {
      membership: {
        eyebrow: isBs ? 'OPEN SPACE' : 'OPEN SPACE',
        title: isBs ? 'Mjesecni pass' : 'Monthly pass',
        price: '60 KM',
        oldPrice: '100 KM',
        badge: isBs ? '40% POPUST DO 1. MAJA' : '40% OFF BEFORE MAY 1',
        items: isBs
          ? ['08:00 - 16:00 pristup', '2 termina dnevno po 2h', 'Maksimalno 15 ljudi', 'Chill lounge, gaming i snack zona']
          : ['08:00 - 16:00 access', '2 daily slots of 2h', 'Maximum 15 people', 'Chill lounge, gaming, and snack zone'],
        button: isBs ? 'REZERVISI MEMBERSHIP' : 'RESERVE MEMBERSHIP',
      },
      beginnerPrograms: {
        eyebrow: isBs ? 'BEGINNER PATH' : 'BEGINNER PATH',
        title: isBs ? 'Beginner program' : 'Beginner program',
        price: '180 KM',
        oldPrice: '200 KM',
        badge: isBs ? '10% POPUST DO 1. MAJA' : '10% OFF BEFORE MAY 1',
        items: isBs
          ? ['180 KM po mjesecu', 'Trajanje: 3 mjeseca', `${programs.length} programa u ponudi`, 'Maksimalno 15 polaznika po grupi']
          : ['180 KM per month', 'Duration: 3 months', `${programs.length} programs available`, 'Maximum 15 students per group'],
        button: isBs ? 'OTVORI BEGINNER' : 'OPEN BEGINNER',
      },
      advancedPrograms: {
        eyebrow: isBs ? 'ADVANCED PATH' : 'ADVANCED PATH',
        title: isBs ? 'Advanced program' : 'Advanced program',
        price: '300 KM',
        oldPrice: undefined,
        badge: isBs ? 'CIJENA PO MJESECU' : 'PRICE PER MONTH',
        items: isBs
          ? ['300 KM po mjesecu', 'Trajanje: 6 mjeseci', `${programs.length} programa u ponudi`, 'Maksimalno 15 polaznika po grupi']
          : ['300 KM per month', 'Duration: 6 months', `${programs.length} programs available`, 'Maximum 15 students per group'],
        button: isBs ? 'OTVORI ADVANCED' : 'OPEN ADVANCED',
      },
    },
    bundleBadge: isBs ? 'BUNDLE BONUS' : 'BUNDLE BONUS',
    bundleTitle: isBs ? 'Membership i program mogu ici zajedno.' : 'Membership and programs can work together.',
    bundleText: isBs
      ? 'Ako neko uzme open space, otvara se 40% popusta na programe. Ako krene program, open space moze ici uz 50% bundle pogodnost.'
      : 'If someone takes open space, they unlock 40% off programs. If they start a program, open space can be added with a 50% bundle benefit.',
    bundleButton: isBs ? 'OTVORI CLANSTVO' : 'OPEN MEMBERSHIP',
  };

  const heroCards = [
    { value: '08:00 - 16:00', label: labels.heroStats.membership, icon: Clock3 },
    { value: '17:00 +', label: labels.heroStats.instructions, icon: CalendarDays },
    { value: '15', label: labels.heroStats.seats, icon: Users },
    { value: 'U18', label: labels.heroStats.under18, icon: ShieldCheck },
  ];

  const routeCards = [
    {
      eyebrow: labels.membershipCard.eyebrow,
      title: labels.membershipCard.title,
      text: labels.membershipCard.text,
      cta: labels.membershipCard.cta,
      route: '/technopark/membership' as const,
      highlight: labels.pricingCards.membership.badge,
    },
    {
      eyebrow: labels.programsCard.eyebrow,
      title: labels.programsCard.title,
      text: labels.programsCard.text,
      cta: labels.programsCard.cta,
      route: '/technopark/instructions' as const,
      highlight: isBs ? 'OD 180 KM / MJ.' : 'FROM 180 KM / MO.',
    },
  ];

  const spaceTabs: SpaceTab[] = [
    {
      id: 'location',
      label: 'Bra\u0107e Muli\u0107 81',
      icon: MapPin,
      description: isBs
        ? 'Technopark je na adresi Bra\u0107e Muli\u0107 81, na vrhu zgrade, sa otvorenim pogledom, prirodnim svjetlom i suncem koje prostor drzi zivim kroz citav dan.'
        : 'Technopark is located at Bra\u0107e Muli\u0107 81, at the top of the building, with an open view, natural light, and steady sunlight that keeps the space alive through the day.',
      cards: isBs
        ? [
            { title: 'Rooftop lokacija', text: 'Vrh zgrade daje vise mira, bolji pogled i cistiji dnevni osjecaj prostora.' },
            { title: 'Prirodno svjetlo', text: 'Sunce i otvorenost prostora cine boravak ugodnijim i manje napornim.' },
            { title: 'Stalan parking', text: 'Parking je dostupan za vise vozila, pa dolazak i preuzimanje ostaju jednostavni.' },
            { title: 'Laka orijentacija', text: 'Adresa je jasna, pristup jednostavan, a roditelji lako znaju gdje djeca dolaze.' },
            { title: 'Mirniji kontekst', text: 'Nije haotican prolazni prostor, nego mjesto koje vec na ulazu djeluje fokusirano.' },
            { title: 'Sarajevska tacka', text: 'Lokacija je gradska, ali i dalje dovoljno mirna za dnevni ritam rada i programa.' },
          ]
        : [
            { title: 'Rooftop location', text: 'The top-floor position gives the room more calm, a better view, and a cleaner daytime feel.' },
            { title: 'Natural light', text: 'Sunlight and openness make longer stays more pleasant and less draining.' },
            { title: 'Permanent parking', text: 'Parking is available for multiple vehicles, keeping drop-off and pickup simple.' },
            { title: 'Easy to find', text: 'The address is clear, access is straightforward, and parents always know where kids arrive.' },
            { title: 'Calmer context', text: 'It is not a chaotic pass-through space, but a place that already feels focused on entry.' },
            { title: 'City access', text: 'The location is urban and connected, while still calm enough for daily work and programs.' },
          ],
    },
    {
      id: 'layout',
      label: '140M2',
      icon: Building2,
      description: isBs
        ? 'Na 140m2 Technopark spaja 15 AI coding mjesta, chill lounge, gaming kutke, maker opremu i dovoljno prostora da i rad i pauza imaju smisla.'
        : 'Across 140m2, Technopark combines 15 AI coding places, a chill lounge, gaming corners, maker equipment, and enough breathing room for both work and breaks to make sense.',
      cards: isBs
        ? [
            { title: '15 AI mjesta', text: 'Svaka stanica je pripremljena za ucenje, testiranje ideja i brzi rad uz AI alate.' },
            { title: 'Coding + chill lounge', text: 'Radni dio i lounge dio zive zajedno, bez osjecaja sterilne ucionice.' },
            { title: 'Zona za school projekte', text: 'Prostor je dovoljno fleksibilan za skolske zadatke, prototipe i showcase rad.' },
            { title: 'Gaming i reset', text: 'PS5, VR i chill corner ostaju tu za pauzu, reset i drustveni dio prostora.' },
            { title: 'Maker energija', text: '3D printer i filament daju prostoriji stvaran maker karakter, ne samo screens-only vibe.' },
            { title: 'Otvoren raspored', text: '15 ljudi je gornji limit upravo da prostor ostane prohodan, pregledan i komforan.' },
          ]
        : [
            { title: '15 AI stations', text: 'Each station is prepared for learning, testing ideas, and moving fast with AI tools.' },
            { title: 'Coding + chill lounge', text: 'The work zone and lounge zone live together without feeling like a sterile classroom.' },
            { title: 'School project zone', text: 'The layout stays flexible enough for school tasks, prototypes, and showcase work.' },
            { title: 'Gaming and reset', text: 'PS5, VR, and the chill corner remain available for breaks, reset, and social time.' },
            { title: 'Maker energy', text: 'The 3D printer and filament give the room a real maker feel, not just a screens-only vibe.' },
            { title: 'Open layout', text: 'Fifteen people is the hard cap so the room stays walkable, readable, and comfortable.' },
          ],
    },
    {
      id: 'rhythm',
      label: isBs ? 'SIGURAN DNEVNI RITAM' : 'SAFE DAYTIME RHYTHM',
      icon: ShieldCheck,
      description: isBs
        ? 'Dio dana do 17:00 je slozen kao membership ritam za produktivan boravak, a nakon toga prostor prelazi u mentorski program. Fokus je da se svaki dolazak iskoristi za nesto korisno, ali gaming i dalje ostaje slobodan dio iskustva.'
        : 'The part of the day before 17:00 is structured as a membership rhythm for productive time in the space, and after that the room shifts into mentor-led programs. The focus is that every visit should be used for something useful, while gaming still remains a free part of the experience.',
      cards: isBs
        ? [
            { title: 'Produktivan ulaz', text: 'Ideja prostora je da se u njega ulazi da se napravi nesto korisno, samostalno ili uz pomoc.' },
            { title: 'Gaming ostaje slobodan', text: 'Igranje nije zabranjeno; samo nije jedini razlog dolaska i dio je balansa prostora.' },
            { title: '2 x 2h dnevno', text: 'Open space radi kroz dva 2h termina dnevno po clanu, odnosno maksimalno 4h.' },
            { title: 'Limit 15 ljudi', text: 'Isti broj vazi i za membership termin i za svaki kurs, zbog sigurnosti i kontrole.' },
            { title: 'Samo za djecu i mlade', text: 'Cijeli koncept, raspored i ton prostora su slozeni za u18 clanove i njihove roditelje.' },
            { title: 'Od 17:00 programi', text: 'Kad krene vece, prostor prelazi u grupni mentorski rad i jasan programski rezim.' },
          ]
        : [
            { title: 'Productive entry', text: 'The point of the space is that people enter it to make something useful, alone or with help.' },
            { title: 'Gaming stays free', text: 'Gaming is not forbidden; it simply is not the only reason to show up and stays part of the balance.' },
            { title: '2 x 2h per day', text: 'Open space works through two 2-hour visits per member, with a 4-hour daily maximum.' },
            { title: '15-person cap', text: 'The same number applies to every membership slot and every course for safety and control.' },
            { title: 'Children and youth only', text: 'The concept, schedule, and tone of the space are built for under-18 members and their parents.' },
            { title: 'Programs from 17:00', text: 'When evening starts, the space shifts into group mentor work and a clear program mode.' },
          ],
    },
  ];

  const activeSpaceSection = spaceTabs.find((tab) => tab.id === activeSpaceTab) ?? spaceTabs[0];

  return (
    <TechnoparkPageShell>
      <TechnoparkHeroSection
        current="/technopark"
        lang={lang}
        onNavigate={onNavigate}
        showSubnav={false}
        badge={labels.badge}
        badgeIcon={BadgeCheck}
        title={labels.title}
        subtitle={labels.subtitle}
        leftContent={
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => onNavigate('/technopark/instructions')}
              className="inline-flex items-center gap-2 rounded-sm bg-blue-600 px-6 py-4 text-sm font-bold font-mono uppercase tracking-[0.18em] text-white transition-all hover:bg-blue-700 hover:shadow-[0_0_18px_rgba(37,99,235,0.55)]"
            >
              <CalendarDays className="h-4 w-4" />
              {labels.programsCard.heroCta}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/technopark/membership')}
              className="inline-flex items-center gap-2 rounded-sm border border-white/15 px-6 py-4 text-sm font-bold font-mono uppercase tracking-[0.18em] text-white transition-colors hover:border-blue-500 hover:bg-blue-500/10"
            >
              <Ticket className="h-4 w-4 text-blue-300" />
              {labels.membershipCard.heroCta}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        }
        rightContent={
          <div className="grid grid-cols-2 gap-4 lg:w-full lg:max-w-[34rem] lg:justify-self-center">
            {heroCards.map((card) => (
              <TechnoparkStatCard
                key={card.label}
                value={card.value}
                label={card.label}
                icon={card.icon}
              />
            ))}
          </div>
        }
      />

      <section id="technopark-ambijent" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={labels.amenitiesTitle} subtitle={labels.amenitiesSubtitle} />
          <div id="technopark-sadrzaj" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {amenities.map((amenity) => {
              const Icon = amenity.icon;
              return (
                <article
                  key={isBs ? amenity.titleBs : amenity.title}
                  className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-950/20 via-[#05070c] to-black p-8"
                >
                  <div className="flex h-20 w-20">
                    <div className="flex h-20 w-20 items-center justify-center rounded-[1.35rem] bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.35)]">
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="mt-8 text-3xl font-black leading-tight">
                    {isBs ? amenity.titleBs : amenity.title}
                  </h3>
                  <p className="mt-5 text-lg text-gray-300 font-mono leading-relaxed">
                    {isBs ? amenity.descriptionBs : amenity.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="technopark-lokacija" className="border-t border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={labels.spaceTitle} subtitle={labels.spaceSubtitle} />
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-[#070b12] to-black p-6 sm:p-8">
              <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="inline-flex min-w-max flex-nowrap gap-3">
                  {spaceTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = tab.id === activeSpaceTab;

                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveSpaceTab(tab.id)}
                        className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-xs font-mono tracking-[0.22em] uppercase transition-colors ${
                          isActive
                            ? 'border-blue-500/40 bg-blue-500/10 text-blue-200'
                            : 'border-white/10 bg-white/5 text-gray-300 hover:border-blue-500/30 hover:text-white'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div key={activeSpaceSection.id} className="mt-8">
                <p className="max-w-4xl border-l-2 border-blue-500 pl-6 font-mono text-base leading-relaxed text-blue-100 md:text-[1.35rem] md:leading-[1.65]">
                  {activeSpaceSection.description}
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {activeSpaceSection.cards.map((card) => (
                    <div key={card.title} className="rounded-[1.7rem] border border-white/10 bg-black/55 p-6">
                      <div className="text-[1.05rem] font-mono leading-relaxed text-gray-100">
                        {card.title}
                      </div>
                      <p className="mt-3 text-sm font-mono leading-relaxed text-gray-400">
                        {card.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-950/20 via-[#06080d] to-black p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-mono tracking-[0.22em] uppercase text-blue-300">
                <Sparkles className="h-4 w-4" />
                {labels.flowEyebrow}
              </div>

              <div className="mt-6 space-y-4">
                {labels.flowCards.map((card) => (
                  <div key={card.label} className="rounded-[1.7rem] border border-white/10 bg-white/5 p-5">
                    <div className="text-3xl font-black tracking-tight">{card.value}</div>
                    <div className="mt-2 text-xs font-mono uppercase tracking-[0.18em] text-blue-300">
                      {card.label}
                    </div>
                    <p className="mt-3 text-sm font-mono leading-relaxed text-gray-400">
                      {card.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={labels.routesTitle} subtitle={labels.routesSubtitle} />
          <div className="grid gap-6 lg:grid-cols-2">
            {routeCards.map((card) => (
              <div
                key={card.route}
                className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-950/20 via-[#06080d] to-black p-8"
              >
                <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono tracking-[0.16em] uppercase text-gray-300">
                  {card.eyebrow}
                </div>
                <div className="mt-4 text-4xl font-black leading-tight">{card.title}</div>
                <p className="mt-4 flex-1 text-base font-mono leading-relaxed text-gray-300">{card.text}</p>
                <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="inline-flex whitespace-nowrap rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono tracking-[0.16em] uppercase text-emerald-300">
                    {card.highlight}
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate(card.route)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-blue-600 px-5 py-4 text-sm font-bold font-mono uppercase tracking-[0.18em] transition-all hover:bg-blue-700 hover:shadow-[0_0_18px_rgba(37,99,235,0.55)] lg:w-auto lg:min-w-[18rem]"
                  >
                    {card.cta}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="technopark-pricing" className="border-t border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={labels.pricingTitle} subtitle={labels.pricingSubtitle} />
          <div className="grid gap-6 xl:grid-cols-3">
            {[
              {
                ...labels.pricingCards.membership,
                onClick: () => onNavigate('/technopark/membership'),
              },
              {
                ...labels.pricingCards.beginnerPrograms,
                onClick: () => onNavigate('/technopark/instructions'),
              },
              {
                ...labels.pricingCards.advancedPrograms,
                onClick: () => onNavigate('/technopark/instructions'),
              },
            ].map((card) => (
              <div
                key={card.eyebrow}
                className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-[#070b12] to-black p-7"
              >
                <div className="text-xs font-mono uppercase tracking-[0.18em] text-blue-300">{card.eyebrow}</div>
                <div className="mt-4 text-3xl font-black leading-tight">{card.title}</div>
                {card.badge ? (
                  <div className="mt-6 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.16em] text-emerald-300">
                    {card.badge}
                  </div>
                ) : null}
                <div className="mt-6 flex items-end gap-3">
                  <div className="text-6xl font-black tracking-tight">{card.price}</div>
                  {card.oldPrice ? <div className="pb-1 text-xl font-mono text-gray-500 line-through">{card.oldPrice}</div> : null}
                </div>
                <div className="mt-6 space-y-3">
                  {card.items.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm font-mono text-gray-300">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={card.onClick}
                  className="mt-8 inline-flex items-center gap-2 rounded-sm border border-white/15 px-5 py-4 text-sm font-bold font-mono uppercase tracking-[0.18em] text-white transition-colors hover:border-blue-500 hover:bg-blue-500/10"
                >
                  {card.button}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={labels.extrasTitle} subtitle={labels.extrasSubtitle} />
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-950/25 via-[#06080d] to-black p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.7rem] border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-mono uppercase tracking-[0.16em] text-blue-300">
                  {isBs ? '15 MJESTA / LIMIT' : '15 PLACES / CAP'}
                </div>
                <div className="mt-3 text-4xl font-black">15</div>
                <p className="mt-3 text-sm font-mono leading-relaxed text-gray-400">
                  {isBs
                    ? 'Isti limit vazi za svaki dnevni termin i za svaku programsku grupu.'
                    : 'The same cap applies to every daily slot and every program group.'}
                </p>
              </div>
              <div className="rounded-[1.7rem] border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-mono uppercase tracking-[0.16em] text-blue-300">
                  {isBs ? 'ROOFTOP FEEL' : 'ROOFTOP FEEL'}
                </div>
                <div className="mt-3 text-4xl font-black">{isBs ? 'Sunce +' : 'Sun +'}</div>
                <p className="mt-3 text-sm font-mono leading-relaxed text-gray-400">
                  {isBs
                    ? 'Vrh zgrade, pogled i dnevno svjetlo daju prostoru energiju koja nije zatvorena i teska.'
                    : 'The top floor, view, and daylight give the space an energy that does not feel closed or heavy.'}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-[1.7rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-300">
                    <CarFront className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{isBs ? 'Stalan parking za vise vozila' : 'Permanent parking for multiple vehicles'}</div>
                    <div className="text-sm font-mono text-gray-400">
                      {isBs ? 'Laksi dolazak, cekanje i preuzimanje.' : 'Easier arrival, waiting, and pickup.'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.7rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-300">
                    <SunMedium className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{isBs ? 'Lokacija na vrhu zgrade' : 'Top-floor location'}</div>
                    <div className="text-sm font-mono text-gray-400">
                      {isBs
                        ? 'Prelijep pogled, puno prirodnog svjetla i konstantno sunce kroz dan.'
                        : 'Beautiful views, plenty of natural light, and steady sunshine throughout the day.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <CrossSellPanel
                badge={labels.bundleBadge}
                title={labels.bundleTitle}
                text={labels.bundleText}
                buttonLabel={labels.bundleButton}
                onClick={() => onNavigate('/technopark/membership')}
              />
            </div>
          </div>
        </div>
      </section>
    </TechnoparkPageShell>
  );
};
