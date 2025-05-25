const Model = require('../../models/mongo')



module.exports.signup = async (req, res, next) => {
    try {
        const { username, phone, password } = req?.body

        if (!username || !phone || !password) {
            return res.error(400, "All Field are required")
        }
        const GetData = await Model.Test.findOne({ phone })

        if (GetData) return res.error(400, "you are already signup , Login using username")
        const data = await Model.Test.findOne({ phone })

        if (data) return res.error(400, "use other username")
        const insertData = {
            username, phone, password
        }
        const inserting = await Model.Test.create(insertData)
        console.log({ inserting })
        return res.success("signup Successfully")

    } catch (error) {
        next(error)
    }
}


module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req?.body

        if (!username || !password) {
            return res.error(400, "All Field are required")
        }
        const GetData = await Model.Test.findOne({ username })

        if (!GetData) return res.error(400, "you are not signup , Please signup")

        if (password === GetData.password) {
            return res.success("signup Successfully", true)
        } else {
            return res.error(400, "Wrong password , Please try again")
        }

    } catch (error) {
        next(error)
    }
}


module.exports.calculate = async (req, res, next) => {
  try {
    const { Items, containerweight,  originport, destinationport } = req.body;

    if (!Items || !Array.isArray(Items) || Items.length === 0) {
      return res.error(400, "Items are required and must be a non-empty array.");
    }

    if (!containerweight || !originport || !destinationport) {
      return res.error(400, "containerweight, originport, and destinationport are required.");
    }

    let totalCBM = 0;
    let totalWeight = 0;

    Items.forEach(item => {
      const { dimensions, weight, quantity } = item;

      if (!dimensions || weight == null || quantity == null) {
        throw new Error("Each item must have dimensions, weight, and quantity.");
      }

      const cbm = dimensions.w * dimensions.h * dimensions.L * quantity;
      const itemWeight = weight * quantity;

      totalCBM += cbm;
      totalWeight += itemWeight;
    });

    const remainingWeight = containerweight - totalWeight;

    // Charges (customize these as needed)
    const fuelCharge = totalWeight * 0.5;
    const portFees = 50;
    const documentationFees = 30;
    const totalCharges = fuelCharge + portFees + documentationFees;

    // Save to MongoDB
    const savedDoc = await Model.CAL.create({
      items: Items,
      containerweight,
      originport,
      destinationport,
      totalCBM,
      totalWeight,
      remainingWeight,
      fuelCharge,
      portFees,
      documentationFees,
      totalCharges
    });

    return res.success("Calculation and save successful", savedDoc);

  } catch (error) {
    next(error);
  }
};
