import { DataTypes, Model } from "sequelize"
import { sequelize } from ".."

export class Voiture extends Model {
    id!: number
    marque!: string
    modele!: string
    annee!: string
    couleur!: string
}

export const voiture = () => {
    Voiture.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        marque: {
          type: DataTypes.STRING,
        },
        modele: {
          type: DataTypes.STRING,
        },
        annee: {
          type: DataTypes.STRING,
        },
        couleur: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "Voiture",
      }
    )

}