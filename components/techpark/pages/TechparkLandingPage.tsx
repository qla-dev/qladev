import React from 'react';
import {
  ArrowRight,
  Blocks,
  CalendarDays,
  CarFront,
  Clock3,
  Gamepad2,
  GraduationCap,
  MapPin,
  Monitor,
  Search,
  ShieldCheck,
  SunMedium,
  Ticket,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react';
import { amenities, programs } from '../data';
import { SectionHeader } from '../shared/SectionHeader';
import { TechparkHeroSection } from '../shared/TechparkHeroSection';
import { TechparkPageShell } from '../shared/TechparkPageShell';
import { TechparkStatCard } from '../shared/TechparkStatCard';
import type { TechparkPageProps } from '../types';
import { useScrollRoot } from '../../ScrollRootContext';

type SpaceTabId = 'location' | 'details' | 'rhythm';

interface SpaceTabCard {
  title: string;
  text: string;
}

interface SpaceGalleryCard {
  title: string;
  text: string;
  image: string;
  previewPosition: string;
}

interface SpaceTab {
  id: SpaceTabId;
  label: string;
  mobileLabel: string;
  icon: LucideIcon;
  headline?: string;
  description: string;
  cards?: SpaceTabCard[];
  gallery?: SpaceGalleryCard[];
}

export const TechparkLandingPage: React.FC<TechparkPageProps> = ({ lang, onNavigate }) => {
  const isBs = lang === 'bs';
  const [activeSpaceTab, setActiveSpaceTab] = React.useState<SpaceTabId>('location');
  const [zoomedSpaceImage, setZoomedSpaceImage] = React.useState<SpaceGalleryCard | null>(null);
  const techparkPeopleCount = '0/15';
  const amenitiesSectionRef = React.useRef<HTMLElement>(null);
  const amenitiesScrollerRef = React.useRef<HTMLDivElement>(null);
  const amenityCardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const scrollRootRef = useScrollRoot();
  const amenityRevealOrder = React.useMemo(() => {
    return Array.from({ length: amenities.length }, (_, index) => index);
  }, []);

  React.useEffect(() => {
    if (!zoomedSpaceImage) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setZoomedSpaceImage(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoomedSpaceImage]);

  const labels = {
    title: isBs ? 'TECHPARK ZA NOVU DIGITALNU GENERACIJU' : 'TECHPARK FOR THE NEXT DIGITAL GENERATION',
    subtitle: isBs
      ? 'Techpark je osmišljen kao strukturiran prostor za djecu i mlade u Sarajevu: open-space dio dostupan je od 08:00 do 16:00 za produktivan rad, učenje i boravak, dok od 17:00 počinju boot-camp programi sa mentorisanim radom i jasnim razvojnim fokusom.'
      : 'Techpark is a structured space for children and youth in Sarajevo, with open space from 08:00 to 16:00 and mentor-led boot-camp programs from 17:00 onward.',
    heroStats: {
      membership: isBs ? 'Open-space boravak' : 'Open-space stay',
      instructions: isBs ? 'Boot-camp programi' : 'Boot-camp programs',
      seats: isBs ? 'Kapacitet prostora' : 'Space capacity',
      under18: isBs ? 'Samo za djecu i mlade' : 'For children and youth',
    },
    amenitiesTitle: isBs ? 'AMBIJENT + SADRŽAJ' : 'AMBIENT + AMENITIES',
    amenitiesSubtitle: isBs
      ? '15 AI coding mjesta + chill lounge, PS5, VR, 3D printer, rooftop lokacija i sve ostalo što Techpark čini mjestom u koje se ulazi da se napravi nešto dobro.'
      : 'A 15-place coding + chill lounge, PS5, VR, 3D printer, rooftop location, and everything else that makes Techpark a space you enter to build something meaningful.',
    spaceTitle: isBs ? 'PROSTOR + LOKACIJA' : 'SPACE + LOCATION',
    spaceSubtitle: isBs
      ? 'Tri pogleda na isti prostor: gdje smo, kako je složen i zašto dnevni ritam ostaje siguran i jasan za djecu, mlade i roditelje.'
      : 'Three ways to read the same space: where it is, how it is laid out, and why the daytime rhythm stays safe and clear for kids, youth, and parents.',
    flowEyebrow: isBs ? 'DNEVNI FLOW' : 'DAILY FLOW',
    flowCards: [
      {
        value: '08:00 - 16:00',
        label: isBs ? 'Open space membership' : 'Open space membership',
        text: isBs ? 'Dolazak, rad, chill i rezervacije po 2h.' : 'Arrival, work, chill, and reservations in 2h slots.',
      },
      {
        value: isBs ? 'Poslije 17:00' : 'After 17:00',
        label: isBs ? 'Boot-camp programi' : 'Boot-camp programs',
        text: isBs ? 'Mentorski rad u manjim grupama do 15 ljudi.' : 'Mentor-led work in groups of up to 15 people.',
      },
      {
        value: '15',
        label: isBs ? 'Maksimalan kapacitet' : 'Maximum capacity',
        text: isBs ? 'Isti limit važi i za open space i za svaki kurs.' : 'The same limit applies to open space and every course.',
      },
      {
        value: 'U18',
        label: isBs ? 'Djeca i mladi' : 'Children and youth',
        text: isBs ? 'Dnevni ritam je složen za sigurnije i fokusiranije korištenje prostora.' : 'The daytime rhythm is built for a safer, more focused use of the space.',
      },
    ],
    routesTitle: isBs ? 'ODABERI SVOJ ULAZ' : 'CHOOSE YOUR WAY IN',
    routesSubtitle: isBs
      ? 'Techpark ima dva jasna ulaza: dnevni open space membership i večernji boot-camp od 17:00.'
      : 'Techpark has two clear entry points: daytime open-space membership and the evening boot-camp from 17:00 onward.',
    pricingTitle: isBs ? 'CJENOVNIK' : 'PRICING',
    pricingSubtitle: isBs
      ? 'Sve cijene su po mjesecu. Early-bird cijene su aktivne do 1. maja, a membership i boot-camp programi mogu se kombinovati kroz dodatne bundle pogodnosti.'
      : 'All prices are per month. Early-bird prices stay active until May 1, and membership and boot-camp programs can be combined through extra bundle benefits.',
    extrasTitle: isBs ? 'DODATNE POGODNOSTI' : 'EXTRA BENEFITS',
    extrasSubtitle: isBs
      ? 'Ovo nije dio cjenovnika nego vrijednost samog prostora: limit, rooftop osjećaj, parking i dodatni membership + program bundle.'
      : 'This is not part of pricing, but part of the space itself: the cap, rooftop feel, parking, and the extra membership + program bundle.',
    membershipCard: {
      eyebrow: isBs ? 'MJESECNI MEMBERSHIP' : 'MONTHLY MEMBERSHIP',
      title: isBs ? 'Otvoren prostor od 08:00 do 16:00' : 'Open space from 08:00 to 16:00',
      text: isBs
        ? 'Rezervacije idu u 2h slotovima, maksimalno 4h dnevno, uz limit od 15 ljudi po terminu.'
        : 'Reservations run in 2-hour slots, with a 4-hour daily maximum and a 15-person cap per slot.',
      cta: isBs ? 'OTVORI ČLANSTVO' : 'OPEN MEMBERSHIP',
      heroCta: isBs ? 'ČLANSTVO' : 'MEMBERSHIP',
    },
    programsCard: {
      eyebrow: isBs ? 'BOOT-CAMP OD 17:00' : 'BOOT-CAMP FROM 17:00',
      title: isBs ? 'Osam boot-camp programa sa Beginner i Advanced putem' : 'Eight boot-camp programs with Beginner and Advanced paths',
      text: isBs
        ? 'Web, app, AI, dizajn, 3D, game dev, Roblox i video editing u grupama do 15 polaznika.'
        : 'Web, app, AI, design, 3D, game dev, Roblox, and video editing in groups of up to 15 participants.',
      cta: isBs ? 'OTVORI BOOT-CAMP' : 'OPEN BOOT-CAMP',
      heroCta: 'BOOT-CAMP',
    },
    pricingCards: {
      membership: {
        eyebrow: isBs ? 'OPEN SPACE' : 'OPEN SPACE',
        title: isBs ? 'Mjesečni pass' : 'Monthly pass',
        price: '60 KM',
        oldPrice: '100 KM',
        badge: isBs ? '40% POPUST DO 1. MAJA' : '40% OFF BEFORE MAY 1',
        items: isBs
          ? ['08:00 - 16:00 pristup', '2 termina dnevno po 2h', 'Maksimalno 15 ljudi', 'Chill lounge, gaming i snack zona']
          : ['08:00 - 16:00 access', '2 daily slots of 2h', 'Maximum 15 people', 'Chill lounge, gaming, and snack zone'],
        button: isBs ? 'Učlani se u Techpark' : 'RESERVE MEMBERSHIP',
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
        button: isBs ? 'Započni boot-camp' : 'OPEN BEGINNER',
      },
      advancedPrograms: {
        eyebrow: isBs ? 'ADVANCED PATH' : 'ADVANCED PATH',
        title: isBs ? 'Advanced program' : 'Advanced program',
        price: '180 KM',
        oldPrice: undefined,
        badge: isBs ? 'CIJENA PO MJESECU' : 'PRICE PER MONTH',
        items: isBs
          ? ['180 KM po mjesecu', 'Trajanje: 6 mjeseci', `${programs.length} programa u ponudi`, 'Maksimalno 15 polaznika po grupi']
          : ['180 KM per month', 'Duration: 6 months', `${programs.length} programs available`, 'Maximum 15 students per group'],
        button: isBs ? 'Započni boot-camp' : 'OPEN ADVANCED',
      },
    },
    bundleBadge: isBs ? 'BUNDLE BONUS' : 'BUNDLE BONUS',
    bundleTitle: isBs ? 'Membership i boot-camp mogu ići zajedno.' : 'Membership and boot-camp can work together.',
    bundleText: isBs
      ? 'Ako neko uzme open space, otvara se 40% popusta na boot-camp programe. Ako krene boot-camp, open space može ići uz 50% bundle pogodnost.'
      : 'If someone takes open space, they unlock 40% off boot-camp programs. If they start boot-camp, open space can be added with a 50% bundle benefit.',
    bundleButton: isBs ? 'OTVORI ČLANSTVO' : 'OPEN MEMBERSHIP',
  };

  const heroCards = [
    { value: '08:00 - 16:00', label: labels.heroStats.membership, icon: Clock3 },
    { value: isBs ? 'Poslije 17:00' : 'After 17:00', label: labels.heroStats.instructions, icon: CalendarDays },
    { value: techparkPeopleCount, label: labels.heroStats.seats, icon: Users },
    { value: 'U18', label: labels.heroStats.under18, icon: ShieldCheck },
  ];

  const locationGallery: SpaceGalleryCard[] = [
    {
      title: isBs ? 'No\u0107ni kadar 01' : 'Night Frame 01',
      text: isBs
        ? '\u0160iri pogled na objekat, raskrsnicu i qla.dev signage iz prvog prilaza.'
        : 'A wider view of the building, junction, and qla.dev sign from the first approach.',
      image: '/techpark-hero.png',
      previewPosition: 'center 74%',
    },
    {
      title: isBs ? 'No\u0107ni kadar 02' : 'Night Frame 02',
      text: isBs
        ? 'Kadar koji vi\u0161e hvata sam objekat i svjetlo koje ga izdvaja no\u0107u.'
        : 'A frame that leans more on the building itself and the light that sets it apart at night.',
      image: '/techpark-gallery-source.png',
      previewPosition: 'center 70%',
    },
    {
      title: isBs ? 'Prilaz + sign' : 'Approach + Sign',
      text: isBs
        ? 'U fokusu ostaju putanja dolaska, raskrsnica i prepoznatljiv natpis na vrhu.'
        : 'The arrival path, junction, and rooftop sign stay in focus together.',
      image: '/techpark-hero.png',
      previewPosition: '28% 76%',
    },
    {
      title: isBs ? 'Ugao objekta' : 'Building Angle',
      text: isBs
        ? 'Bo\u010dni ugao pokazuje kako lokacija izgleda iz uli\u010dnog pravca pri dolasku.'
        : 'The side angle shows how the location reads from the street on arrival.',
      image: '/techpark-gallery-source.png',
      previewPosition: '76% 68%',
    },
    {
      title: isBs ? 'Raskrsnica + ulaz' : 'Junction + Entry',
      text: isBs
        ? 'Fotografija zadr\u017eava i promet i ulazni kontekst, \u0161to poma\u017ee za orijentaciju.'
        : 'This frame keeps both traffic and entry context visible, which helps orientation.',
      image: '/techpark-hero.png',
      previewPosition: '74% 82%',
    },
    {
      title: isBs ? 'Svjetlo lokacije' : 'Location Glow',
      text: isBs
        ? 'Drugi kadar sa ceste dodatno nagla\u0161ava kako objekat izgleda pod no\u0107nim svjetlom.'
        : 'The second street-side shot pushes the way the building reads under night lighting.',
      image: '/techpark-gallery-source.png',
      previewPosition: '22% 78%',
    },
  ];

  const spaceTabs: SpaceTab[] = [
    {
      id: 'location',
      label: 'Bra\u0107e Muli\u0107 81',
      mobileLabel: 'BM 81',
      icon: MapPin,
      description: isBs
        ? 'Techpark je na adresi Bra\u0107e Muli\u0107 81, na vrhu zgrade, sa otvorenim pogledom, prirodnim svjetlom i suncem koje prostor drži živim kroz čitav dan.'
        : 'Techpark is located at Bra\u0107e Muli\u0107 81, at the top of the building, with an open view, natural light, and steady sunlight that keeps the space alive through the day.',
      cards: isBs
        ? [
            { title: 'Rooftop lokacija', text: 'Vrh zgrade daje više mira, bolji pogled i čišći dnevni osjećaj prostora.' },
            { title: 'Prirodno svjetlo', text: 'Sunce i otvorenost prostora čine boravak ugodnijim i manje napornim.' },
            { title: 'Stalan parking', text: 'Parking je dostupan za više vozila, pa dolazak i preuzimanje ostaju jednostavni.' },
            { title: 'Laka orijentacija', text: 'Adresa je jasna, pristup jednostavan, a roditelji lako znaju gdje djeca dolaze.' },
            { title: 'Mirniji kontekst', text: 'Nije haotičan prolazni prostor, nego mjesto koje već na ulazu djeluje fokusirano.' },
            { title: 'Dobra gradska lokacija', text: 'Lokacija je gradska, ali i dalje dovoljno mirna za dnevni ritam rada i programa.' },
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
      id: 'details',
      label: isBs ? 'POGLED + PRISTUP' : 'VIEW + ACCESS',
      mobileLabel: isBs ? 'PRISTUP' : 'ACCESS',
      icon: MapPin,
      description: isBs
        ? 'Techpark je na adresi Bra\u0107e Muli\u0107 81, na vrhu zgrade, sa otvorenim pogledom, prirodnim svjetlom i suncem koje prostor dr\u017ei \u017eivim kroz \u010ditav dan.'
        : 'Techpark is located at Bra\u0107e Muli\u0107 81, at the top of the building, with an open view, natural light, and steady sunlight that keeps the space alive through the day.',
      cards: isBs
        ? [
            { title: '15 AI mjesta', text: 'Svaka stanica je pripremljena za učenje, testiranje ideja i brzi rad uz AI alate.' },
            { title: 'Coding + chill lounge', text: 'Radni dio i lounge dio žive zajedno, bez osjećaja sterilne učionice.' },
            { title: 'Zona za school projekte', text: 'Prostor je dovoljno fleksibilan za školske zadatke, prototipe i showcase rad.' },
            { title: 'Gaming i reset', text: 'PS5, VR i chill corner ostaju tu za pauzu, reset i društveni dio prostora.' },
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
      mobileLabel: isBs ? 'RITAM' : 'RHYTHM',
      icon: ShieldCheck,
      description: isBs
        ? 'Dio dana do 17:00 je složen kao membership ritam za produktivan boravak, a nakon toga prostor prelazi u mentorski program. Fokus je da se svaki dolazak iskoristi za nešto korisno, ali gaming i dalje ostaje slobodan dio iskustva.'
        : 'The part of the day before 17:00 is structured as a membership rhythm for productive time in the space, and after that the room shifts into mentor-led programs. The focus is that every visit should be used for something useful, while gaming still remains a free part of the experience.',
      cards: isBs
        ? [
            { title: 'Produktivan ulaz', text: 'Ideja prostora je da se u njega ulazi da se napravi nešto korisno, samostalno ili uz pomoć.' },
            { title: 'Gaming ostaje slobodan', text: 'Igranje nije zabranjeno; samo nije jedini razlog dolaska i dio je balansa prostora.' },
            { title: '2 x 2h dnevno', text: 'Open space radi kroz dva 2h termina dnevno po članu, odnosno maksimalno 4h.' },
            { title: 'Limit 15 ljudi', text: 'Isti broj važi i za membership termin i za svaki kurs, zbog sigurnosti i kontrole.' },
            { title: 'Samo za djecu i mlade', text: 'Cijeli koncept, raspored i ton prostora su složeni za u18 članove i njihove roditelje.' },
            { title: 'Od 17:00 programi', text: 'Kad krene veče, prostor prelazi u grupni mentorski rad i jasan programski režim.' },
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
  const spaceCardIcons: Record<SpaceTabId, LucideIcon[]> = {
    location: [Search, Search, Search, Search, Search, Search],
    details: [Monitor, SunMedium, CarFront, MapPin, ShieldCheck, MapPin],
    rhythm: [Monitor, Gamepad2, Clock3, Users, ShieldCheck, CalendarDays],
  };

  const activeSpaceSection = spaceTabs.find((tab) => tab.id === activeSpaceTab) ?? spaceTabs[0];
  const locationOverviewSection = spaceTabs.find((tab) => tab.id === 'location');
  const locationGalleryTitle = isBs ? 'GALERIJA LOKACIJE' : 'LOCATION GALLERY';
  const locationGalleryDescription = isBs
    ? 'Prvi pregled lokacije kroz galeriju: nekoliko kadrova istog mjesta koji pokazuju prilaz, znak, okolinu i no\u0107ni karakter objekta prije detalja o samom prostoru.'
    : 'A first look at the location through a gallery: several frames of the same place showing the approach, sign, surroundings, and nighttime character before the space details.';
  const amenityTitleLines = isBs
    ? [
        ['15 AI Stanica', '+ Chill Lounge'],
        ['PlayStation 5', 'Zona + Turniri'],
        ['VR Kutak', 'i Virtualna Realnost'],
        ['Stoni Fudbal', 'za Reset'],
        ['3D Printer', '+ Besplatan Filament'],
        ['Arduino', '+ Robotika Kitovi'],
        ['Organizacija', 'takmičenja + hackatona'],
        ['Parking', '+ Lak Dolazak'],
        ['Rooftop', 'Lokacija + Pogled'],
      ]
    : [
        ['15 AI Stations', '+ Chill Lounge'],
        ['PlayStation 5', 'Zone + Tournaments'],
        ['VR Corner', '+ Virtual Reality'],
        ['Table Football', 'for Reset'],
        ['3D Printer', '+ Free Filament'],
        ['Arduino', '+ Robotics Kits'],
        ['Competition', '+ Hackathon Hosting'],
        ['Parking', '+ Easy Arrival'],
        ['Rooftop', 'Location + View'],
      ];
  const amenityDescriptions = isBs
    ? [
        '15 AI coding mjesta i chill lounge za fokusiran rad, pauzu, gaming i reset tokom dana.',
        'PS5 zona za pauzu, brze turnire, lokalni multiplayer i reset između sesija.',
        'VR kutak i iskustva virtualne realnosti koja tehnologiju čine opipljivom, zabavnom i dovoljno stvarnom da ostanu u glavi.',
        'Brza timska pauza za rivalstvo, smijeh i reset prije nego se opet vratiš na build.',
        '3D print za prototipe, dijelove i školske projekte, uz filament spreman za test i izradu.',
        'Robotika i elektronika za senzore, logiku, kretanje i stvarne prototipe koji rade u prostoru.',
        'Techpark može biti baza za organizaciju takmičenja, hackatona, timskih izazova i događaja koji okupljaju djecu i mlade oko pravljenja.',
        'Parking olakšava dolazak, čekanje i preuzimanje, bez gužve i nepotrebnog kruženja oko zgrade.',
        'Vrh zgrade daje više svjetla, bolji pogled i mirniji rooftop osjećaj kroz cijeli dan.',
      ]
    : [
        '15 AI coding places and a chill lounge for focused work, breaks, gaming, and reset through the day.',
        'PS5 zone for breaks, quick tournaments, local multiplayer, and social reset between sessions.',
        'A VR corner and virtual reality experiences that make technology feel immersive, tangible, fun, and easy to remember.',
        'Fast team breaks for rivalry, laughter, and a quick reset before going back into build mode.',
        '3D print for prototypes, parts, and school projects, with filament ready for testing and making.',
        'Electronics and robotics kits for sensors, logic, movement, automation, and working prototypes.',
        'Techpark can host competitions, hackathons, team challenges, and events that bring children and youth together around building.',
        'Parking keeps arrival, waiting, and pickup simple, without unnecessary circling or friction around the building.',
        'Top-floor placement gives more light, a better view, and a calmer rooftop feel all day.',
      ];
  const heroTitle = isBs ? (
    <>
      <span className="block">TECHPARK ZA{' '}</span>
      <span className="relative block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-white to-blue-600 bg-[length:200%_auto] animate-shimmer">
        NOVU DIGITALNU{' '}
      </span>
      <span className="block">GENERACIJU</span>
    </>
  ) : (
    <>
      <span className="block">TECHPARK FOR{' '}</span>
      <span className="relative block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-white to-blue-600 bg-[length:200%_auto] animate-shimmer">
        THE NEXT{' '}
      </span>
      <span className="block">DIGITAL GENERATION</span>
    </>
  );

  React.useEffect(() => {
    const revealLead = 0.22;
    const revealWindow = 0.24;
    const staggerStep = amenityRevealOrder.length > 1
      ? Math.max(0, 1 - revealLead - revealWindow) / (amenityRevealOrder.length - 1)
      : 0;

    const resetCardStyles = () => {
      amenityCardRefs.current.forEach((card) => {
        if (!card) return;

        card.style.opacity = '1';
        card.style.transform = 'none';
        card.style.boxShadow = '0 8px 18px rgba(0,0,0,0.18)';
      });
    };

    const handleScroll = () => {
      if (!amenitiesSectionRef.current) return;
      if (window.innerWidth < 640) {
        resetCardStyles();
        return;
      }

      const { top, height } = amenitiesSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight * 0.68;
      const end = -height * 0.18;

      let progress = (start - top) / (start - end);
      progress = Math.max(0, Math.min(1, progress));

      amenityRevealOrder.forEach((cardIndex, orderIndex) => {
        const card = amenityCardRefs.current[cardIndex];
        if (!card) return;

        const staggerStart = orderIndex * staggerStep;
        const localProgress = Math.max(0, Math.min(1, (progress - revealLead - staggerStart) / revealWindow));
        const scale = 0.78 + localProgress * 0.22;
        const translateY = (1 - localProgress) * 34;
        const rotateX = (1 - localProgress) * 18;

        card.style.opacity = localProgress.toString();
        card.style.transform = `perspective(900px) translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`;
        card.style.boxShadow = `0 ${8 + localProgress * 18}px ${18 + localProgress * 30}px rgba(0,0,0,${0.18 + localProgress * 0.18})`;
      });
    };

    const scrollTarget = scrollRootRef?.current ?? window;

    scrollTarget.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      scrollTarget.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [amenityRevealOrder, scrollRootRef]);

  React.useEffect(() => {
    const scroller = amenitiesScrollerRef.current;

    if (!scroller) return;

    let startX = 0;
    let startY = 0;
    let lastY = 0;
    let isVerticalGesture = false;

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];

      if (!touch) return;

      startX = touch.clientX;
      startY = touch.clientY;
      lastY = touch.clientY;
      isVerticalGesture = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];

      if (!touch) return;

      const deltaX = Math.abs(touch.clientX - startX);
      const deltaY = Math.abs(touch.clientY - startY);

      if (!isVerticalGesture && deltaY > 10 && deltaY > deltaX) {
        isVerticalGesture = true;
      }

      if (!isVerticalGesture) return;

      const offsetY = touch.clientY - lastY;
      const scrollTarget = scrollRootRef?.current;

      if (scrollTarget) {
        scrollTarget.scrollTop -= offsetY;
      } else {
        window.scrollBy({ top: -offsetY, left: 0, behavior: 'auto' });
      }

      lastY = touch.clientY;
      event.preventDefault();
    };

    const handleTouchEnd = () => {
      isVerticalGesture = false;
    };

    scroller.addEventListener('touchstart', handleTouchStart, { passive: true });
    scroller.addEventListener('touchmove', handleTouchMove, { passive: false });
    scroller.addEventListener('touchend', handleTouchEnd);
    scroller.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      scroller.removeEventListener('touchstart', handleTouchStart);
      scroller.removeEventListener('touchmove', handleTouchMove);
      scroller.removeEventListener('touchend', handleTouchEnd);
      scroller.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [scrollRootRef]);

  return (
    <TechparkPageShell>
      <TechparkHeroSection
        current="/techpark"
        lang={lang}
        onNavigate={onNavigate}
        showSubnav
        containerClassName="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16 sm:pb-16 lg:pt-28 lg:pb-16"
        title={heroTitle}
        titleClassName="text-[2.7rem] font-black tracking-tight leading-none sm:text-5xl md:text-6xl"
        subtitle={labels.subtitle}
        leftContent={
          <div className="mt-8 hidden sm:flex sm:flex-wrap sm:gap-4">
            <button
              type="button"
              onClick={() => onNavigate('/techpark/boot-camp')}
              className="inline-flex min-w-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-sm bg-blue-600 px-2.5 py-3 text-[10px] font-bold font-mono uppercase tracking-[0.12em] leading-none text-white transition-all hover:bg-blue-700 hover:shadow-[0_0_18px_rgba(37,99,235,0.55)] sm:gap-2 sm:px-6 sm:py-4 sm:text-sm sm:tracking-[0.18em]"
            >
              <CalendarDays className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {labels.programsCard.heroCta}
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/techpark/membership')}
              className="inline-flex min-w-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-sm border border-white/15 px-2.5 py-3 text-[10px] font-bold font-mono uppercase tracking-[0.12em] leading-none text-white transition-colors hover:border-blue-500 hover:bg-blue-500/10 sm:gap-2 sm:px-6 sm:py-4 sm:text-sm sm:tracking-[0.18em]"
            >
              <Ticket className="h-3.5 w-3.5 text-blue-300 sm:h-4 sm:w-4" />
              {labels.membershipCard.heroCta}
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        }
        rightContent={
          <div className="grid grid-cols-2 gap-4 lg:w-full lg:max-w-[34rem] lg:justify-self-center">
            {heroCards.map((card) => (
              <TechparkStatCard
                key={card.label}
                value={card.value}
                label={card.label}
                icon={card.icon}
              />
            ))}
          </div>
        }
      />

      <section ref={amenitiesSectionRef} id="techpark-ambijent" className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={labels.amenitiesTitle} subtitle={labels.amenitiesSubtitle} />
          <div className="-mx-4 sm:mx-0">
            <div
              ref={amenitiesScrollerRef}
              id="techpark-sadrzaj"
              className="grid grid-flow-col auto-cols-[84%] gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 px-4 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:grid-flow-row sm:auto-cols-auto sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:snap-none sm:px-0 xl:grid-cols-3"
            >
              {amenities.map((amenity, index) => {
                  const Icon = index === 6 ? CalendarDays : amenity.icon;
                  const title = isBs ? amenity.titleBs : amenity.title;
                const description = amenityDescriptions[index] ?? (isBs ? amenity.descriptionBs : amenity.description);
                const [titleLineOne, titleLineTwo] = amenityTitleLines[index] ?? [title, '\u00A0'];

                return (
                  <article
                    key={title}
                    ref={(el) => {
                      amenityCardRefs.current[index] = el;
                    }}
                    className="snap-start rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-950/20 via-[#05070c] to-black p-5 sm:p-8 will-change-[opacity,transform]"
                    style={{
                      opacity: 1,
                      transform: 'perspective(900px) translateY(0px) scale(1) rotateX(0deg)',
                    }}
                  >
                    <div className="flex h-14 w-14 sm:h-20 sm:w-20">
                      <div className="flex h-14 w-14 items-center justify-center rounded-[1rem] bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.35)] sm:h-20 sm:w-20 sm:rounded-[1.35rem]">
                        <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
                      </div>
                    </div>
                    <h3 className="mt-5 flex min-h-[4.7rem] flex-col justify-start text-xl font-black leading-[0.95] sm:mt-8 sm:min-h-[6.1rem] sm:text-3xl">
                      <span className="block">{titleLineOne}</span>
                      <span className="block">{titleLineTwo}</span>
                    </h3>
                    <p className="mt-4 min-h-[7rem] text-sm font-mono leading-relaxed text-gray-300 sm:mt-5 sm:min-h-[6.8rem] sm:text-lg">
                      {description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="techpark-lokacija" className="border-t border-white/10 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={labels.spaceTitle} subtitle={labels.spaceSubtitle} />
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="px-0 py-0">
              <div className="w-full overflow-x-auto pb-1 touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="inline-flex min-w-max snap-x snap-mandatory flex-nowrap gap-2 sm:gap-3">
                  {spaceTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = tab.id === activeSpaceTab;

                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveSpaceTab(tab.id)}
                        className={`inline-flex shrink-0 snap-start items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-[11px] font-mono tracking-[0.16em] uppercase transition-colors sm:px-5 sm:py-3 sm:text-xs sm:tracking-[0.22em] ${
                          isActive
                            ? 'border-blue-500/40 bg-blue-500/10 text-blue-200'
                            : 'border-white/10 bg-white/5 text-gray-300 hover:border-blue-500/30 hover:text-white'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="sm:hidden">{tab.mobileLabel}</span>
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div key={activeSpaceSection.id} className="mt-8">
                {activeSpaceSection.id === 'location' ? (
                  <div className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-blue-300">
                    {locationGalleryTitle}
                  </div>
                ) : null}
                <p className="max-w-full border-l-2 border-blue-500 pl-4 font-mono text-sm leading-7 text-blue-100 sm:pl-6 sm:text-base md:text-[1.35rem] md:leading-[1.65]">
                  {activeSpaceSection.id === 'location'
                    ? locationGalleryDescription
                    : activeSpaceSection.id === 'details'
                      ? locationOverviewSection?.description ?? activeSpaceSection.description
                      : activeSpaceSection.description}
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {activeSpaceSection.id === 'location'
                    ? locationGallery.map((card) => (
                        <button
                          key={card.title}
                          type="button"
                          onClick={() => setZoomedSpaceImage(card)}
                          className="rounded-[1.7rem] border border-white/10 bg-black/55 p-5 text-left transition-colors hover:border-blue-500/40 sm:p-6"
                        >
                          <div className="overflow-hidden rounded-[1.3rem] border border-white/10 bg-[#060b13]">
                            <img
                              src={card.image}
                              alt={card.title}
                              className="h-56 w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                              style={{ objectPosition: card.previewPosition }}
                            />
                          </div>
                          <div className="mt-5 flex items-start justify-between gap-4">
                            <div>
                              <div className="text-base font-mono leading-relaxed text-gray-100 sm:text-[1.05rem]">
                                {card.title}
                              </div>
                              <p className="mt-3 text-xs font-mono leading-relaxed text-gray-400 sm:text-sm">
                                {card.text}
                              </p>
                            </div>
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-300">
                              <Search className="h-5 w-5" />
                            </div>
                          </div>
                        </button>
                      ))
                    : (activeSpaceSection.id === 'details'
                        ? locationOverviewSection?.cards ?? []
                        : activeSpaceSection.cards ?? []
                      ).map((card, index) => {
                        const Icon = spaceCardIcons[activeSpaceSection.id][index] ?? activeSpaceSection.icon;

                        return (
                          <div key={card.title} className="rounded-[1.7rem] border border-white/10 bg-black/55 p-5 sm:p-6">
                            <div className="flex items-center gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-300">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="text-base font-mono leading-relaxed text-gray-100 sm:text-[1.05rem]">
                                  {card.title}
                                </div>
                                <p className="mt-3 text-xs font-mono leading-relaxed text-gray-400 sm:text-sm">
                                  {card.text}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 min-h-[420px] lg:min-h-full relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.1788082019953!2d18.3365875!3d43.831390299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c913598ff523%3A0xc25f9a4094f108ef!2sqla.dev!5e0!3m2!1sen!2sba!4v1776896943998!5m2!1sen!2sba"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="qla.dev location"
                className="absolute inset-0 h-full w-full"
              ></iframe>

              <div className="absolute inset-0 bg-blue-500/10 pointer-events-none mix-blend-overlay"></div>

              <div className="absolute inset-0 border border-white/5 pointer-events-none group-hover:border-blue-500/50 transition-colors duration-500 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {zoomedSpaceImage ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/88 px-4 py-8 backdrop-blur-sm"
          onClick={() => setZoomedSpaceImage(null)}
        >
          <div
            className="relative w-full max-w-5xl rounded-[2rem] border border-white/10 bg-[#05070c] p-4 shadow-[0_25px_100px_rgba(0,0,0,0.6)] sm:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoomedSpaceImage(null)}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/55 text-gray-200 transition-colors hover:border-blue-500/40 hover:text-white"
              aria-label={isBs ? 'Zatvori pregled slike' : 'Close image preview'}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black">
              <img
                src={zoomedSpaceImage.image}
                alt={zoomedSpaceImage.title}
                className="max-h-[78vh] w-full object-contain"
              />
            </div>
            <div className="mt-5 pr-14">
              <div className="text-lg font-mono text-white sm:text-xl">{zoomedSpaceImage.title}</div>
              <p className="mt-2 text-sm font-mono leading-relaxed text-gray-400 sm:text-base">{zoomedSpaceImage.text}</p>
            </div>
          </div>
        </div>
      ) : null}

      <section id="techpark-pricing" className="border-t border-white/10 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={labels.pricingTitle} subtitle={labels.pricingSubtitle} />
          <div className="grid gap-6 xl:grid-cols-3">
            {[
              {
                ...labels.pricingCards.membership,
                onClick: () => onNavigate('/techpark/membership'),
              },
              {
                ...labels.pricingCards.beginnerPrograms,
                onClick: () => onNavigate('/techpark/boot-camp'),
              },
              {
                ...labels.pricingCards.advancedPrograms,
                onClick: () => onNavigate('/techpark/boot-camp'),
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
                    className="mt-8 inline-flex items-center gap-2 rounded-sm border border-blue-500 bg-blue-500/10 px-5 py-4 text-sm font-bold font-mono uppercase tracking-[0.18em] text-white transition-all hover:border-blue-700 hover:bg-blue-600 hover:shadow-[0_0_18px_rgba(37,99,235,0.55)]"
                  >
                    {card.button}
                    <ArrowRight className="h-4 w-4" />
                  </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </TechparkPageShell>
  );
};
