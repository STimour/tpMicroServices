import { Router } from "express";
import { Voiture } from "../model/voiture";

export const voitureRouter = Router()

voitureRouter.get("/", async (req, res) => {
    try{
        const voitures = await Voiture.findAll()
        res.json(voitures)
    }catch(e){
        console.error("Erreur lors de l'affichage des voitures :", e)
        res
          .status(500)
          .json({ message: "Erreur lors de l'affichage des voitures", error: e })
    }
})

voitureRouter.get("/:id", async (req, res) => {
    try{
        const uneVoiture = await Voiture.findOne({
            where: {id: req.params.id}
        })
        if(uneVoiture){
            res.json(uneVoiture)
        }
    }catch(e){

    }
})

voitureRouter.post("/", async (req, res) => {
    try{
        //const {marque, modele, annee, couleur} = req.body
        const resultatOfCreating = await Voiture.create({
          marque: req.body.marque,
          modele: req.body.modele,
          annee: req.body.annee,
          couleur: req.body.couleur,
        })
        res.json(resultatOfCreating)
    }catch(e){
        console.error('Erreur lors de l\'ajout du voiture :', e);
        res.status(500).json({ message: "Erreur lors de l'ajout du voiture", error: e });
      }
})

//ANCHOR - Modification d'un voiture
voitureRouter.put("/:id",async (req, res) => {
    const voitureId = req.params.id
    try{
        const resultatOfUpdate = await Voiture.update(
          {
            marque: req.body.data["Marque"],
            modele: req.body.data["Modele"],
            annee: req.body.data["Annee"],
            couleur: req.body.data["Couleur"],
          },
          {
            where: { id: voitureId },
            returning: true, // Renvoie les données mises à jour
          }
        )
        res.json(resultatOfUpdate);
    }catch(e){
        console.error('Erreur lors de la modification du voiture :', e);
        res.status(500).json({ message: "Erreur lors de la modification du voiture", error: e });
    }
})

//ANCHOR - Suppression d'un voiture
voitureRouter.delete("/:id", async (req, res) => {
    const voitureId = req.params.id
    try{
        const gameDeletig = await Voiture.destroy(
            {
                where: { id: voitureId}
            }
        )
    res.json(gameDeletig)
    }catch(e){
        console.error('Erreur lors de la suppression du voiture :', e);
        res.status(500).json({ message: "Erreur lors de la suppression du voiture", error: e });
    }
})