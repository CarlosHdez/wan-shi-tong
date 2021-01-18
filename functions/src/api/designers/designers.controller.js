const admin = require('../../setup_firebase')

const db = admin.firestore()

const designersController = {
  listDesigners: async (req, res) => {
    try {
      const collection = db.collection('designers')
      const snapshot = await collection.get()
      const designers = snapshot.docs.map((designer) => {
        return {
          id: designer.id,
          ...designer.data(),
        }
      })
      return res.status(200).json({data: designers})
    } catch (err) {
      return res.status(500).json({message: err})
    }
  },

  saveDesigner: async (req, res) => {
    const {name, surname} = req.body
    const newDesigner = await db.collection('designers').add({name, surname})
    console.log(`Added designer ${name} ${surname}, with id ${newDesigner.id}`)
    const result = await newDesigner.get()
    return res.status(200).json({
      id: newDesigner.id,
      ...result.data()
    })
  }
}

module.exports = designersController
