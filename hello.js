const cal = Temporal.Calendar.from('iso8601');
const date = cal.dateFromFields({ year: 1999, month: 12, day: 31 }, {});
date.monthsInYear; // => 12
date.daysInYear; // => 365



const corsConfig = {
    origin: '',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
  app.use(cors(corsConfig))
  app.options("", cors(corsConfig))
  "*"