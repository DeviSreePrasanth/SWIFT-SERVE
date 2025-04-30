// controllers/searchController.js

const Service = require("../models/Service");
const Vendor = require("../models/Vendor");

const search = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: "NAME ISN'T FETCHING" });
    }

    const services = await Service.find({
      $or: [
        { name: { $regex: name, $options: "i" } },
        { category: { $regex: name, $options: "i" } }
      ]
    });

    const vendors = await Vendor.find({
      name: { $regex: name, $options: "i" }
    });

    return res.status(200).json({ services, vendors });
  } catch (e) {
    console.error("Search error:", e);
    return res.status(500).json({ error: "SERVER ERROR" });
  }
};

module.exports = { search };
