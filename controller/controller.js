const { format } = require("date-fns");

const Visit = require("./../models/visit");

// serach method
let search = async (req, res) => {
  let dateNow = format(new Date(), "yyyy-mm-dd");
  let query = { date: `${dateNow}` };
  let num = req.query.search;
  let date = req.query.searchDate;
  if (num) {
    query = { phoneNum1: `${num}` };
  } else if (date) {
    query = { date: `${date}` };
  }
  await Visit.collection.find(query).toArray((err, data) => {
    if (err) throw err;
    res.render("index", { title: "Home visit", visits: data });
  });
};
// end

// vist Editing
let visitsPrint = async (req, res) => {
  let id = req.params.id;
  Visit.findById(id)
    .then((data) => {
      res.render("visits/print", {
        title: "Home visit visit page",
        visit: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// end
// visit update
let visitupdate = async (req, res) => {
  let id = req.params.id;
  let visit = await Visit.findByIdAndUpdate(
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
    }
  );
  res.render("visits/print", { visit: visit });
};
// end
//new visit
let newVisit = (req, res, next) => {
  res.render("visits/new", { visit: new Visit() });
};
//end
let visitEdit = async (req, res) => {
  let id = req.params.id;
  let visit = await Visit.findById(id);
  res.render("visits/edit", { visit: visit });
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
  });
  try {
    await visit.save();
    console.log(visit);
  } catch (error) {
    console.log(error);
  }
  res.redirect(`visits/print/${visit._id}`);
};
//end
module.exports = {
  search,
  visitsPrint,
  newVisit,
  visitSave,
  visitEdit,
  visitupdate,
};