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
};

export const getProgramAgenda = (programId: string, level: ProgramLevel): ProgramAgenda =>
  programAgendas[getAgendaKey(programId, level)] ?? createComingSoonAgenda(programId, level);
