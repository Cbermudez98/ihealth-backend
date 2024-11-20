import { IReasonSeederMock } from '../lib/reason/domain/interfaces/IReason';

export const reasonsAndCauseSeeder: IReasonSeederMock[] = [
  {
    name: 'Violencia intrafamiliar',
    causes: [
      { name: 'Desacuerdo y discusiones constantes con mis padres' },
      { name: 'Violencia física o psicológica entre los padres' },
      {
        name: 'Problemas de comunicación y falta de entendimiento en el hogar',
      },
      { name: 'Divorcio o separación de los padres' },
      { name: 'Testigo de violencia doméstica entre miembros de la familia' },
    ],
  },
  {
    name: 'Estrés académico o presión por el rendimiento',
    causes: [
      { name: 'Exceso de tareas y plazos de entrega' },
      { name: 'Expectativas muy altas por parte de los padres o profesores' },
      {
        name: 'Sentimiento de sobrecarga o no poder cumplir con las expectativas',
      },
      { name: 'Miedo al fracaso académico' },
      {
        name: 'Percepción de no estar alcanzando el nivel esperado en los exámenes',
      },
    ],
  },
  {
    name: 'Elección incorrecta de carrera',
    causes: [
      {
        name: 'No siento que la carrera que elegí sea lo que realmente me apasiona',
      },
      { name: 'No estoy interesado en los temas que se enseñan en mi carrera' },
      {
        name: 'Siento que tomé la decisión de estudiar esta carrera por influencia de otros',
      },
      {
        name: 'Me doy cuenta de que la carrera no se ajusta a mis habilidades o intereses',
      },
      {
        name: 'Desconfianza en el futuro profesional que me ofrece mi carrera',
      },
    ],
  },
  {
    name: 'Insatisfacción con la carrera elegida',
    causes: [
      { name: 'No me siento motivado ni entusiasmado con los estudios' },
      { name: 'La carrera no cumple con mis expectativas iniciales' },
      {
        name: 'Falta de relevancia de los contenidos aprendidos con respecto a lo que esperaba',
      },
      { name: 'Dudas sobre si la carrera me llevará al futuro que imagino' },
      {
        name: 'Siento que no puedo encontrar una conexión personal con la profesión',
      },
    ],
  },
  {
    name: 'Desacuerdos con algunos profesores',
    causes: [
      {
        name: 'Sentimiento de ser incomprendido o mal interpretado por los profesores',
      },
      { name: 'Desacuerdos en las metodologías de enseñanza utilizadas' },
      { name: 'Falta de empatía o apoyo por parte del docente' },
      {
        name: 'Actitudes autoritarias o falta de respeto por parte del profesor',
      },
      { name: 'Dificultades para comunicarse con algunos docentes' },
    ],
  },
  {
    name: 'Problemas con compañeros de clase',
    causes: [
      { name: 'Bullying o acoso por parte de otros estudiantes' },
      { name: 'Rivalidad y competencia excesiva con compañeros' },
      { name: 'Dificultades para trabajar en equipo o colaborar en proyectos' },
      { name: 'Sentimiento de exclusión o no pertenencia al grupo de amigos' },
      { name: 'Conflictos interpersonales, malentendidos y chismes' },
    ],
  },
  {
    name: 'Ansiedad o depresión',
    causes: [
      { name: 'Sentimientos constantes de tristeza y desesperanza' },
      {
        name: 'Miedo a no estar a la altura de las expectativas académicas o sociales',
      },
      { name: 'Pérdida de interés en actividades que antes eran agradables' },
      { name: 'Alteraciones en el sueño o apetito' },
      {
        name: 'Sensación de estar constantemente agotado física y mentalmente',
      },
    ],
  },
  {
    name: 'Problemas financieros o económicos',
    causes: [
      {
        name: 'Preocupación constante por los costos de la universidad (matrícula, materiales, transporte)',
      },
      {
        name: 'Falta de recursos para pagar la carrera o los gastos cotidianos',
      },
      {
        name: 'Sentimiento de vergüenza o culpa por no poder cubrir los gastos educativos',
      },
      { name: 'Estrés debido a la necesidad de trabajar mientras estudio' },
      { name: 'Temor al endeudamiento para continuar los estudios' },
    ],
  },
  {
    name: 'Dificultades para adaptarse a la vida universitaria',
    causes: [
      { name: 'Falta de experiencia en un entorno académico tan exigente' },
      {
        name: 'Sentimiento de soledad o aislamiento, especialmente si es el primer año',
      },
      {
        name: 'Problemas para encontrar un equilibrio entre estudios, trabajo y vida social',
      },
      {
        name: 'Dificultad para hacer nuevos amigos y adaptarme a un nuevo ambiente',
      },
      {
        name: 'Confusión sobre cómo organizarme para estudiar, socializar y descansar adecuadamente',
      },
    ],
  },
  {
    name: 'Relación de pareja o rupturas sentimentales',
    causes: [
      { name: 'Conflictos y discusiones frecuentes con la pareja' },
      { name: 'Ruptura reciente de una relación sentimental' },
      { name: 'Falta de apoyo emocional por parte de la pareja' },
      { name: 'Celos y desconfianza dentro de la relación' },
      {
        name: 'Dificultad para mantener una relación de pareja mientras se gestionan los estudios',
      },
    ],
  },
  {
    name: 'Problemas de autoestima y confianza',
    causes: [
      {
        name: 'Sentimientos de inseguridad y no sentirme capaz de lograr mis objetivos',
      },
      { name: 'Compararme constantemente con los demás y sentirme inferior' },
      {
        name: 'Falta de autoaceptación debido a características físicas, académicas o personales',
      },
      {
        name: 'Experiencias pasadas que han dañado mi autoestima (bullying, fracasos)',
      },
      { name: 'Miedo al rechazo social o al fracaso en público' },
    ],
  },
  {
    name: 'Adicciones o dependencia',
    causes: [
      {
        name: 'Consumo de sustancias como alcohol, drogas o videojuegos de forma excesiva',
      },
      {
        name: 'Uso de medicamentos sin prescripción para lidiar con el estrés',
      },
      { name: 'Dificultades para controlar la adicción a las redes sociales' },
      { name: 'Problemas familiares que contribuyen a la adicción' },
      {
        name: 'Estrés y ansiedad que conducen a un comportamiento adictivo como mecanismo de escape',
      },
    ],
  },
  {
    name: 'Duelo o pérdida de un ser querido',
    causes: [
      { name: 'La reciente muerte de un familiar, amigo cercano o mascota' },
      {
        name: 'No poder superar el dolor de la pérdida de una relación importante',
      },
      { name: 'Sentimiento de vacío o tristeza profunda' },
      { name: 'Dificultades para aceptar la ausencia de la persona perdida' },
      {
        name: 'Cambios en la vida que surgen a partir de esa pérdida (mudanza, cambios de vida, etc.)',
      },
    ],
  },
  {
    name: 'Discriminación o problemas relacionados con la identidad',
    causes: [
      { name: 'Discriminación por orientación sexual, género o etnia' },
      { name: 'Sentimiento de no ser aceptado por quienes soy' },
      { name: 'Dificultades para aceptar o vivir con mi identidad' },
      {
        name: 'Ser objeto de bullying por mis creencias religiosas o culturales',
      },
      { name: 'Sentimientos de marginalización dentro del entorno académico' },
    ],
  },
];
