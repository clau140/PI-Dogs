const { Router } = require("express")
const { getAllTemperaments } = require("../controllers/temperaments")

const router = Router()

// GET /temperaments
router.get("/", async (req, res) => {
	try {
		const response = await getAllTemperaments()
		res.status(200).send(response)
	} catch (error) {
		res.status(400).send(error.message)
	}
})

module.exports = router

