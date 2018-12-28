const Item = require('../models/item.model');

/**
 * Get list of items
 * @param req
 * @param res
 * @returns return all the items without startdate and enddate parameter
 */
function getItems(req, res) {
  var startDate = new Date(0); //Thu Jan 01 1970 00:00:00 UTC
  var endDate = new Date(8640000000000); //Tue Oct 17 2243 00:00:00 UTC
  if(req.query.startdate)
    startDate = new Date(req.query.startdate);
  if(req.query.enddate)
    endDate = new Date(req.query.enddate);
  Item.find()
    .where('start_date').gte(startDate)
    .where('end_date').lte(endDate)/*.sort('-dateAdded')*/
    .exec((err, items) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json( items );
  });
}

/**
 * Get a single item
 * @param req
 * @param res
 * @returns void
 */
function getItem(req, res) {
  Item.findOne({ cuid: req.params.cuid }).exec((err, item) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ item });
  });
}


/**
 * Save a item
 * @param req
 * @param res
 * @returns void
 */
function saveItem(req, res) {
  if (!req.body.item.name || !req.body.item.color) {
    res.status(403).end();
  }

  const newItem = new Item(req.body.item);

  // Let's sanitize inputs
  newItem.color = sanitizeHtml(newItem.color);
  newItem.name = sanitizeHtml(newItem.name);

  newItem.cuid = cuid();
  newItem.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ item: saved });
  });
}

/**
 * Update a item
 * @param req
 * @param res
 * @returns void
 */
function updateItem(req, res) {
  Item.findOne({ cuid: req.params.cuid }).exec((err, item) => {
    if (err) {
      res.status(500).send(err);
    }

    item.remove(() => {
      res.status(200).end();
    });
  });
}

/**
 * Delete a item
 * @param req
 * @param res
 * @returns void
 */
function deleteItem(req, res) {
  Item.findOne({ cuid: req.params.cuid }).exec((err, item) => {
    if (err) {
      res.status(500).send(err);
    }

    item.remove(() => {
      res.status(200).end();
    });
  });
}

module.exports = {
  getItems,
  getItem,
  saveItem,
  updateItem,
  deleteItem
}
