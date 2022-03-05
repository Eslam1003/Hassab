const { format } = require('date-fns');
const Chimist = require('../models/chimist');
const Visit = require('./../models/visit');
let chimistName = [
  'علاء عبد النعيم',
  'عمر يوسف',
  'السيد احمد',
  'السيد عطية',
  'محمود السيد',
  'محمد يوسف',
  'إبراهيم أحمد',
  'بيتر وليم',
  'مصطفي فوزي',
  'كيرلس جاب الله',
  'فادي صبري',
  'عبده محمود',
  'نجلاء',
  'نسمة',
  '-_-',
];
let spred = [];
let notmatch = [];

// serach method
let dateNow = format(new Date(), 'yyyy-MM-dd');
let search = (req, res) => {
  let dateNow = format(new Date(), 'yyyy-MM-dd');
  let query = { date: `${dateNow}` };
  if (req.query.search) {
    if (req.query.search[0] === '0') {
      var num = new RegExp(req.query.search);
    } else {
      var name = new RegExp(req.query.search);
    }
  }
  let date = req.query.searchDate;
  if (num) {
    query = { phoneNum1: num };
  } else if (date) {
    query = { date: date };
  } else if (name) {
    query = { name: name };
  }

  let sort = {
    time: 1,
  };

  Visit.collection
    .find(query)
    .sort(sort)
    .toArray((err, data) => {
      if (err) throw err;
      filterByChimist(data);

      res.render('index', {
        visits: data,
        spred: spred,
      });
    });
};
// end

// vist Editing
let visitsPrint = async (req, res) => {
  let id = req.params.id;
  Visit.findById(id)
    .then((data) => {
      res.render('visits/print', {
        title: 'Home visit visit page',
        visit: data,
        dateNow: dateNow,
      });
    })
    .catch((error) => {
      res.redirect('error', { error: error });
    });
};
// end
// visit update
let visitupdate = async (req, res) => {
  let id = req.params.id;
  await Visit.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      phoneNum1: req.body.phoneNum1,
      phoneNum2: req.body.phoneNum2,
      ragion: req.body.ragion,
      stname: req.body.stname,
      blnum: req.body.blnum,
      flnum: req.body.flnum,
      donum: req.body.donum,
      spchilmark: req.body.spchilmark,
      tests: req.body.tests,
      time: req.body.time,
      date: req.body.date,
      creater: req.body.creater,
      chimist: req.body.chimist,
      nots: req.body.nots,
      cost: req.body.cost,
      stat: req.body.stat,
      aria: req.body.aria,
      num: req.body.num,
    }
  );
  let visit = await Visit.findById({ _id: id });
  res.render('visits/print', { visit: visit, dateNow: dateNow });
};
// end
//new visit
let newVisit = (req, res, next) => {
  res.render('visits/new', { visit: new Visit() });
};
//end
// chimist

let chimistNote = async (req, res, next) => {
  let chimist = await Chimist.findById({ _id: '6200e8b1761c995598162413' });
  res.render('visits/chimist', { chimist: chimist });
};
// end
//  chimist save

let chimistsave = async (req, res) => {
  await Chimist.findByIdAndUpdate(
    { _id: '6200e8b1761c995598162413' },
    {
      sa: req.body.sa,
      su: req.body.su,
      mo: req.body.mo,
      tu: req.body.tu,
      we: req.body.we,
      th: req.body.th,
      fr: req.body.fr,
    }
  );

  res.redirect('/');
};
// end
let visitEdit = async (req, res) => {
  let id = req.params.id;
  let visit = await Visit.findById(id);
  res.render('visits/edit', { visit: visit });
};

let creatnew = async (req, res) => {
  let id = req.params.id;
  let visit = await Visit.findById(id);
  res.render('visits/newvisit', { visit: visit });
};

//save the new visit to the db
let visitSave = async (req, res) => {
  let visit = new Visit({
    name: req.body.name,
    phoneNum1: req.body.phoneNum1,
    phoneNum2: req.body.phoneNum2,
    ragion: req.body.ragion,
    stname: req.body.stname,
    blnum: req.body.blnum,
    flnum: req.body.flnum,
    donum: req.body.donum,
    spchilmark: req.body.spchilmark,
    tests: req.body.tests,
    time: req.body.time,
    date: req.body.date,
    creater: req.body.creater,
    chimist: req.body.chimist,
    nots: req.body.nots,
    cost: req.body.cost,
    stat: req.body.stat,
    aria: req.body.aria,
    num: req.body.num,
  });
  try {
    await visit.save();
  } catch (error) {
    res.redirect('error', { error: error });
  }
  res.redirect(`visits/print/${visit._id}`);
};
//end
let deleteVisit = (req, res) => {
  let id = req.params.id;
  Visit.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/' });
    })
    .catch((e) => console.log(e));
};

let d = 0;
let num = 0;
let doneVisit = 0;
let total = 0;
let agami = 0;
let one = 0;
let tow = 0;
let three = 0;
let four = 0;
let swap = 0;
let delet = [];

let analysis = (req, res) => {
  res.render('visits/analysis', {
    total: total,
    d: d,
    doneVisit: doneVisit,
    agami: agami,
    one: one,
    tow: tow,
    three: three,
    four: four,
    swap: swap,
    delet: delet,
    total: total,
    num: num,
  });
};
let analysisSearch = (req, res) => {
  let from = req.body.from;
  let to = req.body.to;

  Visit.collection
    .find({
      date: {
        $gte: from,
        $lte: to,
      },
    })
    .toArray((err, data) => {
      if (err) throw err;
      data.forEach((e) => {
        if (e.stat === 'red') {
          d++;
          delet.push(e);
        } else if (e.stat === 'white' || e.stat === 'yellow') {
          doneVisit++;
        }
      });
      data.forEach((e) => {
        switch (e.aria) {
          case '0':
            agami++;
            break;
          case '1':
            one++;
            break;
          case '2':
            tow++;
            break;
          case '3':
            three++;
            break;
          case '4':
            four++;
            break;
          case '5':
            swap++;
            break;

          default:
            break;
        }
        if (e.num) {
          num = num + e.num;
        }
      });

      total = data.length;

      res.render('visits/analysis', {
        visit: data,
        total: total,
        d: d,
        doneVisit: doneVisit,
        agami: agami,
        one: one,
        tow: tow,
        three: three,
        four: four,
        swap: swap,
        delet: delet,
        total: total,
        num: num,
      });
      d = 0;
      num = 0;
      doneVisit = 0;
      total = 0;
      agami = 0;
      one = 0;
      tow = 0;
      three = 0;
      four = 0;
      swap = 0;
      delet = [];
    });
};

function filterByChimist(data) {
  spred = [];
  notmatch = [];
  chimistName.forEach((chimist) => {
    data.map((visits) => {
      if (chimist === visits.chimist) {
        spred.push(visits);
      }
    });
  });
  data.map((visits) => {
    if (!chimistName.includes(visits.chimist)) {
      notmatch.push(visits);
    }
  });
  spred = spred.concat(notmatch);

  return spred;
}

module.exports = {
  search,
  visitsPrint,
  newVisit,
  visitSave,
  visitEdit,
  visitupdate,
  chimistNote,
  chimistsave,
  analysis,
  analysisSearch,
  creatnew,
  deleteVisit,
};
