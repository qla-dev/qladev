import { programs } from './data';
import type { ProgramAgenda, ProgramLevel } from './types';

const getAgendaKey = (programId: string, level: ProgramLevel) => `${programId}:${level}`;

const createComingSoonAgenda = (programId: string, level: ProgramLevel): ProgramAgenda => ({
  programId,
  level,
  status: 'coming-soon',
  overview:
    level === 'beginner'
      ? 'The detailed week-by-week outline for this beginner path is being finalized. The track will include mentor-led sessions, practical exercises, and a concrete final project.'
      : 'The detailed week-by-week outline for this advanced path is being finalized. The track will include deeper project work, more demanding tasks, and a stronger final deliverable.',
  overviewBs:
    level === 'beginner'
      ? 'Detaljan sedmični plan za ovaj beginner put je u završnoj pripremi. Program će uključivati mentorski rad, praktične vježbe i konkretan završni projekat.'
      : 'Detaljan sedmični plan za ovaj advanced put je u završnoj pripremi. Program će uključivati ozbiljniji projektni rad, zahtjevnije zadatke i jači završni rezultat.',
  weeks: [
    {
      id: 'coming-soon',
      label: 'Update',
      labelBs: 'Objava',
      title: 'Agenda coming soon',
      titleBs: 'Agenda uskoro',
      summary: 'This track already has a defined structure, but the public breakdown is not published yet.',
      summaryBs: 'Ovaj put već ima definisanu strukturu, ali javni sedmični raspored još nije objavljen.',
      points: [
        'Mentor-led sessions and guided assignments',
        'Hands-on work, checkpoints, and project milestones',
        'Final presentation and concrete output',
      ],
      pointsBs: [
        'Mentorski rad i vođeni zadaci',
        'Praktičan rad, checkpointi i projektni milestoneovi',
        'Završna prezentacija i konkretan rezultat',
      ],
    },
  ],
});

const placeholderAgendas = Object.fromEntries(
  programs.flatMap((program) =>
    (['beginner', 'advanced'] as const).map((level) => [
      getAgendaKey(program.id, level),
      createComingSoonAgenda(program.id, level),
    ])
  )
) as Record<string, ProgramAgenda>;

export const programAgendas: Record<string, ProgramAgenda> = {
  ...placeholderAgendas,
  [getAgendaKey('3d-modeling', 'beginner')]: {
    programId: '3d-modeling',
    level: 'beginner',
    status: 'ready',
    overview:
      'This beginner track starts with Tinkercad foundations, moves into precise modeling and first print preparation, and then expands into Blender so students finish with a more advanced printable final model.',
    overviewBs:
      'Ovaj beginner put kreće od osnova Tinkercada, prelazi na precizno modeliranje i pripremu prvog printa, a zatim uvodi Blender kako bi polaznici završili sa naprednijim finalnim modelom spremnim za print.',
    weeks: [
      {
        id: '3d-beginner-01',
        label: 'Week 01',
        labelBs: 'Sedmica 01',
        title: 'Introduction to 3D space and Tinkercad',
        titleBs: 'Uvod u 3D prostor i Tinkercad',
        summary: 'Students get oriented, understand what 3D modeling is used for, and learn how to move inside the Tinkercad workspace.',
        summaryBs: 'Polaznici se upoznaju sa programom, razumiju gdje se 3D modeliranje koristi i uče kako se kretati kroz Tinkercad radni prostor.',
        points: [
          'Introduction, group setup, and course flow',
          'What 3D modeling is and where it is applied',
          'Navigation, workspace logic, and saving the first shapes',
        ],
        pointsBs: [
          'Predstavljanje, upoznavanje grupe i tok programa',
          'Šta je 3D modeliranje i gdje se koristi',
          'Navigacija, logika radne površine i spašavanje prvih oblika',
        ],
      },
      {
        id: '3d-beginner-02',
        label: 'Week 02',
        labelBs: 'Sedmica 02',
        title: 'Core Tinkercad functions',
        titleBs: 'Osnovne funkcije u Tinkercadu',
        summary: 'The second week covers importing, exporting, transformations, grouping, and subtractive modeling with holes.',
        summaryBs: 'Druga sedmica pokriva import, export, transformacije, grupisanje i oduzimanje oblika pomoću hole funkcije.',
        points: [
          'Import and export workflow plus library browsing',
          'Move, rotate, scale, grouping, and shape sections',
          'Practice task: keychain or a similar simple object',
        ],
        pointsBs: [
          'Import i export fajlova te pregled biblioteka',
          'Move, rotate, scale, grupisanje i prikaz presjeka oblika',
          'Vježba: privjesak ili sličan jednostavan predmet',
        ],
      },
      {
        id: '3d-beginner-03',
        label: 'Week 03',
        labelBs: 'Sedmica 03',
        title: 'Precise 3D modeling',
        titleBs: 'Precizno 3D modeliranje',
        summary: 'Students shift from rough shaping to dimension-driven modeling and more intentional control of the model.',
        summaryBs: 'Polaznici prelaze sa osnovnog oblikovanja na modeliranje vođeno dimenzijama i preciznijom kontrolom modela.',
        points: [
          'Dimensions, ruler, align, hide, lock, and color',
          'Using exact values instead of freehand positioning',
          'Practice task: modeling a house with meaningful forms and colors',
        ],
        pointsBs: [
          'Dimenzije, ruler, align, hide, lock i boja',
          'Rad sa tačno zadanim vrijednostima umjesto slobodnog pomjeranja',
          'Vježba: kuća sa smislenim oblicima i bojama',
        ],
      },
      {
        id: '3d-beginner-04',
        label: 'Week 04',
        labelBs: 'Sedmica 04',
        title: 'Introduction to 3D printing',
        titleBs: 'Uvod u 3D printanje',
        summary: 'The first print session connects digital modeling to a real print result and introduces STL export.',
        summaryBs: 'Prva sedmica 3D printa povezuje digitalni model sa stvarnim printanim rezultatom i uvodi STL export.',
        points: [
          'First STL export and print preparation',
          'Basics of how a 3D printer works',
          'Printing an object created in an earlier session',
        ],
        pointsBs: [
          'Prvi STL export i priprema za print',
          'Osnove rada 3D printera',
          'Printanje objekta izrađenog na ranijoj vježbi',
        ],
      },
      {
        id: '3d-beginner-05',
        label: 'Week 05',
        labelBs: 'Sedmica 05',
        title: 'Complex shapes and workplane logic',
        titleBs: 'Kompleksni oblici i workplane logika',
        summary: 'Students learn how to move beyond primitive forms and start building more complex structures inside Tinkercad.',
        summaryBs: 'Polaznici uče kako izaći iz okvira osnovnih formi i graditi složenije strukture unutar Tinkercada.',
        points: [
          'Workplane usage and more advanced form building',
          'Combining multiple operations into one cleaner model',
          'Working with SVG logos and imported graphic elements',
        ],
        pointsBs: [
          'Korištenje workplane alata i složenije građenje oblika',
          'Spajanje više operacija u jedan uredniji model',
          'Rad sa SVG logotipom i uvezenim grafičkim elementima',
        ],
      },
      {
        id: '3d-beginner-06',
        label: 'Week 06',
        labelBs: 'Sedmica 06',
        title: 'Final Tinkercad model and print',
        titleBs: 'Finalni Tinkercad model i print',
        summary: 'The first half of the track closes with a more complex group-selected model and a real print output.',
        summaryBs: 'Prvi dio programa završava složenijim modelom po izboru grupe i stvarnim printanim rezultatom.',
        points: [
          'Building a more complex model chosen by the group',
          'Final adjustments before exporting for print',
          'Printing the complex Tinkercad model',
        ],
        pointsBs: [
          'Izrada složenijeg modela po izboru grupe',
          'Finalne dorade prije exporta za print',
          'Printanje kompleksnog Tinkercad modela',
        ],
      },
      {
        id: '3d-beginner-07',
        label: 'Week 07',
        labelBs: 'Sedmica 07',
        title: 'Introduction to Blender',
        titleBs: 'Uvod u Blender',
        summary: 'The second phase starts with Blender installation, workspace orientation, and the first simple exercise.',
        summaryBs: 'Drugi dio programa počinje instalacijom Blendera, upoznavanjem radne površine i prvom jednostavnom vježbom.',
        points: [
          'Installing Blender and understanding the interface',
          'Comparing the new workspace with previous tools',
          'Practice task: creating a simple 3D form',
        ],
        pointsBs: [
          'Instalacija Blendera i upoznavanje interfejsa',
          'Poređenje novog radnog prostora sa ranijim alatima',
          'Vježba: izrada jednostavnog 3D oblika',
        ],
      },
      {
        id: '3d-beginner-08',
        label: 'Week 08',
        labelBs: 'Sedmica 08',
        title: 'Blender adaptation',
        titleBs: 'Blender adaptacija',
        summary: 'Students learn mesh logic and the main editing tools that separate Blender from Tinkercad’s more rigid workflow.',
        summaryBs: 'Polaznici uče mesh logiku i glavne edit alate koji Blender razlikuju od čvršćeg Tinkercad workflowa.',
        points: [
          'Vertices, edges, and faces as the core modeling units',
          'Extrude, inset, and loop cut in practice',
          'Understanding Blender as freeform geometry',
        ],
        pointsBs: [
          'Verteksi, ivice i faceovi kao osnova modeliranja',
          'Extrude, inset i loop cut kroz praksu',
          'Razumijevanje Blendera kao slobodnije geometrije',
        ],
      },
      {
        id: '3d-beginner-09',
        label: 'Week 09',
        labelBs: 'Sedmica 09',
        title: 'Advanced Blender tools',
        titleBs: 'Napredne Blender funkcije',
        summary: 'The agenda expands into more advanced modifiers and repeatable geometry patterns used in stronger final models.',
        summaryBs: 'Agenda se širi na naprednije modifikatore i ponovljive geometrijske obrasce koji se koriste u jačim finalnim modelima.',
        points: [
          'Symmetry, subdivision, and array workflows',
          'A practical example for each new feature',
          'Cleaner, faster, and more controllable model building',
        ],
        pointsBs: [
          'Simetrija, subdivision i array workflow',
          'Praktičan primjer za svaku novu funkciju',
          'Čišće, brže i kontrolisanije građenje modela',
        ],
      },
      {
        id: '3d-beginner-10',
        label: 'Week 10',
        labelBs: 'Sedmica 10',
        title: 'Blender to 3D print pipeline',
        titleBs: 'Blender do 3D print pipeline',
        summary: 'Students prepare a Blender model for printing, check common errors, and move back into the physical production stage.',
        summaryBs: 'Polaznici pripremaju Blender model za print, provjeravaju tipične greške i vraćaju se u fazu fizičke izrade.',
        points: [
          'Print preparation and STL export from Blender',
          'Checking geometry issues before printing',
          'Printing a simple Blender-based object',
        ],
        pointsBs: [
          'Priprema za print i STL export iz Blendera',
          'Provjera geometrijskih grešaka prije printa',
          'Printanje jednostavnog Blender objekta',
        ],
      },
      {
        id: '3d-beginner-11',
        label: 'Week 11',
        labelBs: 'Sedmica 11',
        title: 'Complex final Blender model',
        titleBs: 'Kompleksni finalni Blender model',
        summary: 'The final project week focuses on choosing a stronger concept and building the model with a clear final goal.',
        summaryBs: 'Sedmica završnog projekta fokusira se na odabir jačeg koncepta i izradu modela sa jasnim finalnim ciljem.',
        points: [
          'Choosing the final project model',
          'Modeling work with mentor feedback during the session',
          'Preparing the project for presentation and output',
        ],
        pointsBs: [
          'Odabir modela za završni projekat',
          'Rad na modelu uz mentorski feedback tokom časa',
          'Priprema projekta za prezentaciju i finalni output',
        ],
      },
      {
        id: '3d-beginner-12',
        label: 'Week 12',
        labelBs: 'Sedmica 12',
        title: 'Final presentation and 3D print',
        titleBs: 'Finalna prezentacija i 3D print',
        summary: 'The program closes with presenting the work, printing the final object, and showing the full path from idea to physical result.',
        summaryBs: 'Program se zatvara prezentacijom rada, printanjem finalnog objekta i prikazom cijelog puta od ideje do fizičkog rezultata.',
        points: [
          'Presenting the finished model',
          'Final print of the selected project',
          'Closing review of progress, process, and result',
        ],
        pointsBs: [
          'Prezentacija završenog modela',
          'Finalni print odabranog projekta',
          'Završni osvrt na napredak, proces i rezultat',
        ],
      },
    ],
  },
  [getAgendaKey('ui-ux', 'beginner')]: {
    programId: 'ui-ux',
    level: 'beginner',
    status: 'ready',
    overview:
      'The beginner UI/UX path is built around creating the branding of a company, from visual direction and logo thinking to color, typography, flyers, and a coherent final presentation inside Figma.',
    overviewBs:
      'Beginner UI/UX put građen je oko izrade brandinga firme, od vizuelnog smjera i logike logotipa do boja, tipografije, flyera i zaokružene finalne prezentacije u Figmi.',
    weeks: [
      {
        id: 'uiux-beginner-01',
        label: 'Week 01',
        labelBs: 'Sedmica 01',
        title: 'Branding foundations and company brief',
        titleBs: 'Osnove brandinga i brief firme',
        summary: 'Students define what a brand is, who the company speaks to, and what kind of visual impression the brand should leave.',
        summaryBs: 'Polaznici definišu šta je brend, kome se firma obraća i kakav vizuelni utisak taj brend treba ostaviti.',
        points: [
          'Introduction to branding, positioning, and target audience',
          'Reading a company brief and defining the visual tone',
          'Collecting references and setting the first design direction',
        ],
        pointsBs: [
          'Uvod u branding, pozicioniranje i ciljnu publiku',
          'Čitanje briefa firme i definisanje vizuelnog tona',
          'Skupljanje referenci i postavljanje prvog dizajnerskog smjera',
        ],
      },
      {
        id: 'uiux-beginner-02',
        label: 'Week 02',
        labelBs: 'Sedmica 02',
        title: 'Moodboards and visual direction',
        titleBs: 'Moodboard i vizuelni smjer',
        summary: 'The second week narrows the style of the brand through references, colors, shapes, and examples from similar industries.',
        summaryBs: 'Druga sedmica sužava stil brenda kroz reference, boje, forme i primjere iz sličnih industrija.',
        points: [
          'Building a moodboard with relevant references',
          'Exploring color moods and visual contrast',
          'Choosing a direction worth developing further',
        ],
        pointsBs: [
          'Izrada moodboarda sa relevantnim referencama',
          'Istraživanje raspoloženja boja i vizuelnog kontrasta',
          'Odabir smjera koji vrijedi dalje razvijati',
        ],
      },
      {
        id: 'uiux-beginner-03',
        label: 'Week 03',
        labelBs: 'Sedmica 03',
        title: 'Logo concepts and brand marks',
        titleBs: 'Koncepti logotipa i znaka',
        summary: 'Students sketch and refine logo ideas that match the character, tone, and business purpose of the company.',
        summaryBs: 'Polaznici skiciraju i dorađuju ideje logotipa koje odgovaraju karakteru, tonu i poslovnoj svrsi firme.',
        points: [
          'Generating multiple logo directions',
          'Comparing symbol-based, text-based, and combined solutions',
          'Selecting one concept for deeper refinement',
        ],
        pointsBs: [
          'Generisanje više pravaca za logotip',
          'Poređenje simboličkih, tipografskih i kombinovanih rješenja',
          'Odabir jednog koncepta za dublju razradu',
        ],
      },
      {
        id: 'uiux-beginner-04',
        label: 'Week 04',
        labelBs: 'Sedmica 04',
        title: 'Typography, colors, and brand rules',
        titleBs: 'Tipografija, boje i pravila brenda',
        summary: 'The visual system becomes more concrete through type choices, color combinations, spacing rules, and simple usage guidelines.',
        summaryBs: 'Vizuelni sistem postaje konkretniji kroz odabir tipografije, kombinacije boja, pravila razmaka i jednostavne smjernice upotrebe.',
        points: [
          'Defining primary and secondary typography',
          'Creating a usable color palette',
          'Setting the first basic brand rules',
        ],
        pointsBs: [
          'Definisanje primarne i sekundarne tipografije',
          'Kreiranje upotrebljive palete boja',
          'Postavljanje prvih osnovnih pravila brenda',
        ],
      },
      {
        id: 'uiux-beginner-05',
        label: 'Week 05',
        labelBs: 'Sedmica 05',
        title: 'Flyers and supporting print materials',
        titleBs: 'Flyeri i prateći print materijali',
        summary: 'The brand moves beyond the logo into practical outputs such as flyers, simple promo layouts, and structured presentations.',
        summaryBs: 'Brend izlazi izvan logotipa i prelazi u praktične outpute poput flyera, jednostavnih promo layouta i strukturiranih prezentacija.',
        points: [
          'Building flyer and promo layouts',
          'Applying the brand consistently across print surfaces',
          'Preparing assets for clean presentation',
        ],
        pointsBs: [
          'Izrada flyera i promo layouta',
          'Dosljedna primjena brenda na print površinama',
          'Priprema materijala za urednu prezentaciju',
        ],
      },
      {
        id: 'uiux-beginner-06',
        label: 'Week 06',
        labelBs: 'Sedmica 06',
        title: 'Final brand presentation in Figma',
        titleBs: 'Finalna brand prezentacija u Figmi',
        summary: 'The beginner track closes with a complete company branding presentation gathered into one clean Figma deliverable.',
        summaryBs: 'Beginner put se zatvara kompletnom prezentacijom brandinga firme složenom u jedan čist Figma deliverable.',
        points: [
          'Organizing the final brand board in Figma',
          'Presenting logo, palette, typography, and flyers together',
          'Final review of visual consistency and polish',
        ],
        pointsBs: [
          'Organizovanje finalnog brand boarda u Figmi',
          'Zajednička prezentacija logotipa, palete, tipografije i flyera',
          'Završna provjera dosljednosti i dotjeranosti',
        ],
      },
    ],
  },
  [getAgendaKey('ui-ux', 'advanced')]: {
    programId: 'ui-ux',
    level: 'advanced',
    status: 'ready',
    overview:
      'The advanced UI/UX path shifts into branding a mobile application, connecting product direction, Figma UI work, branded screens, flyers, and supporting promo assets into one polished visual package.',
    overviewBs:
      'Advanced UI/UX put prelazi na branding mobilne aplikacije i povezuje product smjer, rad u Figmi, brandirane screenove, flyere i prateće promo materijale u jedan dotjeran vizuelni paket.',
    weeks: [
      {
        id: 'uiux-advanced-01',
        label: 'Week 01',
        labelBs: 'Sedmica 01',
        title: 'Mobile app concept and audience',
        titleBs: 'Koncept mobilne aplikacije i publika',
        summary: 'Students define what the app solves, for whom it is built, and what brand tone should support the product.',
        summaryBs: 'Polaznici definišu koji problem aplikacija rješava, kome je namijenjena i kakav ton brenda treba pratiti proizvod.',
        points: [
          'Understanding the app idea and user expectations',
          'Defining the product tone and communication style',
          'Setting the visual direction for the app brand',
        ],
        pointsBs: [
          'Razumijevanje ideje aplikacije i očekivanja korisnika',
          'Definisanje product tona i stila komunikacije',
          'Postavljanje vizuelnog smjera za brend aplikacije',
        ],
      },
      {
        id: 'uiux-advanced-02',
        label: 'Week 02',
        labelBs: 'Sedmica 02',
        title: 'Brand system for the app',
        titleBs: 'Brand sistem za aplikaciju',
        summary: 'The second phase develops the core brand language that the app will use across screens and promotion.',
        summaryBs: 'Druga faza razvija osnovni jezik brenda koji će aplikacija koristiti kroz screenove i promociju.',
        points: [
          'Choosing colors, typography, and tone for the app',
          'Defining visual consistency across product and marketing',
          'Building the first structure of the design system',
        ],
        pointsBs: [
          'Odabir boja, tipografije i tona za aplikaciju',
          'Definisanje vizuelne dosljednosti kroz proizvod i marketing',
          'Postavljanje prve strukture design sistema',
        ],
      },
      {
        id: 'uiux-advanced-03',
        label: 'Week 03',
        labelBs: 'Sedmica 03',
        title: 'Figma styles, components, and UI kit',
        titleBs: 'Figma stilovi, komponente i UI kit',
        summary: 'Students translate the brand into reusable Figma styles and components that support fast screen design.',
        summaryBs: 'Polaznici prevode brend u upotrebljive Figma stilove i komponente koje omogućavaju brzu izradu screenova.',
        points: [
          'Creating text styles, colors, and reusable tokens',
          'Designing buttons, fields, cards, and navigation components',
          'Structuring a practical UI kit in Figma',
        ],
        pointsBs: [
          'Kreiranje tekst stilova, boja i reusable tokena',
          'Dizajn dugmadi, polja, kartica i navigacijskih komponenti',
          'Strukturiranje praktičnog UI kita u Figmi',
        ],
      },
      {
        id: 'uiux-advanced-04',
        label: 'Week 04',
        labelBs: 'Sedmica 04',
        title: 'Core branded app screens',
        titleBs: 'Ključni brandirani screenovi aplikacije',
        summary: 'The app identity is applied to login, onboarding, home, and key action screens so the product feels visually consistent.',
        summaryBs: 'Identitet aplikacije primjenjuje se na login, onboarding, home i ključne action screenove kako bi proizvod djelovao vizuelno dosljedno.',
        points: [
          'Designing the main user flow screens',
          'Maintaining brand logic inside UI decisions',
          'Reviewing clarity, hierarchy, and polish',
        ],
        pointsBs: [
          'Dizajn glavnih screenova korisničkog toka',
          'Održavanje logike brenda unutar UI odluka',
          'Provjera jasnoće, hijerarhije i dotjeranosti',
        ],
      },
      {
        id: 'uiux-advanced-05',
        label: 'Week 05',
        labelBs: 'Sedmica 05',
        title: 'Promo visuals, flyers, and campaign assets',
        titleBs: 'Promo vizuali, flyeri i kampanjski materijali',
        summary: 'The advanced track expands the app brand into support materials used for launch, promotion, and public presentation.',
        summaryBs: 'Advanced put širi brend aplikacije na prateće materijale koji se koriste za launch, promociju i javnu prezentaciju.',
        points: [
          'Creating flyers and promo layouts for the app',
          'Designing supporting banners and social assets',
          'Preparing a consistent campaign-ready visual package',
        ],
        pointsBs: [
          'Izrada flyera i promo layouta za aplikaciju',
          'Dizajn pratećih bannera i social materijala',
          'Priprema dosljednog vizuelnog paketa spremnog za kampanju',
        ],
      },
      {
        id: 'uiux-advanced-06',
        label: 'Week 06',
        labelBs: 'Sedmica 06',
        title: 'Final presentation of the branded mobile app',
        titleBs: 'Finalna prezentacija brandirane mobilne aplikacije',
        summary: 'The track closes with one complete showcase that joins product screens, brand system, and promo outputs into a polished final presentation.',
        summaryBs: 'Put se zatvara jednim kompletnim showcaseom koji spaja screenove proizvoda, brand sistem i promo outpute u dotjeranu završnu prezentaciju.',
        points: [
          'Presenting the app brand and its core screens',
          'Showing the Figma system and supporting campaign assets',
          'Final critique focused on coherence and professional finish',
        ],
        pointsBs: [
          'Prezentacija brenda aplikacije i njenih ključnih screenova',
          'Prikaz Figma sistema i pratećih kampanjskih materijala',
          'Završna kritika fokusirana na koherentnost i profesionalni finish',
        ],
      },
    ],
  },
};

export const getProgramAgenda = (programId: string, level: ProgramLevel): ProgramAgenda =>
  programAgendas[getAgendaKey(programId, level)] ?? createComingSoonAgenda(programId, level);
